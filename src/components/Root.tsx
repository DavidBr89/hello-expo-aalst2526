import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "../../App";

import "../../global.css";
import { NavigationContainer } from "@react-navigation/native";
import ParkingStackNavigator from "../navigators/ParkingStackNavigator";
import ParkingsTabNavigator from "../navigators/ParkingsTabNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Root = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <ParkingsTabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default Root;

const styles = StyleSheet.create({});
