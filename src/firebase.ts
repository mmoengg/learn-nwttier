import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAk1bBpyfcizi7dgcX-CoGlpvaqelnEmmM",
  authDomain: "nwitter-reloaded-b4061.firebaseapp.com",
  projectId: "nwitter-reloaded-b4061",
  storageBucket: "nwitter-reloaded-b4061.firebasestorage.app",
  messagingSenderId: "1059939273133",
  appId: "1:1059939273133:web:e5bf25e048f8be16937924",
  measurementId: "G-DFV5LRBPXR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);