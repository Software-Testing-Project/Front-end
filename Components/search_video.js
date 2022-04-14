import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [videoUrl, setVideoUrl] = useState(
    "http://192.168.10.11:5000/video_stored/08042022-224243.mp4"
  );

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        useNativeControls
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: width,
    height: height / 3,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
