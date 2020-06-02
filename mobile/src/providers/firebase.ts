import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  DATABASE_URL,
  MESSAGE_SENDER_ID,
  PROJECT_ID,
} from "react-native-dotenv";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: "",
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig) as firebase.app.App;
export const db = firebase.firestore() as firebase.firestore.Firestore;

export const GOOGLE_CLIENT_IOS_STAND = "*PUT_YOUR_KEY*";
export const WEB_CLIENT_ID = "*PUT_YOUR_KEY*";
export const WEB_CLIENT_SECRET = "*PUT_YOUR_KEY*";
export const GOOGLE_CLIENT_IOS = "*PUT_YOUR_KEY*";
export default Firebase;
