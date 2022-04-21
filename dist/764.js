"use strict";
(self["webpackChunkhiring_app"] = self["webpackChunkhiring_app"] || []).push([[764],{

/***/ 597:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "DS": () => (/* reexport */ useFederatedComponent)
});

// UNUSED EXPORTS: useDynamicScript, useFederatedModule

;// CONCATENATED MODULE: ./node_modules/ab-federation-helpers/useDynamicScript.js
const urlCache = new Set();
const useDynamicScript_useDynamicScript = (url, React) => {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);
  React.useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);
    const element = document.createElement('script');
    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);
    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);
  return {
    errorLoading,
    ready
  };
};
/* harmony default export */ const ab_federation_helpers_useDynamicScript = (useDynamicScript_useDynamicScript);
;// CONCATENATED MODULE: ./node_modules/ab-federation-helpers/utils.js
function utils_loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_require__.I('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules

    await container.init(__webpack_require__.S.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}


;// CONCATENATED MODULE: ./node_modules/ab-federation-helpers/useFederatedComponent.js


const useFederatedComponent_urlCache = new Set();
const componentCache = new Map();
const useFederatedComponent = (remoteUrl, scope, module, React) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState(null);
  const {
    ready,
    errorLoading
  } = ab_federation_helpers_useDynamicScript(remoteUrl, React);
  React.useEffect(() => {
    if (Component) setComponent(null); // Only recalculate when key changes
  }, [key]);
  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(utils_loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    } // key includes all dependencies (scope/module)

  }, [Component, ready, key]);
  return {
    errorLoading,
    Component
  };
};
;// CONCATENATED MODULE: ./node_modules/ab-federation-helpers/useFederatedModule.js


const scriptCache = new Map();
const useFederatedModule = (remoteUrl, scope, module, React) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [scriptModule, setScriptModule] = React.useState(null);
  const {
    ready,
    errorLoading
  } = useDynamicScript(remoteUrl, React);
  React.useEffect(() => {
    if (scriptModule) setScriptModule(null); // Only recalculate when key changes
  }, [key]);
  React.useEffect(() => {
    if (ready && !scriptModule) {
      let src = null;

      const loadAsyncComp = async () => {
        src = await loadComponent(scope, module)();
        scriptCache.set(key, src);
        setScriptModule(src);
      };

      loadAsyncComp();
    } // key includes all dependencies (scope/module)

  }, [scriptModule, ready, key]);
  const errorinLoading = errorLoading;
  return {
    errorinLoading,
    scriptModule
  };
};
;// CONCATENATED MODULE: ./node_modules/ab-federation-helpers/index.js




/***/ }),

/***/ 788:
/***/ ((module) => {


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 485:
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ 52:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 336:
/***/ ((module) => {



var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = '\uFFFD';
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

module.exports = function (encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return customDecodeURIComponent(encodedURI);
  }
};

/***/ }),

/***/ 106:
/***/ ((module) => {



module.exports = function (obj, predicate) {
  var ret = {};
  var keys = Object.keys(obj);
  var isArr = Array.isArray(predicate);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];

    if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
      ret[key] = val;
    }
  }

  return ret;
};

/***/ }),

/***/ 587:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



const strictUriEncode = __webpack_require__(757);

const decodeComponent = __webpack_require__(336);

const splitOnFirst = __webpack_require__(3);

const filterObject = __webpack_require__(106);

const isNullOrUndefined = value => value === null || value === undefined;

const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

function encoderForArrayFormat(options) {
  switch (options.arrayFormat) {
    case 'index':
      return key => (result, value) => {
        const index = result.length;

        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), '[', index, ']'].join('')];
        }

        return [...result, [encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')];
      };

    case 'bracket':
      return key => (result, value) => {
        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), '[]'].join('')];
        }

        return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
      };

    case 'colon-list-separator':
      return key => (result, value) => {
        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), ':list='].join('')];
        }

        return [...result, [encode(key, options), ':list=', encode(value, options)].join('')];
      };

    case 'comma':
    case 'separator':
    case 'bracket-separator':
      {
        const keyValueSep = options.arrayFormat === 'bracket-separator' ? '[]=' : '=';
        return key => (result, value) => {
          if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
            return result;
          } // Translate null to an empty string so that it doesn't serialize as 'null'


          value = value === null ? '' : value;

          if (result.length === 0) {
            return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
          }

          return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
        };
      }

    default:
      return key => (result, value) => {
        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, encode(key, options)];
        }

        return [...result, [encode(key, options), '=', encode(value, options)].join('')];
      };
  }
}

function parserForArrayFormat(options) {
  let result;

  switch (options.arrayFormat) {
    case 'index':
      return (key, value, accumulator) => {
        result = /\[(\d*)\]$/.exec(key);
        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return (key, value, accumulator) => {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'colon-list-separator':
      return (key, value, accumulator) => {
        result = /(:list)$/.exec(key);
        key = key.replace(/:list$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'comma':
    case 'separator':
      return (key, value, accumulator) => {
        const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
        const isEncodedArray = typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
        value = isEncodedArray ? decode(value, options) : value;
        const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
        accumulator[key] = newValue;
      };

    case 'bracket-separator':
      return (key, value, accumulator) => {
        const isArray = /(\[\])$/.test(key);
        key = key.replace(/\[\]$/, '');

        if (!isArray) {
          accumulator[key] = value ? decode(value, options) : value;
          return;
        }

        const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map(item => decode(item, options));

        if (accumulator[key] === undefined) {
          accumulator[key] = arrayValue;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], arrayValue);
      };

    default:
      return (key, value, accumulator) => {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function validateArrayFormatSeparator(value) {
  if (typeof value !== 'string' || value.length !== 1) {
    throw new TypeError('arrayFormatSeparator must be single character string');
  }
}

function encode(value, options) {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }

  if (typeof input === 'object') {
    return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map(key => input[key]);
  }

  return input;
}

function removeHash(input) {
  const hashStart = input.indexOf('#');

  if (hashStart !== -1) {
    input = input.slice(0, hashStart);
  }

  return input;
}

function getHash(url) {
  let hash = '';
  const hashStart = url.indexOf('#');

  if (hashStart !== -1) {
    hash = url.slice(hashStart);
  }

  return hash;
}

function extract(input) {
  input = removeHash(input);
  const queryStart = input.indexOf('?');

  if (queryStart === -1) {
    return '';
  }

  return input.slice(queryStart + 1);
}

function parseValue(value, options) {
  if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
    value = Number(value);
  } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    value = value.toLowerCase() === 'true';
  }

  return value;
}

function parse(query, options) {
  options = Object.assign({
    decode: true,
    sort: true,
    arrayFormat: 'none',
    arrayFormatSeparator: ',',
    parseNumbers: false,
    parseBooleans: false
  }, options);
  validateArrayFormatSeparator(options.arrayFormatSeparator);
  const formatter = parserForArrayFormat(options); // Create an object with no prototype

  const ret = Object.create(null);

  if (typeof query !== 'string') {
    return ret;
  }

  query = query.trim().replace(/^[?#&]/, '');

  if (!query) {
    return ret;
  }

  for (const param of query.split('&')) {
    if (param === '') {
      continue;
    }

    let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '='); // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
    formatter(decode(key, options), value, ret);
  }

  for (const key of Object.keys(ret)) {
    const value = ret[key];

    if (typeof value === 'object' && value !== null) {
      for (const k of Object.keys(value)) {
        value[k] = parseValue(value[k], options);
      }
    } else {
      ret[key] = parseValue(value, options);
    }
  }

  if (options.sort === false) {
    return ret;
  }

  return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
    const value = ret[key];

    if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = keysSorter(value);
    } else {
      result[key] = value;
    }

    return result;
  }, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
  if (!object) {
    return '';
  }

  options = Object.assign({
    encode: true,
    strict: true,
    arrayFormat: 'none',
    arrayFormatSeparator: ','
  }, options);
  validateArrayFormatSeparator(options.arrayFormatSeparator);

  const shouldFilter = key => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';

  const formatter = encoderForArrayFormat(options);
  const objectCopy = {};

  for (const key of Object.keys(object)) {
    if (!shouldFilter(key)) {
      objectCopy[key] = object[key];
    }
  }

  const keys = Object.keys(objectCopy);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys.map(key => {
    const value = object[key];

    if (value === undefined) {
      return '';
    }

    if (value === null) {
      return encode(key, options);
    }

    if (Array.isArray(value)) {
      if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
        return encode(key, options) + '[]';
      }

      return value.reduce(formatter(key), []).join('&');
    }

    return encode(key, options) + '=' + encode(value, options);
  }).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (url, options) => {
  options = Object.assign({
    decode: true
  }, options);
  const [url_, hash] = splitOnFirst(url, '#');
  return Object.assign({
    url: url_.split('?')[0] || '',
    query: parse(extract(url), options)
  }, options && options.parseFragmentIdentifier && hash ? {
    fragmentIdentifier: decode(hash, options)
  } : {});
};

exports.stringifyUrl = (object, options) => {
  options = Object.assign({
    encode: true,
    strict: true,
    [encodeFragmentIdentifier]: true
  }, options);
  const url = removeHash(object.url).split('?')[0] || '';
  const queryFromUrl = exports.extract(object.url);
  const parsedQueryFromUrl = exports.parse(queryFromUrl, {
    sort: false
  });
  const query = Object.assign(parsedQueryFromUrl, object.query);
  let queryString = exports.stringify(query, options);

  if (queryString) {
    queryString = `?${queryString}`;
  }

  let hash = getHash(object.url);

  if (object.fragmentIdentifier) {
    hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
  }

  return `${url}${queryString}${hash}`;
};

exports.pick = (input, filter, options) => {
  options = Object.assign({
    parseFragmentIdentifier: true,
    [encodeFragmentIdentifier]: false
  }, options);
  const {
    url,
    query,
    fragmentIdentifier
  } = exports.parseUrl(input, options);
  return exports.stringifyUrl({
    url,
    query: filterObject(query, filter),
    fragmentIdentifier
  }, options);
};

exports.exclude = (input, filter, options) => {
  const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);
  return exports.pick(input, exclusionFilter, options);
};

/***/ }),

/***/ 3:
/***/ ((module) => {



module.exports = (string, separator) => {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  const separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};

/***/ }),

/***/ 757:
/***/ ((module) => {



module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

/***/ }),

/***/ 736:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(788);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(485);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(439), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(2), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body{background-color:#f6f8fa;font-family:\"Open Sans\",sans-serif}.border-primary,.filter-chkbox{border-color:#e1e4e8}.border-green{border-color:#28a745}.text-gray-dark{color:#24292e}.text-gray-light{color:#6a737d}.bg-gray-dark{background-color:#24292e}.bg-gray-light,.sidemenu-dropdown-container{background-color:#fafbfc}.popup-bg{background:rgba(0,0,0,.2)}.bg-primary{background-color:#6f42c1}.bg-primary.bg-primary-hover:hover{background-color:#4c2888}.bg-green{background-color:#28a745}.text-purple{color:#6f42c1}.text-blue{color:#0366d6}.error-msg-bg{background-color:#ffdce0}.error-msg-border{border-color:#d73a49}.has-error{border-color:#d73a49}input:focus{border:1px solid #6f42c1;box-shadow:0px 0px 0px 3px #e6dcfd}.textarea-primary:focus{border:1px solid #6f42c1;box-shadow:0px 0px 0px 3px #e6dcfd}.textarea-primary::-webkit-scrollbar{width:5px}.textarea-primary::-webkit-scrollbar-track{background:rgba(0,0,0,0)}.textarea-primary::-webkit-scrollbar-thumb{background:#d1d5da;border-radius:24px}.textarea-primary::-webkit-scrollbar-thumb:hover{background:#bcbdbe}.focus-shadow-none:focus{box-shadow:none}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.fadeIn{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeIn;animation-name:fadeIn}.fadeIn.delay-3{animation-delay:300ms}@keyframes fadeOut{from{opacity:1}to{opacity:0;visibility:hidden}}.fadeOut{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeOut;animation-name:fadeOut}.clearfix:after{content:\"\";width:100%;height:0px;display:block;visibility:hidden;clear:both}input.peer:checked+.filter-chkbox{background:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center center #6f42c1}.search-input{background:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat left 8px center #fff}.scroll-bar-hide::-webkit-scrollbar{width:0px;height:0px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 379:
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 795:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 589:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ 2:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ca213e288cb951e290ff.svg";

/***/ }),

/***/ 439:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fc6dcea20f8394bf514d.svg";

/***/ }),

/***/ 764:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: consume shared module (default) react@^17.0.2 (singleton) (fallback: ./node_modules/react/index.js)
var index_js_ = __webpack_require__(950);
// EXTERNAL MODULE: consume shared module (default) react-router-dom@=5.2.0 (singleton) (fallback: ./node_modules/react-router-dom/esm/react-router-dom.js)
var react_router_dom_js_ = __webpack_require__(399);
;// CONCATENATED MODULE: ./common/routes/AppRoute.js



const AppRoute = () => {
  const Candidates = /*#__PURE__*/(0,index_js_.lazy)(() => __webpack_require__.e(/* import() */ 401).then(__webpack_require__.bind(__webpack_require__, 401)));
  return (
    /*#__PURE__*/
    // <Candidates />
    index_js_.createElement(index_js_.Suspense, {
      fallback: ''
    }, /*#__PURE__*/index_js_.createElement(react_router_dom_js_.Switch, null, /*#__PURE__*/index_js_.createElement(react_router_dom_js_.Route, {
      path: "/",
      component: Candidates,
      exact: true
    }), /*#__PURE__*/index_js_.createElement(react_router_dom_js_.Route, {
      path: "/container",
      component: Candidates
    }), /*#__PURE__*/index_js_.createElement(react_router_dom_js_.Route, {
      path: "/candidates",
      component: Candidates
    })))
  );
};

/* harmony default export */ const routes_AppRoute = (AppRoute);
// EXTERNAL MODULE: ./node_modules/ab-federation-helpers/index.js + 4 modules
var ab_federation_helpers = __webpack_require__(597);
// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__(587);
;// CONCATENATED MODULE: ./src/shield-sdk.js

const base = !window.location.origin.includes('localhost') ? `${window.location.origin}/container` : window.location.origin;
let clientId = null;
const authorizationEndpoint = 'https://shield-dev.appblox.io/login';

const getCodeInUrl = function () {
  const parsedQuery = query_string.parseUrl(window.location.href);
  const code = parsedQuery.query.code;
  console.log('inside getcodeINURL', parsedQuery.query);
  return code;
};

class TokenStore {
  constructor() {
    if (!getCodeInUrl()) {
      this.initRefreshCycle();
    }
  }

  t;
  rt;
  te;
  sendRefreshBefore = 10000;
  timeoutHandle;

  setToken(token) {
    this.t = token;
    localStorage.setItem('_ab_t', token);
  }

  initRefreshCycle() {
    clearTimeout(this.timeoutHandle);
    let expiresIn = this.getExpiry();
    console.log('expires in = ', expiresIn);
    if (!expiresIn) return false;
    expiresIn *= 1000;
    let timer = expiresIn - new Date().getTime();

    if (!timer || timer < this.sendRefreshBefore || isNaN(timer)) {
      if (!timer) console.log('!timer');
      if (timer < this.sendRefreshBefore) console.log('less than', this.sendRefreshBefore);
      if (isNaN(timer)) console.log('isNan');
      console.log('invalid expiry time ', new Date().getTime(), expiresIn, timer);
      return null;
    }

    timer = parseInt(timer) - this.sendRefreshBefore;
    console.log('valid expiry time ', new Date().getTime(), expiresIn, timer);
    this.timeoutHandle = setTimeout(() => {
      refreshAccessToken();
    }, timer);
  }

  setExpiry(timestamp) {
    this.te = timestamp;
    localStorage.setItem('_ab_t_e', timestamp);
  }

  getExpiry() {
    return this.te || localStorage.getItem('_ab_t_e');
  }

  removeToken(token) {
    this.t = token;
    localStorage.removeItem('_ab_t');
  }

  setRefreshToken(token) {
    this.rt = token;
    localStorage.setItem('_ab_rt', token);
  }

  removeRefreshToken(token) {
    this.rt = token;
    localStorage.removeItem('_ab_rt');
  }

  getToken() {
    return this.t || localStorage.getItem('_ab_t');
  }

  getRefreshToken() {
    return this.rt || localStorage.getItem('_ab_rt');
  }

  clearTokens() {
    this.removeRefreshToken();
    this.removeToken();
  }

}

const tokenStore = new TokenStore();

const refreshAccessToken = async () => {
  console.log('calling refresh access token');
  const server = 'https://shield-dev.appblox.io/refresh-token';

  try {
    const res = await fetch(server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStore.getToken()} ${tokenStore.getRefreshToken()}`
      }
    });
    const data = await res.json();

    if (data && data.data.AccessToken) {
      console.log('data is ', data.data);
      tokenStore.setToken(data.data.AccessToken);
      tokenStore.setExpiry(data.data.AtExpires);
      tokenStore.setRefreshToken(data.data.RefreshToken);
      tokenStore.initRefreshCycle();
    } else if (data.status === 401) {
      console.log('expired token');
      tokenStore.clearTokens();
      await verifyLogin(); // await logout()
      // verifyLogin();
    }
  } catch (error) {
    console.log('error in refreshing = ', error); // await logout()
    // verifyLogin();
  }
};

const logout = async () => {
  await shieldLogout();
  tokenStore.removeRefreshToken();
  tokenStore.removeToken();
  await verifyLogin();
};
const verifyLogin = async () => {
  let token = tokenStore.getToken();

  if (!token) {
    const authorizationUrl = getAuthUrl();
    console.log('🚀 ~ file: shield-sdk.js ~ line 132 ~ verifyLogin ~ authorizationUrl', authorizationUrl);
    window.location = authorizationUrl;
  } else {
    const isValid = await validateAccessToken();

    if (!isValid) {
      const authorizationUrl = getAuthUrl();
      console.log('🚀 ~ file: shield-sdk.js ~ line 140 ~ verifyLogin ~ isValid', authorizationUrl);
      window.location = authorizationUrl;
    }

    return isValid;
  }
};

const validateAccessToken = async () => {
  const server = `https://shield-dev.appblox.io/validate-appblox-acess-token`;

  try {
    const res = await fetch(server, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStore.getToken()}`
      }
    });
    const data = await res.json(); // access token set to appblox io cookie

    return data.data && data.data === 'valid';
  } catch (error) {
    console.log(error);
  }
};

const shieldLogout = async () => {
  const server = `https://shield-dev.appblox.io/logout`;

  try {
    const res = await fetch(server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStore.getToken()}`
      }
    });
    const data = await res.json(); // access token set to appblox io cookie

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAuthUrl = () => {
  const oAuthQueryParams = {
    response_type: 'code',
    scope: 'user private_repo',
    redirect_uri: base,
    client_id: clientId,
    state: 'state123'
  };
  const query = query_string.stringify(oAuthQueryParams);
  const authorizationUrl = `${authorizationEndpoint}?${query}`;
  return authorizationUrl;
};

const init = async function (id) {
  console.log('init first line');
  clientId = id;
  const code = getCodeInUrl(); // var cookie;

  console.log(code);

  if (code) {
    const tokenData = await sendCodeToServer(code);
    console.log('🚀 ~ file: shield-sdk.js ~ line 197 ~ init ~ tokenData', code, tokenData);

    if (tokenData.success && tokenData.data) {
      tokenStore.setToken(tokenData.data.ab_at);
      tokenStore.setExpiry(tokenData.data.expires_in);
      tokenStore.setRefreshToken(tokenData.data.ab_rt);
      tokenStore.initRefreshCycle();
    }
  } else console.log('not entered');
};
const shield = {
  init,
  verifyLogin,
  tokenStore,
  getAuthUrl,
  logout
};

async function sendCodeToServer(code) {
  const server = `https://shield-dev.appblox.io/auth/get-token?grant_type=authorization_code&code=${code}&redirect_uri=${base}`;

  try {
    const res = await fetch(server, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json(); // access token set to appblox io cookie

    if (location.href.includes('?')) {
      history.pushState({}, null, location.href.split('?')[0]);
    }

    console.log('🚀  file: index.js  line 50  sendCodeToServer  data', data);
    return data;
  } catch (error) {
    console.log('🚀 ~ file: shield-sdk.js ~ line 232 ~ sendCodeToServer ~ error', error);
  }
} // // const appsButton = document.querySelector('button');
// // appsButton.style.display = 'none';
// // //Check for access token from sheild
// // if (code) {
// //   appsButton.style.display = 'block';
// //   appsButton.addEventListener('click', function () {
// //     authorizeApp();
// //   });
// // }
// // //Authorise App with sheild function
// // async function authorizeApp() {
// //   console.log(cookie)
// //   const server = `https://shield-dev.appblox.io/auth/app/open?grant_type=urn:ietf:params:oauth:grant-type:token-exchange&client_id=id=appsname2-8559`;
// //   try {
// //     const res = await fetch(server, {
// //       method: 'GET',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         // 'bearToken' : cookie,
// //       },
// //     });
// //     // const data = await res.json();
// //     // let cookieString = data.toGMTString();
// //     // document.cookie = cookieString;
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/css/main.scss
var main = __webpack_require__(736);
;// CONCATENATED MODULE: ./src/assets/css/main.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(main/* default */.Z, options);




       /* harmony default export */ const css_main = (main/* default */.Z && main/* default.locals */.Z.locals ? main/* default.locals */.Z.locals : undefined);

// EXTERNAL MODULE: external "{\"GJS_DEBUG_TOPICS\":\"JS ERROR;JS LOG\",\"LESSOPEN\":\"| /usr/bin/lesspipe %s\",\"LANGUAGE\":\"en_IN:en\",\"USER\":\"neoito\",\"npm_config_user_agent\":\"npm/8.4.1 node/v14.17.5 linux x64 workspaces/false\",\"XDG_SESSION_TYPE\":\"x11\",\"GIT_ASKPASS\":\"/usr/share/code/resources/app/extensions/git/dist/askpass.sh\",\"npm_config_user\":\"0\",\"npm_node_execpath\":\"/home/neoito/.nvm/versions/node/v14.17.5/bin/node\",\"SHLVL\":\"1\",\"npm_config_noproxy\":\"\",\"HOME\":\"/home/neoito\",\"CHROME_DESKTOP\":\"code-url-handler.desktop\",\"TERM_PROGRAM_VERSION\":\"1.57.1\",\"DESKTOP_SESSION\":\"ubuntu-xorg\",\"NVM_BIN\":\"/home/neoito/.nvm/versions/node/v14.17.5/bin\",\"npm_package_json\":\"/home/neoito/Documents/Neoito/cli-module/hiring-app/view/container/_ha_container/package.json\",\"NVM_INC\":\"/home/neoito/.nvm/versions/node/v14.17.5/include/node\",\"GIO_LAUNCHED_DESKTOP_FILE\":\"/usr/share/applications/code.desktop\",\"GNOME_SHELL_SESSION_MODE\":\"ubuntu\",\"GTK_MODULES\":\"gail:atk-bridge\",\"VSCODE_GIT_ASKPASS_MAIN\":\"/usr/share/code/resources/app/extensions/git/dist/askpass-main.js\",\"VSCODE_GIT_ASKPASS_NODE\":\"/usr/share/code/code\",\"MANAGERPID\":\"1779\",\"npm_config_userconfig\":\"/home/neoito/.npmrc\",\"npm_config_local_prefix\":\"/home/neoito/Documents/Neoito/cli-module/hiring-app/view/container/_ha_container\",\"SYSTEMD_EXEC_PID\":\"1980\",\"DBUS_SESSION_BUS_ADDRESS\":\"unix:path=/run/user/1000/bus\",\"COLORTERM\":\"truecolor\",\"GIO_LAUNCHED_DESKTOP_FILE_PID\":\"12713\",\"COLOR\":\"1\",\"NVM_DIR\":\"/home/neoito/.nvm\",\"npm_config_metrics_registry\":\"http://registry.npmjs.org/\",\"MANDATORY_PATH\":\"/usr/share/gconf/ubuntu-xorg.mandatory.path\",\"IM_CONFIG_PHASE\":\"1\",\"LOGNAME\":\"neoito\",\"JOURNAL_STREAM\":\"8:38120\",\"_\":\"/home/neoito/.nvm/versions/node/v14.17.5/bin/npm\",\"npm_config_prefix\":\"/home/neoito/.nvm/versions/node/v14.17.5\",\"XDG_SESSION_CLASS\":\"user\",\"DEFAULTS_PATH\":\"/usr/share/gconf/ubuntu-xorg.default.path\",\"npm_config_registry\":\"http://registry.npmjs.org/\",\"USERNAME\":\"neoito\",\"TERM\":\"xterm-256color\",\"npm_config_cache\":\"/home/neoito/.npm\",\"GNOME_DESKTOP_SESSION_ID\":\"this-is-deprecated\",\"WINDOWPATH\":\"2\",\"npm_config_node_gyp\":\"/home/neoito/.nvm/versions/node/v14.17.5/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js\",\"PATH\":\"/home/neoito/Documents/Neoito/cli-module/hiring-app/view/container/_ha_container/node_modules/.bin:/home/neoito/Documents/Neoito/cli-module/hiring-app/view/container/node_modules/.bin:/home/neoito/Documents/Neoito/cli-module/hiring-app/view/node_modules/.bin:/home/neoito/Documents/Neoito/cli-module/hiring-app/node_modules/.bin:/home/neoito/Documents/Neoito/cli-module/node_modules/.bin:/home/neoito/Documents/Neoito/node_modules/.bin:/home/neoito/Documents/node_modules/.bin:/home/neoito/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/home/neoito/.nvm/versions/node/v14.17.5/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/home/neoito/.local/share/pnpm:/home/neoito/.local/share/pnpm:/home/neoito/.nvm/versions/node/v14.17.5/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin\",\"SESSION_MANAGER\":\"local/neoito-ThinkPad-E14:@/tmp/.ICE-unix/1948,unix/neoito-ThinkPad-E14:/tmp/.ICE-unix/1948\",\"INVOCATION_ID\":\"d1aa4fe96657444c928312dab411c20e\",\"NODE\":\"/home/neoito/.nvm/versions/node/v14.17.5/bin/node\",\"npm_package_name\":\"hiring-app\",\"XDG_MENU_PREFIX\":\"gnome-\",\"XDG_RUNTIME_DIR\":\"/run/user/1000\",\"GDK_BACKEND\":\"x11\",\"DISPLAY\":\":0\",\"npm_config_legacy_peer_deps\":\"true\",\"LANG\":\"en_GB.UTF-8\",\"XDG_CURRENT_DESKTOP\":\"Unity\",\"XMODIFIERS\":\"@im=ibus\",\"XDG_SESSION_DESKTOP\":\"ubuntu-xorg\",\"XAUTHORITY\":\"/run/user/1000/gdm/Xauthority\",\"LS_COLORS\":\"rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:\",\"VSCODE_GIT_IPC_HANDLE\":\"/run/user/1000/vscode-git-39d1414623.sock\",\"TERM_PROGRAM\":\"vscode\",\"npm_lifecycle_script\":\"webpack --mode production\",\"SSH_AGENT_LAUNCHER\":\"gnome-keyring\",\"SSH_AUTH_SOCK\":\"/run/user/1000/keyring/ssh\",\"ORIGINAL_XDG_CURRENT_DESKTOP\":\"ubuntu:GNOME\",\"SHELL\":\"/bin/bash\",\"npm_package_version\":\"0.0.1\",\"npm_lifecycle_event\":\"build\",\"QT_ACCESSIBILITY\":\"1\",\"GDMSESSION\":\"ubuntu-xorg\",\"npm_config_unsafe_perm\":\"true\",\"LESSCLOSE\":\"/usr/bin/lesspipe %s %s\",\"GPG_AGENT_INFO\":\"/run/user/1000/gnupg/S.gpg-agent:0:1\",\"GJS_DEBUG_OUTPUT\":\"stderr\",\"QT_IM_MODULE\":\"ibus\",\"npm_config_globalconfig\":\"/home/neoito/.nvm/versions/node/v14.17.5/etc/npmrc\",\"npm_config_init_module\":\"/home/neoito/.npm-init.js\",\"PWD\":\"/home/neoito/Documents/Neoito/cli-module/hiring-app/view/container/_ha_container\",\"npm_execpath\":\"/home/neoito/.nvm/versions/node/v14.17.5/lib/node_modules/npm/bin/npm-cli.js\",\"XDG_CONFIG_DIRS\":\"/etc/xdg/xdg-ubuntu-xorg:/etc/xdg\",\"NVM_CD_FLAGS\":\"\",\"XDG_DATA_DIRS\":\"/usr/share/ubuntu-xorg:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop\",\"npm_config_global_prefix\":\"/home/neoito/.nvm/versions/node/v14.17.5\",\"npm_command\":\"run-script\",\"BREAKPAD_DUMP_LOCATION\":\"/home/neoito/.config/Code/exthost Crash Reports\",\"PNPM_HOME\":\"/home/neoito/.local/share/pnpm\",\"INIT_CWD\":\"/home/neoito/Documents/Neoito/cli-module/hiring-app/view/container/_ha_container\",\"EDITOR\":\"vi\",\"BLOX_FUNCTION_URL\":\"http://localhost:5000\",\"BLOX_ENV_URL_container\":\"https://hiringapp-dev.appblox.io/container\",\"BLOX_ENV_URL_layout\":\"https://hiringapp-dev.appblox.io/layout\",\"BLOX_ENV_URL_candidate_listing\":\"https://hiringapp-dev.appblox.io/candidate_listing\",\"BLOX_ENV_URL_edit_modal\":\"https://hiringapp-dev.appblox.io/edit_modal\"}"
var edit_modal_ = __webpack_require__(64);
;// CONCATENATED MODULE: ./src/App.js







const App = () => {
  const [system, setSystem] = (0,index_js_.useState)(undefined);
  const [isLoggedIn, setIsLoggedIn] = index_js_.useState(false);
  const authUrl = shield.getAuthUrl();

  const setLayout = () => {
    setSystem({
      module: './layout',
      scope: 'layout',
      url: `${edit_modal_.BLOX_ENV_URL_layout}/remoteEntry.js`
    });
  };

  const {
    Component: FederatedComponent,
    errorLoading
  } = (0,ab_federation_helpers/* useFederatedComponent */.DS)(system?.url, system?.scope, system?.module, index_js_);
  (0,index_js_.useEffect)(async () => {
    console.log('App.js: useEffect isLoggedIn', isLoggedIn); // if (isLoggedIn) return;

    console.log('App.js: useEffect');
    await shield.init('pRntLlwaYV2OuN_1Kc3Ua-6255');
    const isLoggedinn = await shield.verifyLogin();
    console.log('entered', isLoggedinn);
    setIsLoggedIn(isLoggedinn);
    if (isLoggedIn) setLayout();
  }, [isLoggedIn]);
  return /*#__PURE__*/index_js_.createElement(index_js_.Suspense, {
    fallback: ''
  }, /*#__PURE__*/index_js_.createElement("div", {
    className: "App"
  }, isLoggedIn ? /*#__PURE__*/index_js_.createElement("div", null, errorLoading ? `Error loading module "${module}"` : FederatedComponent && /*#__PURE__*/index_js_.createElement(FederatedComponent, null, /*#__PURE__*/index_js_.createElement(routes_AppRoute, null))) : /*#__PURE__*/index_js_.createElement("div", null, "Loading")));
};

/* harmony default export */ const src_App = (App);
// EXTERNAL MODULE: consume shared module (default) react-dom@^17.0.2 (singleton) (fallback: ./node_modules/react-dom/index.js)
var react_dom_index_js_ = __webpack_require__(181);
;// CONCATENATED MODULE: ./src/bootstrap.js




react_dom_index_js_.render( /*#__PURE__*/index_js_.createElement(react_router_dom_js_.BrowserRouter, null, /*#__PURE__*/index_js_.createElement(src_App, null)), document.getElementById('root'));

/***/ })

}]);