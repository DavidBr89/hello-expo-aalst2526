import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import App from "../../App";
import ParkingList from "../components/ParkingList";
import ParkingDetailScreen from "../screens/ParkingDetailScreen";
import { ParkingsStackParamsList } from "./types";

const ParkingsStack = createStackNavigator<ParkingsStackParamsList>();

const ParkingStackNavigator = () => {
  return (
    <ParkingsStack.Navigator>
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
      />
    </ParkingsStack.Navigator>
  );
};

export default ParkingStackNavigator;
