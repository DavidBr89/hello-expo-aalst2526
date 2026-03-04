import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ParkingsDrawerParamsList } from "./types";
import ParkingsSettingsScreen from "../screens/ParkingsSettingsScreen";
import AboutScreen from "../screens/AboutScreen";

const Drawer = createDrawerNavigator<ParkingsDrawerParamsList>();

const ParkingsDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="about" component={AboutScreen} />
      <Drawer.Screen name="settings" component={ParkingsSettingsScreen} />
    </Drawer.Navigator>
  );
};

export default ParkingsDrawerNavigator;
