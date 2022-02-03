import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
} from "react-native";
import AppContext from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Try() {
  const storeData = async (value) => {
    await AsyncStorage.setItem("@storage_Key", value);
  };
  const myContext = useContext(AppContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            myContext.settempURL(e);
            storeData(e);
            myContext.setURL("http://" + e + ":5000/");
            console.log("YEss", myContext.URL);
          }}
          value={myContext.tempURL}
          placeholder="URL"
          keyboardType="phone-pad"
        />
        <Text style={styles.headerText}>Change Ip address</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 4,
    margin: 5,
  },
});
