import {
  render,
  fireEvent,
  within,
  getQueriesForElement,
} from "@testing-library/react-native";
import Selector from "../../Components/Selector";

describe("Testing the selector", () => {
  it("checks if Image is present", () => {
    const { queryByText } = render(<Selector />);
    expect(queryByText("Open camera")).not.toBeNull();
  });
});
