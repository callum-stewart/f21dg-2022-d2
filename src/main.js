// main.js
// Main javascript file, this is loaded upon page load.
// Note: It should be loaded as type:"module", to allow importing functions from other js files.

import { asyncRun } from "./pyworker.js";
import InfoPanel from "./modules/infoPanel";
import UploadSignal from "./modules/uploadSignal";
import ConfigSignal from "./modules/configSignal";
import {resetSignalSettings} from "./modules/reset";
import { parseFile } from "./fileIO.js";

//webpack not importing this? even though it has been a feature since v2
// import methodInfo from "../public/methodInfo.json";
// console.log(methodInfo);
const data = {
	EMD: {
	description:
		"A necessary step to reduce any given data into a collection of intrinsic mode functions (IMF) to which the Hilbert spectral analysis can be applied.",
	psuedocode: "[PSUEDOCODE]",
	procons: {
		pros: `A necessary step to reduce any given data into a collection of intrinsic mode functions (IMF) to which the Hilbert spectral analysis can be applied.
			A Fourier-related transform used to determine the sinusoidal frequency and phase content of local sections of a signal as it changes over time.
			A Fourier-related transform used to determine the sinusoidal frequency and phase content of local sections of a signal as it changes over time.
			`,
		cons: "A necessary step to reduce any given data into a collection of intrinsic mode functions (IMF) to which the Hilbert spectral analysis can be applied.",
	},
	},
	STFT: {
	description:
		"A Fourier-related transform used to determine the sinusoidal frequency and phase content of local sections of a signal as it changes over time.",
	psuedocode: "[PSUEDOCODE]",
	procons: {
		pros: `A Fourier-related transform used to determine the sinusoidal frequency and phase content of local sections of a signal as it changes over time.
			A Fourier-related transform used to determine the sinusoidal frequency and phase content of local sections of a signal as it changes over time.
			A Fourier-related transform used to determine the sinusoidal frequency and phase content of local sections of a signal as it changes over time.
			`,
		cons: "A Fourier-related transform used to determine the sinusoidal frequency and phase content of local sections of a signal as it changes over time.",
	},
	},
};

const info = new InfoPanel(data);
const upload = new UploadSignal();
const config = new ConfigSignal();

const emdBtn = document.querySelector("#emd-btn");
const stftBtn = document.querySelector("#stft-btn");
const uploadBtn = document.querySelector("#upload-btn");
const configBtn = document.querySelector("#config-btn");
const resetBtn = document.querySelector("#reset-btn");

emdBtn.addEventListener("click", () => {
	info.populatingInfoPanel('EMD');
	});
stftBtn.addEventListener("click", () => {
	info.populatingInfoPanel('STFT');
});
uploadBtn.addEventListener("click", () => {
	upload.showUploadTab();
	});

resetBtn.addEventListener("click", () => {
	resetSignalSettings();
	});
configBtn.addEventListener("click", () => {
	config.showConfigureTab();
	});


//BOOTSTRAP INITIALISATIONS
//Initialising popovers over all the page
var popoverTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	return new bootstrap.Popover(popoverTriggerEl);
  });
  
  //Initialising tooltips over all the page
  var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  

// Define scripts to be ran
// NOTE!!!: Notice that the scripts MUST be indented as if it was a new python file, e.g. DO NOT FOLLOW ANY JAVASCRIPT CURRENT INDENTATIONS! As you will just get python errors
const scriptMatPlotLib = `
t = np.arange(0.0, 2.0, 0.01)
s = 1 + np.sin(2 * np.pi * t)

fig, ax = plt.subplots()
ax.plot(t, s)

ax.set(xlabel='time (s)', ylabel='amplitude', title='Amplitude vs time')
ax.grid()

buf = io.BytesIO()
fig.savefig(buf, format='png')
buf.seek(0)
img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
print(img_str)
`;

    const script = `
import numpy as np
import io, base64		
from js import params

def create_line():
    return np.linspace(0, 2, 2 * int(params[0])).tolist()

return_val = ''.join((str(e) + ",") for e in create_line())

return_val
`;

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
