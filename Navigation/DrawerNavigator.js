// ./navigation/DrawerNavigator.js

import React, { useState, useEffect, useRef, useContext } from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { MainStackNavigator } from "./Navigotr";
import LiveStreaming from "../Components/LiveStreaming";
import Speech from "../Components/voice";
import Try from "../Components/try";
import cam1 from "../Components/Selector";
import AppContext from "../Components/AppContext";
import { createStackNavigator } from "@react-navigation/stack";
import Logout from "../Components/Logout";
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const DrawerNavigator = () => {
  const myContext = useContext(AppContext);
  if (myContext.issignedin) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={MainStackNavigator}
          options={{
            headerTransparent: true,
            headerRight: () => <View></View>,
          }}
        />
        <Drawer.Screen name="New Person" component={cam1} />
        <Drawer.Screen name="Live Streaming" component={LiveStreaming} />
        <Drawer.Screen name="Search Video" component={Speech} />
        <Drawer.Screen name="Siren" component={Try} />
        <Drawer.Screen name="Settings" component={Try} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
};

export default DrawerNavigator;
