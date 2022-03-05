// Utilizing Jest as our Unit Testing Framework, for more info: https://github.com/facebook/jest
// To run tests, run: npm test
import * as graphs from "../src/modules/graphs";

describe("testing graphs.js ", () => {
  let display;
  const graphsTemplate = `
  <!--Chart Selection-->
           <div class="col-md-2 chart-selection">
            <div style="
                  width: 100%;
                  height: 175px;
                  text-align: center;
                " class="placeholderText m-2">
                <div class="d-flex justify-content-center loading-spinner">
                  <div class="spinner-border" role="status">
                  </div>
                </div>
              </div>
              <div style="
                  width: 100%;
                  height: 175px;
                  text-align: center;
                " class="placeholderText m-2">
              <div class="d-flex justify-content-center loading-spinner">
                <div class="spinner-border" role="status">
                </div>
              </div>
              </div>
              <div style="
                  width: 100%;
                  height: 175px;
                  text-align: center;
                " class="placeholderText m-2">
              <div class="d-flex justify-content-center loading-spinner">
                <div class="spinner-border" role="status">
                </div>
              </div>
              </div>
          </div>
          <div class="col-md-10">
              <div class="placeholderText main-chart p-2 m-2" style="
              width: 100%;
              height: 550px;
              text-align: center;
            ">
                <div class="d-flex justify-content-center loading-spinner">
                  <div class="spinner-border" role="status">
                  </div>
                </div>
              </div>
          </div>
  `;
  describe('testing displayLoadingGraphs', () => {
    let chartArea;
    afterEach(() => {
      jest.clearAllMocks();
    });
    beforeEach(() => {
      document.body.innerHTML = `
            <div class="main-chart-holder"></div>
                `;
      chartArea = document.querySelector(".main-chart-holder");
    });
    test("displayed ", () => {
      display = true;
      graphs.displayLoadingGraphs(display);
      expect(chartArea.innerHTML).toBe(graphsTemplate);
      
    });
    test("hidden ", () => {
      display = false;
      graphs.displayLoadingGraphs(display);
      expect(chartArea.innerHTML).toBe('');
    });
  })
  
});
