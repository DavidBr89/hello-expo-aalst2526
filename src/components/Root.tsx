import React, { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../../global.css";
import { NavigationContainer } from "@react-navigation/native";
import ParkingsTabNavigator from "../navigators/ParkingsTabNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavoritesProvider from "../contexts/FavoritesContext";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useTanStackQueryDevTools } from "@rozenite/tanstack-query-plugin";
import { useReactNavigationDevTools } from "@rozenite/react-navigation-plugin";
import AuthStackNavigator from "../navigators/AuthStackNavigator";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "@firebase/auth";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useTanStackQueryDevTools(queryClient);

  const navigationRef = useRef(null);

  useReactNavigationDevTools({ ref: navigationRef });

  const [fontLoaded] = useFonts({
    Delius: require("../../assets/fonts/Delius.ttf"),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user !== null);
      setIsAuthLoading(false);
      console.log("USER onAuthStateChanged ", user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (fontLoaded && !isAuthLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, isAuthLoading]);

  if (!fontLoaded && isAuthLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <FavoritesProvider>
              <NavigationContainer ref={navigationRef}>
                {isLoggedIn ? <ParkingsTabNavigator /> : <AuthStackNavigator />}
              </NavigationContainer>
            </FavoritesProvider>
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default Root;
