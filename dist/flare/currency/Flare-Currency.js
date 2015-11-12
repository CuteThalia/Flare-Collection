(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createFindIndex = require('../internal/createFindIndex');

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
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
 * @category Array
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(chr) {
 *   return chr.user == 'barney';
 * });
 * // => 0
 *
 * // using the `_.matches` callback shorthand
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.findIndex(users, 'active', false);
 * // => 0
 *
 * // using the `_.property` callback shorthand
 * _.findIndex(users, 'active');
 * // => 2
 */
var findIndex = createFindIndex();

module.exports = findIndex;

},{"../internal/createFindIndex":31}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"../internal/baseEach":11,"../internal/createFind":30}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"../object/keys":59,"./baseCopy":10}],8:[function(require,module,exports){
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

},{"../utility/identity":62,"../utility/property":63,"./baseMatches":20,"./baseMatchesProperty":21,"./bindCallback":26}],9:[function(require,module,exports){
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

},{"../lang/isArray":53,"../lang/isObject":56,"./arrayCopy":4,"./arrayEach":5,"./baseAssign":7,"./baseForOwn":15,"./initCloneArray":38,"./initCloneByTag":39,"./initCloneObject":40}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"./baseForOwn":15,"./createBaseEach":28}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./createBaseFor":29}],15:[function(require,module,exports){
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

},{"../object/keys":59,"./baseFor":14}],16:[function(require,module,exports){
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

},{"./toObject":49}],17:[function(require,module,exports){
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

},{"../lang/isObject":56,"./baseIsEqualDeep":18,"./isObjectLike":46}],18:[function(require,module,exports){
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

},{"../lang/isArray":53,"../lang/isTypedArray":57,"./equalArrays":32,"./equalByTag":33,"./equalObjects":34}],19:[function(require,module,exports){
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

},{"./baseIsEqual":17,"./toObject":49}],20:[function(require,module,exports){
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

},{"./baseIsMatch":19,"./getMatchData":36,"./toObject":49}],21:[function(require,module,exports){
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

},{"../array/last":2,"../lang/isArray":53,"./baseGet":16,"./baseIsEqual":17,"./baseSlice":24,"./isKey":44,"./isStrictComparable":47,"./toObject":49,"./toPath":50}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"./baseGet":16,"./toPath":50}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"../utility/identity":62}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
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

},{"./getLength":35,"./isLength":45,"./toObject":49}],29:[function(require,module,exports){
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

},{"./toObject":49}],30:[function(require,module,exports){
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

},{"../lang/isArray":53,"./baseCallback":8,"./baseFind":12,"./baseFindIndex":13}],31:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseFindIndex = require('./baseFindIndex');

/**
 * Creates a `_.findIndex` or `_.findLastIndex` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFindIndex(fromRight) {
  return function(array, predicate, thisArg) {
    if (!(array && array.length)) {
      return -1;
    }
    predicate = baseCallback(predicate, thisArg, 3);
    return baseFindIndex(array, predicate, fromRight);
  };
}

module.exports = createFindIndex;

},{"./baseCallback":8,"./baseFindIndex":13}],32:[function(require,module,exports){
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

},{"./arraySome":6}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"../object/keys":59}],35:[function(require,module,exports){
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

},{"./baseProperty":22}],36:[function(require,module,exports){
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

},{"../object/pairs":61,"./isStrictComparable":47}],37:[function(require,module,exports){
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

},{"../lang/isNative":55}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"./bufferClone":27}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{"./getLength":35,"./isLength":45}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"../lang/isObject":56,"./isArrayLike":41,"./isIndex":42}],44:[function(require,module,exports){
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

},{"../lang/isArray":53,"./toObject":49}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{"../lang/isObject":56}],48:[function(require,module,exports){
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

},{"../lang/isArguments":52,"../lang/isArray":53,"../object/keysIn":60,"./isIndex":42,"./isLength":45}],49:[function(require,module,exports){
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

},{"../lang/isObject":56}],50:[function(require,module,exports){
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

},{"../lang/isArray":53,"./baseToString":25}],51:[function(require,module,exports){
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

},{"../internal/baseClone":9,"../internal/bindCallback":26,"../internal/isIterateeCall":43}],52:[function(require,module,exports){
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

},{"../internal/isArrayLike":41,"../internal/isObjectLike":46}],53:[function(require,module,exports){
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

},{"../internal/getNative":37,"../internal/isLength":45,"../internal/isObjectLike":46}],54:[function(require,module,exports){
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

},{"./isObject":56}],55:[function(require,module,exports){
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

},{"../internal/isObjectLike":46,"./isFunction":54}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{"../internal/isLength":45,"../internal/isObjectLike":46}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"../internal/getNative":37,"../internal/isArrayLike":41,"../internal/shimKeys":48,"../lang/isObject":56}],60:[function(require,module,exports){
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

},{"../internal/isIndex":42,"../internal/isLength":45,"../lang/isArguments":52,"../lang/isArray":53,"../lang/isObject":56}],61:[function(require,module,exports){
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

},{"../internal/toObject":49,"./keys":59}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{"../internal/baseProperty":22,"../internal/basePropertyDeep":23,"../internal/isKey":44}],64:[function(require,module,exports){
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
},{"./lexer-utils":65}],65:[function(require,module,exports){
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
},{}],66:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlareError = require('../../flare_error');

/**
 * Currency Object Creation Class
 *
 * Responsible for creating the currencie objects and storing
 * them in a currency store that can then be fetched and manipulated
 * through out the game.
 */

var Currency = (function () {
  function Currency() {
    _classCallCheck(this, Currency);

    this._currencyStore;
  }

  /**
   * Stores the currency into the currency store array.
   *
   * @param currency - object
   */

  _createClass(Currency, [{
    key: "store",
    value: function store(currency) {
      this._currencyStore = [{
        name: currency["Currency One Name"],
        description: currency["Currency One Description"],
        icon: currency["Currency One Icon Index"],
        amount: 0
      }, {
        name: currency["Currency Two Name"],
        description: currency["Currency Two Description"],
        icon: currency["Currency Two Icon Index"],
        amount: 0
      }, {
        name: currency["Currency Three Name"],
        description: currency["Currency Three Description"],
        icon: currency["Currency Three Icon Index"],
        amount: 0
      }, {
        name: currency["Currency Four Name"],
        description: currency["Currency Four Description"],
        icon: currency["Currency Four Icon Index"],
        amount: 0
      }, {
        name: currency["Currency Five Name"],
        description: currency["Currency Five Description"],
        icon: currency["Currency Five Icon Index"],
        amount: 0
      }];
    }

    /**
     * Sets the store from the saved game.
     *
     * Saved games will have a contents.currencies in them.
     * Over ride what evers in this._store with the store from the
     * contents.currencies.
     *
     * @param Array store
     */
  }, {
    key: "setStoreFromLoad",
    value: function setStoreFromLoad(store) {
      this._currencyStore = store;
    }

    /**
     * Get the currency store.
     *
     * @return Array of Objects
     */
  }, {
    key: "getCurrencyStore",
    value: function getCurrencyStore() {
      return this._currencyStore;
    }
  }]);

  return Currency;
})();

;

module.exports = Currency;

},{"../../flare_error":83}],67:[function(require,module,exports){
/**
 * @namespace FlareCurrencies
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Currency = require('./currency');
var FlareCurrencyMenu = require('../menus/flare_currency_menu');
var FlareError = require('../../flare_error');

var FlareCurrencyPluginParamters = PluginManager.parameters('Flare-Currency');

/**
 * Core Currency Class.
 *
 * Contains a method called createCurrencies() that creates the currencies based off
 * the plugin paramters.
 */

var FlareCurrency = (function () {
  function FlareCurrency() {
    _classCallCheck(this, FlareCurrency);

    window.flareCurrency = new Currency();
  }

  /**
   * Non public API method to create currencies.
   *
   * Calls on the Currency class to store the currencies
   * that were set up via the plugin parameters.
   */

  _createClass(FlareCurrency, [{
    key: 'createCurrencies',
    value: function createCurrencies() {
      window.flareCurrency.store(FlareCurrencyPluginParamters);
    }

    /**
     * Sets the store from the saved game.
     *
     * Saved games will have a contents.currencies in them.
     * Over ride what evers in this._store with the store from the
     * contents.currencies.
     *
     * @param Array store
     */
  }, {
    key: 'setStoreFromLoad',
    value: function setStoreFromLoad(store) {
      window.flareCurrency.setStoreFromLoad(store);
    }
  }]);

  return FlareCurrency;
})();

;

// Create the Currencies menu item.
var flareCurrencyMenu = new FlareCurrencyMenu();
flareCurrencyMenu.menuHandler();

// Creates the Currencies.
var flareCurrency = new FlareCurrency();
flareCurrency.createCurrencies();

// Handles Errors thrown in classes that do not extend the
// the RPG Maker classes.
// @see FlareError
var mainSceneMapInitializer = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
  mainSceneMapInitializer.call(this);

  if (FlareError.getError() !== undefined) {
    throw new Error(FlareError.getError());
  }
};

},{"../../flare_error":83,"../menus/flare_currency_menu":69,"./currency":66}],68:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var lodashFind = require('../../node_modules/lodash/collection/find');
var CurrencyShop = require('./shop/currency_shop');

/**
 * @namespace FlareCurrency
 */

/*:
 * @plugindesc Allows you to add a new currency or set of currencies to the game
 * such currencies can include things like "clay pot" or "silver coin" they are then
 * used in shops.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param ---Currency One---
 * @desc
 *
 * @param Currency One Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency One Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency One Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @param ---Currency Two---
 * @desc
 *
 * @param Currency Two Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency Two Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency Two Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @param ---Currency Three---
 * @desc
 *
 * @param Currency Three Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency Three Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency Three Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @param ---Currency Four---
 * @desc
 *
 * @param Currency Four Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency Four Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency Four Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @param ---Currency Five---
 * @desc
 *
 * @param Currency Five Name
 * @desc Name of the Currency
 * Default: Example Name
 * @default Example Name
 *
 * @param Currency Five Description
 * @desc Keep it short. Currency description
 * Default: Used to buy: something.
 * @default Used to buy: something.
 *
 * @param Currency Five Icon Index
 * @desc icon index.
 * Default: 25
 * @default 25
 *
 * @help
 *
 * Currencies can be used in game to buy items that require that specific
 * currency. For example maybe Demonic Armor needs 5 Demonic Runes. you
 * would create a currency called Demonic Runes, with a description of:
 * "Used to buy Demonic Armour" and then set an icon index.
 *
 * Descriptions must be kept SUPER SUPER short. yes we do allow short codes
 * but no we do not do anything like word wrapping. Keep the concept of:
 *
 * Used to buy: x
 *
 * === Note Tags - Enemies ===
 *
 * For Enemies:
 *
 * The following tags can be applied to enemies:
 *
 * <currencies: "Name", amount, percentage>
 *
 * "Name"     - Currency Name, can have color short codes.
 * amount     - Integer, how much does the enemy give?
 * percentage - Optional integer. percentage of drop (see below).
 *
 * Percentage is optional, with out it, all currencies
 * have a 100% drop rate. doing:
 *
 * <currencies: "Demon Teeth", 80, 15>
 *
 * Means you have a 15% chance to get 80 Demon Teeth, How ever:
 *
 * <currencies: "Demon Teeth", 80>
 *
 * Means you have a 100% chance of getting 80 Demon Teeth off the enemy.
 *
 * === Note Tags - Setting up a shop ===
 *
 * You have some currencies, via the battles or via the public API methods
 * below that can be called via events. Now how do you set up items
 * for the currency shop, which can be opened via the public api
 * methods below.
 *
 * Items, weapons and armors can have the following tag:
 *
 * <currencyShop belongsTo: "Sample Name" andCosts: 76>
 *
 * This states that the item belongs to the currency of "Sammple Name" and
 * it costs 76 of that currency.
 *
 * This same tag can be used on weapons and armor. When you call:
 *
 * FlareCurrencies.openShop("Sample Name")
 *
 * We will open a shop with ALL items, weapons and armors that
 * match that currency name.
 *
 * This tag adds belongsToCurrency and currencyCost to an item object.
 *
 * The way the shop is designed is such that if we cannot find a item
 * that matches your currency name you will get an empty shop.
 *
 * All items are fetched for you on game start up so that creating shops is
 * done super super fast.
 *
 * === Yanfly Vistory Aftermath ===
 *
 * To use this with Yanfly victory after math all you have to do is add:
 * currency to the Victory Order. For example: exp custom drops currency
 *
 * === Shop Compatability and Programming ===
 *
 * Shops are done such that they are backwards compatible and should work
 * with othr shop scripts.
 *
 * For programmers there is two new keys added to items:
 *
 * belongsToCurrency: "string"
 * currencyCost: int
 *
 * === For programmers: Currencies ===
 *
 * There is a base object you can access: flareCurrency
 *
 * This can be called and contains static methods. It is lower case because
 * it is meant to be "private". It contains the following API:
 *
 * store(currency) - Takes an array of objects, each contains the following
 * key/value: name, description, icon and amount. This store is read from
 * and wrote too.
 *
 * setStoreFromLoad(currency) - Same as store. This over rides the store.
 * this is sed for loading the game from a saved state.
 *
 * getCurrencyStore() - Returns an array of objects that is the store and
 * the time its called.
 *
 * === Public API ===
 *
 * There are two new objects that roam in the wile. flareCurrency and
 * FlareCurrency
 *
 * flareCurreency is used internally and is not to be touched. Mutating This
 * object can cause issues in the script.
 *
 * FlareCurrency is a class which conains the public api, such as setting
 * currency amount and calling currency specific shops.
 *
 * All methods on FlareCurrencies is static.
 *
 * === Methods ===
 *
 * FlareCurrencies.addAmount(currencyName, currencyAmount)
 *
 * Method to add or subtract a specific amount from a
 * currency given the currency name.
 *
 * Example: FlareCurrencies.addAmount("Demon Teeth", 76);
 *
 * This will give you 76 Demon Teeth.
 *
 * Second Example: FlareCurrencies.addAmount("Demon Teeth", -99999);
 *
 * Because we do not have a limit on currencies, assume the user
 * has 10 Demon Teeth, this will make the count 0;
 *
 * FlareCurrencies.openShop("Currency Name", purchaseOnly)
 *
 * Opens a currency shop based on the currency name. We will gather
 * all the items that have the currencyShop tag attached to them, determine
 * there price and so on.
 *
 * Purchase only can be true/false or not even passed in (default false).
 * Purcahse only works the way you think it would, you cannot sell.
 */

/**
 * Public Api Class for handeling currencies.
 *
 * This object is tied to the window object making it public.
 * It contains methods for setting, getting, opening currency shops
 * and so on.
 */

var FlareCurrencies = (function () {
  function FlareCurrencies() {
    _classCallCheck(this, FlareCurrencies);
  }

  // Create public API.

  _createClass(FlareCurrencies, null, [{
    key: 'addAmount',

    /**
     * Set the amount for the specific currency.
     *
     * Negative numbers are permited. If the total value goes
     * below 0, we will set the amount to 0.
     *
     * @param String currencyName
     * @param Int currencyAmount
     */
    value: function addAmount(currencyName, currencyAmount) {
      var currencies = window.flareCurrency.getCurrencyStore();

      var self = this;

      var currencyObject = lodashFind(currencies, function (currency) {
        if (currency.name.indexOf(currencyName) !== -1 || currencyName.indexOf(currency.name) !== -1) {

          return currency;
        }
      });

      if (currencyObject === undefined) {
        throw new Error('Currency not found. Tried looking for: ' + currencyName + ' is the spelling right?');
      }

      this._addAmount(currencyObject, currencyAmount);
    }
  }, {
    key: 'openShop',
    value: function openShop(currency, purchaseOnly) {
      if (purchaseOnly === undefined) {
        purchaseOnly = false;
      }

      var currencyShop = new CurrencyShop();
      currencyShop.openShopWindow(currency, purchaseOnly);
    }
  }, {
    key: 'getCurrentCurrencyAmount',
    value: function getCurrentCurrencyAmount(currencyName) {
      var currencies = window.flareCurrency.getCurrencyStore();
      var self = this;

      var currencyObject = lodashFind(currencies, function (currency) {
        if (currency.name.indexOf(currencyName) !== -1 || currencyName.indexOf(currency.name) !== -1) {

          return currency;
        }
      });

      return currencyObject.amount;
    }

    /**
     * Private method: sets Currency.
     *
     * @param Object Currency
     * @param Int CurrencyAmount
     */
  }, {
    key: '_addAmount',
    value: function _addAmount(currency, currencyAmount) {
      currency.amount += currencyAmount;

      if (currency.amount < 0) {
        currency.amount = 0;
      }
    }
  }]);

  return FlareCurrencies;
})();

window.FlareCurrencies = FlareCurrencies;

},{"../../node_modules/lodash/collection/find":3,"./shop/currency_shop":73}],69:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareMenuSceneHandlerInterface = require('../../flare_menu_scene_interface');
var FlareCurrencyScene = require('../scenes/flare_currency_scene');

/**
 * Allows you to view the currencies that you hold.
 *
 * Overrides the main scene menu to add a new option: Currencies.
 * This class does not handle the scene window.
 *
 */

var FlareCurrencyMenu = (function (_FlareMenuSceneHandlerInterface) {
  _inherits(FlareCurrencyMenu, _FlareMenuSceneHandlerInterface);

  function FlareCurrencyMenu() {
    _classCallCheck(this, FlareCurrencyMenu);

    _get(Object.getPrototypeOf(FlareCurrencyMenu.prototype), 'constructor', this).call(this);
  }

  /**
   * Create a new menu item for the currency window.
   */

  _createClass(FlareCurrencyMenu, [{
    key: 'menuHandler',
    value: function menuHandler() {
      var oldSceneMenu = Scene_Menu.prototype.createCommandWindow;

      Scene_Menu.prototype.createCommandWindow = function () {
        oldSceneMenu.call(this);
        this._commandWindow.setHandler('Currencies', this.currencyCommand.bind(this));
      };

      Scene_Menu.prototype.currencyCommand = function () {
        SceneManager.push(FlareCurrencyScene);
      };

      this.addCommandToGameMenu();
    }

    /**
     * Add a new command to the window menu command.
     */
  }, {
    key: 'addCommandToGameMenu',
    value: function addCommandToGameMenu() {
      var addNewMenuContent = Window_MenuCommand.prototype.addOriginalCommands;
      Window_MenuCommand.prototype.addOriginalCommands = function () {
        addNewMenuContent.call(this);
        this.addCommand('Currencies', 'Currencies');
      };
    }
  }]);

  return FlareCurrencyMenu;
})(FlareMenuSceneHandlerInterface);

;

module.exports = FlareCurrencyMenu;

},{"../../flare_menu_scene_interface":84,"../scenes/flare_currency_scene":70}],70:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareCurrencyWindow = require('../windows/flare_currency_window');

/**
 * Create the actual currency scene.
 *
 * When the user selects currencies from the menu we want to
 * create a new scene which then creates a new window.
 */

var FlareCurrencyScene = (function (_Scene_MenuBase) {
  _inherits(FlareCurrencyScene, _Scene_MenuBase);

  function FlareCurrencyScene() {
    _classCallCheck(this, FlareCurrencyScene);

    _get(Object.getPrototypeOf(FlareCurrencyScene.prototype), "constructor", this).call(this);
  }

  /**
   * Create the Currency Window
   */

  _createClass(FlareCurrencyScene, [{
    key: "create",
    value: function create() {
      _get(Object.getPrototypeOf(FlareCurrencyScene.prototype), "create", this).call(this, this);
      this.createCurrencyWindowForParty();
    }

    /**
     * Listen for the canel action.
     *
     * Close the currency window, pop this scene off the stack.
     */
  }, {
    key: "update",
    value: function update() {
      _get(Object.getPrototypeOf(FlareCurrencyScene.prototype), "update", this).call(this, this);

      if (Input.isTriggered("cancel")) {
        this._flareCurrencyWindow.close();
        this.popScene();
      }
    }

    /**
     * Create the actual window.
     */
  }, {
    key: "createCurrencyWindowForParty",
    value: function createCurrencyWindowForParty() {
      this._flareCurrencyWindow = new FlareCurrencyWindow();
      this.addWindow(this._flareCurrencyWindow);
    }
  }]);

  return FlareCurrencyScene;
})(Scene_MenuBase);

;

module.exports = FlareCurrencyScene;

},{"../windows/flare_currency_window":78}],71:[function(require,module,exports){
'use strict';

var CurrencyValueWindow = require("../windows/shop/currency_value_window");

Scene_Shop.prototype.createCurrencyWindow = function (currencyName) {
  this._curencyValueWindow = new CurrencyValueWindow(currencyName);
  this._curencyValueWindow.x = Graphics.boxWidth - this._curencyValueWindow.width;
  this.addWindow(this._curencyValueWindow);
};

var OldSceneShopPrototypeCreateMethod = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function () {
  if (_currencyShopInfo.currency_name !== null) {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCurrencyWindow(_currencyShopInfo.currency_name);
    this.createCommandWindow(_currencyShopInfo.currency_name);
    this.createDummyWindow();
    this.createNumberWindow(_currencyShopInfo.currency_name);
    this.createStatusWindow();
    this.createBuyWindow(_currencyShopInfo.currency_name);
    this.createCategoryWindow();
    this.createSellWindow(_currencyShopInfo.currency_name);
    _currencyShopInfo.currency_name = null;
  } else {
    OldSceneShopPrototypeCreateMethod.call(this);
  }
};

var oldSceneMapPrototypeCreateCommandWindowMethod = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function (currencyName) {
  if (currencyName !== undefined) {
    this._commandWindow = new Window_ShopCommand(this._curencyValueWindow.x, this._purchaseOnly);
    this._commandWindow.y = this._helpWindow.height;
    this._commandWindow.setHandler('buy', this.commandBuy.bind(this, currencyName));
    this._commandWindow.setHandler('sell', this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
  } else {
    oldSceneMapPrototypeCreateCommandWindowMethod.call(this);
  }
};

var oldSceneShopPrototypeCommandBuy = Scene_Shop.prototype.commandBuy;
Scene_Shop.prototype.commandBuy = function (currencyName) {
  if (currencyName !== undefined) {
    this._dummyWindow.hide();
    this.activateBuyWindow(currencyName);
  } else {
    oldSceneShopPrototypeCommandBuy.call(this);
  }
};

var oldSceneShopProtottypeActivateBuyWindowMethod = Scene_Shop.prototype.activateBuyWindow;
Scene_Shop.prototype.activateBuyWindow = function (currencyName) {
  if (currencyName !== undefined) {
    this._buyWindow.setMoney(this.money(currencyName));
    this._buyWindow.show();
    this._buyWindow.activate();
    this._statusWindow.show();
  } else {
    oldSceneShopProtottypeActivateBuyWindowMethod.call(this);
  }
};

var oldSceneShopPrototypeCreateBuyWindow = Scene_Shop.prototype.createBuyWindow;
Scene_Shop.prototype.createBuyWindow = function (currencyName) {
  if (currencyName !== undefined) {
    var wy = this._dummyWindow.y;
    var wh = this._dummyWindow.height;
    this._buyWindow = new Window_ShopBuy(0, wy, wh, this._goods, currencyName);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler('ok', this.onBuyOk.bind(this, currencyName));
    this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
  } else {
    oldSceneShopPrototypeCreateBuyWindow.call(this);
  }
};

var oldSceneShopPrototypeCreateSellWindow = Scene_Shop.prototype.createSellWindow;
Scene_Shop.prototype.createSellWindow = function (currencyName) {
  if (currencyName !== undefined) {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._sellWindow = new Window_ShopSell(0, wy, Graphics.boxWidth, wh);
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.hide();
    this._sellWindow.setHandler('ok', this.onSellOk.bind(this, currencyName));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this._categoryWindow.setItemWindow(this._sellWindow);
    this.addWindow(this._sellWindow);
  } else {
    oldSceneShopPrototypeCreateSellWindow.call(this);
  }
};

var oldSceneShopPrototypeCreateNumberWindow = Scene_Shop.prototype.createNumberWindow;
Scene_Shop.prototype.createNumberWindow = function (currencyName) {
  if (currencyName !== undefined) {
    var wy = this._dummyWindow.y;
    var wh = this._dummyWindow.height;
    this._numberWindow = new Window_ShopNumber(0, wy, wh);
    this._numberWindow.hide();
    this._numberWindow.setHandler('ok', this.onNumberOk.bind(this, currencyName));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this, currencyName));
    this.addWindow(this._numberWindow);
  } else {
    oldSceneShopPrototypeCreateNumberWindow.call(this);
  }
};

var oldSceneShopPrototypeOnBuyOkMethod = Scene_Shop.prototype.onBuyOk;
Scene_Shop.prototype.onBuyOk = function (currencyName) {
  if (currencyName !== undefined) {
    this._item = this._buyWindow.item();
    this._buyWindow.hide();
    this._numberWindow.setup(this._item, this.maxBuy(currencyName), this.buyingPrice(currencyName));
    this._numberWindow.setCurrencyUnit(this.currencyUnit(currencyName), currencyName);
    this._numberWindow.show();
    this._numberWindow.activate();
  } else {
    oldSceneShopPrototypeOnBuyOkMethod.call(this);
  }
};

var oldSceneShopPrototypeOnSellOk = Scene_Shop.prototype.onSellOk;
Scene_Shop.prototype.onSellOk = function (currencyName) {
  if (currencyName !== undefined) {
    this._item = this._sellWindow.item();
    this._categoryWindow.hide();
    this._sellWindow.hide();
    this._numberWindow.setup(this._item, this.maxSell(currencyName), this.sellingPrice(), currencyName);
    this._numberWindow.setCurrencyUnit(this.currencyUnit(currencyName), currencyName);
    this._numberWindow.show();
    this._numberWindow.activate();
    this._statusWindow.setItem(this._item);
    this._statusWindow.show();
  } else {
    oldSceneShopPrototypeOnSellOk.call(this);
  }
};

var oldSceneShopPrototypeOnNumberOkMethod = Scene_Shop.prototype.onNumberOk;
Scene_Shop.prototype.onNumberOk = function (currencyName) {
  if (currencyName !== undefined) {
    SoundManager.playShop();
    switch (this._commandWindow.currentSymbol()) {
      case 'buy':
        this.doBuy(this._numberWindow.number(), currencyName);
        break;
      case 'sell':
        this.doSell(this._numberWindow.number(), currencyName);
        break;
    }
    this.endNumberInput(currencyName);
    this._curencyValueWindow.refresh();
    this._statusWindow.refresh();
  } else {
    oldSceneShopPrototypeOnNumberOkMethod.call(this);
  }
};

var oldSceneShopPrototypeOnNumberCancel = Scene_Shop.prototype.onNumberCancel;
Scene_Shop.prototype.onNumberCancel = function (currencyName) {
  if (currencyName !== undefined) {
    SoundManager.playCancel();
    this.endNumberInput(currencyName);
  } else {
    oldSceneShopPrototypeOnNumberCancel.call(this);
  }
};

var oldSceneShopPrototypeDobuyMethod = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function (number, currencyName) {
  if (currencyName !== undefined) {
    var cost = number * this.buyingPrice(currencyName, false);

    FlareCurrencies.addAmount(currencyName, -cost);
    $gameParty.gainItem(this._item, number);
  } else {
    oldSceneShopPrototypeDobuyMethod.call(this, number);
  }
};

var oldSceneShopPrototypeDoSellMethod = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function (number, currencyName) {
  if (currencyName !== undefined) {
    var cost = number * this.buyingPrice(currencyName, true);

    FlareCurrencies.addAmount(currencyName, cost);
    $gameParty.loseItem(this._item, number);
  } else {
    oldSceneShopPrototypeDoSellMethod.call(this, number);
  }
};

var oldSceneShopPrototypeEndNumberInput = Scene_Shop.prototype.endNumberInput;
Scene_Shop.prototype.endNumberInput = function (currencyName) {
  if (currencyName !== undefined) {
    this._numberWindow.hide();
    switch (this._commandWindow.currentSymbol()) {
      case 'buy':
        this.activateBuyWindow(currencyName);
        break;
      case 'sell':
        this.activateSellWindow(currencyName);
        break;
    }
  } else {
    oldSceneShopPrototypeEndNumberInput.call(this);
  }
};

var oldSceneShopPrototypeMaxbuyMethod = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function (currencyName) {
  if (currencyName !== undefined) {
    var max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
    var price = this.buyingPrice(currencyName);
    if (price > 0) {
      return Math.min(max, Math.floor(this.money(currencyName) / price));
    } else {
      return max;
    }
  } else {
    oldSceneShopPrototypeMaxbuyMethod.call(this);
  }
};

var oldSceneShopPrototypeMoneyMethod = Scene_Shop.prototype.money;
Scene_Shop.prototype.money = function (currencyName) {
  if (currencyName !== undefined) {
    return this._curencyValueWindow.value();
  } else {
    return oldSceneShopPrototypeMoneyMethod.call(this);
  }
};

var oldSceneShopPrototypeCurrencyUnitMethod = Scene_Shop.prototype.currencyUnit;
Scene_Shop.prototype.currencyUnit = function (currencyName) {
  if (currencyName !== undefined) {
    return this._curencyValueWindow.currencyIcon();
  } else {
    return oldSceneShopPrototypeCurrencyUnitMethod.call(this);
  }
};

var oldSceneShopPrototypeBuyingPrice = Scene_Shop.prototype.buyingPrice;
Scene_Shop.prototype.buyingPrice = function (currencyName, selling) {
  if (currencyName !== undefined && !selling) {
    return this._buyWindow.price(this._item, currencyName);
  } else if (currencyName !== undefined && selling) {
    return this._buyWindow.price(this._item, currencyName, selling);
  } else {
    return oldSceneShopPrototypeBuyingPrice.call(this);
  }
};

},{"../windows/shop/currency_value_window":79}],72:[function(require,module,exports){
'use strict';

var FlareCurrencyRewardWindow = require('../windows/yanfly_aftermath/flare_currency_reward_window');

// Make sure this actually exists.
if (Scene_Battle.prototype.addCustomVictorySteps) {

  var oldSceneBattleprototypeUpdateVictoryStepsMethod = Scene_Battle.prototype.updateVictorySteps;
  Scene_Battle.prototype.updateVictorySteps = function () {
    oldSceneBattleprototypeUpdateVictoryStepsMethod.call(this);
    if (this.isVictoryStep('CURRENCY')) {
      this.updateCurrencyStep();
    }
  };

  Scene_Battle.prototype.addCustomCurrenciesGainWindow = function () {
    this._victoryDropWindow.hide();
    this._yanflyAfterMathCurrencyWindowReward = new FlareCurrencyRewardWindow();
    this.addWindow(this._yanflyAfterMathCurrencyWindowReward);
    this._yanflyAfterMathCurrencyWindowReward.open();
    this._yanflyAfterMathCurrencyWindowReward.y = 72;
  };

  Scene_Battle.prototype.updateCurrencyStep = function () {
    if (!this._yanflyAfterMathCurrencyWindowReward) {
      this.addCustomCurrenciesGainWindow();
    } else if (this._yanflyAfterMathCurrencyWindowReward.isOpen()) {
      if (this.victoryTriggerContinue()) {
        this.finishVictoryCurrencies();
      }
    }
  };

  Scene_Battle.prototype.finishVictoryCurrencies = function () {
    SoundManager.playOk();
    this._yanflyAfterMathCurrencyWindowReward.close();
    this.processNextVictoryStep();
  };
}

},{"../windows/yanfly_aftermath/flare_currency_reward_window":82}],73:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var lodashFindIndex = require('../../../node_modules/lodash/array/findIndex');

/**
 * Responsible for gathering all the items related to a currency.
 *
 * All items have a belongsToCurrency field on them, we check the currency
 * that the user wants to create a shop for and gather all the items
 * for that shop.
 */

var CurrencyShop = (function () {
  function CurrencyShop() {
    _classCallCheck(this, CurrencyShop);

    this._goods = [];
  }

  /**
   * Open the shop window.
   *
   * Populate with items based off currency name.
   *
   * @param string currency
   * @param boolean purchaseOnly
   */

  _createClass(CurrencyShop, [{
    key: 'openShopWindow',
    value: function openShopWindow(currency, purchaseOnly) {
      _currencyShopInfo.currency_name = currency;
      this._createShopGoods(currency);
      SceneManager.push(Scene_Shop);
      SceneManager.prepareNextScene(this._goods, purchaseOnly);
    }

    /**
     * Creates the actual goods for the shop based off curency name.
     *
     * @param string currency
     */
  }, {
    key: '_createShopGoods',
    value: function _createShopGoods(currency) {
      var itemsArray = $dataItems;
      var weaponsArray = $dataWeapons;
      var armorsArray = $dataArmors;

      this.processItemsArray(itemsArray, currency);
      this.processWeaponsArray(weaponsArray, currency);
      this.processArmorsArray(armorsArray, currency);
    }

    /**
     * Stores items in a goods array.
     *
     * @param array itemsArray
     * @param string currency
     */
  }, {
    key: 'processItemsArray',
    value: function processItemsArray(itemsArray, currency) {
      for (var i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i] !== null && itemsArray[i].belongsToCurrency === currency) {

          if (i <= 2000) {
            var item = [0, itemsArray[i].id];
          }

          var found = lodashFindIndex(this._goods, function (goodsItem) {
            goodsItem.join(',') === item.join(',');
          });

          if (found === -1) {
            this._goods.push(item);
          }
        }
      }
    }

    /**
     * Stores weapons in a goods array.
     *
     * @param array weaponsArray
     * @param string currency
     */
  }, {
    key: 'processWeaponsArray',
    value: function processWeaponsArray(weaponsArray, currency) {
      for (var i = 0; i < weaponsArray.length; i++) {
        if (weaponsArray[i] !== null && weaponsArray[i].belongsToCurrency === currency) {

          if (i <= 2000) {
            var weapon = [1, weaponsArray[i].id];

            var found = lodashFindIndex(this._goods, function (goodsItem) {
              return goodsItem.join(',') === weapon.join(',');
            });

            if (found === -1) {
              this._goods.push(weapon);
            }
          }
        }
      }
    }

    /**
     * Stores armos in a goods array.
     *
     * @param array armorsArray
     * @param string currency
     */
  }, {
    key: 'processArmorsArray',
    value: function processArmorsArray(armorArray, currency) {
      for (var i = 0; i < armorArray.length; i++) {
        if (armorArray[i] !== null && armorArray[i].belongsToCurrency === currency) {

          if (i <= 2000) {
            var armor = [2, armorArray[i].id];
          }

          var found = lodashFindIndex(this._goods, function (goodsItem) {
            return goodsItem.join(',') === armor.join(',');
          });

          if (found === -1) {
            this._goods.push(armor);
          }
        }
      }
    }
  }]);

  return CurrencyShop;
})();

module.exports = CurrencyShop;

// private global method for storing currency currency shop info
window._currencyShopInfo = { currency_name: null };

},{"../../../node_modules/lodash/array/findIndex":1}],74:[function(require,module,exports){
'use strict';

var lodashClone = require('../../../node_modules/lodash/lang/clone');

var oldBattleManagerDisplayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function () {
  oldBattleManagerDisplayRewards.call(this);
  this.displayRewardForCurrencies();
};

BattleManager.displayRewardForCurrencies = function () {
  var self = this;
  $gameTroop.troop().members.forEach(function (member) {
    self._parseEnemyMemberCurrencies(member);
  });
};

BattleManager._parseEnemyMemberCurrencies = function (member) {
  var self = this;
  $dataEnemies.forEach(function (enemy) {
    if (enemy !== null && enemy.id === member.enemyId && enemy.enemyCurrencyRewardData.length > 0) {
      self._gainCurrencyMessage(enemy);
    }
  });
};

BattleManager._gainCurrencyMessage = function (enemy) {

  var self = this;
  var baseY = 0;
  var data = lodashClone(enemy.enemyCurrencyRewardData);

  enemy.gainCurrencyOnBattleWin.forEach(function (gainCurrency) {
    if (gainCurrency.doWeGainCurrency && Array.isArray(data) && data.length > 0 && gainCurrency.currency_name === data[0].name) {
      $gameMessage.add('\\c[8]You Gained: \\c[0]' + data[0].amount + ' of: ' + data[0].name);
      data.shift();
    }
  });
};

var oldBattleManagerGainRewardsMethod = BattleManager.gainRewards;
BattleManager.gainRewards = function () {
  oldBattleManagerGainRewardsMethod.call(this);
  this.gainCurrencies();
};

BattleManager.gainCurrencies = function () {
  var self = this;
  $gameTroop.troop().members.forEach(function (enenemyObject) {
    self._parseEnemyObject(enenemyObject);
  });
};

BattleManager._parseEnemyObject = function (enemyObjectFromTroop) {
  var self = this;
  $dataEnemies.forEach(function (enemy) {
    if (enemy !== null && enemy.id === enemyObjectFromTroop.enemyId && enemy.enemyCurrencyRewardData.length > 0) {
      self._getCurrenciesAndRewardThem(enemy);
    }
  });
};

BattleManager._getCurrenciesAndRewardThem = function (enemy) {
  var self = this;
  var baseY = 0;
  var data = lodashClone(enemy.enemyCurrencyRewardData);

  enemy.gainCurrencyOnBattleWin.forEach(function (gainCurrency) {
    if (gainCurrency.doWeGainCurrency && Array.isArray(data) && data.length > 0 && gainCurrency.currency_name === data[0].name) {
      window.FlareCurrencies.addAmount(data[0].name, data[0].amount);
      data.shift();
    }
  });
};

},{"../../../node_modules/lodash/lang/clone":51}],75:[function(require,module,exports){
'use strict';

var RewardCurrenciesCheck = require('./reward_currencies_check');
var GatherItemsForShop = require('./gather_items');

var olderDataManagerIsDataBaseLoadedMethod = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
  if (!olderDataManagerIsDataBaseLoadedMethod.call(this)) {
    return false;
  }

  // process Note tags
  this.flareProcessEnemyNoteTags($dataEnemies);

  // Set up rewards for enemies.
  var rewardCurrenciesCheck = new RewardCurrenciesCheck();
  rewardCurrenciesCheck.createCheckObject();

  // Set up the currency shops
  new GatherItemsForShop();

  return true;
};

var oldDataManagerMakeSaveContentsMethod = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
  var contents = oldDataManagerMakeSaveContentsMethod.call(this);
  contents.currencies = window.flareCurrency.getCurrencyStore();

  return contents;
};

var oldDataManagerExtractSaveContentMethod = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
  oldDataManagerExtractSaveContentMethod.call(this, contents);
  window.flareCurrency.setStoreFromLoad(contents.currencies);
};

/**
 * Process the enemy note tag looking for currency information.
 *
 * Currency tags can have name, how much and percentage of drop.
 * percentage is optional. Default is 100.
 *
 * @param $dataEnemies enemies
 */
DataManager.flareProcessEnemyNoteTags = function (enemies) {
  var noteTag = /<currency:\s*([^,>]+),\s*([^,>]+)(,\s*([^,>]+))?>/i;

  for (var i = 1; i < enemies.length; i++) {
    var enemy = enemies[i];
    var enemyNoteData = enemy.note.split(/[\r\n]+/);

    enemy.enemyCurrencyRewardData = [];
    this._processEnemyNoteDataForCurrencyReward(enemy, enemyNoteData, noteTag);
  }
};

/**
 * Private Method. Process Enemy Currency Note Data.
 *
 * Pushes the enemy currency reward data object to an array of the same type.
 * enemies can have multiple currencies attached to them.
 *
 * @param Object enemy
 * @param Array enemyNoteData
 * @param regex noteTag
 */
DataManager._processEnemyNoteDataForCurrencyReward = function (enemy, enemyNoteData, noteTag) {
  for (var n = 0; n < enemyNoteData.length; n++) {
    var line = enemyNoteData[n];

    if (line.match(noteTag)) {
      var lineMatched = line.match(noteTag);

      enemy.enemyCurrencyRewardData.push(this._createCurrencyRewardObject(lineMatched));
    }
  }
};

/**
 * Private Method. Creates the actual object.
 *
 * Creates a currency reward object that contains name, amount and percentage of either 100 or the
 * third number that the user placed in the tag.
 *
 * @param Array lineMatched
 */
DataManager._createCurrencyRewardObject = function (lineMatched) {
  if (lineMatched[4] !== undefined) {
    return { name: lineMatched[1], amount: parseInt(lineMatched[2]), percentage: parseInt(lineMatched[4]) };
  } else {
    return { name: lineMatched[1], amount: parseInt(lineMatched[2]), percentage: 100 };
  }
};

},{"./gather_items":76,"./reward_currencies_check":77}],76:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var extractAllOfType = require('rmmv-mrp-core/option-parser').extractAllOfType;
var lodashFind = require('../../../node_modules/lodash/collection/find');
var lodashIsUndefined = require('../../../node_modules/lodash/lang/isUndefined');

/**
 * Creates objects for the currency shop.
 *
 * Creates weapons, armor and items for the currency shop that match
 * the tags in the note boxes.
 */

var GatherItems = (function () {

  /**
   * Calls each method that creates an object for said methods.
   */

  function GatherItems() {
    _classCallCheck(this, GatherItems);

    this.processItems();
    this.processWeapons();
    this.processArmors();
  }

  /**
   * Pushes an item object on to the item array.
   */

  _createClass(GatherItems, [{
    key: 'processItems',
    value: function processItems() {
      var items = $dataItems;

      for (var i = 0; i < items.length; i++) {
        if (items[i] !== null) {
          items[i].currencyCost = 0;
          items[i].belongsToCurrency = null;

          var itemNoteBoxInfo = extractAllOfType(items[i].note, 'currencyShop');
          var noteBoxObjectInfo = itemNoteBoxInfo[0];

          if (!lodashIsUndefined(noteBoxObjectInfo)) {
            items[i].currencyCost = noteBoxObjectInfo.andCosts;
            items[i].belongsToCurrency = noteBoxObjectInfo.belongsTo;
          }
        }
      }
    }

    /**
     * Pushes an weapon object on to the weapon array.
     */
  }, {
    key: 'processWeapons',
    value: function processWeapons() {
      var weapons = $dataWeapons;

      for (var i = 0; i < weapons.length; i++) {
        if (weapons[i] !== null) {
          weapons[i].currencyCost = 0;
          weapons[i].belongsToCurrency = null;

          var weaponNoteBoxInfo = extractAllOfType(weapons[i].note, 'currencyShop');
          var noteBoxObjectInfo = weaponNoteBoxInfo[0];

          if (!lodashIsUndefined(noteBoxObjectInfo)) {
            weapons[i].currencyCost = noteBoxObjectInfo.andCosts;
            weapons[i].belongsToCurrency = noteBoxObjectInfo.belongsTo;
          }
        }
      }
    }

    /**
     * Pushes an armor object on to the armor array.
     */
  }, {
    key: 'processArmors',
    value: function processArmors() {
      var armors = $dataArmors;

      for (var i = 0; i < armors.length; i++) {
        if (armors[i] !== null) {
          armors[i].currencyCost = 0;
          armors[i].belongsToCurrency = null;

          var armorsNoteBoxInfo = extractAllOfType(armors[i].note, 'currencyShop');
          var noteBoxObjectInfo = armorsNoteBoxInfo[0];

          if (!lodashIsUndefined(noteBoxObjectInfo)) {
            armors[i].currencyCost = noteBoxObjectInfo.andCosts;
            armors[i].belongsToCurrency = noteBoxObjectInfo.belongsTo;
          }
        }
      }
    }
  }]);

  return GatherItems;
})();

module.exports = GatherItems;

},{"../../../node_modules/lodash/collection/find":3,"../../../node_modules/lodash/lang/isUndefined":58,"rmmv-mrp-core/option-parser":64}],77:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FlareRandomNumber = require('../../flare_random_number');

/**
 * Determine if the playr gets currencies.
 *
 * Currency tags can have a percentage attribute set. If it is set then
 * we go ahead check if they will be successful to gain the currency AFTER
 * a battle.
 */

var RewardCurrenciesCheck = (function () {
  function RewardCurrenciesCheck() {
    _classCallCheck(this, RewardCurrenciesCheck);
  }

  /**
   * Creates Currency Ceck Object.
   *
   * Assigns a new array to a enemy object. This array contains
   * x number of objects. Each object contains a currency name and
   * do we gain currency check which is either true or false.
   */

  _createClass(RewardCurrenciesCheck, [{
    key: 'createCheckObject',
    value: function createCheckObject() {

      for (var i = 0; i < $dataEnemies.length; i++) {
        var enemy = $dataEnemies[i];

        if (enemy !== null) {
          enemy.gainCurrencyOnBattleWin = [];
          this._processEnemyCurrencyReward(enemy, enemy.enemyCurrencyRewardData);
        }
      }
    }

    /**
     * Private method. Create enemy check object.
     *
     * Assigns the gain currency check object to the array of objects
     * this allows for an enemy to have multiple currencies with different
     * percentages.
     *
     * @param Object enemy
     * @param Array enemyCurrencyReward
     */
  }, {
    key: '_processEnemyCurrencyReward',
    value: function _processEnemyCurrencyReward(enemy, enemyCurrencyReward) {
      var self = this;

      enemyCurrencyReward.map(function (currencyObject) {
        if (typeof currencyObject === 'object') {
          enemy.gainCurrencyOnBattleWin.push({
            currency_name: currencyObject.name,
            doWeGainCurrency: self._processPercentage(currencyObject)
          });
        }
      });
    }

    /**
     * Private method. check percentage.
     *
     * When no percentage is given it is set to 100, default truth.
     * when percentage is given we subtract it from 100, then random a number
     * between 0 an 100 and compare the result to the "toGetAbove" varaible.
     *
     * Example: 100 - 85 = 15, random number is 16, 16 > 15 = true.
     *
     * In the above example case the user would be rewarded the currency.
     *
     * @param Object CurrencyObject
     * @return bool
     */
  }, {
    key: '_processPercentage',
    value: function _processPercentage(currencyObject) {
      if (currencyObject.percentage !== 100) {
        var toGetAbove = 100 - currencyObject.percentage;
        var randomNumber = FlareRandomNumber.minMax(0, 100);

        if (randomNumber > toGetAbove) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    }
  }]);

  return RewardCurrenciesCheck;
})();

module.exports = RewardCurrenciesCheck;

},{"../../flare_random_number":85}],78:[function(require,module,exports){
/**
 * @namespace FlareCurrency
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Currency = require('../currencies/currency');
var FlareWindowBase = require('../../flare_window_base');

/**
 * Create the currency window.
 *
 * Create a window that is the size of the entire game box.
 * This window displays all the currencies a party has.
 *
 * Currencies not stored here is gold.
 */

var FlareCurrencyWindow = (function (_FlareWindowBase) {
  _inherits(FlareCurrencyWindow, _FlareWindowBase);

  function FlareCurrencyWindow() {
    _classCallCheck(this, FlareCurrencyWindow);

    _get(Object.getPrototypeOf(FlareCurrencyWindow.prototype), 'constructor', this).call(this);
    this.initialize();
    this.refresh();
  }

  _createClass(FlareCurrencyWindow, [{
    key: 'initialize',
    value: function initialize() {
      _get(Object.getPrototypeOf(FlareCurrencyWindow.prototype), 'initialize', this).call(this, this.tryAndCenter(), this.tryAndCenter() - 190, this.windowWidth(), this.windowHeight());
    }
  }, {
    key: 'tryAndCenter',
    value: function tryAndCenter() {
      return Graphics.boxWidth / 2 / 2;
    }
  }, {
    key: 'windowWidth',
    value: function windowWidth() {
      return Graphics.boxWidth / 2;
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

      this.drawText('Currencies', 10, 10, 100, 'center');

      var currencies = window.flareCurrency.getCurrencyStore();

      this.drawFlareCurrencies(currencies);
      this.resetFontSettings();
    }
  }, {
    key: 'drawFlareCurrencies',
    value: function drawFlareCurrencies(currencies) {
      var baseYForText = 70; // the y variable for drawText and drawIcon.
      this.contents.fontSize = 20;

      var self = this;
      currencies.map(function (currency) {
        if (typeof currency === 'object') {

          self.drawIcon(currency.icon, 10, baseYForText);
          self.flareDrawTextEx(currency.name, 60, baseYForText - 10);
          self.flareDrawTextEx(currency.description, 60, baseYForText + 15);
          self.flareDrawTextEx('Currently Have: ' + currency.amount, 60, baseYForText + 42, 250, 'left');

          baseYForText += 100;
        }
      });
    }
  }]);

  return FlareCurrencyWindow;
})(FlareWindowBase);

module.exports = FlareCurrencyWindow;

},{"../../flare_window_base":86,"../currencies/currency":66}],79:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lodashFind = require('../../../../node_modules/lodash/collection/find');

/**
 * Creates a currency window for the currency shop
 */

var CurrencyValueWindow = (function (_Window_Base) {
  _inherits(CurrencyValueWindow, _Window_Base);

  function CurrencyValueWindow(currencyName) {
    _classCallCheck(this, CurrencyValueWindow);

    _get(Object.getPrototypeOf(CurrencyValueWindow.prototype), 'constructor', this).call(this, currencyName);
    this.initialize(currencyName);
  }

  _createClass(CurrencyValueWindow, [{
    key: 'initialize',
    value: function initialize(currencyName) {

      _get(Object.getPrototypeOf(CurrencyValueWindow.prototype), 'initialize', this).call(this, 0, 108, 204, 72);
      this._currencyObject = this.setCurrencyObject(currencyName);
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var x = this.textPadding();
      var width = this.contents.width - this.textPadding() * 2;
      this.contents.clear();
      this.drawCurrencyInfo(this.value(), this.currencyIcon(), x, 0, width);
    }
  }, {
    key: 'value',
    value: function value() {
      return this._currencyObject.amount;
    }
  }, {
    key: 'currencyIcon',
    value: function currencyIcon() {
      return this._currencyObject.icon;
    }
  }, {
    key: 'setCurrencyObject',
    value: function setCurrencyObject(currencyName) {
      var foundCurrency = lodashFind(flareCurrency.getCurrencyStore(), function (currencyObject) {
        if (currencyObject.name.indexOf(currencyName) !== -1 || currencyName.indexOf(currencyObject.name) !== -1) {
          return currencyObject;
        }
      });

      if (foundCurrency === undefined) {
        throw new Error('We failed to find any currency by the name of: ' + currencyName);
      }

      return foundCurrency;
    }
  }, {
    key: 'drawCurrencyInfo',
    value: function drawCurrencyInfo(value, unit, x, y, width) {
      var unitWidth = Math.min(80, this.textWidth(unit));
      this.resetTextColor();
      this.drawText(value, x, y, width - unitWidth - 6, 'left');
      this.changeTextColor(this.systemColor());
      this.drawIcon(unit, x + width - unitWidth, y);
    }
  }]);

  return CurrencyValueWindow;
})(Window_Base);

module.exports = CurrencyValueWindow;

},{"../../../../node_modules/lodash/collection/find":3}],80:[function(require,module,exports){
"use strict";

Window_ShopBuy.prototype.initialize = function (x, y, height, shopGoods, currencyName) {
  var width = this.windowWidth();
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._shopGoods = shopGoods;
  this._money = 0;
  this._currencyName = currencyName || null;
  this.refresh();
  this.select(0);
};

var oldWindowShopBuyPrototypePrice = Window_ShopBuy.prototype.price;
Window_ShopBuy.prototype.price = function (item, curencyName, selling) {
  if (curencyName !== null && !selling) {
    return this._price[this._data.indexOf(item)] || 0;
  } else if (curencyName !== null && selling) {
    return item.currencyCost || 0;
  } else {
    return oldWindowShopBuyPrototypePrice.call(this, item);
  }
};

var oldWindowShopBuyPrototypeMakeItemList = Window_ShopBuy.prototype.makeItemList;
Window_ShopBuy.prototype.makeItemList = function () {
  if (this._currencyName !== null) {
    this._data = [];
    this._price = [];
    this._shopGoods.forEach(function (goods) {
      var item = null;
      switch (goods[0]) {
        case 0:
          item = $dataItems[goods[1]];
          break;
        case 1:
          item = $dataWeapons[goods[1]];
          break;
        case 2:
          item = $dataArmors[goods[1]];
          break;
      }
      if (item) {
        this._data.push(item);
        this._price.push(item.currencyCost);
      }
    }, this);
  } else {
    oldWindowShopBuyPrototypeMakeItemList.call(this);
  }
};

},{}],81:[function(require,module,exports){
'use strict';

var oldWindowShopNumberPrototTypeSetCurrencyUnit = Window_ShopNumber.prototype.setCurrencyUnit;
Window_ShopNumber.prototype.setCurrencyUnit = function (currencyUnit, currencyName) {
    this._currencyName = currencyName;
    oldWindowShopNumberPrototTypeSetCurrencyUnit.call(this, currencyUnit);
};

var oldWindowShopNumberPrototTypeDrawTotalPrice = Window_ShopNumber.prototype.drawTotalPrice;
Window_ShopNumber.prototype.drawTotalPrice = function () {
    if (this._currencyName !== undefined) {
        var total = this._price * this._number;
        var width = this.contentsWidth() - this.textPadding();
        this.drawCurrencyInfo(total, this._currencyUnit, 0, this.priceY(), width);
    } else {
        oldWindowShopNumberPrototTypeDrawTotalPrice.call(this);
    }
};

Window_ShopNumber.prototype.drawCurrencyInfo = function (value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, 'right');
    this.changeTextColor(this.systemColor());
    this.drawIcon(unit, x + width - unitWidth, y);
};

},{}],82:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lodashClone = require('../../../../node_modules/lodash/lang/clone');

/**
 * Creates the Flare Currencie Reward window for Yanfly Aftermath.
 */

var FlareCurrencyRewardWindow = (function (_Window_Base) {
  _inherits(FlareCurrencyRewardWindow, _Window_Base);

  function FlareCurrencyRewardWindow() {
    _classCallCheck(this, FlareCurrencyRewardWindow);

    _get(Object.getPrototypeOf(FlareCurrencyRewardWindow.prototype), "constructor", this).call(this);
  }

  _createClass(FlareCurrencyRewardWindow, [{
    key: "initialize",
    value: function initialize() {
      var width = this.windowWidth();
      var height = this.windowHeight();
      Window_Base.prototype.initialize.call(this, 0, 0, width, height);
      this.refresh();
      this.openness = 0;
    }
  }, {
    key: "windowWidth",
    value: function windowWidth() {
      return Graphics.boxWidth;
    }
  }, {
    key: "windowHeight",
    value: function windowHeight() {
      return Graphics.boxHeight - 72;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.contents.clear();
      this.drawCurrencyRewardData();
    }
  }, {
    key: "drawCurrencyRewardData",
    value: function drawCurrencyRewardData() {
      var self = this;
      $gameTroop.troop().members.forEach(function (enenemyObject) {
        self._parseEnemyObject(enenemyObject);
      });
    }
  }, {
    key: "_parseEnemyObject",
    value: function _parseEnemyObject(enemyObject) {
      var self = this;
      $dataEnemies.forEach(function (enemy) {
        if (enemy !== null && enemy.id === enemyObject.enemyId && enemy.enemyCurrencyRewardData.length > 0) {
          self._getCurrenciesAndRewardThem(enemy);
        }
      });
    }
  }, {
    key: "_getCurrenciesAndRewardThem",
    value: function _getCurrenciesAndRewardThem(enemy) {
      var self = this;
      var baseY = 0;
      var data = lodashClone(enemy.enemyCurrencyRewardData);

      enemy.gainCurrencyOnBattleWin.forEach(function (gainCurrency) {
        if (gainCurrency.doWeGainCurrency && Array.isArray(data) && data.length > 0 && gainCurrency.currency_name === data[0].name) {
          self.drawText("You gained: " + data[0].amount + ", of: " + data[0].name, 0, baseY, 500, 'left');
          data.shift();
          baseY += 45;
        }
      });
    }
  }]);

  return FlareCurrencyRewardWindow;
})(Window_Base);

module.exports = FlareCurrencyRewardWindow;

},{"../../../../node_modules/lodash/lang/clone":51}],83:[function(require,module,exports){
/**
 * @namespace FlareCollection
 */

/**
 * Custom Error Handler Class.
 *
 * Use by doing: FlareError.error('Error Text'); then do:
 * FlareError.getError() in the Scene Map initializer to throw
 * errors on the start of the game.
 *
 * This class wont be useful in classes that subclass core RPG Maker
 * classes because the error handler there knows how to catch errors
 * and deal with them.
 *
 * So when would you use this? In classes that dont extend any of the
 * core RPG Maker classes.
 *
 * Alias the Scene_Map initialize method, check if the getError()
 * returns undefined or not, if not, throw a new Error with the value of
 * getError()
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlareError = (function () {
  function FlareError() {
    _classCallCheck(this, FlareError);
  }

  _createClass(FlareError, null, [{
    key: "error",

    /**
     * Use this to set a new error message.
     *
     * @param String message
     */
    value: function error(message) {
      this._error = message;
    }

    /**
     * Get the error message.
     *
     * @return undefined or string
     */
  }, {
    key: "getError",
    value: function getError() {
      return this._error;
    }
  }]);

  return FlareError;
})();

module.exports = FlareError;

},{}],84:[function(require,module,exports){
/**
 * @namespace FlareCollection
 */

/**
 * Interace based class.
 *
 * Contains methods to be over ridden by sub classing.
 * Contains methods to do with the core game scene.
 *
 * Flare Screen is to be subclassed and the methods to be implemented
 * based on the API documentation provided below.
 *
 * @namespace FlareCollection
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlareMenuSceneHandlerInterface = (function () {
  function FlareMenuSceneHandlerInterface() {
    _classCallCheck(this, FlareMenuSceneHandlerInterface);
  }

  /**
   * This method allows you to create menu handlers.
   *
   * You can use this method to create your own menu items for the
   * core game menu.
   */

  _createClass(FlareMenuSceneHandlerInterface, [{
    key: "menuHandler",
    value: function menuHandler() {}

    /**
     * Used to add a new window command to the menu.
     */
  }, {
    key: "addCommandToGameMenu",
    value: function addCommandToGameMenu() {}
  }]);

  return FlareMenuSceneHandlerInterface;
})();

module.exports = FlareMenuSceneHandlerInterface;

},{}],85:[function(require,module,exports){
/**
 * @namespace FlareCollection
 */

/**
 * Create a ranom number
 *
 * Methods here are useful for creating random numbers.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

module.exports = FlareRandomNumber;

},{}],86:[function(require,module,exports){
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
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlareWindowBase = (function (_Window_Base) {
  _inherits(FlareWindowBase, _Window_Base);

  function FlareWindowBase(args) {
    _classCallCheck(this, FlareWindowBase);

    _get(Object.getPrototypeOf(FlareWindowBase.prototype), "constructor", this).call(this, args);
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

},{}]},{},[68,67,75,74,72,71,81,80,82]);
