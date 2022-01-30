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
    }

    //console.log(images.length);
  };
  const view_photos = async () => {
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

  const hanldeface = ({ faces }) => {
    //console.log(faces);
    if (faces.length > 0) {
      // console.log("Yes");
      takePhoto();
    }
  };
  return (
    <View style={styles.container}>
      {counter < 3 ? (
        <View>
          <Camera
            type={type}
            style={styles.camera}
            ratio="16:9"
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
          <Button
            title="Flip"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </View>
      ) : (
        <Button title="View Photos" onPress={view_photos} />
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
    width: 200,
    height: 300,
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
