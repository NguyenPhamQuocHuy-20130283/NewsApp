import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "@rneui/themed/dist/Input";

export default function AddArticle() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const categories = [
    { label: "Thể loại 1", value: "category1" },
    { label: "Thể loại 2", value: "category2" },
    // Thêm các thể loại khác nếu cần
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addArticle = () => {
    // Perform logic to add article with title and image
    console.log("Title:", title);
    console.log("Image URI:", image);
    // Reset state after adding article
    setTitle("");
    setImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tiêu đề</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity style={styles.button_image} onPress={pickImage}>
              <Text style={styles.buttonText}>Chọn ảnh</Text>
            </TouchableOpacity>
            {image && (
              <Image source={{ uri: image }} style={styles.selectedImage} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mô tả</Text>
            <Input style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nội dung</Text>
            <TextInput
              style={styles.input_big}
              multiline={true}
              numberOfLines={30}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Thể loại</Text>
            <DropDownPicker
              items={categories}
              placeholder="Chọn thể loại"
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              itemStyle={styles.dropdownItem}
              dropDownStyle={styles.dropdownDropdown}
              onChangeItem={(item) => setCategory(item.value)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={addArticle}>
            <Text style={styles.buttonText}>Thêm bài viết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Đảm bảo ScrollView có thể mở rộng khi nội dung lớn hơn màn hình
  },
  container: {
    flex: 1,
    fontFamily: "Inter-Bold",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "white",
    padding: 25,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  imagePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Chỉnh căn lề về phía bên phải
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 45,
    borderColor: "white",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  input_big: {
    height: 200,
    borderColor: "white",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#6941DE",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginBottom: 10,
  },
  button_image: {
    backgroundColor: "#6941DE",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "30%",
    alignSelf: "center",
    marginBottom: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  selectedImage: {
    width: 170,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownDropdown: {
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
  },
});
