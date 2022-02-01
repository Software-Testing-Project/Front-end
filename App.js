import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Modal,
} from "react-native";

import AppContext from "./Components/AppContext";
import Speech from "./Components/voice";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./Navigation/DrawerNavigator";
import { MainStackNavigator } from "./Navigation/Navigotr";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { firebase_app } from "./firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    async function fetchURL() {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // value previously stored
        console.log("Vleu present");
        settempURL(value);
      }
      // error reading value
      else {
        console.log("Vleu mot present");
      }
    }

    fetchURL();
  }, []);

  firebase_app;
  const [tempURL, settempURL] = useState("39.45.32.51");
  const [URL, setURL] = useState("http://" + tempURL + ":5000/");
  const [issignedin, setsignedin] = useState(false);
  const userSettings = {
    URL: URL,
    tempURL: tempURL,
    settempURL,
    setURL,
    issignedin,
    setsignedin,
  };

  const Drawer = createDrawerNavigator();
  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AppContext.Provider>
  );
}
