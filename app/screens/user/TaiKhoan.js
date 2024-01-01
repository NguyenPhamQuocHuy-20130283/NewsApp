import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";

const TaiKhoan = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Admin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDiv}>
          <Text style={styles.headerText}>Thông Tin Tài Khoản</Text>
        </View>
      </View>
      <View style={styles.body}>  
        <View style={styles.bodyDiv}>  
          <TouchableOpacity
            style={styles.button1}
            onPress={handleLoginPress}>
            <Text style={styles.buttonText1}>Đăng Nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => console.log('Đăng Ký')}>
            <Text style={styles.buttonText2}>Đăng Ký</Text>
          </TouchableOpacity> 
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    borderBottomColor: "#6941DE",
    borderBottomWidth: 2,
    marginTop: 40,
  },

  // Header
  header: {
    height: 70,
    width: "100%",
    backgroundColor: "#fff",
    borderBottomColor: "#6941DE",
    borderBottomWidth: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 18,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "700",
  },

  // Body
  body: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },

  // Button Đăng Nhập
  button1: {
    height: 50,
    width: 250,
    backgroundColor: "#6941DE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
  },

  buttonText1: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },

  // Button Đăng Ký
  button2: {
    height: 50,
    width: 250,
    backgroundColor: "#6941DE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
  },

  buttonText2: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },

})

export default TaiKhoan;