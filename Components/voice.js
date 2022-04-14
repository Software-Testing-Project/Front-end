import React, { useState, useRef, useEffect, useContext } from "react";
import { View, StyleSheet, Button, Text, Alert } from "react-native";
import { Audio } from "expo-av";
import Video_List from "./Video_List";
import AppContext from "./AppContext";

export default function Voice({ navigation }) {
  // Refs for the audio
  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  // States for UI
  const myContext = useContext(AppContext);
  let url = myContext.URL;
  url = url.concat("voice");
  const [RecordedURI, SetRecordedURI] = useState("");
  const [message, setmessage] = useState("");
  const [AudioPermission, SetAudioPermission] = useState(false);
  const [IsRecording, SetIsRecording] = useState(false);
  const [IsPLaying, SetIsPLaying] = useState(false);

  // Initial Load to get the audio permission
  useEffect(() => {
    GetPermission();
  }, []);

  // Function to get the audio permission
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    SetAudioPermission(getAudioPerm.granted);
  };

  // Function to start recording
  const StartRecording = async () => {
    try {
      // Check if user has given the permission to record
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );

          // Start recording
          await AudioRecorder.current.startAsync();
          SetIsRecording(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission();
      }
    } catch (error) {}
  };

  // Function to stop recording
  const StopRecording = async () => {
    try {
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();
      if (result) {
        SetRecordedURI(result);
        uploadvoice(result);
      }

      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();

      SetIsRecording(false);
    } catch (error) {}
  };

  // Function to play the recorded audio
  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          SetIsPLaying(true);
        }
      }
    } catch (error) {}
  };

  const uploadvoice = async (result) => {
    // 1. initialize request
    console.log("Inside", result);
    const form_Data = new FormData();
    form_Data.append("file", {
      uri: result, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
      type: `audio/m4a`, // example: image/jpg
      name: `test.m4a`, // example: upload.jpg
    });

    fetch(url, {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
      },
      body: form_Data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data["data"]);
        if (data["data"] != "err") {
          Alert.alert("You Said : ", data["message"], [
            {
              text: "OK",
              style: "ok",

              onPress: () => {
                navigation.navigate("Search Result", {
                  paramKey: data["data"],
                });
              },
            },
            {
              text: "Cancel",
            },
          ]);
        } else {
          Alert.alert(
            "You Said : ",
            data["message"] + " so cannot procceed further",
            [
              {
                text: "OK",
                style: "ok",
              },
            ]
          );
        }
        console.log(data["message"]);
      })
      .catch((e) => {
        console.log("Error is", e);
        Alert.alert("No network ", "Try Again later ", [
          {
            text: "OK",

            style: "ok",
          },
        ]);
      });

    // const xhr = new XMLHttpRequest();
    // // 2. open request
    // xhr.open("POST", "http://192.168.137.238:5000/voice");

    // // 3. set up callback for request
    // xhr.onload = () => {
    //   const response = JSON.parse(xhr.response);
    //   console.log(response);
    //   // ... do something with the successful response
    // };
    // // 4. catch for request error
    // xhr.onerror = (e) => {
    //   console.log(e, "upload failed");
    // };
    // // 4. catch for request timeout
    // xhr.ontimeout = (e) => {
    //   console.log(e, "upload timeout");
    // };
    // // 4. create formData to upload
    // //const formData = new FormData();
    // var t = result.split(
    //   "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540popeyeee%252FSmartGuard/Audio/"
    // );
    // t = result.split(".m4a");
    // console.log(t);
    // var ending = ".m4a";
    // formData.append("file", {
    //   uri: result, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
    //   type: `audio/${ending}`, // example: image/jpg
    //   name: `${t[0]}.${ending}`, // example: upload.jpg
    // });
    // // 6. upload the request
    // xhr.send(formData);

    // // 7. track upload progress
    // if (xhr.upload) {
    //   // track the upload progress
    //   xhr.upload.onprogress = ({ total, loaded }) => {
    //     const uploadProgress = loaded / total;

    //     console.log(uploadProgress);
    //   };
    // }
  };
  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

      SetIsPLaying(false);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text>You said: {message}</Text>
      <Button
        title={IsRecording ? "Stop Recording" : "Start Recording"}
        color={IsRecording ? "red" : "green"}
        onPress={IsRecording ? StopRecording : StartRecording}
      />
      <Button
        title={IsPLaying ? "Stop Sound" : "Play Sound"}
        color={IsPLaying ? "red" : "orange"}
        onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
      />

      {/* <Video_List /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
