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
  RefreshControl,
  FlatList,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const ArticleListScreen = ({ route }) => {
  const [activeTab, setActiveTab] = useState("all"); // "all", "PENDING", "PUBLISHED", "CANCEL"
  const [searchText, setSearchText] = useState("");
  const [articles, setArticles] = useState([]);
  const { roleId } = route.params;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false); // Added state for refreshing

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log("User ID:", userId);
    return userId;
  };

  const fetchArticles = async () => {
    try {
      setRefreshing(true);
      if (roleId === 1) {
        const response = await axios.post(
          "https://newsapi-springboot-production.up.railway.app/api/article/getNewArticles"
        );
        setArticles(response.data);
      } else {
        const userId = await getUserId();
        const response = await axios.post(
          "https://newsapi-springboot-production.up.railway.app/api/article/getByAuthorId",
          { id: userId }
        );
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen is focused
      fetchArticles();
    }, [])
  );

  const onRefresh = () => {
    fetchArticles();
  };

  const renderArticle = ({ item, index }) => {
    // Check if the article should be displayed based on the activeTab
    if (
      activeTab !== "all" &&
      item.status.toLowerCase() !== activeTab.toLowerCase()
    ) {
      // Skip rendering if the article's status doesn't match the activeTab
      return null;
    }

    const statusColor = getStatusColor(item.status);
    const navigateToDetail = () => {
      console.log(`Navigate to article detail screen: ${item.id}`);
      navigation.navigate("ArticleDetailScreen", { articleId: item.id });
    };
    const summary = item.content ? item.content.substring(0, 25) : "";
    const title = item.title ? item.title.substring(0, 25) : "";

    return (
      <TouchableOpacity key={item.id} onPress={navigateToDetail}>
        <View
          key={item.id}
          style={[styles.articleContainer, { backgroundColor: statusColor }]}
        >
          <Image source={{ uri: item.image }} style={styles.articleImage} />
          <View style={styles.articleDetails}>
            <Text style={styles.articleTitle}>{title + "..."}</Text>
            <Text style={styles.articleSummary}>{summary + "..."}</Text>
          </View>
          {/* Move statusContainer and statusLabelText outside of articleDetails */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabelText}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const filterArticles = () => {
    if (!searchText) {
      return articles;
    }

    const lowerSearch = searchText.toLowerCase();
    return articles.filter((article) =>
      article.title.toLowerCase().includes(lowerSearch)
    );
  };
  const getStatusColor = (status) => {
    const lowercaseStatus = (status || "").toLowerCase();

    switch (lowercaseStatus) {
      case "pending":
        return "#F9FFB4"; // yellow
      case "published":
        return "#D6FFE4"; // green
      case "cancel":
        return "#FFD6D6"; // red
      default:
        return "#F0F0F0"; // black (default color)
    }
  };

  const getStatusText = (status) => {
    const lowercaseStatus = (status || "").toLowerCase();

    switch (lowercaseStatus) {
      case "pending":
        return "Chờ duyệt";
      case "published":
        return "Đã duyệt";
      case "cancel":
        return "Không duyệt";
      default:
        return "Không xác định";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm bài viết"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                Alert.alert("Search", `Searching for: ${searchText}`);
              }}
            >
              {/* Use the icon here */}
              <Icon name="magnify" size={30} color="#6941DE" />
            </TouchableOpacity>
          </View>
          <View style={styles.tabs}>
            <Text
              style={[styles.tab, activeTab === "all" && styles.activeTab]}
              onPress={() => setActiveTab("all")}
            >
              Tất cả
            </Text>
            <Text
              style={[styles.tab, activeTab === "PENDING" && styles.activeTab]}
              onPress={() => setActiveTab("PENDING")}
            >
              Chờ duyệt
            </Text>
            <Text
              style={[
                styles.tab,
                activeTab === "PUBLISHED" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("PUBLISHED")}
            >
              Đã duyệt
            </Text>
            <Text
              style={[styles.tab, activeTab === "CANCEL" && styles.activeTab]}
              onPress={() => setActiveTab("CANCEL")}
            >
              Không duyệt
            </Text>
          </View>
        </View>

        {/* Article List */}
        <FlatList
          data={filterArticles()} // Use the filtered data for rendering
          renderItem={renderArticle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  statusContainer: {
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: "flex-end",
  },
  header: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginTop: 10,
  },
  headerTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    position: "absolute",
    right: 16,
    padding: 8,
  },
  searchButtonText: {
    color: "#ffffff",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Roboto",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0073b7",
    color: "#0073b7",
  },
  articleList: {
    flex: 1,
  },
  articleContainer: {
    flexDirection: "row",
    padding: 16,
    borderColor: "#6941DE",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: "space-between",
  },
  articleImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  articleDetails: {
    flex: 1,
    marginLeft: 16, // Added marginLeft for spacing
  },
  articleTitle: {
    fontFamily: "Roboto",
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  articleSummary: {
    fontFamily: "Roboto",
    marginBottom: 8,
    fontSize: 16,
  },
  statusLabel: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusLabelText: {
    color: "black",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default ArticleListScreen;
