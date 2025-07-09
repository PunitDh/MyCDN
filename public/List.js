"use strict";
class IndexOutOfBoundsError extends Error {}
class NoSuchElementError extends Error {}
class IllegalArgumentError extends Error {}
class NoSuchColumnError extends Error {}
var RoundingMode;
(function (RoundingMode) {
  RoundingMode[(RoundingMode["HALF_UP"] = 0)] = "HALF_UP";
  RoundingMode[(RoundingMode["HALF_DOWN"] = 1)] = "HALF_DOWN";
  RoundingMode[(RoundingMode["UP"] = 2)] = "UP";
  RoundingMode[(RoundingMode["DOWN"] = 3)] = "DOWN";
})(RoundingMode || (RoundingMode = {}));
class List extends Array {
  constructor(...args) {
    super(...args);
  }
  /**
   * Size of the list
   */
  get size() {
    return this.length;
  }
  /**
   * Returns the valid indices of the list
   */
  get indices() {
    return listFrom(Object.keys(this).map((n) => parseInt(n)));
  }
  /**
   * Returns the last valid index of the list
   */
  get lastIndex() {
    return this.length - 1;
  }
  /**
   * Returns the depth of the list
   */
  get depth() {
    function getDepth(list, depth = 0) {
      for (const item of list) {
        if (Array.isArray(item) || List.isList(item)) {
          return getDepth(item, depth + 1);
        }
      }
      return depth;
    }
    return getDepth(this);
  }
  map(callbackfn) {
    return List.from(super.map(callbackfn));
  }
  concat(...items) {
    return List.from(super.concat(...items));
  }
  filter(predicate, thisArg) {
    return List.from(super.filter(predicate, thisArg));
  }
  flatMap(callback, thisArg) {
    return List.from(super.flatMap(callback, thisArg));
  }
  slice(start, end) {
    return List.from(super.slice(start, end));
  }
  reverse() {
    return List.from(super.reverse());
  }
  /**
   * Returns the element at a particular index, or returns the optional parameter if no element is found
   * @param {Number} index
   * @returns {*}
   */
  get(index, optional) {
    const adjustedIndex = index < 0 ? this.length + index : index;
    return Object.keys(this).includes(String(adjustedIndex))
      ? this[adjustedIndex]
      : optional !== null && optional !== void 0
      ? optional
      : null;
  }
  /**
   * Checks if the list contains any of the given elements
   * @param {*} elements
   * @returns {Boolean}
   */
  contains(...elements) {
    return this.some((item) => elements.includes(item));
  }
  /**
   * Checks if a list contains all given elements
   * @param  {...any} elements
   * @returns {Boolean}
   */
  containsAll(...elements) {
    return this.includesAll(...elements);
  }
  /**
   * Creates a sub list based on the fromIndex and toIndex
   * @param {Number} fromIndex
   * @param {Number} toIndex
   * @returns {List}
   */
  subList(fromIndex, toIndex) {
    return this.slice(fromIndex, toIndex);
  }
  /**
   * Returns the first element in the list or the first element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  first(predicate) {
    return this.match(predicate, 1);
  }
  /**
   * Returns the first element in the list or the first element that matches the predicate or null
   * @param {Function} predicate
   * @returns {* | null}
   */
  firstOrNull(predicate) {
    return this.matchOrNull(predicate, 1);
  }
  /**
   * Returns the second element in the list or the first element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  second(predicate) {
    return this.match(predicate, 2);
  }
  /**
   * Returns the second element in the list or the second element that matches the predicate or null
   * @param {Function} predicate
   * @returns {*}
   */
  secondOrNull(predicate) {
    return this.matchOrNull(predicate, 2);
  }
  /**
   * Returns the third element in the list or the third element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  third(predicate) {
    return this.match(predicate, 3);
  }
  /**
   * Returns the third element in the list or the third element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  thirdOrNull(predicate) {
    return this.matchOrNull(predicate, 3);
  }
  /**
   * Returns the fourth element in the list or the fourth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  fourth(predicate) {
    return this.match(predicate, 4);
  }
  /**
   * Returns the fourth element in the list or the fourth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  fourthOrNull(predicate) {
    return this.matchOrNull(predicate, 4);
  }
  /**
   * Returns the fifth element in the list or the fifth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  fifth(predicate) {
    return this.match(predicate, 5);
  }
  /**
   * Returns the fifth element in the list or the fifth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  fifthOrNull(predicate) {
    return this.matchOrNull(predicate, 5);
  }
  /**
   * Returns the sixth element in the list or the sixth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  sixth(predicate) {
    return this.match(predicate, 6);
  }
  /**
   * Returns the sixth element in the list or the sixth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  sixthOrNull(predicate) {
    return this.matchOrNull(predicate, 6);
  }
  /**
   * Returns the seventh element in the list or the seventh element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  seventh(predicate) {
    return this.match(predicate, 7);
  }
  /**
   * Returns the seventh element in the list or the seventh element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  seventhOrNull(predicate) {
    return this.matchOrNull(predicate, 7);
  }
  /**
   * Returns the eighth element in the list or the eighth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  eighth(predicate) {
    return this.match(predicate, 8);
  }
  /**
   * Returns the eighth element in the list or the eighth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  eighthOrNull(predicate) {
    return this.matchOrNull(predicate, 8);
  }
  /**
   * Returns the ninth element in the list or the ninth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  ninth(predicate) {
    return this.match(predicate, 9);
  }
  /**
   * Returns the ninth element in the list or the ninth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  ninthOrNull(predicate) {
    return this.matchOrNull(predicate, 9);
  }
  /**
   * Returns the tenth element in the list or the tenth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  tenth(predicate) {
    return this.match(predicate, 10);
  }
  /**
   * Returns the tenth element in the list or the tenth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  tenthOrNull(predicate) {
    return this.matchOrNull(predicate, 10);
  }
  /**
   * Returns the hundredth element in the list or the hundredth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  hundredth(predicate) {
    return this.match(predicate, 100);
  }
  /**
   * Returns the hundredth element in the list or the hundredth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  hundredthOrNull(predicate) {
    return this.matchOrNull(predicate, 100);
  }
  /**
   * Returns the last element in the list or the last element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  last(predicate) {
    return this.reversed().first(predicate);
  }
  /**
   * Returns the last element in the list or the last element that matches the predicate
   * @returns {*}
   */
  lastOrNull(predicate) {
    return this.reversed().firstOrNull(predicate);
  }
  /**
   * Returns the nth element in the list or the nth element that matches the predicate
   * @param {Function} predicate
   * @param {Number} nth
   * @returns {*}
   */
  match(predicate, nth = 1) {
    if (predicate) {
      let count = 0;
      for (const [idx, item] of this.entries()) {
        if (isMatch(predicate, item, idx, this)) {
          if (count === nth - 1) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementError(`No such element`);
    } else {
      return this[nth - 1];
    }
  }
  /**
   * Returns the nth element in the list or the nth element that matches the predicate
   * @param {Function} predicate
   * @param {Number} nth
   * @returns {*}
   */
  matchOrNull(predicate, nth = 1) {
    if (predicate) {
      let count = 0;
      for (const [idx, item] of this.entries()) {
        if (isMatch(predicate, item, idx, this)) {
          if (count === nth - 1) {
            return item;
          } else {
            count++;
          }
        }
      }
      return null;
    } else {
      return this[nth - 1];
    }
  }
  /**
   * Given a list of lists, returns the first element of each list as a list
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).firstOfEach() ==> ['a','d','x']
   */
  firstOfEach() {
    return this.nthOfEach(0);
  }
  /**
   * Given a list of lists, returns the last element of each list as a list
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).lastOfEach() ==> ['c','f','z']
   */
  lastOfEach() {
    return this.map((list) => {
      if (List.isList(list) || Array.isArray(list)) {
        return list[list.length - 1];
      }
    });
  }
  /**
   * Given a list of lists, returns the nth element of each list as a list
   * @param {Number} n
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).nthOfEach(1) ==> ['b','e','y']
   */
  nthOfEach(n) {
    return this.map((list) => list[n]);
  }
  /**
   * Given a list of strings, joins each string with the given separator, prefix and postfix
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {String}
   */
  joinWith(separator, prefix = "", postfix = "") {
    return `${prefix}${this.join(separator)}${postfix}`;
  }
  /**
   * Given a list of list of strings, joins each string with the given separator, prefix and postfix
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).joinEach("-", "<", ">") ==> ['<a-b-c>','<d-e-f>','<x-y-z>']
   */
  joinEach(separator, prefix = "", postfix = "") {
    return this.map((list) =>
      listFrom(list).joinWith(separator, prefix, postfix)
    );
  }
  /**
   * Given a list of strings, splits each element with the given separator
   * @param {String} separators
   * @returns {List}
   * @example listOf("Foo:Bar", "Baz:Test").splitEach(":") ==> [['Foo','Bar'],['Baz','Test']]
   */
  splitEach(...separators) {
    const pattern = separators.join("|");
    const regex = new RegExp(pattern, "gi");
    return this.map((list) => listFrom(list.split(regex)));
  }
  /**
   * Trims whitespace from each element in the list
   * @returns {List}
   * @example listOf("   foo", "  bar   ").trimEach() ==> ['foo','bar']
   */
  trimEach() {
    return this.map((element) => element.trim());
  }
  /**
   * Returns the first non-null value of the elements of this
   * collection in iteration order, or throws NoSuchElementException if no non-null value was produced.
   * By default, it ignores undefined values, but this behaviour can be turned off by setting the
   * ignoreUndefined flag to false
   * @param {boolean} ignoreUndefined
   * @returns {List}
   */
  firstNotNull(ignoreUndefined = true) {
    for (const it of this) {
      if (ignoreUndefined ? it != null : it !== null) return it;
    }
    const error = `No such element`;
    throw new NoSuchElementError(error);
  }
  /**
   * Returns the first non-null value produced by transform function being applied to elements of this
   * collection in iteration order, or throws NoSuchElementException if no non-null value was produced.
   * @param {Function} transform
   * @returns {List}
   */
  firstNotNullOf(transform) {
    for (const it of this) {
      if (it && transform(it)) {
        return transform(it);
      }
    }
    const error = `No such element`;
    throw new NoSuchElementError(error);
  }
  /**
   * Returns the first non-null value produced by transform function being applied to elements of
   * this collection in iteration order, or null if no non-null value was produced.
   * @param {Function} transform
   * @returns {List}
   */
  firstNotNullOfOrNull(transform) {
    for (const it of this) {
      if (it && transform(it) != null) {
        return transform(it);
      }
    }
    return null;
  }
  /**
   * Halves the list into two and returns the two parts.
   * If the list contains an odd number of elements, the middle element is added to the second list.
   * To control this behaviour, set param keepMiddle to false
   * @param {Boolean} keepMiddle
   * @returns {List}
   * @example listOf("foo", "bar", "baz").halve() ==> [['foo'], ['bar','baz']]
   * @example listOf("foo", "bar", "baz").halve(false) ==> [['foo','bar'], ['baz']]
   */
  halve(keepMiddle = true) {
    const middleIndex = keepMiddle
      ? Math.ceil(this.length / 2)
      : Math.floor(this.length / 2);
    const firstHalf = this.slice(0, middleIndex);
    const secondHalf = this.slice(middleIndex, this.length);
    return listOf(firstHalf, secondHalf);
  }
  /**
   * Returns the first half of the list
   * @param {Boolean} keepMiddle - controls whether the middle element of the list should be included in this list
   * @returns {List}
   * @example listOf("foo", "bar", "baz").firstHalf() ==> ['foo']
   * @example listOf("foo", "bar", "baz").firstHalf(false) ==> ['foo','bar']
   */
  firstHalf(keepMiddle = true) {
    const list = this.halve(keepMiddle);
    if (!List.isNoSuchElement(list)) {
      return this.halve(keepMiddle).first();
    }
    throw new NoSuchElementError();
  }
  /**
   * Returns the second half of the list
   * @param {Boolean} keepMiddle - controls whether the middle element of the list should be included in this list
   * @returns {List}
   * @example listOf("foo", "bar", "baz").secondHalf() ==> ['baz']
   * @example listOf("foo", "bar", "baz").secondHalf(false) ==> ['bar','baz']
   */
  secondHalf(keepMiddle = false) {
    return this.halve(keepMiddle).last();
  }
  /**
   * Returns the second half of the list
   * @param {Boolean} keepMiddle - controls whether the middle element of the list should be included in this list
   * @returns {List}
   */
  lastHalf(keepMiddle = false) {
    return this.secondHalf(keepMiddle);
  }
  /**
   * Returns a list containing all elements except first n elements
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,5,6,7).drop(3) ==> [6,7]
   */
  drop(n) {
    return this.slice(n);
  }
  /**
   * Returns a list containing all elements except last n elements
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,5,6,7).drop(3) ==> [3,4,5]
   */
  dropLast(n) {
    return this.slice(0, this.length - n);
  }
  /**
   * Returns a list containing first n elements.
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,5,6,7).take(3) ==> [3,4,5]
   */
  take(n) {
    return this.head(n);
  }
  /**
   * Returns a list containing last n elements.
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,5,6,7).takeLast(3) ==> [5,6,7]
   */
  takeLast(n) {
    return this.tail(n);
  }
  /**
   * Returns a list containing first elements satisfying the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  takeWhile(predicate) {
    const filtered = listOf();
    let found = false;
    for (const [idx, item] of this.entries()) {
      if (predicate(item, idx, this)) {
        filtered.push(item);
        found = true;
      } else {
        if (!found) {
          continue;
        } else {
          break;
        }
      }
    }
    return filtered.toList();
  }
  /**
   * Returns a list containing last elements satisfying the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  takeLastWhile(predicate) {
    const filtered = listOf();
    let found = false;
    const reversed = this.reversed();
    for (const [idx, item] of reversed.entries()) {
      if (predicate(item, idx, reversed)) {
        filtered.push(item);
        found = true;
      } else {
        if (!found) {
          continue;
        } else {
          break;
        }
      }
    }
    return filtered.reversed();
  }
  /**
   * Returns a list containing all elements except first elements
   * that satisfy the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  dropWhile(predicate) {
    let dropped = false;
    const droppedList = listOf();
    for (const [idx, it] of this.entries()) {
      if (predicate(it, idx, this) && !dropped) {
        continue;
      }
      dropped = true;
      droppedList.push(it);
    }
    return droppedList;
  }
  /**
   * Returns a list containing all elements except last
   * elements that satisfy the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  dropLastWhile(predicate) {
    let dropped = false;
    const droppedList = listOf();
    const list = this.reversed();
    for (const [idx, it] of list.entries()) {
      if (predicate(it, idx, list) && !dropped) {
        continue;
      }
      dropped = true;
      droppedList.unshift(it);
    }
    return droppedList;
  }
  /**
   * Returns an element at the given index or throws an IndexOutOfBoundsException if the index is out of bounds of this list.
   * @param {Number} index
   * @returns {*}
   */
  elementAt(index) {
    const adjustedIndex = index < 0 ? this.length + index : index;
    if (this[adjustedIndex] !== undefined) return this[adjustedIndex];
    const error = `Index out of bounds: ${index}`;
    throw new IndexOutOfBoundsError(error);
  }
  /**
   * Returns an element at the given index or the result of calling the defaultValue function if the index is out of bounds of this list.
   * @param {Number} index
   * @param {Function} defaultValue
   * @returns {*}
   */
  elementAtOrElse(index, defaultValue) {
    const adjustedIndex = index < 0 ? this.length + index : index;
    return this[adjustedIndex] !== undefined
      ? this[adjustedIndex]
      : isFunction(defaultValue)
      ? defaultValue()
      : defaultValue;
  }
  /**
   * Returns an element at the given index or null if the index is out of bounds of this list.
   * @param {Number} index
   * @returns {*}
   */
  elementAtOrNull(index) {
    const adjustedIndex = index < 0 ? this.length + index : index;
    return this[adjustedIndex] !== undefined ? this[adjustedIndex] : null;
  }
  /**
   * If the list is empty, return the defaultValue. Or else return the list.
   * @param {*} value
   */
  ifEmpty(value) {
    return this.isEmpty() ? (isFunction(value) ? value() : value) : this;
  }
  /**
   * If the list is not empty, return the defaultValue. Or else return the list.
   * @param {*} value
   */
  ifNotEmpty(value) {
    return this.isNotEmpty() ? (isFunction(value) ? value(this) : value) : this;
  }
  /**
   * Adds the element to the list and returns the list. Mutates the original list.
   * @param {any} elements
   * @returns {List}
   * @example listOf(3,4,8,7).add(6,7) ==> [3,4,8,7,6,7]
   */
  add(...elements) {
    for (const element of elements) {
      this.push(element);
    }
    return this;
  }
  /**
   * Deletes any given number of elements from a list. Mutates the original list.
   * @param {*} elements
   * @returns {List}
   */
  delete(...elements) {
    for (const element of elements) {
      for (let i = this.length; i >= 0; i--) {
        if (deepEquals(this[i], element)) {
          this.splice(i, 1);
        }
      }
    }
    return this;
  }
  /**
   * Returns the original list with the new elements added. Does not mutate the original list.
   * @param  {...any} elements
   * @returns {List}
   */
  plus(...elements) {
    return this.concat(elements);
  }
  /**
   * Clears all elements from the list. Mutates the original list.
   * @returns {List}
   */
  clear() {
    while (this.length) {
      this.pop();
    }
    return this;
  }
  /**
   * Returns a list containing all elements that are instances of specified type parameter .
   * @param {Class} clazz
   * @returns {List}
   */
  filterIsInstance(clazz) {
    if (!clazz.name) return this;
    return this.filter(
      (item) =>
        item instanceof clazz || typeof item === clazz.name.toLowerCase()
    );
  }
  /**
   * Appends all elements that are instances of specified type parameter to the given destination.
   * @param {List} destination
   * @param {Class} clazz
   * @returns {List}
   */
  filterIsInstanceTo(destination, clazz) {
    const filtered = this.filter((item) => item instanceof clazz);
    return listFrom(destination.concat(filtered));
  }
  /**
   * Returns a list containing all elements not matching the given predicate.
   * @param {Function} predicate
   * @returns {List}
   * @example listOf(3,4,5,6,7).filterNot(x => x > 5) ==> [3,4,5]
   */
  filterNot(predicate) {
    return this.filter(
      (item, index, array) => !isMatch(predicate, item, index, array)
    );
  }
  /**
   * Filters out all the elements in the list that are not null. Keeps undefined values.
   * @returns {List}
   * @example listOf(3,4,5,null,7,undefined).filterNotNull() ==> [3,4,5,7,undefined]
   */
  filterNotNull() {
    return this.filter((value) => value !== null);
  }
  /**
   * Filters out all the elements in the list that are not null or undefined.
   * @returns {List}
   * @example listOf(3,4,5,null,7,undefined).filterNotNull() ==> [3,4,5,7,undefined]
   */
  filterNotNullish() {
    return this.filter((value) => value != null);
  }
  /**
   * Filters out the first null element, but keeps the rest
   * @returns {List}
   */
  filterFirstNotNull() {
    let filtered = false;
    let filteredList = listOf();
    for (const it of this) {
      if (it == null && !filtered) {
        filtered = true;
        continue;
      }
      filteredList.push(it);
    }
    return filteredList;
  }
  /**
   * Filters out all values that are truthy. Value of '0' is truthy be default
   * @param {Boolean} zeroTruthy - controls whether the value '0' should be treated as truthy or not
   * @returns {List}
   * @example listOf(3,4,null,7,undefined,0,8).filterTruthy() ==> [3,4,7,0,8]
   * @example listOf(3,4,null,7,undefined,0,8).filterTruthy(false) ==> [3,4,7,8]
   */
  filterTruthy(zeroTruthy = true) {
    return this.filter((it) =>
      zeroTruthy ? it === 0 || Boolean(it) : Boolean(it)
    );
  }
  /**
   * Only returns values that are falsy
   * @param {Boolean} zeroTruthy - controls whether the value '0' should be treated as truthy or not
   * @returns {List}
   * @example listOf(3,4,null,7,undefined,0,8).filterFalsy() ==> [null, undefined]
   * @example listOf(3,4,null,7,undefined,0,8).filterFalsy(false) ==> [null, undefined,0]
   */
  filterFalsy(zeroTruthy = false) {
    return this.filter((it) =>
      zeroTruthy ? it !== 0 && !Boolean(it) : !Boolean(it)
    );
  }
  /**
   * Appends all elements that are not null to the given destination.
   * @param {List} destination
   * @returns {List}
   */
  filterNotNullTo(destination) {
    const filtered = this.filterNotNull();
    return listFrom(destination.concat(filtered));
  }
  /**
   * Filters out all the elements in the list that are not undefined. Keeps null values.
   * @returns {List}
   * @example listOf(3,4,5,null,7,undefined).filterNotUndefined() ==> [3,4,5,null,7]
   */
  filterNotUndefined() {
    return this.filter((value) => value !== undefined);
  }
  /**
   * Appends all elements matching the given predicate to the given destination.
   * @param {List} destination
   * @param {Function} predicate
   * @returns {List}
   */
  filterTo(destination, predicate) {
    const filtered = this.filter(predicate);
    return listFrom(destination.concat(filtered));
  }
  /**
   * Appends all elements not matching the given predicate to the given destination.
   * @param {List} destination
   * @param {Function} predicate
   * @returns {List}
   */
  filterNotTo(destination, predicate) {
    const filtered = this.filterNot(predicate);
    return listFrom(destination.concat(filtered));
  }
  /**
   * Flattens the list by a given depth
   * @param {Number} depth
   * @returns {List}
   */
  flatten(depth = Infinity) {
    return listFrom(this.flat(depth));
  }
  /**
   * Removes the list from all falsy values, including 0, undefined, null and empty strings
   * @returns {List}
   * @example listOf(1,4,null,undefined,0,8, "", "test", "foo", false, true).compact() ==> [1,4,8,'test','foo',true]
   */
  compact() {
    return this.filter(Boolean).filter((it) => it !== "");
  }
  /**
   * Same as reduce, but throws an error if an initial value is not specified
   * @param {Function} callback
   * @param {*} initialValue
   * @returns {*}
   */
  fold(callback, initialValue) {
    if (!initialValue && initialValue !== 0) {
      throw new IllegalArgumentError(`Initial value must be specified`);
    }
    return this.reduce(callback, initialValue);
  }
  /**
   * Same as reduce, but throws an error if an initial value is not specified
   * @param {Function} callback
   * @param {*} initialValue
   * @returns {*}
   */
  foldRight(callback, initialValue) {
    if (!initialValue && initialValue !== 0) {
      throw new IllegalArgumentError(`Initial value must be specified`);
    }
    return this.reduceRight(callback, initialValue);
  }
  /**
   * Inserts an element at a particular index
   * @param {number} index
   * @param {T} value
   * @returns {List<T>}
   */
  insertAt(index, value) {
    this.splice(index, 0, value);
    return this;
  }
  /**
   * Deletes the element at a particular index
   * @param {number} index
   * @param {T} value
   * @returns {List<T>}
   */
  deleteAt(index) {
    this.splice(index, 1);
    return this;
  }
  /**
   * Performs reduce operation each list in the list
   * @param {Function} callback
   * @param {*} initialValue
   * @returns {*}
   */
  reduceEach(callback, initialValue) {
    const result = listOf();
    for (const list of this) {
      result.push(list.reduce(callback, initialValue));
    }
    return result;
  }
  /**
   * Same as a string join, but with a prefix and a postfix
   * @param {Array<T>} list
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {String}
   */
  joinTo(list, separator, prefix = "", postfix = "") {
    if (!Array.isArray(list)) {
      const message = `Argument 'list' must be a type of Array or List. Found: ${typeof list}`;
      throw new IllegalArgumentError(message);
    }
    return listFrom(list).add(`${prefix}${this.join(separator)}${postfix}`);
  }
  /**
   * Performs an async await operation on a list and returns the resultant list.
   * Note: The result must be awaited, i.e. The 'await' keyword must be used before it
   * @param {Function} callback
   * @returns {List}
   */
  async mapAsync(callback) {
    let result = listOf();
    for (const [idx, item] of this.entries()) {
      const promise = await callback(item, idx, this);
      result.push(promise);
    }
    return result;
  }
  /**
   * Performs an async await operation on a list
   * @param {Function} callback
   */
  async forEachAsync(callback) {
    const promises = [];
    for (const [idx, item] of this.entries()) {
      promises.push(callback(item, idx, this));
    }
    await Promise.all(promises);
  }
  /**
   * Performs the given action on each element and returns the list itself afterwards.
   * @param {Function} callback
   * @returns {List}
   */
  onEach(callback) {
    this.forEach(callback);
    return this;
  }
  /**
   * Takes in a number of arguments and excludes them from the list. Does not modify original list.
   * @returns {List}
   * @example listOf('z','a','d','b','e','c','f').exclude('a','b','c') ==> ['z','d','e','f']
   */
  exclude(...elements) {
    return this.filter((item) => !elements.includes(item));
  }
  /**
   * Returns the distinct elements in a list
   * @returns {List}
   * @example listOf('a','a','b','b','e','e','f').distinct() ==> ['a','b','e','f']
   */
  distinct() {
    return this.unique();
  }
  /**
   * Returns a list containing only elements from the given collection having distinct keys returned by the given selector function.
   * @param {Function} keySelector
   * @returns {List}
   */
  distinctBy(keySelector) {
    const distinctList = listOf();
    for (const it of this) {
      const notInList = !distinctList.find(
        (item) => keySelector(it) == keySelector(item)
      );
      if (notInList) {
        distinctList.push(it);
      }
    }
    return distinctList;
  }
  /**
   * Returns the unique elements in a list as a Set object
   * @returns {List}
   * @example listOf('a','a','b','b','e','e','f').distinct() ==> Set {'a','b','e','f'}
   */
  unique() {
    return this.removeDuplicates();
  }
  /**
   * Converts all elements in the list to upper case
   * @returns {List<String>}
   * @example listOf('apple','banana','carrot').toUpperCase() ==> ['APPLE','BANANA','CARROT']
   */
  toUpperCase() {
    return this.map((arg) => arg.toUpperCase());
  }
  /**
   * Capitalizes the first letter of each word in the list
   * @returns {List<String>}
   */
  capitalize() {
    return this.map((arg) => str(arg).capitalize());
  }
  /**
   * Converts all elements in the list to lower case
   * @returns {List<String>}
   * @example listOf('Apple','Banana','CARROT').toLowerCase() ==> ['apple','banana','carrot']
   */
  toLowerCase() {
    return this.map((arg) => arg.toLowerCase());
  }
  /**
   * Returns the sum of all elements in a list
   * @returns {Number}
   * @example listOf(1,2,3,4).sum() ==> 10
   */
  sum(initialValue = 0, maxDecimalPlaces = -1) {
    return this.reduce((acc, cur) => +acc + cur, initialValue);
  }
  /**
   * Returns the sum of all elements in a list given a selector function
   * @returns {Number}
   * @example listOf({ item: 'apple', price: 2 }, { item: 'banana', price: 5 }).sumOf(it => it.price) ==> 7
   */
  sumOf(selector, initialValue = 0) {
    if (isFunction(selector)) return this.map(selector).sum(initialValue);
    if (isKey(selector))
      return this.reduce((a, c) => +a + c[selector], initialValue);
    return null;
  }
  /**
   * Returns the multiplication product of all elements in a list
   * @returns {Number}
   */
  product(initialValue = 1) {
    return this.reduce((acc, cur) => acc * cur, initialValue);
  }
  /**
   * Returns the multiplication product of all elements in a list given a selector function
   * @returns {Number}
   */
  productOf(selector, initialValue = 1) {
    if (isFunction(selector)) return this.map(selector).product(initialValue);
    if (isKey(selector))
      return this.reduce((a, c) => +a * c[selector], initialValue);
    return null;
  }
  /**
   * Checks whether a list is empty
   * @returns {Boolean}
   */
  isEmpty() {
    return this.length === 0;
  }
  /**
   * Checks whether a list is empty
   * @returns {Boolean}
   */
  isNotEmpty() {
    return this.length > 0;
  }
  /**
   * Splits a list down into smaller chunks specified by the size
   * @param {Number} size
   * @returns {List<List>}
   */
  chunked(size) {
    const chunkedList = listOf();
    for (let i = 0; i < this.length; i += Math.abs(size)) {
      chunkedList.push(this.slice(i, i + Math.abs(size)));
    }
    return chunkedList;
  }
  /**
   * Splits a list down into a number of smaller lists all of equal size, as specified by parts
   * @param {Number} parts
   * @returns {List<List>}
   */
  segment(parts) {
    const size = Math.ceil(this.length / parts);
    return this.chunked(size);
  }
  /**
   * Returns true if the list includes all the specified elements, else returns false
   * @param  {...any} elements
   * @returns {Boolean}
   */
  includesAll(...elements) {
    for (const value of elements) {
      if (!this.includes(value)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Finds all the elements that exist in both lists
   * @param {List} list
   * @returns {List}
   */
  intersect(list) {
    return this.intersection(list);
  }
  /**
   * Finds all the elements that exist in all lists
   * @param {List} list
   * @returns {List}
   */
  intersection(list) {
    return List.from(new Set(this.filter((item) => list.includes(item))));
  }
  /**
   * Returns the ordered difference between two lists
   * @param {List} list
   * @returns {List<Difference>}
   */
  orderedDifference(list) {
    if (!list || !(list instanceof Array)) return null;
    const diff = listOf();
    const maxLength = List.longestFirst(this, listFrom(list)).length;
    for (let index = 0; index < maxLength; index++) {
      if (this[index] !== list[index]) {
        diff.push({ index, this: this[index], other: list[index] });
      }
    }
    return diff;
  }
  /**
   * Finds all the elements that do not exist in both lists
   * @param {List} list
   * @returns {List}
   */
  difference(list) {
    if (!list || !(list instanceof Array)) return null;
    const diff = listOf();
    const concatenated = this.concat(list).counts();
    for (const [key, value] of concatenated.entries()) {
      if (value === 1) {
        diff.push(key);
      }
    }
    return diff;
  }
  /**
   * Returns a set containing all distinct elements from both collections.
   * @param {List} list
   * @returns {List}
   */
  union(list) {
    return List.from(new Set([...this, ...list]));
  }
  /**
   * Returns the number of elements matching a given predicate.
   * If the predicate is a function, runs the function.
   * If the predicate is a value, counts the number of values.
   * If no predicate is provided, returns the length of the list.
   * @param {Function | *} predicate
   * @returns {Number}
   */
  count(predicate) {
    if (predicate) {
      let count = 0;
      this.forEach((item, index) => {
        const match = isFunction(predicate)
          ? predicate(item, index)
          : deepEquals(item, predicate);
        if (match) {
          count++;
        }
      });
      return count;
    } else {
      return this.length;
    }
  }
  /**
   * Returns the largest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @returns {number}
   */
  maxOf(selector) {
    if (isFunction(selector)) return this.map(selector).max();
    if (isKey(selector)) return this.map((it) => it[selector]).max();
    return 0;
  }
  /**
   * Returns the first element yielding the largest value of the given selector function.
   * @param {Function} selector
   * @param {Boolean} findAll
   * @returns {*}
   */
  maxBy(selector, findAll = false) {
    if (isFunction(selector)) {
      const max = this.map(selector).max();
      return findAll
        ? this.filter((it) => selector(it) === max)
        : this.find((it) => selector(it) === max);
    }
    if (isKey(selector)) {
      const max = this.map((it) => it[selector]).max();
      return findAll
        ? this.filter((it) => it[selector] === max)
        : this.find((it) => it[selector] === max);
    }
    return undefined;
  }
  /**
   * Returns the smallest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @returns {Number}
   */
  minOf(selector) {
    if (isFunction(selector)) return this.map(selector).min();
    if (isKey(selector)) return this.map((it) => it[selector]).min();
    return null;
  }
  /**
   * Returns the smallest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @param {Boolean} findAll
   * @returns {Number}
   */
  minBy(selector, findAll = false) {
    if (isFunction(selector)) {
      const min = this.map(selector).min();
      return findAll
        ? this.filter((it) => selector(it) === min)
        : this.find((it) => selector(it) === min);
    }
    if (isKey(selector)) {
      const min = this.map((it) => it[selector]).min();
      return findAll
        ? this.filter((it) => it[selector] === min)
        : this.find((it) => it[selector] === min);
    }
    return undefined;
  }
  /**
   * Finds the max number in the arguments provided
   * @this {List<Number>}
   * @returns {Number}
   */
  max() {
    return Math.max(...this);
  }
  /**
   * Finds the min number in the arguments provided
   * @this {List<Number>}
   * @returns {Number}
   */
  min() {
    return Math.min(...this);
  }
  /**
   * Returns a list containing the min and the max value of the numbers in the list
   * @returns {List}
   */
  minmax() {
    return { min: this.min(), max: this.max() };
  }
  /**
   * Returns an `Object` containing the smallest and largest values among all values produced by `selector` function applied to each element in the collection.
   * @param {Function} selector
   * @returns {Object}
   */
  minmaxOf(selector) {
    return { min: this.minOf(selector), max: this.maxOf(selector) };
  }
  /**
   * Returns the first element yielding the smallest value of the given function.
   * If `findAll` is set `true`, returns all the elements that yield the smallest value.
   * @param {Function} selector
   * @param {Boolean} findAll
   * @returns {Object}
   */
  minmaxBy(selector, findAll = false) {
    const min = this.minBy(selector, findAll);
    const max = this.maxBy(selector, findAll);
    if (!max || !min) return null;
    return {
      min,
      max,
    };
  }
  /**
   * Clamps all values within the list between min and max
   * @param {number} min
   * @param {number} max
   * @returns {List<number>}
   */
  clamp(min, max) {
    return this.map((number) => Math.min(Math.max(min, number), max));
  }
  /**
   * Returns the nth largest element in the list.
   * If distinct is set to true, only returns the nth largest of the distinct numbers.
   * @param {Number} n
   * @param {Boolean} distinct - false by default
   * @returns {Number}
   */
  nthLargest(n, distinct = false) {
    let list = this.sortNumbersDescending();
    if (distinct) {
      list = list.distinct();
    }
    return n < 0 ? list[list.length + n] : list[n - 1];
  }
  /**
   * Returns the nth largest element in the list created by applying the selector function.
   * @param {Number} n
   * @returns {Number}
   */
  nthLargestOf(selector, n) {
    if (isFunction(selector)) {
      const list = this.distinct().sort((a, b) => selector(b) - selector(a));
      return n < 0 ? list[list.length + n] : list[n - 1];
    }
    if (isKey(selector)) {
      const list = this.distinct().sort((a, b) => b[selector] - a[selector]);
      return n < 0 ? list[list.length + n] : list[n - 1];
    }
    return null;
  }
  /**
   * Returns the nth smallest element in the list.
   * @param {Number} n
   * @returns {Number}
   */
  nthSmallest(n, distinct = false) {
    let list = this.sortNumbers();
    if (distinct) {
      list = list.distinct();
    }
    return n < 0 ? list[list.length + n] : list[n - 1];
  }
  /**
   * Returns the nth smallest element in the list created by applying the selector function.
   * @param {Number} n
   * @returns {Number}
   */
  nthSmallestOf(selector, n) {
    if (isFunction(selector)) {
      const list = this.distinct().sort((a, b) => selector(a) - selector(b));
      return n < 0 ? list[list.length + n] : list[n - 1];
    }
    if (isKey(selector)) {
      const list = this.distinct().sort((a, b) => a[selector] - b[selector]);
      return n < 0 ? list[list.length + n] : list[n - 1];
    }
    return null;
  }
  /**
   * Returns a list with all the specified elements excluded
   * @param  {...any} elements
   * @returns {List}
   */
  minus(...elements) {
    return this.exclude(...elements);
  }
  /**
   * Returns a list containing successive accumulation values generated by applying
   * operation from left to right to each element and current accumulator value that
   * starts with initial value.
   * @param {*} initialValue
   * @param {Function} operation
   * @returns {List}
   */
  scan(operation, initialValue) {
    const accumulated = listOf();
    const finalValue = this.reduce((acc, cur, index, list) => {
      const operated = operation(acc, cur, index, list);
      accumulated.push(acc);
      return operated;
    }, initialValue);
    return accumulated.add(finalValue);
  }
  /**
   * Returns the single element matching the given predicate, or
   * throws exception if there is no or more than one matching element.
   * @param {Function} predicate
   * @returns {*}
   */
  single(predicate) {
    const filtered = this.filter(predicate);
    if (filtered.length !== 1) {
      const error = `No single element matches the given predicate Found: (${filtered.length})`;
      throw new NoSuchElementError(error);
    }
    return filtered.first();
  }
  /**
   * Returns the single element matching the given predicate, or
   * null if element was not found or more than one element was found.
   * @param {Function} predicate
   * @returns {List}
   */
  singleOrNull(predicate) {
    const found = this.filter(predicate);
    if (found.length !== 1) {
      return null;
    }
    return found.firstOrNull();
  }
  /**
   * Rounds all the numbers in the list to the nearest integer
   * @param {Number} nearest
   * @this {List<Number>}
   * @returns {List<Number>}
   */
  round(nearest = 0, roundingMode = RoundingMode.HALF_UP) {
    const factor = 10 ** nearest;
    const resultList = this.map((num) => {
      let result;
      switch (roundingMode) {
        case RoundingMode.HALF_UP:
          result =
            (Math.sign(num) * Math.round(Math.abs(num) * factor)) / factor;
          break;
        case RoundingMode.HALF_DOWN:
          result =
            (Math.sign(num) * Math.floor(Math.abs(num) * factor + 0.5)) /
            factor;
          break;
        case RoundingMode.UP:
          result = Math.ceil(num * factor) / factor;
          break;
        case RoundingMode.DOWN:
          result = Math.floor(num * factor) / factor;
          break;
        default:
          result = Math.round(num * factor) / factor;
      }
      return result;
    });
    return resultList;
  }
  /**
   * Rounds all the numbers up in the arguments provided
   * @this {List<Number>}
   * @returns {List<Number>}
   */
  ceil(nearest = 1) {
    return this.map((number) => Math.ceil(number / nearest) * nearest);
  }
  /**
   * Rounds all the numbers down in the arguments provided
   * @this {List<Number>}
   * @returns {List<Number>}
   */
  floor(nearest = 1) {
    return this.map((number) => Math.floor(number / nearest) * nearest);
  }
  /**
   * Returns whether none of the items match the given predicate
   * @param {Function} predicate
   * @returns {Boolean}
   */
  none(predicate) {
    if (predicate) {
      for (const [idx, item] of this.entries()) {
        if (isMatch(predicate, item, idx, this)) {
          return false;
        }
      }
      return true;
    } else {
      return this.length === 0;
    }
  }
  /**
   * Finds all the duplicate elements within the list
   * @param {Boolean} indices - controls whether to only return the indicies
   * @returns {List}
   */
  findDuplicates(indices = false) {
    const lones = listOf();
    const duplicates = listOf();
    const indicesList = listOf();
    for (const [idx, item] of this.entries()) {
      let foundDuplicate = false;
      for (const lone of lones) {
        if (deepEquals(lone, item)) {
          foundDuplicate = true;
          break;
        }
      }
      if (foundDuplicate) {
        if (!duplicates.some((duplicate) => deepEquals(duplicate, item))) {
          duplicates.add(item);
        }
        indices && indicesList.add(idx);
      } else {
        lones.add(item);
      }
    }
    return indices ? indicesList : duplicates;
  }
  /**
   * Removes all the duplicate elements within the list
   * @returns {List}
   */
  removeDuplicates() {
    const lones = listOf();
    for (const item of this) {
      let foundDuplicate = false;
      for (const lone of lones) {
        if (deepEquals(lone, item)) {
          foundDuplicate = true;
          break;
        }
      }
      if (!foundDuplicate) {
        lones.add(item);
      }
    }
    return lones;
  }
  /**
   * Returns every index of the occurence of the element
   * @param {*} element
   * @returns {List}
   */
  indicesOf(element) {
    const indices = listOf();
    for (let i = 0; i < this.length; i++) {
      if (deepEquals(this[i], element)) {
        indices.push(i);
      }
    }
    return indices;
  }
  /**
   * Returns a randomly chosen element within the list
   * @returns {*}
   */
  random() {
    const index = Math.floor(Math.random() * this.length);
    return this[index];
  }
  /**
   * Returns a randomly chosen sample of elements within the list
   * @param {Number} sampleSize
   * @param {Boolean} allowRepeats
   * @returns {List}
   */
  sample(sampleSize, allowRepeats = true) {
    const sample = listOf();
    if (allowRepeats) {
      while (sample.length < sampleSize) {
        const index = Math.floor(Math.random() * this.length);
        sample.push(this[index]);
      }
    } else {
      if (sampleSize > this.length) {
        const error = `Sample size '${sampleSize}' cannot be greater than list length '${this.length}'`;
        throw new IllegalArgumentError(error);
      }
      const duplicateList = this.slice();
      while (sample.length < sampleSize) {
        const index = Math.floor(Math.random() * duplicateList.length);
        const elem = duplicateList[index];
        duplicateList.splice(index, 1);
        sample.push(elem);
      }
    }
    return sample;
  }
  /**
   * Returns a new list with its original elements randomly shuffled
   * @returns {List}
   */
  shuffled() {
    return this.sort(() => Math.random() - 0.5);
  }
  /**
   * Casts each item in the list to its boolean value
   * @returns {List<Boolean>}
   */
  toBoolean() {
    return this.map(Boolean);
  }
  /**
   * Checks whether all the elements in the list matches a given element
   * @param {Function} predicate
   * @param {*} thisArg
   * @returns {Boolean}
   */
  all(predicate, thisArg = undefined) {
    return this.every(predicate, thisArg);
  }
  /**
   * Checks whether any of the elements in the list matches a given element
   * @param {Function} predicate
   * @param {*} thisArg
   * @returns {Boolean}
   */
  any(predicate, thisArg = undefined) {
    return this.some(predicate, thisArg);
  }
  /**
   * Groups the items in a unique key-value pair based on the key selector
   * @param {Function} keySelector
   * @returns {Object}
   * @example
   */
  groupBy(keySelector) {
    const grouped = {};
    if (isFunction(keySelector)) {
      const distinctProperties = List.from(new Set(this.map(keySelector)));
      distinctProperties.forEach((property) => {
        grouped[property] = this.filter(
          (item) => keySelector(item) === property
        );
      });
    } else if (isKey(keySelector)) {
      const distinctProperties = List.from(
        new Set(this.map((it) => it[keySelector]))
      );
      distinctProperties.forEach((property) => {
        grouped[property] = this.filter(
          (item) => item[keySelector] === property
        );
      });
    }
    return grouped;
  }
  /**
   * Groups the items in a unique key-value pair based on the key selector
   * @param {Object} destination
   * @param {Function} keySelector
   * @returns {Object}
   * @example
   */
  groupByTo(destination, keySelector) {
    const grouped = this.groupBy(keySelector);
    for (const key of Object.keys(grouped)) {
      if (destination.hasOwnProperty(key)) {
        destination[key] = listFrom([...destination[key], ...grouped[key]]);
      } else {
        destination[key] = grouped[key];
      }
    }
    return destination;
  }
  /**
   * Performs a binary search on a sorted list of elements
   *
   * @param {*} element
   * @param {Number} fromIndex
   * @param {Number} toIndex
   * @returns {*}
   */
  binarySearch(element, fromIndex = 0, toIndex = this.length) {
    const halfIndex = Math.floor((toIndex - fromIndex) / 2 + fromIndex);
    if (element === this[halfIndex]) return halfIndex;
    if (Math.abs(fromIndex - toIndex) === 1) return null;
    return element < this[halfIndex]
      ? this.binarySearch(element, fromIndex, halfIndex)
      : this.binarySearch(element, halfIndex, toIndex);
  }
  /**
   * Performs a binary search on a sorted list of elements based on the keySelector
   *
   * @param {*} element
   * @param {Function} keySelector
   * @param {Number} fromIndex
   * @param {Number} toIndex
   * @returns {*}
   */
  binarySearchBy(element, keySelector, fromIndex = 0, toIndex = this.length) {
    if (Math.abs(fromIndex - toIndex) === 1) return null;
    const halfIndex = Math.floor((toIndex - fromIndex) / 2 + fromIndex);
    const keySelect = isFunction(keySelector)
      ? keySelector(this[halfIndex])
      : this[halfIndex][keySelector];
    if (deepEquals(element, keySelect)) return halfIndex;
    return element < keySelect
      ? this.binarySearchBy(element, keySelector, fromIndex, halfIndex)
      : this.binarySearchBy(element, keySelector, halfIndex, toIndex);
  }
  /**
   * Performs a map on the list and appends the result to a destination list
   * @param {List} destination
   * @param {Function} transform
   */
  mapTo(destination, transform) {
    const mapped = this.map(transform);
    return destination.concat(mapped);
  }
  /**
   * Performs a map on all elements in the list that are not null or undefined
   * @param {Function} transform
   * @returns {List}
   */
  mapNotNull(transform) {
    return this.filterNotNullish().map(transform);
  }
  /**
   * Performs a map on all elements in the list that are not null or undefined and appends it to the destination
   * @param {List} destination
   * @param {Function} transform
   * @returns {List}
   */
  mapNotNullTo(destination, transform) {
    if (!Array.isArray(destination)) {
      const error = `Parameter 'destination' must be an Array or a List`;
      throw new IllegalArgumentError(error);
    }
    let results = listOf();
    for (let it = 0; it < this.length; it++) {
      if (!isNullOrUndefined(this[it])) {
        const result = transform(this[it], it, this);
        results.push(result);
      }
    }
    return listFrom(destination.concat(results));
  }
  /**
   * Given two lists, merges them into a map
   * @param {List} other
   * @returns {Map}
   */
  mapWith(other) {
    const map = new Map();
    for (const [idx, item] of this.entries()) {
      map.set(item, other[idx]);
    }
    return map;
  }
  /**
   * Converts a list of lists to an object
   * @returns {Object}
   */
  toObject() {
    return Object.fromEntries(this);
  }
  /**
   * Converts a list of lists to a map
   * @returns {Map}
   * @example [['a',1], ['b',2], ['c',3]].toMap()
   */
  toMap() {
    const map = new Map();
    for (let i = 0; i < this.length; i++) {
      map.set(this[i][0], this[i][1]);
    }
    return map;
  }
  /**
   * Returns a list of snapshots of the window of the given size sliding along
   * this collection with the given step, where each snapshot is a list.
   * @param {Number} size
   * @param {Number} step
   * @param {Boolean} partialWindows
   * @returns {List<List<Number>>}
   */
  windowed(size, step = 1, partialWindows = false) {
    if (size < 1 || step < 1) {
      throw new IllegalArgumentError(
        `Both 'size' and 'step' must be greater than zero. Found: size ${size} step ${step}`
      );
    }
    const output = listOf();
    let [start, end] = [0, size];
    do {
      output.push(this.slice(start, end));
      start += step;
      end += step;
    } while (partialWindows ? start < this.length : end <= this.length);
    return output;
  }
  /**
   * Returns a pair of lists, where first list is built from the first values of each pair from this array,
   * second list is built from the second values of each pair from this array.
   * @returns {List}
   */
  unzip() {
    const list1 = listOf();
    const list2 = listOf();
    for (const item of this) {
      if (isPureObject(item)) {
        list1.push(Object.keys(item)[0]);
        list2.push(Object.values(item)[0]);
      } else if (Array.isArray(item)) {
        list1.push(item[0]);
        list2.push(item[1]);
      }
    }
    return listOf(list1, list2);
  }
  /**
   * Given two or more lists, returns pairs of one element in one list with
   * another element in the other list
   * @param {...List} lists
   * @returns {List}
   */
  zip(list, transform) {
    const zipped = listOf();
    for (const [idx, item] of this.entries()) {
      if (transform) {
        zipped.push(transform(item, list[idx]));
      } else {
        zipped.push(listOf(item, list[idx]));
      }
    }
    return zipped;
  }
  /**
   * Given two lists, merges them into an object
   * @param {List} other
   * @returns {Object}
   */
  pairWith(other) {
    const obj = {};
    for (let i = 0; i < Math.min(this.length, other.length); i++) {
      obj[this[i]] = other[i];
    }
    return obj;
  }
  /**
   * Splits the original collection into pair of lists, where first list
   * contains elements for which predicate yielded true, while second list
   * contains elements for which predicate yielded false.
   * @param {Function} predicate
   * @returns {List<List<any>>}
   */
  partition(predicate) {
    const listTrue = listOf();
    const listFalse = listOf();
    for (const [idx, item] of this.entries()) {
      if (isMatch(predicate, item, idx, this)) {
        listTrue.push(item);
      } else {
        listFalse.push(item);
      }
    }
    return listOf(listTrue.toList(), listFalse.toList());
  }
  /**
   * Repeats the list n times and returns the result
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,8,7).repeat(3) ==> [3,4,8,7,3,4,8,7,3,4,8,7]
   */
  repeat(n = 1) {
    const repeatedList = listOf();
    for (const _ of List.range(0, n)) {
      repeatedList.push(...this);
    }
    return repeatedList;
  }
  /**
   * Returns the reverse of the list without modifying the original
   * @returns {List}
   */
  reversed() {
    return this.slice().reverse();
  }
  /**
   * Searches for a query in the list and returns the search results as a list
   * @param {String} query
   * @returns {List}
   */
  search(query, caseSensitive = false) {
    if (caseSensitive) return this.filter((element) => element.includes(query));
    return this.filter((element) =>
      element.toLowerCase().includes(query.toLowerCase())
    );
  }
  /**
   * Returns a list of all elements sorted according to natural sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortBy(selector) {
    if (isFunction(selector)) {
      return this.sort((a, b) => (selector(a) > selector(b) ? 1 : -1));
    } else if (isKey(selector)) {
      return this.sort((a, b) => (a[selector] > b[selector] ? 1 : -1));
    } else {
      return this.sort();
    }
  }
  /**
   * Returns a list of all elements sorted according to natural sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortedBy(selector) {
    return listFrom(this).sortBy(selector);
  }
  /**
   * Returns a list of all elements sorted by descending order according to natural
   * sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortByDescending(selector) {
    return this.sortBy(selector).reverse();
  }
  /**
   * Returns a list of all elements sorted by descending order according to natural
   * sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortedByDescending(selector) {
    return listFrom(this).sortByDescending(selector);
  }
  /**
   * Sorts numbers in ascending order
   * @returns {List}
   * @example listOf(3,4,8,7).sortNumbers() ==> [3,4,7,8]
   */
  sortNumbers() {
    return this.sort((a, b) => a - b);
  }
  /**
   * Sorts numbers in descending order
   * @returns {List}
   * @example listOf(3,4,8,7).sortNumbersDescending() ==> [8,7,4,3]
   */
  sortNumbersDescending() {
    return this.sort((a, b) => b - a);
  }
  /**
   * Returns the average of the supplied list
   * @returns {Number}
   * @example listOf(1,3,5,7,9).average() ==> 5
   */
  average() {
    return this.mean();
  }
  /**
   * Returns the average of the supplied list
   * @returns {Number}
   * @example listOf(1,3,5,7,9).mean() ==> 5
   */
  mean() {
    return this.reduce((acc, cur) => +acc + cur, 0) / this.length;
  }
  /**
   * Returns the median of the supplied list
   * @returns {Number}
   * @example listOf(3,4,8,7,6).median() ==> 6
   */
  median() {
    const sorted = listFrom(this).sort((a, b) => a - b);
    if (this.length % 2 === 0) {
      const [idx1, idx2] = [sorted.length / 2 - 1, sorted.length / 2];
      return listOf(sorted[idx1], sorted[idx2]).mean();
    }
    return sorted[Math.floor(sorted.length / 2)];
  }
  /**
   * Returns the mode (most frequently occurring element) of the list
   * @returns {*}
   * @example listOf(3,4,8,8,7,6).mode() ==> 8
   */
  mode() {
    const counts = this.counts();
    const max = listOf(...counts.values()).max();
    for (const [key, value] of counts.entries()) {
      if (value === max) {
        return key;
      }
    }
    return undefined;
  }
  /**
   * Calculate the variance of a list of numbers
   * @returns {Number}
   * @example listOf(3,4,8,7,6).variance() ==> 3.44
   */
  variance() {
    const mean = this.mean();
    return (
      this.map((n) => (n - mean) ** 2).reduce((a, b) => +a + b) / this.length
    );
  }
  /**
   * Calculate the standard deviation of a list of numbers
   * @returns {Number}
   * @example listOf(3,4,8,7,6).stdev() ==> 1.8547236990991407
   */
  stdev() {
    return Math.sqrt(this.variance());
  }
  /**
   * Returns all the odd numbers in the list
   * @returns {List}
   * @example listOf(1,2,4,7,9).filterOddNumbers() ==> [1,7,9]
   */
  filterOddNumbers() {
    return this.filter((it) => it % 2 === 1);
  }
  /**
   * Returns all the even numbers in the list
   * @returns {List}
   * @example listOf(1,2,4,7,9).filterEvenNumbers() ==> [2,4]
   */
  filterEvenNumbers() {
    return this.filter((it) => it % 2 === 0);
  }
  /**
   * Returns all the prime numbers in the list
   * @returns {List}
   * @example listOf(1,3,5,7,9).filterPrimeNumbers() ==> [3,5,7]
   */
  filterPrimeNumbers() {
    return this.filter((num) => {
      for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    });
  }
  /**
   * Counts all unique occurences in the list and returns them as an object along with the count
   * @returns {Object}
   * @example listOf('apple', 'apple', 'orange', 'banana', 'banana', 'banana').counts() ==> { apple: 2, orange: 1, banana: 3 }
   */
  counts() {
    const countMap = new Map();
    for (const item of this) {
      let foundKey = false;
      for (const key of countMap.keys()) {
        if (deepEquals(key, item)) {
          countMap.set(key, countMap.get(key) + 1);
          foundKey = true;
          break;
        }
      }
      if (!foundKey) {
        countMap.set(item, 1);
      }
    }
    return countMap;
  }
  /**
   * Returns an object containing key-value pairs provided by transform function applied to each elements of the list
   * @param {Function} transform
   * @returns {Object}
   * @example listOf('apple','banana','orange').associate(fruit => fruit.toUpperCase()) ==> { apple: 'APPLE', banana: 'BANANA', orange: 'ORANGE' }
   */
  associate(transform) {
    const obj = {};
    for (const [idx, item] of this.entries()) {
      obj[this[idx]] = transform(item, idx, this);
    }
    return obj;
  }
  associateBy(keySelector) {
    const obj = {};
    for (const item of this) {
      obj[keySelector(item)] = item;
    }
    return obj;
  }
  /**
   * Returns a Map where keys are elements from the given collection and values are produced by the
   * valueSelector function applied to each element.
   * @param {Function} valueSelector
   * @returns {Map}
   */
  associateWith(valueSelector) {
    const map = new Map();
    for (const it of this) {
      map.set(it, valueSelector(it));
    }
    return map;
  }
  /**
   * Prefixes each element in the list with a specified string
   * @param {String} string
   * @returns {List<String>}
   */
  prefix(string) {
    return this.map((item) => `${string}${item}`);
  }
  /**
   * Postfixes each element in the list with a specified string
   * @param {String} string
   * @returns {List<String>}
   */
  postfix(string) {
    return this.map((item) => `${item}${string}`);
  }
  /**
   * Multiplies each element in the list with a given number
   * @param {Number} number
   * @returns {List}
   * @example listOf(3,2,1).multiplicationBy(2) ==> [6,4,2]
   */
  multiplyBy(number) {
    if (Array.isArray(number)) {
      return this.map((element, index) => element * (number[index] || 1));
    }
    return this.map((n) => n * number);
  }
  /**
   * Divides each element in the list with a given number
   * @param {Number} number
   * @returns {List}
   * @example listOf(4,8,10).divisionBy(2) ==> [2,4,5]
   */
  divideBy(number) {
    if (Array.isArray(number)) {
      return this.map((element, index) => element / (number[index] || 1));
    }
    return this.map((n) => n / number);
  }
  /**
   * Raises each element in the list to the power of a given number
   * @param {Number} number
   * @returns {List}
   * @example listOf(1,2,3).power(2) ==> [1,4,9]
   */
  power(number) {
    return this.map((n) => n ** number);
  }
  /**
   * Sets the decimal places of each number in the list
   * @param {Number} digits
   * @returns {List}
   * @example listOf(1,2,3).toFixed(2) ==> ['1.00', '2.00', '3.00']
   */
  toFixed(digits) {
    return this.map((n) => n.toFixed(digits));
  }
  /**
   * Converts a list of numbers into english
   * @returns {List}
   */
  toEnglish() {
    return this.map(Str.toEnglish);
  }
  /**
   * Replaces every occurence of an element in a list with a new value
   * @param {T} element - the element to replace
   * @param {T} newValue - the new value
   * @param {T} count - indicates how many elements to replace, default is -1 which indicates replace all
   * @returns {List}
   * @example  listOf(1,2,3,4,2).replace(2,7) ==> [1,7,3,4,7]
   * @example  listOf(1,2,3,4,2).replace(2,7,1) ==> [1,7,3,4,2]
   */
  replace(element, newValue, count = -1) {
    let replaceCount = 0;
    return this.map((item) => {
      if (deepEquals(item, element)) {
        if (replaceCount < count || count < 0) {
          replaceCount++;
          return newValue;
        }
      }
      return item;
    });
  }
  /**
   * Checks if an item exists in the list that matches the given predicate
   * @param {Function} predicate
   * @returns {Boolean}
   */
  exists(predicate) {
    for (const [idx, item] of this.entries()) {
      if (isMatch(predicate, item, idx, this)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Returns the first 'n' elements in a list
   * @param {Number} n
   * @returns {List}
   */
  head(n = 1) {
    return n > this.length ? this : this.slice(0, n);
  }
  /**
   * Returns the last 'n' elements in a list
   * @param {Number} n
   * @returns {List}
   */
  tail(n = 1) {
    return n > this.length ? this : this.slice(this.length - n, this.length);
  }
  /**
   * Returns a list containing the "types" of each element in the list
   * @param {Boolean} primitives - Controls whether the function should return primitive types or class names if they exist
   * @returns {List}
   */
  instanceTypes(primitives = false) {
    return this.map((item) =>
      isPureObject(item) && !primitives ? item.constructor.name : typeof item
    );
  }
  /**
   * Returns whether the list is a list of numbers
   * @returns {Boolean}
   */
  isNumberList() {
    return this.every((item) => Number.isFinite(item));
  }
  /**
   * Checks if the given object is a List
   * @param {*} object
   * @returns {Boolean}
   */
  static isList(object) {
    return object instanceof List;
  }
  /**
   * Creates a list from an array-like object. Creates a list from an iterable object.
   * @param {Iterable<T> | ArrayLike<T>} iterable
   * @returns {List<T>}
   */
  static from(iterable) {
    return listFrom(Array.from(iterable));
  }
  /**
   * Generates a list of random floating point numbers between 0 and 1
   * @param {Number} size - The size of the list
   * @returns {List}
   */
  static generateRandomNumbers(size = 1) {
    return listFrom(Array(size).fill(null).map(Math.random));
  }
  static isNoSuchElement(item) {
    return item instanceof NoSuchElementError;
  }
  /**
   * Generates a list of random integers between min and max
   * @param {Number} size - The size of the list
   * @param {Number} min - Min value
   * @param {Number} max - Max value
   * @returns {List}
   */
  static generateRandomIntegers(
    size = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER
  ) {
    return listFrom(
      Array(size)
        .fill(null)
        .map(() => Math.floor(Math.random() * (max - min + 1) + min))
    );
  }
  /**
   * Returns a list of the longest lists provided in the arguments
   * @param  {...List} lists
   * @returns {List<List>}
   */
  static longest(...lists) {
    let longestLength = 0;
    const longestLists = listOf();
    for (const list of lists) {
      if (list.length > longestLength) {
        longestLength = list.length;
        longestLists.clear(); // Clear the array
        longestLists.push(list);
      } else if (list.length === longestLength) {
        longestLists.push(list);
      }
    }
    return longestLists.toList();
  }
  /**
   * Returns longest first list in the provided arguments
   * @param  {...List} lists
   * @returns {List}
   */
  static longestFirst(...lists) {
    let longestList = lists[0];
    for (const list of lists) {
      if (list.length > longestList.length) {
        longestList = list;
      }
    }
    return longestList;
  }
  longest() {
    let longestElement = String(this[0]);
    for (const item of this) {
      if (String(item).length > longestElement.length) {
        longestElement = item;
      }
    }
    return longestElement;
  }
  longestFirst() {
    return List.longestFirst(...this);
  }
  longestLast() {
    return List.longestLast(...this);
  }
  /**
   * Returns a list of the longest lists provided in the arguments
   * @param  {...List} lists
   * @returns {List}
   */
  static longestLast(...lists) {
    let longestList = lists[0];
    for (const list of lists) {
      if (list.length >= longestList.length) {
        longestList = list;
      }
    }
    return longestList;
  }
  /**
   * Returns a list of the longest lists provided in the arguments
   * @param  {...List} lists
   * @returns {List<List>}
   */
  static shortest(...lists) {
    let shortestLength = lists[0].length;
    const shortestLists = listOf();
    for (const list of lists) {
      if (list.length < shortestLength) {
        shortestLength = list.length;
        shortestLists.clear(); // Clear the array
        shortestLists.push(list);
      } else if (list.length === shortestLength) {
        shortestLists.push(list);
      }
    }
    return shortestLists.toList();
  }
  /**
   * Returns longest first list in the provided arguments
   * @param  {...List} lists
   * @returns {List}
   */
  static shortestFirst(...lists) {
    let longestList = lists[0];
    for (const list of lists) {
      if (list.length > longestList.length) {
        longestList = list;
      }
    }
    return longestList;
  }
  /**
   * Returns a list of the longest lists provided in the arguments
   * @param  {...List} lists
   * @returns {List}
   */
  static shortestLast(...lists) {
    let longestList = lists[0];
    for (const list of lists) {
      if (list.length >= longestList.length) {
        longestList = list;
      }
    }
    return longestList;
  }
  /**
   * Generates a range of numbers incrementing or decrementing by step
   * @param {Number} start
   * @param {Number} end
   * @param {Number} step
   * @returns {List}
   */
  static range(start, end, step = 1) {
    if (isNaN(start) || isNaN(end) || isNaN(step)) {
      const message = `Invalid range parameters`;
      throw new IllegalArgumentError(message);
    }
    const arr = listOf();
    for (
      let i = start;
      start < end ? i < end : i > end;
      start < end ? (i += step) : (i -= step)
    ) {
      arr.push(i);
    }
    return arr.toList();
  }
  /**
   * Repeats the list a given number of times and returns the resultant list
   * @param {Function} callback
   * @param {Number} times
   * @returns {List}
   */
  static repeat(callback, times = 1) {
    return listFrom(
      Array(times)
        .fill(null)
        .map(() => (isFunction(callback) ? callback() : callback))
    );
  }
  static emptyList() {
    return listOf();
  }
  /**
   * Converts a list to an array
   * @returns {Array}
   */
  toArray() {
    return Array.from(this);
  }
  toList() {
    return listFrom(this);
  }
  /**
   * Converts the list to a Set
   * @returns {Set}
   */
  toSet() {
    return new Set(this);
  }
  toSetExtended() {
    return new SetExtended(this);
  }
  /**
   * Checks whether the list is longer than a given list
   * @param {List} list
   * @returns {Boolean}
   */
  isLongerThan(list) {
    return this.length > list.length;
  }
  /**
   * Checks whether the list is shorter than a given list
   * @param {List} list
   * @returns {Boolean}
   */
  isShorterThan(list) {
    return this.length < list.length;
  }
  /**
   * Returns true if all the specified lists are of equal lengths, else returns false
   * @param {List} lists
   * @returns {Boolean}
   */
  isEqualLengthTo(...lists) {
    return (
      listFrom(lists.map((it) => it.length))
        .add(this.length)
        .toList()
        .distinct().length === 1
    );
  }
  /**
   * Checks if two lists are equal using a deep comparison
   * @param {List} list
   * @returns {Boolean}
   */
  equals(list) {
    return deepEquals(this, list);
  }
}
function deepEquals(obj1, obj2, ignoreCase = false) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== typeof obj2) return false;
  if (typeof obj1 === "string" && typeof obj2 === "string" && ignoreCase) {
    return obj1.toLowerCase() === obj2.toLowerCase();
  }
  if (isNullOrUndefined(obj1) || isNullOrUndefined(obj2)) {
    return obj1 === obj2;
  }
  if (!isObjectOrArray(obj1) || !isObjectOrArray(obj2)) return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (!(key in obj2)) return false;
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (isObjectOrArray(val1) && isObjectOrArray(val2)) {
      if (!deepEquals(val1, val2, ignoreCase)) return false;
    } else if (isString(val1) && isString(val2) && ignoreCase) {
      if (val1.toLowerCase() !== val2.toLowerCase()) return false;
    } else if (val1 !== val2) {
      return false;
    }
  }
  return true;
}
class Triple extends Array {
  constructor(first, second, third) {
    super();
    this.push(first);
    this.push(second);
    this.push(third);
    Object.freeze(this);
  }
  get first() {
    return this[0];
  }
  get second() {
    return this[1];
  }
  get third() {
    return this[2];
  }
  toList() {
    return listOf(this[0], this[1], this[2]);
  }
}
class Pair extends Array {
  constructor(key, value) {
    super();
    this.push(key);
    this.push(value);
    Object.freeze(this);
  }
  get first() {
    return this[0];
  }
  get second() {
    return this[1];
  }
  toList() {
    return listOf(this[0], this[1]);
  }
}
/**
 * If the predicate argument is a function, invokes the function with the given element.
 * If it's not a function, checks whether the predicate is equal to element.
 * @param {Function} predicate
 * @param {*} element
 * @returns {Boolean}
 */
function isMatch(predicate, element, index, array) {
  return isFunction(predicate)
    ? predicate(element, index, array)
    : deepEquals(predicate, element);
}
/**
 * Checks if the argument is a function
 * @param {*} argument
 * @returns {Boolean}
 */
function isFunction(argument) {
  return typeof argument === "function";
}
/**
 * Checks if the argument is a string
 * @param {*} argument
 * @returns {Boolean}
 */
function isString(argument) {
  return typeof argument === "string" || argument instanceof String;
}
function isKey(argument) {
  return isString(argument) || typeof argument === "number";
}
function isNullOrUndefined(argument) {
  return argument === undefined || argument === null;
}
function isPureObject(argument) {
  return (
    Boolean(argument) &&
    !Array.isArray(argument) &&
    typeof argument === "object"
  );
}
function isObjectOrArray(argument) {
  return Boolean(argument) && typeof argument === "object";
}
class Node {
  constructor(value = null, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  /**
   * Returns a string representation of the linked list
   */
  toString() {
    let output = "";
    let current = this.head;
    while (current) {
      output = `${output}${current.value} -> `;
      current = current.next;
    }
    return `${output}null`;
  }
  static fromValues(...values) {
    const ll = new LinkedList();
    for (let i = values.length - 1; i >= 0; i--) {
      ll.insertAtHead(values[i]);
    }
    return ll;
  }
  static fromList(list) {
    return this.fromValues(...list);
  }
  toList() {
    let list = listOf();
    let current = this.head;
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    return list;
  }
  /**
   * Inserts data at head
   * @param {any} data
   */
  insertAtHead(data) {
    const newNode = new Node(data, this.head);
    this.head = newNode;
    this.length++;
    return this;
  }
  /**
   * Inserts data at an index
   * @param {Number} index
   * @param {any} data
   * @returns
   */
  insertAtIndex(index, data) {
    if (index === 0) return this.insertAtHead(data);
    const previous = this.getNodeByIndex(index - 1);
    if (previous === null) return null;
    previous.next = new Node(data, previous.next);
    this.length++;
    return this;
  }
  /**
   * Gets the node at a particular index
   * @param {Number} index
   * @returns {Node}
   */
  getNodeByIndex(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current =
        (current === null || current === void 0 ? void 0 : current.next) ||
        null;
    }
    return current;
  }
  /**
   * Returns the value at a particular index
   * @param {Number} index
   * @returns {any}
   */
  getValueByIndex(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current =
        (current === null || current === void 0 ? void 0 : current.next) ||
        null;
    }
    return (
      (current === null || current === void 0 ? void 0 : current.value) || null
    );
  }
  /**
   * Removes the node at the head of the linked list
   */
  removeHead() {
    if (this.head) {
      this.head = this.head.next;
      this.length--;
    }
  }
}
class DoublyLinkedList {
  constructor() {
    this.head = new Node();
    this.length = 0;
    this.tail = this.head;
  }
  toString() {
    let output = "";
    let current = this.head;
    while (current) {
      output = `${output}${current.value || null} <-> `;
      current = current.next;
    }
    return `${output}null`;
  }
  static fromValues(...values) {
    const ll = new DoublyLinkedList();
    for (let i = 0; i < values.length; i++) {
      ll.insertAtHead(values[i]);
    }
    return ll;
  }
  static fromList(list) {
    return this.fromValues(...list);
  }
  toList() {
    let list = listOf();
    let current = this.head;
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    return list.filterFirstNotNull();
  }
  insertAtHead(value) {
    return this.append(value);
  }
  insertAtTail(value) {
    return this.prepend(value);
  }
  append(value) {
    let newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
      this.length++;
    }
    return this;
  }
  prepend(value) {
    let newNode = new Node(value);
    newNode.next = this.head;
    if (this.head) {
      this.head.previous = newNode;
      this.head = newNode;
      this.length++;
    }
    return this;
  }
  insert(index, value) {
    return this.insertAtIndex(index, value);
  }
  insertAtIndex(index, value) {
    if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
      throw new IllegalArgumentError(
        `Invalid index. Current length is ${this.length}`
      );
    }
    if (index === 0) {
      this.prepend(value);
      return this;
    }
    if (index === this.length) {
      this.append(value);
    }
    let newNode = new Node(value);
    let previousNode = this.head;
    if (previousNode) {
      for (let k = 0; k < index - 1; k++) {
        previousNode =
          (previousNode === null || previousNode === void 0
            ? void 0
            : previousNode.next) || null;
      }
      let nextNode =
        (previousNode === null || previousNode === void 0
          ? void 0
          : previousNode.next) || null;
      newNode.next = nextNode;
      if (previousNode) previousNode.next = newNode;
      newNode.previous = previousNode;
      if (nextNode) nextNode.previous = newNode;
      this.length++;
    }
    return this;
  }
  remove(index) {
    var _a, _b;
    if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
      throw new IllegalArgumentError(
        `Invalid index. Current length is ${this.length}`
      );
    }
    if (index === 0) {
      this.head =
        ((_a = this.head) === null || _a === void 0 ? void 0 : _a.next) || null;
      if (this.head) this.head.previous = null;
      this.length--;
      return this;
    }
    if (index === this.length - 1) {
      this.tail =
        ((_b = this.tail) === null || _b === void 0 ? void 0 : _b.previous) ||
        null;
      if (this.tail) this.tail.next = null;
      this.length--;
      return this;
    }
    let previousNode = this.head;
    for (let k = 0; k < index - 1; k++) {
      previousNode =
        (previousNode === null || previousNode === void 0
          ? void 0
          : previousNode.next) || null;
    }
    let deleteNode =
      (previousNode === null || previousNode === void 0
        ? void 0
        : previousNode.next) || null;
    let nextNode =
      (deleteNode === null || deleteNode === void 0
        ? void 0
        : deleteNode.next) || null;
    if (previousNode) previousNode.next = nextNode;
    if (nextNode) nextNode.previous = previousNode;
    this.length--;
    return this;
  }
}
class SetExtended extends Set {
  get length() {
    return this.size;
  }
  first() {
    return this.toList().first();
  }
  second() {
    return this.toList().second();
  }
  last() {
    return this.toList().last();
  }
  sort(sortFunction) {
    return this.toList().sort(sortFunction).toSetExtended();
  }
  addAll(array) {
    array.forEach((element) => {
      this.add(element);
    });
    return this;
  }
  mergeWith(set) {
    set.forEach((element) => {
      this.add(element);
    });
    return this;
  }
  toArray() {
    return Array.from(this);
  }
  toList() {
    return List.from(this);
  }
  filter(filterFn) {
    return this.toList()
      .filter((value, index, list) => filterFn(value, index, listFrom(list)))
      .toSetExtended();
  }
  find(findFn) {
    return this.toList().find((value, index, array) =>
      findFn(value, index, listFrom(array))
    );
  }
}
function setOf(...args) {
  return new SetExtended(...args);
}
class Str extends String {
  constructor(arg) {
    super(arg);
    this.vowels = listOf("a", "e", "i", "o", "u");
    this.chars = listOf();
    this.chars.push(...this.split(""));
  }
  static compareJSON(json1, json2) {
    if (!json1 || !json2) return null;
    let obj1, obj2;
    const diff1 = {},
      diff2 = {};
    try {
      if (isString(json1)) {
        obj1 = JSON.parse(json1);
      } else if (typeof json1 === "object") {
        obj1 = JSON.parse(JSON.stringify(json1));
      } else {
        throw new IllegalArgumentError("Unable to parse");
      }
      if (isString(json2)) {
        obj2 = JSON.parse(json2);
      } else if (typeof json2 === "object") {
        obj2 = JSON.parse(JSON.stringify(json2));
      } else {
        throw new IllegalArgumentError("Unable to parse");
      }
      recursiveDifference(obj1, obj2, diff1, diff2);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error["message"] === "string"
      )
        throw new IllegalArgumentError(error.message);
    }
    function recursiveDifference(thisObj, otherObj, thisDiff, otherDiff) {
      const thisKeys = listFrom(Object.keys(thisObj));
      const otherKeys = listFrom(Object.keys(otherObj));
      const keys = thisKeys.union(otherKeys);
      for (const key of keys) {
        const [thisValue, otherValue] = [thisObj[key], otherObj[key]];
        if (thisValue !== otherValue) {
          if (thisValue instanceof Array && otherValue instanceof Array) {
            thisDiff[key] = [];
            otherDiff[key] = [];
            recursiveDifference(
              thisValue,
              otherValue,
              thisDiff[key],
              otherDiff[key]
            );
            if (thisDiff[key].length === 0) {
              delete thisDiff[key];
            }
            if (otherDiff[key].length === 0) {
              delete otherDiff[key];
            }
          } else if (
            typeof thisValue === "object" &&
            typeof otherValue === "object"
          ) {
            thisDiff[key] = {};
            otherDiff[key] = {};
            recursiveDifference(
              thisValue,
              otherValue,
              thisDiff[key],
              otherDiff[key]
            );
            if (Object.keys(thisDiff[key]).length === 0) {
              delete thisDiff[key];
            }
            if (Object.keys(otherDiff[key]).length === 0) {
              delete otherDiff[key];
            }
          } else {
            thisDiff[key] = thisValue;
            otherDiff[key] = otherValue;
          }
        }
      }
    }
    return listOf(diff1, diff2);
  }
  static toEnglish(number) {
    if (Number.isNaN(number)) return NaN.toString();
    const dictionary = {
      1: "One",
      2: "Two",
      3: "Three",
      4: "Four",
      5: "Five",
      6: "Six",
      7: "Seven",
      8: "Eight",
      9: "Nine",
      10: "Ten",
      11: "Eleven",
      12: "Twelve",
      13: "Thirteen",
      14: "Fourteen",
      15: "Fifteen",
      16: "Sixteen",
      17: "Seventeen",
      18: "Eighteen",
      19: "Nineteen",
      20: "Twenty",
      30: "Thirty",
      40: "Forty",
      50: "Fifty",
      60: "Sixty",
      70: "Seventy",
      80: "Eighty",
      90: "Ninety",
      100: "Hundred",
    };
    const bigNums = listOf(
      "Thousand",
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintrillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "Nonillion",
      "Decillion"
    );
    const sign = Math.sign(number);
    const absoluteValue = Math.abs(number);
    if (absoluteValue === 0) {
      return "Zero";
    }
    const [integer, decimal] = absoluteValue.toString().split(".");
    const chunks = listFrom(integer.split("")).reversed().chunked(3);
    const lastDigits = (num, n) =>
      num.toString().slice(num.toString().length - n);
    function parseThreeDigits(num) {
      if (num < 10) {
        return dictionary[num];
      }
      const twoPlaces = lastDigits(num, 2);
      let twoPlacesEnglish = dictionary[Number(twoPlaces)];
      if (!twoPlacesEnglish) {
        const [tens, ones] = twoPlaces.split("");
        const tensEnglish = dictionary[Number(tens) * 10] || "";
        const onesEnglish = dictionary[Number(ones)] || "";
        twoPlacesEnglish =
          parseInt(twoPlaces) > 0 ? `${tensEnglish} ${onesEnglish}` : "";
      }
      let hundredth = "",
        hundredthEnglish;
      if (num >= 100) {
        hundredth = Math.floor(num / 100).toString();
        hundredthEnglish = `${dictionary[Number(hundredth)]} ${
          dictionary[(Number(hundredth) * 100) / Number(hundredth)]
        }${Number(twoPlaces) > 0 ? " and " : ""}`;
        return `${hundredthEnglish}${twoPlacesEnglish}`;
      }
      return twoPlacesEnglish;
    }
    const thousandthChunks = chunks.map((chunk) =>
      parseThreeDigits(parseInt(chunk.reverse().join("")))
    );
    const integerEnglish =
      (sign < 0 ? "Minus " : "") +
      thousandthChunks
        .map((numberEnglish, index) => {
          if (index === 0) return numberEnglish;
          if (numberEnglish) return `${numberEnglish} ${bigNums[index - 1]}`;
          return null;
        })
        .filter(Boolean)
        .reverse()
        .join(", ");
    const decimalEnglish =
      decimal &&
      decimal
        .split("")
        .map((digit) => {
          if (digit === "0") return "Zero";
          return dictionary[digit];
        })
        .join(" ");
    if (decimal) {
      return `${integerEnglish}${
        Number(integerEnglish) === 0 ? "" : " "
      }Point ${decimalEnglish}`;
    }
    return integerEnglish;
  }
  /**
   * Capitalizes the first letter of each word as defined by a separator and a joiner
   * @param {Array} separators
   * @param {String} joiner
   * @returns {String}
   */
  capitalize(separators = [" ", "-", ":", "_"], joiner = " ") {
    const pattern = separators.join("|");
    const regex = new RegExp(pattern, "gi");
    return this.split(regex)
      .map(
        (part) =>
          (part[0] ? part[0].toUpperCase() : "") + part.slice(1).toLowerCase()
      )
      .join(joiner);
  }
  startsWithVowel(ignoreCase = false) {
    if (ignoreCase)
      return this.vowels.some((vowel) => this.toLowerCase().startsWith(vowel));
    return this.vowels.some((vowel) => this.startsWith(vowel));
  }
  startsWithConsonant(ignoreCase = false) {
    if (ignoreCase)
      return this.vowels.none((vowel) => this.toLowerCase().startsWith(vowel));
    return this.vowels.none((vowel) => this.startsWith(vowel));
  }
  equalsIgnoreCase(string) {
    return this.toLowerCase() === string.toLowerCase();
  }
  forEach(callback) {
    this.chars.forEach(callback);
  }
  map(callback) {
    return listFrom(this.chars.map(callback));
  }
  some(predicate) {
    return this.chars.some(predicate);
  }
  every(predicate) {
    return this.chars.every(predicate);
  }
  reverse() {
    return this.chars.reverse().join("");
  }
  chunked(n) {
    return this.chars.chunked(n).joinEach("");
  }
  segment(n) {
    return listFrom(this.chars).segment(n).joinEach("");
  }
  isUpperCase() {
    return this.toUpperCase() === String(this);
  }
  isLowerCase() {
    return this.toLowerCase() === String(this);
  }
  isNumber() {
    return Number.isFinite(parseFloat(String(this)));
  }
  toPascalCase() {
    return this.replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[\s_]+/g, " ")
      .split(" ")
      .map((word) => str(word).capitalize())
      .join("");
  }
  toCamelCase() {
    return this.replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[\s_]+/g, " ")
      .split(" ")
      .map((word, index) =>
        index ? str(word).capitalize() : word.toLowerCase()
      )
      .join("");
  }
  toSnakeCase() {
    return this.replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[\s_]+/g, " ")
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("_");
  }
  toKebabCase() {
    return this.replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[\s_]+/g, " ")
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("-");
  }
  toConstantCase() {
    return this.replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[\s_]+/g, " ")
      .split(" ")
      .map((word) => word.toUpperCase())
      .join("_");
  }
  count(str) {
    let strCount = 0;
    for (let i = 0; i < this.length - str.length + 1; i++) {
      if (this.substring(i, i + str.length) === str) {
        strCount++;
      }
    }
    return strCount;
  }
  counts(asObject = false) {
    const map = new Map();
    const object = {};
    for (const char of this) {
      if (asObject) {
        object[char] = object[char] ? object[char]++ : 1;
      } else {
        if (map.has(char)) {
          map.set(char, map.get(char) + 1);
        } else {
          map.set(char, 1);
        }
      }
    }
    return asObject ? object : map;
  }
  countWords() {
    return this.chars.length;
  }
  indexWords() {
    return this.listWords().counts();
  }
  listWords() {
    return listFrom(
      this.toLowerCase()
        .replace(/[,\.\?\\\/\"\'!\{\}()[\]:;]/g, "")
        .split(" ")
    );
  }
  levenshteinDistanceTo(word) {
    const matrix = listOf();
    for (let i = 0; i <= word.length; i++) {
      matrix[i] = listOf(i);
    }
    for (let j = 0; j < this.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= word.length; i++) {
      for (let j = 1; j <= this.length; j++) {
        if (word.charAt(i - 1) === this.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }
    return matrix[word.length][this.length];
  }
}
function listOf(...args) {
  const list = new List();
  for (const item of args) {
    list.push(item);
  }
  return list;
}
function listFrom(array) {
  const list = new List();
  for (const item of array) {
    list.push(item);
  }
  return list;
}
function emptyList() {
  return List.emptyList();
}
function pairOf(arg1, arg2) {
  if (arguments.length !== 2) {
    const error = `Argument length of two expected`;
    throw new IllegalArgumentError(error);
  }
  return new Pair(arg1, arg2);
}
function tripleOf(first, second, third) {
  if (arguments.length !== 3) {
    const error = `Argument length of three expected`;
    throw new IllegalArgumentError(error);
  }
  return new Triple(first, second, third);
}
function mapOf(...pairs) {
  const map = new Map();
  const isPairs = pairs.every((pair) => pair instanceof Pair);
  if (!isPairs)
    throw new IllegalArgumentError("All elements must be instances of 'Pair'");
  pairs.forEach((pair) => {
    map.set(pair.first, pair.second);
  });
  return map;
}
function str(str) {
  return new Str(str);
}
class Utils {
  static uuid() {
    const chars = listFrom("0123456789abcdef".split(""));
    const lengths = [8, 4, 4, 4, 12];
    return lengths
      .map((len) =>
        Array(len)
          .fill(null)
          .map(() => chars.random())
          .join("")
      )
      .join("-");
  }
}
class MathPlus {
  static factorial(n) {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static random(min, max) {
    return Math.random() * (max - min) + min;
  }
}
function when(value, cases) {
  if (value in cases) {
    const caseValue = cases[value];
    if (isFunction(caseValue)) {
      return caseValue(value);
    }
    return caseValue;
  }
  const defaultCase = cases._;
  if (isFunction(defaultCase)) {
    return defaultCase(value);
  }
  return defaultCase;
}
class Stack {
  constructor(...args) {
    this.items = listOf();
    for (const arg of args) {
      this.items.unshift(arg);
    }
  }
  push(...args) {
    for (const arg of args) {
      this.items.unshift(arg);
    }
  }
  pop() {
    return this.items.shift();
  }
}
class Queue {
  constructor(...args) {
    this.items = listOf();
    for (const arg of args) {
      this.items.push(arg);
    }
  }
  pop() {
    return this.items.shift();
  }
  push(...args) {
    for (const arg of args) {
      this.items.push(arg);
    }
  }
}
