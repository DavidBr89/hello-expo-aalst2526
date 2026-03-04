import {
  ActivityIndicator,
  Alert,
  Button,
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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";

interface ParkingResponse {
  total_count: number;
  results: Parking[];
}

const ParkingList = () => {
  const navigation = useNavigation();
  // const [parkings, setParkings] = useState<Parking[]>([]);

  const isFocused = useIsFocused();

  const navigate = useNavigation();

  // useEffect(() => {
  //   const fetchParkings = async () => {
  //     try {
  //       const response = await Axios.get<ParkingResponse>(
  //         "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records",
  //       );

  //       setParkings(response.data.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (isFocused) {
  //     fetchParkings();
  //   }
  // }, [isFocused]);

  const { data, isLoading, isError, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["fetchParkings"],
    queryFn: () =>
      Axios.get<ParkingResponse>(
        "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records",
      ),
    refetchInterval: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationKey: ["newParking"],
    mutationFn: (data: Parking) =>
      Axios.post<ParkingResponse>(
        "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records",
        data,
      ),
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
          // navigate.navigate("parkingsMap");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text>{new Date(dataUpdatedAt).toLocaleTimeString()}</Text>
      <FlatList
        data={data?.data.results}
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
      <Button
        title="Mutatie POST"
        onPress={() => {
          mutation.mutate(
            { id: "newParking", name: "Campus Aalst" },
            {
              onError: (err) => {
                Alert.alert("Fout", err.message);
              },
            },
          );
        }}></Button>
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
