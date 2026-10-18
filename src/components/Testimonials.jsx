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
  const openingBackdropRef = useRef(null);
  const openingContentRef = useRef(null);
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const counters = () =>
      [counterRef.current, mobileCounterRef.current].filter(Boolean);
    let currentIndex = -1;
    const setCounter = (index) => {
      if (index === currentIndex) return;
      currentIndex = index;
      counters().forEach((element) => {
        element.textContent = String(index + 1).padStart(2, "0");
      });
      gsap.fromTo(
        counters(),
        { yPercent: 40, opacity: 1 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        },
      );
    };
    const media = gsap.matchMedia();
    let openingTimeline;
    if (!reducedMotion) {
      openingTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=70%",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        })
        .to(leftHalfRef.current, { xPercent: -100, ease: "none" }, 0)
        .to(rightHalfRef.current, { xPercent: 100, ease: "none" }, 0)
        .to(openingBackdropRef.current, { opacity: 1, ease: "none" }, 0.35)
        .to(
          openingContentRef.current,
          { opacity: 1, ease: "power2.out" },
          0.68,
        );
    } else {
      gsap.set(leftHalfRef.current, { xPercent: -100 });
      gsap.set(rightHalfRef.current, { xPercent: 100 });
      gsap.set(openingBackdropRef.current, { opacity: 1 });
      gsap.set(openingContentRef.current, { opacity: 1 });
    }
    const build = ({ isDesktop }) => {
      const cards = cardsRef.current.slice(0, total).filter(Boolean);
      if (cards.length !== total) return undefined;
      const cardWidth = () => cards[0].offsetWidth;
      const cardHeight = () => cards[0].offsetHeight;
      const driftX = (index) =>
        (index % 2 === 0 ? 1 : -1) * cardWidth() * (isDesktop ? 0.3 : 0.18);
      const tilt = (index) => (index % 2 === 0 ? 10 : -10);
      cards.forEach((card, index) =>
        gsap.set(card, {
          zIndex: total - index,
          transformPerspective: 1400,
          transformOrigin: "50% 0%",
          x: 0,
          rotation: 0,
          rotationX: 0,
          y: reducedMotion ? 0 : index * stackY,
          scale: reducedMotion ? 1 : 1 - index * stackScale,
          opacity: 1,
          force3D: true,
        }),
      );
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(total - 1) * (isDesktop ? 90 : 75)}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          snap: reducedMotion
            ? undefined
            : {
                snapTo: "labels",
                duration: { min: 0.3, max: 0.8 },
                delay: 0.12,
                ease: "power2.inOut",
              },
          onUpdate: () =>
            setCounter(
              Math.min(total - 1, Math.max(0, Math.round(timeline.time()))),
            ),
        },
      });
      cards.forEach((_, index) => timeline.addLabel(`card${index}`, index));
      for (let index = 0; index < total - 1; index += 1) {
        const card = cards[index];
        if (reducedMotion) {
          timeline.to(card, { opacity: 1, duration: 1, ease: "none" }, index);
          timeline.to(
            cards[index + 1],
            { opacity: 1, duration: 1, ease: "none" },
            index,
          );
          continue;
        }
        timeline.to(
          card,
          {
            rotation: tilt(index),
            rotationX: 100,
            x: () => driftX(index),
            y: () => -cardHeight() * 0.22,
            duration: 1,
          },
          index,
        );
        timeline.to(
          card,
          { opacity: 1, duration: 0.25, ease: "none" },
          index + 0.75,
        );
        for (let next = index + 1; next < total; next += 1) {
          const depth = next - index - 1;
          timeline.to(
            cards[next],
            { y: depth * stackY, scale: 1 - depth * stackScale, duration: 1 },
            index,
          );
        }
      }
      timeline.to({}, { duration: endHold }, total - 1);
      return () => {
        currentIndex = -1;
      };
    };
    media.add(
      {
        isDesktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => build({ isDesktop: context.conditions.isDesktop }),
    );
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      openingTimeline?.scrollTrigger?.kill();
      openingTimeline?.kill();
      gsap.killTweensOf(counters());
      media.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Testimonials"
      className="testimonials-react relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden select-none"
    >
      <div
        ref={openingBackdropRef}
        className="testimonials-react__backdrop absolute inset-0 z-0 opacity-0"
        aria-hidden="true"
      />
      <div
        className="testimonials-react__opening absolute inset-0 z-30 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={leftHalfRef}
          className="absolute inset-y-0 left-0 w-1/2 will-change-transform"
        >
          <img
            src={leftHalf}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
            className="h-full w-full object-cover object-center select-none"
          />
        </div>
        <div
          ref={rightHalfRef}
          className="absolute inset-y-0 right-0 w-1/2 will-change-transform"
        >
          <img
            src={rightHalf}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
            className="h-full w-full object-cover object-center select-none"
          />
        </div>
      </div>
      <div
        ref={openingContentRef}
        className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 opacity-0"
      >
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
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
            <div className="relative h-[min(52svh,480px)] w-[min(23rem,78vw)] sm:w-[380px] md:w-[410px] mb-20 md:mb-18">
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
