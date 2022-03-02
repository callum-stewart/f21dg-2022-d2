// All module files in strict mode
import { clearURLParams } from "./bookmark";

const allowResetSignal = () => {
        document.querySelector("#reset-btn").classList.remove("disabled");
      };

const clearInfoPanel = () => {
    document.querySelector("#method-name").innerHTML = "";
    document.querySelector("#method-info").innerHTML = "";
    document.querySelector("#method-psuedocode").innerHTML = "";
    document.querySelector("#method-pros-heading").style.display = "none";
    document.querySelector("#method-cons-heading").style.display = "none";
    document.querySelector("#method-pros").innerHTML = "";
    document.querySelector("#method-cons").innerHTML = "";
  };      

const resetSignalSettings = () => {
        const signalBar = document.querySelector(".signal-section");
        document.querySelector("#emd-btn").classList.remove("active-dark");
        document.querySelector("#stft-btn").classList.remove("active-dark");
        document.querySelector("#config-btn").classList.remove("active");
        document.querySelector("#upload-btn").classList.remove("active");
        clearInfoPanel();
        document.querySelector("#reset-btn").classList.add("disabled");
        signalBar.innerHTML = "";
        clearURLParams();
};

export { allowResetSignal,resetSignalSettings };