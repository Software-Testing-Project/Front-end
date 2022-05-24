import { render, fireEvent } from "@testing-library/react-native";
import Login from "../../Components/Login";

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
  };
});
describe("Testing Login Module", () => {
  describe("Check/Verify Email field", () => {
    test(" Email field Exists", () => {
      const { getByTestId } = render(<Login />);
      expect(getByTestId("1")).toBeTruthy();
    });
    test(" Email field has proper types", () => {
      const { getByTestId } = render(<Login />);
      expect(getByTestId("1")).toHaveAttribute("type", "email");
    });
  });
});
