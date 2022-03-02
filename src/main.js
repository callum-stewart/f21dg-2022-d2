// main.js
// Main javascript file, this is loaded upon page load.
// Note: It should be loaded as type:"module", to allow importing functions from other js files.

// import { asyncRun } from "./pyworker.js";
import InfoPanel from "./modules/infoPanel";
import UploadSignal from "./modules/uploadSignal";
import ConfigSignal from "./modules/configSignal";
import {resetSignalSettings, displayOpeningMsg} from "./modules/reset";
import * as bookmark from "./modules/bookmark";
import methodInfo from "../public/methodInfo.json";

const info = new InfoPanel(methodInfo);
const upload = new UploadSignal();
const config = new ConfigSignal();

const emdBtn = document.querySelector("#emd-btn");
const stftBtn = document.querySelector("#stft-btn");
const uploadBtn = document.querySelector("#upload-btn");
const configBtn = document.querySelector("#config-btn");
const resetBtn = document.querySelector("#reset-btn");
const bookmarkBtn = document.querySelector("#bookmark-btn");

window.addEventListener('DOMContentLoaded', (event) => {
    let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	// object representing settings
	sessionStorage.setItem('settings', JSON.stringify(bookmark.paramsToObj(searchParams)));
	var settings = JSON.parse(sessionStorage.getItem('settings'));

	//remove opening instruction message if settings have been set
	if(Object.keys(settings).length){
		displayOpeningMsg(false);
	}
	let settingKeys = Object.keys(settings);

	//need to check for this first as form is dynamically added
	if(settings['dataMethod'] === 'config'){
		config.showConfigureTab();
	}

	settingKeys.forEach( (key,index) => {
		if(settings['dataMethod']==='upload') {
			upload.showUploadTab();
		}
		if (key==='analysisMethod') {
			info.populatingInfoPanel(settings[key]);
		}
		// checks if key can be parsed to number to see if its signal data
		if(+key) {
			config.addSignalChip(settings[key]);
		}
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

	var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
	var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
        return new bootstrap.Offcanvas(offcanvasEl)
		});
		
});

emdBtn.addEventListener("click", () => {
	bookmark.addParam('analysisMethod', 'EMD');
	});
stftBtn.addEventListener("click", () => {
	bookmark.addParam('analysisMethod', 'STFT');
});
uploadBtn.addEventListener("click", () => {
	bookmark.addParam('dataMethod', 'upload');
	bookmark.clearSignalParams();
	});
configBtn.addEventListener("click", () => {
	bookmark.addParam('dataMethod', 'config');
	});
resetBtn.addEventListener("click", () => {
	resetSignalSettings();
	sessionStorage.clear();
	});
bookmarkBtn.addEventListener("click", () => {
	bookmark.bookmarkToClipboard();
	});

// Listening to URL changes
window.addEventListener("popstate", () => {
	window.location.reload();
});

const pyodideWorker = new Worker("../public/webworker.js");
let pyodidePromise = null;

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

var setInnerHTML = function(elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes)
      .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

// Helper functions
function addToOutput(s) {
    let htmlOutput = document.getElementById("htmlOutput");
    setInnerHTML(htmlOutput, s);
}


// Assign event listeners, waiting until page is loaded before attempting to find object.
document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		document.getElementById("runButton").addEventListener("click", handleCallPyodide);	// <-- The 'Run' button
	}
}

/**
	Function that is ran when the button on screen is clicked, 
*/
function evaluatePython() {
    return new Promise((resolve, reject) => {

      function handleWorkerMessage(e){
        if (e.data === "pyodide_not_available") {
          // pyodide didn't load properly
          reject('Pyodide not available for calculations. Try refreshing page or using a different browser.');
        } else {
          resolve(e.data)
        }
      }
      const value = document.getElementById('code').value;
      pyodideWorker.onmessage = handleWorkerMessage;
      pyodideWorker.postMessage(value);

    });
}

function handleCallPyodide() {
    pyodidePromise = evaluatePython()
                  .then(data => addToOutput(data));
}
