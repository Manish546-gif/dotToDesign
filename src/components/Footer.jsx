import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_COLUMNS = [
  [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/studio" },
  ],
  [
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Cookie Policy", href: "#cookies" },
  ],
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com", target: "_blank", rel: "noopener noreferrer" },
  { label: "Instagram", href: "https://instagram.com/dot.todesign", target: "_blank", rel: "noopener noreferrer" },
];

const SANS = "font-[family-name:var(--font-family-brand),sans-serif]";
const MONO = "font-[family-name:var(--font-family-mono),monospace]";

const SEAL_POINTS = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * Math.PI * 2;
  const radius = i % 2 === 0 ? 47 : 40;
  return `${(56 + Math.cos(angle) * radius).toFixed(2)},${(60 + Math.sin(angle) * radius).toFixed(2)}`;
}).join(" ");

function ArrowUpRight({ className = "h-3 w-3" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function BCorpBadge() {
  return (
    <svg
      viewBox="0 0 100 132"
      role="img"
      aria-label="Certified B Corporation"
      className="h-16 w-auto text-[var(--color-text-primary)] opacity-85 transition-opacity duration-300 hover:opacity-100 sm:h-20 lg:h-24"
      style={{ fontFamily: "inherit" }}
    >
      <text x="50" y="14" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">
        Certified
      </text>
      <circle cx="50" cy="66" r="29" fill="none" stroke="currentColor" strokeWidth="4" />
      <text x="50" y="81" textAnchor="middle" fontSize="42" fontWeight="700" fill="currentColor">
        B
      </text>
      <line x1="22" y1="108" x2="78" y2="108" stroke="currentColor" strokeWidth="3" />
      <text x="50" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">
        Corporation
      </text>
    </svg>
  );
}

function OnePercentBadge() {
  return (
    <svg
      viewBox="0 0 110 132"
      role="img"
      aria-label="One percent for the Planet member"
      className="h-16 w-auto text-[var(--color-text-primary)] opacity-85 transition-opacity duration-300 hover:opacity-100 sm:h-20 lg:h-24"
      style={{ fontFamily: "inherit" }}
    >
      <circle cx="55" cy="46" r="41" fill="currentColor" />
      <text x="44" y="63" textAnchor="middle" fontSize="50" fontWeight="700" fill="var(--color-bg-canvas)">
        1
      </text>
      <text x="72" y="42" fontSize="19" fontWeight="700" fill="var(--color-bg-canvas)">
        %
      </text>
      <text x="55" y="108" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor">
        FOR THE
      </text>
      <text x="55" y="126" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor">
        PLANET.
      </text>
    </svg>
  );
}

function CleanCreativesBadge() {
  return (
    <svg
      viewBox="0 0 112 120"
      role="img"
      aria-label="Clean Creatives approved"
      className="h-16 w-auto text-[var(--color-text-primary)] opacity-85 transition-opacity duration-300 hover:opacity-100 sm:h-20 lg:h-24"
      style={{ fontFamily: "inherit" }}
    >
      <defs>
        <path id="ccTopArc" d="M28 60 A28 28 0 0 1 84 60" fill="none" />
        <path id="ccBottomArc" d="M86 60 A30 30 0 0 1 26 60" fill="none" />
      </defs>
      <polygon points={SEAL_POINTS} fill="none" stroke="currentColor" strokeWidth="1.4" />
      <text fontSize="8.5" letterSpacing="1.1" fill="currentColor">
        <textPath href="#ccTopArc" startOffset="50%" textAnchor="middle">
          CLEAN CREATIVES
        </textPath>
      </text>
      <text fontSize="8.5" letterSpacing="1.4" fill="currentColor">
        <textPath href="#ccBottomArc" startOffset="50%" textAnchor="middle">
          APPROVED
        </textPath>
      </text>
      <text
        x="45"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="29"
        fontWeight="700"
        fill="currentColor"
      >
        C
      </text>
      <text
        x="68"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="29"
        fontWeight="700"
        fill="currentColor"
        transform="rotate(180 68 60)"
      >
        C
      </text>
    </svg>
  );
}

function RollingChars({ text, hoverColor }) {
  const words = text.split(" ");
  let charCounter = 0;

  return (
    <span className="rolling-chars-wrap" aria-hidden="true">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="rolling-word">
          {word.split("").map((char, charIndex) => {
            const delay = `${charCounter * 18}ms`;
            charCounter++;
            return (
              <span key={charIndex} className="rolling-char-box">
                <span
                  className="rolling-char-top"
                  style={{ transitionDelay: delay }}
                >
                  {char}
                </span>
                <span
                  className="rolling-char-bottom"
                  style={{
                    transitionDelay: delay,
                    color: hoverColor || "var(--color-text-accent)",
                  }}
                  aria-hidden="true"
                >
                  {char}
                </span>
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}

function RollingLink({
  href,
  onClick,
  target,
  rel,
  children,
  className = "",
  style = {},
  hoverColor = "var(--color-text-accent)",
  underlineColor = "var(--color-text-accent)",
  trailing,
}) {
  const isString = typeof children === "string";

  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`rolling-link ${className}`}
      style={style}
    >
      <span className="rolling-link-content">
        {isString ? (
          <>
            <span className="rolling-link-sr">{children}</span>
            <RollingChars text={children} hoverColor={hoverColor} />
          </>
        ) : (
          children
        )}
        <span
          className="rolling-underline"
          style={{
            backgroundColor: underlineColor || hoverColor || "currentColor",
          }}
          aria-hidden="true"
        />
      </span>
      {trailing}
    </a>
  );
}

export default function Footer({
  wordmark = "DotToDesign",
  copyright = `Copyright © ${new Date().getFullYear()} Dot To Design®`,
  className = "",
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
      timeZone: "Europe/London",
    });

    const update = () => setTime(formatter.format(new Date()));

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`w-full px-6 pb-10 pt-16 transition-colors duration-300 sm:px-10 sm:pt-20 lg:px-12 lg:pt-24 ${className}`}
      style={{
        backgroundColor: "var(--color-bg-canvas)",
        color: "var(--color-text-primary)",
      }}
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Big Wordmark */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`${SANS} select-none text-[clamp(2.75rem,10.2vw,8.5rem)] font-medium leading-[0.85] tracking-[-0.04em] text-[var(--color-text-primary)]`}
        >
          {wordmark}
        </motion.h2>

        {/* Sustainability & Impact Section */}
        <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[820px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className={`${MONO} text-[11px] uppercase tracking-[0.18em] sm:text-[12px] text-[var(--color-text-secondary)]`}
              >
                (Sustainability)
              </p>

              <p
                className={`${SANS} mt-5 text-[clamp(0.95rem,1.2vw,1.25rem)] leading-[1.45] text-[var(--color-text-secondary)]`}
              >
                Dot To Design has a deep-rooted commitment to sustainability — it&apos;s the
                foundation of everything we do. We partner exclusively with climate-led and
                purpose-driven startups, using design as a force for lasting impact. From the
                choices we make to the clients we support, our work accelerates solutions that
                restore, regenerate, and reshape our future for the better.
              </p>

              <div className="mt-10 inline-flex flex-wrap items-center gap-x-6 sm:mt-12">
                <RollingLink
                  href="/journal"
                  className={`${SANS} text-[clamp(1.5rem,3vw,3rem)] leading-[1.1] tracking-[-0.035em] text-[var(--color-text-primary)]`}
                  hoverColor="var(--color-text-accent)"
                  underlineColor="var(--color-text-accent)"
                >
                  Impact Report
                </RollingLink>
                <RollingLink
                  href="/services"
                  className={`${SANS} text-[clamp(1.5rem,3vw,3rem)] leading-[1.1] tracking-[-0.035em] text-[var(--color-text-accent)]`}
                  hoverColor="var(--color-text-accent)"
                  underlineColor="var(--color-text-accent)"
                  trailing={
                    <ArrowUpRight className="h-[0.55em] w-[0.55em] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  }
                >
                  Screening
                </RollingLink>
              </div>
            </motion.div>
          </div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex shrink-0 items-center gap-6 sm:gap-8 lg:gap-10"
          >
            <BCorpBadge />
            <OnePercentBadge />
            <CleanCreativesBadge />
          </motion.div>
        </div>

        {/* Hairline Divider */}
        <div
          className="mt-14 border-t sm:mt-16 lg:mt-24"
          style={{ borderColor: "var(--color-border-subtle)" }}
        />

        {/* Links Grid */}
        <div className="grid gap-12 py-12 sm:py-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p
              className={`${MONO} text-[11px] uppercase tracking-[0.18em] sm:text-[12px] text-[var(--color-text-secondary)]`}
            >
              (Navigate)
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-9 sm:mt-10 sm:gap-x-12">
              {NAV_COLUMNS.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-2.5 sm:gap-3">
                  {column.map((link) => (
                    <RollingLink
                      key={link.label}
                      href={link.href}
                      className={`${SANS} text-[clamp(1.05rem,1.7vw,1.55rem)] leading-[1.5] tracking-[-0.03em] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]`}
                      hoverColor="var(--color-text-accent)"
                      underlineColor="var(--color-text-accent)"
                    >
                      {link.label}
                    </RollingLink>
                  ))}

                  {columnIndex === 1 && (
                    <RollingLink
                      href="/contact"
                      className={`${SANS} mt-1 text-[clamp(1.05rem,1.7vw,1.55rem)] leading-[1.5] tracking-[-0.03em] text-[var(--color-text-accent)]`}
                      hoverColor="var(--color-text-accent)"
                      underlineColor="var(--color-text-accent)"
                      trailing={
                        <span
                          className="rolling-arrow-box grid h-6 w-6 place-items-center rounded-[4px] sm:h-7 sm:w-7"
                          style={{
                            backgroundColor: "var(--color-bg-accent)",
                            color: "var(--color-text-on-accent)",
                          }}
                        >
                          <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </span>
                      }
                    >
                      Book an intro
                    </RollingLink>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              className={`${MONO} text-[11px] uppercase tracking-[0.18em] sm:text-[12px] text-[var(--color-text-secondary)]`}
            >
              (Socials)
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4">
              {SOCIAL_LINKS.map((link) => (
                <RollingLink
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  className={`${SANS} text-[clamp(1.5rem,3.4vw,3.1rem)] leading-[1.15] tracking-[-0.04em] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]`}
                  hoverColor="var(--color-text-accent)"
                  underlineColor="var(--color-text-accent)"
                >
                  {link.label}
                </RollingLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Hairline */}
        <div
          className="border-t"
          style={{ borderColor: "var(--color-border-subtle)" }}
        />

        {/* Bottom Bar: Clock, Copyright, Back to Top */}
        <div className="grid gap-6 pt-8 md:grid-cols-3 md:items-center">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                style={{ backgroundColor: "var(--color-bg-accent)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--color-bg-accent)" }}
              />
            </span>
            <span
              className={`${MONO} rounded-[6px] border px-3 py-1.5 text-[11px] tracking-[0.08em] sm:text-[12px]`}
              style={{
                borderColor: "var(--color-border-default)",
                backgroundColor: "var(--color-bg-surface-sunken)",
                color: "var(--color-text-secondary)",
              }}
            >
              ONLINE <span className="px-1 text-[var(--color-text-accent)]">→</span> BIRMINGHAM, UK {time}
            </span>
          </div>

          <p
            className={`${SANS} text-center text-[clamp(0.85rem,1.1vw,1rem)] tracking-[-0.01em] text-[var(--color-text-secondary)]`}
          >
            {copyright}
          </p>

          <RollingLink
            href="#main"
            onClick={scrollToTop}
            className={`${SANS} text-[clamp(0.85rem,1.1vw,1rem)] tracking-[-0.01em] text-[var(--color-text-secondary)] md:justify-self-end`}
            hoverColor="var(--color-text-accent)"
            underlineColor="var(--color-text-accent)"
          >
            Back to top ↑
          </RollingLink>
        </div>
      </div>
    </footer>
  );
}
