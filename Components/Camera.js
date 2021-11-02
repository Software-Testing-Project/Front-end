import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";

export default function Camera_Module() {
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
        <TouchableOpacity onPress={takePhoto}>
          <Text>Click Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    color: "white",
  },
});
