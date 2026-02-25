import {
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { useNavigation } from "@react-navigation/native";

// interface ParkingItemProps extends PropsWithChildren {
//   parking: Parking;
// }

const ParkingItem: ListRenderItem<Parking> = ({ item, index, separators }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("parkingDetails");
      }}
      style={styles.parkingItem}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ParkingItem;

const styles = StyleSheet.create({
  parkingItem: {
    padding: 8,
    height: 500,
    marginVertical: 16,
  },
});
