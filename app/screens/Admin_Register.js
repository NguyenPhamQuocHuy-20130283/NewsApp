import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Admin_Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for hiding and showing password
  const [loading, setLoading] = useState(false); // State for loading indicator
  const handleRegisterPress = async () => {
    try {
      setLoading(true);
      // Hash the password before sending it to the server
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/admin/register",
        {
          name: name,
          email: email,
          password: hashedPassword,
          phone: phoneNumber,
          role: 1,
        }
      );

      // Xử lý response ở đây nếu cần
      // Ví dụ: Hiển thị thông báo đăng ký thành công

      Alert.alert("Đăng ký thành công", "Bạn đã đăng ký thành công!");
      await AsyncStorage.setItem("userId", response.data.id.toString());
      navigation.navigate("AdminHome");
    } catch (error) {
      // Xử lý lỗi ở đây
      // Ví dụ: Hiển thị thông báo lỗi
      Alert.alert("Lỗi", "Đăng ký thất bại. Email đã tồn tại!");
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/admin_login.png")}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <Text style={styles.loginText}>Đăng ký</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={!showPassword}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tên</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleRegisterPress}
            >
              <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Đã có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Admin")}>
                <Text style={styles.registerLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
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
  passwordInputContainer: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: "70%", // Đặt vị trí theo giữa chiều cao của TextInput
    right: 10, // Đặt vị trí từ phía bên phải
    transform: [{ translateY: -10 }], // Dịch chuyển icon lên trên để căn giữa
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    textAlign: "center",
  },
  registerLink: {
    color: "#6941DE",
    marginLeft: 5,
  },
});
export default Admin_Register;
