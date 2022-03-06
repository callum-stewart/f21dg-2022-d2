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
});
