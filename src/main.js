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
import * as graph from "./modules/graphs";

const emdBtn = document.querySelector("#emd-btn");
const stftBtn = document.querySelector("#stft-btn");
const uploadBtn = document.querySelector("#upload-btn");
const configBtn = document.querySelector("#config-btn");
const resetBtn = document.querySelector("#reset-btn");
const bookmarkBtn = document.querySelector("#bookmark-btn");

window.addEventListener('DOMContentLoaded', (event) => {
	const info = new InfoPanel(methodInfo);
	const upload = new UploadSignal();
	const config = new ConfigSignal();
    let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	// object representing settings
	sessionStorage.setItem('settings', JSON.stringify(bookmark.paramsToObj(searchParams)));
	var settings = JSON.parse(sessionStorage.getItem('settings'))

	let settingKeys = Object.keys(settings);

	graph.displayLoadingGraphs(false);
	if(settingKeys.length !==0){

	//remove opening instruction message if settings have been set
	if(Object.keys(settings).length){
		displayOpeningMsg(false);
	}

	info.displayInfoPanel(false);
	//need to check for this first as form is dynamically added
	if(settings['dataMethod'] === 'config'){
		config.showConfigureTab();
	}
	// checks if key can be parsed to number to see if its signal data
	if(settings.hasOwnProperty('signals')) {
		settings['signals'].forEach(config.addSignalChip);
	}

	settingKeys.forEach( (key,index) => {
		if(settings['dataMethod']==='upload') {
			upload.showUploadTab();
		}
		if (key==='analysisMethod') {
			info.displayInfoPanel(true);
			info.populatingInfoPanel(settings[key]);
		}
	});

	//BOOTSTRAP INITIALISATIONS
	try {
		//Initialising popovers over all the page
		const bookmarkBtn = document.querySelector("#bookmark-btn");
		var popoverWarning = new bootstrap.Popover(bookmarkBtn);
		
		//Initialising tooltips over all the page
		var tooltipTriggerList = [].slice.call(
			document.querySelectorAll('[data-bs-toggle="tooltip"]')
		);
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});
	} catch (e) {
		console.error("main: bootstrap init - " + e);
	}
	
	}});

emdBtn.addEventListener("click", () => {
	bookmark.addParam('analysisMethod', 'EMD');
        let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	sessionStorage.setItem('settings', JSON.stringify(bookmark.paramsToObj(searchParams)));
	});
stftBtn.addEventListener("click", () => {
    	bookmark.addParam('analysisMethod', 'STFT');
        let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	sessionStorage.setItem('settings', JSON.stringify(bookmark.paramsToObj(searchParams)));
});
uploadBtn.addEventListener("click", () => {
	bookmark.addParam('dataMethod', 'upload');
	bookmark.clearSignalParams();
        let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	sessionStorage.setItem('settings', JSON.stringify(bookmark.paramsToObj(searchParams)));
	});
configBtn.addEventListener("click", () => {
	bookmark.addParam('dataMethod', 'config');
        let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	sessionStorage.setItem('settings', JSON.stringify(bookmark.paramsToObj(searchParams)));
	});
resetBtn.addEventListener("click", () => {
	resetSignalSettings();
	sessionStorage.clear();
        let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	sessionStorage.setItem('settings', JSON.stringify(bookmark.paramsToObj(searchParams)));
	});
bookmarkBtn.addEventListener("click", () => {
	bookmark.bookmarkToClipboard();
	});

// Listening to URL changes (through button clicks)
window.addEventListener("popstate", () => {
	window.location.reload();
});

const pyodideWorker = new Worker("../public/webworker.js");
let pyodidePromise = null;

// Define scripts to be ran
// NOTE!!!: Notice that the scripts MUST be indented as if it was a new python file, e.g. DO NOT FOLLOW ANY JAVASCRIPT CURRENT INDENTATIONS! As you will just get python errors

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
    let htmlOutput = document.getElementById("chart-location");
    setInnerHTML(htmlOutput, s);
}


// Assign event listeners, waiting until page is loaded before attempting to find object.
//document.onreadystatechange = function () {
	//if (document.readyState == "complete") {
		//document.getElementById("runButton").addEventListener("click", handleCallPyodide);	// <-- The 'Run' button
	//}
//}

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
