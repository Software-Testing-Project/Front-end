// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LiveStreaming from "../Components/LiveStreaming";
import Try from "../Components/try";
import Home from "../Components/Home";
import cam1 from "../Components/Selector";
import Speech from "../Components/voice";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home1"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="New Person1"
        component={cam1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Live Streaming1"
        component={LiveStreaming}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search Video1"
        component={Speech}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Siren1"
        component={Try}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings1"
        component={Try}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
