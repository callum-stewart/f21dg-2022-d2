// Helper Class used to store and reference objects in a Browser's sessionStorage.
// Min Browser versions that suppport this feature (and hence, our app) are:
// => Chrome: 4.0
// => Edge: 8.0
// => Firefox: 3.5
// => Safari: 4.0
// => Opera: 11.5

function setKeyValuePairInSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
}

// In most cases, this will be a JSON Stringified-string. 
function getValueFromKeyInSessionStorage(key) {
    return sessionStorage.getItem(key);
}

function removeValueFromSessionStorage(key) {
    sessionStorage.removeItem(key);
}

function isValueAssignedToKeyInSessionStorage(key) {
    return getValueFromKeyInSessionStorage(key) != null;
}

export { setKeyValuePairInSessionStorage, getValueFromKeyInSessionStorage, removeValueFromSessionStorage, isValueAssignedToKeyInSessionStorage };