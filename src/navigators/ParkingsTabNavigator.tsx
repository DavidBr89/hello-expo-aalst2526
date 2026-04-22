import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParkingsTabParamsList } from "./types";
import ParkingsMapScreen from "../screens/ParkingsMapScreen";
import ParkingsSettingsScreen from "../screens/ParkingsSettingsScreen";
import ParkingList from "../components/ParkingList";
import ParkingStackNavigator from "./ParkingStackNavigator";
import Feather from "@expo/vector-icons/Feather";
import ParkingsDrawerNavigator from "./ParkingsDrawerNavigator";
import FavoritesScreen from "../screens/FavoritesScreen";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

const languages = {
  nl: {
    mapTitle: "Kaart",
  },
  eng: {
    mapTitle: "Map",
  },
};

const ParkingsTab = createBottomTabNavigator<ParkingsTabParamsList>();

const ParkingsTabNavigator = () => {
  const favorites = useAppSelector((state) => state.favorites);

  return (
    <ParkingsTab.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#236506" },
        headerTitleStyle: { fontFamily: "Delius" },
        tabBarLabelStyle: { fontFamily: "Delius" },
        tabBarStyle: { backgroundColor: "#236506" },
        tabBarActiveTintColor: "#78350f",
        tabBarInactiveTintColor: "#ddd",
        // headerShown: false,
      }}>
      <ParkingsTab.Group
        screenOptions={{
          headerShown: false,
        }}>
        <ParkingsTab.Screen
          name="parkings"
          options={{
            title: "Parkings",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
          component={ParkingStackNavigator}
        />
        <ParkingsTab.Screen
          name="parkingsMap"
          component={ParkingsMapScreen}
          options={{
            headerShown: true,
            title: languages["nl"].mapTitle,
            tabBarIcon: ({ color, size }) => (
              <Feather name="map" color={color} size={size} />
            ),
          }}
        />
        <ParkingsTab.Screen
          name="favorites"
          component={FavoritesScreen}
          options={{
            title: "Favorieten",
            headerShown: true,
            tabBarIcon: ({ size, color }) => (
              <Feather size={size} color={color} name="star" />
            ),
            tabBarBadge: favorites.length,
          }}
        />
        <ParkingsTab.Screen
          name="parkingsSettings"
          options={{
            title: "Instellingen",
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }}
          component={ParkingsDrawerNavigator}
        />
      </ParkingsTab.Group>
    </ParkingsTab.Navigator>
  );
};

export default ParkingsTabNavigator;
