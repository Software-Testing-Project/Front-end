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
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});
export default function App() {
  useEffect(() => {
    async function fetchURL() {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // value previously stored
        console.log("Vleu present");
        settempURL(value);
        setURL("http://" + value + ":5000/");
      }
      // error reading value
      else {
        console.log("Vleu mot present");
      }
    }

    fetchURL();
  }, []);
  // useEffect(() => {
  //   Notifications.getExpoPushTokenAsync().then((response) => {
  //     setPushToken(response.data);
  //   });
  // });

  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        console.log(notification); // passs the screen name in data and then navigate ot send http request
      });

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });
    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);
  firebase_app;
  const [tempURL, settempURL] = useState("39.45.32.51");
  const [URL, setURL] = useState("http://" + tempURL + ":5000/");
  const [issignedin, setsignedin] = useState(false);
  const [pushToken, setPushToken] = useState(null);
  const userSettings = {
    URL: URL,
    tempURL: tempURL,
    settempURL,
    setURL,
    issignedin,
    setsignedin,
  };
  const Trigeer_Notification = () => {
    //In app local notifications
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "My first Notification",
    //     body: "THis is my first notifcation in expo",
    //   },
    //   trigger: {
    //     seconds: 5,
    //   },
    // });
    //For Push notifications
    // fetch("https://exp.host/--/api/v2/push/send", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Accept-Encoding": "gzip,deflate ",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     to: pushToken,
    //     title: "From inside push notification",
    //   }),
    // });
  };

  console.log(userSettings);
  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AppContext.Provider>
  );
}
