import {
  getAuth,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

import {
  firebaseApp
} from './config.js';


export const auth =
  firebaseApp
    ? getAuth(firebaseApp)
    : null;


/*
  ==================================================
  TRADE AVATA UNIVERSAL LOGIN SESSION
  ==================================================

  browserLocalPersistence means:

  - Sign in once
  - Refresh the browser → still signed in
  - Open Journal → still signed in
  - Open Analytics → still signed in
  - Open My Trading → still signed in
  - Open Copy Trading → still signed in
  - Return later → still signed in

  until the user deliberately signs out.
*/


let persistenceReady =
  Promise.resolve();


if (auth) {
  persistenceReady =
    setPersistence(
      auth,
      browserLocalPersistence
    ).catch(error => {

      console.error(
        'Trade Avata session persistence error:',
        error
      );

    });
}


export async function waitForAuth() {

  await persistenceReady;

  return auth;

}


export function watchAuth(callback) {

  if (!auth) {
    callback(null);
    return () => {};
  }


  let unsubscribe =
    () => {};


  persistenceReady.then(() => {

    unsubscribe =
      onAuthStateChanged(
        auth,
        callback
      );

  });


  return () => {
    unsubscribe();
  };
}


export async function getSignedInUser() {

  await persistenceReady;

  return auth?.currentUser || null;

}


export async function tradeAvataSignOut() {

  if (!auth) {
    return;
  }


  await signOut(auth);

}


export {
  onAuthStateChanged,
  signOut,
  browserLocalPersistence
};
