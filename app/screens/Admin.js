import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const Admin = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [name, setName] = useState(""); // State for name (added)
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number (added)
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const role = 0;

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [showPassword, setShowPassword] = useState(false); // State for hiding and showing password
  const [isRegistering, setIsRegistering] = useState(false); // State to track whether the registration fields are shown
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
      //Gọi API đăng nhập
      const response = await fetch(
        "https://newsapi-springboot-production.up.railway.app/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      // Kiểm tra xem có lỗi không
      if (!response.ok) {
        // Xử lý khi có lỗi (ví dụ: thông báo lỗi)
        console.error("Email hoặc mật khẩu không đúng");
        return;
      }

      // Chuyển đổi phản hồi từ dạng JSON
      const data = await response.json();

      // Kiểm tra thông tin phản hồi từ server
      if (data.id) {
        // Đăng nhập thành công
        console.log("Server response:", data);
        console.log("Đăng nhập thành công");

        // Thực hiện các thao tác sau khi đăng nhập thành công (ví dụ: lưu thông tin đăng nhập vào AsyncStorage, chuyển hướng đến trang AdminHome)
        await AsyncStorage.setItem("userId", data.id.toString());
        navigation.navigate("AdminHome");
      } else {
        // Đăng nhập thất bại
        console.error("Không tìm thấy email hoặc mật khẩu");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API đăng nhập", error);
    } finally {
      setLoading(false); // Set loading to false when the login process completes
    }
  };
  const handleRegisterPress = async () => {
    try {
      setLoading(true);
      // Gọi API đăng kí
      const response = await fetch(
        "https://newsapi-springboot-production.up.railway.app/api/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phoneNumber,
            role,
          }),
        }
      );

      // Check if the response status is 409 (Conflict) indicating that the email is already in use
      if (response.status === 409) {
        // Log the response body
        const responseBody = await response.text();
        console.log("Server response:", responseBody);

        // You can also update the UI to display the error message to the user
        // For example, set a state variable for the error message and display it in your component
        // setErrorMessage(responseBody);
      } else if (!response.ok) {
        // Handle other error cases
        console.log("Server error:", response.status);
        console.error("Registration failed. Please try again later.");
      } else {
        // Registration successful
        console.log("Registration successful");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRegisterFields = () => {
    setIsRegistering(!isRegistering);
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

          {isRegistering && ( // Show registration fields only when registering
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={!showPassword}
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
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Họ và tên</Text>
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
            </>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={isRegistering ? handleRegisterPress : handleLoginPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonText}>
                {isRegistering ? "Đăng ký" : "Đăng nhập"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Toggle between login and register */}
          <TouchableOpacity onPress={toggleRegisterFields}>
            <Text style={styles.toggleText}>
              {isRegistering
                ? "Quay lại đăng nhập"
                : "Bạn chưa có tài khoản: Đăng ký"}
            </Text>
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
  passwordInputContainer: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 12, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
  },
  toggleText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});

export default Admin;
