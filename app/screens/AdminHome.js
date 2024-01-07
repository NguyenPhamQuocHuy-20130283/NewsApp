// Trong AdminHome.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const AdminHome = () => {
  const navigation = useNavigation();

  const handleAddArticle = () => {
    // Chuyển hướng sang trang AddArticle
    navigation.navigate("AddArticle");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Content */}
        <View style={styles.content}>
          {/* Section 1: Tiện ích nhà báo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tiện ích nhà báo</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleAddArticle}
              >
                {/* <Icon name="newspaper-o" size={50} /> */}
                <Image source={require("../assets/add_news.png")} />
                <Text style={styles.button_text}>Thêm bài viết</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  // Xử lý khi nhấn vào nút tiện ích nhà báo
                  navigation.navigate("ArticleListScreen");
                }}
              >
                <Image source={require("../assets/list_news.png")} />
                <Text style={styles.button_text}>Bài viết của tôi</Text>
              </TouchableOpacity>
            </View>
            {/* Thêm các nút khác tương tự nếu cần */}
          </View>

          {/* Section 2: Tiện ích quản trị viên */}
          <View style={(styles.section, styles.sectionAdmin)}>
            <Text style={styles.sectionTitle}>Tiện ích quản trị viên</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button_1item}
                onPress={() => {
                  // Xử lý khi nhấn vào nút quản lý bài viết
                }}
              >
                <Image source={require("../assets/list_news.png")} />
                <Text style={styles.button_text}>Bài viết của tôi</Text>
              </TouchableOpacity>
            </View>
            {/* Thêm các nút khác tương tự nếu cần */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#6941DE",
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
  },
  sectionAdmin: {
    flex: 1, // Thay đổi giá trị flex tùy thuộc vào cảm giác của bạn
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#E5E7FF",
    padding: 30,
    flex: 1, // Để mỗi nút chiếm đủ không gian
    marginHorizontal: 10, // Khoảng trống giữa hai nút
  },
  button_1item: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#E5E7FF",
    padding: 30,
  },
  button_text: {
    fontWeight: "bold",
    color: "#6941DE",
    fontSize: 17,
    marginTop: 10,
  },
});

export default AdminHome;
