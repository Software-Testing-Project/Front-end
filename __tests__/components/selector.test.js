import {
  render,
  fireEvent,
  within,
  getQueriesForElement,
} from "@testing-library/react-native";
import Selector from "../../Components/Selector";

describe("Testing the selector", () => {
  it("checks if Image is present", () => {
    const { getByRole } = render(<Selector />);
    expect(getByRole("Text")).not.toBeNull();
  });
});
