import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { ref, set, push, update } from "firebase/database";
import { FilterAndSortsConfig } from "../pages/BookmarkList/BookmarkList.helper";

import { database, auth } from "./data.config";

/**
 * abstraction for creating new user in firebase
 * @param email
 * @param password
 * @returns
 */
export const signUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(auth, email, password);

/**
 * abstraction for signing in with firebase
 * @param email
 * @param password
 * @returns
 */
export const signIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

/**
 * abstraction for signing out with firebase
 * @returns
 */
export const signOut = async () => await firebaseSignOut(auth);

/**
 * abstraction for resetting password
 * @param email
 * @returns
 */
export const resetPassword = async (email: string) =>
  await sendPasswordResetEmail(auth, email);

/**
 * deletes user account
 */
export const deleteAccount = () => {
  return new Promise<void>((resolve, reject) => {
    if (auth.currentUser)
      deleteUser(auth.currentUser)
        .then(() => resolve())
        .catch((exception) => {
          reject(exception);
        });
  });
};

/**
 * creates a new bookmark
 * @param bookmark
 * @returns
 */
export const createBookmark = async (bookmark: Bookmark) => {
  const newBookmarkRef = push(
    ref(database, `users/${auth.currentUser?.uid}/bookmarks/`)
  );

  await set(newBookmarkRef, bookmark);
  return Boolean(newBookmarkRef.key);
};

/**
 * overwrites a bookmark
 * @param updatedBookmark
 * @returns
 */
export const updateBookmark = async (updatedBookmark: Bookmark) => {
  try {
    const bookmarkRef = ref(
      database,
      `users/${auth.currentUser?.uid}/bookmarks/${updatedBookmark.id ?? ""}`
    );
    updatedBookmark.dateLastUpdated = new Date();
    await update(bookmarkRef, updatedBookmark);
  } catch (exception) {
    return false;
  }
  return true;
};

/**
 * set bookmark read status
 * @param bookmarkId
 * @param markAsRead
 * @returns
 */
export const readBookmark = async (
  bookmarkId: string,
  markAsRead: boolean = true
) => {
  try {
    const newUpdates: { [x: string]: unknown } = {};
    // newUpdates["/dateLastUpdated"] = new Date();
    newUpdates["/read"] = markAsRead;

    await update(
      ref(database, `users/${auth.currentUser?.uid}/bookmarks/${bookmarkId}/`),
      newUpdates
    );
    return true;
  } catch (exception) {
    return false;
  }
};

/**
 * set bookark as pinned
 * @param bookmarkId
 * @param pin
 * @returns
 */
export const pinBookmark = async (bookmarkId: string, pin: boolean = true) => {
  try {
    const newUpdates: { [x: string]: unknown } = {};
    newUpdates["/pinned"] = pin;
    // newUpdates["/dateLastUpdated"] = new Date();

    await update(
      ref(database, `users/${auth.currentUser?.uid}/bookmarks/${bookmarkId}/`),
      newUpdates
    );
    return true;
  } catch (exception) {
    console.error(exception);
    return false;
  }
};

/**
 * delete bookmark
 * @param bookmarkId
 * @param markAsRead
 * @returns
 */
export const deleteBookmark = async (bookmarkId: string) => {
  try {
    const bookmarkRef = ref(
      database,
      `users/${auth.currentUser?.uid}/bookmarks/${bookmarkId}`
    );
    await set(bookmarkRef, null);
    return true;
  } catch (exception) {
    return false;
  }
};

/**
 * gets a path for the user's bookmarks reference
 * @returns
 */
export const getAllBookmarksRef = () =>
  `users/${auth.currentUser?.uid}/bookmarks`;

export const writeFilterSorts = async (filterSorts: FilterAndSortsConfig) => {
  try {
    const newFilterSortsRef = ref(
      database,
      `users/${auth.currentUser?.uid}/filterSortsConfig/`
    );

    await update(newFilterSortsRef, filterSorts);
    return true;
  } catch (exception) {
    return false;
  }
};

/**
 * gets a path for the user's filters and sorts reference
 * @returns
 */
export const getFilterSortsConfigRef = () =>
  `users/${auth.currentUser?.uid}/filterSortsConfig`;
