import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  dummyPoojas as seedPoojas,
  packages as seedPackages,
  testimonials as seedTestimonials,
  stats as seedStats,
} from '../data';
import {
  fetchSiteData,
  saveSiteData,
  subscribeSiteData,
  isFirebaseConfigured,
} from '../firebase';

const STORAGE_KEY = 'pujaribaba:data:v1';
const LEGACY_STORAGE_KEY = 'divinepooja:data:v1';

const defaultState = {
  poojas: seedPoojas,
  packages: seedPackages,
  testimonials: seedTestimonials,
  stats: seedStats,
};

const normalize = (raw) => ({
  poojas: Array.isArray(raw?.poojas) ? raw.poojas : defaultState.poojas,
  packages: Array.isArray(raw?.packages) ? raw.packages : defaultState.packages,
  testimonials: Array.isArray(raw?.testimonials) ? raw.testimonials : defaultState.testimonials,
  stats: raw?.stats && typeof raw.stats === 'object' ? { ...defaultState.stats, ...raw.stats } : defaultState.stats,
});

function loadLocal() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        localStorage.setItem(STORAGE_KEY, raw);
      }
    }
    if (!raw) return defaultState;
    return normalize(JSON.parse(raw));
  } catch {
    return defaultState;
  }
}

const nextId = (items) => (items.length ? Math.max(...items.map((i) => Number(i.id) || 0)) + 1 : 1);

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [state, setState] = useState(loadLocal);
  const [source, setSource] = useState(isFirebaseConfigured ? 'loading' : 'local');
  // Avoid an immediate write-back of data we just received from Firestore.
  const skipNextWrite = useRef(false);

  /* Load from Firestore once + subscribe for live updates. */
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    let unsub = null;
    (async () => {
      try {
        const remote = await fetchSiteData();
        if (remote) {
          skipNextWrite.current = true;
          setState(normalize(remote));
        } else {
          // First-time setup: seed Firestore with current local/default data.
          await saveSiteData(state);
        }
        setSource('firestore');
        unsub = subscribeSiteData((data) => {
          skipNextWrite.current = true;
          setState(normalize(data));
        });
      } catch (err) {
        console.warn('[DataContext] Firestore unavailable, using local storage:', err?.message || err);
        setSource('local');
      }
    })();
    return () => { if (unsub) unsub(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Persist on every change: localStorage always, Firestore if configured. */
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* quota */ }
    if (source === 'firestore') {
      if (skipNextWrite.current) {
        skipNextWrite.current = false;
        return;
      }
      saveSiteData(state).catch((err) => {
        // Likely a permission error (admin not signed in). That's fine for
        // public visitors - they only read.
        if (err?.code !== 'permission-denied') {
          console.warn('[DataContext] Could not save to Firestore:', err?.message || err);
        }
      });
    }
  }, [state, source]);

  /* Sync across tabs (local storage fallback). */
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && source !== 'firestore') setState(loadLocal());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [source]);

  const addPooja = useCallback((pooja) => {
    setState((s) => ({ ...s, poojas: [...s.poojas, { ...pooja, id: nextId(s.poojas) }] }));
  }, []);
  const updatePooja = useCallback((id, patch) => {
    setState((s) => ({
      ...s,
      poojas: s.poojas.map((p) => (p.id === id ? { ...p, ...patch, id } : p)),
    }));
  }, []);
  const deletePooja = useCallback((id) => {
    setState((s) => ({ ...s, poojas: s.poojas.filter((p) => p.id !== id) }));
  }, []);

  const addPackage = useCallback((pkg) => {
    setState((s) => ({ ...s, packages: [...s.packages, { ...pkg, id: nextId(s.packages) }] }));
  }, []);
  const updatePackage = useCallback((id, patch) => {
    setState((s) => ({
      ...s,
      packages: s.packages.map((p) => (p.id === id ? { ...p, ...patch, id } : p)),
    }));
  }, []);
  const deletePackage = useCallback((id) => {
    setState((s) => ({ ...s, packages: s.packages.filter((p) => p.id !== id) }));
  }, []);

  const addTestimonial = useCallback((t) => {
    setState((s) => ({ ...s, testimonials: [...s.testimonials, { ...t, id: nextId(s.testimonials) }] }));
  }, []);
  const updateTestimonial = useCallback((id, patch) => {
    setState((s) => ({
      ...s,
      testimonials: s.testimonials.map((t) => (t.id === id ? { ...t, ...patch, id } : t)),
    }));
  }, []);
  const deleteTestimonial = useCallback((id) => {
    setState((s) => ({ ...s, testimonials: s.testimonials.filter((t) => t.id !== id) }));
  }, []);

  const updateStats = useCallback((patch) => {
    setState((s) => ({ ...s, stats: { ...s.stats, ...patch } }));
  }, []);

  const resetToDefaults = useCallback(() => setState(defaultState), []);

  const importData = useCallback((json) => {
    if (!json || typeof json !== 'object') return false;
    setState(normalize(json));
    return true;
  }, []);

  const exportData = useCallback(() => state, [state]);

  const value = useMemo(
    () => ({
      ...state,
      source,
      addPooja, updatePooja, deletePooja,
      addPackage, updatePackage, deletePackage,
      addTestimonial, updateTestimonial, deleteTestimonial,
      updateStats,
      resetToDefaults, importData, exportData,
    }),
    [state, source, addPooja, updatePooja, deletePooja, addPackage, updatePackage, deletePackage, addTestimonial, updateTestimonial, deleteTestimonial, updateStats, resetToDefaults, importData, exportData]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside <DataProvider>');
  return ctx;
};
