import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { ParkingsStackNavProps } from "../navigators/types";

const ParkingDetailScreen = () => {
  const {
    params: { data },
  } = useRoute<ParkingsStackNavProps<"parkingDetails">["route"]>();

  return (
    <View>
      <Text>{data.name}</Text>
    </View>
  );
};

export default ParkingDetailScreen;
