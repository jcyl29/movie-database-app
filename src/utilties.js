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

const parseSizeString = str => parseInt(str.replace('w', ''), 10);

// find the images that is closest to half the size of viewport width
const getHalfVwImage = (sizes, clientWidth) => {
  const threshold = 210;
  const maxWidth = 500;

  // using a a regular for loop because i need to be able to break out
  // when i find a match, and array.forEach doesn't do that
  for (let i = 0; i < sizes.length; i++) {
    const parsedSize = parseSizeString(sizes[i]);
    if (Math.abs(clientWidth / 2 - parsedSize) < threshold) {
      if (parsedSize > maxWidth) {
        return `w${maxWidth}`;
      }

      return sizes[i];
    }
  }

  // return the smallest if no match found
  return sizes[0];
};

const getLocaleDateString = (
  dateString,
  locale = 'en-US',
  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  }
) => new Date(dateString).toLocaleDateString(locale, options);

export {
  objToQueryString,
  debounce,
  getHalfVwImage,
  parseSizeString,
  getLocaleDateString
};
