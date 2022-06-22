// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export interface DataBookmark {
  dateAdded: string;
  dateLastUpdated: string;
  tags: DataList<string>;
  title: string;
  url: string;
  read: boolean;
  pinned: boolean;
}

export interface DataBookmarkList extends DataList<DataBookmark> {}

export interface DataFilterAndSortsConfig {
  filterBy: {
    title: string;
    url: string;
    tags: DataList<string>;
    lastUpdated?: { beforeAfter: "before" | "after"; date: string };
  };
  sortBy: {
    pinnedFirst: boolean;
    readLast: boolean;
  };
  others: {
    markAsReadWhenOpened: boolean;
  }
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABAES_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { auth, database };
