// Utilizing Jest as our Unit Testing Framework, for more info: https://github.com/facebook/jest
// To run tests, run: npm test
import * as reset from "../src/modules/reset.js";
import * as bookmark from "../src/modules/bookmark";
import * as graphs from "../src/modules/graphs";

describe('testing reset.js ', () => {
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
              <div class="starting-instructions"></div>
              <div class="signal-section"></div>
              `;
    })
    describe("testing allowResetSignal ", () => {
        test("reset button enabled ", () => {
          reset.allowResetSignal();
          expect(document.querySelector("#reset-btn")).not.toHaveClass("disabled");
        });
      });
    describe("testing displayOpeningMsg ", () => {
        var display, openingMsg;
        beforeEach(()=> {
          display = '';
          openingMsg = document.querySelector(".starting-instructions");
        });
        
        test("display opening message ", () => {
          display = true
          reset.displayOpeningMsg(display);
          expect(openingMsg).not.toHaveClass("hide");
          expect(openingMsg).toHaveClass("d-flex");
        });
        test("hide opening message ", () => {
          display = false
          reset.displayOpeningMsg(display);
          expect(openingMsg).toHaveClass("hide");
          expect(openingMsg).not.toHaveClass("d-flex");
        });
      });
    describe("testing resetSignalSettings ", () => {
        var signalBar;
        beforeEach(()=> {
          signalBar = document.querySelector(".signal-section");
        });
        test("reseting page ", () => {
          const clearURLParamsMock = jest.spyOn(bookmark,'clearURLParams');
          const displayLoadingGraphs = jest.spyOn(graphs,'displayLoadingGraphs');
          const displayOpeningMsgMock = jest.spyOn(reset,'displayOpeningMsg');
          reset.resetSignalSettings();
          expect(document.querySelector("#stft-btn")).not.toHaveClass("active-dark");
            expect(document.querySelector("#emd-btn")).not.toHaveClass("active-dark");
            expect(document.querySelector("#config-btn")).not.toHaveClass("active");
            expect(document.querySelector("#upload-btn")).not.toHaveClass("active");
            expect(document.querySelector("#reset-btn")).toHaveClass("disabled");
            expect(signalBar.innerHTML).toBe("");
            expect(displayOpeningMsgMock).toHaveBeenCalledWith(true);
            expect(clearURLParamsMock).toHaveBeenCalled();
            expect(displayLoadingGraphs).toHaveBeenCalledWith(false);
        });
      });
});


