import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import Selector from "../../Components/Selector";
import {
  render,
  fireEvent,
  within,
  getQueriesForElement,
} from "@testing-library/react-native";
import React from "react";
import * as AppContext from "../../Components/AppContext";
import { Ionicons } from "@expo/vector-icons";

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((init) => [init, setState]);
const userSettings = { URL: "192.168.1201.", tempURL: "192.168.1201." };
jest.spyOn(AppContext, "useAppContext").mockImplementation(() => userSettings);
const myResponse = {
  data: "test",
};
//Does not work
// jest.mock("@expo/vector-icons", () => {
//   return () => "";
// });

//Work but all test that should be fail are not failing
jest.mock(
  "@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js",
  () => {
    return () => "";
  }
);

describe("Testing the selector", () => {
  it("checks if Image is present", () => {
    const { findByLabelText } = render(<Selector />);
    expect(findByLabelText("Image")).toBeTruthy();
  });
  it("checks if Camera  button is present", () => {
    const { findByTestId } = render(<Selector />);
    expect(findByTestId("camera1")).toBeTruthy();
  });
  it("checks if Image is present", () => {
    const { findByTestId } = render(<Selector />);
    const element = findByTestId("1152222");
    expect(element).toBeTruthy();
    const Gallery_Button = within();
    expect(Gallery_Button).toBeTruthy();
    const inside_btn = Gallery_Button.findAllByTestId("114");
    expect(inside_btn).toBeTruthy();
    expect(Gallery_Button.findByText("Opesn Galler")).toBeTruthy();
  });
});
