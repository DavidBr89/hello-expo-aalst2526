import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../../global.css";
import { NavigationContainer } from "@react-navigation/native";
import ParkingsTabNavigator from "../navigators/ParkingsTabNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavoritesProvider from "../contexts/FavoritesContext";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const [fontLoaded] = useFonts({
    Delius: require("../../assets/fonts/Delius.ttf"),
  });

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <NavigationContainer>
            <ParkingsTabNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default Root;
