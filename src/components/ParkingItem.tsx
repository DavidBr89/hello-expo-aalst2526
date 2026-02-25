import { ListRenderItem, StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";

// interface ParkingItemProps extends PropsWithChildren {
//   parking: Parking;
// }

const ParkingItem: ListRenderItem<Parking> = ({ item, index, separators }) => {
  return (
    <View style={styles.parkingItem}>
      <Text>{item.name}</Text>
    </View>
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
