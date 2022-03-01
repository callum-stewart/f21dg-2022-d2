"use strict";

importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");

let pyodideReady = false;
let pyFuncs;

async function setupPyodide() {
  try {
    const pyodide = await self.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.19.0/full/'});
    await pyodide.loadPackage(['numpy', 'scipy']);
    const response = await fetch("script.py");
    const pythonScript = await response.text();
    pyFuncs = pyodide.runPython(pythonScript);
    console.log('Python Ready');
    pyodideReady = true;
  } catch(e) {
    console.error('Python loading failed.');
    console.error(e);
  }
}

const pyodidePromise = setupPyodide();

self.onmessage = async function(e){
  await pyodidePromise;
  if (!pyodideReady) {
    postMessage("pyodide_not_available");
    return;
  }

  const result = pyFuncs.stft_analysis(parseInt(e.data));

  postMessage(JSON.parse(result));
}
