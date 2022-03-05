// Utilizing Jest as our Unit Testing Framework, for more info: https://github.com/facebook/jest
// To run tests, run: npm test
import InfoPanel from "../src/modules/infoPanel.js";

const mockInfoPanelData = {
  EMD: {
    description: "EMDdescription",
    procons: {
      pros: "EMDpros",
      cons: "EMDcons",
    },
  },
  STFT: {
    description: "STFTdescription",
    procons: {
      pros: "STFTpros",
      cons: "STFTcons",
    },
  },
};

describe('testing infoPanel.js ', () => {
    const info = new InfoPanel(mockInfoPanelData);
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
              <div class="col-md-2 align-self-start info-panel p-4" id="infoPanel">
                  <h2 id="method-name" class="info-panel-content"></h2>
                  <p id="method-info" class="info-panel-content"></p>
                  <h5 id="method-pros-heading" class="info-panel-content">Advantages</h5>
                  <p id="method-pros" class="info-panel-content"></p>
                  <h5 id="method-cons-heading" class="info-panel-content">Disadvantages</h5>
                  <p id="method-cons" class="info-panel-content"></p>
              </div>
              `;
    })
    describe("testing populatingInfoPanel ", () => {
        var methodName;
        beforeEach(()=> {
              methodName = "";
        });
        describe("for STFT ", () => {
          test("correct info ", () => {
            methodName = "STFT";
            info.populatingInfoPanel(methodName);
            expect(document.querySelector("#method-name").innerHTML).toBe("STFT");
            expect(document.querySelector("#method-info").innerHTML).toBe(
              "STFTdescription"
            );
            expect(document.querySelector("#method-pros").innerHTML).toBe("STFTpros");
            expect(document.querySelector("#method-cons").innerHTML).toBe("STFTcons");
          });
          test(" button changes", () => {
            methodName = "STFT";
            info.populatingInfoPanel(methodName);
            expect(document.querySelector("#stft-btn")).toHaveClass("active-dark");
            expect(document.querySelector("#emd-btn")).not.toHaveClass("active-dark");
          });
        });
        describe('for EMD ', () => {
            test('correct info ', () => {
                methodName = 'EMD';
                info.populatingInfoPanel(methodName);
                expect(document.querySelector("#method-name").innerHTML).toBe('EMD');
                expect(document.querySelector("#method-info").innerHTML).toBe('EMDdescription');
                expect(document.querySelector("#method-pros").innerHTML).toBe('EMDpros');
                expect(document.querySelector("#method-cons").innerHTML).toBe('EMDcons');
            });
            test(" button changes", () => {
                methodName = 'EMD';
                info.populatingInfoPanel(methodName);
                expect(document.querySelector("#stft-btn")).not.toHaveClass('active-dark');
                expect(document.querySelector("#emd-btn")).toHaveClass('active-dark');
            });
        });
        describe("for invalid ", () => {
          test("correct info ", () => {
            info.populatingInfoPanel(methodName);
            expect(document.querySelector("#method-name").innerHTML).toBe("");
          });
          test(" button changes", () => {
            info.populatingInfoPanel(methodName);
            expect(document.querySelector("#stft-btn")).not.toHaveClass("active-dark");
            expect(document.querySelector("#emd-btn")).not.toHaveClass("active-dark");
          });
        });
      });
      describe("testing displayInfoPanel ", () => {
        var display;
        beforeEach(()=> {
            display = false;
        });
          test("hidepanel ", () => {
            info.displayInfoPanel(display);
            expect(document.querySelector("#method-name")).toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-info")).toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-pros-heading")).toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-cons-heading")).toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-pros")).toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-cons")).toHaveClass("hide-info-panel");
          });
          test("showpanel", () => {
            display = true;
            info.displayInfoPanel(display);
            expect(document.querySelector("#method-name")).not.toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-info")).not.toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-pros-heading")).not.toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-cons-heading")).not.toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-pros")).not.toHaveClass("hide-info-panel");
            expect(document.querySelector("#method-cons")).not.toHaveClass("hide-info-panel");
          });
      });
});


