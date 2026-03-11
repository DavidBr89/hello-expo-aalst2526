import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ParkingsDrawerParamsList } from "./types";
import ParkingsSettingsScreen from "../screens/ParkingsSettingsScreen";
import AboutScreen from "../screens/AboutScreen";

const Drawer = createDrawerNavigator<ParkingsDrawerParamsList>();

const ParkingsDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "Delius" },
        headerStyle: { backgroundColor: "#236506" },
        headerTintColor: "white",
      }}>
      <Drawer.Screen
        name="settings"
        options={{
          title: "Instellingen",
        }}
        component={ParkingsSettingsScreen}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "Over ons",
        }}
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
};

export default ParkingsDrawerNavigator;
