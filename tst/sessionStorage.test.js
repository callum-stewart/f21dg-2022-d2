import { csvDataKey } from "../src/fileIO";
import * as SessionStorage from "../src/helpers/sessionStorage";

const testKeyForSessionStorage = "F21DG_TEST_SESSION_STORAGE";
const validStringValue = "someExampleData";

describe("Browser SessionStorage behaves as expected with different inputs", () => {
    test("Saving string to sessionStorage should succeed", () => {
        SessionStorage.setKeyValuePairInSessionStorage(testKeyForSessionStorage, validStringValue);

        expect(SessionStorage.getValueFromKeyInSessionStorage(testKeyForSessionStorage)).toEqual(validStringValue);
    });

    test("Saving JSON Stringified object should succeed and return valid string", () => {
        const jsonStringifiedObject = JSON.stringify([[0,0], [1,0]]);
        SessionStorage.setKeyValuePairInSessionStorage(testKeyForSessionStorage, jsonStringifiedObject)

        expect(SessionStorage.getValueFromKeyInSessionStorage(testKeyForSessionStorage)).toEqual(jsonStringifiedObject);
    });

    test("Removing string saved in localStorage should succeed", () => {
        SessionStorage.removeValueFromSessionStorage(testKeyForSessionStorage);

        expect(SessionStorage.getValueFromKeyInSessionStorage(csvDataKey)).toEqual(null);
    });

    test("Getting data from nonexistant key should return nothing", () => {
        expect(SessionStorage.getValueFromKeyInSessionStorage("someInvalidKey")).toBeNull();
    });
});