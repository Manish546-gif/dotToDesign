import Footer from './Footer.jsx';
import SiteChrome from './SiteChrome.jsx';

export default function LegalPageLayout({ category, title, updated, children }) {
  return (
    <>
      <SiteChrome />

      <main id="main">
        <header className="container article-head">
          <div data-reveal>
            <a className="btn btn--ghost btn--sm" href="/">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5" />
                <path d="M11 6l-6 6 6 6" />
              </svg>
              <span className="roll">Back home</span>
            </a>
          </div>
          <div className="filters" data-reveal>
            <span className="tag tag--pill">Legal</span>
            <span className="tag tag--pill">{category}</span>
          </div>
          <h1 className="t-display-md" data-split>{title}</h1>
          <p className="t-label-md c-tertiary" data-reveal>
            Last updated: {updated} · Dubai, United Arab Emirates
          </p>
        </header>

        <div className="container section" style={{ paddingTop: 80 }}>
          <div className="article-body legal-body">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
