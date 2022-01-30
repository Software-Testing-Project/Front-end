import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Logo.png";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
  Image,
  Alert,
} from "react-native";
import Image_Inside from "./camera2";
import Camera_Module from "./Camera";
import p5 from "../assets/5.png";
import p6 from "../assets/6.png";
export default function Selector({ turnback, url, navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const [opencam, setcam] = useState(false);
  const [opencamera2, setcamera2] = useState(false);
  return (
    <View>
      <View>
        <Image source={logo} style={{ width: windowWidth, height: 300 }} />
      </View>
      <View>
        <Modal
          visible={opencam}
          animationType="slide"
          presentationStyle="fullScreen"
          style={styles.Modal}
          onRequestClose={() => {
            setcam(!opencam);
          }}
        >
          <Camera_Module turnback={setcam} url={url}></Camera_Module>
        </Modal>
      </View>
      <View>
        <Modal
          visible={opencamera2}
          animationType="slide"
          presentationStyle="fullScreen"
          style={styles.Modal}
          onRequestClose={() => {
            setcamera2(!opencamera2);
          }}
        >
          <Image_Inside turnback={setcamera2} url={url}></Image_Inside>
        </Modal>
      </View>
      <View style={{ flexDirection: "row", margin: 20 }}>
        <View style={{ margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Camera1")}>
            <Image source={p5} style={{ width: 90, height: 90 }} />
            <Text style={styles.btns}>Open camera</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 20, marginLeft: 50 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Camera2")}>
            <Image source={p6} style={{ width: 90, height: 90 }} />
            <Text style={styles.btns}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  btns: {
    fontWeight: "bold",
  },
});
