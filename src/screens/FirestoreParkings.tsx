import { View, Text, Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import BasicText from "../components/BasicText";

// enum ParkingTypeEnum {
//     UNDERGROUND = "Ondergronds",
// }

type ParkingType = "underground" | "topfloor" | "centre" | "carpool";

interface FirestoreParking {
  id: string;
  capacity: number;
  electricPlaces: number;
  isUnderground: boolean;
  parkingType: ParkingType;
  name: string;
  timestamp: Timestamp;
}

const FirestoreParkings = () => {
  const [parkings, setParkings] = useState<FirestoreParking[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    (async () => {
      try {
        const q = query(
          collection(db, "parkings"),
          where("capacity", ">", 50),
          orderBy("name", "asc"),
        );

        // Eénmalig data opvragen
        // const qs = await getDocs(q);

        // setParkings(
        //   qs.docs.map((ds) => {
        //     return { ...ds.data(), id: ds.id } as FirestoreParking;
        //   }),
        // );

        // Realtime updates
        unsubscribe = onSnapshot(q, (qs) => {
          setParkings(
            qs.docs.map((ds) => {
              return { ...ds.data(), id: ds.id } as FirestoreParking;
            }),
          );
        });
      } catch (error) {
        Alert.alert("Fout", "Fout bij het ophalen van data");
      }
    })();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={parkings}
        renderItem={({ item }) => {
          return <BasicText>{item.name}</BasicText>;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FirestoreParkings;
