import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent, RefObject } from "react";
import type { Project } from "../data/projects";

type UseProjectWheelOptions = { projects: Project[]; onOpen: (project: Project) => void };

type ProjectWheelApi = {
  activeIndex: number;
  containerRef: RefObject<HTMLDivElement | null>;
  setCardRef: (index: number, node: HTMLElement | null) => void;
  centerProject: (index: number, behavior?: ScrollBehavior) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function useProjectWheel({ projects, onOpen }: UseProjectWheelOptions): ProjectWheelApi {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const frameRef = useRef(0);
  const settleTimerRef = useRef(0);
  const activeIndexRef = useRef(0);
  const dragRef = useRef({ active: false, startY: 0, startScrollTop: 0, moved: false });
  const [activeIndex, setActiveIndex] = useState(0);

  const setCardRef = useCallback((index: number, node: HTMLElement | null) => {
    cardRefs.current[index] = node;
  }, []);

  const updateTransforms = useCallback(() => {
    frameRef.current = 0;
    const container = containerRef.current;
    if (!container) return;
    const containerCenter = container.scrollTop + container.clientHeight / 2;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardHeight = Math.max(card.offsetHeight, 1);
      const delta = (card.offsetTop + cardHeight / 2 - containerCenter) / cardHeight;
      const distance = Math.abs(delta);
      const renderDistance = Math.min(distance, 3.5);
      const rotateX = reducedMotion ? 0 : clamp(delta * -22, -40, 40);
      const translateZ = reducedMotion ? 0 : -renderDistance * 70;
      const scale = reducedMotion ? 1 : 1 - Math.min(renderDistance * 0.08, 0.24);
      const opacity = 1 - Math.min(renderDistance * 0.22, 0.72);
      const blur = reducedMotion ? 0 : Math.min(renderDistance * 1.5, 4);
      card.style.setProperty("--rotate-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--translate-z", `${translateZ.toFixed(2)}px`);
      card.style.setProperty("--scale", scale.toFixed(3));
      card.style.setProperty("--opacity", opacity.toFixed(3));
      card.style.setProperty("--blur", `${blur.toFixed(2)}px`);
      card.dataset.far = distance > 3.5 ? "true" : "false";
    });
  }, []);

  const nearestIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;
    const center = container.scrollTop + container.clientHeight / 2;
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

  const centerProject = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;
    container.scrollTo({ top: card.offsetTop - (container.clientHeight - card.offsetHeight) / 2, behavior });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const requestUpdate = () => {
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(updateTransforms);
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(() => {
        const nextIndex = nearestIndex();
        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }
        centerProject(nextIndex);
      }, 150);
    };
    const handleWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches || event.deltaY === 0) return;
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      const canScrollUp = event.deltaY < 0 && container.scrollTop > 0;
      const canScrollDown = event.deltaY > 0 && container.scrollTop < maxScrollTop - 1;
      if (!canScrollUp && !canScrollDown) return;
      event.preventDefault();
      container.scrollTop += event.deltaY * 0.65;
    };
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(container);
    cardRefs.current.forEach((card) => card && observer.observe(card));
    container.addEventListener("scroll", requestUpdate, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: false });
    centerProject(0, "auto");
    updateTransforms();
    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", requestUpdate);
      container.removeEventListener("wheel", handleWheel);
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(settleTimerRef.current);
    };
  }, [centerProject, nearestIndex, updateTransforms]);

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
    if (window.matchMedia("(min-width: 1024px)").matches || event.pointerType === "touch" || event.button !== 0) return;
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
    if (dragRef.current.moved) centerProject(nearestIndex());
  };

  return { activeIndex, containerRef, setCardRef, centerProject, onKeyDown, onPointerDown, onPointerMove, onPointerUp };
}
