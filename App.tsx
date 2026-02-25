import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ParkingList from "./src/components/ParkingList";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function App() {
  // Manueel gebruiken van de insets waardes
  // const { top, bottom } = useSafeAreaInsets();
  // console.log(top, bottom);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blackView}>
        <Text style={styles.text}>Welkom bij Mobile.</Text>
        <Text className="text-2xl text-amber-400">Hallo</Text>
      </View>
      <ParkingList />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // paddingTop: 56,
  },
  blackView: {
    flex: 1, // 1/6
  },
  text: {
    color: "white",
  },
});
