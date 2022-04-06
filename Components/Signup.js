// import { WebView } from "react-native-webview";
// import React, { useState, useEffect, useRef, useContext } from "react";
// import AppContext from "./AppContext";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Button,
//   Image,
// } from "react-native";

// export default function Login() {
//   const myContext = useContext(AppContext);
//   return (
//     <View>
//       <Text>Login</Text>

//       <TouchableOpacity
//         onPress={() => {
//           myContext.setsignedin(true);
//         }}
//       >
//         <Text> Click me</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import AppContext from "./AppContext";
export default function Signup({ navigation }) {
  const [isready, setready] = useState(false);
  const myContext = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setUserName] = useState("");
  const auth = getAuth();

  const storeName = async (value) => {
    await AsyncStorage.setItem("@user_name", value);
  };

  const handleSignup = () => {
    setready(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                storeName(user.displayName);
                setready(false);
                myContext.setsignedin(true);

                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setready(false);
                Alert.alert("Login failed", "Email or passwrod is incorrect");
                console.log(errorMessage);
              });

            // Profile updated!
            console.log("Name added");

            // ...
          })
          .catch((error) => {
            // An error occurred
            setready(false);
            console.log(error.message);
            // ...
          });
        // ...
      })
      .catch((error) => {
        setready(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        let myArray = errorMessage.split("/");
        let message = (myArray = myArray[1].split(")"));
        message = message[0];

        Alert.alert("Signup Failed", message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log(message);
        // ..
      });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/Logo.png")} />
      {isready ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View></View>
      )}
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="User Name."
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setUserName(name)}
        />
      </View>

      <TouchableOpacity style={styles.SignBtn} onPress={handleSignup}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
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

  SignBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#ff9cd1",
  },
});
