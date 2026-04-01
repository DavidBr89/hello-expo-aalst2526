import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ParkingItem from "../components/ParkingItem";
import { useAppSelector } from "../hooks/reduxHooks";

const FavoritesScreen = () => {
  const favorites = useAppSelector((state) => state.favorites);

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={favorites}
        ListEmptyComponent={() => {
          return (
            <View className="flex-1 justify-center items-center">
              <Text>Geen favorieten</Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          return <ParkingItem parking={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
