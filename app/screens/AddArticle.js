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
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from "react-native-dropdown-select-list";
import { Input } from "@rneui/themed/dist/Input";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddArticle() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://newsapi-springboot-production.up.railway.app/api/category/getAll"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  const HandleAddArticle = async () => {
    try {
      // Check if title and image are provided
      if (!title || !image) {
        console.error("Title and image are required");
        return;
      }

      // Get the userId from AsyncStorage
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        console.error("User is not authenticated");
        return;
      }

      // Make the POST request to get user information
      const userResponse = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/admin/getUserInfo",
        {
          id: userId,
        }
      );

      const user = userResponse.data;

      // Prepare the form data for the POST request
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", {
        uri: image,
        name: image.split("/").pop(),
        type: image.split(".").pop(),
      });
      formData.append("description", description);
      formData.append("content", content);
      formData.append("categoryId", selectedItem.key);

      // Add author information to the form data
      formData.append("author[id]", user.id);
      formData.append("author[name]", user.name);
      formData.append("author[email]", user.email);
      formData.append("author[phone]", user.phone);
      formData.append("author[role]", user.role);

      // Make the POST request to your API
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/admin/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Article added successfully:", response.data);

      // Reset state after adding article
      setTitle("");
      setImage(null);
      setSelectedItem(null);

      // Optionally, navigate to a different screen or perform other actions after adding the article
      // Example: navigation.navigate("ArticleList");
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

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
    console.log("Selected category:", selectedItem);
    console.log("Description:", description);
    console.log("Content:", content);

    // Reset state after adding article
    setTitle("");
    setImage(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <Input
                style={styles.input}
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nội dung</Text>
              <TextInput
                style={styles.input_big}
                multiline={true}
                numberOfLines={30}
                value={content}
                onChangeText={(text) => setContent(text)}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Select an Item:</Text>
              <SelectList
                data={categories.map((category) => ({
                  key: category.id.toString(),
                  value: category.name,
                }))}
                setSelected={setSelectedItem}
                style={styles.dropdownContainer}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={HandleAddArticle}>
              <Text style={styles.buttonText}>Thêm bài viết</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 20,
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
    width: "100%",
    marginTop: 8,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ced4da",
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownDropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ced4da",
  },
});
