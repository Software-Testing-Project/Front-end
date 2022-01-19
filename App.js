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
export default function App() {
  const [tempURL, settempURL] = useState("39.45.32.51");
  const [URL, setURL] = useState("http://" + tempURL + ":5000/");
  const userSettings = {
    URL: URL,
    tempURL: tempURL,
    settempURL,
    setURL,
  };
  const Drawer = createDrawerNavigator();
  return (
    // <AppContext.Provider value={userSettings}>
    //   <NavigationContainer>
    //     <Drawer.Navigator initialRouteName="Home">
    //       <Drawer.Screen name="Home" component={Home} />
    //       <Drawer.Screen name="New Person" component={cam1} />
    //       <Drawer.Screen name="Live Streaming" component={LiveStreaming} />
    //       <Drawer.Screen name="Search Video" component={Speech} />
    //       <Drawer.Screen name="Siren" component={Try} />
    //       <Drawer.Screen name="Settings" component={Try} />
    //     </Drawer.Navigator>
    //   </NavigationContainer>
    // </AppContext.Provider>
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AppContext.Provider>
  );
}
