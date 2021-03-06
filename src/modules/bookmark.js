// All module files in strict mode

/**
 * copies url to clipboard
 */
const bookmarkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    document.querySelector("#bookmark-btn").classList.remove("bi-bookmark");
    document.querySelector("#bookmark-btn").classList.add("bi-bookmark-check");
  };
  
  /**
   * Adds unique parameters to URL i.e. analysisMethod or dataMethod
   * 
   * @param {string} param Parameter specifying setting for decomposition
   * @param {string} value Value for chosen parameter
   */
const addParam = (param, value) => {
      const url = new URL(window.location);
      url.searchParams.set(param, value);
      window.history.pushState({}, '', url);
  };

/**
 * adds signal parameter data to URL in format 
 * [signal id]-[parameter name]=[value]&
 * e.g.
 * 3-type=chirp&3-frequency=2&3-rate=9&3-amplitude=2
 * 
 * @param {number} signalID signal id (between 1-10 as limit on signals capped at 10)
 * @param {object} data signal data including type, (other relevant parameters for specified signal)
 */  
const addSignalParam = (signalID, data) => {
    let signalData = data
    const url = new URL(window.location);
    Object.keys(signalData).forEach(function(key,index) {
      url.searchParams.set(`${signalID}-${key}`, signalData[key]);
      window.history.pushState({}, '', url);
    });
    let searchParams = new URLSearchParams(url.search);
    sessionStorage.setItem('settings', JSON.stringify(paramsToObj(searchParams)));
};

/**
 * removes signal param from url
 * @param {string} signalID 
 */
const removeSignalParam = (signalID) => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    params.forEach( (value,key) => {
      if(key.split('-')[0] === signalID.toString()){
        url.searchParams.delete(key);
      }
      window.history.pushState({}, '', url);
    });
    let searchParams = new URLSearchParams(url);
    sessionStorage.setItem('settings', JSON.stringify(paramsToObj(searchParams)));
}  

/**
 * amends a signal's param in url
 * @param {string} signalID 
 * @param {object} signalData
 */
const editSignalParam = (signalID, data) => {
  let signalData = data
    const url = new URL(window.location);
    Object.keys(signalData).forEach(function(key,index) {
      url.searchParams.set(`${signalID}-${key}`, signalData[key]);
      window.history.pushState({}, '', url);
  });
}  

/**
 * clears all signal params only so signal params dont interfere with upload signal
 */
const clearSignalParams = () => {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);
  params.forEach( (value,key) => {
    if(+key.split('-')[0]){
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url);
  });
  sessionStorage.setItem('signalCount', 1);
}

/**
 * clears all params for reset
 */
const clearURLParams = () => {
    //Firefox doesn't like empty strings as last param
    window.history.pushState({}, '', '/');
}

/**
 * creates js object from param strings 
 * 1-id=1&1-type=sinusoid into {
 *  1: { id: 1
 *       type: sinusoid
 *      }
 * }
 * 
 * @param {string} params 
 * @returns object
 */
const paramsToObj = (params) => {
  const result = {}
  for(const [key, value] of params) {
    var signalId = +key.split('-')[0];
    //check if signal id at start of param
    var isSignalParam = signalId ? true : false;
    if( isSignalParam ){
      var label = key.split('-')[1];
      if(!result['signals'])
        result['signals'] = [];
      if(result['signals'][signalId-1]){
        result['signals'][signalId-1][label] = value;
      } else {
        result['signals'][signalId-1] = {};
        result['signals'][signalId-1][label] = value;
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

export { bookmarkToClipboard,addParam,addSignalParam,clearURLParams,paramsToObj,removeSignalParam, clearSignalParams, editSignalParam };
