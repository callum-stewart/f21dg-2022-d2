// main.js
// Main javascript file, this is loaded upon page load.
// Note: It should be loaded as type:"module", to allow importing functions from other js files.



import { asyncRun } from "./pyworker.js";
import { parseFile } from "./fileIO.js";

// Helper functions
function addToOutput(s) {
    document.getElementById("output").value += s + "\n";
}

// Assign event listeners, waiting until page is loaded before attempting to find object.
document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		document.getElementById("runButton").addEventListener("click", evaluatePython);	// <-- The 'Run' button
		document.getElementById("uploadDataButton").addEventListener("click", parseFile); // <-- The upload .csv button
	}
}


/**
	Function that is ran when the button on screen is clicked, 

*/


async function evaluatePython() {
	try {
		// Read input parameters from page
		var value = document.getElementById('code').value;
		let context = {
			params: [value],
		};

		// Pass parameters into the script to be run, alongside returning results and/or errors.
                const response = await fetch("public/script.py");
                const pythonScript = await response.text();
		const { results, error } = await asyncRun(pythonScript, context);

		// If the results are valid
		if (results) {
			// Parse results by commas, then add to output array
			let results_array = results.split(",");

			addToOutput(results_array);

		} else if (error) {
			console.log("pyodideWorker error: ", error);
		} else {
			console.log("unspecified error with Pyodide. Is your browser supported?");
		}
	} catch (e) {
		console.log(
			`Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
		);
	}
}
