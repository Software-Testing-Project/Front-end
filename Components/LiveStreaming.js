import { WebView } from "react-native-webview";
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

export default function LiveStreaming({ turnback }) {
  const myContext = useContext(AppContext);

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: myContext.URL, baseUrl: "" }}
        style={{ flex: 0.5, height: 2 }}
      />
      {/* <Button
        title="Back"
        onPress={() => {
          //setsaved(null);
          turnback(false);
        }}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
