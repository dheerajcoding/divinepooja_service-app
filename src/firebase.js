// Firebase initialization. Reads config from environment variables so it
// can be safely committed. If the API key is missing, all helpers below
// short-circuit and the app falls back to localStorage-only mode.

import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

let app = null;
let db = null;
let auth = null;

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
}

/* ───────────── Firestore helpers (single document for simplicity) ───────────── */

const SITE_DOC = 'site/data'; // collection 'site', document 'data'

export const fetchSiteData = async () => {
  if (!db) return null;
  const snap = await getDoc(doc(db, SITE_DOC));
  return snap.exists() ? snap.data() : null;
};

export const saveSiteData = async (data) => {
  if (!db) throw new Error('Firebase not configured');
  await setDoc(doc(db, SITE_DOC), data, { merge: false });
};

export const subscribeSiteData = (callback) => {
  if (!db) return () => {};
  return onSnapshot(doc(db, SITE_DOC), (snap) => {
    if (snap.exists()) callback(snap.data());
  });
};

/* ───────────── Auth helpers ───────────── */

export const adminLogin = async (email, password) => {
  if (!auth) throw new Error('Firebase Auth not configured');
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const adminLogout = async () => {
  if (!auth) return;
  await signOut(auth);
};

export const onAdminAuthChange = (cb) => {
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
};

export { db, auth };
