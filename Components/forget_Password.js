import React, { useState, useEffect, useRef, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import AppContext from "./AppContext";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AppLoading from "expo-app-loading";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default function forget_Password({ navigation }) {
  console.log(getAuth());
  const auth = getAuth();
  const [temp_email, set_temp_email] = useState("");
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/Logo.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => set_temp_email(email)}
        />
      </View>
      <TouchableOpacity
        style={styles.SignBtn}
        onPress={() => {
          sendPasswordResetEmail(auth, temp_email)
            .then(() => {
              // Password reset email sent!
              Alert.alert("Email sent", "Check your email to reset password", [
                {
                  text: "OK",
                  style: "ok",
                  onPress: () => {
                    navigation.navigate("Login");
                  },
                },
              ]);
              // ..
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        }}
      >
        <Text style={styles.loginText}>Forget Password</Text>
      </TouchableOpacity>
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

  image: {
    marginBottom: 40,
    width: 250,
    height: 250,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    width: "80%",
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  SignBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#ff9cd1",
  },
});
