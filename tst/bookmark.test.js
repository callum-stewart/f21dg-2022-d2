// Utilizing Jest as our Unit Testing Framework, for more info: https://github.com/facebook/jest
// To run tests, run: npm test
import * as bookmark from "../src/modules/bookmark";

describe("testing bookmark.js ", () => {
  let url = {};
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });
  Object.assign(window, {
    history: {
      pushState: () => {},
    },
  });
  Object.assign(url, {
    searchParams: {
      set: () => {},
    },
  });
  const clipboardCopyMock = jest.spyOn(navigator.clipboard, "writeText");
  const setParamMock = jest.spyOn(url.searchParams, "set");
  const setURLMock = jest.spyOn(window.history, "pushState");
  afterEach(() => {    
    jest.clearAllMocks();
  });
  beforeEach(() => {
    document.body.innerHTML = `
              <nav class="nav nav-tabs pt-2">
                  <!--bookmark-->
                  <button type="button" id="bookmark-btn" class="btn btn-warning bi bi-bookmark float-end" role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content="URL has been copied to clipboard, Use this to share and save your settings!" data-bs-placement="bottom"></button>
              </nav>
              `;
  });
  test("testing bookmarkToClipboard ", () => {
      bookmark.bookmarkToClipboard();
      expect(clipboardCopyMock).toBeCalledWith(window.location.href);
      expect(document.querySelector("#bookmark-btn")).toHaveClass(
        "bi-bookmark-check"
      );
      expect(document.querySelector("#bookmark-btn")).not.toHaveClass(
        "bi-bookmark"
      );
  });
  test("testing clearURLParams ", () => {
    bookmark.clearURLParams();
    expect(setURLMock).toBeCalledWith({}, "", "/");
  });
  // test("testing addParam ", () => {
  //   const param = 'analysisMethod';
  //   const value = 'EMD';
  //   bookmark.addParam(param,value);
  //   // expect(setParamMock).toBeCalledWith(param,value);
  //   let url = `http://localhost/?${param}=${value}`;
  //   expect(setURLMock).toBeCalledWith({}, "", url);
  // });
  
  // describe("testing displayOpeningMsg ", () => {
  //     var display, openingMsg;
  //     beforeEach(()=> {
  //       display = '';
  //       openingMsg = document.querySelector(".starting-instructions");
  //     });

  //     test("display opening message ", () => {
  //       display = true
  //       reset.displayOpeningMsg(display);
  //       expect(openingMsg).not.toHaveClass("hide");
  //       expect(openingMsg).toHaveClass("d-flex");
  //     });
  //     test("hide opening message ", () => {
  //       display = false
  //       reset.displayOpeningMsg(display);
  //       expect(openingMsg).toHaveClass("hide");
  //       expect(openingMsg).not.toHaveClass("d-flex");
  //     });
  //   });
  // describe("testing resetSignalSettings ", () => {
  //     var signalBar;
  //     beforeEach(()=> {
  //       signalBar = document.querySelector(".signal-section");
  //     });
  //     test("reseting page ", () => {
  //       const clearURLParamsMock = jest.spyOn(bookmark,'clearURLParams');
  //       const displayLoadingGraphs = jest.spyOn(graphs,'displayLoadingGraphs');
  //       const displayOpeningMsgMock = jest.spyOn(reset,'displayOpeningMsg');
  //       reset.resetSignalSettings();
  //       expect(document.querySelector("#stft-btn")).not.toHaveClass("active-dark");
  //         expect(document.querySelector("#emd-btn")).not.toHaveClass("active-dark");
  //         expect(document.querySelector("#config-btn")).not.toHaveClass("active");
  //         expect(document.querySelector("#upload-btn")).not.toHaveClass("active");
  //         expect(document.querySelector("#reset-btn")).toHaveClass("disabled");
  //         expect(signalBar.innerHTML).toBe("");
  //         expect(displayOpeningMsgMock).toHaveBeenCalledWith(true);
  //         expect(clearURLParamsMock).toHaveBeenCalled();
  //         expect(displayLoadingGraphs).toHaveBeenCalledWith(false);
  //     });
  //   });
});
