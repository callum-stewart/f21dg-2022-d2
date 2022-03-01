// All module files in strict mode
import {allowResetSignal} from "./reset";

export default class UploadSignal {
    uploadSignalFile = () => {
        let files = document.querySelector("#signalFile").files;
        console.log(files);
        //DO SOMETHING WITH FILES :)
    };

    showUploadTab = () => {
        const signalBar = document.querySelector(".signal-section");
        document.querySelector("#upload-btn").classList.add("active");
        document.querySelector("#config-btn").classList.remove("active");
        // addParam('dataMethod', 'upload');

        const uploadTemplate = `
                <div class="col-md-12 upload-signal p-4">
                    <h4>Signal Upload</h4>
                    <p>Upload your signal file and select your chosen decomposition method to produce your graphs.
                    </p>
                    <form class="form-example g-3">
                        <div class="mb-3 col-md-6">
                            <label for="signalFile" class="form-label">Browse for a signal file (.csv)</label>
                            <input class="form-control" type="file" id="signalFile">
                        </div>
                    </form>
                </div>
                <div class="mb-3 col-md-12 upload-bottom-bar p-2">
                    <button id="upload-load-graphs" type="button" class="btn btn-dark float-end">
                        Generate graphs
                    </button>
                </div>
                `;
        signalBar.innerHTML = uploadTemplate;
        const uploadGenGraphBtn = document.querySelector("#upload-load-graphs");
        uploadGenGraphBtn.addEventListener("click", () => {
            this.uploadSignalFile();
        });
        allowResetSignal();
    };
    
    
}