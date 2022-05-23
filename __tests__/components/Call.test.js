import { render, fireEvent } from "@testing-library/react-native";
import Call from "../../Components/Call";
import React from "react";
import * as AppContext from "../../Components/AppContext";
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((init) => [init, setState]);
const userSettings = { URL: "192.168.1201.", tempURL: "192.168.1201." };
jest.spyOn(AppContext, "useAppContext").mockImplementation(() => userSettings);
const myResponse = {
  data: "test",
};
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ myResponse }),
  })
);
const fetch = jest.fn();
test("form submits two answers", () => {
  const allQuestions = ["q1", "q2"];
  const mockFn = jest.fn();

  const { getByText, getByTestId } = render(<Call />);
  let butto = getByText("Call");
  expect(butto).toBeTruthy();
  let temp = fireEvent.press(getByTestId("0090"));
  console.log(temp);
});

//npm install --save-dev @testing-library/react-native --legacy-peer-deps
