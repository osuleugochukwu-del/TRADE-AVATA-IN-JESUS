import {
  onAuthStateChanged
} from 'firebase/auth';

import {
  auth
} from './auth.js';


function currentPath() {
  return window.location.pathname +
    window.location.search +
    window.location.hash;
}


function loginUrl() {
  const base =
    document.body?.dataset?.baseUrl || '/';

  const returnTo =
    encodeURIComponent(
      currentPath()
    );

  return `${base}login/?returnTo=${returnTo}`;
}


export function requireUser({
  onUser,
  onSignedOut
} = {}) {

  if (!auth) {

    if (typeof onSignedOut === 'function') {
      onSignedOut();
    } else {
      window.location.replace(
        loginUrl()
      );
    }

    return () => {};
  }


  return onAuthStateChanged(
    auth,
    user => {

      if (!user) {

        if (
          typeof onSignedOut ===
          'function'
        ) {
          onSignedOut();
        } else {
          window.location.replace(
            loginUrl()
          );
        }

        return;
      }


      if (
        typeof onUser ===
        'function'
      ) {
        onUser(user);
      }

    }
  );
}


export function watchSession(callback) {

  if (!auth) {
    callback(null);
    return () => {};
  }


  return onAuthStateChanged(
    auth,
    callback
  );
}


export function getCurrentUser() {
  return auth?.currentUser || null;
}


export function isSignedIn() {
  return Boolean(
    auth?.currentUser
  );
}
