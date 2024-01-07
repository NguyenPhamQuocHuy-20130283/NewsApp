import React, { useState } from "react";
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const ArticleListScreen = () => {
  const [activeTab, setActiveTab] = useState("all"); // "all", "pending", "published", "rejected"
  const [searchText, setSearchText] = useState("");

  const articles = [
    {
      id: 1,
      title: "Bài viết 1",
      summary: "Tóm tắt bài viết 1",
      status: "pending",
      image: require("../assets/add_news.png"), // replace with actual image source
    },
    {
      id: 2,
      title: "Bài viết 2",
      summary: "Tóm tắt bài viết 1",
      status: "published",
      image: require("../assets/add_news.png"), // replace with actual image source
    },
    {
      id: 3,
      title: "Bài viết 2",
      summary: "Tóm tắt bài viết 1",
      status: "rejected",
      image: require("../assets/add_news.png"), // replace with actual image source
    },
    {
      id: 4,
      title: "Bài viết 2",
      summary: "Tóm tắt bài viết 1",
      status: "",
      image: require("../assets/add_news.png"), // replace with actual image source
    },
    // Add more articles as needed
  ];

  const renderArticle = (article) => {
    const statusColor = getStatusColor(article.status);

    return (
      <View
        key={article.id}
        style={[styles.articleContainer, { backgroundColor: statusColor }]}
      >
        <Image source={article.image} style={styles.articleImage} />
        <View style={styles.articleDetails}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleSummary}>{article.summary}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabelText}>
              {getStatusText(article.status)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#F9FFB4"; // yellow
      case "published":
        return "#D6FFE4"; // green
      case "rejected":
        return "#FFD6D6"; // red
      default:
        return "#F0F0F0"; // black (default color)
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ duyệt";
      case "published":
        return "Đã duyệt";
      case "rejected":
        return "Không duyệt";
      default:
        return "Không xác định";
    }
  };

  return (
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
            style={[styles.tab, activeTab === "pending" && styles.activeTab]}
            onPress={() => setActiveTab("pending")}
          >
            Chờ duyệt
          </Text>
          <Text
            style={[styles.tab, activeTab === "published" && styles.activeTab]}
            onPress={() => setActiveTab("published")}
          >
            Đã duyệt
          </Text>
          <Text
            style={[styles.tab, activeTab === "rejected" && styles.activeTab]}
            onPress={() => setActiveTab("rejected")}
          >
            Không duyệt
          </Text>
        </View>
      </View>

      {/* Article List */}
      <ScrollView style={styles.articleList}>
        {articles
          .filter(
            (article) =>
              (activeTab === "all" || article.status === activeTab) &&
              (searchText.trim() === "" ||
                article.title.toLowerCase().includes(searchText.toLowerCase()))
          )
          .map((article) => renderArticle(article))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  statusContainer: {
    flex: 1,
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
  },
  articleImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  articleDetails: {
    flex: 1,
    fontFamily: "Roboto",
    fontSize: 16,
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
    fontFamily: "Roboto",
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
