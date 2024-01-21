import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native";
import * as Crypto from "expo-crypto";

const Admin = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [showPassword, setShowPassword] = useState(false); // State for hiding and showing password
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  const handleLoginPress = async () => {
    try {
      setLoading(true);

      // Validate email using regex
      if (!emailRegex.test(email)) {
        setLoading(false);
        Alert.alert("Lỗi", "Địa chỉ email không hợp lệ.");
        return;
      }

      // Gọi API đăng nhập sử dụng axios
      // Hash the password before sending it to the server
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/admin/login",
        {
          email: email,
          password: hashedPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Kiểm tra xem có lỗi không
      if (!response.data.id) {
        // Xử lý khi có lỗi (ví dụ: thông báo lỗi)
        console.log("Email hoặc mật khẩu không đúng");
        setLoading(false); // Tắt chế độ loading
        return;
      }

      // Đăng nhập thành công
      console.log("Đăng nhập thành công");
      console.log("Thông tin người dùng", response.data.id);
      // Thực hiện các thao tác sau khi đăng nhập thành công (ví dụ: lưu thông tin đăng nhập vào AsyncStorage, chuyển hướng đến trang AdminHome)
      await AsyncStorage.setItem("userId", response.data.id.toString());
      navigation.navigate("AdminHome");
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
        text2: "Chào mừng bạn đến với trang quản trị viên",
      });

      // Hiển thị thông báo chào mừng
    } catch (error) {
      // Xử lý lỗi ở đây
      // Ví dụ: Hiển thị thông báo lỗi
      Alert.alert("Lỗi", "Đăng nhập thất bại. Kiểm tra email và mật khẩu.");
      setLoading(false);
      console.log("Lỗi khi gọi API đăng nhập", error);
    } finally {
      setLoading(false); // Set loading to false when the login process completes
    }
  };

  if (!fontLoaded) {
    return <View />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/admin_login.png")}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <Text style={styles.loginText}>Đăng nhập</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.passwordInputContainer}>
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
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLoginPress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.buttonText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Bạn chưa có tài khoản</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Admin_Register")}
              >
                <Text style={styles.registerLink}>Đăng ký</Text>
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
    top: "50%", // Đặt vị trí theo giữa chiều cao của TextInput
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

export default Admin;
