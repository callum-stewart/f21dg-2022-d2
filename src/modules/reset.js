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
        // const url = new URL(window.location);
        // console.log(url);
        // console.log(url.search);
        // // URLSearchParams.delete()
        // const urlParams = new URLSearchParams(url.search);
        // urlParams.forEach(function(value, key) {
        //   console.log("value" + value);
        //   console.log("key" + key);
        //   urlParams.delete(key);
        //   console.log('hihi');
        // });
        // const url2 = new URL(window.location);
        // console.log(url2);
        
      
        //Firefox doesn't like empty strings as last param
        window.history.pushState({}, '', '/');
};

export { allowResetSignal,resetSignalSettings };