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
import { Ionicons } from "@expo/vector-icons";
export default function Selector({ turnback, url, navigation }) {
  const windowWidth = Dimensions.get("window").width;

  return (
    <View>
      <View>
        <Image source={logo} style={{ width: windowWidth, height: 300 }} />
      </View>

      <View style={{ flexDirection: "row", margin: 20 }}>
        <View style={{ margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Camera1")}>
            <Ionicons name="camera-outline" size={90} color="black" />
            <Text style={styles.btns}>Open camera</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 20, marginLeft: 50 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Camera2")}>
            <Ionicons name="images-outline" size={90} color="black" />
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
