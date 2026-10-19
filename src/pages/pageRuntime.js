import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mountPageRuntime } from '../components/PageRuntime.jsx';

const pageTitles = {
  home: 'DotToDesign — Engineered Identities for Global Brands',
  work: 'Work — DotToDesign',
  studio: 'Studio — DotToDesign',
  services: 'Services — DotToDesign',
  journal: 'Journal — DotToDesign',
  article: 'The AVC Infra mark — DotToDesign Journal',
  'case-study': 'AVC Infra — DotToDesign Case Study',
  contact: 'Contact — DotToDesign',
  404: 'Page not found — DotToDesign',
};

export function usePageRuntime(page) {
  const rootRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    document.title = pageTitles[page] || 'DotToDesign';
    return mountPageRuntime(root, page, location.pathname, navigate);
  }, [location.pathname, page, navigate]);

  useEffect(() => {
    if (!location.hash) return undefined;

    const targetId = decodeURIComponent(location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return rootRef;
}
