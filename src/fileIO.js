// fileIO.js
// Class for handling File Input (not really output, since we don't allow for saving of results of analysis atm.)
// Adapted from: https://www.digitalocean.com/community/tutorials/js-file-reader
import { convertCSVToArray } from "../src/modules/convert-csv-to-array";
import { setKeyValuePairInSessionStorage, isValueAssignedToKeyInSessionStorage, removeValueFromSessionStorage } from "./helpers/sessionStorage";
const ndarray = require("ndarray");

// Array of constants of supported filetypes
const supportedFileTypes = ['csv'];

// Key to store csvData in SessionStorage
const csvDataKey = "CSV_DATA_FOR_F21DG";

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const arr = rows.map((row) => [parseFloat(row.split(delimiter)[0]),parseFloat(row.split(delimiter)[1])]).filter(row => !isNaN(row[0]) && !isNaN(row[1]));
  
  if (arr[arr.length-1][0] === null || arr[arr.length-1][1] === null)
    return arr.slice(-1)
  else
    return arr
}

// Function responsible for parsing a .csv input file.
// Fetches the content of the file embedded in the HTML file, with id csvFileInput
// Creates a FileReader object and adds EventListeners depending on the interaction
function parseFile()  {
    console.log("Starting to parse file...");

    var file = document.getElementById("csvFileInput").files[0];
    console.log("fileIO.js::parseFile, csvFileInput is: " + file);

    if (file == null) {
        // 'generate graphs' button was pressed without uploading a file.
        return;
    }

    if (!fileTypeIsSupported(file.name)) {
        alert("Filetype is not supported. Please try again.");
        return;
    }

    if (isValueAssignedToKeyInSessionStorage(csvDataKey)) {
        console.log(`Clearing value assigned to ${csvDataKey} in sessionStorage`);
        removeValueFromSessionStorage(csvDataKey);
    }

    const reader = new FileReader();

    reader.addEventListener('loadstart', changeStatus("Start Loading"));
    reader.addEventListener("load", changeStatus("Loaded"));
    reader.addEventListener("loadend", loaded);
    reader.addEventListener("progress", setProgress);
    reader.addEventListener("error", errorHandler);
    reader.addEventListener("abort", changeStatus("Interrupted"));

    reader.readAsText(file);

}

// Sanity check
function fileTypeIsSupported(fileName){
    try {
        for (const fileType of supportedFileTypes) {
            if (fileName.split('.')[1].toLowerCase() == fileType) {
                console.log('filetype supported!');
                return true;
            }
        }
    
        console.warn("filetype was not supported");
        return false;
    }

    catch (e) {
        console.error("Exception encountered when trying to identify file type " + e);
        return false;
    }
}

// Intended to be used to inform user about Upload status (i.e. percentage of upload completed...)
function changeStatus(status) {
    document.getElementById("status").innerHTML = status;
    console.log(status);
}


function setProgress(currentProgress) {
    const fr = currentProgress.target;
    const loadingPercentage = 100 * currentProgress / currentProgress.total;
}

// Input will be converted from CSV into Array of Arrays, e.g. [[0,0],[0,1]...]
// This array will then be stored in SessionStorage (only stays for browser session, once closed contents are flushed)
// Input is then accessible by other classes. 
function loaded(target) {
    const fr = target.target;
    var result = fr.result;

    const arr = csvToArray(result);
    console.log(arr);

    changeStatus("Finished Loading!");

    setKeyValuePairInSessionStorage(csvDataKey, JSON.stringify(arr)); // Session storage only accepts Strings, need to JSON format before passing.
}

function errorHandler(error) {
    changeStatus("Error: " + error.target.error.name);
}

// Here's where the 'magic' happens.
//function csvToArray(csvData) {
    //const arrayOfObjects = convertCSVToArray(csvData, {
        //header: false,
        //type: 'array',
        //separator: ',',
    //});
//
    //if (onlyNumericalDataInCSVArray(arrayOfObjects)){
        //console.log(arrayOfObjects);
        //return arrayOfObjects;
    //}
    //else {
        //throw new Error('Non-numerical data discovered in csv file.');
    //}    
//}

/*  
    Safety function to verify that only numerical data will be processed by Pyodide.
    Input validation should be handeled by FileIO class, not STFT/EMD analysis scripts.
    
    The only exception to this is 'e' or 'E' in place of Exponent, for extremely large/small numbers.
*/ 
function onlyNumericalDataInCSVArray(csvArray) {
    return true; //nested for loop no es bueno with large datasets, will kill cpu
	         //will assume well formatted csv for now
    for (var i = 0; i < csvArray.length; i++) {
        var currentTimeSeries = csvArray[i];
        for (var j = 0; j < currentTimeSeries.length; j++) {
            if (isNaN(currentTimeSeries[j])) {
                // Is not a number, this could be bad.
                var nonNumericalChars = currentTimeSeries[j].replace(/[^a-zA-Z]+/g, '').split()
                if (!nonNumericalChars.every(char => char == 'e' || char == "E" || char == "-")) {
                    console.error("A non-numerical entry was found in csvArray: " + currentTimeSeries[j]);
                    return false;
                }
            }  
        }
     }

     console.log("Only Numerical data in CSV array");
     return true;
}

// Only call parseFile in Main, other functions are exported for simplicity in Unit Testing. 
export { parseFile, fileTypeIsSupported, csvToArray, csvDataKey };
