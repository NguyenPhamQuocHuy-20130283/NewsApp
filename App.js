import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Admin from "./app/screens/Admin";
import AdminHome from "./app/screens/AdminHome";
import AddArticle from "./app/screens/AddArticle";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";

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
          style: {
            alignItems: 'center',
          },
          
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
                style={{
                  width: 30,
                  height: 30,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TimKiem"
          component={TimKiemStack}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./app/assets/grid_view.png")} // Đường dẫn đến ảnh trong thư mục assets
                style={{
                  width: 30,
                  height: 30,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="LichSu"
          component={LichSu}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./app/assets/history.png")} // Đường dẫn đến ảnh trong thư mục assets
                style={{
                  width: 30,
                  height: 30,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./app/assets/account_box.png")} // Đường dẫn đến ảnh trong thư mục assets
                style={{
                  width: 30,
                  height: 30,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Stack.Screen name="AddArticle" component={AddArticle} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
};

export default App;