import '@testing-library/jest-dom'

// const defaultHTML = `
// <!DOCTYPE html>
// <html>
//   <body>
//     <!--header bar-->
//     <div class="heading-bar m-0 pb-1 pt-3 ps-1">
//       <h1 class="align-middle">Time Series Analysis Tool</h1>
//     </div>
//       <!--navbar-->
//       <nav class="nav nav-tabs pt-2">
//           <a id="emd-btn" class="nav-link" href="#">EMD</a>
//           <a id="stft-btn" class="nav-link" href="#">STFT</a>
//           <a id="upload-btn" class="nav-link" href="#">Upload Signal</a>
//           <a id="config-btn" class="nav-link" href="#">Create Signal</a>
//           <a id="reset-btn" class="nav-link disabled" href="#">Reset Input Signal</a>
//            <!--bookmark-->
//           <button type="button" id="bookmark-btn" class="btn btn-warning bi bi-bookmark float-end" role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content="URL has been copied to clipboard, Use this to share and save your settings!" data-bs-placement="bottom"></button>
//       </nav>
//     <div class="row main-content">
//       <div class="d-flex justify-content-center starting-instructions align-middle">
//         <h4>
//           To get started...
//         </h4>
//         <h5>
//           <ol id="instruc" class="list-unstyled" >
//             <li>1. Please click on an analysis method on the top bar</li>
//             <li>2. Use the tabs to either upload or create a time series signal to get started.</li>
//           </ol>
//         </h5>
//       </div>

//       <!--toolbar and charts view-->
//       <div class="col-md-10">
//         <!--Signal Section-->
//         <div class="row signal-section">
//         </div>
//         <!--Main Chart View-->
//         <div class="row align-items-start justify-content-center main-chart-holder">
//         </div>
//       </div>
//       <div class="col-md-2 align-self-start info-panel p-4" id="infoPanel">
//         <h2 id="method-name" class="info-panel-content"></h2>
//         <p id="method-info" class="info-panel-content"></p>
//         <h5 id="method-pros-heading" class="info-panel-content">Advantages</h5>
//         <p id="method-pros" class="info-panel-content"></p>
//         <h5 id="method-cons-heading" class="info-panel-content">Disadvantages</h5>
//         <p id="method-cons" class="info-panel-content"></p>
//       </div>
//     </div>
//   </body>
// </html>
// `;

// const dom = new JSDOM(defaultHTML);
// global.window = dom.window
// global.document = window.document
// global.navigator = window.navigator