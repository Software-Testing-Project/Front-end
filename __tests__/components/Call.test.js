import { render, fireEvent } from "@testing-library/react-native";
import Call from "../../Components/Call";
import React from "react";

describe("Testing call module", () => {
  test("Is button present", () => {
    const { getByText } = render(<Call />);
    let butto = getByText("Call");
    expect(butto).toBeTruthy();
  });
  test("On Button Press call is send", () => {
    const { getByTestId } = render(<Call />);
    let temp = fireEvent.press(getByTestId("0090"));
    expect(temp).toBe("Ok");
  });
  test("Set Phone number", () => {
    const { getByTestId, getByPlaceholderText } = render(<Call />);
    fireEvent.changeText(getByTestId("1122"), "+923439586924");
    expect(getByPlaceholderText("Phone Number")).toBeTruthy();
  });
  test("Fetch is called", () => {
    const { getByTestId } = render(<Call />);
    let temp = fireEvent.press(getByTestId("0090"));
    expect(global.fetch).toHaveBeenCalled();
  });
});

//npm install --save-dev @testing-library/react-native --legacy-peer-deps
