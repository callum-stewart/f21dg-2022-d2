// All module files in strict mode

export default class InfoPanel {
    constructor(data) {
        this.data = data;
    }
    populatingInfoPanel(methodName){
        const text = this.data[methodName];
        document.querySelector("#method-name").innerHTML = methodName;
        document.querySelector("#method-info").innerHTML = text.description;
        document.querySelector("#method-psuedocode").innerHTML = text.psuedocode;
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
            // addParam('analysisMethod', methodName);
            break;
        default:
            console.log("populatingInfoPanel: No method selected");
        }
  };
}