import React, { useState, useEffect, useRef, useContext } from "react";
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
export default function Call() {
  const myContext = useContext(AppContext);
  url = myContext.URL.concat("call_sim");
  const [PhoneNumber, setPhoneNumber] = useState("+923439586924");
  const [result, setresult] = useState("");
  const Calluser = () => {
    let data = JSON.stringify({
      PhoneNumber: PhoneNumber,
    });
    //console.log(data);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Calling... ", PhoneNumber, [
            {
              text: "Ok",
            },
          ]);
        } else {
          Alert.alert("Calling failed", PhoneNumber, [
            {
              text: "Ok",
            },
          ]);
        }
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/Logo.png")} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          onChangeText={(number) => setPhoneNumber(number)}
        />
      </View>
      <TouchableOpacity style={styles.SignBtn} onPress={Calluser}>
        <Text style={styles.loginText}>Call</Text>
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
