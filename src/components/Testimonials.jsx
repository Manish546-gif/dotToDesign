import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import avatar1 from "../../assets/img/avc-hero.jpg";
import avatar2 from "../../assets/img/arealis-hero.jpg";
import avatar3 from "../../assets/img/praanah-hero.jpg";
import avatar4 from "../../assets/img/miamour-hero.jpg";
import leftHalf from "../../assets/img/8(1).webp";
import rightHalf from "../../assets/img/8(2).webp";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const testimonials = [
  {
    id: "01",
    quote:
      "Working with DotToDesign felt like having an internal team rather than an external agency. They were proactive, detail-oriented, and genuinely invested in the outcome.",
    name: "AVC Infra Director",
    role: "AVC Infra Pvt. Ltd.",
    avatar: avatar1,
  },
  {
    id: "02",
    quote:
      "DotToDesign elevated our digital presence from standard to extraordinary. Their attention to motion, typography, and micro-interactions set a new benchmark for our industry.",
    name: "Arealis Founder",
    role: "Arealis",
    avatar: avatar2,
  },
  {
    id: "03",
    quote:
      "The speed and craft of their execution was unmatched. They turned a complex product narrative into a seamless, high-converting digital experience.",
    name: "Praanah Wellness Founder",
    role: "Praanah Wellness",
    avatar: avatar3,
  },
  {
    id: "04",
    quote:
      "From initial brand identity to the final web build, every detail was considered. DotToDesign built a brand we are proud of.",
    name: "Mi Amour Owner",
    role: "Mi Amour",
    avatar: avatar4,
  },
];

const total = testimonials.length;
const totalLabel = String(total).padStart(2, "0");
const stackY = 30;
const stackScale = 0.05;
const endHold = 0.5;
const introLength = 0.8; // timeline units used by the image-split opening

// Set DEBUG to true while testing: shows ScrollTrigger markers and logs
// anything in the parent chain that can break pinning (check the console).
const DEBUG = true;
// Smooths touch scrolling and fixes address-bar jitter on phones.
// Turn this off if the site already uses Lenis / Locomotive / ScrollSmoother.
const NORMALIZE_MOBILE = true;

function logPinBlockers(section) {
  let el = section.parentElement;
  while (el && el !== document.documentElement) {
    const s = getComputedStyle(el);
    const problems = [];
    if (s.transform !== "none") problems.push(`transform: ${s.transform}`);
    if (s.filter !== "none") problems.push(`filter: ${s.filter}`);
    if (s.perspective !== "none") problems.push(`perspective: ${s.perspective}`);
    if (s.willChange && /transform|filter|perspective/.test(s.willChange))
      problems.push(`will-change: ${s.willChange}`);
    if (s.contain && /paint|layout|strict|content/.test(s.contain))
      problems.push(`contain: ${s.contain}`);
    if (/(hidden|auto|scroll|clip)/.test(s.overflowY))
      problems.push(`overflow-y: ${s.overflowY}`);
    if (/(hidden|auto|scroll|clip)/.test(s.overflowX))
      problems.push(`overflow-x: ${s.overflowX}`);
    if (problems.length) {
      // eslint-disable-next-line no-console
      console.warn(
        "[Testimonials] ancestor may break pinning:",
        el,
        problems.join(" | "),
      );
    }
    el = el.parentElement;
  }
  const html = getComputedStyle(document.documentElement);
  const body = getComputedStyle(document.body);
  // eslint-disable-next-line no-console
  console.log("[Testimonials] html overflow:", html.overflowX, html.overflowY,
    "| body overflow:", body.overflowX, body.overflowY,
    "| body height:", body.height);
}

function DotToDesignMark() {
  return (
    <svg
      className="h-6 w-auto"
      viewBox="0 0 72 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DotToDesign logo"
    >
      <path
        d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16V6H16ZM22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10H22V16Z"
        fill="currentColor"
      />
      <path
        d="M56 26C61.5228 26 66 21.5228 66 16C66 10.4772 61.5228 6 56 6C50.4772 6 46 10.4772 46 16V26H56ZM50 16C50 12.6863 52.6863 10 56 10C59.3137 10 62 12.6863 62 16C62 19.3137 59.3137 22 56 22H50V16Z"
        fill="currentColor"
      />
      <circle cx="36" cy="16" r="3.2" fill="var(--color-bg-accent)" />
    </svg>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const counterRef = useRef(null);
  const mobileCounterRef = useRef(null);
  const leftHalfRef = useRef(null);
  const rightHalfRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const counters = () =>
      [counterRef.current, mobileCounterRef.current].filter(Boolean);

    let currentIndex = -1;
    const setCounter = (index) => {
      if (index === currentIndex) return;
      currentIndex = index;
      counters().forEach((el) => {
        el.textContent = String(index + 1).padStart(2, "0");
      });
      gsap.fromTo(
        counters(),
        { yPercent: 40 },
        { yPercent: 0, duration: 0.35, ease: "power2.out", overwrite: true },
      );
    };

    const media = gsap.matchMedia();

    media.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;
        const cards = cardsRef.current.slice(0, total).filter(Boolean);
        if (!total || cards.length !== total) return undefined;

        const intro = reduceMotion ? 0 : introLength;
        const duration = intro + (total - 1) + endHold;
        const vhPerUnit = isDesktop ? 90 : 75;

        const cardWidth = () => cards[0].offsetWidth;
        const cardHeight = () => cards[0].offsetHeight;
        const driftX = (i) =>
          (i % 2 === 0 ? 1 : -1) * cardWidth() * (isDesktop ? 0.3 : 0.18);
        const tilt = (i) => (i % 2 === 0 ? 10 : -10);

        // initial card stack
        cards.forEach((card, i) =>
          gsap.set(card, {
            zIndex: total - i,
            transformPerspective: 1400,
            transformOrigin: "50% 0%",
            x: 0,
            rotation: 0,
            rotationX: 0,
            y: reduceMotion ? 0 : i * stackY,
            scale: reduceMotion ? 1 : 1 - i * stackScale,
            opacity: 1,
            force3D: true,
          }),
        );

        // snap only AFTER the opening phase, so it can't fight the image split
        const snapTo = (progress) => {
          const t = progress * duration;
          if (t < intro) return progress;
          const snapped = Math.round(Math.min(t - intro, total - 1));
          return (intro + snapped) / duration;
        };

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${duration * vhPerUnit}%`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: DEBUG,
            scrub: 1,
            invalidateOnRefresh: true,
            snap: reduceMotion
              ? undefined
              : {
                  snapTo,
                  duration: { min: 0.3, max: 0.8 },
                  delay: 0.12,
                  ease: "power2.inOut",
                },
            onUpdate: () =>
              setCounter(
                Math.min(
                  total - 1,
                  Math.max(0, Math.round(timeline.time() - intro)),
                ),
              ),
          },
        });

        // Phase 1: image halves open (no backdrop/content fade)
        if (intro > 0) {
          timeline
            .to(
              leftHalfRef.current,
              { xPercent: -100, duration: intro, ease: "none" },
              0,
            )
            .to(
              rightHalfRef.current,
              { xPercent: 100, duration: intro, ease: "none" },
              0,
            );
        } else {
          gsap.set(leftHalfRef.current, { xPercent: -100 });
          gsap.set(rightHalfRef.current, { xPercent: 100 });
        }

        // Phase 2: cards
        cards.forEach((_, i) => timeline.addLabel(`card${i}`, intro + i));

        for (let i = 0; i < total - 1; i += 1) {
          const at = intro + i;
          const card = cards[i];

          if (reduceMotion) {
            timeline.to(card, { opacity: 0, duration: 1, ease: "none" }, at);
            continue;
          }

          timeline.to(
            card,
            {
              rotation: tilt(i),
              rotationX: 100,
              x: () => driftX(i),
              y: () => -cardHeight() * 0.22,
              duration: 1,
            },
            at,
          );
          timeline.to(
            card,
            { opacity: 0, duration: 0.25, ease: "none" },
            at + 0.75,
          );

          for (let next = i + 1; next < total; next += 1) {
            const depth = next - i - 1;
            timeline.to(
              cards[next],
              { y: depth * stackY, scale: 1 - depth * stackScale, duration: 1 },
              at,
            );
          }
        }

        timeline.to({}, { duration: endHold }, intro + total - 1);

        return () => {
          currentIndex = -1;
        };
      },
    );

    if (DEBUG) logPinBlockers(section);

    const normalizer =
      NORMALIZE_MOBILE && ScrollTrigger.isTouch
        ? ScrollTrigger.normalizeScroll(true)
        : null;

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    // images change layout once decoded; refresh again after a short delay
    const lateRefresh = window.setTimeout(refresh, 600);

    return () => {
      window.clearTimeout(lateRefresh);
      normalizer?.kill();
      window.removeEventListener("load", refresh);
      gsap.killTweensOf(counters());
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Testimonials"
      className="testimonials-react relative flex w-full items-center justify-center overflow-hidden select-none"
      style={{ height: "100vh", minHeight: "100svh" }}
    >
      {/* backdrop is always visible */}
      <div
        className="testimonials-react__backdrop absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* image halves */}
      <div
        className="testimonials-react__opening absolute inset-0 z-30 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={leftHalfRef}
          className="absolute top-0 left-0 h-full w-1/2 will-change-transform"
        >
          <img
            src={leftHalf}
            alt=""
            loading="eager"
            decoding="async"
            draggable="false"
            className="select-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              maxWidth: "none",
              objectFit: "cover",
              objectPosition: "right center",
            }}
          />
        </div>
        <div
          ref={rightHalfRef}
          className="absolute top-0 right-0 h-full w-1/2 will-change-transform"
        >
          <img
            src={rightHalf}
            alt=""
            loading="eager"
            decoding="async"
            draggable="false"
            className="select-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              maxWidth: "none",
              objectFit: "cover",
              objectPosition: "left center",
            }}
          />
        </div>
      </div>

      {/* content: always visible, sits under the images until they split */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-6">
          <div className="w-full md:w-1/5 flex justify-between md:justify-start items-center">
            <span className="testimonials-react__eyebrow">(Testimonials)</span>
            <div
              className="testimonials-react__counter md:hidden"
              aria-hidden="true"
            >
              <span ref={mobileCounterRef}>01</span>
              <span className="mx-1">/</span>
              <span>{totalLabel}</span>
            </div>
          </div>

          <div className="w-full md:w-3/5 flex justify-center items-center relative">
            <div className="relative h-[min(52svh,480px)] w-[min(23rem,78vw)] sm:w-[380px] md:w-[410px] mt-4 md:mt-0 md:mb-18">
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.id}
                  ref={(element) => {
                    cardsRef.current[index] = element;
                  }}
                  className="testimonials-react__card absolute inset-0 flex flex-col justify-between p-6 sm:p-7"
                  style={{
                    zIndex: total - index,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <DotToDesignMark />
                    <div
                      className="testimonials-react__dots flex items-center gap-1.5"
                      aria-label={`Testimonial ${testimonial.id} of ${totalLabel}`}
                    >
                      {testimonials.map((dot) => (
                        <span
                          key={dot.id}
                          className={
                            dot.id === testimonial.id ? "is-active" : ""
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="my-auto py-5 sm:py-6">
                    <p className="testimonials-react__quote">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>

                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="testimonials-react__avatar w-9 h-9 sm:w-10 sm:h-10 object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="testimonials-react__name truncate">
                        {testimonial.name}
                      </span>
                      <span className="testimonials-react__role truncate mt-0.5">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            className="hidden md:flex w-1/5 justify-end items-center"
            aria-hidden="true"
          >
            <div className="testimonials-react__counter flex items-center select-none">
              <span ref={counterRef}>01</span>
              <span className="mx-1">/</span>
              <span>{totalLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}