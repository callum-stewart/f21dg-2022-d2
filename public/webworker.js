// webworker.js
// This file loads the pyodide instance and sets everything up, including the requirements we need
// You should not need to edit this file, its just a handler, see the main.js file to add content.
importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/",
  });
  await self.pyodide.loadPackage(["numpy", "scipy"]);
}
let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  // Wait for pyodide to finish loading first
  await pyodideReadyPromise;

  const { id, python, ...context } = event.data;
  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }
  // Import packages, run arbitrary python code, and return results!
  try {
    await self.pyodide.loadPackagesFromImports(python);
    let results = await self.pyodide.runPythonAsync(python);
    self.postMessage({ results, id });
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }
};