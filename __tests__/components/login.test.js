import { render, fireEvent, within } from "@testing-library/react-native";
import Login from "../../Components/Login";
import "@testing-library/jest-native/extend-expect";
import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    test("user verfivation function is called", () => {
      const { getByTestId } = render(<Login />);
      fireEvent.press(getByTestId("3"));
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(signInWithEmailAndPassword).toBeCalledTimes(1);
    });
    test("user verfivation function is called only 1 times", () => {
      expect(signInWithEmailAndPassword).toBeCalledTimes(1);
    });
    test("COntains Login Text", () => {
      const { getByTestId } = render(<Login />);
      const Login_Btn = within(getByTestId("3"));
      expect(Login_Btn.getByText("LOGIN")).toBeTruthy();
    });
    test(" Contains only 1 login button", () => {
      const { queryAllByText, getByTestId } = render(<Login />);
      expect(queryAllByText("LOGIN")).toHaveLength(1);
      const Login_BTN = within(getByTestId("3"));
      expect(Login_BTN.queryAllByText("LOGIN")).toBeTruthy();
      expect(Login_BTN.queryAllByText("LOGIN")).toHaveLength(1);
    });
  });
});
