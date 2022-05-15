import React from "react";

import Login from "../../Components/Login";
import { shallow, mount } from "enzyme";
import * as AppContext from "../../Components/AppContext";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as Firebase from "firebase/auth";

configure({ adapter: new Adapter() });

describe("Login Module", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);
  const userSettings = { URL: "192.168.1201.", tempURL: "192.168.1201." };
  jest
    .spyOn(AppContext, "useAppContext")
    .mockImplementation(() => userSettings);

  jest.mock("Firebase", () => ({
    GoogleAuthProvider: {
      credential: jest.fn().mockReturnValue("123"),
    },
    // how to mock auth() instance or signInWithGoogle method?
  }));
  it("Login render correctly", () => {
    const tree = shallow(<Login />);
    expect(tree).toMatchSnapshot();
  });
});
