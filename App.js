// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Image } from "react-native";
import HienThi from "./app/screens/user/HienThi";
import TimKiem from "./app/screens/user/TimKiem";
import LichSu from "./app/screens/user/LichSu";
import Home from "./app/screens/user/Home";
import TaiKhoan from "./app/screens/user/TaiKhoan";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TimKiemStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TimKiem"
      component={TimKiem}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="HienThi"
      component={HienThi}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#6941DE",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./app/assets/home.png")} // Đường dẫn đến ảnh trong thư mục assets
                style={{ width: 30, height: 30, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TimKiem"
          component={TimKiemStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./app/assets/grid_view.png")} // Đường dẫn đến ảnh trong thư mục assets
                style={{ width: 28, height: 28, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="LichSu"
          component={LichSu}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./app/assets/history.png")} // Đường dẫn đến ảnh trong thư mục assets
                style={{ width: 28, height: 28, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TaiKhoan"
          component={TaiKhoan}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./app/assets/account_box.png")} // Đường dẫn đến ảnh trong thư mục assets
                style={{ width: 28, height: 28, tintColor: color }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
