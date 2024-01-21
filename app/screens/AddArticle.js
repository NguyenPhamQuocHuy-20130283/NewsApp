import React, { useState, useEffect, useRef } from "react";
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
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

export default function AddArticle({ route }) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [content, setContent] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = route.params;
  const navigation = useNavigation();
  const editorRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://newsapi-springboot-production.up.railway.app/api/category/getAll"
        );
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  const HandleAddArticle = async () => {
    try {
      setLoading(true);
      // Check if title and image are provided
      if (!title || !image || !selectedItem || !content) {
        console.log("Title, image, and category are required");
        Alert.alert(
          "Lỗi",
          "Không thể thêm bài viết với dữ liệu trống. Vui lòng kiểm tra lại."
        );
        setLoading(false);
        return;
      }

      // Get the userId from AsyncStorage

      if (!userId) {
        console.log("User is not authenticated");
        setLoading(false);
        return;
      }

      // Prepare the form data for the POST request
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("authorId", userId);
      formData.append("categoryId", selectedItem);
      const imageType = image.split(".").pop(); // Get the file extension

      formData.append("image", {
        uri: image,
        name: imageDescription || image.split("/").pop(), // Set the file name
        type: `image/${imageType}`, // Set the correct MIME type based on the file extension
      });
      console.log("Form Data:", formData);

      // Make the POST request to your API
      const response = await axios.post(
        "https://newsapi-springboot-production.up.railway.app/api/article/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Article added successfully:", response.data);
      setLoading(false);
      setTitle("");
      setContent("");
      setImageDescription("");
      Alert.alert("Thành công", "Bài viết đã được thêm thành công");
      // Redirect the user to the article list screen
      navigation.goBack();
      // Example: navigation.navigate("ArticleList");
    } catch (error) {
      setLoading(false);
      console.log(
        "Error adding article:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Lỗi", "Không thể thêm bài viết. Vui lòng kiểm tra lại.");
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

  const addArticle = async () => {
    // Perform logic to add article with title and image
    console.log("Title:", title);
    console.log("Image URI:", image);
    console.log("Selected category:", selectedItem);
    console.log("Content:", content);
    console.log("Image type:", image.split(".").pop());
    console.log("Image name:", image.split("/").pop());
    const userId = await AsyncStorage.getItem("userId");
    console.log("User id:", userId);
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
              <Text style={styles.label}>Mô tả ảnh</Text>
              <TextInput
                style={styles.input}
                value={imageDescription}
                onChangeText={(text) => setImageDescription(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nội dung</Text>
              <RichToolbar editor={editorRef} style={styles.richToolbar} />
              <RichEditor
                ref={editorRef}
                initialContentHTML={content}
                onChange={(html) => setContent(html)}
                initialHeight={100}
                style={styles.richEditor}
              />
            </View>

            <View style={styles.container}>
              <Text style={styles.label}>Chọn danh mục:</Text>
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
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.buttonText}>Thêm bài viết</Text>
              )}
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
  richEditor: {
    height: 400,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
  },

  richToolbar: {
    backgroundColor: "white",
    height: 50,
  },
});
