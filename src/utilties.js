const objToQueryString = obj =>
  Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');

const debounce = (func, threshold = 100, execAsap = false) => {
  let timeout;

  return function debounced() {
    const self = this,
      args = arguments;

    function delayed() {
      if (!execAsap) {
        func.apply(self, args);
      }
      timeout = null;
    }

    if (timeout) {
      clearTimeout(timeout);
    } else if (execAsap) {
      func.apply(self, args);
    }

    timeout = setTimeout(delayed, threshold);
  };
};

export { objToQueryString, debounce };
