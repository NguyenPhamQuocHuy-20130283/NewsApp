import React, { StrictMode, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Crypto from "expo-crypto";
import { firebaseConfig } from "../../config.js";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/compat";
import { parsePhoneNumberFromString } from "libphonenumber-js";
const Admin_Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = React.useRef(null);
  const [showPassword, setShowPassword] = useState(false); // State for hiding and showing password
  const [loading, setLoading] = useState(false); // State for loading indicator
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const vietnamesePhoneNumberRegex = /^(0[23456789]|84[23456789])(\d{8})$/;
  //sendmail

  const handleSendVerificationCode = async () => {
    try {
      setLoading(true);
      const phoneNumberFormatted = parsePhoneNumberFromString(
        phoneNumber,
        "VN"
      ).format("E.164");
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumberFormatted,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setIsCodeModalVisible(true);
      Alert.alert(
        "Thông báo",
        "Mã xác thực đã được gửi đến số điện thoại của bạn!"
      );
    } catch (err) {
      Alert.alert("Lỗi", "Gửi mã xác thực thất bại!");
      setLoading(false);
      console.log(err);
    }
  };
  const confirmCode = async () => {
    try {
      setLoading(true);
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      setIsCodeModalVisible(false);
      Alert.alert("Thông báo", "Xác thực thành công!");
      handleRegisterPress();
    } catch (err) {
      Alert.alert("Lỗi", "Xác thực thất bại!");
      setLoading(false);
      console.log(err);
    }
  };

  const handleRegisterPress = async () => {
    try {
      setLoading(true);

      // Validate email using regex
      if (!emailRegex.test(email)) {
        setLoading(false);
        Alert.alert("Lỗi", "Địa chỉ email không hợp lệ.");
        return;
      }
      if (!vietnamesePhoneNumberRegex.test(phoneNumber)) {
        setLoading(false);
        Alert.alert("Lỗi", "Số điện thoại không hợp lệ.");
        return;
      }

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
          role: 0, //0: author, 1: admin
        }
      );
      // Xử lý response ở đây nếu cần
      console.log(response.data);
      Alert.alert("Thông báo", "Đăng ký thành công! Quay lại trang đăng nhập");
      navigation.navigate("Admin");
    } catch (error) {
      // Xử lý lỗi ở đây
      // Ví dụ: Hiển thị thông báo lỗi
      Alert.alert(
        "Lỗi",
        "Đăng ký thất bại. Email hoặc số điện thoại đã sử dụng!"
      );
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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

              <View style={styles.recaptchaContainer}>
                <FirebaseRecaptchaVerifierModal
                  ref={recaptchaVerifier}
                  firebaseConfig={firebaseConfig}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendVerificationCode}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Đăng kí</Text>
                )}
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

        {/* Modal */}
        <Modal
          visible={isCodeModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setIsCodeModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Nhập mã code</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mã code"
                onChangeText={(text) => setCode(text)}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsCodeModalVisible(false);
                  // Gọi hàm xác nhận mã code
                  confirmCode();
                }}
              >
                <Text style={styles.buttonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      {/* end of modal */}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền với độ trong suốt
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recaptchaContainer: {
    alignItems: "center",
    marginBottom: 20, // Adjust the margin as needed
  },
});
export default Admin_Register;
