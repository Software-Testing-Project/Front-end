import React from "react";

import Intro from "../../Components/Call";
import { shallow, mount } from "enzyme";
import * as AppContext from "../../Components/AppContext";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });
describe("Call module", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);
  const userSettings = { URL: "192.168.1201.", tempURL: "192.168.1201." };
  jest
    .spyOn(AppContext, "useAppContext")
    .mockImplementation(() => userSettings);

  it("Call render correctly", () => {
    const tree = shallow(<Intro />);
    expect(tree).toMatchSnapshot();
  });
  const myResponse = {
    data: "test",
  };
  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(
        mockResponse(
          200,
          (result = myResponse),
          null,
          JSON.stringify(myResponse)
        )
      )
    );

  it("should render one", () => {
    let tree = shallow(<Intro />);
    expect(tree.find("Image")).toHaveLength(1);
  });
  it("url is defined", () => {
    let tree = shallow(<Intro />);
    expect(tree.find("url")).toBeDefined();
  });
  it("Call user button clicked 1 time", () => {
    let tree = shallow(<Intro />);
    expect(tree.find("TouchableOpacity")).toBe(true);
  });

  // it("Call is getting url fine", () => {
  //   let tree = shallow(<Intro />);
  //   expect(tree.find("[data-jest=mockyApp]")).toBe("Call");
  // });
});
