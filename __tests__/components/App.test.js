import React from "react";
import renderer from "react-test-renderer";
import Intro from "../../Components/Call";
import { shallow } from "enzyme";
import * as AppContext from "../../Components/AppContext";
describe("Call module", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);
  const userSettings = { URL: "192.168.1201.", tempURL: "192.168.1201." };
  jest
    .spyOn(AppContext, "useAppContext")
    .mockImplementation(() => userSettings);

  // it("render correctly", () => {
  //   const tree = shallow(<Intro />);
  //   expect(tree).toMatchSnapshot();
  // });
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
  it("Call user", async () => {
    let tree = shallow(<Intro />);
    let temp = tree.find("Calluser");
  });

  // it("Call is getting url fine", () => {
  //   let tree = shallow(<Intro />);
  //   expect(tree.find("[data-jest=mockyApp]")).toBe("Call");
  // });
});
