// Trong App.js
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Admin from "./app/screens/Admin";
import AdminHome from "./app/screens/AdminHome";
import AddArticle from "./app/screens/AddArticle";
import Admin_Register from "./app/screens/Admin_Register";
import ArticleListScreen from "./app/screens/ArticleListScreen";
import ArticleDetailScreen from "./app/screens/ArticleDetailScreen";
import PasswordChangeScreen from "./app/screens/PasswordChangeScreen";

import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Admin"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6941DE", // Màu nền của header
          },
          headerTintColor: "white", // Màu chữ trong header

          headerTitleAlign: "center", // Căn giữa tiêu đề trong header
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Admin_Register"
          component={Admin_Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{
            title: "Trang quản trị viên",
            headerShown: true,
            headerLeft: ({ navigation }) => (
              (navigation = useNavigation()),
              (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Đăng xuất",
                      "Bạn có chắc chắn muốn đăng xuất?",
                      [
                        {
                          text: "Hủy",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Đăng xuất",
                          onPress: () => {
                            // Use navigation object here
                            navigation.navigate("Admin");
                            console.log("OK");
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <Icon
                    name="sign-out"
                    size={30}
                    color="white"
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              )
            ),
            headerRight: ({ navigation }) => (
              (navigation = useNavigation()),
              (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Chọn hành động",
                      "Chọn một trong những tùy chọn sau:",
                      [
                        {
                          text: "Đổi mật khẩu",
                          onPress: () => {
                            // Handle the "Đổi mật khẩu" action
                            console.log("Đổi mật khẩu");
                            navigation.navigate("ChangePassword");
                          },
                        },
                        {
                          text: "Đăng xuất",
                          onPress: () => {
                            // Handle the "Đăng xuất" action
                            navigation.navigate("Admin");
                            console.log("Đăng xuất");
                          },
                        },
                        {
                          text: "Hủy",
                          onPress: () => console.log("Hủy"),
                          style: "cancel",
                        },
                      ],
                      { cancelable: true }
                    );
                  }}
                >
                  <Icon
                    name="bars"
                    size={30}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              )
            ),
          }}
        />
        <Stack.Screen
          name="AddArticle"
          component={AddArticle}
          options={{
            title: "Thêm bài viết",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ArticleListScreen"
          component={ArticleListScreen}
          options={{
            title: "Danh sách bài viết của tôi",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ArticleDetailScreen"
          component={ArticleDetailScreen}
          options={{
            title: "Chi tiết bài viết",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={PasswordChangeScreen}
          options={{
            title: "Đổi mật khẩu",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
