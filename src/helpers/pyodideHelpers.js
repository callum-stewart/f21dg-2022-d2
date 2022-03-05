/**
	Function that is ran when the button on screen is clicked, 
*/

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
                  .then(data => addToDOM(data, domElement));
}

function addToDOM(s, domElement) {
    let htmlOutput = document.getElementById("chart-location");
    setInnerHTML(htmlOutput, s);
}

export { evaluatePython, handleCallPyodide };
