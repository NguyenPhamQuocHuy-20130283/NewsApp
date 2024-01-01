import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const categoriesData = [
  { id: '1', title: 'Thời sự', color: '#6941DE' },
  { id: '2', title: 'Đời sống', color: '#E5E7FF' },
  { id: '3', title: 'Giáo dục', color: '#E5E7FF' },
  { id: '4', title: 'Thể thao', color: '#6941DE' },
  { id: '5', title: 'Giải trí', color: '#6941DE' },
  { id: '6', title: 'Du lịch', color: '#E5E7FF' },
  { id: '7', title: 'Khoa học', color: '#E5E7FF' },
  { id: '8', title: 'Ẩm thực', color: '#6941DE' },
  { id: '5', title: 'Giải trí', color: '#6941DE' },
  { id: '6', title: 'Du lịch', color: '#E5E7FF' },
  { id: '7', title: 'Khoa học', color: '#E5E7FF' },
  { id: '8', title: 'Ẩm thực', color: '#6941DE' },

  // Thêm các danh mục khác nếu cần
];

export default function TimKiem({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const onFocusSearch = () => {
      setIsSearchFocused(true);
    };
  
    const onBlurSearch = () => {
      setIsSearchFocused(true);
    };
  
    const handleSearch = () => {
      console.log('Đang tìm kiếm:', searchText);
      // Thêm logic tìm kiếm của bạn ở đây nếu cần
  
      // Chuyển đến trang HienThi
      navigation.navigate('HienThi');
    };
  
    const renderCategoryItem = ({ item }) => (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: item.color, borderColor: selectedCategory === item.id ? '#fff' : 'transparent' },
        ]}
        onPress={() => handleCategoryPress(item)}
      >
        <Text style={[styles.categoryItemText, { color: item.color === '#E5E7FF' ? 'black' : 'white' }]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  
    const handleCategoryPress = (category) => {
      console.log('Clicked on category:', category.title);
      // Add your logic for handling category click here
      // You may want to navigate to a new screen or perform other actions
      setSelectedCategory(category.id);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.danhmuc}>
          <Text style={styles.danhMucText}>DANH MỤC</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm bài viết"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={onFocusSearch}
            onBlur={onBlurSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <AntDesign name="search1" size={15} color="white" />
          </TouchableOpacity>
        </View>
        {isSearchFocused && (
          <FlatList
            data={categoriesData}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.categoriesContainer}
          />
        )}
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 5,
    marginVertical: 16,
    marginHorizontal: 20
  },
  input: {
    flex: 1,
    height: 40,
   
  },
  searchButton: {
    backgroundColor: '#6941DE',
    borderRadius: 8,
    marginRight: 10,
    padding: 8,
  },
  danhmuc: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#6941DE', // Màu tím
    padding: 16, // Khoảng cách giữa "DANH MỤC" và phần dưới
  },
  danhMucText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  categoryItem: {
    height: 130,
    flex: 1,
    borderRadius: 8,
    padding: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  categoryItemText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
