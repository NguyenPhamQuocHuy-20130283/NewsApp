import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import ListHome from "../list/ListHome";
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('TimKiem');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDiv}>
          <Text style={styles.headerText}>Tin Tức</Text>
          <Text style={styles.headerTextSmall}>
            Khám phá tin tức trên thế giới
          </Text>
        </View>
        <View style={styles.search}>
          <TouchableOpacity onPress={handleSearchPress}>
            <Image
              source={require("../../assets/search.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.bodyBig}> 
          <View style={styles.bodyDiv}>
            <Image
              source={require("../../assets/anhBia1.png")}
              style={styles.pictureCredit}
            />
            <View style={styles.textContainer}>
              <Text style={styles.newsTitle} numberOfLines={2} ellipsizeMode="tail">
                Chốt thi tốt nghiệp THPT 2025 hai môn bắt buộc
              </Text>
              <View style={styles.newsTitleSmall}>
                <Text style={styles.newsCategorySmall}>Giáo dục</Text>
                <Text style={styles.newSimpleSmall}> - </Text>
                <Text style={styles.newsDateSmall}>29/11/2023</Text>
              </View>
            </View>
          </View>
          <ListHome/>
        </View> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    borderBottomColor: "#6941DE",
    borderBottomWidth: 2,
  },

  // Header
  header: {
    height: 80,
    width: "100%",
    backgroundColor: "#fff",
    borderBottomColor: "#6941DE",
    borderBottomWidth: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 18,
    marginTop: 40,
  },

  headerDiv: {
    marginLeft: 25,
  },

  headerText: {
    fontSize: 25,
    fontWeight: "900",
  },

  headerTextSmall: {
    fontSize: 12,
    paddingLeft: 3,
    fontWeight: "300",
  },

  // Nút tìm kiếm
  search: {
    display: "flex",
  },

  searchIcon: {
    width: 35,
    height: 35,
    marginLeft: 15,
  },

  // Body
  body: {
    flex: 1,
    height: "100%",
    marginTop: 0,
    backgroundColor: "#fff",
  },

  bodyBig: {
    marginRight: 12,
    marginLeft: 12,
  },
  
  // Body ảnh bìa
  bodyDiv: {
    maxHeight: 220,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10 ,
    borderColor: "black",
  },

  pictureCredit: {
    width: "100%",
    height: "100%",
  },

  // Chữ trên ảnh bìa
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  
  newsTitleSmall: {
    flexDirection: "row",
  },

  newsCategorySmall: {
    fontSize: 14,
    color: 'white',
  },

  newsDateSmall: {
    fontSize: 14,
    color: 'white',
  },

  newSimpleSmall: {
    fontSize: 14,
    color: 'white',
  },
});

export default Home;
