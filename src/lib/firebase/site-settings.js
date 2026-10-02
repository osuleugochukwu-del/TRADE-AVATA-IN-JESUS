import { doc, getDoc } from 'firebase/firestore';
import { db } from './db.js';

export async function getPublicSiteSettings() {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, 'siteSettings', 'global'));
    return snap.exists() ? snap.data() : null;
  } catch {
    return null;
  }
}

export async function getPublicSocialLinks(fallback = []) {
  const settings = await getPublicSiteSettings();
  if (Array.isArray(settings?.socialLinks)) return settings.socialLinks;
  // Before Firebase is connected, Admin > Social Media can still preview the
  // same public experience on this device using its locally saved draft.
  if (typeof window !== 'undefined') {
    try {
      const draft = JSON.parse(localStorage.getItem('ta-social-settings-draft') || 'null');
      if (Array.isArray(draft)) return draft;
    } catch {}
  }
  return Array.isArray(fallback) ? fallback : [];
}

