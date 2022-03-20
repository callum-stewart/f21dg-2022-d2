// All module files in strict mode

import { allowResetSignal } from "./reset";
import { parseFile } from "../fileIO.js";
import { displayLoadingGraphs } from "./graphs";
import { handleCallPyodide } from "../helpers/pyodideHelpers";
import { paramsToObj, addParam } from "./bookmark";

export default class UploadSignal {
  /**
   * loads in the upload tab with file input
   */
  showUploadTab = () => {
    try {
      const signalBar = document.querySelector(".signal-section");
      document.querySelector("#upload-btn").classList.add("active");
      document.querySelector("#config-btn").classList.remove("active");

      const uploadTemplate = `
                <div class="col-md-12 upload-signal p-4">
                    <h4>Signal Upload 
                      <a onclick="introJs().goToStepNumber(7).start()"><i class="bi bi-question-circle"></i></a>
                    </h4>
                    <p>Upload your signal file and select your chosen decomposition method to produce your graphs.
                    </p>
                    <form class="form-example g-3">
                        <div class="mb-3 col-md-6">
                            <label for="signalFile" class="form-label">Browse for a signal file (.csv)</label>
                            <input class="form-control" type="file" id="csvFileInput" accept=".csv" data-title="Upload your file" data-intro="Add your time series file in the form of an .csv file by browsing your computer’s files." data-step="7">
			    <br/>
                            <label for="nperseg-selector" class="form-label">Length of each segment for STFT analysis</label>
			    <br/>
			    <select name="Length of each segment" id="nperseg-selector">
				<option value="64">64</option>
				<option value="128">128</option>
				<option value="256" selected>256</option>
				<option value="512">512</option>
				<option value="1024">1024</option>
				<option value="2048">2048</option>
				<option value="64">64</option>
				<option value="64">64</option>
				<option value="64">64</option>

			    </select>
                        </div>
                        <div id="status" data-title="Confirm upload..." data-intro="Once you receive a confirmation message here your file has completed uploading." data-step="8"></div>
                    </form>
                </div>
                <div class="mb-3 col-md-12 upload-bottom-bar p-2">
                    <button id="generate-upload-graph" type="button" class="btn btn-dark float-end" data-title="Have a look!" data-intro="Click on generate graphs to start the decomposition!" data-step="9">
                        Generate graphs
                    </button>
                </div>
                `;
      signalBar.innerHTML = uploadTemplate;
      const uploadFile = document.querySelector("#csvFileInput");
      uploadFile.addEventListener("change", () => {
        parseFile();
      });
      const uploadGenGraphBtn = document.querySelector(
        "#generate-upload-graph"
      );
      uploadGenGraphBtn.addEventListener("click", () => {
        // parseFile();
        displayLoadingGraphs(true);
	addParam('nperseg', document.getElementById("nperseg-selector").value);
	      const chartLocation = document.querySelector("#chart-location");
	      handleCallPyodide(chartLocation);
      });
      allowResetSignal();
    } catch (e) {
      console.error("uploadSignal: showUploadTab - " + e);
    }
  };
}
