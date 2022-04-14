import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import View_Video from "./Videos";
import * as FileSystem from "expo-file-system";
import AppContext from "./AppContext";

export default function Video_List({ route }) {
  const myContext = useContext(AppContext);
  let url = myContext.URL;
  url = url.concat("video_stored/");

  useEffect(() => {
    console.log(Video_URI);
    setsuri(route.params.paramKey);
    console.log(route.params.paramKey);
  }, []);
  const [Video_URI, setsuri] = useState([
    { uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", key: 1 },
  ]);
  return (
    <View>
      <FlatList
        data={Video_URI}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <View_Video item={url + item.uri} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
