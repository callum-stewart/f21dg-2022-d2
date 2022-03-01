// All module files in strict mode
import {allowResetSignal} from "./reset";

export default class ConfigSignal {
    addSignal = (signalType) => {
        console.log(signalType);
        // add chip/button to selection bar
        const noSignal = document.querySelector("#no-signal-msg");
        const signalRow = document.querySelector(".signals");
        if (noSignal) {
          noSignal.remove();
          signalRow.classList.remove("align-text-center");
          signalRow.classList.remove("align-items-center");
          signalRow.classList.add("justify-content-start");
        }
        const signalsHolder = document.querySelector(".signal-hold");
        let signal = document.createElement("button");
        signal.setAttribute("type", "button");
        signal.setAttribute("class", "btn btn-outline-light m-1");
        signal.innerText = signalType;
        signalsHolder.appendChild(signal);
      
        let signalData;
        switch (signalType) {
          case "sinusoid":
              signalData = {
                  type: signalType,
                  phase: document.querySelector("#sinusoid-phase").value,
                  frequency: document.querySelector("#sinusoid-frequency").value,
                  amplitude: document.querySelector("#sinusoid-amplitude").value
              };
            break;
          case "chirp":
              signalData = {
                  type: signalType,
                  frequency: document.querySelector("#chirp-frequency").value,
                  rate: document.querySelector("#chirp-rate").value,
                  amplitude: document.querySelector("#chirp-amplitude").value
              };
            break;
          case "trend":
              signalData = {
                  type: signalType,
                  trendType: document.querySelector("#trend-type").value,
                  alpha: document.querySelector("#trend-alpha").value,
                  beta: document.querySelector("#trend-beta").value,
                  gamma: document.querySelector("#trend-gamma").value
              };
            break;
          case "colour-noise":
              signalData = {
                  type: signalType,
                  seed: document.querySelector("#colournoise-seed").value,
                  ampRollFactor: document.querySelector("#colournoise-amprollfactor").value,
                  beta: document.querySelector("#colournoise-variance").value
              };
            break;
          case "shot-noise":
              signalData = {
                  type: signalType,
                  seed: document.querySelector("#shotnoise-seed").value
              };
            break;
          case "finance-data":
            break;
          default:
        }
        //DO SOMETHING WITH THIS SIGNAL OBJECT
        console.log(signalData);
      
        // addSignalParam(signalType, signalData);
      };  

    showConfigureTab = () => {
        document.querySelector("#config-btn").classList.add("active");
        document.querySelector("#upload-btn").classList.remove("active");
        allowResetSignal();
        // addParam('dataMethod', 'config');
      
        const signalBar = document.querySelector(".signal-section");
        const configureTemplate = `
          <!--Signal Selection-->
          <div class="col-md-6 signal-selection">
            <div class="row signals p-5 align-text-center align-items-center" style="height:350px;">
              <div class="col-md-12 signal-hold">
                  <h2 class="text-center" id="no-signal-msg">No signals configured <br/> <i class="bi bi-file-earmark-excel"></i></h2>
              </div>    
              
            </div>
            <div class="row align-items-end combination-bar p-2">
              <div class="col-md-6 ">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  data-bs-toggle="tooltip" data-bs-placement="left" 
                  title="Choosing the sum method will limit the signal types possible for combination to ...etc"
                >
                  <option selected>Select combination method</option>
                  <option value="1">Sum</option>
                  <option value="2">Product</option>
                </select>
              </div>
              <div class="col-md-6">
                <button type="button" class="btn btn-dark float-end">
                  Generate graphs
                </button>
              </div>
            </div>
          </div>
           <!--Signal Config-->
           <div class="col-md-6 signal-configuration p-4">
              <h4>Signal Configuration Settings 
                  <a href="#" class="text-decoration-none" onclick="triggerInfoModal()" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-info-circle"></i></a>
              </h4>
              <form class="form-example g-3" id="signal-form">
                  <div class="signal-parameters">
                      <div class="mb-3">
                          <select
                          id="signal-select" 
                          class="form-select"
                          aria-label="Default select example"
                          placeholder="Select signal type"
                          required
                        >
                          <option selected="selected">Select signal type</option>
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
              </form>
            <div>
              
            </div>
          </div>
                  `;
        signalBar.innerHTML = configureTemplate;
        const signalSelect = document.querySelector("#signal-select");
      
        signalSelect.addEventListener("change", (e) => {
          const form = document.querySelector("#signal-form");
          const signalInputs = document.querySelector("#signal-param-inputs");
          const submitBtn = document.querySelector("#submit-signal");
          const removeBtn = document.querySelector("#delete-signal");
          let formTemplate = "";
          switch (signalSelect.value) {
            case "sinusoid":
              formTemplate = `
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="sinusoid-phase" placeholder="0.1" required>
                        <label for="floatingInput">Phase</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="sinusoid-frequency" placeholder="0.1" required>
                        <label for="floatingInput">Frequency</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="sinusoid-amplitude" placeholder="0.1" required>
                        <label for="floatingInput">Amplitude</label>
                    </div>
                    `;
              break;
            case "chirp":
              formTemplate = `
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="chirp-frequency" placeholder="0.1">
                        <label for="floatingInput">Intial frequency</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="chirp-rate" placeholder="0.1">
                        <label for="floatingInput">Chirp rate</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="chirp-amplitude" placeholder="0.1">
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
                            id="trend-type"
                        >
                            <option selected value=null>Select trend type</option>
                            <option value="exponential">Exponential</option>
                            <option value="linear">Linear</option>
                            <option value="polynomial">Polynomial</option>
                      </select>  
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" placeholder="0.1" id="trend-alpha">
                        <label for="floatingInput">α co-efficient</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" placeholder="0.1" id="trend-beta">
                        <label for="floatingInput">β co-efficient</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" placeholder="0.1" id="trend-gamma">
                        <label for="floatingInput">γ co-efficient</label>
                    </div>
                    `;
              break;
            case "colour-noise":
              formTemplate = `
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" placeholder="0.1" id="colournoise-seed">
                        <label for="floatingInput">Seed value</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" placeholder="0.1" id="colournoise-amprollfactor">
                        <label for="floatingInput">Amplitude roll factor</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" placeholder="0.1" id="colournoise-variance">
                        <label for="floatingInput">Variance</label>
                    </div>
                    `;
              break;
            case "shot-noise":
              formTemplate = `
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" placeholder="0.1" id="shotnoise-seed">
                            <label for="floatingInput">Seed value</label>
                        </div>
                        `;
              break;
            case "finance-data":
              break;
            default:
              formTemplate = `
                    <div class="mb-3">
                        <h4>No signal type selected</h4>
                    </div>
                    `;
              if (submitBtn && removeBtn) {
                console.log("is this working");
                // submitBtn.form.removeChild(submitBtn);
                // removeBtn.form.removeChild(removeBtn);
                submitBtn.remove();
                removeBtn.remove();
                console.log("is this workinrwgwwreg");
              }
          }
          signalInputs.innerHTML = formTemplate;
        
          if (
            !document.querySelector("#submit-signal") &&
            !document.querySelector("#delete-signal") &&
            signalSelect.value
          ) {
            // Submit signal configuration settings button
            let submit = document.createElement("button");
            submit.setAttribute("class", "btn btn-primary float-end test-btns");
            submit.setAttribute("id", "submit-signal");
            submit.setAttribute("type", "button");
            let checkIcon = document.createElement("i");
            checkIcon.setAttribute("class", "bi bi-check2 text-light");
            submit.appendChild(checkIcon);
        
            // Delete signal button
            let remove = document.createElement("button");
            remove.setAttribute("class", "btn btn-dark test-btns");
            remove.setAttribute("id", "delete-signal");
            remove.setAttribute("type", "button");
            let trashIcon = document.createElement("i");
            trashIcon.setAttribute("class", "bi bi-trash text-light");
            remove.appendChild(trashIcon);
        
            // add these to the form
            form.appendChild(submit);
            form.appendChild(remove);
          }
          const submitBtn2 = document.querySelector("#submit-signal");
          if (submitBtn2) {
            submitBtn2.addEventListener("click", () => {
                this.addSignal(signalSelect.value);
            });
          }
          
        });
        
      };
}