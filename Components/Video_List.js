import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import View_Video from "./Videos";
import { Button } from "react-native-paper";

export default function Video_List() {
  const [Video_URI, setsuri] = useState([
    { uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", key: 1 },
    {
      uri: "https://media.istockphoto.com/videos/dancing-in-the-sky-video-id1295217100",
      key: 2,
    },
  ]);
  return (
    <View>
      <FlatList
        data={Video_URI}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <View_Video item={item.uri} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
