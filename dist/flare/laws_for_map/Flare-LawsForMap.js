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
exports.extractFirst = undefined;
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

// Bare strings are complicated because we need to allow commas between key
// value pairs to be optional. So in the following string,
//
//     foo bar baz: 10
//
// we want to match 'foo bar', not 'foo bar baz'

var SIGNIFICANT_WHITESPACE = (0, _lexerUtils.regex)('SIGNIFICANT_WHITESPACE', /\s+/);
var BAREWORD = (0, _lexerUtils.regex)('BAREWORD', /[^,:><"\s]+/);

var BARESTRING = (0, _lexerUtils.concat)('BARESTRING', (0, _lexerUtils.seq)(BAREWORD, (0, _lexerUtils.repeat)((0, _lexerUtils.notFollowedBy)((0, _lexerUtils.seq)(SIGNIFICANT_WHITESPACE, BAREWORD), (0, _lexerUtils.seq)((0, _lexerUtils.optional)(WHITESPACE), KEYVALSEP)))));

var COMMA = (0, _lexerUtils.regex)('COMMA', /,/);
var NUMBER = (0, _lexerUtils.regex)('NUMBER', /-?[0-9]+(\.[0-9]+)?/);
var BOOLEAN = (0, _lexerUtils.regex)('BOOLEAN', /(true|false)/, 'i');
var QUOTEDSTRING = (0, _lexerUtils.map)(JSON.parse, (0, _lexerUtils.regex)('BARESTRING', /"([^"]|\\")*"/));

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
(0, _lexerUtils.seq)((0, _lexerUtils.precededByToken)('BRA'), (0, _lexerUtils.optional)(WHITESPACE), (0, _lexerUtils.notFollowedBy)(IDENTIFIER, COMMA)), KEYVALSEP, NUMBER, BOOLEAN, QUOTEDSTRING, BARESTRING));

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
function parseVal(tokenStream) {
  if (tokenStream.empty) {
    return null;
  }

  var token = tokenStream.get();

  switch (token.type) {
    case 'NUMBER':
      return [Number(token.token), tokenStream.advance()];
    case 'BARESTRING':
    case 'KEY':
      return [token.token, tokenStream.advance()];
    case 'BOOLEAN':
      return [token.token.toLowerCase() === 'true' ? true : false, tokenStream.advance()];
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

  return [_extends({}, object, { type: secondTokenStream.get().token }), ketStream.advance()];
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

// Construct a token.
//
// type - e.g. 'UNDERSCORE'
// token - e.g. '_'
// pos - the (starting) position in the string where it occurred
function _Token(type, token, pos) {
  return { type: type, token: token, pos: pos };
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
      return _Token(type, token, pos);
    }
  });
}

function TokenStream(buffer) {
  var pos = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return _extends({}, Stream(buffer, pos), {
    advance: function advance() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      return TokenStream(buffer, pos + index);
    },
    ofType: function ofType(type) {
      return pos < buffer.length && buffer[pos].type === type;
    }
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
        return _Token(type, fn(token), pos);
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
"use strict";

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
    key: "flareDrawTextEx",
    value: function flareDrawTextEx(text, x, y) {
      if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
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

module.exports = FlareWindowBase;

},{}],82:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extractAllOfType = require('rmmv-mrp-core/option-parser').extractAllOfType;
var Punishments = require('./punishment_storage/punishments');
var LawManagement = require('./law_storage/laws_for_map');
var ladashArrayUnique = require('../../node_modules/lodash/array/uniq');
var lodashClone = require('../../node_modules/lodash/lang/clone');
var lodashIsUndefined = require('../../node_modules/lodash/lang/isUndefined');

/**
 * @namespace FlareLawsForMap.
 */

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

    this._punishments = new Punishments();
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
      var lawData = extractAllOfType(noteBoxData, 'law');
      var self = this;

      var noteData = extractAllOfType(noteBoxData, 'law');
      var arrayOfRandomLaws = [];
      var threeLaws = 3;

      // Get unique laws.
      noteData = ladashArrayUnique(noteData, function (lawInfo) {
        return lawInfo.name;
      });

      // If theres more then three randomize which ones we get.
      if (noteData.length > 3) {
        var lawsForRadomizing = lodashClone(noteData);

        // Loop over, creating an array of three random and unique laws.
        while (threeLaws > 0) {
          var index = this._generateRandomNumber(0, lawsForRadomizing.length);
          index = index - 1;

          if (index < 0) {
            index = 0;
          }

          arrayOfRandomLaws.push(lawsForRadomizing[index]);
          lawsForRadomizing.splice(index, 1);
          threeLaws--;
        }
      } else {
        arrayOfRandomLaws = noteData;
      }

      if (lodashIsUndefined(LawManagement._lawsForMap)) {
        LawManagement.setLawsForMap([]);
      }

      for (var i = 0; i < arrayOfRandomLaws.length; i++) {
        if (arrayOfRandomLaws[i] instanceof Object && this.validatePunishment(arrayOfRandomLaws[i].punishment)) {
          LawManagement.storeLaw(arrayOfRandomLaws[i]);
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

},{"../../node_modules/lodash/array/uniq":2,"../../node_modules/lodash/lang/clone":64,"../../node_modules/lodash/lang/isUndefined":71,"./law_storage/laws_for_map":85,"./punishment_storage/punishments":88,"rmmv-mrp-core/option-parser":79}],83:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LawManagement = require('./law_storage/laws_for_map');
var OptionsHandler = require('./options/option_handler');

/**
 * @namespace FlareLawsForMap.
 */

/*:
 * @plugindesc Allows you to have a set of laws for a map.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param Death State ID
 * @desc typically one, but you might have changed it ...
 * Default: 1
 * @default 1
 *
 * @help
 *
 * You can have as many laws as you want, any less then 3 we will show them, any more
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
      return LawManagement.getLawsForMap();
    }
  }]);

  return FlareLawsForMap;
})();

// Set up the options.

OptionsHandler.createOptionsStorage();

// Opens this up for the user.
window.FlareLawsForMap = FlareLawsForMap;

},{"./law_storage/laws_for_map":85,"./options/option_handler":87}],84:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LawsForMap = require('../law_storage/laws_for_map');
var lodashFindWhere = require('../../../node_modules/lodash/collection/findWhere');
var FlareLawWasBrokenWindowScene = require('../scenes/flare_law_was_broken_window_scene');
var OptionHandler = require('../options/option_handler');
var StoreNoGoldMessage = require('../law_storage/store_no_gold_message');

/**
 * @namespace FlareLawsForMap.
 */

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

    this._nameOfAction = nameOfAction;
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

      for (var i = 0; i < LawsForMap.getLawsForMap().length; i++) {
        if (LawsForMap.getLawsForMap()[i].cantUse.indexOf(this._nameOfAction) !== -1) {
          return true;
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
      for (var i = 0; i < LawsForMap.getLawsForMap().length; i++) {
        if (LawsForMap.getLawsForMap()[i].cantUse.indexOf(this._nameOfAction) !== -1) {

          window._brokenLawObject = LawsForMap.getLawsForMap()[i];
          window._brokenLawObject.subject = this._actorWhobrokeLaw._name;
          window._brokenLawObject.actionUsed = this._nameOfAction;

          return LawsForMap.getLawsForMap()[i];
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
      console.log('hello');
      if (this.getBrokenLawObject().punishment === 'gold') {
        console.log('hello');
        if ($gameParty._gold === 0) {
          if (!storeMessage) {
            $gameMessage.add('Party has no gold to take.');
          } else {
            console.log('hello');
            StoreNoGoldMessage.createStorage();
            StoreNoGoldMessage.setMessage('Party has no gold to take.');
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
        SceneManager.push(FlareLawWasBrokenWindowScene);
      } else if (SceneManager._scene instanceof Scene_Skill) {
        SceneManager.push(FlareLawWasBrokenWindowScene);
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
            this._actorWhobrokeLaw.addState(OptionHandler.getOptions().death_state_id);
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

},{"../../../node_modules/lodash/collection/findWhere":4,"../law_storage/laws_for_map":85,"../law_storage/store_no_gold_message":86,"../options/option_handler":87,"../scenes/flare_law_was_broken_window_scene":89}],85:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lodashFindWhere = require('../../../node_modules/lodash/collection/findWhere');
var lodashIsUndefined = require('../../../node_modules/lodash/lang/isUndefined');
var lodashCapitalize = require('../../../node_modules/lodash/string/capitalize');
var lodashTrim = require('../../../node_modules/lodash/string/trim');

/**
 * @namespace FlareLawsForMap.
 */

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
    value: function storeLaw(law) {
      var lawCannotUse = null;

      if (law.cantUse.indexOf(',') !== -1) {
        lawCannotUse = law.cantUse.split(',');
        lawCannotUse.length = 3;
        var upperCaseCannotUse = [];

        lawCannotUse.forEach(function (cannotUse) {
          var trimmedCannotUse = lodashTrim(cannotUse);
          upperCaseCannotUse.push(lodashCapitalize(trimmedCannotUse));
        });

        lawCannotUse = upperCaseCannotUse.join();
      } else {
        lawCannotUse = lodashCapitalize(law.cantUse);
      }

      var lawForMap = {
        name: law.name,
        punishment: law.punishment,
        amount: law.amount,
        icon: law.icon,
        cantUse: lawCannotUse
      };

      if (this._lawsForMap.length === 3) {
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

},{"../../../node_modules/lodash/collection/findWhere":4,"../../../node_modules/lodash/lang/isUndefined":71,"../../../node_modules/lodash/string/capitalize":75,"../../../node_modules/lodash/string/trim":76}],86:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

},{}],87:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareLawsForMap.
 */

// Plugin Options.
var FlareLasForMap = PluginManager.parameters('Flare-LawsForMap');

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
        death_state_id: FlareLasForMap['Death State ID']
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

},{}],88:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lodashFind = require('../../../node_modules/lodash/collection/find');

/**
 * @namespace FlareLawsForMap.
 */

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

},{"../../../node_modules/lodash/collection/find":3}],89:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrokenLawWindow = require('../windows/broken_law/broken_law_window');

/**
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
      this._flareBrokenLawWindow = new BrokenLawWindow();
      this.addWindow(this._flareBrokenLawWindow);
    }
  }]);

  return FlareLawWasBrokenWindowScene;
})(Scene_MenuBase);

module.exports = FlareLawWasBrokenWindowScene;

},{"../windows/broken_law/broken_law_window":98}],90:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareLawWindow = require('../windows/laws_window');

/**
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
    key: "create",
    value: function create() {
      _get(Object.getPrototypeOf(FlareLawWindowScene.prototype), "create", this).call(this, this);

      this.createLawWindowForParty();
    }
  }, {
    key: "update",
    value: function update() {
      _get(Object.getPrototypeOf(FlareLawWindowScene.prototype), "update", this).call(this, this);

      if (Input.isTriggered("cancel")) {
        this._flareLawWindow.close();
        this.popScene();
      }
    }
  }, {
    key: "createLawWindowForParty",
    value: function createLawWindowForParty() {
      this._flareLawWindow = new FlareLawWindow();
      this.addWindow(this._flareLawWindow);
    }
  }]);

  return FlareLawWindowScene;
})(Scene_MenuBase);

module.exports = FlareLawWindowScene;

},{"../windows/laws_window":99}],91:[function(require,module,exports){
'use strict';

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

},{}],92:[function(require,module,exports){
"use strict";

var ProcessBrokenLaw = require('../law_handler/process_broken_law');

/**
 * @namespace FlareLawsForMap.
 */

var oldGameActionPrototypeApplyMethod = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
  oldGameActionPrototypeApplyMethod.call(this, target);
  this.applyPunishmentIfLawIsBroken(this.item(), this.subject(), target);
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
  var processWhatShouldHappenOnHit = new ProcessBrokenLaw(item.name, subject);

  // Punish the user for breaking a law, assuming they have.
  if (subject instanceof Game_Actor && target instanceof Game_Actor && processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw() && !$gameParty.inBattle()) {

    // Punish for items, spells and others that target the player or players.
    processWhatShouldHappenOnHit.checkForGoldBeforePunish(true);
    processWhatShouldHappenOnHit.openMessageWindow();
    processWhatShouldHappenOnHit.punishPlayer();
  } else if (target instanceof Game_Enemy && processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw() || subject instanceof Game_Actor && target instanceof Game_Actor && processWhatShouldHappenOnHit.validatePlayerBrokeTheLaw() && $gameParty.inBattle()) {
    var brokenLawObject = processWhatShouldHappenOnHit.getBrokenLawObject();

    // Punish the player for those that effect the enemy.
    $gameMessage.add("\\c[9]" + subject._name + "\\c[0]" + ' has \\c[14]broken a law\\c[0] prohibiting the use of: ' + "\\c[18]" + item.name + 's\\c[0]');
    $gameMessage.add("\\c[14] Punishment is: \\c[0]" + "\\c[20]" + brokenLawObject.punishment + "\\c[0] in the amount of: " + "\\c[20]" + brokenLawObject.amount + "\\c[0]");

    // Display no more gold message and punish the player.
    processWhatShouldHappenOnHit.checkForGoldBeforePunish(false);
    processWhatShouldHappenOnHit.punishPlayer();
  } else {
    item.effects.forEach(function (effect) {
      this.applyItemEffect(target, effect);
    }, this);

    this.applyItemUserEffect(target);
  }
};

},{"../law_handler/process_broken_law":84}],93:[function(require,module,exports){
'use strict';

var AddLawsForMap = require('../add_laws_for_map.js');

/**
 * @namespace FlareLawsForMap.
 */

var oldGameMapPrototypeSetupMethod = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
  oldGameMapPrototypeSetupMethod.call(this, mapId);

  // Process laws for map.
  var flarAddLawsForMap = new AddLawsForMap();
  flarAddLawsForMap.grabMapInformation();
};

},{"../add_laws_for_map.js":82}],94:[function(require,module,exports){
'use strict';

var FlareLawWasBrokenWindowScene = require('../scenes/flare_law_was_broken_window_scene');
var LawsForMap = require('../law_storage/laws_for_map');

/**
 * @namespace FlareLawsForMap.
 */

var oldSceneBasePrototypeCheckGameOverMethod = Scene_Base.prototype.checkGameover;
Scene_Base.prototype.checkGameover = function () {
  if (LawsForMap.getLawsForMap() !== undefined && LawsForMap.getLawsForMap().length > 0 && window._brokenLawObject !== null) {
    if ($gameParty.isAllDead()) {
      SceneManager.push(FlareLawWasBrokenWindowScene);
    }
  } else {
    oldSceneBasePrototypeCheckGameOverMethod.call(this);
  }
};

},{"../law_storage/laws_for_map":85,"../scenes/flare_law_was_broken_window_scene":89}],95:[function(require,module,exports){
'use strict';

var FlareLawWindowScene = require('../scenes/flare_law_window_scene');

/**
 * @namespace FlareLawsForMap.
 */

var oldSceneMenuPrototypeCreateCommandWindiow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
  oldSceneMenuPrototypeCreateCommandWindiow.call(this);
  this._commandWindow.setHandler('Laws', this.lawsCommand.bind(this));
};

Scene_Menu.prototype.lawsCommand = function () {
  SceneManager.push(FlareLawWindowScene);
};

},{"../scenes/flare_law_window_scene":90}],96:[function(require,module,exports){
'use strict';

var LawsForMap = require('../law_storage/laws_for_map');

/**
 * @namespace FlareLawsForMap.
 */

var oldWindowBasePrototypeDrawGaugeMethod = Window_Base.prototype.drawGauge;
Window_Base.prototype.drawGauge = function (dx, dy, dw, rate, color1, color2) {
  if (LawsForMap.getLawsForMap() !== undefined && LawsForMap.getLawsForMap().length > 0) {
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

},{"../law_storage/laws_for_map":85}],97:[function(require,module,exports){
'use strict';

/**
 * @namespace FlareLawsForMap.
 */

var oldWindowMenuCommandProtottypeAddOriginalCommandsMethod = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  oldWindowMenuCommandProtottypeAddOriginalCommandsMethod.call(this);
  this.addCommand('Laws', 'Laws');
};

},{}],98:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareWindowBase = require('../../../flare_window_base');
var StoreNoGoldMessage = require('../../law_storage/store_no_gold_message');
var lodashIsUndefined = require('../../../../node_modules/lodash/lang/isUndefined');

/**
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
      this._law = window._brokenLawObject;
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

      if (!lodashIsUndefined(StoreNoGoldMessage.getMessage)) {
        this.flareDrawTextEx('\\c[20]' + StoreNoGoldMessage.getMessage() + '\\c[0]', 10, 210);
      }

      if ($gameParty.isAllDead()) {
        this.flareDrawTextEx('\\c[20] Every one is dead. Game over ... \\c[20]', 10, 250);
      }

      this.resetFontSettings();
    }
  }]);

  return BrokenLawWindow;
})(FlareWindowBase);

module.exports = BrokenLawWindow;

},{"../../../../node_modules/lodash/lang/isUndefined":71,"../../../flare_window_base":81,"../../law_storage/store_no_gold_message":86}],99:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareWindowBase = require('../../flare_window_base');
var LawsForMap = require('../law_storage/laws_for_map');

/**
 * @namespace FlareLawsForMap.
 */

/**
 * Creates a window displaying the laws for said map.
 */

var LawWindow = (function (_FlareWindowBase) {
  _inherits(LawWindow, _FlareWindowBase);

  function LawWindow() {
    _classCallCheck(this, LawWindow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LawWindow).call(this));

    _this.initialize();
    _this.refresh();
    return _this;
  }

  _createClass(LawWindow, [{
    key: 'initialize',
    value: function initialize() {
      _get(Object.getPrototypeOf(LawWindow.prototype), 'initialize', this).call(this, this.tryAndCenter() - 40, this.tryAndCenter() - 190, this.windowWidth(), this.windowHeight());
      this._randomlyPickedLaws = [];
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
      return Graphics.boxWidth / 2 + 190;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.contents.clear();

      this.drawText('Laws For Region', 10, 10, 250, 'left');

      var laws = LawsForMap.getLawsForMap();

      if (laws.length > 0) {
        if (laws.length > 3) {
          // randomize
        } else {
            this.contents.fontSize = 18;
            this.drawLaws(laws);
            this.resetFontSettings();
          }
      } else {
        this.contents.fontSize = 18;
        this.flareDrawTextEx('\\c[14]No Current Laws For Region\\c[0]', 14, 60, 450, 'left');
        this.resetFontSettings();
      }
    }
  }, {
    key: 'drawLaws',
    value: function drawLaws(laws) {
      var baseYForText = 70; // the y variable for drawText and drawIcon.
      this.contents.fontSize = 20;

      var self = this;
      var count = 0;
      laws.map(function (law) {
        if (Array.isArray(law.cantUse)) {
          law.cantUse.toString();
        }

        if (count === 1) {
          self.drawIcon(law.icon, 20, baseYForText + 35);
          self.drawText("Law:", 60, baseYForText + 35);
        } else if (count === 2) {
          self.drawIcon(law.icon, 20, baseYForText + 85);
          self.drawText("Law:", 60, baseYForText + 85);
        } else {
          self.drawIcon(law.icon, 20, baseYForText - 10);
          self.drawText("Law:", 60, baseYForText - 10);
        }

        if (count === 1) {
          self.drawSecondLaw(baseYForText, law);
        } else if (count === 2) {
          self.drawThirdLaw(baseYForText, law);
        } else {
          self.flareDrawTextEx("Type:", 20, baseYForText + 25);
          self.flareDrawTextEx("\\c[8]" + law.name + "\\c[0]", 150, baseYForText + 25);
          self.flareDrawTextEx("Punishment:", 20, baseYForText + 45);
          self.flareDrawTextEx("\\c[14]" + law.punishment + "\\c[0]", 150, baseYForText + 45);
          self.flareDrawTextEx("Amount:", 20, baseYForText + 70);
          self.flareDrawTextEx("\\c[16]" + law.amount + "\\c[0]", 150, baseYForText + 70);
          self.flareDrawTextEx("Cannot Use:", 20, baseYForText + 90);
          self.flareDrawTextEx("\\c[18]" + law.cantUse + "\\c[0]", 150, baseYForText + 90);
          self.flareDrawTextEx("\\c[20] -----------------------------------------  \\c[0]", 10, baseYForText + 110);
        }

        baseYForText += 100;
        count += 1;
      });
    }
  }, {
    key: 'drawSecondLaw',
    value: function drawSecondLaw(baseYForText, law) {
      this.flareDrawTextEx("Type:", 20, baseYForText + 70);
      this.flareDrawTextEx("\\c[8]" + law.name + "\\c[0]", 150, baseYForText + 70);
      this.flareDrawTextEx("Punishment:", 20, baseYForText + 90);
      this.flareDrawTextEx("\\c[14]" + law.punishment + "\\c[0]", 150, baseYForText + 90);
      this.flareDrawTextEx("Amount:", 20, baseYForText + 115);
      this.flareDrawTextEx("\\c[16]" + law.amount + "\\c[0]", 150, baseYForText + 115);
      this.flareDrawTextEx("Cannot Use:", 20, baseYForText + 135);
      this.flareDrawTextEx("\\c[18]" + law.cantUse + "\\c[0]", 150, baseYForText + 135);
      this.flareDrawTextEx("\\c[20] -----------------------------------------  \\c[0]", 10, baseYForText + 160);
    }
  }, {
    key: 'drawThirdLaw',
    value: function drawThirdLaw(baseYForText, law) {
      this.flareDrawTextEx("Type:", 20, baseYForText + 120);
      this.flareDrawTextEx("\\c[8]" + law.name + "\\c[0]", 150, baseYForText + 120);
      this.flareDrawTextEx("Punishment:", 20, baseYForText + 140);
      this.flareDrawTextEx("\\c[14]" + law.punishment + "\\c[0]", 150, baseYForText + 140);
      this.flareDrawTextEx("Amount:", 20, baseYForText + 160);
      this.flareDrawTextEx("\\c[16]" + law.amount + "\\c[0]", 150, baseYForText + 160);
      this.flareDrawTextEx("Cannot Use:", 20, baseYForText + 180);
      this.flareDrawTextEx("\\c[18]" + law.cantUse + "\\c[0]", 150, baseYForText + 180);
      this.flareDrawTextEx("\\c[20] -----------------------------------------  \\c[0]", 10, baseYForText + 200);
    }
  }]);

  return LawWindow;
})(FlareWindowBase);

module.exports = LawWindow;

},{"../../flare_window_base":81,"../law_storage/laws_for_map":85}]},{},[96,83,95,97,94,92,93,91]);
