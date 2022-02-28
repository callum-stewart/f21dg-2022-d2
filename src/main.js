// main.js
// Main javascript file, this is loaded upon page load.
// Note: It should be loaded as type:"module", to allow importing functions from other js files.



import { asyncRun } from "./pyworker.js";

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

// Assign event listeners
document.querySelector('button').addEventListener("click", evaluatePython);


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
		const { results, error } = await asyncRun(script, context);

		// If the results are valid
		if (results) {
			// Parse results by commas, then add to output array
			let results_array = results.split(",");

			addToOutput(results_array);

		} else if (error) {
			console.log("pyodideWorker error: ", error);
		}
	} catch (e) {
		console.log(
			`Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
		);
	}
}
