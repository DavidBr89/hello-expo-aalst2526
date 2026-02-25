import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "../../App";

import "../../global.css";
import { NavigationContainer } from "@react-navigation/native";
import ParkingStackNavigator from "../navigators/ParkingStackNavigator";

const Root = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ParkingStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Root;

const styles = StyleSheet.create({});
