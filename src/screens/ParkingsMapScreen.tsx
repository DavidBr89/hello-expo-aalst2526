import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Axios from "axios";

import MapView, { Marker } from "react-native-maps";
import { useQuery } from "@tanstack/react-query";
import {
  useBackgroundPermissions,
  useForegroundPermissions,
} from "expo-location";

const ParkingsMapScreen = () => {
  const [foreGroundStatus, foreGroundRequestPermission] =
    useForegroundPermissions();

  const [backGroundStatus, backGroundRequestPermission] =
    useBackgroundPermissions();

  // useEffect(() => {
  //   if (foreGroundStatus?.canAskAgain) {
  //     foreGroundRequestPermission();
  //   }
  // }, [foreGroundStatus?.canAskAgain]);

  useEffect(() => {
    if (backGroundStatus?.canAskAgain) {
      backGroundRequestPermission();
    }
  }, [backGroundStatus?.canAskAgain]);

  const { data, isLoading, isError, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["fetchParkings"],
    queryFn: () =>
      Axios.get<ParkingResponse>(
        "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records",
      ),
    refetchInterval: 5 * 60 * 1000,
  });

  const newLocation = {
    lat: 50.84561526658862,
    long: 4.376771196723772,
  };

  // const [counter, setCounter] = useState(2);
  // const counterRef = useRef(2);

  // setCounter(10);

  // counterRef.current = 10;

  const mapRef = useRef<MapView>(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        showsUserLocation
        style={styles.container}
        onRegionChangeComplete={(region) => {
          console.log(region);
        }}
        initialCamera={{
          center: {
            latitude: 51.047215240846846,
            longitude: 3.7290928214796315,
          },
          heading: 0,
          pitch: 0,
          zoom: 12,
        }}
        // initialRegion={{
        //   latitudeDelta: 0.005,
        //   longitudeDelta: 0.05,
        // }}
      >
        {data?.data.results.map((p) => {
          return (
            <Marker
              key={p.id}
              title={p.name}
              draggable
              onDragEnd={(location) => {
                console.log(location);
              }}
              coordinate={{
                latitude: p.location.lat,
                longitude: p.location.lon,
              }}
            />
          );
        })}
      </MapView>
      <TouchableOpacity
        onPress={() => {
          mapRef.current?.animateCamera(
            {
              center: {
                latitude: newLocation.lat,
                longitude: newLocation.long,
              },
            },
            { duration: 500 },
          );
        }}
        className="my-4 mx-4 px-4 py-2 bg-red-600">
        <Text className="text-white font-bold text-center">Naar Brussel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParkingsMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
});
