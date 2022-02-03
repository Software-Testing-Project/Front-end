import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import * as Notifications from "expo-notifications";
export default function Notification_Subscribe() {
  useEffect(() => {
    Notifications.getExpoPushTokenAsync().then((response) => {
      setPushToken(response.data);
    });
  }, []);
  const myContext = useContext(AppContext);
  const [pushToken, setPushToken] = useState(null);
  const [isready, setready] = useState(false);
  const Trigeer_Notification = async () => {
    setready(true);
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
    let URL = myContext.URL + "subscribe";
    console.log(URL);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: pushToken,
        }),
      });
      const json = await response.json();
      if (json.result === "OK") {
        setready(false);
        Alert.alert(
          "Successfully Subscribed",
          "You have sucessfully subscried to the notifications",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
      } else {
        setready(false);
        Alert.alert(
          "UnSuccessful ",
          "You have alread subscribed to notifications",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
      }
    } catch (e) {
      setready(false);
      // console.log(e);
      Alert.alert("No network ", "Server is currently unavailable", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      {isready ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View></View>
      )}
      <Button title="Subscribe" onPress={Trigeer_Notification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
