/**
	Function that is ran when the button on screen is clicked, 
*/

import { Waterfall, drawSpectrogram } from '../modules/spectrogram';

const pyodideWorker = new Worker("../public/webworker.js");
let pyodidePromise = null;

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
      let settings = JSON.parse(sessionStorage.getItem('settings'));
      if (settings === null || settings === {}) {
        reject('operation not specified, sessionStorage for settings is empty');
      }
      if (settings['dataMethod'] === 'upload') {
        const uploadData = JSON.parse(sessionStorage.getItem('CSV_DATA_FOR_F21DG'));
	if (uploadData === null) {
          reject('dataMethod specified but no data uploaded');
	} else {
	  settings['signalData'] = uploadData;
	}
      }
      pyodideWorker.onmessage = handleWorkerMessage;
      pyodideWorker.postMessage(settings);

    });
}

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

function handleCallPyodide(domElement) {
    pyodidePromise = evaluatePython()
                  .then(data => handleOutput(data, domElement));
}

function handleOutput(s, domElement) {
    const output = JSON.parse(s); 
    if (output.hasOwnProperty('stft_data')) { 
        let htmlOutput = document.getElementById("chart-location");
	//htmlOutput.className = "";
        setInnerHTML(htmlOutput, output['before_html']);
        //var w = new Waterfall("#chart-location", 900, 400);
        //drawSpectrogram(w, output['stft_data']);
    } else if (typeof output === 'object' && output !== null) {
        let htmlOutput = document.getElementById("chart-location");
	htmlOutput.className = "row align-items-start justify-content-center main-chart-holder"
        setInnerHTML(htmlOutput, output['html']);
    }

    
}

export { evaluatePython, handleCallPyodide };
