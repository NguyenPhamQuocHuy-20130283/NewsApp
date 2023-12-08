import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HienThi({ navigation }) {
  const handleGoBack = () => {
    console.log('Nút quay lại được nhấn');
    navigation.goBack();
  };

  const handleItemClick = () => {
    console.log('Mục được nhấp vào');
  };

  return (
    <View style={styles.container}>
      {/* Phần Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require('../user/Vector.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Nhập từ khóa để tìm kiếm"
        />
      </View>

      {/* Danh sách Kết quả */}
      <FlatList
        style={styles.resultsContainer}
        data={[
          { id: '1', title: 'Tiêu đề bài báo 1', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWK-U_BNyjsjmgGs9iQ_4KeeVHwhiCk18TA&usqp=CAU' },
          { id: '2', title: 'Tiêu đề bài báo 2', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Ukkyml_8MU4Ogmz87-ewjhXKB47nVv3VNA&usqp=CAU' },
          { id: '3', title: 'Tiêu đề bài báo 3', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJznMaDtgrRc1hXSb577HXXDxYbF8tpaZgKw&usqp=CAU' },
          { id: '4', title: 'Tiêu đề bài báo 4', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWK-U_BNyjsjmgGs9iQ_4KeeVHwhiCk18TA&usqp=CAU' },
          { id: '5', title: 'Tiêu đề bài báo 5', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Ukkyml_8MU4Ogmz87-ewjhXKB47nVv3VNA&usqp=CAU' },
          { id: '6', title: 'Tiêu đề bài báo 6', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJznMaDtgrRc1hXSb577HXXDxYbF8tpaZgKw&usqp=CAU' },
          { id: '7', title: 'Tiêu đề bài báo 4', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWK-U_BNyjsjmgGs9iQ_4KeeVHwhiCk18TA&usqp=CAU' },
          { id: '8', title: 'Tiêu đề bài báo 5', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Ukkyml_8MU4Ogmz87-ewjhXKB47nVv3VNA&usqp=CAU' },
          { id: '9', title: 'Tiêu đề bài báo 6', category: 'Pháp luật', date: 'Ngày/Tháng/Năm', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJznMaDtgrRc1hXSb577HXXDxYbF8tpaZgKw&usqp=CAU' },
          // Add more data items as needed
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleItemClick}>
            <View style={styles.resultItem}>
              <Image source={{ uri: item.imageUri }} style={styles.resultImage} />
              <View style={styles.itemContent}>
                <View style={styles.resultContent}>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                </View>
                <View style={styles.bottomContent}>
                  <Text style={styles.resultCategory}>{item.category}</Text>
                  <Text style={styles.resultDate}>{item.date}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24, // Để tránh bị che phủ bởi StatusBar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#6941DE',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  
    padding: 8,
    backgroundColor:'#F0F0F0'
  },
  resultsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  resultItem: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderColor: '#6941DE',
    borderWidth: 1,
    borderRadius: 8,
  },
  resultImage: {
    width: 130,
    height: 90,
    margin: 5,
    borderRadius: 8,
  },
  resultContent: {
    flex: 1,
    marginTop: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCategory: {
    fontSize: 12,
    color: 'gray',
  },
  resultDate: {
    fontSize: 12,
    color: 'gray',
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginEnd: 5,
    marginVertical: 5,
  },
  backButtonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
