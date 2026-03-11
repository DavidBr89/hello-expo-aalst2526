import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import BasicText from "../components/BasicText";
import { useColorScheme } from "nativewind";
import BasicView from "../components/BasicView";

const ParkingsSettingsScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <BasicView className="flex-1 p-4">
      <BasicText className="text-2xl text-green-950">Instellingen</BasicText>

      <BasicView className="flex flex-row items-center justify-between">
        <BasicText>Dark mode</BasicText>
        <Switch
          value={colorScheme === "dark"}
          onValueChange={() => toggleColorScheme()}
        />
      </BasicView>
    </BasicView>
  );
};

export default ParkingsSettingsScreen;

const styles = StyleSheet.create({});
