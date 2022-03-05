// All module files in strict mode
import { clearURLParams } from "./bookmark";
import { displayLoadingGraphs } from "./graphs";

/**
 * Enables reset button
 */
const allowResetSignal = () => {
  try {
    document.querySelector("#reset-btn").classList.remove("disabled");
  } catch (e) {
    console.error("reset: allowResetSignal - " + e);
  }
};

/**
 * displays opening user instructions
 * @param {boolean} display 
 */
const displayOpeningMsg = (display) => {
  try {
    const openingMsg = document.querySelector(".starting-instructions");
    if (display) {
      openingMsg.classList.add("d-flex");
      openingMsg.classList.remove("hide");
    } else {
      openingMsg.classList.remove("d-flex");
      openingMsg.classList.add("hide");
    }
  } catch (e) {
    console.error("reset: displayOpeningMsg - " + e);
  }
};

/**
 * clears dashboard, resets all button actives
 */
const resetSignalSettings = () => {
  try {
    const signalBar = document.querySelector(".signal-section");
    document.querySelector("#emd-btn").classList.remove("active-dark");
    document.querySelector("#stft-btn").classList.remove("active-dark");
    document.querySelector("#config-btn").classList.remove("active");
    document.querySelector("#upload-btn").classList.remove("active");
    document.querySelector("#reset-btn").classList.add("disabled");
    signalBar.innerHTML = "";
    clearURLParams();
    displayLoadingGraphs(false);
    displayOpeningMsg(true);
  } catch (e) {
    console.error("reset: resetSignalSettings - " + e);
  }
};

export { allowResetSignal, resetSignalSettings, displayOpeningMsg };
