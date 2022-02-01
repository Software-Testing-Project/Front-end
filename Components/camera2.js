import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
export default function Image_Inside({ url, navigation }) {
  const myContext = useContext(AppContext);

  url = myContext.URL.concat("Postimages");
  console.log(url);
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  useEffect(() => {
    pickImage();
  }, []);
  useEffect(() => {
    Alert.alert(
      "Upload complete",
      "All images are uploadded",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("New Person1"),
          style: "ok",
        },
      ],
      [image]
    );
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.uri);

    if (!result.cancelled) {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: result.base64,
        }),
      }).then(setImage(result.uri));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <View>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
      )}
    </View>
  );
}
