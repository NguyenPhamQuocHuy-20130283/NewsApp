import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ArticleDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { articleId } = route.params;
  const [article, setArticle] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userRoleId, setUserRoleId] = useState("");

  const fetchArticle = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/article/getById",
        { id: articleId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setArticle(response.data);
    } catch (error) {
      console.log("Error fetching article:", error);
    }
  }, [articleId]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle, isFocused]);

  useEffect(() => {
    const fetchRoleId = async () => {
      try {
        const response = await axios.post(
          "https://newsapi-springboot-production.up.railway.app/api/admin/find",
          {
            id: await getUserId(),
          }
        );
        setUserRoleId(response.data.role);
        console.log("role id", response.data.role); // Log the updated value
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Could not fetch user role.");
      }
    };

    fetchRoleId();
  }, []);

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log("User ID:", userId);
    return userId;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleApprove = () => {
    // Show the confirmation modal
    toggleModal();
  };

  const handleReject = () => {
    // Update the status to "REJECTED" through API call
    updateArticleStatus("cancel");
  };

  const updateArticleStatus = async (status) => {
    try {
      setIsLoading(true);
      await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/article/updateStatus",
        { id: articleId, status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Alert user about the status change
      Alert.alert(
        `Article ${status}`,
        `Article ${article.title} is now ${status}.`
      );

      // Navigate back and refresh the previous screen
      navigation.goBack();
    } catch (error) {
      console.error("Error updating article status:", error);
      setIsLoading(false);
    }
  };

  const handleConfirmApprove = () => {
    // Update the status to "APPROVED" through API call
    updateArticleStatus("published");
    // Close the modal after approving
    toggleModal();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.category}>{article?.category?.name}</Text>
          <Text style={styles.date}>{formatDate(article?.publishTime)}</Text>
        </View>

        <Text style={styles.title}>{article?.title}</Text>
        <Text style={styles.content}>{article?.content}</Text>

        <Image source={{ uri: article?.image }} style={styles.image} />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Xác nhận duyệt bài báo?</Text>

            <View style={styles.modalButtonsContainer}>
              <TouchableHighlight
                underlayColor="#DDDDDD"
                style={{ ...styles.modalButton, backgroundColor: "white" }}
                onPress={handleConfirmApprove}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#DDDDDD"
                style={{
                  ...styles.modalButton,
                  backgroundColor: "#6941DE",
                }}
                onPress={toggleModal}
              >
                <Text style={{ ...styles.modalButtonText, color: "white" }}>
                  No
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonsContainer}>
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="extra-large" color="#6941DE" />
          </View>
        ) : (
          <>
            {userRoleId === 1 && ( // Render only if the user is an admin (roleId === 1)
              <>
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={handleApprove}
                >
                  <Text style={styles.buttonText}>Duyệt</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={handleReject}
                >
                  <Text style={styles.buttonText}>Không duyệt</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `Ngày ${day}/${month}/${year}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555555",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  approveButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#FF5733",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#F0F0F0",
    padding: 30,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 10, // Adjust the top margin to separate buttons from text
    borderColor: "#6941DE",
    borderWidth: 1,
  },
  modalButtonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default ArticleDetailScreen;
