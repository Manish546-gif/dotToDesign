import { useState } from 'react';

const FAQS = [
  {
    number: '01',
    question: 'What makes a great fit for DotToDesign?',
    answer: "We work best with ambitious founders and purpose-driven teams who have real conviction, not just about their product, but about the change they're trying to make in the world. Most of our clients are startups and scaleups in the climate, sustainability, or social impact space, at a critical inflection point. If you're serious about design as a lever for clarity, traction and growth (and you're not afraid of being challenged along the way) we'll get along just fine.",
  },
  {
    number: '02',
    question: 'What will the process look like?',
    answer: 'Every engagement starts with a short discovery call to understand where you are and where you need to go. From there we map the work into clear phases — strategy, identity, interface, and delivery — with a shared workspace, weekly reviews, and a live prototype you can open at any time. No black boxes, no surprise invoices, and you can pause or reshape the plan whenever the work calls for it.',
  },
  {
    number: '03',
    question: 'How much does it cost to work with you?',
    answer: "We scope every project around the outcome rather than a fixed hourly rate. A focused identity or product sprint typically starts in the low five figures, while a full end-to-end partnership is priced per phase so you can invest where it matters most. Once we've had the discovery call we'll send a transparent proposal with deliverables, timeline, and cost — no padded line items.",
  },
  {
    number: '04',
    question: 'Can you just build us a website?',
    answer: "We can, but we'd rather help you build the thing that makes a website worth visiting. That usually means clarifying the story, sharpening the identity, and designing the interface first, then handing a build-ready system to our engineering team or a trusted partner. If a site really is all you need, we'll say so and keep the scope honest.",
  },
];

function Chevron({ open }) {
  return (
    <svg className={`faq__chevron${open ? ' is-open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq section" aria-labelledby="faq-title">
      <div className="container faq__layout">
        <div className="faq__intro" data-reveal>
          <p className="t-bracket">(Frequently asked questions)</p>
          <h2 className="t-h1" id="faq-title">Strong partnerships are built on <span>transparency</span> from day one.</h2>
        </div>
        <div className="faq__list" data-reveal-group>
          {FAQS.map((item, index) => {
            const open = openIndex === index;
            const panelId = `faq-panel-${item.number}`;
            const buttonId = `faq-button-${item.number}`;
            return (
              <div className={`faq__item${open ? ' is-open' : ''}`} key={item.number} data-reveal>
                <button id={buttonId} className="faq__button" type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : index)}>
                  <span className="faq__number">{item.number}</span>
                  <span className="faq__question">{item.question}</span>
                  <Chevron open={open} />
                </button>
                <div id={panelId} className="faq__panel" role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}