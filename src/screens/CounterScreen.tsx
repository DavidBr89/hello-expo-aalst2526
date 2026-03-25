import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { decrementByOne, incrementByOne } from "../store/counter/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CounterScreen = () => {
  // Uitlezen uit Redux store - useSelector

  const counter = useAppSelector((state) => state.counter);

  //   Dispatch - wijziging in mijn state in de store
  const dispatch = useAppDispatch();

  return (
    <View className="p-4">
      <Text className="text-5xl">{counter}</Text>
      <View className="flex flex-row gap-8 px-8">
        <TouchableOpacity
          onPress={() => {
            dispatch(decrementByOne());
          }}
          className="bg-green-600 rounded-full p-4">
          <Text className="text-white font-bold text-3xl">-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(incrementByOne());
          }}
          className="bg-green-600 rounded-full p-4">
          <Text className="text-white font-bold text-3xl">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CounterScreen;
