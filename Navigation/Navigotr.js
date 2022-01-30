// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LiveStreaming from "../Components/LiveStreaming";
import Try from "../Components/try";
import Home from "../Components/Home";
import cam1 from "../Components/Selector";
import Speech from "../Components/voice";
import ViewImages from "../Components/ViewImages";
import Camera_Module from "../Components/Camera";
import Image_Inside from "../Components/camera2";
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home1"
        component={Home}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="New Person1"
        component={cam1}
        options={{
          title: "Add New Person",
        }}
      />
      <Stack.Screen
        name="Live Streaming1"
        component={LiveStreaming}
        options={{
          title: "Live Streaming",
        }}
      />
      <Stack.Screen
        name="Search Video1"
        component={Speech}
        options={{
          title: "Search Video",
        }}
      />
      <Stack.Screen
        name="Siren1"
        component={Try}
        options={{
          title: "Siren",
        }}
      />
      <Stack.Screen
        name="Settings1"
        component={Try}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="ViewImages1"
        component={ViewImages}
        options={{
          title: "Gallery",
        }}
      />
      <Stack.Screen
        name="Camera1"
        component={Camera_Module}
        options={{
          title: "Pictures",
        }}
      />
      <Stack.Screen
        name="Camera2"
        component={Image_Inside}
        options={{
          title: "Open Gallery",
        }}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
