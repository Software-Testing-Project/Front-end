import React, { useState, useEffect, useRef, useContext } from "react";
import AppContext from "./AppContext";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import * as FaceDetector from "expo-face-detector";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { Badge } from "react-native-paper";
const windowWidth = Dimensions.get("window").width - 20;
const windowHeight = Math.round((windowWidth * 4) / 3);

export default function Camera_Module({ turnback, url, navigation }) {
  const myContext = useContext(AppContext);
  url = myContext.URL.concat("Postimages");
  const [hasPermission, setHasPermission] = useState(null);
  const [saved, setsaved] = useState(null);
  const [counter, setcount] = useState(0);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [images, setimages] = useState({});
  const ref = useRef(null);

  const hande_save = async (photo) => {
    const assert = await MediaLibrary.createAssetAsync(photo);
    MediaLibrary.createAlbumAsync("UploadImages123", assert).then(
      console.log("Picture clicked")
    );
  };

  const takePhoto = async () => {
    if (counter < 3) {
      const photo = await ref.current.takePictureAsync({ base64: true });
      setsaved(photo.uri);
      hande_save(photo.uri);
      setcount(counter + 1);
    } else {
      view_photos();
    }

    //console.log(images.length);
  };
  const view_photos = async () => {
    console.log("called");
    const folder = await MediaLibrary.getAlbumAsync("UploadImages123", {
      includeSmartAlbums: true,
    });

    const response = await MediaLibrary.getAssetsAsync({ album: folder });
    // console.log(response.assets[0]);
    console.log(response.assets.length);
    global.all_images = response.assets;
    navigation.navigate("ViewImages1");
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  useEffect(() => {
    MediaLibrary.requestPermissionsAsync();
  }, []);
  const hanldeface = ({ faces }) => {
    //console.log(faces);
    if (faces.length > 0) {
      // console.log("Yes");
      takePhoto();
    }
  };
  return (
    <View style={styles.container}>
      <Badge size={30} style={{ backgroundColor: "black" }}>
        {counter}
      </Badge>
      {counter < 4 ? (
        <View>
          <Camera
            type={type}
            style={styles.camera}
            ratio="4:3"
            ref={ref}
            onFacesDetected={hanldeface}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.accurate,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 3000,
              tracking: true,
            }}
          ></Camera>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="camera-reverse-sharp" size={50} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 32 }}>Flip</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  camera: {
    width: windowWidth,
    height: windowHeight,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  savebtn: {
    backgroundColor: "red",
    padding: 5,
    margin: 5,
    color: "white",
  },
});
