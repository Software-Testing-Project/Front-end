import { StyleSheet, Text, View, Alert, Button } from "react-native";
import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import AppContext from "./AppContext";

const Logout = () => {
  const myContext = useContext(AppContext);
  const Signout_func = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        myContext.setsignedin(false);

        // Sign-out successful.
      })
      .catch((error) => {
        Alert.alert("Log Out Failed");
        // An error happened.
      });
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Logout", "Do you want to logout", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: Signout_func,
      },
    ]);

  return (
    <View style={styles.container}>
      <Button
        title={"Logout"}
        onPress={createTwoButtonAlert}
        style={styles.SignBtn}
      />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
