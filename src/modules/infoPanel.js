// All module files in strict mode

export default class InfoPanel {
  constructor(data) {
    this.data = data;
  }

  /**
   * populates and shows side bar with info about methods
   * @param {string} methodName 
   */
  populatingInfoPanel(methodName) {
    try {
      const text = this.data[methodName];
      document.querySelector("#method-name").innerHTML = methodName;
      document.querySelector("#method-info").innerHTML = text.description;
      document.querySelector("#method-pros-heading").style.display = "block";
      document.querySelector("#method-cons-heading").style.display = "block";
      document.querySelector("#method-pros").innerHTML = text.procons.pros;
      document.querySelector("#method-cons").innerHTML = text.procons.cons;
      switch (methodName) {
        case "EMD":
          document.querySelector("#emd-btn").classList.add("active-dark");
          document.querySelector("#stft-btn").classList.remove("active-dark");
          break;
        case "STFT":
          document.querySelector("#stft-btn").classList.add("active-dark");
          document.querySelector("#emd-btn").classList.remove("active-dark");
          break;
        default:
          console.log("populatingInfoPanel: No method selected");
      }
    } catch (e) {
      console.error("infoPanel: populatingInfoPanel - " + e);
    }
  }

  /**
   * displays the side bar info panel
   * @param {boolean} display 
   */
  displayInfoPanel(display) {
    try {
      const infoPanelEl = [
        "name",
        "info",
        "pros-heading",
        "cons-heading",
        "pros",
        "cons",
      ];
      if (display) {
        infoPanelEl.forEach((e) => {
          document
            .querySelector(`#method-${e}`)
            .classList.remove("hide-info-panel");
          document
            .querySelector(`#infoPanel`)
            .classList.remove("hide-info-panel");
        });
      } else {
        infoPanelEl.forEach((e) => {
          document
            .querySelector(`#method-${e}`)
            .classList.add("hide-info-panel");
        });
        document.querySelector(`#infoPanel`).classList.add("hide-info-panel");
      }
    } catch (e) {
      console.error("infoPanel: displayInfoPanel - " + e);
    }
  }
}
