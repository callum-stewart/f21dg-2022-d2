// All module files in strict mode

/**
 * displays graph loading area
 * @param {boolean} display 
 */
const displayLoadingGraphs = (display) => {
  try {
    const chartArea = document.querySelector(".main-chart-holder");
    if (display) {
      const graphsTemplate = `
  <!--Chart Selection-->
           <div class="col-md-2 chart-selection">
            <div
                style="
                  width: 100%;
                  height: 175px;
                  text-align: center;
                " class="placeholderText m-2"
              >
                <div class="d-flex justify-content-center loading-spinner">
                  <div class="spinner-border" role="status">
                  </div>
                </div>
              </div>
              <div
                style="
                  width: 100%;
                  height: 175px;
                  text-align: center;
                "
                class="placeholderText m-2"
              >
              <div class="d-flex justify-content-center loading-spinner">
                <div class="spinner-border" role="status">
                </div>
              </div>
              </div>
              <div
                style="
                  width: 100%;
                  height: 175px;
                  text-align: center;
                " class="placeholderText m-2"
              >
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
            " >
                <div class="d-flex justify-content-center loading-spinner">
                  <div class="spinner-border" role="status">
                  </div>
                </div>
              </div>
          </div>
  `;
      chartArea.innerHTML = graphsTemplate;
    } else {
      chartArea.innerHTML = "";
    }
  } catch (e) {
    console.error("graphs: displayLoadingGraphs - " + e);
  }
};

export { displayLoadingGraphs };
