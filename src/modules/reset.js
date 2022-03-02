// All module files in strict mode
import { clearURLParams } from "./bookmark";

const allowResetSignal = () => {
  document.querySelector("#reset-btn").classList.remove("disabled");
};

const clearInfoPanel = () => {
  const infoPanel = document.querySelector("#infoPanel");
  const infoPanelContent = document.querySelectorAll(".info-panel-content");
  infoPanel.classList.remove('.info-panel');
  infoPanel.classList.add('.hide-info-panel');
  for (var i = 0; i < infoPanelContent.length; ++i) {
    infoPanelContent[i].classList.add('.hide-info-panel');
  }
};

const displayOpeningMsg = (display) => {
  const openingMsg = document.querySelector(".starting-instructions");
  if(display){
    openingMsg.classList.add("d-flex");
    openingMsg.classList.remove("hide");
  } else {
    openingMsg.classList.remove("d-flex");
    openingMsg.classList.add("hide");
  }
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
  displayOpeningMsg(true);
};

export {
  allowResetSignal,
  resetSignalSettings,
  displayOpeningMsg
};
