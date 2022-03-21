// All module files in strict mode
import { allowResetSignal } from "./reset";
import { addSignalParam, removeSignalParam, editSignalParam, paramsToObj, addParam } from "./bookmark";
import { displayLoadingGraphs } from "./graphs";
import { handleCallPyodide } from "../helpers/pyodideHelpers";

export default class ConfigSignal {
  constructor() {
    //has to start at 1 as 0 parsed into number is NaN (from URL to obj convert)
    const signalCount = sessionStorage.getItem('signalCount');
    this.signalCount = (signalCount !== null) ? signalCount : 1;
  }

  /**
   * controls hiding of delete button on config form
   * @param {boolean} display 
   */
  displayDeleteBtn = (display) => {
    try {
      const deleteBtn = document.querySelector("#delete-signal");
      if (display) {
        deleteBtn.classList.add("btn");
        deleteBtn.classList.remove("hide");
      } else {
        deleteBtn.classList.remove("btn");
        deleteBtn.classList.add("hide");
      }
    } catch (e) {
      console.error("configSignal: displayDeleteBtn - " + e);
    }
  };

  /**
   * controls hiding of add button on config form
   * @param {boolean} display 
   */
  displayAddBtn = (display) => {
    try {
      const tickBtn = document.querySelector("#submit-signal");
      if (display) {
        tickBtn.classList.add("btn");
        tickBtn.classList.remove("hide");
      } else {
        tickBtn.classList.remove("btn");
        tickBtn.classList.add("hide");
      }
    } catch (e) {
      console.error("configSignal: displayAddBtn - " + e);
    }
  };

  /**
   * controls hiding of edit button on config form
   * @param {boolean} display 
   */
  displayEditBtn = (display) => {
    try {
      const tickBtn = document.querySelector("#edit-signal");
      if (display) {
        tickBtn.classList.add("btn");
        tickBtn.classList.remove("hide");
      } else {
        tickBtn.classList.remove("btn");
        tickBtn.classList.add("hide");
      }
    } catch (e) {
      console.error("configSignal: displayEditBtn - " + e);
    }
  };

  /**
   * Changes form based on signal type (adds html template to div)
   */
  changeFormTemplate = () => {
    try {
      const signalSelect = document.querySelector("#signal-select");
      const signalInputs = document.querySelector("#signal-param-inputs");
      let formTemplate = "";
      switch (signalSelect.value) {
        case "sinusoid":
          formTemplate = `
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-phase" placeholder="0.1" required>
                        <label for="floatingInput">Phase</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-frequency" placeholder="0.1" required>
                        <label for="floatingInput">Frequency</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-amplitude" placeholder="0.1" required>
                        <label for="floatingInput">Amplitude</label>
                    </div>
                    `;
          break;
        case "chirp":
          formTemplate = `
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="chirp-frequency" placeholder="0.1" required>
                        <label for="floatingInput">Intial frequency</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="chirp-rate" placeholder="0.1" required>
                        <label for="floatingInput">Chirp rate</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="chirp-amplitude" placeholder="0.1" required>
                        <label for="floatingInput">Amplitude</label>
                    </div>
                    `;
          break;
        case "trend":
          formTemplate = `
                    <div class="mb-3">
                        <select
                            class="form-select"
                            aria-label="Default select example"
                            id="trend-trendType"
                        >
                            <option selected value='none'>Select trend type</option>
                            <option value="exponential">Exponential</option>
                            <option value="linear">Linear</option>
                            <option value="polynomial">Polynomial</option>
                      </select>  
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="trend-alpha" required>
                        <label for="floatingInput">α co-efficient</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="trend-beta" required>
                        <label for="floatingInput">β co-efficient</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="trend-gamma" required>
                        <label for="floatingInput">γ co-efficient</label>
                    </div>
                    `;
          break;
        case "colour-noise":
          formTemplate = `
                    <div class="mb-3">
                        <select
                            class="form-select"
                            aria-label="Default select example"
                            id="colournoise-colour"
                        >
                            <option selected value="none">Select noise colour</option>
                            <option value="white">White</option>
                            <option value="brownian">Brownian</option>
                            <option value="blue">Blue</option>
                            <option value="violet">Violet</option>
                            <option value="pink">Pink</option>
                      </select>  
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="colournoise-seed" required>
                        <label for="floatingInput">Seed value</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="colournoise-amprollfactor" required>
                        <label for="floatingInput">Amplitude roll factor</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="colournoise-variance" required>
                        <label for="floatingInput">Variance</label>
                    </div>
                    `;
          break;
        case "shot-noise":
          formTemplate = `
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" placeholder="0.1" id="shotnoise-seed" required>
                            <label for="floatingInput">Seed value</label>
                        </div>
                        `;
          break;
        case "finance-data":
          break;
        default:
          formTemplate = `
                    <div class="mb-3 no-signal-selected-msg">
                        <h4>No signal type selected</h4>
                    </div>
                    `;
      }
      signalInputs.innerHTML = formTemplate;
    } catch (e) {
      console.error("configSignal: changeFormTemplate - " + e);
    }
  };

  /**
   * Populates signal data into form for editing, triggers when changing signals loaded from URL
   * @param {object} signalData 
   */
  populateSettingsForm = (signalData) => {
    try {
      // Delete signal button
      this.displayDeleteBtn(true);
      this.displayAddBtn(false);
      this.displayEditBtn(true);

      let data = JSON.parse(signalData);
      const signalSelect = document.querySelector("#signal-select");
      const deleteBtn = document.querySelector("#delete-signal");
      const editBtn = document.querySelector("#edit-signal");

      signalSelect.value = data.type;
      this.changeFormTemplate(data.type);
      //datatype without dash
      let idSelector = data.type.replace(/-|\s/g, "");
      for (var field in data) {
        if (field === "id" || field === "type") {
          continue;
        }
        //setting the input values using id names [type of signal]-[signal number]
        document.querySelector(`#${idSelector}-${field}`).value = data[field];
      }
      deleteBtn.addEventListener("click", () => {
        removeSignalParam(data.id);
        this.signalCount--;
        sessionStorage.setItem('signalCount', this.signalCount);
        window.location.reload();
      });

      editBtn.addEventListener("click", () => {
        //signalData gets all data from form values but uses incorrect id as assigned from counter (use getEditSignalData to get around this)
        let currentChangeData = this.getEditSignalData(
          this.currentSignal.id,
          this.getSignalData()
        );
        editSignalParam(this.currentSignal.id, currentChangeData);
        window.location.reload();
      });
    } catch (e) {
      console.error("configSignal: populateSettingsForm - " + e);
    }
  };

  /**
   * Replaces form data with correct id when editing signal
   * 
   * @param {string} id 
   * @param {object} data 
   * @returns {object} data from form with correct ID
   */
  getEditSignalData = (id, data) => {
    try {
      data.id = id;
      return data;
    } catch (e) {
      console.error("configSignal: getEditSignalData - " + e);
    }
  };

  /**
   * Adds signal chip/button to the signal hold div with click event to trigger edit form
   * @param {object} signalData of the signal submitted with the form
   */
  addSignalChip = (signalData) => {
    try {
      const noSignal = document.querySelector("#no-signal-msg");
      const signalRow = document.querySelector(".signals");
      const signalsHolder = document.querySelector(".signal-hold");
      const signal = document.createElement("button");
      const signalId = signalData.type + signalData.id;
      if (noSignal) {
        noSignal.remove();
        signalRow.classList.remove("align-text-center");
        signalRow.classList.remove("align-items-center");
        signalRow.classList.add("justify-content-start");
      }
      signal.setAttribute("type", "button");
      signal.setAttribute("class", "btn btn-outline-light m-1 signal-chip");
      signal.setAttribute("id", signalId);
      signal.addEventListener("click", () => {
        this.currentSignal = signalData;
        this.populateSettingsForm(JSON.stringify(signalData));
      });
      signal.innerText = signalData.type + " " + signalData.id;
      signalsHolder.appendChild(signal);
    } catch (e) {
      console.error("configSignal: addSignalChip - " + e);
    }
  };

  /**
   * Returns signal data with the current signal count as the id 
   * 
   * @returns {object} signal data from form inputs as submit type button not used
   */
  getSignalData = () => {
    try {
      const signalType = document.querySelector("#signal-select").value;
      let signalData = {
        id: this.signalCount,
        type: signalType,
      };
      switch (signalData.type) {
        case "sinusoid":
          signalData.phase = document.querySelector("#sinusoid-phase").value;
          signalData.frequency = document.querySelector(
            "#sinusoid-frequency"
          ).value;
          signalData.amplitude = document.querySelector(
            "#sinusoid-amplitude"
          ).value;
          break;
        case "chirp":
          signalData.frequency =
            document.querySelector("#chirp-frequency").value;
          signalData.rate = document.querySelector("#chirp-rate").value;
          signalData.amplitude =
            document.querySelector("#chirp-amplitude").value;
          break;
        case "trend":
          signalData.trendType =
            document.querySelector("#trend-trendType").value;
          signalData.alpha = document.querySelector("#trend-alpha").value;
          signalData.beta = document.querySelector("#trend-beta").value;
          signalData.gamma = document.querySelector("#trend-gamma").value;
          break;
        case "colour-noise":
          signalData.colour = document.querySelector("#colournoise-colour").value;
          signalData.seed = document.querySelector("#colournoise-seed").value;
          signalData.amprollfactor = document.querySelector(
            "#colournoise-amprollfactor"
          ).value;
          signalData.variance = document.querySelector(
            "#colournoise-variance"
          ).value;
          break;
        case "shot-noise":
          signalData.seed = document.querySelector("#shotnoise-seed").value;
          break;
        case "finance-data":
          break;
        default:
      }
      return signalData;
    } catch (e) {
      console.error("configSignal: addSignalChip - " + e);
    }
  };

  /**
   * Adds a signal chip and increments signal counter
   * 
   * @param {object} signalData 
   */
  addSignal = (signalData) => {
    try {
      // let signalData = this.getSignalData();
      this.addSignalChip(signalData);
      let url = window.location.search;
      let searchParams = new URLSearchParams(url);
      sessionStorage.setItem('settings', JSON.stringify(paramsToObj(searchParams)));
      this.signalCount++;
      sessionStorage.setItem('signalCount', this.signalCount);
    } catch (e) {
      console.error("configSignal: addSignal - " + e);
    }
  };

  /**
   * Loads configure/create signal tab
   */
  showConfigureTab = () => {
    try {
      document.querySelector("#config-btn").classList.add("active");
      document.querySelector("#upload-btn").classList.remove("active");
      allowResetSignal();

      const signalBar = document.querySelector(".signal-section");
      const configureTemplate = `
          <!--Signal Selection-->
          <div class="col-md-6 signal-selection">
            <div class="row signals p-5 align-text-center align-items-center" style="height:350px;">
              <div class="col-md-12 signal-hold" data-title="View your signals..." data-intro="Your signal will appear here as a button that you can click to view, edit and delete your signal data as you need." data-step="11">
                  <h2 class="text-center" id="no-signal-msg">No signals configured <br/> <i class="bi bi-file-earmark-excel"></i></h2>
              </div>
            </div>
            <div class="row align-items-end combination-bar p-2">
              <div class="col-md-6 ">
                <select
                  class="form-select"
                  id="combination-method"
                  aria-label="Default select example"
                  data-bs-toggle="tooltip" data-bs-placement="right" 
                  title="Choosing the sum method will limit the signal types possible for combination to sinusoid and trends only"
                  data-title="Choose your method" data-intro="Once you finish creating your time series components you can select a combination method (either sum or product) which will be used to either add or multiply your signals together." data-step="12"
                >
                  <option selected>Select combination method</option>
                  <option value="1">Sum</option>
                  <option value="2">Product</option>
                </select>
              </div>
              <div class="col-md-6">
                <button type="button" id="generate-config-graph" class="btn btn-dark float-end" data-title="Have a look!" data-intro="Finally, click on generate graphs to start the decomposition!" data-step="13">
                  Generate graphs
                </button>
              </div>
            </div>
          </div>
           <!--Signal Config-->
           <div class="col-md-6 signal-configuration p-4">
              <h4>Signal Configuration Settings 
                  <a class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#signalInfoModal"><i class="bi bi-info-circle"></i></a>
                  <a onclick="introJs().goToStepNumber(10).start()"><i class="bi bi-question-circle"></i></a>
              </h4>
              <p>Configure your signal by selecting a signal type below and filling in all the parameter fields with your desired values.</p>
              <form class="form-example g-3" id="signal-form" >
                  <div class="signal-parameters">
                      <div class="mb-3">
                          <select
                          id="signal-select" 
                          class="form-select"
                          aria-label="Default select example"
                          placeholder="Select signal type"
                          required
                          data-title="Create your signals..." data-intro="Add signal type by selecting your chosen type here and filling in the form that will appear below." data-step="10"
                        >
                          <option value="default" selected="selected">Select signal type</option>
                          <option value="sinusoid">Sinusoid</option>
                          <option value="chirp">Chirp</option>
                          <option value="trend">Trend</option>
                          <option value="colour-noise">White/Coloured Noise</option>
                          <option value="shot-noise">Poisson/Shot Noise</option>
                          <option value="finance-data">Financial Data</option>
                        </select>  
                      </div>
                      <div id="signal-param-inputs">
                      </div>
                    </div>
                    <btn class="btn btn-dark test-btns" id="delete-signal" type="button">
                      <i class="bi bi-trash text-light"></i>
                    </btn>
                    <btn class="btn btn-primary float-end test-btns" id="submit-signal" aria-label="Default select example" data-bs-toggle="popover" data-bs-trigger="click" data-bs-placement="bottom" data-bs-content="You have reached the max signal limit.">
                      <i class="bi bi-check2 text-light"></i>
                    </btn>
                    <btn class="btn btn-primary float-end test-btns" id="edit-signal" type="button">
                      <i class="bi bi-check2 text-light"></i>
                    </btn>
              </form>
            <div>
              
            </div>
          </div>
                  `;
      signalBar.innerHTML = configureTemplate;
      const signalSelect = document.querySelector("#signal-select");

      // Delete signal button
      this.displayDeleteBtn(false);
      this.displayAddBtn(false);
      this.displayEditBtn(false);
      signalSelect.addEventListener("change", (e) => {
        const form = document.querySelector("#signal-form");
        this.changeFormTemplate(signalSelect.value);
        this.displayDeleteBtn(false);
        this.displayAddBtn(true);
        this.displayEditBtn(false);
        if (signalSelect.value === "default") {
          this.displayAddBtn(false);
        }
      });
      const submitBtn = document.querySelector("#submit-signal");
      var popoverWarning = new bootstrap.Popover(submitBtn);
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.signalCount < 11) {
          const signalInfo = this.getSignalData();
          this.addSignal(signalInfo);
          addSignalParam(signalInfo.id, signalInfo);
          window.location.reload;
          popoverWarning.hide();
        }
        const combMethod = document.querySelector("#combination-method");
        addParam('combinationMethod', (combMethod.value === '2') ? 'product' : 'sum');
        let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	sessionStorage.setItem('settings', JSON.stringify(paramsToObj(searchParams)));
      });

      const combinationMethod = document.querySelector(
        "#combination-method"
      );
      combinationMethod.addEventListener("change", () => {
        const combMethod = document.querySelector("#combination-method");
        addParam('combinationMethod', (combMethod.value === '2') ? 'product' : 'sum');
        let url = window.location.search;
	let searchParams = new URLSearchParams(url);
	sessionStorage.setItem('settings', JSON.stringify(paramsToObj(searchParams)));
      });
      const configGenGraphBtn = document.querySelector(
        "#generate-config-graph"
      );
      configGenGraphBtn.addEventListener("click", () => {
        //Generate graphs from configured signals
        displayLoadingGraphs(true);
	handleCallPyodide();
      });
    } catch (e) {
      console.error("configSignal: showConfigureTab - " + e);
    }
  };
}
