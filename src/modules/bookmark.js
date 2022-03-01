// All module files in strict mode

export default class Bookmark {
  bookmarkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    document.querySelector("#bookmark-btn").classList.remove("bi-bookmark");
    document.querySelector("#bookmark-btn").classList.add("bi-bookmark-check");
  };
  
  addParam = (param, value) => {
      // console.log(window.location.search);
      // const urlParams = new URLSearchParams(window.location.search);
      // // console.log(urlParams);
      // urlParams.append(param, value);
      // // window.history.pushState("object or string", "Title", "new url");
      // window.location.search = urlParams;
      // window.history.replaceState(null, '', urlParams);
      // window.location.search = urlParams;
  
      const url = new URL(window.location);
      url.searchParams.set(param, value);
      window.history.pushState({}, '', url);
      console.log(url);
  };
  
  //TO-DO THIS IS RELOADING
  addSignalParam = (param, value) => {
    // console.log(window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    // // console.log(urlParams);
    urlParams.append(param, value);
    console.log(urlParams.toString())
  ;  // window.history.pushState({}, '', urlParams);
    // // window.history.pushState("object or string", "Title", "new url");
    // window.location.search = urlParams;
    // window.history.replaceState(null, '', urlParams);
    window.location.search = urlParams;
  
    // const url = new URL(window.location);
    // url.searchParams.set(param, value);
    // window.history.pushState({}, '', url);
  };
}