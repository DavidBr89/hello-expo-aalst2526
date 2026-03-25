import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { ParkingsStackNavProps } from "../navigators/types";
import WebView from "react-native-webview";

const ParkingDetailScreen = () => {
  const {
    params: { data },
  } = useRoute<ParkingsStackNavProps<"parkingDetails">["route"]>();

  return (
    <WebView
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      source={{ uri: data.urllinkaddress }}
      className="flex-1"
    />
  );
};

export default ParkingDetailScreen;
