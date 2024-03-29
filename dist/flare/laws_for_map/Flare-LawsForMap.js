(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],2:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseUniq = require('../internal/baseUniq'),
    isIterateeCall = require('../internal/isIterateeCall'),
    sortedUniq = require('../internal/sortedUniq');

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurence of each element
 * is kept. Providing `true` for `isSorted` performs a faster search algorithm
 * for sorted arrays. If an iteratee function is provided it's invoked for
 * each element in the array to generate the criterion by which uniqueness
 * is computed. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments: (value, index, array).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias unique
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {boolean} [isSorted] Specify the array is sorted.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new duplicate-value-free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 *
 * // using `isSorted`
 * _.uniq([1, 1, 2], true);
 * // => [1, 2]
 *
 * // using an iteratee function
 * _.uniq([1, 2.5, 1.5, 2], function(n) {
 *   return this.floor(n);
 * }, Math);
 * // => [1, 2.5]
 *
 * // using the `_.property` callback shorthand
 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniq(array, isSorted, iteratee, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  if (isSorted != null && typeof isSorted != 'boolean') {
    thisArg = iteratee;
    iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
    isSorted = false;
  }
  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
  return (isSorted)
    ? sortedUniq(array, iteratee)
    : baseUniq(array, iteratee);
}

module.exports = uniq;

},{"../internal/baseCallback":10,"../internal/baseUniq":29,"../internal/isIterateeCall":52,"../internal/sortedUniq":59}],3:[function(require,module,exports){
var baseEach = require('../internal/baseEach'),
    createFind = require('../internal/createFind');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
var find = createFind(baseEach);

module.exports = find;

},{"../internal/baseEach":13,"../internal/createFind":39}],4:[function(require,module,exports){
var baseMatches = require('../internal/baseMatches'),
    find = require('./find');

/**
 * Performs a deep comparison between each element in `collection` and the
 * source object, returning the first element that has equivalent property
 * values.
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. For comparing a single
 * own or inherited property value see `_.matchesProperty`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Object} source The object of property values to match.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
 * // => 'barney'
 *
 * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
 * // => 'fred'
 */
function findWhere(collection, source) {
  return find(collection, baseMatches(source));
}

module.exports = findWhere;

},{"../internal/baseMatches":23,"./find":3}],5:[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cachePush":33,"./getNative":45}],6:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],7:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],8:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],9:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"../object/keys":72,"./baseCopy":12}],10:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    property = require('../utility/property');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":77,"../utility/property":78,"./baseMatches":23,"./baseMatchesProperty":24,"./bindCallback":30}],11:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseAssign = require('./baseAssign'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseAssign(result, value);
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return its corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":66,"../lang/isObject":69,"./arrayCopy":6,"./arrayEach":7,"./baseAssign":9,"./baseForOwn":17,"./initCloneArray":47,"./initCloneByTag":48,"./initCloneObject":49}],12:[function(require,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],13:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    createBaseEach = require('./createBaseEach');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./baseForOwn":17,"./createBaseEach":36}],14:[function(require,module,exports){
/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],15:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],16:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":37}],17:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":72,"./baseFor":16}],18:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./toObject":60}],19:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":46}],20:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

module.exports = baseIsEqual;

},{"../lang/isObject":69,"./baseIsEqualDeep":21,"./isObjectLike":55}],21:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":66,"../lang/isTypedArray":70,"./equalArrays":40,"./equalByTag":41,"./equalObjects":42}],22:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} matchData The propery names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = toObject(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":20,"./toObject":60}],23:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    getMatchData = require('./getMatchData'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value && (value !== undefined || (key in toObject(object)));
    };
  }
  return function(object) {
    return baseIsMatch(object, matchData);
  };
}

module.exports = baseMatches;

},{"./baseIsMatch":22,"./getMatchData":44,"./toObject":60}],24:[function(require,module,exports){
var baseGet = require('./baseGet'),
    baseIsEqual = require('./baseIsEqual'),
    baseSlice = require('./baseSlice'),
    isArray = require('../lang/isArray'),
    isKey = require('./isKey'),
    isStrictComparable = require('./isStrictComparable'),
    last = require('../array/last'),
    toObject = require('./toObject'),
    toPath = require('./toPath');

/**
 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(srcValue),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === srcValue
      ? (srcValue !== undefined || (key in object))
      : baseIsEqual(srcValue, object[key], undefined, true);
  };
}

module.exports = baseMatchesProperty;

},{"../array/last":1,"../lang/isArray":66,"./baseGet":18,"./baseIsEqual":20,"./baseSlice":27,"./isKey":53,"./isStrictComparable":57,"./toObject":60,"./toPath":61}],25:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],26:[function(require,module,exports){
var baseGet = require('./baseGet'),
    toPath = require('./toPath');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

module.exports = basePropertyDeep;

},{"./baseGet":18,"./toPath":61}],27:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],28:[function(require,module,exports){
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],29:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed, 0) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./baseIndexOf":19,"./cacheIndexOf":32,"./createCache":38}],30:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":77}],31:[function(require,module,exports){
(function (global){
/** Native method references. */
var ArrayBuffer = global.ArrayBuffer,
    Uint8Array = global.Uint8Array;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  var result = new ArrayBuffer(buffer.byteLength),
      view = new Uint8Array(result);

  view.set(new Uint8Array(buffer));
  return result;
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],32:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":69}],33:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":69}],34:[function(require,module,exports){
/**
 * Used by `_.trim` and `_.trimLeft` to get the index of the first character
 * of `string` that is not found in `chars`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @param {string} chars The characters to find.
 * @returns {number} Returns the index of the first character not found in `chars`.
 */
function charsLeftIndex(string, chars) {
  var index = -1,
      length = string.length;

  while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
  return index;
}

module.exports = charsLeftIndex;

},{}],35:[function(require,module,exports){
/**
 * Used by `_.trim` and `_.trimRight` to get the index of the last character
 * of `string` that is not found in `chars`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @param {string} chars The characters to find.
 * @returns {number} Returns the index of the last character not found in `chars`.
 */
function charsRightIndex(string, chars) {
  var index = string.length;

  while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
  return index;
}

module.exports = charsRightIndex;

},{}],36:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./getLength":43,"./isLength":54,"./toObject":60}],37:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":60}],38:[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
function createCache(values) {
  return (nativeCreate && Set) ? new SetCache(values) : null;
}

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./SetCache":5,"./getNative":45}],39:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseFind = require('./baseFind'),
    baseFindIndex = require('./baseFindIndex'),
    isArray = require('../lang/isArray');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFind(eachFunc, fromRight) {
  return function(collection, predicate, thisArg) {
    predicate = baseCallback(predicate, thisArg, 3);
    if (isArray(collection)) {
      var index = baseFindIndex(collection, predicate, fromRight);
      return index > -1 ? collection[index] : undefined;
    }
    return baseFind(collection, predicate, eachFunc);
  };
}

module.exports = createFind;

},{"../lang/isArray":66,"./baseCallback":10,"./baseFind":14,"./baseFindIndex":15}],40:[function(require,module,exports){
var arraySome = require('./arraySome');

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

module.exports = equalArrays;

},{"./arraySome":8}],41:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],42:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":72}],43:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":25}],44:[function(require,module,exports){
var isStrictComparable = require('./isStrictComparable'),
    pairs = require('../object/pairs');

/**
 * Gets the propery names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = pairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"../object/pairs":74,"./isStrictComparable":57}],45:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":68}],46:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],47:[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],48:[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":31}],49:[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],50:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":43,"./isLength":54}],51:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],52:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":69,"./isArrayLike":50,"./isIndex":51}],53:[function(require,module,exports){
var isArray = require('../lang/isArray'),
    toObject = require('./toObject');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

module.exports = isKey;

},{"../lang/isArray":66,"./toObject":60}],54:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],55:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],56:[function(require,module,exports){
/**
 * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
 * character code is whitespace.
 *
 * @private
 * @param {number} charCode The character code to inspect.
 * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
 */
function isSpace(charCode) {
  return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
    (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
}

module.exports = isSpace;

},{}],57:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"../lang/isObject":69}],58:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":65,"../lang/isArray":66,"../object/keysIn":73,"./isIndex":51,"./isLength":54}],59:[function(require,module,exports){
/**
 * An implementation of `_.uniq` optimized for sorted arrays without support
 * for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate free array.
 */
function sortedUniq(array, iteratee) {
  var seen,
      index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (!index || seen !== computed) {
      seen = computed;
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = sortedUniq;

},{}],60:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":69}],61:[function(require,module,exports){
var baseToString = require('./baseToString'),
    isArray = require('../lang/isArray');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = toPath;

},{"../lang/isArray":66,"./baseToString":28}],62:[function(require,module,exports){
var isSpace = require('./isSpace');

/**
 * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the first non-whitespace character.
 */
function trimmedLeftIndex(string) {
  var index = -1,
      length = string.length;

  while (++index < length && isSpace(string.charCodeAt(index))) {}
  return index;
}

module.exports = trimmedLeftIndex;

},{"./isSpace":56}],63:[function(require,module,exports){
var isSpace = require('./isSpace');

/**
 * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedRightIndex(string) {
  var index = string.length;

  while (index-- && isSpace(string.charCodeAt(index))) {}
  return index;
}

module.exports = trimmedRightIndex;

},{"./isSpace":56}],64:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it's
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var shallow = _.clone(users);
 * shallow[0] === users[0];
 * // => true
 *
 * var deep = _.clone(users, true);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.clone(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
    isDeep = false;
  }
  else if (typeof isDeep == 'function') {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;
  }
  return typeof customizer == 'function'
    ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3))
    : baseClone(value, isDeep);
}

module.exports = clone;

},{"../internal/baseClone":11,"../internal/bindCallback":30,"../internal/isIterateeCall":52}],65:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":50,"../internal/isObjectLike":55}],66:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":45,"../internal/isLength":54,"../internal/isObjectLike":55}],67:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":69}],68:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":55,"./isFunction":67}],69:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],70:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":54,"../internal/isObjectLike":55}],71:[function(require,module,exports){
/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;

},{}],72:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":45,"../internal/isArrayLike":50,"../internal/shimKeys":58,"../lang/isObject":69}],73:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":51,"../internal/isLength":54,"../lang/isArguments":65,"../lang/isArray":66,"../lang/isObject":69}],74:[function(require,module,exports){
var keys = require('./keys'),
    toObject = require('../internal/toObject');

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"../internal/toObject":60,"./keys":72}],75:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Capitalizes the first character of `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('fred');
 * // => 'Fred'
 */
function capitalize(string) {
  string = baseToString(string);
  return string && (string.charAt(0).toUpperCase() + string.slice(1));
}

module.exports = capitalize;

},{"../internal/baseToString":28}],76:[function(require,module,exports){
var baseToString = require('../internal/baseToString'),
    charsLeftIndex = require('../internal/charsLeftIndex'),
    charsRightIndex = require('../internal/charsRightIndex'),
    isIterateeCall = require('../internal/isIterateeCall'),
    trimmedLeftIndex = require('../internal/trimmedLeftIndex'),
    trimmedRightIndex = require('../internal/trimmedRightIndex');

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  var value = string;
  string = baseToString(string);
  if (!string) {
    return string;
  }
  if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
    return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
  }
  chars = (chars + '');
  return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
}

module.exports = trim;

},{"../internal/baseToString":28,"../internal/charsLeftIndex":34,"../internal/charsRightIndex":35,"../internal/isIterateeCall":52,"../internal/trimmedLeftIndex":62,"../internal/trimmedRightIndex":63}],77:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],78:[function(require,module,exports){
var baseProperty = require('../internal/baseProperty'),
    basePropertyDeep = require('../internal/basePropertyDeep'),
    isKey = require('../internal/isKey');

/**
 * Creates a function that returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"../internal/baseProperty":25,"../internal/basePropertyDeep":26,"../internal/isKey":53}],79:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractFirst = exports._tokenize = undefined;
exports.parse = parse;
exports.extractAll = extractAll;
exports.extractFirstOfType = extractFirstOfType;
exports.extractAllOfType = extractAllOfType;

var _lexerUtils = require('./lexer-utils');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var BRA = (0, _lexerUtils.regex)('BRA', /</);
var KET = (0, _lexerUtils.regex)('KET', />/);
var WHITESPACE = (0, _lexerUtils.skip)((0, _lexerUtils.regex)('WHITESPACE', /\s+/));
var IDENTIFIER = (0, _lexerUtils.regex)('IDENTIFIER', /[a-zA-Z_][a-zA-Z0-9-_]*/);
var KEY = (0, _lexerUtils.regex)('KEY', /[a-zA-Z_][a-zA-Z0-9-_]*/);
var KEYVALSEP = (0, _lexerUtils.regex)('KEYVALSEP', /:/);
var KEYVAL = (0, _lexerUtils.seq)(KEY, (0, _lexerUtils.optional)(WHITESPACE), KEYVALSEP);
var SLASH = (0, _lexerUtils.regex)('SLASH', /\//);

// Bare strings are complicated because we need to allow commas between key
// value pairs to be optional. So in the following string,
//
//     foo bar baz: 10
//
// we want to match 'foo bar', not 'foo bar baz'

var SIGNIFICANT_WHITESPACE = (0, _lexerUtils.regex)('SIGNIFICANT_WHITESPACE', /\s+/);
var BAREWORD = (0, _lexerUtils.regex)('BAREWORD', /[^,:><"\s]+/);

var BARESTRING = (0, _lexerUtils.concat)('BARESTRING', (0, _lexerUtils.seq)(BAREWORD, (0, _lexerUtils.repeat)((0, _lexerUtils.notFollowedBy)((0, _lexerUtils.seq)(SIGNIFICANT_WHITESPACE, BAREWORD), (0, _lexerUtils.seq)((0, _lexerUtils.optional)(WHITESPACE), KEYVALSEP)))));

var parseStringLiteral = function parseStringLiteral(str) {
  return JSON.parse(str.replace(/\n/g, '\\n'));
};

var COMMA = (0, _lexerUtils.regex)('COMMA', /,/);
var NUMBER = (0, _lexerUtils.regex)('NUMBER', /-?[0-9]+(\.[0-9]+)?/);
var BOOLEAN = (0, _lexerUtils.regex)('BOOLEAN', /(true|false)/, 'i');
var QUOTEDSTRING = (0, _lexerUtils.regex)('QUOTEDSTRING', /"(\\.|[^"\\])*"/);

var lex = (0, _lexerUtils.Lexer)((0, _lexerUtils.or)(WHITESPACE,

// <key: "val">
// ^
BRA,

// <key: "val">
//            ^
KET,

// <one: 1, two: 2>
//        ^
COMMA,

// <key: "val">
//  ^^^^
(0, _lexerUtils.seq)(KEY, (0, _lexerUtils.optional)(WHITESPACE), KEYVALSEP),

// <Identifier key: "val">
//  ^^^^^^^^^^
(0, _lexerUtils.seq)((0, _lexerUtils.precededByToken)('BRA'), (0, _lexerUtils.optional)(WHITESPACE), (0, _lexerUtils.notFollowedBy)(IDENTIFIER, COMMA)),

// </Identifier>
//  ^^^^^^^^^^^^
(0, _lexerUtils.seq)((0, _lexerUtils.precededByToken)('BRA'), SLASH, (0, _lexerUtils.optional)(WHITESPACE), IDENTIFIER, (0, _lexerUtils.optional)(WHITESPACE), KET), KEYVALSEP, NUMBER, BOOLEAN, QUOTEDSTRING, BARESTRING));

/*

Grammar:

OPTS = < ARGS > | < IDENT : ARGS >
ARGS = ARG | ARGS , ARG
ARG = KEY : VAL | VAL

*/

// Parses a list of arguments.
function parseArgs(tokenStream) {
  var options = { args: [] };
  var result, nextArg, nextStream;

  while (result = parseArg(tokenStream)) {

    // We want to support two different syntaxes, because the RPG Maker
    // community has ridiculous conventions:
    //
    //     <currency value: 10, name: Gold Stars>
    //
    // In the above, a comma separates key-value pairs. But we also want to
    // support,
    //
    //     <currency value: 10 name: Gold Stars>
    //
    // Where the commas between key value pairs are optional. However, commas
    // are still required between positional args. So this is,
    //
    //     <currency value: 10 name: Gold Stars foo, bar, baz>
    //
    // is not valid, because it's ambiguous -- either of these two
    // interpretatations are reasonable:
    //
    //     { ..., name: "Gold Stars", args: ["foo", "bar", "baz"] }
    //
    //     { ..., name: "Gold Stars foo", args: ["bar", "baz"] }
    //
    // If it weren't for allowing bare strings, everything would be okay. :)
    //
    // So there's a couple of things we have to do. First, we need to modify
    // our bare-string lexer (already done) not to lex multi-word bare strings
    // ending with a key and a colon. This is so that,
    //
    //     <currency name: Gold Stars value: 10>
    //
    // lexes into ..., Token('BARESTRING', 'Gold Stars'), Token('KEY', 'value'), ...
    // instead of ..., Token('BARESTRING', 'Gold Stars value'), Token('KEYVALSEP', ':'), ...
    //
    // Next, if we parse a key-value pair we need to see what token follows it.
    // It may either be
    //
    // 1. A comma, in which case we're done checking. We move onto the next
    //    iteration.
    // 2. A key-value pair, in which case we proceed like above, but we don't
    //    skip over the comma. (Since there isn't one.)
    // 3. A closing ket.
    //
    // All other following tokens are invalid.

    var _result = result;

    var _result2 = _slicedToArray(_result, 2);

    nextArg = _result2[0];
    nextStream = _result2[1];
    if ((typeof nextArg === 'undefined' ? 'undefined' : _typeof(nextArg)) === 'object') {
      options = _extends({}, options, nextArg);

      var isFollowedByComma = nextStream.ofType('COMMA');
      var isFollowedByKeyVal = nextStream.ofType('KEY') && nextStream.advance().ofType('KEYVALSEP');

      if (isFollowedByComma) {
        tokenStream = nextStream.advance();
      } else if (isFollowedByKeyVal) {
        tokenStream = nextStream;
      } else {
        return [options, nextStream];
      }
    } else {
      options = _extends({}, options, { args: options.args.concat(nextArg) });

      if (nextStream.empty || nextStream.get().type != 'COMMA') {
        return [options, nextStream];
      }
      tokenStream = nextStream.advance();
    }
  }

  return [options, tokenStream];
}

// Parses an argument - either a key-value pair or a positional argument.
function parseArg(tokenStream) {
  return parseKeyVal(tokenStream) || parseVal(tokenStream);
}

// Parses a key-value pair.
function parseKeyVal(tokenStream) {
  if (tokenStream.length < 3) {
    return null;
  }

  if (!tokenStream.ofType('KEY') || !tokenStream.advance().ofType('KEYVALSEP')) {
    return null;
  }

  var val = parseVal(tokenStream.advance(2));

  if (!val) {
    return null;
  }

  return [_defineProperty({}, tokenStream.get().token, val[0]), tokenStream.advance(3)];
}

// Parses the value from a key-value pair, or a bare value as a positional
// argument.
function parseVal(stream) {
  if (stream.empty) {
    return null;
  }

  var _stream$get = stream.get();

  var token = _stream$get.token;
  var type = _stream$get.type;

  switch (type) {
    case 'NUMBER':
      return [Number(token), stream.advance()];
    case 'QUOTEDSTRING':
      return [parseStringLiteral(token), stream.advance()];
    case 'BARESTRING':
    case 'KEY':
      return [token, stream.advance()];
    case 'BOOLEAN':
      return [token.toLowerCase() === 'true' ? true : false, stream.advance()];
    default:
      return null;
  }
}

// Parses an "anonymous" object, that is one without a name.
//
// Example:
//
//   <foo: 123, bar: "baz">
function parseAnonymousObject(tokenStream) {
  if (tokenStream.length < 3) {
    return null;
  }

  if (!tokenStream.ofType('BRA')) {
    return null;
  }

  var argsMatch = parseArgs(tokenStream.advance());

  if (!argsMatch) {
    return null;
  }

  var _argsMatch = _slicedToArray(argsMatch, 2);

  var object = _argsMatch[0];
  var ketStream = _argsMatch[1];

  if (!ketStream.ofType('KET')) {
    return null;
  }

  return [object, ketStream.advance()];
}

// Parses a "named" object.
//
// Example:
//
//   <Currency name: "Foo">
function parseNamedObject(tokenStream) {
  if (tokenStream.length < 3) {
    return null;
  }

  var secondTokenStream = tokenStream.advance();

  if (!tokenStream.ofType('BRA') || !secondTokenStream.ofType('IDENTIFIER')) {
    return null;
  }

  var argsMatch = parseArgs(tokenStream.advance(2));

  if (!argsMatch) {
    return null;
  }

  var _argsMatch2 = _slicedToArray(argsMatch, 2);

  var object = _argsMatch2[0];
  var ketStream = _argsMatch2[1];

  if (!ketStream.ofType('KET')) {
    return null;
  }

  // e.g. Currency
  var type = secondTokenStream.get().token;

  // At this point, we have a valid object. But we might also have a block of
  // text to parse after it.
  var endTagStream = findSequence(function (stream) {
    return streamAtSequence(['BRA', 'SLASH', 'IDENTIFIER', 'KET'], stream) && stream.advance(2).get().token === type;
  }, ketStream.advance());

  if (endTagStream) {
    var fullString = ketStream.get().string;
    var blockString = fullString.slice(ketStream.get().pos + 1, endTagStream.get().pos);

    return [_extends({}, object, { type: type, block: chompLinebreaks(blockString) }), endTagStream.advance(4)];
  } else {
    return [_extends({}, object, { type: type }), ketStream.advance()];
  }
}

var chompLinebreaks = function chompLinebreaks(str) {
  return str.replace(/^\n/, '').replace(/\n$/, '');
};

// true if the stream is pointing at the given sequence of token names
function streamAtSequence(tokenNames, stream) {
  for (var i = 0; i < tokenNames.length; i++) {
    if (!stream.advance(i).ofType(tokenNames[i])) {
      return false;
    }
  }

  return true;
}

// Looks for a sequence of tokens somewhere ahead in the stream.
//
// If present, returns the stream starting at the match.
//
// Otherwise returns null.
function findSequence(fn, stream) {
  while (stream.present) {
    if (fn(stream)) {
      return stream;
    }

    stream = stream.advance();
  }

  return null;
}

function parseObject(tokenStream) {
  return parseAnonymousObject(tokenStream) || parseNamedObject(tokenStream);
}

function parseTokenStream(tokenStream) {
  var parsed = parseObject(tokenStream);
  if (parsed) {
    return parsed[0];
  } else {
    return null;
  }
}

var _tokenize = exports._tokenize = function _tokenize(str) {
  return (0, _lexerUtils.TokenStream)(lex(str));
};

function parse(str) {
  return parseTokenStream((0, _lexerUtils.TokenStream)(lex(str)));
}

// Extract all tags contained inside a possibly-unrelated string of text.
function extractAll(str) {
  var tokenStream = (0, _lexerUtils.TokenStream)(lex(str));
  var objects = [];

  while (tokenStream.present) {
    var parsed = parseObject(tokenStream);

    if (parsed) {
      objects.push(parsed[0]);
      tokenStream = parsed[1];
    } else {
      tokenStream = tokenStream.advance();
    }
  }

  return objects;
}

function extractFirstMatching(fn) {
  return function (str) {
    var tokenStream = (0, _lexerUtils.TokenStream)(lex(str));
    var objects = [];

    while (tokenStream.present) {
      var parsed = parseObject(tokenStream);

      if (parsed && fn(parsed[0])) {
        return parsed[0];
      } else {
        tokenStream = tokenStream.advance();
      }
    }

    return null;
  };
}

var extractFirst = exports.extractFirst = extractFirstMatching(function () {
  return true;
});

function extractFirstOfType(str, type) {
  return extractFirstMatching(function (opts) {
    return opts.type === type;
  })(str);
}

function extractAllOfType(str, type) {
  return extractAll(str).filter(function (opts) {
    return opts.type === type;
  });
}
},{"./lexer-utils":80}],80:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterStream = CharacterStream;
exports.TokenStream = TokenStream;
exports.regex = regex;
exports.skip = skip;
exports.optional = optional;
exports.seq = seq;
exports.precededByToken = precededByToken;
exports.map = map;
exports.or = or;
exports.repeat = repeat;
exports.concat = concat;
exports.notFollowedBy = notFollowedBy;
exports.Lexer = Lexer;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Construct a token.
//
// type - e.g. 'UNDERSCORE'
// token - e.g. '_'
// pos - the (starting) position in the string where it occurred
// string - the full string being tokenized
function _Token(type, token, pos, string) {
  return { type: type, token: token, pos: pos, string: string };
}

// Construct a response returned by a lexer.
//
// tokens - an array of tokens generated by the lexer; may be empty
// newCharacterStream - a new character stream for the next lexer
exports.Token = _Token;
function LexerResponse(tokens, newCharacterStream) {
  return { tokens: tokens, newCharacterStream: newCharacterStream };
}

// A simple "stream" wrapper around an array or string.
//
// Input:
//
//   buffer - the underlying array/string
//   pos - the 'zero' index of the stream
//
// Properties:
//
//   length - the length of the buffer remaining from index pos
//   present - whether the above length is not zero
//   empty - negation of the above
//   rest() - the buffer sliced from pos onward
//   get() - the item in the buffer at pos
//   advance(index = 1) - advance the stream forward by `index` characters;
//                        returns a new Stream
//   take(n) - return the next `n` items in the stream (or as many as are left,
//             whichever is greater)
//
// The calling code can pretend they're just dealing with the slice, but we
// keep track of where we are in the underlying list.

function Stream(buffer) {
  var pos = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return {
    buffer: buffer,
    pos: pos,
    length: buffer.length - pos,
    present: pos < buffer.length,
    empty: pos >= buffer.length,
    rest: function rest() {
      return buffer.slice(pos);
    },
    get: function get() {
      return buffer[pos];
    },
    advance: function advance() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      return Stream(buffer, pos + index);
    },
    take: function take(n) {
      return buffer.slice(pos, pos + n);
    }
  };
}

function CharacterStream(fullString) {
  var pos = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return _extends({}, Stream(fullString, pos), {
    advance: function advance() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      return CharacterStream(fullString, pos + index);
    },
    flush: function flush() {
      return CharacterStream(fullString, fullString.length);
    },
    Token: function Token(type, token) {
      return _Token(type, token, pos, fullString);
    }
  });
}

function TokenStream(buffer) {
  var pos = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  var string = buffer.length > 0 ? buffer[0].string : "";

  return _extends({}, Stream(buffer, pos), {

    // advance to the next token
    advance: function advance() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      return TokenStream(buffer, pos + index);
    },

    // is the cursor at a token of type `type`?
    ofType: function ofType(type) {
      return pos < buffer.length && buffer[pos].type === type;
    },

    // the original string being parsed
    string: string
  });
}

// Define a tokenizer matching what's left in the stream with a regex. A `^` is
// automatically prepended to the regex, so there is no need to include it
// yourself.
//
// Example:
//
//   const WORD = regex('WORD', /\S+\s*/);
//   Lexer(WORD)('this is a string')
//   // => [
//     Token('WORD',  'this ',    0),
//     Token('WORD',  'is ',      5),
//     Token('WORD',  'a ',       8),
//     Token('WORD',  'string ',  10)
//   ]
//  
function regex(type, regex) {
  var flags = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

  var massagedRegex = new RegExp(/^/.source + regex.source, flags);

  return function (previousTokens, charStream) {
    var match;
    if (match = charStream.rest().match(massagedRegex)) {
      return LexerResponse([charStream.Token(type, match[0])], charStream.advance(match[0].length));
    } else {
      return null;
    }
  };
}

// Like the regex matcher, but throws away the matched token.
function skip(baseMatcher) {
  return function (previousTokens, charStream) {
    var match;
    if (match = baseMatcher(previousTokens, charStream)) {
      return LexerResponse([], match.newCharacterStream);
    } else {
      return null;
    }
  };
}

function optional(matcher) {
  return function (previousTokens, charStream) {
    var match;
    if (match = matcher(previousTokens, charStream)) {
      return LexerResponse([], match.newCharacterStream);
    } else {
      return LexerResponse([], charStream);
    }
  };
}

function seq2(first, second) {
  return function (previousTokens, charStream) {
    var firstMatch = first(previousTokens, charStream);

    if (!firstMatch) {
      return null;
    }

    var secondMatch = second([].concat(_toConsumableArray(previousTokens), _toConsumableArray(firstMatch.tokens)), firstMatch.newCharacterStream);

    if (!secondMatch) {
      return null;
    }

    return LexerResponse([].concat(_toConsumableArray(firstMatch.tokens), _toConsumableArray(secondMatch.tokens)), secondMatch.newCharacterStream);
  };
}

function seq(firstMatcher, secondMatcher, thirdMatcher) {
  var _seq2 = seq2(firstMatcher, secondMatcher);

  if (thirdMatcher) {
    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    return seq.apply(undefined, [_seq2, thirdMatcher].concat(rest));
  } else {
    return _seq2;
  }
}

function precededByToken(type) {
  return function (previousTokens, charStream) {
    var lastToken = previousTokens[previousTokens.length - 1];
    if (lastToken && lastToken.type == type) {
      return LexerResponse([], charStream);
    } else {
      return null;
    }
  };
}

function map(fn, matcher) {
  return function (previousTokens, charStream) {
    var match;
    if (match = matcher(previousTokens, charStream)) {
      var mappedTokens = match.tokens.map(function (_ref) {
        var type = _ref.type;
        var token = _ref.token;
        var pos = _ref.pos;
        var string = _ref.string;
        return _Token(type, fn(token), pos, string);
      });

      return LexerResponse(mappedTokens, match.newCharacterStream);
    } else {
      return null;
    }
  };
}

function or() {
  for (var _len2 = arguments.length, matchers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    matchers[_key2] = arguments[_key2];
  }

  return function (previousTokens, charStream) {
    var match;
    for (var i = 0; i < matchers.length; i++) {
      if (match = matchers[i](previousTokens, charStream)) {
        return match;
      }
    }

    return null;
  };
}

function repeat(matcher) {
  return function (previousTokens, charStream) {
    var tokens = [];
    var counter = 0;

    while (charStream.present) {
      var match = matcher(tokens, charStream);

      if (!match) {
        break;
      }

      tokens = [].concat(_toConsumableArray(tokens), _toConsumableArray(match.tokens));

      // Don't get caught in an infinite loop.
      if (match.newCharacterStream.pos === charStream.pos) {
        return LexerResponse(tokens, match.newCharacterStream);
      }

      if (counter++ > 10000) {
        throw "tried to lex more than 10,000 tokens - this is probably a bug.";
      }

      charStream = match.newCharacterStream;
    }

    return LexerResponse(tokens, charStream);
  };
}

// Concatenates the (string) tokens returned by a matcher into a single string.
function concat(type, matcher) {
  return function (previousTokens, charStream) {
    var match = matcher(previousTokens, charStream);

    if (match) {
      var joinedToken = match.tokens.map(function (t) {
        return t.token;
      }).join("");
      return LexerResponse([charStream.Token(type, joinedToken)], match.newCharacterStream);
    } else {
      return null;
    }
  };
}

function notFollowedBy(mustMatch, mustNotMatch) {
  return function (previousTokens, charStream) {
    var match = mustMatch(previousTokens, charStream);

    if (!match) {
      return null;
    }

    var nextMatch = mustNotMatch([].concat(_toConsumableArray(previousTokens), _toConsumableArray(match.tokens)), match.newCharacterStream);

    if (!nextMatch) {
      return match;
    } else {
      return null;
    }
  };
}

function Lexer(_lexer) {
  return function (str) {
    var charStream = CharacterStream(str);
    var matcher = repeat(or(_lexer, regex('UNKNOWN', /[^]*/)));

    return matcher([], charStream).tokens;
  };
}
},{}],81:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function capitalize(str, lowercaseRest) {
  str = makeString(str);
  var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();

  return str.charAt(0).toUpperCase() + remainingChars;
};

},{"./helper/makeString":86}],82:[function(require,module,exports){

var makeString = require('./helper/makeString');

var from  = "ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșšŝťțŭùúüűûñÿýçżźž",
    to    = "aaaaaaaaaccceeeeeghiiiijllnnoooooooossssttuuuuuunyyczzz";

from += from.toUpperCase();
to += to.toUpperCase();

to = to.split("");

// for tokens requireing multitoken output
from += "ß";
to.push('ss');


module.exports = function cleanDiacritics(str) {
    return makeString(str).replace(/.{1}/g, function(c){
      var index = from.indexOf(c);
      return index === -1 ? c : to[index];
  });
};

},{"./helper/makeString":86}],83:[function(require,module,exports){
var trim = require('./trim');

module.exports = function dasherize(str) {
  return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
};

},{"./trim":89}],84:[function(require,module,exports){
var escapeRegExp = require('./escapeRegExp');

module.exports = function defaultToWhiteSpace(characters) {
  if (characters == null)
    return '\\s';
  else if (characters.source)
    return characters.source;
  else
    return '[' + escapeRegExp(characters) + ']';
};

},{"./escapeRegExp":85}],85:[function(require,module,exports){
var makeString = require('./makeString');

module.exports = function escapeRegExp(str) {
  return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

},{"./makeString":86}],86:[function(require,module,exports){
/**
 * Ensure some object is a coerced to a string
 **/
module.exports = function makeString(object) {
  if (object == null) return '';
  return '' + object;
};

},{}],87:[function(require,module,exports){
var capitalize = require('./capitalize');
var underscored = require('./underscored');
var trim = require('./trim');

module.exports = function humanize(str) {
  return capitalize(trim(underscored(str).replace(/_id$/, '').replace(/_/g, ' ')));
};

},{"./capitalize":81,"./trim":89,"./underscored":90}],88:[function(require,module,exports){
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var trim = require('./trim');
var dasherize = require('./dasherize');
var cleanDiacritics = require("./cleanDiacritics");

module.exports = function slugify(str) {
  return trim(dasherize(cleanDiacritics(str).replace(/[^\w\s-]/g, '-').toLowerCase()), '-');
};

},{"./cleanDiacritics":82,"./dasherize":83,"./helper/defaultToWhiteSpace":84,"./helper/makeString":86,"./trim":89}],89:[function(require,module,exports){
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrim = String.prototype.trim;

module.exports = function trim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrim) return nativeTrim.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
};

},{"./helper/defaultToWhiteSpace":84,"./helper/makeString":86}],90:[function(require,module,exports){
var trim = require('./trim');

module.exports = function underscored(str) {
  return trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};

},{"./trim":89}],91:[function(require,module,exports){
// Wrap
// wraps a string by a certain width

makeString = require('./helper/makeString');

module.exports = function wrap(str, options){
	str = makeString(str);

	options = options || {};

	width = options.width || 75;
	seperator = options.seperator || '\n';
	cut = options.cut || false;
	preserveSpaces = options.preserveSpaces || false;
	trailingSpaces = options.trailingSpaces || false;

	if(width <= 0){
		return str;
	}

	else if(!cut){

		words = str.split(" ");
		result = "";
		current_column = 0;

		while(words.length > 0){
			
			// if adding a space and the next word would cause this line to be longer than width...
			if(1 + words[0].length + current_column > width){
				//start a new line if this line is not already empty
				if(current_column > 0){
					// add a space at the end of the line is preserveSpaces is true
					if (preserveSpaces){
						result += ' ';
						current_column++;
					}
					// fill the rest of the line with spaces if trailingSpaces option is true
					else if(trailingSpaces){
						while(current_column < width){
							result += ' ';
							current_column++;
						}						
					}
					//start new line
					result += seperator;
					current_column = 0;
				}
			}

			// if not at the begining of the line, add a space in front of the word
			if(current_column > 0){
				result += " ";
				current_column++;
			}

			// tack on the next word, update current column, a pop words array
			result += words[0];
			current_column += words[0].length;
			words.shift();

		}

		// fill the rest of the line with spaces if trailingSpaces option is true
		if(trailingSpaces){
			while(current_column < width){
				result += ' ';
				current_column++;
			}						
		}

		return result;

	}

	else {

		index = 0;
		result = "";

		// walk through each character and add seperators where appropriate
		while(index < str.length){
			if(index % width == 0 && index > 0){
				result += seperator;
			}
			result += str.charAt(index);
			index++;
		}

		// fill the rest of the line with spaces if trailingSpaces option is true
		if(trailingSpaces){
			while(index % width > 0){
				result += ' ';
				index++;
			}						
		}
		
		return result;
	}
};
},{"./helper/makeString":86}],92:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _optionParser = require('rmmv-mrp-core/option-parser');

var _punishments = require('./punishment_storage/punishments');

var _punishments2 = _interopRequireDefault(_punishments);

var _laws_for_map = require('./law_storage/laws_for_map');

var _laws_for_map2 = _interopRequireDefault(_laws_for_map);

var _uniq = require('lodash/array/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _clone = require('lodash/lang/clone');

var _clone2 = _interopRequireDefault(_clone);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _option_handler = require('./options/option_handler');

var _option_handler2 = _interopRequireDefault(_option_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Add a law to a global private name space.
 *
 * We take all the laws for the map and then remove all the duplicate laws.
 * After that we have to push the law up for the global private object that
 * is then used all over the place.
 */

var AddLawsForMap = (function () {

  /**
   * Seup the Punishment class
   */

  function AddLawsForMap() {
    _classCallCheck(this, AddLawsForMap);

    this._punishments = new _punishments2.default();
  }

  /**
   * Send the laws for storage.
   *
   * First remove duplicate laws.
   *
   * If we have more then three unique laws, grab only three random laws.
   *
   * Push those laws to a Law Management class.
   */

  _createClass(AddLawsForMap, [{
    key: 'grabMapInformation',
    value: function grabMapInformation() {
      var noteBoxData = $dataMap.note;
      var self = this;

      var noteData = (0, _optionParser.extractAllOfType)(noteBoxData, 'law');

      var arrayOfRandomLaws = [];
      var randomLawsNumber = parseInt(_option_handler2.default.getOptions().number_of_laws_for_map);

      // Get unique laws.
      noteData = (0, _uniq2.default)(noteData, function (lawInfo) {
        return lawInfo.name;
      });

      // If theres more then x laws (default: 3) randomize which ones we get.
      if (noteData.length > parseInt(_option_handler2.default.getOptions().number_of_laws_for_map)) {
        var lawsForRadomizing = (0, _clone2.default)(noteData);

        // Loop over, creating an array of three random and unique laws.
        while (randomLawsNumber > 0) {
          var index = this._generateRandomNumber(0, lawsForRadomizing.length);
          index = index - 1;

          if (index < 0) {
            index = 0;
          }

          arrayOfRandomLaws.push(lawsForRadomizing[index]);
          lawsForRadomizing.splice(index, 1);
          randomLawsNumber--;
        }
      } else {
        arrayOfRandomLaws = noteData;
      }

      if ((0, _isUndefined2.default)(_laws_for_map2.default._lawsForMap)) {
        _laws_for_map2.default.setLawsForMap([]);
      }

      for (var i = 0; i < arrayOfRandomLaws.length; i++) {
        if (arrayOfRandomLaws[i] instanceof Object && this.validatePunishment(arrayOfRandomLaws[i].punishment)) {
          _laws_for_map2.default.storeLaw(arrayOfRandomLaws[i], randomLawsNumber);
        }
      }
    }

    /**
     * Validate that the punishment exists.
     *
     * @return boolean
     */

  }, {
    key: 'validatePunishment',
    value: function validatePunishment(punishment) {
      if (this._punishments.hasPunishment(punishment)) {
        return true;
      }

      return false;
    }

    /**
     * Private method, generate a random number between min and max.
     *
     * @return int.
     */

  }, {
    key: '_generateRandomNumber',
    value: function _generateRandomNumber(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  }]);

  return AddLawsForMap;
})();

module.exports = AddLawsForMap;

},{"./law_storage/laws_for_map":97,"./options/option_handler":99,"./punishment_storage/punishments":100,"lodash/array/uniq":2,"lodash/lang/clone":64,"lodash/lang/isUndefined":71,"rmmv-mrp-core/option-parser":79}],93:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _laws_for_map = require('./law_storage/laws_for_map');

var _laws_for_map2 = _interopRequireDefault(_laws_for_map);

var _option_handler = require('./options/option_handler');

var _option_handler2 = _interopRequireDefault(_option_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*:
 * @plugindesc Allows you to have a set of laws for a map.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param Death State ID
 * @desc typically one, but you might have changed it ...
 * Default: 1
 * @default 1
 *
 * @param How many laws per map?
 * @desc default is 3 random laws.
 * Default: 3
 * @default 3
 *
 * @param Calculate law after or before battle?
 * @desc calculates the rewards before battle or after (see help)
 * Default: before
 * @default before
 *
 * @help
 *
 * You can have as many laws as you want, any less then 3 (default) we will show them, any more
 * then three will randomly be picked every time you enter the map.
 *
 * How to set up a law:
 *
 * <law
 *    name:"something"
 *    punishment:"gold"
 *    amount: 700
 *    icon: 26
 *    cantUse: "potion, attack, Fire"
 *    description: "I am required or the system will blow up, I can be long text with \c[5]color\c[0]."
 *  >
 *
 * ===============================================================
 * The above will be parsed by the parser if placed into the
 * the note box as it looks here.
 * ===============================================================
 *
 * - Keep the names the law short. The can't use should also be short,
 * any thing longer then the window doesn't wrap.
 *
 * - Items, weapons, skills must all match the name of the
 * the thing you want to create a law against.
 *
 * - You can ONLY have three "can't use" in the law. Any more I
 * cut it off.
 *
 * You can set up any number of laws for a map, how ever when the user
 * leaves around re-enters that map if you have more then three laws for
 * a map, I will randomize what laws are on that map and display only three.
 *
 * So if you set 50 laws for a map, you will only see three at any given time.
 *
 * All laws "cantUse" must be unique, that is if you have two laws with the same cantUse
 * but the first deals 1000 hp damage and the second takes 4000 gold, then we will take the first one,
 * because its find and return on first found.
 *
 * ==  What can a player not use? ==
 *
 * For battles: Attak, Item Name, Skill Name, Special Name
 * For out of battles: Item Name, Skill Name, Special Name
 *
 * Any skill name that targets a player or enemy can be used as a "cantUse" any thing like wait or a skill
 * that targets no one cannot be used.
 *
 * Enemies cannot break laws. Only players can.
 *
 * === Available Punishments ===
 *
 * You can punish on ONE of the following:
 *
 * gold, hp, mp, tp, xp
 *
 * You cannot punish th player multiple times for a single crime.
 *
 * You cannot remove weapons or armor or items from a player when
 * punishing them.
 *
 * === Cant Use ===
 *
 * How does this work? Well lets say you have an item that the player cannot
 * use on the map, or in battle.
 *
 * You would add it to the list of cantUse in the law and then when ever a player
 * uses said item either in battle or on the map they will be told they have broken
 * a law.
 *
 * -- Laws Can Kill! --
 *
 * If you tell a law that it will do x amount of damage to a player and the players
 * hp falls below 0 or to 0, we will kill the player. If every one in the party
 * is dead and you are on a map, you get the law  window saying hat the final
 * law was that you broke, who broke it and that the game is over.
 *
 * -- Laws can level you down --
 *
 * We allow you to punish on hp, mp, tp, gold and xp. when you state to punish
 * a player on xp, we will level that actor down based on if there xp falls
 * too low.
 *
 * -- Out of gold --
 *
 * If you punish on gold and tha party runs out, well then we tell you that
 * you have been fined x gold, but that the party is out of gold.
 *
 * === Law Rewards ===
 *
 * When you are setting up your laws for the map, you can also add a tag called
 * law rewards. Lets look at that now:
 *
 * <lawRewards i: 1 w: 45 a:67 gold: 20 xp: 90>
 *
 * This means that you will gain item id of 1, weapon id of 45 and armor id of 67.
 * gold of 20 will be assigned. All xp will be assigned directly after battle when
 * the other xp is gained. This xp also applies to the whole party, not just the
 * actor who didnt break any laws.
 *
 * Law rewards are only handed out if NO law is EVER broken. Assume you enter a map
 * and that map has 4 laws, if no law is broken then the reward is handed out. If any
 * law is broken out of the four then no reward is handed out.
 *
 * === Regarding Battles ===
 *
 * When you are in battle and you use something like attack or gaurd and you
 * have it set as a can't use, then we will tell the player that
 * person x broke a law and they are being punished x by amount y.
 *
 * Again remember that laws can kill.
 *
 * Also note, it doesn't matter if you hit or not, as long as you have done
 * the action then you are as good as guilty.
 *
 * === Calculating Law Rewards ===
 *
 * If you enter before for: Calculate law after or before battle? Then all the battles
 * on the map with will use the same rewards as the rewards are calculated on map load.
 *
 * If you enter after for: Calculate law after or before battle? Then all battles will
 * generate rewards, this is where you might want to do something like:
 *
 * <lawRewards i: "1 ~ x" w: "1 ~ x" a: "1 ~ x" xp: "1 ~ x" gold: "1 ~ x">
 *
 * This assures that every battle you get random rewards.
 */

/**
 * Contains public faceing data about laws on said map.
 */

var FlareLawsForMap = (function () {
  function FlareLawsForMap() {
    _classCallCheck(this, FlareLawsForMap);
  }

  _createClass(FlareLawsForMap, null, [{
    key: 'getLawsForMap',

    /**
     * Get the laws for the map.
     *
     * @return array of objects.
     */
    value: function getLawsForMap() {
      return _laws_for_map2.default.getLawsForMap();
    }
  }]);

  return FlareLawsForMap;
})();

// Set up the options.

_option_handler2.default.createOptionsStorage();

// Opens this up for the user.
window.FlareLawsForMap = FlareLawsForMap;

},{"./law_storage/laws_for_map":97,"./options/option_handler":99}],94:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _reward_storage = require('./reward_storage/reward_storage');

var _reward_storage2 = _interopRequireDefault(_reward_storage);

var _optionParser = require('rmmv-mrp-core/option-parser');

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _flare_random_number = require('../lib/number/flare_random_number');

var _flare_random_number2 = _interopRequireDefault(_flare_random_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GatherReward = (function () {
  function GatherReward() {
    _classCallCheck(this, GatherReward);

    _reward_storage2.default.createContainer();
    this._itemIdContainer = [];
  }

  _createClass(GatherReward, [{
    key: 'processPotentialRewards',
    value: function processPotentialRewards() {
      if (DataManager.isBattleTest()) {
        return;
      }

      var rewardData = (0, _optionParser.extractAllOfType)($dataMap.note, 'lawReward');
      rewardData = rewardData[0];

      if ((0, _isUndefined2.default)(rewardData)) {
        return;
      }

      // Collects things we can give phyiscally to the player
      this._storeReward(rewardData.a, $dataArmors, 'armors');
      this._storeReward(rewardData.w, $dataWeapons, 'weapons');
      this._storeReward(rewardData.i, $dataItems, 'items');

      if (this._getObjectForOtherRewards(rewardData.xp, 'xp') !== false) {
        _reward_storage2.default.setToStorage(this._getObjectForOtherRewards(rewardData.xp, 'xp'));
      }

      if (this._getObjectForOtherRewards(rewardData.gold, 'gold') !== false) {
        _reward_storage2.default.setToStorage(this._getObjectForOtherRewards(rewardData.gold, 'gold'));
      }
    }
  }, {
    key: '_getObjectForOtherRewards',
    value: function _getObjectForOtherRewards(data, key) {
      var otherTypesOfRewards = {};

      if (!(0, _isUndefined2.default)(data)) {
        if (isNaN(data)) {
          data = data.split('~');
          var randomAmount = _flare_random_number2.default.minMax(parseInt(data[0]), parseInt(data[1]));
          otherTypesOfRewards[key] = randomAmount;

          return otherTypesOfRewards;
        } else {
          otherTypesOfRewards[key] = data;
          return otherTypesOfRewards;
        }
      }

      return false;
    }
  }, {
    key: '_storeReward',
    value: function _storeReward(rewardData, dataObject, key) {
      var object = {};
      if (!(0, _isUndefined2.default)(rewardData)) {
        if (this._doesItemIdExist(rewardData, dataObject)) {
          // Store everything ...
          if (this._itemIdContainer.length > 0) {
            if (this._itemIdContainer.length === 1) {
              object[key] = this._itemIdContainer[0];
            } else {
              object[key] = this._itemIdContainer;
            }

            _reward_storage2.default.setToStorage(object);
            this._itemIdContainer = [];
          } else {
            object[key] = rewardData;
            _reward_storage2.default.setToStorage(object);
          }
        }
      }
    }
  }, {
    key: '_doesItemIdExist',
    value: function _doesItemIdExist(itemId, dataObject) {
      var ids = [];
      var found = false;

      // Does the item contain more then one item id.
      if (isNaN(itemId) && itemId.indexOf(',') !== -1) {
        ids = itemId.split(',');
      }

      // Does the player want randomized?
      if (isNaN(itemId) && itemId.indexOf('~') !== -1) {
        itemId = itemId.split('~');
        ids.push(_flare_random_number2.default.minMax(parseInt(itemId[0]), parseInt(itemId[1])));
      }

      if (ids.length > 0) {
        for (var i = 0; i < ids.length; i++) {
          for (var j = 1; j < dataObject.length; j++) {
            if (dataObject[j] !== null && j < 2999 && dataObject[j].id === parseInt(ids[i])) {
              this._itemIdContainer.push(dataObject[j].id);
            }
          }
        }

        if (this._itemIdContainer.length > 0) {
          return true;
        }
      } else {
        for (var i = 1; i < dataObject.length; i++) {
          if (dataObject[i] !== null && i < 2999 && dataObject[i].id === itemId) {
            return true;
          }
        }
      }

      return false;
    }
  }]);

  return GatherReward;
})();

module.exports = GatherReward;

},{"../lib/number/flare_random_number":125,"./reward_storage/reward_storage":104,"lodash/lang/isUndefined":71,"rmmv-mrp-core/option-parser":79}],95:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Store the broken law object alone with additional keys and values.
 */

var StoreBrokenLawObject = (function () {
  function StoreBrokenLawObject() {
    _classCallCheck(this, StoreBrokenLawObject);
  }

  _createClass(StoreBrokenLawObject, null, [{
    key: "emptyContainer",

    /**
     * Ensure the container is empty.
     */
    value: function emptyContainer() {
      this._brokenLawObject = {};
    }

    /**
     * Set an object to the container.
     *
     * @param object
     */

  }, {
    key: "setObject",
    value: function setObject(object) {
      this._brokenLawObject = object;
    }

    /**
     * Set a key with a value to the container.
     *
     * @param String key
     * @param mixed value
     */

  }, {
    key: "setKeyValue",
    value: function setKeyValue(key, value) {
      this._brokenLawObject[key] = value;
    }

    /**
     * Get the broken law container.
     *
     * @return object
     */

  }, {
    key: "getLawObject",
    value: function getLawObject() {
      return this._brokenLawObject;
    }
  }]);

  return StoreBrokenLawObject;
})();

module.exports = StoreBrokenLawObject;

},{}],96:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _laws_for_map = require('../law_storage/laws_for_map');

var _laws_for_map2 = _interopRequireDefault(_laws_for_map);

var _findWhere = require('lodash/collection/findWhere');

var _findWhere2 = _interopRequireDefault(_findWhere);

var _flare_law_was_broken_window_scene = require('../scenes/flare_law_was_broken_window_scene');

var _flare_law_was_broken_window_scene2 = _interopRequireDefault(_flare_law_was_broken_window_scene);

var _option_handler = require('../options/option_handler');

var _option_handler2 = _interopRequireDefault(_option_handler);

var _store_no_gold_message = require('../law_storage/store_no_gold_message');

var _store_no_gold_message2 = _interopRequireDefault(_store_no_gold_message);

var _slugify = require('underscore.string/slugify');

var _slugify2 = _interopRequireDefault(_slugify);

var _store_broken_law_object = require('./helper/store_broken_law_object');

var _store_broken_law_object2 = _interopRequireDefault(_store_broken_law_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * When a player breaks a law, we need to punish the actor.
 */

var ProcessBrokenLaw = (function () {

  /**
   * Set up the name of the action and the actor who broke the law
   *
   * @param string nameOfAction
   * @param Game_Actor actorWhoBrokeTheLaw
   */

  function ProcessBrokenLaw(nameOfAction, actorWhoBrokeLaw) {
    _classCallCheck(this, ProcessBrokenLaw);

    this._nameOfAction = (0, _slugify2.default)(nameOfAction);
    this._actorWhobrokeLaw = actorWhoBrokeLaw;
  }

  /**
   * Validate that the player actually broke a law.
   *
   * @return boolean
   */

  _createClass(ProcessBrokenLaw, [{
    key: 'validatePlayerBrokeTheLaw',
    value: function validatePlayerBrokeTheLaw() {
      for (var i = 0; i < _laws_for_map2.default.getLawsForMap().length; i++) {
        var cantUse = _laws_for_map2.default.getLawsForMap()[i].cantUse;

        if (cantUse.indexOf(',') === -1) {
          if ((0, _slugify2.default)(cantUse) === this._nameOfAction) {
            return true;
          }
        } else {
          cantUse = cantUse.split(',');
          for (var j = 0; j < cantUse.length; j++) {
            if ((0, _slugify2.default)([cantUse[j]]) === this._nameOfAction) {
              return true;
            }
          }
        }
      }

      return false;
    }

    /**
     * Get the actual broken law object.
     *
     * @return object lawObject
     */

  }, {
    key: 'getBrokenLawObject',
    value: function getBrokenLawObject() {
      _store_broken_law_object2.default.emptyContainer();

      for (var i = 0; i < _laws_for_map2.default.getLawsForMap().length; i++) {
        var cantUse = _laws_for_map2.default.getLawsForMap()[i].cantUse;

        if (cantUse.indexOf(',') === -1) {
          if ((0, _slugify2.default)(cantUse) === this._nameOfAction) {
            _store_broken_law_object2.default.setObject(_laws_for_map2.default.getLawsForMap()[i]);
            _store_broken_law_object2.default.setKeyValue('subject', this._actorWhobrokeLaw._name);
            _store_broken_law_object2.default.setKeyValue('actionUsed', this._nameOfAction);

            return _laws_for_map2.default.getLawsForMap()[i];
          }
        } else {
          cantUse = cantUse.split(',');
          for (var j = 0; j < cantUse.length; j++) {
            if ((0, _slugify2.default)([cantUse[j]]) === this._nameOfAction) {
              _store_broken_law_object2.default.setObject(_laws_for_map2.default.getLawsForMap()[i]);
              _store_broken_law_object2.default.setKeyValue('subject', this._actorWhobrokeLaw._name);
              _store_broken_law_object2.default.setKeyValue('actionUsed', this._nameOfAction);

              return _laws_for_map2.default.getLawsForMap()[i];
            }
          }
        }
      }
    }

    /**
     * Punish the player based on the laws punishment and amount.
     */

  }, {
    key: 'punishPlayer',
    value: function punishPlayer() {
      // If gold, take away gold.
      if (this.getBrokenLawObject().punishment === 'gold') {
        if ($gameParty._gold !== 0) {
          $gameParty._gold -= this.getBrokenLawObject().amount;

          if ($gameParty._gold < 0) {
            $gameParty._gold = 0;
          }
        }
      } else {
        // Handle non gold related punishments.
        this.handleOtherPunishments(this.getBrokenLawObject());
      }
    }

    /**
     * Check if the party has gold.
     *
     * When a law is broken and punishment is gold. We want to check if
     * the party has gold before we display a message.
     *
     * You can store the message for use later on. Use the
     *  static class to fetch.
     *
     * @param true/false
     * @return false if no gold.
     */

  }, {
    key: 'checkForGoldBeforePunish',
    value: function checkForGoldBeforePunish(storeMessage) {
      if (this.getBrokenLawObject().punishment === 'gold') {
        if ($gameParty._gold === 0) {
          if (!storeMessage) {
            $gameMessage.add('Party has no gold to take.');
          } else {
            _store_no_gold_message2.default.createStorage();
            _store_no_gold_message2.default.setMessage('Party has no gold to take.');
          }
        }
      }

      return false;
    }

    /**
     * Open a window displaying the broken law.
     *
     * Useful for menu related tasks.
     */

  }, {
    key: 'openMessageWindow',
    value: function openMessageWindow() {
      if (SceneManager._scene instanceof Scene_Item) {
        SceneManager.push(_flare_law_was_broken_window_scene2.default);
      } else if (SceneManager._scene instanceof Scene_Skill) {
        SceneManager.push(_flare_law_was_broken_window_scene2.default);
      }
    }

    /**
     * Handle various punishments for player.
     *
     * Determine which punishment we need and then punish by the laws
     * amount.
     *
     * In the case of HP we show the broken law window BEFORE game over if done through
     * the menu.
     *
     * @param Object lawObject
     */

  }, {
    key: 'handleOtherPunishments',
    value: function handleOtherPunishments(lawObject) {
      switch (lawObject.punishment) {
        case 'hp':
          var health = this._actorWhobrokeLaw._hp;
          health -= lawObject.amount;

          if (health <= 0) {
            this._actorWhobrokeLaw.die();
            this._actorWhobrokeLaw.addState(_option_handler2.default.getOptions().death_state_id);
          } else {
            this._actorWhobrokeLaw._hp = health;
          }
          break;
        case 'mp':
          var mp = this._actorWhobrokeLaw._mp;
          mp -= lawObject.amount;

          if (mp <= 0) {
            this._actorWhobrokeLaw._mp = 0;
          } else {
            this._actorWhobrokeLaw._mp = mp;
          }

          break;
        case 'tp':
          var tp = this._actorWhobrokeLaw._tp;
          tp -= lawObject.amount;

          if (tp <= 0) {
            this._actorWhobrokeLaw._tp = 0;
          } else {
            this._actorWhobrokeLaw._tp = tp;
          }
          break;
        case 'xp':
          this._actorWhobrokeLaw.changeExp(-lawObject.amount, true);
          break;
      }
    }
  }]);

  return ProcessBrokenLaw;
})();

module.exports = ProcessBrokenLaw;

// Don't touch.
window._lawMessageForLawBattleWindow = null;
window._brokenLawObject = null;

},{"../law_storage/laws_for_map":97,"../law_storage/store_no_gold_message":98,"../options/option_handler":99,"../scenes/flare_law_was_broken_window_scene":105,"./helper/store_broken_law_object":95,"lodash/collection/findWhere":4,"underscore.string/slugify":88}],97:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _findWhere = require('lodash/collection/findWhere');

var _findWhere2 = _interopRequireDefault(_findWhere);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _capitalize = require('lodash/string/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _trim = require('lodash/string/trim');

var _trim2 = _interopRequireDefault(_trim);

var _humanize = require('underscore.string/humanize');

var _humanize2 = _interopRequireDefault(_humanize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stores the various laws for a specific map.
 */

var LawsForMap = (function () {
  function LawsForMap() {
    _classCallCheck(this, LawsForMap);
  }

  _createClass(LawsForMap, null, [{
    key: 'storeLaw',

    /**
     * Store the actual law.
     *
     * Remove any additional cantUse beyond the three.
     *
     * Create a lawForMap object and store it.
     *
     * @param Object law
     */
    value: function storeLaw(law, number) {
      var lawCannotUse = null;

      if (law.cantUse.indexOf(',') !== -1) {
        lawCannotUse = law.cantUse.split(',');
        lawCannotUse.length = 3;
        var upperCaseCannotUse = [];

        lawCannotUse.forEach(function (cannotUse) {
          var trimmedCannotUse = (0, _trim2.default)(cannotUse);
          upperCaseCannotUse.push((0, _humanize2.default)((0, _capitalize2.default)(trimmedCannotUse)));
        });

        lawCannotUse = upperCaseCannotUse.join();
      } else {
        lawCannotUse = (0, _capitalize2.default)(law.cantUse);
      }

      var lawForMap = {
        name: law.name,
        punishment: law.punishment,
        amount: law.amount,
        description: law.description,
        icon: law.icon,
        cantUse: lawCannotUse
      };

      if (this._lawsForMap.length === number) {
        this.setLawsForMap([]);
      }

      this._lawsForMap.push(lawForMap);
    }

    /**
     * Get all the laws for this map.
     *
     * @return array of 3 objects.
     */

  }, {
    key: 'getLawsForMap',
    value: function getLawsForMap() {
      return this._lawsForMap;
    }

    /**
     * Set laws for map.
     *
     * Needs to be an array. Also over rides current laws.
     */

  }, {
    key: 'setLawsForMap',
    value: function setLawsForMap(laws) {
      this._lawsForMap = laws;
    }
  }]);

  return LawsForMap;
})();

module.exports = LawsForMap;

},{"lodash/collection/findWhere":4,"lodash/lang/isUndefined":71,"lodash/string/capitalize":75,"lodash/string/trim":76,"underscore.string/humanize":87}],98:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareLawsForMap.
 */

/**
 * Static class to store the "no gold" message
 */

var StoreNoGoldMessage = (function () {
  function StoreNoGoldMessage() {
    _classCallCheck(this, StoreNoGoldMessage);
  }

  _createClass(StoreNoGoldMessage, null, [{
    key: "createStorage",

    /**
     * Create an empty store.
     */
    value: function createStorage() {
      this._noGoldMessage = null;
    }

    /**
     * Set the actual message
     *
     * @param string message
     */

  }, {
    key: "setMessage",
    value: function setMessage(message) {
      this._noGoldMessage = message;
    }

    /**
     * Get the actual message.
     *
     * @return undefined or string
     */

  }, {
    key: "getMessage",
    value: function getMessage() {
      return this._noGoldMessage;
    }
  }]);

  return StoreNoGoldMessage;
})();

module.exports = StoreNoGoldMessage;

},{}],99:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareLawsForMap.
 */

// Plugin Options.
var FlareLawsForMap = PluginManager.parameters('Flare-LawsForMap');

/**
 * Laws for Map plugin options
 */

var OptionHandler = (function () {
  function OptionHandler() {
    _classCallCheck(this, OptionHandler);
  }

  _createClass(OptionHandler, null, [{
    key: 'createOptionsStorage',

    /**
     * Stores the options passed in via the plugin options.
     */
    value: function createOptionsStorage() {
      this._lawOptions = {
        death_state_id: FlareLawsForMap['Death State ID'],
        number_of_laws_for_map: FlareLawsForMap['How many laws per map?'],
        before_or_after: FlareLawsForMap['Calculate law after or before battle?']
      };
    }

    /**
     * Gets the options back
     *
     * Known options: death_state_id
     *
     * @return object with key values.
     */

  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this._lawOptions;
    }
  }]);

  return OptionHandler;
})();

module.exports = OptionHandler;

},{}],100:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _find = require("lodash/collection/find");

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stores the types of punishments.
 */

var Punishments = (function () {
  function Punishments() {
    _classCallCheck(this, Punishments);

    this._punishementStorage = ["gold", "xp", "hp", "mp", "tp"];
  }

  /**
   * Get the punishment storage.
   *
   * @return array of strings.
   */

  _createClass(Punishments, [{
    key: "getPunishmentStorage",
    value: function getPunishmentStorage() {
      return this._punishementStorage;
    }

    /**
     * Do we have said punishement?
     *
     * @return boolean
     */

  }, {
    key: "hasPunishment",
    value: function hasPunishment(name) {
      for (var i = 0; i < this.getPunishmentStorage().length; i++) {
        if (this.getPunishmentStorage()[i] === name) {
          return true;
        }
      }

      return false;
    }
  }]);

  return Punishments;
})();

module.exports = Punishments;

},{"lodash/collection/find":3}],101:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareCollection
 */

/**
 * Contains the reward storage.
 *
 * You have to call: CreateRewardStorage() before calling this class.
 *
 * It should be something like:
 *
 * CompileStorageContainer.emptyContainer();
 * CreateRewardStorage();
 * CompileStorageContainer.getContainer();
 */

var CompileStorageContianer = (function () {
  function CompileStorageContianer() {
    _classCallCheck(this, CompileStorageContianer);
  }

  _createClass(CompileStorageContianer, null, [{
    key: "emptyContainer",

    /**
     * Empty the container.
     */
    value: function emptyContainer() {
      this._container = [];
    }

    /**
     * Set an array as the container.
     *
     * @param array rewards
     */

  }, {
    key: "setContainer",
    value: function setContainer(rewards) {
      this._container = rewards;
    }

    /**
     * Get the container.
     *
     * @return Array
     */

  }, {
    key: "getContainer",
    value: function getContainer() {
      return this._container;
    }
  }]);

  return CompileStorageContianer;
})();

module.exports = CompileStorageContianer;

},{}],102:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _compiled_storage_container = require('./compiled_storage_container');

var _compiled_storage_container2 = _interopRequireDefault(_compiled_storage_container);

var _reward_processor = require('./reward_processor');

var _reward_processor2 = _interopRequireDefault(_reward_processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Store all the reward objects.
 *
 * We want to be able to access the list of rewards regardless if we are in a scene_window_container
 * or if we are in battle being rold that we gained x amount of rewards.
 *
 * This container will be able to be used across the whole board.
 */

var CreateRewardStorage = (function () {

  /**
   * This allows you to call the class as a function.
   */

  function CreateRewardStorage() {
    _classCallCheck(this, CreateRewardStorage);

    this._data = new _reward_processor2.default();

    _compiled_storage_container2.default.emptyContainer();

    this._data.processAndStore();
    this._createStorageOfObjects();
  }

  /**
   * Process all the weapons and armors and items
   *
   * This will allow us to create reward objects that can be used across the whole game.
   */

  _createClass(CreateRewardStorage, [{
    key: '_createStorageOfObjects',
    value: function _createStorageOfObjects() {
      var rewards = [];
      if (this._data.getWeapons().length > 0) {
        rewards.push(this._data.getWeapons());
      }

      if (this._data.getArmors().length > 0) {
        rewards.push(this._data.getArmors());
      }

      if (this._data.getItems().length > 0) {
        rewards.push(this._data.getItems());
      }

      if (this._data.getGoldAmount() !== 0) {
        rewards.push({ gold: this._data.getGoldAmount() });
      }

      if (this._data.getXpAmount() !== 0) {
        rewards.push({ xp: this._data.getXpAmount() });
      }

      // flatten the array.
      rewards = [].concat.apply([], rewards);
      _compiled_storage_container2.default.setContainer(rewards);
    }
  }]);

  return CreateRewardStorage;
})();

module.exports = CreateRewardStorage;

},{"./compiled_storage_container":101,"./reward_processor":103}],103:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareCollection
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _reward_storage = require('./reward_storage');

var _reward_storage2 = _interopRequireDefault(_reward_storage);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class takes the reward data and creates them into objects.
 *
 * Take the weapons, armor and item id's and get the actual objects.
 * This can be taken from the Reward Storage.
 */

var RewardProcessor = (function () {

  /**
   * Basic constructor.
   */

  function RewardProcessor() {
    _classCallCheck(this, RewardProcessor);

    this._rewardData = _reward_storage2.default.getContainer();

    this._weapons = [];
    this._items = [];
    this._armors = [];
    this._goldAmount = 0;
    this._xpAmount = 0;
  }

  /**
   * Process the reward data.
   */

  _createClass(RewardProcessor, [{
    key: 'processAndStore',
    value: function processAndStore() {
      for (var i = 0; i < this._rewardData.length; i++) {
        this._processForArray(this._rewardData[i]);
      }
    }

    /**
     * Private Method. Determing which type to process.
     *
     * @param object RewardDataObject
     */

  }, {
    key: '_processForArray',
    value: function _processForArray(rewardDataObject) {
      if (!(0, _isUndefined2.default)(rewardDataObject.weapons)) {
        this._storeInArray('weapon', $dataWeapons, rewardDataObject.weapons);
      }

      if (!(0, _isUndefined2.default)(rewardDataObject.items)) {
        this._storeInArray('item', $dataItems, rewardDataObject.items);
      }

      if (!(0, _isUndefined2.default)(rewardDataObject.armors)) {
        this._storeInArray('armor', $dataArmors, rewardDataObject.armors);
      }

      if (!(0, _isUndefined2.default)(rewardDataObject.gold)) {
        this._goldAmount = rewardDataObject.gold;
      }

      if (!(0, _isUndefined2.default)(rewardDataObject.xp)) {
        this._xpAmount = rewardDataObject.xp;
      }
    }

    /**
     * Private Method. Store the information in an array.
     *
     * The constructor contains specific arrays for weapons, items and armors.
     * this information is processed and then stored.
     *
     * @param string name
     * @param object data
     * @param mixed rewardData, can be int or array
     */

  }, {
    key: '_storeInArray',
    value: function _storeInArray(name, data, rewardData) {
      switch (name) {
        case 'weapon':
          if (this._getRewardData(data, rewardData) !== false) {
            this._weapons = this._getRewardData(data, rewardData);
          }
          break;
        case 'armor':
          if (this._getRewardData(data, rewardData) !== false) {
            this._armors = this._getRewardData(data, rewardData);
          }
          break;
        case 'item':
          if (this._getRewardData(data, rewardData) !== false) {
            this._items = this._getRewardData(data, rewardData);
          }
          break;
      }
    }

    /**
     * Private Method. Creates array of reward data.
     *
     * Walk over the reward data and the approprate data object
     * be it $dataItems, $dataWeapons, $dataArmors and then store, if we found anything
     * the information in an array thats then returned.
     *
     * If the reward data is not an array then we want to walk over the data object array looking for
     * an id that matches and store that object.
     *
     * We also only walk over things till 2999.
     *
     * @param array data - $dataItems, $dataWeapons, $dataArmors
     * @param mixed rewardData - Array or int.
     * @return Array or false
     */

  }, {
    key: '_getRewardData',
    value: function _getRewardData(data, rewardData) {
      var rewardDataContainer = [];

      for (var i = 1; i < data.length; i++) {
        // Are we an array?
        if (Array.isArray(rewardData)) {
          // Walk through.
          for (var j = 0; j < rewardData.length; j++) {
            // Push each piece.
            if (data[i] !== null && i < 2999 && data[i].id === rewardData[j]) {
              rewardDataContainer.push(data[i]);
            }
          }
          // Not an array?
        } else {
            // Compare and push.
            if (data[i] !== null && i < 2999 && data[i].id === rewardData) {
              rewardDataContainer.push(data[i]);
            }
          }
      }

      // Anything at all? Return it.
      if (rewardDataContainer.length > 0) {
        return rewardDataContainer;
      }

      // Else default is a false.
      return false;
    }

    /**
     * Get Weapons
     *
     * @return array of objects
     */

  }, {
    key: 'getWeapons',
    value: function getWeapons() {
      return this._weapons;
    }

    /**
     * Get Armors
     *
     * @return array of objects
     */

  }, {
    key: 'getArmors',
    value: function getArmors() {
      return this._armors;
    }

    /**
     * Get items
     *
     * @return array of objects
     */

  }, {
    key: 'getItems',
    value: function getItems() {
      return this._items;
    }

    /**
     * Get Gold Amount
     *
     * @return int
     */

  }, {
    key: 'getGoldAmount',
    value: function getGoldAmount() {
      return this._goldAmount;
    }

    /**
     * Get Xp Amount
     *
     * @return int
     */

  }, {
    key: 'getXpAmount',
    value: function getXpAmount() {
      return this._xpAmount;
    }
  }]);

  return RewardProcessor;
})();

module.exports = RewardProcessor;

},{"./reward_storage":104,"lodash/lang/isUndefined":71}],104:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareCollection
 */

/**
 * Store the actual rewards.
 *
 * This will just store the id's of items, weapons and armors.
 *
 * It will also store xp and gold as int's.
 */

var RewardStorage = (function () {
  function RewardStorage() {
    _classCallCheck(this, RewardStorage);
  }

  _createClass(RewardStorage, null, [{
    key: "createContainer",

    /**
     * Create an empty container.
     */
    value: function createContainer() {
      this._container = [];
    }

    /**
     * Set the item container to the container.
     *
     * @param array or int item
     */

  }, {
    key: "setToStorage",
    value: function setToStorage(item) {
      this._container.push(item);
    }

    /**
     * Return an actual container.
     *
     * @return Array
     */

  }, {
    key: "getContainer",
    value: function getContainer() {
      return this._container;
    }
  }]);

  return RewardStorage;
})();

module.exports = RewardStorage;

},{}],105:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _broken_law_window = require("../windows/broken_law/broken_law_window");

var _broken_law_window2 = _interopRequireDefault(_broken_law_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Creates a scene for showing when a law was broken on the map.
 */

var FlareLawWasBrokenWindowScene = (function (_Scene_MenuBase) {
  _inherits(FlareLawWasBrokenWindowScene, _Scene_MenuBase);

  function FlareLawWasBrokenWindowScene() {
    _classCallCheck(this, FlareLawWasBrokenWindowScene);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FlareLawWasBrokenWindowScene).call(this));
  }

  _createClass(FlareLawWasBrokenWindowScene, [{
    key: "create",
    value: function create() {
      _get(Object.getPrototypeOf(FlareLawWasBrokenWindowScene.prototype), "create", this).call(this, this);

      this.createLawBrokenWindow();
    }
  }, {
    key: "update",
    value: function update() {
      _get(Object.getPrototypeOf(FlareLawWasBrokenWindowScene.prototype), "update", this).call(this, this);

      if (Input.isTriggered("cancel")) {
        this._flareBrokenLawWindow.close();
        this.popScene();

        // Should every one be dead when this is closed end the game.
        if ($gameParty.isAllDead()) {
          SceneManager.goto(Scene_Gameover);
        } else {
          window._brokenLawObject = null;
        }
      }
    }
  }, {
    key: "createLawBrokenWindow",
    value: function createLawBrokenWindow() {
      this._flareBrokenLawWindow = new _broken_law_window2.default();
      this.addWindow(this._flareBrokenLawWindow);
    }
  }]);

  return FlareLawWasBrokenWindowScene;
})(Scene_MenuBase);

module.exports = FlareLawWasBrokenWindowScene;

},{"../windows/broken_law/broken_law_window":115}],106:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _laws_window_selectable = require('../windows/laws_window_selectable');

var _laws_window_selectable2 = _interopRequireDefault(_laws_window_selectable);

var _laws_details = require('../windows/details/laws_details');

var _laws_details2 = _interopRequireDefault(_laws_details);

var _items_for_laws_title = require('../windows/details/items_for_laws_title');

var _items_for_laws_title2 = _interopRequireDefault(_items_for_laws_title);

var _items_for_laws_selectable = require('../windows/details/items_for_laws_selectable');

var _items_for_laws_selectable2 = _interopRequireDefault(_items_for_laws_selectable);

var _calculated_laws = require('../windows/details/calculated_laws');

var _calculated_laws2 = _interopRequireDefault(_calculated_laws);

var _scene_window_container = require('../../lib/containers/scene/window/scene_window_container');

var _scene_window_container2 = _interopRequireDefault(_scene_window_container);

var _selectable_window_container = require('../../lib/containers/window/selectable/selectable_window_container');

var _selectable_window_container2 = _interopRequireDefault(_selectable_window_container);

var _option_handler = require('../options/option_handler');

var _option_handler2 = _interopRequireDefault(_option_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Creates a scene for a window that shows all the laws.
 */

var FlareLawWindowScene = (function (_Scene_MenuBase) {
  _inherits(FlareLawWindowScene, _Scene_MenuBase);

  function FlareLawWindowScene() {
    _classCallCheck(this, FlareLawWindowScene);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FlareLawWindowScene).call(this));
  }

  _createClass(FlareLawWindowScene, [{
    key: 'create',
    value: function create() {
      _get(Object.getPrototypeOf(FlareLawWindowScene.prototype), 'create', this).call(this, this);

      this.createLawWindowForParty();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(Object.getPrototypeOf(FlareLawWindowScene.prototype), 'update', this).call(this, this);

      if (_selectable_window_container2.default.getKeyValue('turnOffSceneInputListener') !== true) {
        if (Input.isTriggered("cancel")) {
          this._flareLawWindow.close();
          this.popScene();
        }
      }
    }
  }, {
    key: 'createLawWindowForParty',
    value: function createLawWindowForParty() {
      _scene_window_container2.default.emptyContainer();

      this._flareLawWindow = new _laws_window_selectable2.default();
      this._flareLawDetails = new _laws_details2.default();
      this._flareLawItemsTitle = new _items_for_laws_title2.default();
      this._flareCalculatedLaws = new _calculated_laws2.default();

      _scene_window_container2.default.setWindowToContainer('law-details', this._flareLawDetails);

      this.addWindow(this._flareLawDetails);
      this.addWindow(this._flareLawWindow);
      this.addWindow(this._flareLawItemsTitle);

      if (_option_handler2.default.getOptions().before_or_after === 'before') {
        this._flareLawItemsSelectable = new _items_for_laws_selectable2.default();
        this.addWindow(this._flareLawItemsSelectable);
      } else {
        this.addWindow(this._flareCalculatedLaws);
      }
    }
  }]);

  return FlareLawWindowScene;
})(Scene_MenuBase);

module.exports = FlareLawWindowScene;

},{"../../lib/containers/scene/window/scene_window_container":122,"../../lib/containers/window/selectable/selectable_window_container":123,"../options/option_handler":99,"../windows/details/calculated_laws":116,"../windows/details/items_for_laws_selectable":117,"../windows/details/items_for_laws_title":118,"../windows/details/laws_details":119,"../windows/laws_window_selectable":120}],107:[function(require,module,exports){
'use strict';

var _flare_counter = require('../../lib/number/flare_counter');

var _flare_counter2 = _interopRequireDefault(_flare_counter);

var _clone = require('lodash/lang/clone');

var _clone2 = _interopRequireDefault(_clone);

var _compiled_storage_container = require('../reward_storage/compiled_storage_container');

var _compiled_storage_container2 = _interopRequireDefault(_compiled_storage_container);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _option_handler = require('../options/option_handler');

var _option_handler2 = _interopRequireDefault(_option_handler);

var _gather_reward = require('../gather_reward');

var _gather_reward2 = _interopRequireDefault(_gather_reward);

var _create_reward_storage = require('../reward_storage/create_reward_storage');

var _create_reward_storage2 = _interopRequireDefault(_create_reward_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oldBattleManagerSetupMethod = BattleManager.setup; /**
                                                        * @namespace FlareLawsForMap.
                                                        */

BattleManager.setup = function (troopId, canEscape, canLose) {
  oldBattleManagerSetupMethod.call(this, troopId, canEscape, canLose);
  this._gainedRewards = false;

  if (_option_handler2.default.getOptions().before_or_after === 'after') {
    //Gather reward data.
    var gatherReward = new _gather_reward2.default();
    gatherReward.processPotentialRewards();

    // Now we need reward items.
    new _create_reward_storage2.default();
  }
};

// We want our own custom message.
BattleManager.processDefeat = function () {
  this.customDisplayMessage();
  this.playDefeatMe();
  if (this._canLose) {
    this.replayBgmAndBgs();
  } else {
    AudioManager.stopBgm();
  }
  this.endBattle(2);
};

BattleManager.customDisplayMessage = function () {
  $gameMessage.add('The whole party was defeated ...');
};

var oldBattleManagerGainRewardsMethod = BattleManager.gainRewards;
BattleManager.gainRewards = function () {
  if (!this._gainedRewards) {
    oldBattleManagerGainRewardsMethod.call(this);
    if (_flare_counter2.default.getCurrentState() === 0 && _compiled_storage_container2.default.getContainer().length > 0) {

      for (var i = 0; i < _compiled_storage_container2.default.getContainer().length; i++) {
        var item = _compiled_storage_container2.default.getContainer()[i];

        if (DataManager.isItem(item) || DataManager.isArmor(item) || DataManager.isWeapon(item)) {
          $gameParty.gainItem(item, 1);
        }

        if (!(0, _isUndefined2.default)(item['xp'])) {
          $gameParty.allMembers().forEach(function (actor) {
            actor.gainExp(item.xp);
          });
        }

        if (!(0, _isUndefined2.default)(item['gold'])) {
          $gameParty.gainGold(item.gold);
        }
      }
    }
  }

  this._gainedRewards = true;
};

var oldBattleManagerDisplayRewards = BattleManager.gainRewards;
BattleManager.displayRewards = function () {
  oldBattleManagerDisplayRewards.call(this);
  if (_flare_counter2.default.getCurrentState() === 0 && _compiled_storage_container2.default.getContainer().length > 0) {
    $gameMessage.add('\\c[16]Party broke no laws. Have some bonus rewards!!!\\c[0]');

    for (var i = 0; i < _compiled_storage_container2.default.getContainer().length; i++) {
      var item = _compiled_storage_container2.default.getContainer()[i];

      if (DataManager.isItem(item) || DataManager.isArmor(item) || DataManager.isWeapon(item)) {
        $gameMessage.add('Gained (As a bonus): ' + '\\i[' + item.iconIndex + '] ' + item.name);
        $gameMessage.add(''); // spacing for icons.
      }

      if (!(0, _isUndefined2.default)(item['xp'])) {
        $gameMessage.add('Gained (As a bonus): ' + item.xp + ' XP (All actors gain this)');
      }

      if (!(0, _isUndefined2.default)(item['gold'])) {
        $gameMessage.add('Gained (As a bonus): ' + item.gold + ' Gold');
      }
    }
  }

  if (_option_handler2.default.getOptions().before_or_after === 'after') {
    _compiled_storage_container2.default.emptyContainer();
  }
};

},{"../../lib/number/flare_counter":124,"../gather_reward":94,"../options/option_handler":99,"../reward_storage/compiled_storage_container":101,"../reward_storage/create_reward_storage":102,"lodash/lang/clone":64,"lodash/lang/isUndefined":71}],108:[function(require,module,exports){
'use strict';

var _process_broken_law = require('../law_handler/process_broken_law');

var _process_broken_law2 = _interopRequireDefault(_process_broken_law);

var _flare_counter = require('../../lib/number/flare_counter');

var _flare_counter2 = _interopRequireDefault(_flare_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace FlareLawsForMap.
 */

var oldGameActionPrototypeInitializeMethod = Game_Action.prototype.initialize;
Game_Action.prototype.initialize = function (subject, forcing) {
  oldGameActionPrototypeInitializeMethod.call(this, subject, forcing);
  this._calledOnce = false;
};

var oldGameActionPrototypeApplyMethod = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
  oldGameActionPrototypeApplyMethod.call(this, target);

  if (this._calledOnce === false) {
    this.applyPunishmentIfLawIsBroken(this.item(), this.subject(), target);
    this._calledOnce = true;
  }
};

/**
 * If the user broke a law then apply the punishment.
 *
 * Its simple really. If the user targets self or another game actor
 * and breaks a law, punish.
 *
 * If the user targets the enemy and the law is broken, punish.
 *
 * In game battles we show game messages.
 *
 * On the map we show a window.
 */
Game_Action.prototype.applyPunishmentIfLawIsBroken = function (item, subject, target) {

  // If we are a battle test, don't validate
  if (DataManager.isBattleTest()) {
    item.effects.forEach(function (effect) {
      this.applyItemEffect(target, effect);
    }, this);

    this.applyItemUserEffect(target);
    return;
  }

  var processWhatShouldHappenOnHit = new _process_broken_law2.default(item.name, subject);
  _flare_counter2.default.resetCounter();

  // Punish the user for breaking a law, assuming they have.
  if (subject instanceof Game_Actor && target instanceof Game_Actor && processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw() && !$gameParty.inBattle()) {

    // Punish for items, spells and others that target the player or players.
    processWhatShouldHappenOnHit.checkForGoldBeforePunish(true);
    processWhatShouldHappenOnHit.openMessageWindow();
    processWhatShouldHappenOnHit.punishPlayer();
    _flare_counter2.default.addValue(1);
  } else if (target instanceof Game_Enemy && processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw() || subject instanceof Game_Actor && target instanceof Game_Actor && processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw() && $gameParty.inBattle()) {
    var brokenLawObject = processWhatShouldHappenOnHit.getBrokenLawObject();

    // Punish the player for those that effect the enemy.
    $gameMessage.add("\\c[9]" + subject._name + "\\c[0]" + ' has \\c[14]broken a law\\c[0] prohibiting the use of: ' + "\\c[18]" + item.name + 's\\c[0]');
    $gameMessage.add("\\c[14] Punishment is: \\c[0]" + "\\c[20]" + brokenLawObject.punishment + "\\c[0] in the amount of: " + "\\c[20]" + brokenLawObject.amount + "\\c[0]");

    // Display no more gold message and punish the player.
    processWhatShouldHappenOnHit.checkForGoldBeforePunish(false);
    processWhatShouldHappenOnHit.punishPlayer();
    _flare_counter2.default.addValue(1);
  } else {
    item.effects.forEach(function (effect) {
      this.applyItemEffect(target, effect);
    }, this);

    this.applyItemUserEffect(target);
  }
};

},{"../../lib/number/flare_counter":124,"../law_handler/process_broken_law":96}],109:[function(require,module,exports){
'use strict';

var _add_laws_for_map = require('../add_laws_for_map');

var _add_laws_for_map2 = _interopRequireDefault(_add_laws_for_map);

var _gather_reward = require('../gather_reward');

var _gather_reward2 = _interopRequireDefault(_gather_reward);

var _create_reward_storage = require('../reward_storage/create_reward_storage');

var _create_reward_storage2 = _interopRequireDefault(_create_reward_storage);

var _option_handler = require('../options/option_handler');

var _option_handler2 = _interopRequireDefault(_option_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace FlareLawsForMap.
 */

var oldGameMapPrototypeSetupMethod = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
  oldGameMapPrototypeSetupMethod.call(this, mapId);

  // Process laws for map.
  var flarAddLawsForMap = new _add_laws_for_map2.default();
  flarAddLawsForMap.grabMapInformation();

  if (_option_handler2.default.getOptions().before_or_after === 'before') {
    //Gather reward data.
    var gatherReward = new _gather_reward2.default();
    gatherReward.processPotentialRewards();

    // Now we need reward items.
    new _create_reward_storage2.default();
  }
};

},{"../add_laws_for_map":92,"../gather_reward":94,"../options/option_handler":99,"../reward_storage/create_reward_storage":102}],110:[function(require,module,exports){
'use strict';

var _flare_law_was_broken_window_scene = require('../scenes/flare_law_was_broken_window_scene');

var _flare_law_was_broken_window_scene2 = _interopRequireDefault(_flare_law_was_broken_window_scene);

var _laws_for_map = require('../law_storage/laws_for_map');

var _laws_for_map2 = _interopRequireDefault(_laws_for_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace FlareLawsForMap.
 */

var oldSceneBasePrototypeCheckGameOverMethod = Scene_Base.prototype.checkGameover;
Scene_Base.prototype.checkGameover = function () {
  if (_laws_for_map2.default.getLawsForMap() !== undefined && _laws_for_map2.default.getLawsForMap().length > 0 && window._brokenLawObject !== null) {
    if ($gameParty.isAllDead()) {
      SceneManager.push(_flare_law_was_broken_window_scene2.default);
    }
  } else {
    oldSceneBasePrototypeCheckGameOverMethod.call(this);
  }
};

},{"../law_storage/laws_for_map":97,"../scenes/flare_law_was_broken_window_scene":105}],111:[function(require,module,exports){
'use strict';

var _flare_law_window_scene = require('../scenes/flare_law_window_scene');

var _flare_law_window_scene2 = _interopRequireDefault(_flare_law_window_scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oldSceneMenuPrototypeCreateCommandWindiow = Scene_Menu.prototype.createCommandWindow; /**
                                                                                           * @namespace FlareLawsForMap.
                                                                                           */

Scene_Menu.prototype.createCommandWindow = function () {
  oldSceneMenuPrototypeCreateCommandWindiow.call(this);
  this._commandWindow.setHandler('Laws', this.lawsCommand.bind(this));
};

Scene_Menu.prototype.lawsCommand = function () {
  SceneManager.push(_flare_law_window_scene2.default);
};

},{"../scenes/flare_law_window_scene":106}],112:[function(require,module,exports){
'use strict';

var _reward_window = require('../windows/yanfly_aftermath/reward_window');

var _reward_window2 = _interopRequireDefault(_reward_window);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make sure this actually exists.
/**
 * @namespace FlareLawsForMap
 */

if (Scene_Battle.prototype.addCustomVictorySteps) {

  var oldSceneBattleprototypeUpdateVictoryStepsMethod = Scene_Battle.prototype.updateVictorySteps;
  Scene_Battle.prototype.updateVictorySteps = function () {
    oldSceneBattleprototypeUpdateVictoryStepsMethod.call(this);
    if (this.isVictoryStep('LAWS')) {
      this.updateRewardLawStep();
    }
  };

  Scene_Battle.prototype.addCustomLawsGainWindow = function () {
    if (!(0, _isUndefined2.default)(this._yanflyAfterMathCurrencyWindowReward)) {
      this._yanflyAfterMathCurrencyWindowReward.close();
    } else {
      this._victoryDropWindow.close();
    }

    this._yanflyLawsRewardWindow = new _reward_window2.default();

    this.addWindow(this._yanflyLawsRewardWindow);
    this._yanflyLawsRewardWindow.open();
    this._yanflyLawsRewardWindow.y = 72;
  };

  Scene_Battle.prototype.updateRewardLawStep = function () {
    if (!this._yanflyLawsRewardWindow) {
      this.addCustomLawsGainWindow();
    } else if (this._yanflyLawsRewardWindow.isOpen()) {
      if (this.victoryTriggerContinue()) {
        this.finishVictoryCurrencies();
      }
    }
  };

  Scene_Battle.prototype.finishVictoryCurrencies = function () {
    SoundManager.playOk();
    if (!(0, _isUndefined2.default)(this._yanflyLawsRewardWindow)) {
      this._yanflyLawsRewardWindow.hide();
    }
    this.processNextVictoryStep();
  };
}

},{"../windows/yanfly_aftermath/reward_window":121,"lodash/lang/isUndefined":71}],113:[function(require,module,exports){
'use strict';

var _laws_for_map = require('../law_storage/laws_for_map');

var _laws_for_map2 = _interopRequireDefault(_laws_for_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oldWindowBasePrototypeDrawGaugeMethod = Window_Base.prototype.drawGauge; /**
                                                                              * @namespace FlareLawsForMap.
                                                                              */

Window_Base.prototype.drawGauge = function (dx, dy, dw, rate, color1, color2) {
  if (_laws_for_map2.default.getLawsForMap() !== undefined && _laws_for_map2.default.getLawsForMap().length > 0) {
    var color3 = this.gaugeBackColor();
    var fillW = Math.max(0, Math.floor(dw * rate));
    var gaugeH = this.gaugeHeight();
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;

    if (eval(Yanfly.Param.GaugeOutline)) {
      this.contents.fillRect(dx, gaugeY - 1, dw + 2, gaugeH + 2, color3);
      dx += 1;
    } else {
      var fillW = Math.max(0, Math.floor(dw * rate));
      var gaugeY = dy + this.lineHeight() - gaugeH - 2;
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
    }

    if (isNaN(fillW)) {
      this.contents.gradientFillRect(dx, gaugeY, 0, gaugeH, color1, color2);
    } else {
      this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
    }
  } else {
    oldWindowBasePrototypeDrawGaugeMethod.call(this, dx, dy, dw, rate, color1, color2);
  }
};

},{"../law_storage/laws_for_map":97}],114:[function(require,module,exports){
'use strict';

var _laws_for_map = require('../law_storage/laws_for_map');

var _laws_for_map2 = _interopRequireDefault(_laws_for_map);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace FlareLawsForMap.
 */

var oldWindowMenuCommandProtottypeAddOriginalCommandsMethod = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  oldWindowMenuCommandProtottypeAddOriginalCommandsMethod.call(this);

  if (!(0, _isUndefined2.default)(_laws_for_map2.default.getLawsForMap()) && _laws_for_map2.default.getLawsForMap().length > 0) {
    this.addCommand('Laws', 'Laws');
  }
};

},{"../law_storage/laws_for_map":97,"lodash/lang/isUndefined":71}],115:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _flare_window_base = require('../../../lib/windows/flare_window_base');

var _flare_window_base2 = _interopRequireDefault(_flare_window_base);

var _store_no_gold_message = require('../../law_storage/store_no_gold_message');

var _store_no_gold_message2 = _interopRequireDefault(_store_no_gold_message);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _store_broken_law_object = require('../../law_handler/helper/store_broken_law_object');

var _store_broken_law_object2 = _interopRequireDefault(_store_broken_law_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Creates a window for displaying broken laws on map.
 */

var BrokenLawWindow = (function (_FlareWindowBase) {
  _inherits(BrokenLawWindow, _FlareWindowBase);

  function BrokenLawWindow() {
    _classCallCheck(this, BrokenLawWindow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BrokenLawWindow).call(this));

    _this.initialize();
    _this.refresh();
    return _this;
  }

  _createClass(BrokenLawWindow, [{
    key: 'initialize',
    value: function initialize() {
      _get(Object.getPrototypeOf(BrokenLawWindow.prototype), 'initialize', this).call(this, this.tryAndCenter() - 40, this.tryAndCenter() - 20, this.windowWidth(), this.windowHeight());
      this._law = _store_broken_law_object2.default.getLawObject();;
    }
  }, {
    key: 'tryAndCenter',
    value: function tryAndCenter() {
      return Graphics.boxWidth / 2 / 2;
    }
  }, {
    key: 'windowWidth',
    value: function windowWidth() {
      return Graphics.boxWidth / 2 + 70;
    }
  }, {
    key: 'windowHeight',
    value: function windowHeight() {
      return 325;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.contents.clear();

      this.drawText('Law was broken!', 10, 10, 250, 'left');

      this.contents.fontSize = 18;
      this.drawIcon(this._law.icon, 10, 70);
      this.flareDrawTextEx('Law was broken: ' + '\\c[14]' + this._law.name + '\\c[0]', 48, 70);
      this.flareDrawTextEx('Law Prohibs the use of: ' + '\\c[18]' + this._law.cantUse + ' \\c[0]', 20, 110);
      this.flareDrawTextEx('\\c[9]' + this._law.subject + '\\c[0]' + ' used: ' + '\\c[10]' + this._law.actionUsed + '\\c[0]', 20, 140);
      this.flareDrawTextEx('The punishment is: ' + '\\c[20]' + this._law.punishment + '\\c[0]' + ' at a cost of: ' + '\\c[20]' + this._law.amount + '\\c[0]', 10, 180);

      if (!(0, _isUndefined2.default)(_store_no_gold_message2.default.getMessage)) {
        this.flareDrawTextEx('\\c[20]' + _store_no_gold_message2.default.getMessage() + '\\c[0]', 10, 210);
      }

      if ($gameParty.isAllDead()) {
        this.flareDrawTextEx('\\c[20] Every one is dead. Game over ... \\c[20]', 10, 250);
      }

      this.resetFontSettings();
    }
  }]);

  return BrokenLawWindow;
})(_flare_window_base2.default);

module.exports = BrokenLawWindow;

},{"../../../lib/windows/flare_window_base":126,"../../law_handler/helper/store_broken_law_object":95,"../../law_storage/store_no_gold_message":98,"lodash/lang/isUndefined":71}],116:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _flare_window_base = require('../../../lib/windows/flare_window_base');

var _flare_window_base2 = _interopRequireDefault(_flare_window_base);

var _wrap = require('underscore.string/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Crestes the window that states law rewards will be calculated on battle win.
 */

var ClaculatedLaws = (function (_FlareWindowBase) {
  _inherits(ClaculatedLaws, _FlareWindowBase);

  function ClaculatedLaws() {
    _classCallCheck(this, ClaculatedLaws);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ClaculatedLaws).call(this));
  }

  _createClass(ClaculatedLaws, [{
    key: 'initialize',
    value: function initialize() {
      var width = Graphics.boxWidth / 2 - 70;
      var height = 290;

      _get(Object.getPrototypeOf(ClaculatedLaws.prototype), 'initialize', this).call(this, width, Graphics.boxHeight / 2 + 20, width + 140, height);
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.contents.clear();
      this.drawRewardData();
    }
  }, {
    key: 'drawRewardData',
    value: function drawRewardData() {
      this.contents.fontSize = 18;

      var text = "\\\c[14]All rewards for this map will be calculated after each battle. Rewards are randomized.\\\c[0]";
      text = (0, _wrap2.default)(text, { width: 52 });

      this.flareDrawTextEx(text, 0, 10);
    }
  }]);

  return ClaculatedLaws;
})(_flare_window_base2.default);

module.exports = ClaculatedLaws;

},{"../../../lib/windows/flare_window_base":126,"underscore.string/wrap":91}],117:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _flare_window_selectable = require('../../../lib/windows/flare_window_selectable');

var _flare_window_selectable2 = _interopRequireDefault(_flare_window_selectable);

var _wrap = require('underscore.string/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _reward_processor = require('../../reward_storage/reward_processor');

var _reward_processor2 = _interopRequireDefault(_reward_processor);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _selectable_window_container = require('../../../lib/containers/window/selectable/selectable_window_container');

var _selectable_window_container2 = _interopRequireDefault(_selectable_window_container);

var _compiled_storage_container = require('../../reward_storage/compiled_storage_container');

var _compiled_storage_container2 = _interopRequireDefault(_compiled_storage_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Creates a list of items including xp and gold
 */

var ItemsForLawSelectable = (function (_FlareWindowSelectabl) {
  _inherits(ItemsForLawSelectable, _FlareWindowSelectabl);

  function ItemsForLawSelectable() {
    _classCallCheck(this, ItemsForLawSelectable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ItemsForLawSelectable).call(this));
  }

  _createClass(ItemsForLawSelectable, [{
    key: 'initialize',
    value: function initialize() {
      var width = Graphics.boxWidth / 2 - 70;
      var height = 290;
      var data = new _reward_processor2.default();

      this._rewards = _compiled_storage_container2.default.getContainer();

      _get(Object.getPrototypeOf(ItemsForLawSelectable.prototype), 'initialize', this).call(this, width, Graphics.boxHeight / 2 + 20, width + 140, height);
      this.refresh();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(Object.getPrototypeOf(ItemsForLawSelectable.prototype), 'update', this).call(this);

      if (Input.isTriggered("cancel")) {
        _selectable_window_container2.default.setKeyValue('parentCursorIsMovable', true);
        _selectable_window_container2.default.setKeyValue('cursorIsMovable', false);

        this._cursorIsMovable = false;
      }
    }
  }, {
    key: 'isCursorMovable',
    value: function isCursorMovable() {
      if ((0, _isUndefined2.default)(_selectable_window_container2.default.getKeyValue('cursorIsMovable'))) {
        return false;
      } else {
        return _selectable_window_container2.default.getKeyValue('cursorIsMovable');
      }
    }
  }, {
    key: 'maxItems',
    value: function maxItems() {
      return this._rewards.length;
    }
  }, {
    key: 'itemHeight',
    value: function itemHeight() {
      return 105;
    }
  }, {
    key: 'isCurrentItemEnabled',
    value: function isCurrentItemEnabled() {
      return this.isEnabled(this._rewards);
    }
  }, {
    key: 'drawItem',
    value: function drawItem(index) {
      var reward = this._rewards[index];

      if (!reward) {
        return;
      }

      this.drawRewardToScreen(reward, index);
    }
  }, {
    key: 'drawRewardToScreen',
    value: function drawRewardToScreen(reward, index) {
      var rectangle = this.itemRect(index);
      this.contents.fontSize = 18;

      if ((typeof reward === 'undefined' ? 'undefined' : _typeof(reward)) === 'object') {
        this.drawIcon(reward.iconIndex, 10, rectangle.y + 20);
        this.drawText(reward.name, 60, rectangle.y + 20);

        if (!(0, _isUndefined2.default)(reward.belongsToCurrency) && reward.belongsToCurrency !== null) {
          this.flareDrawTextEx('\\\c[14]Belongs to currency\\\c[0]: ' + reward.belongsToCurrency, 10, rectangle.y + 60);
          this.flareDrawTextEx('\\\c[14]And costs\\\c[0]: ' + reward.currencyCost, 10, rectangle.y + 80);
        } else {

          if (!(0, _isUndefined2.default)(reward['xp'])) {
            this.flareDrawTextEx('\\\c[16]Xp to gain:\\\c[0] ' + reward.xp, 10, rectangle.y + 20);
          } else if (!(0, _isUndefined2.default)(reward['gold'])) {
            this.flareDrawTextEx('\\\c[16]Gold to gain:\\\c[0] ' + reward.gold, 10, rectangle.y + 20);
          } else {
            this.flareDrawTextEx('\\\c[14]Sold in shops for\\\c[0]: ' + reward.price, 10, rectangle.y + 60);
          }
        }
      }

      this.resetFontSettings();
    }
  }]);

  return ItemsForLawSelectable;
})(_flare_window_selectable2.default);

module.exports = ItemsForLawSelectable;

},{"../../../lib/containers/window/selectable/selectable_window_container":123,"../../../lib/windows/flare_window_selectable":127,"../../reward_storage/compiled_storage_container":101,"../../reward_storage/reward_processor":103,"lodash/lang/isUndefined":71,"underscore.string/wrap":91}],118:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _flare_window_base = require('../../../lib/windows/flare_window_base');

var _flare_window_base2 = _interopRequireDefault(_flare_window_base);

var _wrap = require('underscore.string/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Creates a title window.
 */

var ItemsForLawTitle = (function (_FlareWindowBase) {
  _inherits(ItemsForLawTitle, _FlareWindowBase);

  function ItemsForLawTitle() {
    _classCallCheck(this, ItemsForLawTitle);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ItemsForLawTitle).call(this));
  }

  _createClass(ItemsForLawTitle, [{
    key: 'initialize',
    value: function initialize() {
      var width = Graphics.boxWidth / 2 + 70;
      var height = 100;
      _get(Object.getPrototypeOf(ItemsForLawTitle.prototype), 'initialize', this).call(this, width - 140, Graphics.boxHeight / 2 - 80, width, height);
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.contents.clear();
      this.drawRewardData();
    }
  }, {
    key: 'drawRewardData',
    value: function drawRewardData() {
      this.contents.fontSize = 18;

      var text = "\\\c[14]All rewards below are rewarded assuming you break no laws associated with this map.\\\c[0]";
      text = (0, _wrap2.default)(text, { width: 48 });

      this.flareDrawTextEx(text, 0, 10);
    }
  }]);

  return ItemsForLawTitle;
})(_flare_window_base2.default);

module.exports = ItemsForLawTitle;

},{"../../../lib/windows/flare_window_base":126,"underscore.string/wrap":91}],119:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _flare_window_base = require('../../../lib/windows/flare_window_base');

var _flare_window_base2 = _interopRequireDefault(_flare_window_base);

var _wrap = require('underscore.string/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LawDetails = (function (_FlareWindowBase) {
  _inherits(LawDetails, _FlareWindowBase);

  function LawDetails() {
    _classCallCheck(this, LawDetails);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LawDetails).call(this));
  }

  _createClass(LawDetails, [{
    key: 'initialize',
    value: function initialize() {
      var width = Graphics.boxWidth / 2 + 70;
      var height = Graphics.boxHeight / 2 - 80;

      _get(Object.getPrototypeOf(LawDetails.prototype), 'initialize', this).call(this, width - 140, 0, width, height);
    }
  }, {
    key: 'refresh',
    value: function refresh(lawObject) {
      this.contents.clear();
      this.drawLawInfo(lawObject);
    }
  }, {
    key: 'drawLawInfo',
    value: function drawLawInfo(lawObject) {
      this.contents.fontSize = 18;

      if ((0, _isUndefined2.default)(lawObject.description)) {
        throw new Error('All Laws MUST have a description, please add the description: attribute to the law tag.');
      }

      var contents = lawObject.description.replace(/\\/g, '\\\\\\');
      contents = (0, _wrap2.default)(contents, { width: 48 });

      this.flareDrawTextEx(contents, 0, 0);

      this.flareDrawTextEx("\\\c[2]----------------------------------------\\\c[0]", 0, 120);
      this.flareDrawTextEx("\\\c[16]punishment\\\c[0]: " + lawObject.punishment, 0, 140);
      this.flareDrawTextEx("\\\c[16]amount lost when violated\\\c[0]: " + lawObject.amount, 0, 170);
    }
  }]);

  return LawDetails;
})(_flare_window_base2.default);

module.exports = LawDetails;

},{"../../../lib/windows/flare_window_base":126,"lodash/lang/isUndefined":71,"underscore.string/wrap":91}],120:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _flare_window_selectable = require('../../lib/windows/flare_window_selectable');

var _flare_window_selectable2 = _interopRequireDefault(_flare_window_selectable);

var _laws_for_map = require('../law_storage/laws_for_map');

var _laws_for_map2 = _interopRequireDefault(_laws_for_map);

var _scene_window_container = require('../../lib/containers/scene/window/scene_window_container');

var _scene_window_container2 = _interopRequireDefault(_scene_window_container);

var _selectable_window_container = require('../../lib/containers/window/selectable/selectable_window_container');

var _selectable_window_container2 = _interopRequireDefault(_selectable_window_container);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _option_handler = require('../options/option_handler');

var _option_handler2 = _interopRequireDefault(_option_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareLawsForMap.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LawsWindowSelectable = (function (_FlareWindowSelecatbl) {
  _inherits(LawsWindowSelectable, _FlareWindowSelecatbl);

  function LawsWindowSelectable() {
    _classCallCheck(this, LawsWindowSelectable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LawsWindowSelectable).call(this));

    _this.initialize();
    return _this;
  }

  _createClass(LawsWindowSelectable, [{
    key: 'initialize',
    value: function initialize() {
      var width = Graphics.boxWidth / 2 - 70;
      var height = Graphics.boxHeight;
      this._lawsForMap = null;

      this._cursorIsMovable = true;

      this._getlawsForMap();
      _selectable_window_container2.default.emptyContainer();

      _get(Object.getPrototypeOf(LawsWindowSelectable.prototype), 'initialize', this).call(this, 0, 0, width, height);
      this.refresh();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(Object.getPrototypeOf(LawsWindowSelectable.prototype), 'update', this).call(this, this);

      if (Input.isTriggered("ok") && _option_handler2.default.getOptions().before_or_after === 'before') {
        _selectable_window_container2.default.setKeyValue('cursorIsMovable', true);
        _selectable_window_container2.default.setKeyValue('turnOffSceneInputListener', true);
        this._cursorIsMovable = false;
      }

      if (_selectable_window_container2.default.getKeyValue('parentCursorIsMovable')) {
        this._cursorIsMovable = _selectable_window_container2.default.getKeyValue('parentCursorIsMovable');
        _selectable_window_container2.default.setKeyValue('parentCursorIsMovable', false);
        _selectable_window_container2.default.setKeyValue('turnOffSceneInputListener', false);
      }
    }
  }, {
    key: 'isCursorMovable',
    value: function isCursorMovable() {
      return this._cursorIsMovable;
    }
  }, {
    key: 'maxItems',
    value: function maxItems() {
      return this._lawsForMap.length;
    }
  }, {
    key: 'itemHeight',
    value: function itemHeight() {
      return 85;
    }
  }, {
    key: 'isCurrentItemEnabled',
    value: function isCurrentItemEnabled() {
      return this.isEnabled(this._lawsForMap);
    }
  }, {
    key: 'drawItem',
    value: function drawItem(index) {
      var law = this._lawsForMap[index];

      if (!law) {
        return;
      }

      this.drawLawToScreen(law, index);
    }
  }, {
    key: 'cursorUp',
    value: function cursorUp() {
      _get(Object.getPrototypeOf(LawsWindowSelectable.prototype), 'cursorUp', this).call(this, this);
      _scene_window_container2.default.getWindowFromContainer('law-details').windowObject.refresh(this._lawsForMap[this.index()]);
    }
  }, {
    key: 'cursorDown',
    value: function cursorDown() {
      _get(Object.getPrototypeOf(LawsWindowSelectable.prototype), 'cursorDown', this).call(this, this);
      _scene_window_container2.default.getWindowFromContainer('law-details').windowObject.refresh(this._lawsForMap[this.index()]);
    }
  }, {
    key: 'drawLawToScreen',
    value: function drawLawToScreen(law, index) {
      var rectangle = this.itemRect(index);
      this.contents.fontSize = 18;
      this.drawIcon(law.icon, 10, rectangle.y + 20);
      this.drawText(law.name, 60, rectangle.y + 20);
      this.flareDrawTextEx('\\\c[14]cant Use\\\c[0]: ' + law.cantUse, 10, rectangle.y + 60);
      this.resetFontSettings();
    }
  }, {
    key: '_getlawsForMap',
    value: function _getlawsForMap() {
      this._lawsForMap = _laws_for_map2.default.getLawsForMap();
    }
  }]);

  return LawsWindowSelectable;
})(_flare_window_selectable2.default);

module.exports = LawsWindowSelectable;

},{"../../lib/containers/scene/window/scene_window_container":122,"../../lib/containers/window/selectable/selectable_window_container":123,"../../lib/windows/flare_window_selectable":127,"../law_storage/laws_for_map":97,"../options/option_handler":99,"lodash/lang/isUndefined":71}],121:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _clone = require('lodash/lang/clone');

var _clone2 = _interopRequireDefault(_clone);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _find = require('lodash/collection/find');

var _find2 = _interopRequireDefault(_find);

var _flare_window_selectable = require('../../../lib/windows/flare_window_selectable');

var _flare_window_selectable2 = _interopRequireDefault(_flare_window_selectable);

var _compiled_storage_container = require('../../reward_storage/compiled_storage_container');

var _compiled_storage_container2 = _interopRequireDefault(_compiled_storage_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @namespace FlareCurrency
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Creates the Flare Law Reward window for Yanfly Aftermath.
 */

var LawRewardWindowYanfly = (function (_FlareWindowSelectabl) {
  _inherits(LawRewardWindowYanfly, _FlareWindowSelectabl);

  function LawRewardWindowYanfly() {
    _classCallCheck(this, LawRewardWindowYanfly);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LawRewardWindowYanfly).call(this));

    _this.initialize();
    return _this;
  }

  _createClass(LawRewardWindowYanfly, [{
    key: 'initialize',
    value: function initialize() {
      var width = Graphics.boxWidth;
      var height = Graphics.boxHeight;
      this._rewards = _compiled_storage_container2.default.getContainer();

      _get(Object.getPrototypeOf(LawRewardWindowYanfly.prototype), 'initialize', this).call(this, 0, 0, width, height);
      this.refresh();
    }
  }, {
    key: 'isCursorMovable',
    value: function isCursorMovable() {
      return true;
    }
  }, {
    key: 'maxItems',
    value: function maxItems() {
      return this._rewards.length;
    }
  }, {
    key: 'itemHeight',
    value: function itemHeight() {
      return 85;
    }
  }, {
    key: 'isCurrentItemEnabled',
    value: function isCurrentItemEnabled() {
      return this.isEnabled(this._rewards);
    }
  }, {
    key: 'drawItem',
    value: function drawItem(index) {
      var reward = this._rewards[index];

      if (!reward) {
        return;
      }

      this.drawRewardsToScreen(reward, index);
    }
  }, {
    key: 'drawRewardsToScreen',
    value: function drawRewardsToScreen(reward, index) {
      var rectangle = this.itemRect(index);
      this.contents.fontSize = 18;

      if ((typeof reward === 'undefined' ? 'undefined' : _typeof(reward)) === 'object') {
        if (!(0, _isUndefined2.default)(reward['xp'])) {
          this.flareDrawTextEx('\\\c[16]Bonus Xp gained (By all Actors (already given)):\\\c[0] ' + reward.xp, 10, rectangle.y + 20);
        } else if (!(0, _isUndefined2.default)(reward['gold'])) {
          this.flareDrawTextEx('\\\c[16]Bonus Gold gained:\\\c[0] ' + reward.gold, 10, rectangle.y + 20);
        } else {
          this.flareDrawTextEx('\\\c[14]You gained\\\c[0]:', 10, rectangle.y + 20);
          this.drawIcon(reward.iconIndex, 125, rectangle.y + 20);
          this.drawText(reward.name, 175, rectangle.y + 20);
        }
      }

      this.resetFontSettings();
    }
  }]);

  return LawRewardWindowYanfly;
})(_flare_window_selectable2.default);

module.exports = LawRewardWindowYanfly;

},{"../../../lib/windows/flare_window_selectable":127,"../../reward_storage/compiled_storage_container":101,"lodash/collection/find":3,"lodash/lang/clone":64,"lodash/lang/isUndefined":71}],122:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareCollection
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _find = require('lodash/collection/find');

var _find2 = _interopRequireDefault(_find);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Allows us to store a window object.
 *
 * Window objects can be stored and then called later on
 * when we want to open them or do other things to them
 */

var SceneWindowContainer = (function () {
  function SceneWindowContainer() {
    _classCallCheck(this, SceneWindowContainer);
  }

  _createClass(SceneWindowContainer, null, [{
    key: 'setWindowToContainer',

    /**
     * Sets a window to a container.
     *
     * Best done in a scene before or after you add the window to the
     * scene its self.
     *
     * @param string name
     * @param classInstance windowObject
     * @param mixed options
     */
    value: function setWindowToContainer(name, windowObject, options) {
      this._container.push({
        name: name,
        windowObject: windowObject,
        options: options
      });
    }

    /**
     * Empties the current container.
     *
     * Best done when you close a scene or pop a scene off.
     */

  }, {
    key: 'emptyContainer',
    value: function emptyContainer() {
      this._container = [];
    }

    /**
     * Gets the actual window class instance based on name.
     *
     * @param string name
     * @return classInstance or undefined.
     */

  }, {
    key: 'getWindowFromContainer',
    value: function getWindowFromContainer(name) {
      return (0, _find2.default)(this._container, function (windows) {
        return windows.name === name;
      });
    }

    /**
     * Get the whole container.
     *
     * @return array
     */

  }, {
    key: 'getContainer',
    value: function getContainer() {
      return this._container;
    }

    /**
     * Determines if a container is empty.
     *
     * Undefined containers are considered empty.
     *
     * @return boolean
     */

  }, {
    key: 'isContainerEmpty',
    value: function isContainerEmpty() {
      if (!(0, _isUndefined2.default)(this._container) && this._container.length > 0) {
        return false;
      }

      return true;
    }
  }]);

  return SceneWindowContainer;
})();

module.exports = SceneWindowContainer = SceneWindowContainer;

},{"lodash/collection/find":3,"lodash/lang/isUndefined":71}],123:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @namespace FlareCollection
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Great in selectable windows to conain options.
 *
 * Good example of this class being used is when you need
 * to store options that are then passed between selectable windows
 * in the same scene. Maybe one activates when one hits enter and the other
 * becomes dorment.
 */

var SelectableWindowContainer = (function () {
  function SelectableWindowContainer() {
    _classCallCheck(this, SelectableWindowContainer);
  }

  _createClass(SelectableWindowContainer, null, [{
    key: 'emptyContainer',

    /**
     * Empty the container.
     */
    value: function emptyContainer() {
      this._windowObjectContainer = {};
    }

    /**
     * Set a key and a value to the object.
     *
     * @param string key
     * @param mixed value
     */

  }, {
    key: 'setKeyValue',
    value: function setKeyValue(key, value) {
      this._windowObjectContainer[key] = value;
    }

    /**
     * Get the value from from the key.
     *
     * @param string key
     * @return mixed or false if nothing was found.
     */

  }, {
    key: 'getKeyValue',
    value: function getKeyValue(key) {
      if ((0, _isUndefined2.default)(this._windowObjectContainer)) {
        return false;
      }

      if ((0, _isUndefined2.default)(this._windowObjectContainer[key])) {
        return false;
      }

      return this._windowObjectContainer[key];
    }
  }]);

  return SelectableWindowContainer;
})();

module.exports = SelectableWindowContainer;

},{"lodash/lang/isUndefined":71}],124:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Store the current count.
 *
 * Used if you want to store the current count of
 * something and then use the value of that count else where.
 */

var FlareCounter = (function () {
  function FlareCounter() {
    _classCallCheck(this, FlareCounter);
  }

  _createClass(FlareCounter, null, [{
    key: "resetCounter",

    /**
     * Reset the counter to 0.
     */
    value: function resetCounter() {
      this._counter = 0;
    }

    /**
     * Appends the value to the current counter.
     *
     * @param int value
     */

  }, {
    key: "addValue",
    value: function addValue(value) {
      this._counter += parseInt(value);
    }

    /**
     * Get the current state of the count.
     *
     * @return int
     */

  }, {
    key: "getCurrentState",
    value: function getCurrentState() {
      return this._counter;
    }
  }]);

  return FlareCounter;
})();

module.exports = FlareCounter;

},{}],125:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareCollection
 */

/**
 * Create a ranom number
 *
 * Methods here are useful for creating random numbers.
 */

var FlareRandomNumber = (function () {
  function FlareRandomNumber() {
    _classCallCheck(this, FlareRandomNumber);
  }

  _createClass(FlareRandomNumber, null, [{
    key: "minMax",

    /**
     * Create random number between nim and max.
     *
     * @param Int min
     * @param Int max
     * @return int
     */
    value: function minMax(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);

  return FlareRandomNumber;
})();

module.exports = FlareRandomNumber = FlareRandomNumber;

},{}],126:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @namespace FlareCollection
 */

/**
 * All Flare based items use this window base.
 *
 * Flare Window Base extends the Window Base Class
 * and adds some additional generic helper methods
 * that are useful for creating windows and their contents.
 */

var FlareWindowBase = (function (_Window_Base) {
  _inherits(FlareWindowBase, _Window_Base);

  function FlareWindowBase(args) {
    _classCallCheck(this, FlareWindowBase);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FlareWindowBase).call(this, args));
  }

  /**
   * Custom drawtextEx function.
   *
   * We do not reset font settings, which is what the default method does.
   * I dont like giant text in my windows.
   *
   * It is usp to the implementor to call: this.resetFontSettings();
   */

  _createClass(FlareWindowBase, [{
    key: 'flareDrawTextEx',
    value: function flareDrawTextEx(text, x, y) {
      if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.text = textState.text.replace(/\\/g, '');
        textState.height = this.calcTextHeight(textState, false);

        while (textState.index < textState.text.length) {
          this.processCharacter(textState);
        }
        return textState.x - x;
      } else {
        return 0;
      }
    }
  }]);

  return FlareWindowBase;
})(Window_Base);

module.exports = FlareWindowBase = FlareWindowBase;

},{}],127:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @namespace FlareCollection
 */

/**
 * Flares custom window selectable.
 *
 * Allows a specific level of abstraction to be addd.
 */

var FlareWindowSelectable = (function (_Window_Selectable) {
  _inherits(FlareWindowSelectable, _Window_Selectable);

  function FlareWindowSelectable(args) {
    _classCallCheck(this, FlareWindowSelectable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FlareWindowSelectable).call(this, args));
  }

  /**
   * Custom drawtextEx function.
   *
   * We do not reset font settings, which is what the default method does.
   * I dont like giant text in my windows.
   *
   * It is usp to the implementor to call: this.resetFontSettings();
   */

  _createClass(FlareWindowSelectable, [{
    key: 'flareDrawTextEx',
    value: function flareDrawTextEx(text, x, y) {
      if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.text = textState.text.replace(/\\/g, '');
        textState.height = this.calcTextHeight(textState, false);

        while (textState.index < textState.text.length) {
          this.processCharacter(textState);
        }

        return textState.x - x;
      } else {
        return 0;
      }
    }
  }]);

  return FlareWindowSelectable;
})(Window_Selectable);

module.exports = FlareWindowSelectable = FlareWindowSelectable;

},{}]},{},[113,93,111,114,110,108,109,107,112]);
