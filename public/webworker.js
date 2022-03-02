"use strict";

importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");

let pyodideReady = false;
let pyFuncs;

async function setupPyodide() {
  try {
    const pyodide = await self.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.19.0/full/'});
    await pyodide.loadPackage(['numpy', 'scipy', 'micropip']);
    await pyodide.runPythonAsync(`
      import micropip
      await micropip.install('https://files.pythonhosted.org/packages/4c/9b/b3d239463d0e19cc748e183fde3521285e2d6049895bf6fe62703488e093/pyhht-0.1.0-py3-none-any.whl', keep_going=True)
      await micropip.install('https://files.pythonhosted.org/packages/9e/38/3cba20b12e7e06ec82fa57a9b6cde363903350b6b54754902acf2673c46b/mpld3-0.5.7-py3-none-any.whl', keep_going=True)

    `);

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
