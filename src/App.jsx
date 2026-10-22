import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Lazy-load every page so the initial bundle only includes the shell + home page.
// Each route is split into its own chunk and loaded on demand.
const Home     = lazy(() => import('./pages/generated/HomePage.jsx'));
const Work     = lazy(() => import('./pages/generated/WorkPage.jsx'));
const Studio   = lazy(() => import('./pages/generated/StudioPage.jsx'));
const Services = lazy(() => import('./pages/generated/ServicesPage.jsx'));
const Journal  = lazy(() => import('./pages/generated/JournalPage.jsx'));
const Article  = lazy(() => import('./pages/generated/ArticlePage.jsx'));
const CaseStudy = lazy(() => import('./pages/generated/CaseAvcInfraPage.jsx'));
const Contact  = lazy(() => import('./pages/generated/ContactPage.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/generated/PrivacyPolicyPage.jsx'));
const CookiePolicy  = lazy(() => import('./pages/generated/CookiePolicyPage.jsx'));
const NotFound = lazy(() => import('./pages/generated/NotFoundPage.jsx'));

// Minimal fallback that matches the background to avoid flash
function PageFallback() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-bg-canvas, #000)',
      }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/work"          element={<Work />} />
        <Route path="/studio"        element={<Studio />} />
        <Route path="/services"      element={<Services />} />
        <Route path="/journal"       element={<Journal />} />
        <Route path="/article"       element={<Article />} />
        <Route path="/case-avc-infra" element={<CaseStudy />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy"  element={<CookiePolicy />} />
        <Route path="/404"           element={<NotFound />} />
        <Route path="/index.html"    element={<Navigate to="/" replace />} />
        <Route path="*"              element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}