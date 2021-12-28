import React, { useState, useEffect, useRef } from "react";
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

export default function Camera_Module({ turnback, url }) {
  url = url.concat("Postimages");
  const [hasPermission, setHasPermission] = useState(null);
  const [saved, setsaved] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const ref = useRef(null);
  const takePhoto = async () => {
    //console.log("Yes Yes");
    const photo = await ref.current.takePictureAsync({ base64: true });
    setsaved(photo.uri);

    let result = photo;
    if (result) {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: result.base64,
        }),
      }).then(console.log("YEsss posted"));
    }
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
      console.log("Yes");
      takePhoto();
    }
  };
  return (
    <View style={styles.container}>
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
      <View>
        <TouchableOpacity onPress={takePhoto} style={styles.savebtn}>
          <Text style={styles.text}>Save Pic</Text>
        </TouchableOpacity>
        {!saved ? (
          <Text>NO picture saved</Text>
        ) : (
          <Image source={{ uri: saved }} style={styles.camera} />
        )}
      </View>
      <Button
        title="Back"
        onPress={() => {
          setsaved(null);
          turnback(false);
        }}
      />
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
