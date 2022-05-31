import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import React from "react";
import * as AppContext from "./Components/AppContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//Mock async storage
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

//Mock Usestate
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((init) => [init, setState]);
const userSettings = { URL: "192.168.1201.", tempURL: "192.168.1201." };
jest.spyOn(AppContext, "useAppContext").mockImplementation(() => userSettings);
const myResponse = {
  data: "test",
};

//Mock firebase
jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest
      .fn()
      .mockResolvedValue(true)
      .mockRejectedValue(false),
    //.mockImplementation(() => Promise.resolve()),
  };
});

//Mock Fetch

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ myResponse }),
  })
);
