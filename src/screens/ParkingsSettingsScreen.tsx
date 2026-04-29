import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BasicText from "../components/BasicText";
import { useColorScheme } from "nativewind";
import BasicView from "../components/BasicView";
import { signOut } from "@firebase/auth";
import { auth } from "../config/firebase";

const ParkingsSettingsScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <BasicView className="flex-1 p-4 gap-8">
      <BasicText className="text-2xl text-green-950">Instellingen</BasicText>

      <BasicText>{auth.currentUser?.displayName}</BasicText>
      <BasicText>{auth.currentUser?.email}</BasicText>

      <BasicView className="flex flex-row items-center justify-between">
        <BasicText>Dark mode</BasicText>
        <Switch
          value={colorScheme === "dark"}
          onValueChange={() => toggleColorScheme()}
        />
      </BasicView>
      <TouchableOpacity
        onPress={() => {
          signOut(auth);
        }}
        className="bg-green-700 px-4 py-2 rounded-lg">
        <BasicText className="text-white text-center">Loguit</BasicText>
      </TouchableOpacity>
    </BasicView>
  );
};

export default ParkingsSettingsScreen;

const styles = StyleSheet.create({});
