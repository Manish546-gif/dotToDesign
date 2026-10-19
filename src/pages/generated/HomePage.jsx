import { usePageRuntime } from '../pageRuntime.js';
import Testimonials from '../../components/Testimonials.jsx';
import Faq from '../../components/Faq.jsx';
import Footer from '../../components/Footer.jsx';

/* ------------------------------------------------------------------ */
/* Small presentational pieces (rendered DOM is identical to before,   */
/* so existing CSS and pageRuntime selectors keep working).            */
/* ------------------------------------------------------------------ */

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

const ArrowIcon = () => (
  <svg {...svgProps}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);


const ThemeToggle = () => (
  <button
    className="theme-toggle"
    type="button"
    role="switch"
    aria-checked="true"
    aria-label="Dark mode"
    data-theme-toggle
  >
    <span className="t-dark">
      <svg {...svgProps}>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
    </span>
    <span className="t-light">
      <svg {...svgProps}>
        <circle cx={12} cy={12} r={4} />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </span>
  </button>
);

const Mark = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 433 282" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M188.399 281.71H0V244.385H188.399V281.71Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M188.399 131.524H188.396C188.397 131.672 188.399 131.82 188.399 131.968C188.399 184.238 146.224 226.612 94.1995 226.612C42.1746 226.612 0 184.238 0 131.968C0 79.6979 42.1746 37.3244 94.1995 37.3244C115.566 37.3244 135.271 44.4729 151.075 56.5177V0H188.399V131.524ZM94.1995 74.6487C62.7883 74.6487 37.3243 100.312 37.3243 131.968C37.3243 163.625 62.7883 189.288 94.1995 189.288C125.611 189.288 151.075 163.625 151.075 131.968C151.075 100.312 125.611 74.6487 94.1995 74.6487Z" fill="currentColor" />
    <path d="M319.479 0C382.056 0 432.785 50.7289 432.785 113.306C432.785 175.141 383.252 225.404 321.701 226.588V226.612H261.271V189.253H321.701C362.637 188.077 395.461 154.526 395.461 113.306C395.461 71.3426 361.575 37.6014 319.612 37.6014C277.649 37.6014 244.041 71.3426 244.041 113.306C244.041 115.083 244.041 118.194 244.041 118.194V226.612H206.173V112.862H206.176C206.415 50.4889 257.049 0 319.479 0Z" fill="currentColor" />
  </svg>
);

const Wordmark = () => (
  <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 835 133" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="logo__mark" d="M88.8799 132.9H0V115.293H88.8799V132.9Z" fill="currentColor" />
    <path className="logo__mark" fillRule="evenodd" clipRule="evenodd" d="M88.8799 62.0488C88.8803 62.1186 88.8799 62.188 88.8799 62.2578C88.8799 86.9168 68.9837 106.908 44.4404 106.908C19.8969 106.908 0 86.917 0 62.2578C0.000176491 37.5987 19.897 17.6084 44.4404 17.6084C54.5201 17.6085 63.8158 20.9809 71.2715 26.6631V0H88.8799V62.0488ZM44.4404 35.2168C29.6218 35.2168 17.6086 47.3236 17.6084 62.2578C17.6084 77.1922 29.6217 89.2998 44.4404 89.2998C59.2589 89.2996 71.2715 77.192 71.2715 62.2578C71.2713 47.3238 59.2588 35.217 44.4404 35.2168Z" fill="currentColor" />
    <path className="logo__mark" d="M150.719 0C180.24 0.000124302 204.172 23.9325 204.172 53.4541C204.172 82.6255 180.804 106.338 151.767 106.896V106.907H123.258V89.2832H151.767C171.079 88.7285 186.564 72.9003 186.564 53.4541C186.564 33.6573 170.515 17.6085 150.719 17.6084C130.922 17.6084 114.873 33.6572 114.873 53.4541V106.907H97.2646V53.2441C97.3775 23.8189 121.267 0 150.719 0Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M334.971 33.2129C341.132 33.213 346.733 34.6442 351.773 37.5068C356.876 40.3695 360.891 44.3522 363.815 49.4551C366.803 54.4959 368.296 60.1904 368.296 66.5381C368.296 72.9479 366.802 78.7046 363.815 83.8076C360.891 88.8484 356.876 92.8004 351.773 95.6631C346.671 98.5257 341.069 99.957 334.971 99.957C328.872 99.957 323.271 98.5256 318.168 95.6631C313.065 92.8004 309.019 88.8484 306.032 83.8076C303.045 78.7046 301.552 72.948 301.552 66.5381C301.552 60.1904 303.045 54.4959 306.032 49.4551C309.019 44.3521 313.065 40.3695 318.168 37.5068C323.271 34.6443 328.872 33.2129 334.971 33.2129ZM334.971 44.9746C331.05 44.9746 327.565 45.8464 324.516 47.5889C321.528 49.3314 319.194 51.8511 317.514 55.1494C315.833 58.3855 314.994 62.1819 314.994 66.5381C314.994 70.8943 315.833 74.7222 317.514 78.0205C319.194 81.3187 321.529 83.8701 324.516 85.6748C327.565 87.4172 331.05 88.2881 334.971 88.2881C338.891 88.288 342.345 87.4172 345.332 85.6748C348.319 83.8701 350.653 81.3186 352.333 78.0205C354.013 74.7222 354.854 70.8943 354.854 66.5381C354.854 62.1819 354.013 58.3855 352.333 55.1494C350.653 51.8513 348.319 49.3313 345.332 47.5889C342.345 45.8464 338.891 44.9747 334.971 44.9746Z" fill="currentColor" />
    <path d="M416.896 44.1777H394.012L399.256 47.5146V99.957H385.907V44.1777H368.268V33.2129H416.896V44.1777Z" fill="currentColor" />
    <path d="M448.008 46.5029H458.753V55.5254H443.466L448.011 58.0859L448.008 85.1143C448.008 87.119 448.469 88.5741 449.39 89.4795C450.377 90.3203 452.021 90.7412 454.324 90.7412H461.232V99.957H452.351C447.285 99.957 443.403 98.793 440.705 96.4648C438.008 94.1366 436.659 90.3528 436.659 85.1143V55.5254H430.244V46.5029H436.659V33.2129H448.008V46.5029Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M485.785 53.2363C490.119 53.2363 494.041 54.1935 497.552 56.1094C501.062 58.0252 503.833 60.7624 505.862 64.3203C507.892 67.8784 508.907 71.9575 508.907 76.5557C508.907 81.1537 507.865 85.232 505.78 88.79C503.696 92.348 500.843 95.1124 497.223 97.083C493.657 98.9988 489.708 99.957 485.374 99.957C481.095 99.957 477.227 98.9989 473.771 97.083C470.316 95.1124 467.6 92.3754 465.625 88.8721C463.65 85.314 462.663 81.2084 462.663 76.5557C462.663 71.9575 463.677 67.8784 465.707 64.3203C467.737 60.7623 470.508 58.0253 474.019 56.1094C477.529 54.1936 481.452 53.2363 485.785 53.2363ZM485.62 61.3652C483.207 61.3653 480.957 61.9394 478.873 63.0889C476.843 64.2383 475.225 65.9628 474.019 68.2617C472.812 70.5061 472.208 73.2712 472.208 76.5557C472.208 81.4274 473.443 85.2045 475.911 87.8867C478.435 90.5141 481.589 91.8281 485.374 91.8281C487.788 91.8281 490.037 91.253 492.121 90.1035C494.26 88.954 495.988 87.2296 497.305 84.9307C498.621 82.6317 499.28 79.8399 499.28 76.5557C499.28 73.2712 498.649 70.5061 497.388 68.2617C496.126 65.9627 494.453 64.2384 492.368 63.0889C490.284 61.9393 488.034 61.3652 485.62 61.3652Z" fill="currentColor" />
    <path d="M654.68 33.2129C661.399 33.2129 666.842 34.8619 671.011 38.1602C675.241 41.3962 677.574 45.9393 678.01 51.7891H663.639C663.514 49.5487 662.549 47.7126 660.745 46.2812C659.003 44.7879 656.67 44.041 653.746 44.041C651.196 44.0411 649.142 44.6951 647.587 46.002C646.094 47.3087 645.348 49.2065 645.348 51.6953C645.348 53.4378 645.908 54.9006 647.027 56.083C648.209 57.2032 649.641 58.137 651.32 58.8838C653.062 59.5683 655.489 60.3771 658.6 61.3105C662.83 62.5552 666.283 63.8003 668.958 65.0449C671.633 66.2896 673.935 68.1564 675.863 70.6455C677.792 73.1348 678.757 76.4022 678.757 80.4473C678.757 83.9322 677.854 87.1682 676.05 90.1553C674.246 93.1423 671.602 95.5381 668.118 97.3428C664.634 99.0853 660.497 99.957 655.706 99.957C651.165 99.957 647.058 99.1788 643.388 97.623C639.78 96.0673 636.918 93.8271 634.803 90.9023C632.688 87.9774 631.598 84.5229 631.536 80.54H645.534C645.721 83.2159 646.654 85.3319 648.334 86.8877C650.076 88.4435 652.44 89.2217 655.427 89.2217C658.475 89.2216 660.87 88.5065 662.612 87.0752C664.354 85.5816 665.225 83.6519 665.225 81.2871C665.225 79.358 664.634 77.771 663.452 76.5264C662.27 75.2818 660.777 74.3174 658.973 73.6328C657.231 72.886 654.804 72.0773 651.693 71.2061C647.463 69.9614 644.01 68.7478 641.335 67.5654C638.722 66.3208 636.451 64.4846 634.522 62.0576C632.656 59.5683 631.723 56.2694 631.723 52.1621C631.723 48.3039 632.688 44.9436 634.616 42.0811C636.545 39.2185 639.251 37.0404 642.734 35.5469C646.218 33.9911 650.2 33.2129 654.68 33.2129Z" fill="currentColor" />
    <path d="M740.506 33.2129C747.847 33.2129 754.224 35.0175 759.637 38.627C765.049 42.1742 768.782 47.1841 770.835 53.6562H755.811C754.317 50.918 752.264 48.8327 749.651 47.4014C747.038 45.9701 743.99 45.2549 740.506 45.2549C736.649 45.2549 733.227 46.1259 730.241 47.8682C727.255 49.6106 724.922 52.1001 723.242 55.3359C721.562 58.572 720.723 62.3063 720.723 66.5381C720.723 70.8943 721.562 74.6907 723.242 77.9268C724.984 81.1628 727.379 83.6521 730.428 85.3945C733.476 87.137 737.023 88.0088 741.066 88.0088C746.043 88.0087 750.118 86.7015 753.291 84.0879C756.464 81.412 758.548 77.709 759.543 72.9795H737.146V62.9912H772.422V74.3799C771.551 78.9227 769.684 83.1231 766.822 86.9814C763.961 90.8397 760.259 93.9516 755.718 96.3164C751.238 98.619 746.199 99.7705 740.6 99.7705C734.316 99.7705 728.623 98.3698 723.521 95.5693C718.482 92.7067 714.501 88.7546 711.577 83.7139C708.715 78.6731 707.284 72.9479 707.284 66.5381C707.284 60.1282 708.715 54.4031 711.577 49.3623C714.501 44.2593 718.482 40.3073 723.521 37.5068C728.623 34.6442 734.285 33.2129 740.506 33.2129Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M260.428 33.2129C267.42 33.2129 273.554 34.5792 278.83 37.3125C284.17 40.0458 288.269 43.9557 291.13 49.041C294.054 54.0627 295.516 59.9106 295.516 66.585C295.516 73.2593 294.054 79.1072 291.13 84.1289C288.269 89.087 284.17 92.9327 278.83 95.666C273.554 98.3993 267.42 99.7666 260.428 99.7666H237.163V33.2129H260.428ZM250.512 88.4199H259.951C266.943 88.4199 272.346 86.513 276.16 82.6992C279.974 78.8853 281.881 73.5136 281.881 66.585C281.881 59.6564 279.974 54.2535 276.16 50.376C272.346 46.4349 266.943 44.4639 259.951 44.4639H250.512V88.4199Z" fill="currentColor" />
    <path d="M821.935 78.9736V34.166H835V99.417H821.935L792.353 54.7031V99.417H779.288V34.166H792.353L821.935 78.9736Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M545.026 34.166C551.87 34.166 557.873 35.5047 563.037 38.1807C568.263 40.8566 572.276 44.6836 575.075 49.6621C577.937 54.5784 579.368 60.3036 579.368 66.8379C579.368 73.3723 577.937 79.0983 575.075 84.0146C572.276 88.8686 568.263 92.6336 563.037 95.3096C557.873 97.9855 551.87 99.3232 545.026 99.3232H522.256V34.166H545.026ZM535.321 88.2148H544.56C551.403 88.2148 556.691 86.348 560.424 82.6143C564.157 78.8803 566.023 73.6212 566.023 66.8379C566.023 60.0547 564.157 54.7649 560.424 50.9688C556.691 47.1106 551.403 45.1816 544.56 45.1816H535.321V88.2148Z" fill="currentColor" />
    <path d="M700.349 99.3232H687.283V34.166H700.349V99.3232Z" fill="currentColor" />
    <path d="M623.868 44.7402H594.854L599.225 47.3066V60.9727H621.078V71.2695H599.225V88.4287H623.868V99.0039H586.206V34.166H623.868V44.7402Z" fill="currentColor" />
  </svg>
);

const GhostLink = ({ href, children, reveal = true }) => (
  <a className="btn btn--ghost" href={href} {...(reveal ? { 'data-reveal': true } : {})}>
    <span className="roll">{children}</span>
    <ArrowIcon />
  </a>
);

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV = [
  ['work', '/work', 'Work'],
  ['studio', '/studio', 'Studio'],
  ['services', '/services', 'Services'],
  ['journal', '/journal', 'Journal'],
];

const MENU_LINKS = [
  ['/', 'Home'],
  ['/work', 'Work'],
  ['/studio', 'Studio'],
  ['/services', 'Services'],
  ['/journal', 'Journal'],
  ['/contact', 'Contact'],
];

const TICKER_UP = ['avc-tower', 'rivanya-hero', 'praanah-hero', 'personaa-card'];
const TICKER_DOWN = ['miamour-hero', 'mettle-hero', 'arealis-hero', 'avc-hero'];

const PARTNERS = ['PERSONAA', 'PRAANAH', 'AVC INFRA', 'AREALIS', 'RIVANYA', 'MI AMOUR', 'METTLE'];

const WORK = [
  { href: '/case-avc-infra', img: 'avc-tower', alt: 'AVC Infra glass tower with the structural monogram', name: 'AVC Infra', meta: 'Construction Identity · (©25)' },
  { href: '/work', img: 'rivanya-hero', alt: 'Rivanya couture campaign portrait', name: 'Rivanya', meta: 'Fashion Identity · (©25)' },
  { href: '/work', img: 'arealis-hero', alt: 'Arealis electric-blue brand texture', name: 'Arealis', meta: 'Tech Identity · (©26)' },
  { href: '/work', img: 'miamour-hero', alt: 'Mi Amour pâtisserie interior', name: 'Mi Amour', meta: 'Pâtisserie Branding · (©25)' },
];

const STATS = [
  { label: '(Translation loss)', count: 0, text: 'Strategy, identity, web and ads from one team — nothing lost in hand-offs.' },
  { label: '(Client visibility)', count: 100, text: 'Weekly Loom walkthroughs and a dedicated Notion workspace.' },
  { label: '(Lock-in)', count: 0, text: 'You own every vector, Figma library and line of code.' },
];

const FRAMEWORK_WORDS = ['Strategy', 'Identity', 'Experience', 'Scale'];
const FRAMEWORK_DESC = [
  'We define the brand’s core values and “global appeal” markers.',
  'We engineer a visual mark on mathematical grids and structural integrity.',
  'The brand DNA is coded directly into a high-performance website.',
  'Performance ads reuse the same engineered assets for maximum conversion.',
];

const SERVICES = [
  { href: '/services#branding', img: 'personaa-card', n: '001', name: 'Branding & Identity' },
  { href: '/services#web', img: 'mettle-phone', n: '002', name: 'Digital Architecture' },
  { href: '/services#content', img: 'rivanya-drape', n: '003', name: 'Content & Social' },
  { href: '/services#ads', img: 'arealis-signage', n: '004', name: 'Performance Marketing' },
];

const PROCESS = [
  ['01', 'Discovery', 'Deep-dive audit of brand DNA and market opportunity.'],
  ['02', 'Strategy', 'A blueprint for “global appeal”.'],
  ['03', 'Design & Engineering', 'The visual and technical infrastructure.'],
  ['04', 'Execution', 'Flawless launch across digital and performance channels.'],
  ['05', 'Growth', 'Continuous optimisation for long-term ROI.'],
];


const JOURNAL = [
  { img: 'arch-wave', date: 'Oct 02, 2026', title: 'Why great brands are built on clarity, not complexity' },
  { img: 'praanah-yoga', date: 'Sep 12, 2026', title: 'Designing identity systems that scale to every screen' },
  { img: 'miamour-cake', date: 'Aug 18, 2026', title: 'The real cost of translation loss between agencies' },
];

const img = (name) => `assets/img/${name}.jpg`;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const rootRef = usePageRuntime('home');

  return (
    <div ref={rootRef}>
      <div>
        <a className="skip-link" href="#main">Skip to content</a>

        {/* ===== Preloader curtain ===== */}
        <div className="curtain" aria-hidden="true">
          <div className="curtain__mark"><Mark /></div>
          <p className="curtain__label t-mono-label">Engineered identities</p>
          <p className="curtain__count t-mono-label"><span>000</span></p>
        </div>

        {/* ===== Custom cursor ===== */}
        <div className="cursor" aria-hidden="true">
          <div className="cursor__line cursor__line--h" />
          <div className="cursor__line cursor__line--v" />
          <div className="cursor__dot" />
          <div className="cursor__label">View</div>
          <div className="cursor__media">
            <img alt="" decoding="async" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" />
          </div>
        </div>

        {/* ===== Header ===== */}
        <header className="header">
          <a className="logo" href="/" aria-label="DotToDesign — home"><Wordmark /></a>
          <nav className="nav" aria-label="Primary">
            {NAV.map(([key, href, label]) => (
              <a key={key} className="nav-link" data-nav={key} href={href}>{label}</a>
            ))}
          </nav>
          <div className="header__right">
            <ThemeToggle />
            <a className="btn-bracket" href="/contact">
              <i className="c3" /><i className="c4" /><span className="roll">Contact</span>
            </a>
            <button className="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu" data-menu-open>
              <svg {...svgProps}><path d="M4 9h16" /><path d="M4 15h16" /></svg>
            </button>
          </div>
        </header>

        {/* ===== Mobile menu ===== */}
        <div className="menu" id="menu" aria-hidden="true" role="dialog" aria-label="Menu">
          <button className="icon-btn menu__close" type="button" aria-label="Close menu" data-menu-close>
            <svg {...svgProps}><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
          </button>
          <nav className="menu__links" aria-label="Mobile">
            {MENU_LINKS.map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="stack" style={{ '--stack-gap': '16px' }}>
            <ThemeToggle />
            <p className="t-caption c-tertiary">hello@dot-todesign.com · @dot.todesign</p>
          </div>
        </div>

        {/* ===== Dock ===== */}
        <nav className="dock" aria-label="Quick navigation">
          <a className="nav-link" data-nav="work" href="/work">Work</a>
          <a className="nav-link" data-nav="studio" href="/studio">Studio</a>
          <a href="/" aria-label="Home" className="logo__mark" data-magnetic><Mark /></a>
          <a className="nav-link" data-nav="journal" href="/journal">Journal</a>
          <a className="nav-link" data-nav="contact" href="/contact">Contact</a>
        </nav>

        <main id="main">
          {/* ===== HERO ===== */}
          <section className="hero" aria-label="Introduction">
            <div className="hero__stage">
              <div className="hero__tickers" aria-hidden="true">
                <div className="ticker">
                  <div className="ticker__track">
                    {[...TICKER_UP, ...TICKER_UP].map((n, i) => (
                      <img
                        key={`u${i}`}
                        src={img(n)}
                        alt=""
                        decoding="async"
                        {...(i === 0 ? { fetchPriority: 'high' } : { loading: 'lazy' })}
                      />
                    ))}
                  </div>
                </div>
                <div className="ticker ticker--down">
                  <div className="ticker__track">
                    {[...TICKER_DOWN, ...TICKER_DOWN].map((n, i) => (
                      <img key={`d${i}`} src={img(n)} alt="" decoding="async" loading="lazy" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="hero__panel">
                <div className="glow glow--a" />
                <div className="glow glow--b" />
                <div className="hero__shade" />
                <div className="hero__grid" aria-hidden="true"><span /><span /><span /><span /></div>
                <div className="construct hero__construct" aria-hidden="true">
                  <span className="construct__title">Zero translation loss</span>
                  <span className="construct__sub">Strategy · Identity · Experience · Scale</span>
                </div>
                <div className="hero__bottom">
                  <div className="hero__meta">
                    <p className="t-label-lg">Global Brand Studio</p>
                    <p className="t-label-md c-secondary">Remote · Worldwide</p>
                  </div>
                  <div>
                    <h1 className="hero__title t-display-xl">Engineered<br />Identities</h1>
                    <div className="hero__cta">
                      <a className="btn-bracket" href="/contact" data-magnetic>
                        <i className="c3" /><i className="c4" /><span className="roll">Start a project</span>
                      </a>
                    </div>
                  </div>
                  <div className="hero__meta hero__meta--r">
                    <p className="t-label-lg">Est. 2024</p>
                    <p className="t-label-md c-secondary">Strategy → Identity → Web → Ads</p>
                  </div>
                </div>
              </div>

              <div className="hero__scroll scroll-ind" aria-hidden="true">
                <span className="t-label-md c-secondary">Scroll</span>
                <div className="scroll-ind__track"><div className="scroll-ind__bar" /></div>
              </div>
            </div>
          </section>

          <div className="curve-wrap">
            <div className="curve-holder" aria-hidden="true">
              <div className="curve" />
            </div>

            {/* ===== Partners ===== */}
            <section className="partners" aria-label="Brands we’ve engineered">
              <div className="container">
                <p className="t-bracket" style={{ marginBottom: 24 }}>(Brands we’ve engineered)</p>
              </div>
              <div className="marquee" aria-hidden="true">
                {[0, 1].map((k) => (
                  <div className="marquee__track" key={k}>
                    {PARTNERS.map((p) => <span key={p}>{p}</span>)}
                  </div>
                ))}
              </div>
              <p className="sr-only">Personaa, Praanah Wellness, AVC Infra, Arealis, Rivanya, Mi Amour, Mettle Gaming.</p>
            </section>

            {/* ===== Work: sticky stack ===== */}
            <section className="section" id="work" aria-labelledby="work-h">
              <div className="container">
                <div className="sec-head">
                  <p className="t-bracket" data-reveal>(Portfolio ©26)</p>
                  <div className="sec-head__row">
                    <h2 className="t-h1" id="work-h" data-split>Selected work</h2>
                    <button className="btn btn--ghost" type="button" disabled aria-disabled="true">
                      <span className="roll">Coming soon</span>
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
                <div className="stack-list">
                  {WORK.map((w) => (
                    <div className="stack-item" key={w.name}>
                      <a className="work-card" data-cursor="Coming soon" aria-disabled="true" tabIndex={-1} onClick={event => event.preventDefault()}>
                        <div className="work-card__media">
                          <img src={img(w.img)} alt={w.alt} loading="lazy" decoding="async" />
                        </div>
                        <div className="work-card__meta">
                          <h3 className="t-h4">{w.name}</h3>
                          <span className="t-label-md c-secondary">{w.meta}</span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== Studio statement + bento ===== */}
            <section className="section" aria-label="Studio">
              <div className="container">
                <p className="t-bracket" style={{ marginBottom: 24 }}>(Who we are)</p>
                <p className="statement t-h1" data-fill>
                  We don’t just design. We engineer the infrastructure for global brand equity — strategy, identity and performance operating as one engine.
                </p>
                <div className="bento" data-reveal-group>
                  {STATS.map((s) => (
                    <article className="card stat-card" data-reveal key={s.label}>
                      <p className="t-bracket">{s.label}</p>
                      <p className="t-numeric-lg" data-count={s.count} data-suffix="%">{s.count}%</p>
                      <p className="t-body-sm c-secondary">{s.text}</p>
                    </article>
                  ))}
                  <article className="card" data-reveal>
                    <p className="t-bracket">(Client Command Center)</p>
                    <div className="chat">
                      <p className="bubble">Love the new grid — can we push the red?</p>
                      <p className="bubble bubble--out">New export ready in 20 min</p>
                      <p className="bubble bubble--typing" aria-label="Typing"><i /><i /><i /></p>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* ===== Framework: pinned 3D word roll ===== */}
            <section className="framework" aria-label="The Zero Translation Loss Framework">
              <div className="framework__stage">
                <div className="glow" aria-hidden="true" />
                <div className="framework__label">
                  <p className="t-bracket">(The Zero Translation Loss Framework)</p>
                </div>
                <ol className="framework__words" aria-label={FRAMEWORK_WORDS.join(', ')}>
                  {FRAMEWORK_WORDS.map((w) => <li key={w} aria-hidden="true">{w}</li>)}
                </ol>
                <div className="framework__desc t-body-lg c-secondary" style={{ height: '3.2em' }}>
                  {FRAMEWORK_DESC.map((d) => <p key={d}>{d}</p>)}
                </div>
                <div className="framework__progress" aria-hidden="true">
                  {FRAMEWORK_WORDS.map((w) => <span key={w}><i /></span>)}
                </div>
              </div>
            </section>

            {/* ===== Services ===== */}
            <section className="section" aria-labelledby="svc-h">
              <div className="container">
                <div className="sec-head">
                  <p className="t-bracket" data-reveal>(Services)</p>
                  <div className="sec-head__row">
                    <h2 className="t-h1" id="svc-h" data-split>What we engineer.</h2>
                    <GhostLink href="/services">All services</GhostLink>
                  </div>
                </div>
                <div className="service-list" data-reveal-group>
                  {SERVICES.map((s) => (
                    <a className="service-row" href={s.href} data-cursor-img={img(s.img)} data-reveal key={s.n}>
                      <span className="t-bracket">({s.n})</span>
                      <span className="service-row__name">{s.name}</span>
                      <ArrowIcon />
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== Process ===== */}
            <section className="section process" aria-labelledby="proc-h">
              <div className="container">
                <div className="sec-head">
                  <p className="t-bracket" data-reveal>(Process)</p>
                  <h2 className="t-h1" id="proc-h" data-split>How we engineer value.</h2>
                </div>
                <ol className="grid-5" data-reveal-group>
                  {PROCESS.map(([n, title, text]) => (
                    <li className="card" data-reveal key={n}>
                      <span className="t-numeric-lg c-accent">{n}</span>
                      <h3 className="t-h5">{title}</h3>
                      <p className="t-body-sm c-secondary">{text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>


            <Testimonials />

            <Faq />

            {/* ===== Journal ===== */}
            <section className="section" aria-labelledby="journal-h">
              <div className="container">
                <div className="sec-head">
                  <p className="t-bracket" data-reveal>(Journal)</p>
                  <div className="sec-head__row">
                    <h2 className="t-h1" id="journal-h" data-split>Smart insights.</h2>
                    <GhostLink href="/journal">See all</GhostLink>
                  </div>
                </div>
                <div className="grid-3" data-reveal-group>
                  {JOURNAL.map((j) => (
                    <a className="journal-card" href="/article" data-reveal data-cursor="Read" key={j.title}>
                      <div className="journal-card__media">
                        <img src={img(j.img)} alt="" loading="lazy" decoding="async" />
                      </div>
                      <time className="t-caption c-tertiary">{j.date}</time>
                      <h3 className="t-h5">{j.title}</h3>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="section cta" aria-labelledby="cta-h">
              <div className="glow" aria-hidden="true" />
              <div className="container cta__inner">
                <span className="tag tag--pill" data-reveal>
                  <span className="tag__dot" />Taking 2 new brands this quarter
                </span>
                <h2 className="t-display-lg" id="cta-h" data-split>Let’s build your brand.</h2>
                <p className="t-body-xl c-secondary" data-reveal>Stop blending in. Start standing out.</p>
                <form className="cta__form" data-validate data-emailjs-type="discovery call request" data-reveal>
                  <div className="field">
                    <label htmlFor="cta-email">Email</label>
                    <input id="cta-email" name="email" type="email" placeholder="you@company.com" required />
                    <span className="hint" data-default="We reply within 24 hours">We reply within 24 hours</span>
                  </div>
                  <button className="btn" type="submit" data-magnetic style={{ marginBottom: 26 }}>
                    <span className="roll">Book a discovery call</span>
                    <ArrowIcon />
                  </button>
                </form>
              </div>
            </section>
          </div>
        </main>

        {/* ===== Footer ===== */}
        <Footer />
      </div>
    </div>
  );
}
