import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ParkingList from "./src/components/ParkingList";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.blackView}>
        <Text style={styles.text}>Welkom bij Mobile.</Text>
        <Text style={styles.text}>Hallo</Text>
      </View>
      <ParkingList />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 56,
  },
  blackView: {
    flex: 1, // 1/6
  },
  text: {
    color: "white",
  },
});
