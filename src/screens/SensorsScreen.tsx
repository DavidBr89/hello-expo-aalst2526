import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { Accelerometer, Pedometer } from "expo-sensors";

const SensorsScreen = () => {
  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    // const subscription = Accelerometer.addListener((event) => {
    //   console.log(event);
    // });

    const stepsSub = Pedometer.watchStepCount((status) => {
      console.log("STAPPEN :", status.steps);
    });

    return () => {
      //   subscription.remove();
      stepsSub.remove();
    };
  }, []);

  return (
    <View>
      <Text>SensorsScreen</Text>
    </View>
  );
};

export default SensorsScreen;

const styles = StyleSheet.create({});
