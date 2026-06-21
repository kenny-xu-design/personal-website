import { useEffect } from "react";

export default function AnimationDirector() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    let cancelled = false;
    let cleanupAnimation: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;

        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;
        const enableParallax = window.matchMedia("(min-width: 1024px)").matches;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });

        const ctx = gsap.context(() => {
      gsap.set("[data-opening-panel]", { yPercent: 0 });
      gsap.set("[data-hero-title]", {
        clipPath: "inset(0 100% 0 0)",
        scaleX: 0.84,
        transformOrigin: "left center",
        y: 34,
      });
      gsap.set("[data-hero-kicker], [data-hero-copy], [data-hero-tags] > *, [data-hero-project]", {
        autoAlpha: 0,
        y: 34,
      });
      gsap.set("header", { autoAlpha: 0, y: -28, filter: "blur(12px)" });

      const opening = gsap.timeline({ defaults: { ease: "expo.out" } });
      opening
        .to("[data-opening-panel='top']", { yPercent: -101, duration: 1.45, ease: "power4.inOut" }, 0.08)
        .to("[data-opening-panel='bottom']", { yPercent: 101, duration: 1.45, ease: "power4.inOut" }, 0.08)
        .to("header", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.15 }, 0.58)
        .to("[data-hero-kicker]", { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12 }, 0.72)
        .to(
          "[data-hero-title]",
          { clipPath: "inset(0 0% 0 0)", scaleX: 1, y: 0, duration: 1.55 },
          0.86,
        )
        .to("[data-hero-copy]", { autoAlpha: 1, y: 0, duration: 1.08 }, 1.1)
        .to("[data-hero-tags] > *", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 1.22)
        .to("[data-hero-project]", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.11 }, 1.42)
        .set("[data-opening-panel]", { display: "none" })
        .call(() => ScrollTrigger.refresh());

      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
        const isStrengths = section.id === "strengths";
        const title = section.querySelector("[data-section-title]");
        const eyebrow = section.querySelector("[data-section-eyebrow]");
        const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-stagger-card]"));
        const images = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-image-reveal]"));
        const parallaxImages = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-parallax-image]"));

        if (eyebrow) {
          gsap.from(eyebrow, {
            autoAlpha: 0,
            y: isStrengths ? 20 : 30,
            duration: isStrengths ? 0.68 : 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          });
        }

        if (title) {
          gsap.fromTo(
            title,
            {
              autoAlpha: 0,
              y: isStrengths ? 72 : 120,
              scaleY: isStrengths ? 0.82 : 0.72,
              clipPath: "inset(0 0 100% 0)",
              transformOrigin: "left bottom",
            },
            {
              autoAlpha: 1,
              y: 0,
              scaleY: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: isStrengths ? 0.95 : 1.45,
              ease: "expo.out",
              scrollTrigger: {
                trigger: section,
                start: "top 74%",
                once: true,
              },
            },
          );
        }

        if (cards.length) {
          ScrollTrigger.batch(cards, {
            start: "top 86%",
            once: true,
            onEnter: (batch) => {
              gsap.fromTo(
                batch,
                {
                  autoAlpha: 0,
                  y: isStrengths ? 46 : 80,
                  scale: isStrengths ? 0.982 : 0.965,
                  filter: isStrengths ? "blur(8px)" : "blur(14px)",
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: isStrengths ? 0.72 : 1.08,
                  stagger: isStrengths ? 0.08 : 0.14,
                  ease: "power3.out",
                  clearProps: "transform,filter,visibility,opacity",
                },
              );
            },
          });
        }

        images.forEach((image) => {
          gsap.fromTo(
            image,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.35,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: image,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

        if (enableParallax) {
          parallaxImages.forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -3, scale: 1.04 },
              {
                yPercent: 3,
                scale: 1.07,
                ease: "none",
                scrollTrigger: {
                  trigger: image,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              },
            );
          });
        }
      });
        });

        cleanupAnimation = () => ctx.revert();
      },
    );

    return () => {
      cancelled = true;
      cleanupAnimation?.();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <div data-opening-panel="top" className="absolute inset-x-0 top-0 h-1/2 bg-ink-950" />
      <div data-opening-panel="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-950" />
    </div>
  );
}
