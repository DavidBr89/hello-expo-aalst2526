import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import ParkingItem from "./ParkingItem";
import { useNavigation } from "@react-navigation/native";

interface ParkingResponse {
  total_count: number;
  results: Parking[];
}

const ParkingList = () => {
  const navigation = useNavigation();
  const [parkings, setParkings] = useState<Parking[]>([]);

  useEffect(() => {
    const fetchParkings = async () => {
      try {
        const response = await Axios.get<ParkingResponse>(
          "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records",
        );

        setParkings(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchParkings();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={parkings}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("parkingDetails", { data: item });
              }}
              style={styles.parkingItem}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ParkingList;

const styles = StyleSheet.create({
  container: {
    flex: 5, // 5/6
    backgroundColor: "white",
  },
  parkingItem: {
    padding: 8,
    height: 500,
    marginVertical: 16,
  },
});
