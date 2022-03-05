// Utilizing Jest as our Unit Testing Framework, for more info: https://github.com/facebook/jest
// To run tests, run: npm test
import UploadSignal from "../src/modules/uploadSignal";
import * as reset from "../src/modules/reset";
import * as fileIO from "../src/fileIO.js";
import * as graphs from "../src/modules/graphs";

describe("testing upload.js ", () => {
  let signalBar;
  const upload = new UploadSignal;
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    document.body.innerHTML = `
          <nav class="nav nav-tabs pt-2">
          <a id="emd-btn" class="nav-link" href="#">EMD</a>
          <a id="stft-btn" class="nav-link" href="#">STFT</a>
          <a id="upload-btn" class="nav-link" href="#">Upload Signal</a>
          <a id="config-btn" class="nav-link" href="#">Create Signal</a>
          <a id="reset-btn" class="nav-link disabled" href="#">Reset Input Signal</a>
          <!--bookmark-->
          <button type="button" id="bookmark-btn" class="btn btn-warning bi bi-bookmark float-end" role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content="URL has been copied to clipboard, Use this to share and save your settings!" data-bs-placement="bottom"></button>
      </nav>
      <div class="signal-section">
              `;
      signalBar = document.querySelector(".signal-section");
  });
  test("testing showUploadTab ", () => {
    const displayLoadingGraphsMock = jest.spyOn(graphs ,"displayLoadingGraphs");
    const parseFileMock = jest.spyOn(fileIO ,"parseFile");
    const allowResetSignalMock = jest.spyOn(reset,'allowResetSignal');
    upload.showUploadTab();
    expect(document.querySelector("#upload-btn")).toHaveClass("active");
    expect(document.querySelector("#config-btn")).not.toHaveClass("active");
    expect(signalBar.innerHTML).toBe(uploadTemplate);
    expect(allowResetSignalMock).toHaveBeenCalled();
  });
});
