import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import Selector from "../../Components/Selector";
it("checks if Async Storage is used", async () => {
  expect(AsyncStorage.getItem).toBeCalledWith("myKey");
});
