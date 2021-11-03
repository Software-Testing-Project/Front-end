import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from "react-native";
import Camera_Module from "./Components/Camera";

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
  
{name:"test",key:"3"}
]);
  const [temp, set_temp] = useState("");
  const [opencam, setcam] = useState(false);
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
        <Modal
          visible={opencam}
          animationType="slide"
          presentationStyle="fullScreen"
          style={styles.Modal}
        >
          <Camera_Module turnback={setcam}></Camera_Module>
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
      </View>
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
  header: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
    marginTop: 100,
    backgroundColor: "#5e4700",
    width: 300,
    textAlign: "center",
    borderRadius: 5,
  },
  list: {
    marginTop: "5%",
  },
  item: {
    fontSize: 25,
    backgroundColor: "#777",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: "15%",
    width: 200,
    height: 40,
  },
  Button: {
    width: 150,
    alignSelf: "center",
    margin: 20,
  },
  cam_btn: {
    marginTop: 40,
  },
  todo_APP: {
    flex: 1,
  },
});
