// ./navigation/DrawerNavigator.js

import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainStackNavigator } from "./Navigotr";
import LiveStreaming from "../Components/LiveStreaming";
import Speech from "../Components/voice";
import Try from "../Components/try";
import cam1 from "../Components/Selector";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={{ headerTransparent: true, headerRight: () => <View></View> }}
      />
      <Drawer.Screen name="New Person" component={cam1} />
      <Drawer.Screen name="Live Streaming" component={LiveStreaming} />
      <Drawer.Screen name="Search Video" component={Speech} />
      <Drawer.Screen name="Siren" component={Try} />
      <Drawer.Screen name="Settings" component={Try} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
