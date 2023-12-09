import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDiv}>
          <Text style={styles.headerText}>Tin Tức</Text>
          <Text style={styles.headerTextSmall}>
            Khám phá tin tức trên thế giới
          </Text>
        </View>
      </View>
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

  header: {
    height: 80,
    width: "100%",
    marginTop: 40,
    backgroundColor: "#2dc0e8",
    borderBottomColor: "#6941DE",
    borderBottomWidth: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerDiv: {
    marginLeft: 15,
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
});

export default Home;
