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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Don't forget to import axios

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
      console.error("Error sending email:", error);
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
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    try {
      // Send a POST request to the password update API
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/admin/updatePassword",
        {
          email: userEmail,
          password: oldPassword, // Assuming you have a state for the old password
          newPassword: newPassword,
        }
      );

      // Check if the API call was successful
      if (response.status === 200) {
        // Display success message
        Alert.alert("Success", "Password changed successfully!");
        navigation.navigate("Admin");
      } else {
        // Handle the case where the API call was not successful
        Alert.alert("Error", "Failed to change password. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error changing password:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      {isEmailConfirmed && (
        <Text style={styles.sendingEmailText}>
          Email confirmed. Please enter your new password.
        </Text>
      )}

      {!isEmailConfirmed && (
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>
            {isSendingEmail ? "Sending email..." : "Send verification email"}
          </Text>
        </TouchableOpacity>
      )}

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verify Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter verification code"
              onChangeText={(text) => setCode(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleConfirmEmail}
            >
              <Text style={styles.buttonText}>Confirm Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isEmailConfirmed && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter old password"
            secureTextEntry
            onChangeText={(text) => setOldPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            secureTextEntry
            onChangeText={(text) => {
              setConfirmPassword(text);
              setPasswordsMatch(true); // Reset the password match state when user types
            }}
          />
          {!passwordsMatch && (
            <Text style={styles.errorText}>
              New password and confirm password do not match.
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
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
