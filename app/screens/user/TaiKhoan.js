// Home.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaiKhoan = () => {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaiKhoan;
