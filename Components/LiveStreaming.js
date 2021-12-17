import { WebView } from "react-native-webview";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";

export default function LiveStreaming({ turnback }) {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "http://192.168.137.40:5000/", baseUrl: "" }}
        style={{ flex: 0.5, height: 2 }}
      />
      <Button
        title="Back"
        onPress={() => {
          //setsaved(null);
          turnback(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
