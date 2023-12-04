// Trong App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Admin from "./app/screens/Admin";
import AdminHome from "./app/screens/AdminHome";
import AddArticle from "./app/screens/AddArticle";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";

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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Xử lý khi nhấn vào icon (ví dụ: mở menu quản trị viên)
              }}
            >
              <Icon
                name="bars"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
          headerTitle: null, // Ẩn tiêu đề
        }}
      >
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{
            headerShown: false, // Ẩn header của Admin
          }}
        />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="AddArticle" component={AddArticle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
