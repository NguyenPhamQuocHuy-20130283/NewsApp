// PasswordChangeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Don't forget to import axios
import * as Crypto from "expo-crypto";

const PasswordChangeScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchEmailById(); // Fetch user email when the component mounts
  }, []);

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log("User ID:", userId);
    return userId;
  };

  const fetchEmailById = async () => {
    try {
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/admin/find",
        {
          id: await getUserId(),
        }
      );
      setUserEmail(response.data.email);
      console.log("email id", response.data.email);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not fetch user email.");
    }
  };

  const handleSendEmail = async () => {
    // Add logic to send an email with a verification code
    setIsSendingEmail(true);

    try {
      // Send a POST request to the email sending API
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/mail/sendMail",
        {
          email: userEmail, // Use the user's email fetched earlier
        }
      );

      // Check if the API call was successful
      if (response.status === 200) {
        Alert.alert(
          "Thành công",
          "Email đã được gửi. Vui lòng kiểm tra email."
        );
        setTimeout(() => {
          setIsSendingEmail(false);
          setIsModalVisible(true);
        }, 2000);
      } else {
        // Handle the case where the API call was not successful
        Alert.alert("Error", "Failed to send. Please check your email");
        setIsSendingEmail(false);
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.log("Error sending email:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      setIsSendingEmail(false);
    }
  };

  const handleConfirmEmail = async () => {
    try {
      // Send a POST request to the authentication API
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/mail/authenticate",
        {
          email: userEmail,
          code: code,
        }
      );

      // Check if the API call was successful
      if (response.status === 200) {
        setIsEmailConfirmed(true);
        setIsModalVisible(false);
      } else {
        // Handle the case where the API call was not successful
        Alert.alert("Error", "Invalid verification code. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.log("Error confirming email:", error);
      Alert.alert("Lỗi", "Mã xác thực không hợp lệ. Vui lòng thử lại.");
    }
  };

  const handleChangePassword = async () => {
    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    try {
      setLoading(true);
      // Hash the password before sending it to the server
      const oldHashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        oldPassword
      );
      const newHashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        newPassword
      );
      // Send a POST request to the password update API
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/admin/updatePassword",
        {
          email: userEmail,
          password: oldHashedPassword, // Assuming you have a state for the old password
          newPassword: newHashedPassword,
        }
      );

      // Check if the API call was successful
      if (response.status === 200) {
        // Display success message
        Alert.alert("Thành công", "Mật khẩu đã được thay đổi.");
        navigation.navigate("AdminHome");
      } else {
        // Handle the case where the API call was not successful
        setLoading(false);
        Alert.alert("Lỗi", "Mật khẩu cũ không đúng.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      setLoading(false);
      console.log("Error changing password:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>

      {isEmailConfirmed && (
        <Text style={styles.sendingEmailText}>
          Email đã được xác nhận thành công.
        </Text>
      )}

      {!isEmailConfirmed && (
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>
            {isSendingEmail ? "Đang gửi email..." : "Gửi email xác nhận"}
          </Text>
        </TouchableOpacity>
      )}

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác thực Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter verification code"
              onChangeText={(text) => setCode(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleConfirmEmail}
            >
              <Text style={styles.buttonText}>Xác thực code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelText}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isEmailConfirmed && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu cũ"
            secureTextEntry
            onChangeText={(text) => setOldPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry
            onChangeText={(text) => {
              setConfirmPassword(text);
              setPasswordsMatch(true); // Reset the password match state when user types
            }}
          />
          {!passwordsMatch && (
            <Text style={styles.errorText}>
              Mật khẩu mới và nhập lại mật khẩu không khớp
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#6941DE",
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  sendingEmailText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6941DE",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cancelText: {
    color: "#6941DE",
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 8,
  },
});

export default PasswordChangeScreen;
