import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent, RefObject } from "react";
import type { Project } from "../data/projects";

export const PROJECT_WHEEL_GO_TO_EVENT = "project-wheel:go-to";

export type ProjectWheelGoToDetail = {
  projectId: string;
  behavior?: "smooth" | "instant";
};

type UseProjectWheelOptions = { projects: Project[]; onOpen: (project: Project) => void };

type ProjectWheelApi = {
  activeIndex: number;
  shellRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  setCardRef: (index: number, node: HTMLElement | null) => void;
  centerProject: (index: number, behavior?: ScrollBehavior) => void;
  goToProject: (projectId: string, behavior?: "smooth" | "instant") => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
};

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const WHEEL_THRESHOLD = 45;
const GESTURE_END_DELAY_MS = 125;
const SWITCH_DURATION_MS = 320;
const MAX_NORMALIZED_DELTA = 60;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const sampleCurve = (t: number, control1: number, control2: number) =>
  3 * (1 - t) ** 2 * t * control1 + 3 * (1 - t) * t ** 2 * control2 + t ** 3;

// cubic-bezier(0.22, 1, 0.36, 1), solved by x so the scroll has no overshoot.
const wheelEase = (progress: number) => {
  let parameter = progress;
  for (let iteration = 0; iteration < 5; iteration += 1) {
    const x = sampleCurve(parameter, 0.22, 0.36) - progress;
    const derivative = 3 * (1 - parameter) ** 2 * 0.22
      + 6 * (1 - parameter) * parameter * (0.36 - 0.22)
      + 3 * parameter ** 2 * (1 - 0.36);
    if (Math.abs(derivative) < 0.0001) break;
    parameter = clamp(parameter - x / derivative, 0, 1);
  }
  return sampleCurve(parameter, 1, 1);
};

export default function useProjectWheel({ projects, onOpen }: UseProjectWheelOptions): ProjectWheelApi {
  const shellRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const transformFrameRef = useRef(0);
  const motionFrameRef = useRef(0);
  const gestureTimerRef = useRef(0);
  const activeIndexRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const gestureTriggeredRef = useRef(false);
  const internalScrollRef = useRef(false);
  const dragRef = useRef({ active: false, startY: 0, startScrollTop: 0, moved: false });
  const [activeIndex, setActiveIndex] = useState(0);

  const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;
  const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

  const setCardRef = useCallback((index: number, node: HTMLElement | null) => {
    cardRefs.current[index] = node;
  }, []);

  const commitActiveIndex = useCallback((index: number) => {
    activeIndexRef.current = index;
    setActiveIndex((current) => (current === index ? current : index));
  }, []);

  const updateTransforms = useCallback(() => {
    transformFrameRef.current = 0;
    const container = containerRef.current;
    if (!container) return;
    const containerCenter = container.scrollTop + container.clientHeight / 2;
    const reducedMotion = prefersReducedMotion();

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardHeight = Math.max(card.offsetHeight, 1);
      const delta = (card.offsetTop + cardHeight / 2 - containerCenter) / cardHeight;
      const distance = Math.abs(delta);
      const renderDistance = Math.min(distance, 3.25);
      const rotateX = reducedMotion ? 0 : clamp(delta * -24, -44, 44);
      const translateZ = reducedMotion ? 0 : -renderDistance * 72;
      const scale = reducedMotion ? 1 : 1 - Math.min(renderDistance * 0.08, 0.24);
      const opacity = 1 - Math.min(renderDistance * 0.2, 0.66);
      const blur = reducedMotion ? 0 : Math.min(renderDistance * 1.35, 3.5);
      card.style.setProperty("--rotate-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--translate-z", `${translateZ.toFixed(2)}px`);
      card.style.setProperty("--scale", scale.toFixed(3));
      card.style.setProperty("--opacity", opacity.toFixed(3));
      card.style.setProperty("--blur", `${blur.toFixed(2)}px`);
      card.dataset.far = distance > 3.25 ? "true" : "false";
    });
  }, []);

  const requestTransformUpdate = useCallback(() => {
    if (!transformFrameRef.current) transformFrameRef.current = window.requestAnimationFrame(updateTransforms);
  }, [updateTransforms]);

  const maxOffset = useCallback(() => {
    const container = containerRef.current;
    return container ? Math.max(0, container.scrollHeight - container.clientHeight) : 0;
  }, []);

  const offsetForIndex = useCallback((index: number) => {
    const container = containerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return 0;
    return clamp(card.offsetTop - (container.clientHeight - card.offsetHeight) / 2, 0, maxOffset());
  }, [maxOffset]);

  const nearestIndex = useCallback((offset: number) => {
    const container = containerRef.current;
    if (!container) return 0;
    const center = offset + container.clientHeight / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(card.offsetTop + card.offsetHeight / 2 - center);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    return nearest;
  }, []);

  const animateDesktopTo = useCallback((index: number, instant = false) => {
    const container = containerRef.current;
    if (!container) return;
    const target = offsetForIndex(index);
    const start = container.scrollTop;
    window.cancelAnimationFrame(motionFrameRef.current);
    motionFrameRef.current = 0;
    commitActiveIndex(index);

    if (instant || prefersReducedMotion() || Math.abs(target - start) < 0.5) {
      internalScrollRef.current = true;
      container.scrollTop = target;
      internalScrollRef.current = false;
      requestTransformUpdate();
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = clamp((now - startTime) / SWITCH_DURATION_MS, 0, 1);
      internalScrollRef.current = true;
      container.scrollTop = start + (target - start) * wheelEase(progress);
      internalScrollRef.current = false;
      requestTransformUpdate();
      if (progress < 1) motionFrameRef.current = window.requestAnimationFrame(tick);
      else motionFrameRef.current = 0;
    };
    motionFrameRef.current = window.requestAnimationFrame(tick);
  }, [commitActiveIndex, offsetForIndex, requestTransformUpdate]);

  const centerProject = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    if (!container) return;
    const safeIndex = clamp(index, 0, projects.length - 1);
    if (isDesktop()) {
      animateDesktopTo(safeIndex, behavior === "auto");
      return;
    }
    container.scrollTo({ top: offsetForIndex(safeIndex), behavior });
  }, [animateDesktopTo, offsetForIndex, projects.length]);

  const goToProject = useCallback((projectId: string, behavior: "smooth" | "instant" = "smooth") => {
    const index = projects.findIndex((project) => project.id === projectId);
    if (index < 0) return;
    document.getElementById("work")?.scrollIntoView({
      behavior: behavior === "instant" || prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    centerProject(index, behavior === "instant" ? "auto" : "smooth");
  }, [centerProject, projects]);

  useEffect(() => {
    const shell = shellRef.current;
    const container = containerRef.current;
    if (!shell || !container) return undefined;

    const finishGesture = () => {
      wheelAccumulatorRef.current = 0;
      gestureTriggeredRef.current = false;
    };

    const handleScroll = () => {
      requestTransformUpdate();
      if (isDesktop() || internalScrollRef.current) return;
      window.clearTimeout(gestureTimerRef.current);
      gestureTimerRef.current = window.setTimeout(() => {
        const nextIndex = nearestIndex(container.scrollTop);
        commitActiveIndex(nextIndex);
        centerProject(nextIndex);
      }, 150);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isDesktop() || event.deltaY === 0) return;
      const direction = Math.sign(event.deltaY);
      const atStart = activeIndexRef.current === 0;
      const atEnd = activeIndexRef.current === projects.length - 1;
      if ((direction < 0 && atStart) || (direction > 0 && atEnd)) {
        finishGesture();
        return;
      }

      event.preventDefault();
      window.clearTimeout(gestureTimerRef.current);
      gestureTimerRef.current = window.setTimeout(finishGesture, GESTURE_END_DELAY_MS);
      if (gestureTriggeredRef.current) return;

      const modeScale = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 18
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? container.clientHeight
          : 1;
      const normalizedDelta = clamp(event.deltaY * modeScale, -MAX_NORMALIZED_DELTA, MAX_NORMALIZED_DELTA);
      if (wheelAccumulatorRef.current !== 0 && Math.sign(wheelAccumulatorRef.current) !== Math.sign(normalizedDelta)) {
        wheelAccumulatorRef.current = 0;
      }
      wheelAccumulatorRef.current = clamp(wheelAccumulatorRef.current + normalizedDelta, -WHEEL_THRESHOLD, WHEEL_THRESHOLD);
      if (Math.abs(wheelAccumulatorRef.current) < WHEEL_THRESHOLD) return;

      gestureTriggeredRef.current = true;
      const nextIndex = clamp(activeIndexRef.current + Math.sign(wheelAccumulatorRef.current), 0, projects.length - 1);
      wheelAccumulatorRef.current = 0;
      animateDesktopTo(nextIndex);
    };

    const handleResize = () => animateDesktopTo(activeIndexRef.current, true);
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);
    cardRefs.current.forEach((card) => card && observer.observe(card));
    container.addEventListener("scroll", handleScroll, { passive: true });
    shell.addEventListener("wheel", handleWheel, { passive: false });
    animateDesktopTo(0, true);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", handleScroll);
      shell.removeEventListener("wheel", handleWheel);
      window.cancelAnimationFrame(transformFrameRef.current);
      window.cancelAnimationFrame(motionFrameRef.current);
      window.clearTimeout(gestureTimerRef.current);
    };
  }, [animateDesktopTo, centerProject, commitActiveIndex, nearestIndex, projects.length, requestTransformUpdate]);

  useEffect(() => {
    const handleGoTo = (event: Event) => {
      const detail = (event as CustomEvent<ProjectWheelGoToDetail>).detail;
      if (detail?.projectId) goToProject(detail.projectId, detail.behavior ?? "smooth");
    };
    const handleHashChange = () => {
      const projectId = window.location.hash.startsWith("#work-") ? window.location.hash.slice(6) : "";
      if (projectId) goToProject(projectId);
    };
    window.addEventListener(PROJECT_WHEEL_GO_TO_EVENT, handleGoTo);
    window.addEventListener("hashchange", handleHashChange);
    const initialProjectId = window.location.hash.startsWith("#work-") ? window.location.hash.slice(6) : "";
    if (initialProjectId) window.requestAnimationFrame(() => goToProject(initialProjectId, "instant"));
    return () => {
      window.removeEventListener(PROJECT_WHEEL_GO_TO_EVENT, handleGoTo);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [goToProject]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex = activeIndexRef.current;
    if (event.key === "ArrowDown") nextIndex = Math.min(projects.length - 1, nextIndex + 1);
    else if (event.key === "ArrowUp") nextIndex = Math.max(0, nextIndex - 1);
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = projects.length - 1;
    else if (event.key === "Enter") {
      event.preventDefault();
      onOpen(projects[activeIndexRef.current]);
      return;
    } else return;
    event.preventDefault();
    centerProject(nextIndex);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isDesktop() || event.pointerType === "touch" || event.button !== 0) return;
    const container = containerRef.current;
    if (!container) return;
    dragRef.current = { active: true, startY: event.clientY, startScrollTop: container.scrollTop, moved: false };
    container.setPointerCapture(event.pointerId);
    container.dataset.dragging = "true";
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const drag = dragRef.current;
    if (!container || !drag.active) return;
    const distance = event.clientY - drag.startY;
    if (Math.abs(distance) > 4) drag.moved = true;
    container.scrollTop = drag.startScrollTop - distance;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || !dragRef.current.active) return;
    dragRef.current.active = false;
    container.dataset.dragging = "false";
    if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
    if (dragRef.current.moved) centerProject(nearestIndex(container.scrollTop));
  };

  return {
    activeIndex,
    shellRef,
    containerRef,
    setCardRef,
    centerProject,
    goToProject,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
