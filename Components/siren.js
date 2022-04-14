import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Siren() {
  const [state, setstate] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setstate(!state);
        }}
      >
        <View>
          <FontAwesome name="bell" size={190} color="purple" />
          {state ? (
            <View style={{ paddingLeft: 50 }}>
              <Text style={styles.text}>ON</Text>
            </View>
          ) : (
            <View style={{ paddingLeft: 50 }}>
              <Text style={styles.text}>OFF</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  text: {
    color: "black",
    fontSize: 50,
    fontWeight: "500",
  },
});
