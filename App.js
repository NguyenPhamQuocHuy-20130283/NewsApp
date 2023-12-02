import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Admin from "./app/screens/Admin";

export default function App() {
  return <Admin />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
