import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function My_news() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>My News</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Đảm bảo ScrollView có thể mở rộng khi nội dung lớn hơn màn hình
  },
  container: {
    flex: 1,
    fontFamily: "Inter-Bold",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "white",
    padding: 25,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  imagePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Chỉnh căn lề về phía bên phải
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 45,
    borderColor: "white",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  input_big: {
    height: 200,
    borderColor: "white",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#6941DE",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  button_image: {
    backgroundColor: "#6941DE",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "30%",
    alignSelf: "center",
    marginBottom: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  selectedImage: {
    width: 170,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
  },
  dropdownContainer: {
    width: "100%",
    marginTop: 8,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ced4da",
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownDropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ced4da",
  },
});
