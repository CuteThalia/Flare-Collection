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

},{"../internal/baseEach":5,"../internal/createFind":23}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"../utility/identity":49,"../utility/property":50,"./baseMatches":14,"./baseMatchesProperty":15,"./bindCallback":20}],5:[function(require,module,exports){
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

},{"./baseForOwn":9,"./createBaseEach":21}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./createBaseFor":22}],9:[function(require,module,exports){
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

},{"../object/keys":46,"./baseFor":8}],10:[function(require,module,exports){
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

},{"./toObject":37}],11:[function(require,module,exports){
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

},{"../lang/isObject":43,"./baseIsEqualDeep":12,"./isObjectLike":34}],12:[function(require,module,exports){
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

},{"../lang/isArray":40,"../lang/isTypedArray":44,"./equalArrays":24,"./equalByTag":25,"./equalObjects":26}],13:[function(require,module,exports){
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

},{"./baseIsEqual":11,"./toObject":37}],14:[function(require,module,exports){
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

},{"./baseIsMatch":13,"./getMatchData":28,"./toObject":37}],15:[function(require,module,exports){
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

},{"../array/last":1,"../lang/isArray":40,"./baseGet":10,"./baseIsEqual":11,"./baseSlice":18,"./isKey":32,"./isStrictComparable":35,"./toObject":37,"./toPath":38}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./baseGet":10,"./toPath":38}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"../utility/identity":49}],21:[function(require,module,exports){
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

},{"./getLength":27,"./isLength":33,"./toObject":37}],22:[function(require,module,exports){
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

},{"./toObject":37}],23:[function(require,module,exports){
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

},{"../lang/isArray":40,"./baseCallback":4,"./baseFind":6,"./baseFindIndex":7}],24:[function(require,module,exports){
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

},{"./arraySome":3}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"../object/keys":46}],27:[function(require,module,exports){
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

},{"./baseProperty":16}],28:[function(require,module,exports){
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

},{"../object/pairs":48,"./isStrictComparable":35}],29:[function(require,module,exports){
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

},{"../lang/isNative":42}],30:[function(require,module,exports){
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

},{"./getLength":27,"./isLength":33}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{"../lang/isArray":40,"./toObject":37}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"../lang/isObject":43}],36:[function(require,module,exports){
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

},{"../lang/isArguments":39,"../lang/isArray":40,"../object/keysIn":47,"./isIndex":31,"./isLength":33}],37:[function(require,module,exports){
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

},{"../lang/isObject":43}],38:[function(require,module,exports){
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

},{"../lang/isArray":40,"./baseToString":19}],39:[function(require,module,exports){
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

},{"../internal/isArrayLike":30,"../internal/isObjectLike":34}],40:[function(require,module,exports){
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

},{"../internal/getNative":29,"../internal/isLength":33,"../internal/isObjectLike":34}],41:[function(require,module,exports){
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

},{"./isObject":43}],42:[function(require,module,exports){
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

},{"../internal/isObjectLike":34,"./isFunction":41}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"../internal/isLength":33,"../internal/isObjectLike":34}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"../internal/getNative":29,"../internal/isArrayLike":30,"../internal/shimKeys":36,"../lang/isObject":43}],47:[function(require,module,exports){
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

},{"../internal/isIndex":31,"../internal/isLength":33,"../lang/isArguments":39,"../lang/isArray":40,"../lang/isObject":43}],48:[function(require,module,exports){
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

},{"../internal/toObject":37,"./keys":46}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{"../internal/baseProperty":16,"../internal/basePropertyDeep":17,"../internal/isKey":32}],51:[function(require,module,exports){
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
},{"./lexer-utils":52}],52:[function(require,module,exports){
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
},{}],53:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareCollection
 */

/**
 * Allows you to process parameters on a specific page.
 *
 * All events have a set of pages, each of those pages has a list of
 * objects and each object has a set of paramters.
 *
 * The paramters are are all gathered together in the mergeEventsPage()
 * function and then returned as a single string.
 *
 * This allows for us to parse tags in comments that lay with in a event.
 */

var EventPageHandler = (function () {

  /**
   * Set up the specific page.
   *
   * @param object eventPage
   */

  function EventPageHandler(eventPage) {
    _classCallCheck(this, EventPageHandler);

    this._eventPage = eventPage;
  }

  /**
   * Merge the event page paramters into a single sting.
   *
   * @return string
   */

  _createClass(EventPageHandler, [{
    key: 'mergeEventsPage',
    value: function mergeEventsPage() {
      var pageParamters = [];

      this._eventPage.list.forEach(function (list) {
        pageParamters.push(list.parameters);
      });

      return pageParamters.join('');
    }
  }]);

  return EventPageHandler;
})();

;

module.exports = EventPageHandler;

},{}],54:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @namespace FlareQuestSystem.
 */

/*:
 * @plugindesc Create quests for specific events
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 *
 */

/**
 * Contains public faceing data about laws on said map.
 */

var FlareQuest = function FlareQuest() {
  _classCallCheck(this, FlareQuest);
};

;

// Opens this up for the user.
window.FlareQuest = FlareQuest;

},{}],55:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _find = require('lodash/collection/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestContainer = (function () {
  function QuestContainer() {
    _classCallCheck(this, QuestContainer);
  }

  _createClass(QuestContainer, null, [{
    key: 'storeQuestinformation',
    value: function storeQuestinformation(mapId, eventID, singleQuests, questChains) {

      if ((0, _isUndefined2.default)(this._questContainer)) {
        this._questContainer = [];
      }

      this._questContainer.push({
        mapId: mapId,
        eventId: eventID,
        singleQuests: singleQuests,
        questChains: questChains
      });
    }
  }, {
    key: 'getQuestContainer',
    value: function getQuestContainer() {
      return this._questContainer;
    }
  }, {
    key: 'getQuestObjectBasedOnEventId',
    value: function getQuestObjectBasedOnEventId(id) {
      if ((0, _isUndefined2.default)(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
        return false;
      }

      var containerObject = (0, _find2.default)(this.getQuestContainer(), function (container) {
        return container.eventId === id;
      });

      if ((0, _isUndefined2.default)(containerObject)) {
        return false;
      }

      return containerObject;
    }
  }, {
    key: 'getQuestObjectBasedOnMapId',
    value: function getQuestObjectBasedOnMapId(id) {
      if ((0, _isUndefined2.default)(this.getQuestContainer()) || this.getQuestContainer().length === 0) {
        return false;
      }

      var containerObject = (0, _find2.default)(this.getQuestContainer(), function (container) {
        return container.mapId === id;
      });

      if ((0, _isUndefined2.default)(containerObject)) {
        return false;
      }

      return containerObject;
    }
  }]);

  return QuestContainer;
})();

module.exports = QuestContainer;

},{"lodash/collection/find":2,"lodash/lang/isUndefined":45}],56:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _parse_quest_text = require('./parse_quest_text');

var _parse_quest_text2 = _interopRequireDefault(_parse_quest_text);

var _quest_container = require('../container/quest_container');

var _quest_container2 = _interopRequireDefault(_quest_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateQuestObjects = (function () {
  function CreateQuestObjects(eventText, eventId) {
    _classCallCheck(this, CreateQuestObjects);

    this._parseQuestText = new _parse_quest_text2.default(eventText);

    this._masterQuestContainer = [];
    this._questChainData = [];
    this._singleQuestData = []; // Doesnt belong to a chain.

    this.createQuestObjects(eventId);
  }

  _createClass(CreateQuestObjects, [{
    key: 'createQuestObjects',
    value: function createQuestObjects(eventId) {
      // Quest Chains
      this._masterQuestContainer = this._parseQuestText.parseQuestChain();

      // If The array is > 0 add more stuff to it
      // else create it.
      if (this._masterQuestContainer.length > 0) {
        this._masterQuestContainer.push(this._parseQuestText.parseQuest());
      } else {
        this._masterQuestContainer = this._parseQuestText.parseQuest();
      }

      // Flatten the array.
      if (this._masterQuestContainer.length > 0) {
        this._masterQuestContainer = [].concat.apply([], this._masterQuestContainer);
      }

      // Store the Quest Chains
      this.processMasterQuestContainer(this._masterQuestContainer);

      // process quest chain data to add additional info to to
      // questInformation array.
      this.processQuestChainData(this._questChainData);

      // Create the container of quests.
      if (!_quest_container2.default.getQuestObjectBasedOnMapId($gameMap.mapId) && !_quest_container2.default.getQuestObjectBasedOnEventId(eventId)) {
        _quest_container2.default.storeQuestinformation($gameMap.mapId(), eventId, this._singleQuestData, this._questChainData);
      }

      console.log(_quest_container2.default.getQuestContainer());
    }
  }, {
    key: 'processMasterQuestContainer',
    value: function processMasterQuestContainer(container) {
      var self = this;

      container.forEach(function (individualQuests) {
        if (individualQuests['id'] !== undefined) {
          // Creates a single QuestChainData object and pushes it to the array.
          // the quests key array will not be mutated.
          self._questChainData.push({
            questChainId: individualQuests.id,
            quests: self._parseQuestText.parseQuest(individualQuests.block),
            status: "incomplete",
            questInformation: [] // Where the actual quest info for this chain will be stored.
          });
        } else {
            self.createSingleQuestObject(self._singleQuestData, individualQuests);
          }
      });
    }
  }, {
    key: 'processQuestChainData',
    value: function processQuestChainData(questChainData) {
      var self = this;

      for (var i = 0; i < questChainData.length; i++) {
        questChainData[i].quests.forEach(function (individualQuestData) {
          self.createSingleQuestObject(questChainData[i].questInformation, individualQuestData);
        });
      }
    }
  }, {
    key: 'createSingleQuestObject',
    value: function createSingleQuestObject(singleQuestData, individualQuest) {
      singleQuestData.push({
        questTitle: individualQuest.title,
        questLevel: individualQuest.level,
        objectives: this._parseQuestText.parseQuestObjective(individualQuest.block),
        rewardInfo: this._parseQuestText.parseQuestReward(individualQuest.block)[0],
        queststatus: "incomplete"
      });
    }
  }]);

  return CreateQuestObjects;
})();

module.exports = CreateQuestObjects;

},{"../container/quest_container":55,"./parse_quest_text":57}],57:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _optionParser = require('rmmv-mrp-core/option-parser');

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParseQuestText = (function () {
  function ParseQuestText(eventText) {
    _classCallCheck(this, ParseQuestText);

    this.eventText = eventText;
  }

  _createClass(ParseQuestText, [{
    key: 'parseQuestChain',
    value: function parseQuestChain() {
      return (0, _optionParser.extractAllOfType)(this.eventText, 'QuestChain');
    }
  }, {
    key: 'parseQuest',
    value: function parseQuest(textInsideQuestChainBlock) {
      if ((0, _isUndefined2.default)(textInsideQuestChainBlock)) {
        return (0, _optionParser.extractAllOfType)(this.eventText, 'Quest');
      } else {
        return (0, _optionParser.extractAllOfType)(textInsideQuestChainBlock, 'Quest');
      }
    }
  }, {
    key: 'parseQuestReward',
    value: function parseQuestReward(textInsideQuestBlock) {
      if ((0, _isUndefined2.default)(textInsideQuestBlock)) {
        return false;
      } else {
        return (0, _optionParser.extractAllOfType)(textInsideQuestBlock, 'questReward');
      }
    }
  }, {
    key: 'parseQuestObjective',
    value: function parseQuestObjective(textInsideQuestBlock) {
      if ((0, _isUndefined2.default)(textInsideQuestBlock)) {
        return false;
      } else {
        return (0, _optionParser.extractAllOfType)(textInsideQuestBlock, 'objective');
      }
    }
  }]);

  return ParseQuestText;
})();

module.exports = ParseQuestText;

},{"lodash/lang/isUndefined":45,"rmmv-mrp-core/option-parser":51}],58:[function(require,module,exports){
'use strict';

var _event_page_handler = require('../../lib/handler/events/pages/event_page_handler');

var _event_page_handler2 = _interopRequireDefault(_event_page_handler);

var _parse_quest_text = require('../system/handler/parse_quest_text');

var _parse_quest_text2 = _interopRequireDefault(_parse_quest_text);

var _create_quest_objects = require('../system/handler/create_quest_objects');

var _create_quest_objects2 = _interopRequireDefault(_create_quest_objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Game_Event.prototype.start = function () {
    if (this._trigger === 0) {
        var eventhandler = new _event_page_handler2.default(this.page());
        var eventText = eventhandler.mergeEventsPage();
        new _create_quest_objects2.default(eventText, this.eventId());
    }

    var list = this.list();
    if (list && list.length > 1) {
        this._starting = true;
        if (this.isTriggerIn([0, 1, 2])) {
            this.lock();
        }
    }
};

},{"../../lib/handler/events/pages/event_page_handler":53,"../system/handler/create_quest_objects":56,"../system/handler/parse_quest_text":57}]},{},[54,58]);
