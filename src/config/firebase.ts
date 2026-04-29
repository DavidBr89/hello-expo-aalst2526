import {initializeApp} from "firebase/app";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuibg8dC8GWfbinpg_aNOSyH_Dru1Ne-0",
  authDomain: "hogent-parkings-83da8.firebaseapp.com",
  projectId: "hogent-parkings-83da8",
  storageBucket: "hogent-parkings-83da8.firebasestorage.app",
  messagingSenderId: "71775332014",
  appId: "1:71775332014:web:90ad157340e22dd8c46f3f",
  measurementId: "G-F9PR563HTX"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});