import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("News");

  // Xử lý chọn ảnh từ thiết bị hoặc chụp ảnh mới
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Xử lý gửi bài báo
  const submitArticle = () => {
    // Đưa logic xử lý gửi bài báo ở đây
    console.log("Title:", title);
    console.log("Image:", image);
    console.log("Image Description:", imageDescription);
    console.log("Content:", content);
    console.log("Category:", category);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề bài báo"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Chọn ảnh</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TextInput
        style={styles.input}
        placeholder="Mô tả ảnh"
        onChangeText={(text) => setImageDescription(text)}
        value={imageDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Nội dung bài báo"
        multiline
        onChangeText={(text) => setContent(text)}
        value={content}
      />

      <RNPickerSelect
        value={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        items={[
          { label: "Thời sự", value: "News" },
          { label: "Giải trí", value: "Entertainment" },
          // Add other categories
        ]}
        style={pickerSelectStyles}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitArticle}>
        <Text style={styles.buttonText}>Gửi bài báo</Text>
      </TouchableOpacity>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  imagePickerButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 20,
  },
  picker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddArticle;
