import { render, fireEvent } from "@testing-library/react-native";
import Login from "../../Components/Login";
import "@testing-library/jest-native/extend-expect";
import React from "react";
import * as AppContext from "../../Components/AppContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((init) => [init, setState]);
const userSettings = { URL: "192.168.1201.", tempURL: "192.168.1201." };
jest.spyOn(AppContext, "useAppContext").mockImplementation(() => userSettings);
const myResponse = {
  data: "test",
};
jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest
      .fn()
      .mockImplementation(() => Promise.resolve()),
  };
});
describe("Testing Login Module", () => {
  describe("Check/Verify Email field", () => {
    test(" Email field Exists", () => {
      const { getByTestId } = render(<Login />);
      expect(getByTestId("1")).toBeTruthy();
    });
    test(" Email field is Clickable", () => {
      const { getByTestId } = render(<Login />);
      expect(getByTestId("1")).toHaveProp("onChangeText");
    });
  });

  describe("Check/Verify Password field", () => {
    test(" Password field Exists", () => {
      const { getByTestId } = render(<Login />);
      expect(getByTestId("2")).toBeTruthy();
    });
    test(" Password field is Clickable", () => {
      const { getByTestId } = render(<Login />);
      expect(getByTestId("2")).toHaveProp("onChangeText");
    });
  });
  describe("User Verification", () => {
    test("user is verified", () => {
      const { getByTestId } = render(<Login />);
      let temp = fireEvent.press(getByTestId("3"));

      expect(temp).toBe(true);
    });
  });
});
