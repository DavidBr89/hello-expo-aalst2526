import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import React from "react";
import Axios from "axios";
import ParkingItem from "./ParkingItem";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

interface ParkingResponse {
  total_count: number;
  results: Parking[];
}

const ParkingList = () => {
  const navigation = useNavigation();

  const { data, isLoading, isError, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["fetchParkings"],
    queryFn: () =>
      Axios.get<ParkingResponse>(
        "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records",
      ),
    refetchInterval: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    Alert.alert("Netwerk fout", error.message, [
      {
        text: "Opnieuw",
        style: "destructive",
        onPress: () => {
          refetch();
        },
      },
      {
        text: "In orde",
        onPress: () => {
          // no-op
        },
      },
    ]);
  }

  const parkings = data?.data.results ?? [];

  return (
    <View className="flex-1 bg-slate-50 px-4 pt-4">
      <View className="mb-4 rounded-2xl bg-slate-900 px-4 py-4">
        <Text className="text-xs uppercase tracking-wider text-slate-300">
          Gent Parkeerinfo
        </Text>
        <Text className="mt-1 text-xl font-bold text-white">
          Beschikbare parkings
        </Text>
        <Text className="mt-2 text-xs text-slate-300">
          Laatste update: {new Date(dataUpdatedAt).toLocaleTimeString()}
        </Text>
      </View>

      <FlatList
        data={parkings}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <ParkingItem
              parking={item}
              onPress={() => {
                navigation.navigate("parkingDetails", { data: item });
              }}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ParkingList;
