import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";

export default function Camera_Module({ turnback }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const ref = useRef(null);
  const takePhoto = async () => {
    const photo = await ref.current.takePictureAsync();
    console.log(photo);
  };
  return (
    <View style={styles.container}>
      <Camera type={type} style={styles.camera} ratio="16:9" ref={ref}></Camera>
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
      </View>
      <Button
        title="Back"
        onPress={() => {
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
