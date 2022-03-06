// Utilizing Jest as our Unit Testing Framework, for more info: https://github.com/facebook/jest
// To run tests, run: npm test
import ConfigSignal from "../src/modules/configSignal.js";

describe("testing configSignal.js ", () => {
  const config = new ConfigSignal();
  let deleteBtn, addBtn, editBtn, configBtn, uploadBtn, signalBar, signalSelect,signalRow,signalHolder;

  beforeEach(() => {
    document.body.innerHTML = `
              <button id="delete-signal"></button>
              <button id="submit-signal"></button>
              <button id="edit-signal"></button>
              <button id="config-btn"></button>
              <button id="upload-btn"></button>
              <div class="signal-section"></div>
              `;

    deleteBtn = document.querySelector("#delete-signal");
    addBtn = document.querySelector("#submit-signal");
    editBtn = document.querySelector("#edit-signal");
    configBtn = document.querySelector("#config-btn");
    uploadBtn = document.querySelector("#upload-btn");
    signalBar = document.querySelector(".signal-section");
    signalSelect = document.querySelector("#signal-select");
    signalRow = document.querySelector(".signals");
    signalHolder = document.querySelector(".signal-hold");
  });
  describe("testing button displays ", () => {
    describe("delete button", () => {
      test("show ", () => {
        config.displayDeleteBtn(true);
        expect(deleteBtn).toHaveClass("btn");
        expect(deleteBtn).not.toHaveClass("hide");
      });
      test("hide", () => {
        config.displayDeleteBtn(false);
        expect(deleteBtn).not.toHaveClass("btn");
        expect(deleteBtn).toHaveClass("hide");
      });
    });
    describe("add button", () => {
      test("show ", () => {
        config.displayAddBtn(true);
        expect(addBtn).toHaveClass("btn");
        expect(addBtn).not.toHaveClass("hide");
      });
      test("hide", () => {
        config.displayAddBtn(false);
        expect(addBtn).not.toHaveClass("btn");
        expect(addBtn).toHaveClass("hide");
      });
    });
    describe("edit button", () => {
      test("show ", () => {
        config.displayEditBtn(true);
        expect(editBtn).toHaveClass("btn");
        expect(editBtn).not.toHaveClass("hide");
      });
      test("hide", () => {
        config.displayEditBtn(false);
        expect(editBtn).not.toHaveClass("btn");
        expect(editBtn).toHaveClass("hide");
      });
    });
  });
  describe("change form template ", () => {
    let signalSelect, signalInputs;
    beforeEach(() => {
      document.body.innerHTML = `
            <div id="signal-param-inputs"></div>
            <input id="signal-select"></input>
            `;
      let formTemplate;
      signalSelect = document.querySelector("#signal-select");
      signalInputs = document.querySelector("#signal-param-inputs");
    });
    test("for sinusiod ", () => {
      signalSelect.value = "sinusoid";
      const sinusoidTemplate = `
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-phase" placeholder="0.1" required="">
                        <label for="floatingInput">Phase</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-frequency" placeholder="0.1" required="">
                        <label for="floatingInput">Frequency</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-amplitude" placeholder="0.1" required="">
                        <label for="floatingInput">Amplitude</label>
                    </div>
                    `;
      config.changeFormTemplate();
      expect(signalInputs.innerHTML).toBe(sinusoidTemplate);
    });
    test("for chirp ", () => {
      signalSelect.value = "sinusoid";
      const sinusoidTemplate = `
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-phase" placeholder="0.1" required="">
                        <label for="floatingInput">Phase</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-frequency" placeholder="0.1" required="">
                        <label for="floatingInput">Frequency</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="sinusoid-amplitude" placeholder="0.1" required="">
                        <label for="floatingInput">Amplitude</label>
                    </div>
                    `;
      config.changeFormTemplate();
      expect(signalInputs.innerHTML).toBe(sinusoidTemplate);
    });
    test("for trend ", () => {
      signalSelect.value = "trend";
      const trendTemplate = `
                    <div class="mb-3">
                        <select class="form-select" aria-label="Default select example" id="trend-trendType">
                            <option selected="" value="none">Select trend type</option>
                            <option value="exponential">Exponential</option>
                            <option value="linear">Linear</option>
                            <option value="polynomial">Polynomial</option>
                      </select>  
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="trend-alpha" required="">
                        <label for="floatingInput">α co-efficient</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="trend-beta" required="">
                        <label for="floatingInput">β co-efficient</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="trend-gamma" required="">
                        <label for="floatingInput">γ co-efficient</label>
                    </div>
                    `;
      config.changeFormTemplate();
      expect(signalInputs.innerHTML).toBe(trendTemplate);
    });
    test("for color-noise ", () => {
      signalSelect.value = "colour-noise";
      const colorNoiseTemplate = `
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="colournoise-seed" required="">
                        <label for="floatingInput">Seed value</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="colournoise-amprollfactor" required="">
                        <label for="floatingInput">Amplitude roll factor</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" placeholder="0.1" id="colournoise-variance" required="">
                        <label for="floatingInput">Variance</label>
                    </div>
                    `;
      config.changeFormTemplate();
      expect(signalInputs.innerHTML).toBe(colorNoiseTemplate);
    });
    test("for shot-noise ", () => {
      signalSelect.value = "shot-noise";
      const shotNoiseTemplate = `
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" placeholder="0.1" id="shotnoise-seed" required="">
                            <label for="floatingInput">Seed value</label>
                        </div>
                        `;
      config.changeFormTemplate();
      expect(signalInputs.innerHTML).toBe(shotNoiseTemplate);
    });
    test("for finance-data ", () => {
      signalSelect.value = "finance-data";
      config.changeFormTemplate();
      expect(signalInputs.innerHTML).toBe('');
    });
  });
  describe("getEditSignalData ", () => {
    const id = 2;
    const data = {
      id: 3,
      info: "",
    };
    test("valid data ", () => {
      const expectedData = {
        id: 2,
        info: "",
      };
      expect(config.getEditSignalData(id, data)).toEqual(expectedData);
    });
  });
  describe("showConfigureTab ", () => {
    const configureTemplate = `
          <!--Signal Selection-->
          <div class="col-md-6 signal-selection">
            <div class="row signals p-5 align-text-center align-items-center" style="height:350px;">
              <div class="col-md-12 signal-hold">
                  <h2 class="text-center" id="no-signal-msg">No signals configured <br> <i class="bi bi-file-earmark-excel"></i></h2>
              </div>
            </div>
            <div class="row align-items-end combination-bar p-2">
              <div class="col-md-6 ">
                <select class="form-select" id="combination-method" aria-label="Default select example" data-bs-toggle="tooltip" data-bs-placement="right" title="Choosing the sum method will limit the signal types possible for combination to sinusoid and trends only">
                  <option selected="">Select combination method</option>
                  <option value="1">Sum</option>
                  <option value="2">Product</option>
                </select>
              </div>
              <div class="col-md-6">
                <button type="button" id="generate-config-graph" class="btn btn-dark float-end">
                  Generate graphs
                </button>
              </div>
            </div>
          </div>
           <!--Signal Config-->
           <div class="col-md-6 signal-configuration p-4">
              <h4>Signal Configuration Settings 
                  <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#signalInfoModal"><i class="bi bi-info-circle"></i></a>
              </h4>
              <p>Configure your signal by selecting a signal type below and filling in all the parameter fields with your desired values.</p>
              <form class="form-example g-3" id="signal-form">
                  <div class="signal-parameters">
                      <div class="mb-3">
                          <select id="signal-select" class="form-select" aria-label="Default select example" placeholder="Select signal type" required="">
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
    test("valid ", () => {
      const displayDeleteMock = jest.spyOn(config, "displayDeleteBtn");
      const displayAddMock = jest.spyOn(config, "displayAddBtn");
      const displayEditMock = jest.spyOn(config, "displayEditBtn");
      config.showConfigureTab();
      expect(signalBar.innerHTML).toBe(configureTemplate);
      expect(displayDeleteMock).toBeCalledWith(false);
      expect(displayAddMock).toBeCalledWith(false);
      expect(displayEditMock).toBeCalledWith(false);
      displayDeleteMock.mockRestore();
      displayAddMock.mockRestore();
      displayEditMock.mockRestore();
    });
  });
  test("populateSettingsForm ", () => {
    const displayDeleteMock = jest.spyOn(config, "displayDeleteBtn");
    const displayAddMock = jest.spyOn(config, "displayAddBtn");
    const displayEditMock = jest.spyOn(config, "displayEditBtn");
    const signalData = {
      id: 2,
      type: "sinusoid",
      phase: "0.2",
      amplitude: "0.1",
      frequency: "3",
    };
    const data = signalData;
    config.populateSettingsForm(signalData);
    expect(displayDeleteMock).toBeCalledWith(true);
    expect(displayAddMock).toBeCalledWith(false);
    expect(displayEditMock).toBeCalledWith(true);
    displayDeleteMock.mockRestore();
    displayAddMock.mockRestore();
    displayEditMock.mockRestore();
  });
  describe("getSignalData ", () => {
    let signalSelect, signalInputs,signalData;
    beforeEach(() => {
      document.body.innerHTML = `
            <input id="signal-select"></input>
            <div id="signal-param-inputs"></div>
            <input id="sinusoid-amplitude"></input>
            <input id="sinusoid-phase"></input>
            <input id="sinusoid-frequency"></input>
            <input id="chirp-amplitude"></input>
            <input id="chirp-rate"></input>
            <input id="chirp-frequency"></input>
            <input id="trend-trendType"></input>
            <input id="trend-alpha"></input>
            <input id="trend-beta"></input>
            <input id="trend-gamma"></input>
            <input id="colournoise-seed"></input>
            <input id="colournoise-amprollfactor"></input>
            <input id="colournoise-variance"></input>
            <input id="shotnoise-seed"></input>
            `;
      signalSelect = document.querySelector("#signal-select");
      signalInputs = document.querySelector("#signal-param-inputs");
    });
    test("for sinusiod ", () => {
      document.querySelector("#sinusoid-phase").value = "0.1";
      document.querySelector("#sinusoid-frequency").value = "0.2";
      document.querySelector("#sinusoid-amplitude").value = "0.3";
      signalSelect.value = "sinusoid";
      signalData = {
        id: 1,
        type: 'sinusoid',
        phase : '0.1',
        frequency : '0.2',
        amplitude : '0.3'
      }
      expect(config.getSignalData()).toEqual(signalData);
    });
    test("for chirp ", () => {
      document.querySelector("#chirp-rate").value = "0.1";
      document.querySelector("#chirp-frequency").value = "0.2";
      document.querySelector("#chirp-amplitude").value = "0.3";
      signalSelect.value = "chirp";
      signalData = {
        id: 1,
        type: 'chirp',
        rate : '0.1',
        frequency : '0.2',
        amplitude : '0.3'
      }
      expect(config.getSignalData()).toEqual(signalData);
    });
    test("for trend ", () => {
      document.querySelector("#trend-trendType").value = "Linear";
      document.querySelector("#trend-alpha").value = "0.2";
      document.querySelector("#trend-beta").value = "0.3";
      document.querySelector("#trend-gamma").value = "0.3";
      signalSelect.value = "trend";
      signalData = {
        id: 1,
        type: 'trend',
        trendType : 'Linear',
        alpha : '0.2',
        beta : '0.3',
        gamma : '0.3'
      }
      expect(config.getSignalData()).toEqual(signalData);
    });
    test("for color-noise ", () => {
      document.querySelector("#colournoise-seed").value = "3";
      document.querySelector("#colournoise-amprollfactor").value = "0.2";
      document.querySelector("#colournoise-variance").value = "0.3";
      signalSelect.value = "colour-noise";
      signalData = {
        id: 1,
        type: 'colour-noise',
        seed : '3',
        amprollfactor : '0.2',
        variance : '0.3'
      }
      expect(config.getSignalData()).toEqual(signalData);
    });
    test("for shot-noise ", () => {
      document.querySelector("#shotnoise-seed").value = "3";
      signalSelect.value = "shot-noise";
      signalData = {
        id: 1,
        type: 'shot-noise',
        seed : '3'
      }
      expect(config.getSignalData()).toEqual(signalData);
    });
    test("for finance-data ", () => {
      signalSelect.value = "finance-data";
      signalData = {
        id: 1,
        type: 'finance-data'
      }
      expect(config.getSignalData()).toEqual(signalData);
    });
  });
});
