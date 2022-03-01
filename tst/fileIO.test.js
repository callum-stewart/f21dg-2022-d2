// Utilizing Jest as our Unit Testing Framework, for more info: https://github.com/facebook/jest
// To run tests, run: npm test
import * as FileIO from "../src/fileIO.js";

describe("File Prefix Check", () => {
    test("File prefix ending in .csv should succeed", () => {
        const validFileName = "someRandomFile.csv";

        expect(FileIO.verifyFileTypeIsSupported(validFileName)).toEqual(true);
    });

    test("File prefix ending in .json should fail", () => {
        const invalidFileName = "someInvalidFile.json";

        expect(FileIO.verifyFileTypeIsSupported(invalidFileName)).toEqual(false);
    });
});

describe("CSV Data is transformed into array", () => {
    test("Valid CSV data should be transformed into Array of Arrays, without header", () => {
         const sampleCSVTestData = "Time,Value\n" +
                                    "0.0,0.0\n" +
                                    "0.00628947,0.00012583\n" +
                                    "0.01257895,0.00050233\n" +
                                    "0.01886842,0.00112653\n" 
         const expectedOutput = [[0,0], [0.00628947,0.00012583], [0.01257895,0.00050233], [0.01886842,0.00112653]];

        expect(FileIO.csvToArray(sampleCSVTestData)).toEqual(expectedOutput);
    });
});