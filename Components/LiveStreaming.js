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
  ActivityIndicator,
} from "react-native";

export default function LiveStreaming({ turnback }) {
  const [visible, setVisible] = useState(false);
  const myContext = useContext(AppContext);
  console.log(myContext.URL);
  const handle_error = () => {
    return (
      <View>
        <ActivityIndicator
          animating={true}
          color="#84888d"
          size="large"
          hidesWhenStopped={true}
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
            flex: 1,
          }}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: myContext.URL + "a", baseUrl: "" }}
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
