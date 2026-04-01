import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import App from "../../App";
import ParkingList from "../components/ParkingList";
import ParkingDetailScreen from "../screens/ParkingDetailScreen";
import { ParkingsStackParamsList } from "./types";

import MdIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import AddParkingScreen from "../screens/AddParkingScreen";
// import { useNavigation } from "@react-navigation/native";

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
        options={({ navigation }) => ({
          title: "Parkings",
          headerRight: ({ tintColor }) => {
            return (
              <TouchableOpacity
                className="mr-4"
                onPress={() => {
                  navigation.navigate("addParking");
                }}>
                <MdIcons name="plus" color={tintColor} size={24} />
              </TouchableOpacity>
            );
          },
        })}
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
      <ParkingsStack.Screen name="addParking" component={AddParkingScreen} />
    </ParkingsStack.Navigator>
  );
};

export default ParkingStackNavigator;
