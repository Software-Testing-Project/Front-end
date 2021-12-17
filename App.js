import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import logo from "./assets/Logo.png";
import p1 from "./assets/1.png";
import p2 from "./assets/2.png";
import p3 from "./assets/3.png";
import p4 from "./assets/4.png";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from "react-native";
import Camera_Module from "./Components/Camera";
import Image_Inside from "./Components/camera2";
import LiveStreaming from "./Components/LiveStreaming";

export default function App() {
  const [todos, set_todos] = useState([
    {
      name: "Pizza",
      key: "1",
    },
    {
      name: "Biryani",
      key: "2",
    },
    {
      name: "Burger",
      key: "3",
    },

    { name: "test", key: "4" },
  ]);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [temp, set_temp] = useState("");
  const [opencam, setcam] = useState(false);
  const [opencamera2, setcamera2] = useState(false);
  const [openlivestream, setlivestream] = useState(false);
  const Press_Handler = (key) => {
    set_todos((prev_todos) => {
      return prev_todos.filter((todo) => todo.key != key);
    });
  };
  const Add_todo = () => {
    var _key = todos.length + 1;
    var obj = { name: temp, key: _key };
    console.log("todo", todos);
    var new_state = [...todos, obj];

    set_todos(new_state);
    console.log("todo", todos);
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={{ width: windowWidth, height: 300 }} />
      </View>
      <View>
        {/* Modal for live streaming */}
        <View>
          <Modal
            visible={openlivestream}
            animationType="slide"
            presentationStyle="fullScreen"
            style={styles.Modal}
          >
            <LiveStreaming turnback={setlivestream}></LiveStreaming>
          </Modal>
        </View>
        {/* Modal for camera opening and autoclick */}
        <View>
          <Modal
            visible={opencam}
            animationType="slide"
            presentationStyle="fullScreen"
            style={styles.Modal}
          >
            <Camera_Module turnback={setcam}></Camera_Module>
          </Modal>
        </View>
        <Text
          style={{
            width: windowWidth,
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
            backgroundColor: "black",
            textAlign: "center",
            marginTop: 3,
            padding: 2,
          }}
        >
          Home
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ margin: 30 }}>
            <Image source={p1} style={{ width: 90, height: 90 }} />
            <Text style={styles.btns}>Search Video</Text>
          </View>
          <View style={{ margin: 30 }}>
            <TouchableOpacity
              onPress={() => {
                setlivestream(true);
              }}
            >
              <Image source={p2} style={{ width: 90, height: 90 }} />
              <Text style={styles.btns}>Live Streaming</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ margin: 30 }}>
            <Image source={p3} style={{ width: 90, height: 90 }} />
            <Text style={styles.btns}>Siren</Text>
          </View>
          <View style={{ margin: 30 }}>
            <TouchableOpacity
              onPress={() => {
                setcam(true);
              }}
            >
              <Image source={p4} style={{ width: 90, height: 90 }} />
              <Text style={styles.btns}>New Person</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <View>
        <Modal
          visible={opencam}
          animationType="slide"
          presentationStyle="fullScreen"
          style={styles.Modal}
        >
          <Camera_Module turnback={setcam}></Camera_Module>
        </Modal>
      </View>
      

      <View>
        <Modal
          visible={opencamera2}
          animationType="slide"
          presentationStyle="fullScreen"
          style={styles.Modal}
        >
          <Image_Inside turnback={setcamera2}></Image_Inside>
        </Modal>
      </View>
      <View style={styles.cam_btn}>
        <Button
          title="Open Camera"
          onPress={() => {
            setcam(true);
          }}
        />
      </View>

      <View style={styles.cam_btn}>
        <Button
          title="Open Live Streaming"
          onPress={() => {
            setlivestream(true);
          }}
        />
      </View>
      <View style={styles.cam_btn}>
        <Button
          title="Open camera 2"
          onPress={() => {
            setcamera2(true);
          }}
        />
      </View>

      <View style={styles.todo_APP}>
        <View>
          <Text style={styles.header}>TODO App</Text>
        </View>
        <View>
          <TextInput
            onChangeText={(e) => set_temp(e)}
            placeholder="Enter new Todo"
            style={styles.input}
          />
          <View style={styles.Button}>
            <Button title="Add" onPress={() => Add_todo()} />
          </View>
        </View>
        <View style={styles.list}>
          <FlatList
            data={todos}
            extraData={todos}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => Press_Handler(item.key)}>
                <Text style={styles.item}>Eat : {item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  btns: {
    fontWeight: "bold",
  },
  // header: {
  //   color: "blue",
  //   fontWeight: "bold",
  //   fontSize: 30,
  //   color: "red",
  //   marginTop: 100,
  //   backgroundColor: "#5e4700",
  //   width: 300,
  //   textAlign: "center",
  //   borderRadius: 5,
  // },
  // list: {
  //   marginTop: "5%",
  // },
  // item: {
  //   fontSize: 25,
  //   backgroundColor: "#777",
  //   borderRadius: 5,
  //   margin: 5,
  //   padding: 5,
  //   textAlign: "center",
  // },
  // input: {
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   marginTop: "15%",
  //   width: 200,
  //   height: 40,
  // },
  // Button: {
  //   width: 150,
  //   alignSelf: "center",
  //   margin: 20,
  // },
  // cam_btn: {
  //   marginTop: 40,
  // },
  // todo_APP: {
  //   flex: 1,
  // },
});
