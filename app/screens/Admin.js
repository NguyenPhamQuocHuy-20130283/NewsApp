import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

const Admin = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  const handleLoginPress = () => {
    // Thực hiện các logic đăng nhập ở đây (nếu cần)

    // Chuyển hướng đến trang AdminHome
    navigation.navigate("AdminHome");
  };

  if (!fontLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/admin_login.png")}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Text style={styles.loginText}>Đăng nhập</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tài khoản / email</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput style={styles.input} secureTextEntry={true} />
          </View>
          <TouchableOpacity style={styles.button} onPress={(handleLoginPress)}>
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Inter-Bold",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "white",
    padding: 25,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  loginText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "white",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#6941DE",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default Admin;
