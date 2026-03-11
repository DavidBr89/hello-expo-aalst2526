import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import App from "../../App";
import ParkingList from "../components/ParkingList";
import ParkingDetailScreen from "../screens/ParkingDetailScreen";
import { ParkingsStackParamsList } from "./types";

const ParkingsStack = createStackNavigator<ParkingsStackParamsList>();

const ParkingStackNavigator = () => {
  return (
    <ParkingsStack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerTitleStyle: { fontFamily: "Delius" },
        headerStyle: { backgroundColor: "#236506" },
        // headerShown: false,
      }}>
      <ParkingsStack.Screen
        options={{
          title: "Parkings",
        }}
        name="parkingsList"
        component={ParkingList}
      />
      <ParkingsStack.Screen
        name="parkingDetails"
        component={ParkingDetailScreen}
        options={({ route }) => ({
          title: route.params.data.name ?? "Details",
        })}
      />
    </ParkingsStack.Navigator>
  );
};

export default ParkingStackNavigator;
