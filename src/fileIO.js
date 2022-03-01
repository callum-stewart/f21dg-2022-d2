// fileIO.js
// Class for handling File Input (not really output, since we don't allow for saving of results of analysis atm.)
// Adapted from: https://www.digitalocean.com/community/tutorials/js-file-reader
import { convertCSVToArray } from "convert-csv-to-array";

// Array of constants of supported filetypes
const supportedFileTypes = ['csv'] 

// Function responsible for parsing a .csv input file.
// Fetches the content of the file embedded in the HTML file, with id csvFileInput
// Creates a FileReader object and adds EventListeners depending on the interaction
function parseFile()  {
    console.log("Starting to parse file...");

    var file = document.getElementById("csvFileInput").files[0];
    
    if (!verifyFileTypeIsSupported(file.name)) {
        alert("Filetype is not supported. Please try again.");
        return;
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
function verifyFileTypeIsSupported(fileName){
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
}


function setProgress(currentProgress) {
    const fr = currentProgress.target;
    const loadingPercentage = 100 * currentProgress / currentProgress.total;
}

function loaded(target) {
    const fr = target.target;
    var result = fr.result;

    changeStatus("Finished Loading!");
    console.log(result);
    csvToArray(result);
}

function errorHandler(error) {
    changeStatus("Error: " + error.target.error.name);
}

// Here's where the 'magic' happens.
function csvToArray(csvData) {
    const arrayOfObjects = convertCSVToArray(csvData, {
        header: false,
        type: 'array',
        separator: ',',
    });
    
    console.log(arrayOfObjects);

    return arrayOfObjects;
}

function sendCSVToPyodideWorker(csvArray) {
    // ... still to be implemented.
}

// Only call parseFile in Main, other functions are exported for simplicity in Unit Testing. 
export { parseFile, verifyFileTypeIsSupported, csvToArray };