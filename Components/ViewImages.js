import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import AppContext from "./AppContext";
import * as FileSystem from "expo-file-system";
export default function ViewImages({ navigation }) {
  const [saved_images, set_saved_Images] = useState(null);
  const stateRef = useRef().current;
  let counter = 0;
  const [isready, setready] = useState(false);
  useEffect(() => {
    set_saved_Images(global.all_images);
  }, []);

  const myContext = useContext(AppContext);
  let url = myContext.URL;
  url = url.concat("Postimages");
  const postImages_toserver = async (result) => {
    setready(true);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img: result,
      }),
    })
      .then()
      .catch();
  };
  const convert_to_base64 = async (e) => {
    return await FileSystem.readAsStringAsync(e, {
      encoding: "base64",
    });
  };
  const sendto_server = async () => {
    for (let i = 0; i < saved_images.length; i++) {
      convert_to_base64(saved_images[i].uri).then((base64) => {
        postImages_toserver(base64)
          .then(() => {
            console.log("Sendong");
          })
          .catch(() => {});
      });
    }
  };
  const sendto_server_wrapper = async () => {
    if (saved_images.length > 0) {
      const get_res = await sendto_server();
      const folder = await MediaLibrary.getAlbumAsync("UploadImages123", {
        includeSmartAlbums: true,
      });
      console.log(folder);
      const response = await MediaLibrary.deleteAlbumsAsync(folder.id);
      Alert.alert("Upload complete", "All images are uploadded", [
        {
          text: "OK",
          onPress: () => navigation.navigate("New Person1"),
          style: "ok",
        },
      ]);
      setready(false);
    } else {
      const folder = await MediaLibrary.getAlbumAsync("UploadImages123", {
        includeSmartAlbums: true,
      });
      console.log(folder);
      const response = await MediaLibrary.deleteAlbumsAsync(folder.id);
      Alert.alert("Upload Unsuccessfull", "No images exist", [
        {
          text: "OK",
          onPress: () => navigation.navigate("New Person1"),
          style: "ok",
        },
      ]);
      console.log("No images");
    }
  };
  const removeImage = (id) => {
    let arr = saved_images;
    arr = arr.filter((item) => item.id != id);
    set_saved_Images(arr);
    console.log(saved_images.length, "saved");
    console.log("DOne");
  };
  return (
    <View>
      <View>
        <Button title="Send" onPress={sendto_server_wrapper} />
      </View>
      {isready ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View></View>
      )}
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={saved_images}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              removeImage(item.id);
            }}
          >
            <Image
              source={{ uri: item.uri, isStatic: true }}
              /* Use item to set the image source */
              key={item.id} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
              style={{
                width: 100,
                height: 150,
                borderWidth: 2,
                borderColor: "#d35647",
                resizeMode: "contain",
                margin: 8,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
