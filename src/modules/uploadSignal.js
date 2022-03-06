// All module files in strict mode

import { allowResetSignal } from "./reset";
import { parseFile } from "../fileIO.js";
import { displayLoadingGraphs } from "./graphs";
// import { handleCallPyodide } from "../helpers/pyodideHelpers";

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
                    <h4>Signal Upload</h4>
                    <p>Upload your signal file and select your chosen decomposition method to produce your graphs.
                    </p>
                    <form class="form-example g-3">
                        <div class="mb-3 col-md-6">
                            <label for="signalFile" class="form-label">Browse for a signal file (.csv)</label>
                            <input class="form-control" type="file" id="csvFileInput" accept=".csv">
                        </div>
                        <div id="status"></div>
                    </form>
                </div>
                <div class="mb-3 col-md-12 upload-bottom-bar p-2">
                    <button id="generate-upload-graph" type="button" class="btn btn-dark float-end">
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
	      const chartLocation = document.querySelector("#chart-location");
	      // handleCallPyodide(chartLocation);
      });
      allowResetSignal();
    } catch (e) {
      console.error("uploadSignal: showUploadTab - " + e);
    }
  };
}
