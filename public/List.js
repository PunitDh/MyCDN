class IndexOutOfBoundsException extends Error {
  constructor(...args) {
    super(...args);
  }
}

class NoSuchElementException extends Error {
  constructor(...args) {
    super(...args);
  }
}

class List extends Array {
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
    return Object.keys(this).map((n) => parseInt(n));
  }

  /**
   * Returns the last valid index of the list
   */
  get lastIndex() {
    return this.length - 1;
  }

  /**
   * Returns the element at a particular index of a list
   * @param {Number} index
   * @returns {*}
   */
  get(index) {
    return this[index];
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
   * Returns the nth element in the list
   * @param {Number} index
   * @returns {*}
   */
  get(index) {
    return this[index];
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
   * @throws {NoSuchElementException}
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
   * @throws {NoSuchElementException}
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
   * @throws {NoSuchElementException}
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
   * @throws {NoSuchElementException}
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
   * @throws {NoSuchElementException}
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
   * @throws {NoSuchElementException}
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
   * Returns the last element in the list or the last element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementException}
   */
  last(predicate) {
    return this.reverse().first(predicate);
  }

  /**
   * Returns the last element in the list or the last element that matches the predicate
   * @returns {*}
   */
  lastOrNull(predicate) {
    return this.reverse().firstOrNull(predicate);
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
      for (const item of this) {
        if (isMatch(predicate, item)) {
          if (count === nth - 1) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementException(`No such element`);
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
      for (const item of this) {
        if (isMatch(predicate, item)) {
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
    return this.map((list) => list[0]);
  }

  /**
   * Given a list of lists, returns the last element of each list as a list
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).firstOfEach() ==> ['c','f','z']
   */
  lastOfEach() {
    return this.map((list) => list[list.length - 1]);
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
   * Given a list of list of strings, joins each string with the given separator, prefix and postfix
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).joinEach("-", "<", ">") ==> ['<a-b-c>','<d-e-f>','<x-y-z>']
   */
  joinEach(separator, prefix = "", postfix = "") {
    return this.map((list) => list.toList().joinTo(separator, prefix, postfix));
  }

  /**
   * Given a list of strings, splits each element with the given separator
   * @param {String} separator
   * @returns {List}
   * @example listOf("Foo:Bar", "Baz:Test").splitEach(":") ==> [['Foo','Bar'],['Baz','Test']]
   */
  splitEach(separator) {
    return this.map((list) => list.split(separator));
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
    throw new NoSuchElementException(error);
  }

  /**
   * Returns the first non-null value produced by transform function being applied to elements of
   * this collection in iteration order, or null if no non-null value was produced.
   * @param {Function} transform
   * @returns {List}
   */
  firstNotNullOfOrNull(transform) {
    for (const it of this) {
      if (it && transform(it)) {
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
      ? Math.floor(this.length / 2)
      : Math.ceil(this.length / 2);
    const firstHalf = this.slice(0, middleIndex).toList();
    const secondHalf = this.slice(middleIndex, this.length).toList();
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
    return this.halve(!keepMiddle).first();
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
    return this.slice(0, n);
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
    for (const item of this) {
      if (predicate(item)) {
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
    return filtered;
  }

  /**
   * Returns a list containing last elements satisfying the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  takeLastWhile(predicate) {
    const filtered = listOf();
    let found = false;
    for (const item of this.reverse()) {
      if (predicate(item)) {
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
    return filtered.reverse();
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
    for (const it of this) {
      if (predicate(it) && !dropped) {
        dropped = true;
      } else {
        droppedList.push(it);
      }
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
    for (const it of this.reverse()) {
      if (predicate(it) && !dropped) {
        dropped = true;
      } else {
        droppedList.push(it);
      }
    }
    return droppedList.reverse();
  }

  /**
   * Returns an element at the given index or throws an IndexOutOfBoundsException if the index is out of bounds of this list.
   * @param {Number} index
   * @returns {*}
   */
  elementAt(index) {
    if (this[index]) {
      return this[index];
    }
    const error = `Index out of bounds: ${index}`;
    throw new IndexOutOfBoundsException(error);
  }

  /**
   * Returns an element at the given index or the result of calling the defaultValue function if the index is out of bounds of this list.
   * @param {Number} index
   * @param {Function} defaultValue
   * @returns {*}
   */
  elementAtOrElse(index, defaultValue) {
    return index < index.length
      ? this[index]
      : isFn(defaultValue)
      ? defaultValue()
      : defaultValue;
  }

  /**
   * Returns an element at the given index or null if the index is out of bounds of this list.
   * @param {Number} index
   * @returns {*}
   */
  elementAtOrNull(index) {
    return this[index] ? this[index] : null;
  }

  /**
   * If the list is empty, return the defaultValue. Or else return the list.
   * @param {*} value
   */
  ifEmpty(value) {
    return this.isEmpty() ? value : this;
  }

  /**
   * If the list is not empty, return the defaultValue. Or else return the list.
   * @param {*} value
   */
  ifNotEmpty(value) {
    return this.isNotEmpty() ? value : this;
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
   * Appends all elements that are instances of specified type parameter R to the given destination.
   * @param {List} destination
   * @param {Class} clazz
   * @returns {List}
   */
  filterIsInstanceTo(destination, clazz) {
    const filtered = this.filter((item) => item instanceof clazz);
    return new List(...destination.concat(filtered));
  }

  /**
   * Returns a list containing all elements not matching the given predicate.
   * @param {Function} predicate
   * @returns {List}
   * @example listOf(3,4,5,6,7).filterNot(x => x > 5) ==> [3,4,5]
   */
  filterNot(predicate) {
    return this.filter((it) => !isMatch(predicate, it));
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
  filterFalsy(zeroTruthy = true) {
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
    return new List(...destination.concat(filtered));
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
    return new List(...destination.concat(filtered));
  }

  /**
   * Appends all elements not matching the given predicate to the given destination.
   * @param {List} destination
   * @param {Function} predicate
   * @returns {List}
   */
  filterNotTo(destination, predicate) {
    const filtered = this.filterNot(predicate);
    return new List(...destination.concat(filtered));
  }

  /**
   * Flattens the list by a given depth
   * @param {Number} depth
   * @returns {List}
   */
  flatten(depth) {
    return this.flat(depth);
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
   * Same as reduce
   * @param {Function} callback
   * @param {*} initialValue
   * @returns {*}
   */
  fold(callback, initialValue) {
    if (!initialValue && initialValue !== 0) {
      throw new Error(`Initial value must be specified`);
    }
    return this.reduce(callback, initialValue);
  }

  /**
   * Same as a string join, but with a prefix and a postfix
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {String}
   * @example listOf('a','b','c').joinTo("-", "<", ">") ==> '<a-b-c>'
   */
  joinTo(separator, prefix = "", postfix = "") {
    return `${prefix}${this.join(separator)}${postfix}`;
  }

  /**
   * Performs an async await operation on a list and returns the resultant list.
   * Note: The result must be awaited, i.e. The 'await' keyword must be used before it
   * @param {Function} callback
   * @returns {List}
   */
  async mapAsync(callback) {
    let result = listOf();
    for (let [it, idx] of this.entries()) {
      const promise = await callback(it, idx);
      result.push(promise);
    }
    return result;
  }

  /**
   * Performs an async await operation on a list
   * @param {Function} callback
   */
  async forEachAsync(callback) {
    for (let [it, idx] of this.entries()) {
      await callback(it, idx);
    }
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
    return listOf(...this.unique());
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
   * @returns {Set}
   * @example listOf('a','a','b','b','e','e','f').distinct() ==> Set {'a','b','e','f'}
   */
  unique() {
    return new Set(this);
  }

  /**
   * Converts all elements in the list to upper case
   * @returns {Array<String>}
   * @example listOf('apple','banana','carrot').toUpperCase() ==> ['APPLE','BANANA','CARROT']
   */
  toUpperCase() {
    return listOf(...this).map((arg) => arg.toUpperCase());
  }

  /**
   * Converts all elements in the list to lower case
   * @returns {Array<String>}
   * @example listOf('Apple','Banana','CARROT').toLowerCase() ==> ['apple','banana','carrot']
   */
  toLowerCase() {
    return listOf(...this).map((arg) => arg.toLowerCase());
  }

  /**
   * Returns the sum of all elements in a list
   * @returns {Number}
   */
  sum() {
    return this.reduce((acc, cur) => +acc + cur, 0);
  }

  /**
   * Returns the sum of all elements in a list
   * @returns {Number}
   */
  sumOf(selector) {
    const values = this.map(selector);
    return values.sum();
  }

  /**
   * Returns the multiplication product of all elements in a list
   * @returns {Number}
   */
  product() {
    return this.reduce((acc, cur) => acc * cur, 1);
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
   * Chunks a list into specified size
   * @param {Number} size
   * @returns {Array<Array<any>>}
   */
  chunked(size) {
    const chunkedArray = listOf();
    for (let i = 0; i < this.length; i += Math.abs(size)) {
      chunkedArray.push(this.slice(i, i + Math.abs(size)));
    }
    return chunkedArray;
  }

  /**
   * Returns true if the list includes all the specified elements, else returns false
   * @param  {...any} elements
   * @returns {Boolean}
   */
  includesAll(...elements) {
    const values = elements.flat();
    for (const value of values) {
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
   * Finds all the elements that exist in both lists
   * @param {List} list
   * @returns {List}
   */
  intersection(list) {
    if (!list || !(list instanceof Array)) return null;
    return list.filter((item) => this.includes(item));
  }

  /**
   * Finds all the elements that do not exist in both lists
   * @param {List} list
   * @returns {List}
   */
  difference(list) {
    if (!list || !(list instanceof Array)) return null;
    const diff = listOf();
    list.forEach((item) => {
      if (!this.includes(item)) {
        diff.push(item);
      }
    });
    this.forEach((item) => {
      if (!list.includes(item)) {
        diff.push(item);
      }
    });
    return diff;
  }

  /**
   * Returns a set containing all distinct elements from both collections.
   * @param {List} list
   * @returns {Set}
   */
  union(list) {
    return new Set(this.intersect(list));
  }

  /**
   * Returns the number of elements matching a given predicate.
   * If the predicate is a function, runs the function.
   * If the predicate is a value, counts the number of values.
   * If no predicate is provided, returns the length of the array.
   * @param {Function | *} predicate
   * @returns {Number}
   */
  count(predicate) {
    if (predicate) {
      let count = 0;
      this.forEach((item, index) => {
        const match = isFn(predicate)
          ? predicate(item, index)
          : item === predicate;
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
   * @returns {Number}
   */
  maxOf(selector) {
    const nums = this.map(selector);
    return nums.max();
  }

  /**
   * Returns the smallest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @returns {Number}
   */
  minOf(selector) {
    const nums = this.map(selector);
    return nums.min();
  }

  /**
   * Finds the max number in the arguments provided
   * @this {Array<Number>}
   * @returns {Number}
   */
  max() {
    return Math.max(...this);
  }

  /**
   * Finds the min number in the arguments provided
   * @this {Array<Number>}
   * @returns {Number}
   */
  min() {
    return Math.min(...this);
  }

  minmax() {
    return new List(this.min(), this.max());
  }

  minmaxOf(selector) {
    return new List(this.minOf(selector), this.maxOf(selector));
  }

  /**
   * Adds all the elements to the list
   * @param  {...any} elements
   * @returns {List}
   */
  plus(...elements) {
    return this.concat(elements);
  }

  /**
   * Removes all the elements from the list
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
  scan(operation, initialValue = 0) {
    const accumulated = listOf();
    this.reduce((acc, cur) => {
      const operated = operation(acc, cur);
      accumulated.push(acc);
      return operated;
    }, initialValue);
    return accumulated;
  }

  /**
   * Returns the single element matching the given predicate, or
   * throws exception if there is no or more than one matching element.
   * @param {Function} predicate
   * @returns {*}
   */
  single(predicate) {
    const found = this.filter(predicate);
    if (found.length !== 1) {
      const error = `No single element matches the given predicate Found: (${found.length})`;
      throw new NoSuchElementException(error);
    }
    return found.first();
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
    return found.first();
  }

  /**
   * Rounds all the numbers in the arguments provided
   * @this {Array<Number>}
   * @returns {Array<Number>}
   */
  round() {
    return this.map((item) => Math.round(item));
  }

  /**
   * Rounds all the numbers up in the arguments provided
   * @this {Array<Number>}
   * @returns {Array<Number>}
   */
  ceil() {
    return this.map((item) => Math.ceil(item));
  }

  /**
   * Rounds all the numbers down in the arguments provided
   * @this {Array<Number>}
   * @returns {Array<Number>}
   */
  floor() {
    return this.map((item) => Math.floor(item));
  }

  /**
   * Returns whether none of the items match the given predicate
   * @param {Function} predicate
   * @returns {Boolean}
   */
  none(predicate) {
    if (predicate) {
      for (const item of this) {
        if (isMatch(predicate, item)) {
          return false;
        }
      }
      return true;
    } else {
      return this.length === 0;
    }
  }

  /**
   * Returns every index of the occurence of the element
   * @param {*} element
   * @returns {List}
   */
  indicesOf(element) {
    const indices = listOf();
    for (let i = 0; i < this.length; i++) {
      if (this[i] === element) {
        indices.push(i);
      }
    }
    return indices;
  }

  /**
   * Deletes any given number of elements from a list. Mutates the original list.
   * @param {*} elements
   * @returns {List}
   */
  delete(...elements) {
    for (const element of elements) {
      for (let i = this.length; i >= 0; i--) {
        if (this[i] === element) {
          this.splice(i, 1);
        }
      }
    }
    return this;
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
   * @param {Boolean} repeat
   * @returns {List}
   */
  sample(sampleSize, repeat = true) {
    const sample = listOf();

    if (repeat) {
      while (sample.length < sampleSize) {
        const index = Math.floor(Math.random() * this.length);
        sample.push(this[index]);
      }
    } else {
      const duplicateArray = this.slice();
      if (sampleSize > this.length) {
        const error = `Sample size '${sampleSize}' is greater than list length '${this.length}'`;
        throw new Error(error);
      }
      while (sample.length < sampleSize) {
        const index = Math.floor(Math.random() * duplicateArray.length);
        const elem = duplicateArray[index];
        duplicateArray.splice(index, 1);
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
    return this.map((item) => item.sort(() => Math.random() - 0.5));
  }

  /**
   * Casts each item in the list to its boolean value
   * @returns {Array<Boolean>}
   */
  toBoolean() {
    return this.map((item) => Boolean(item));
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
    const distinctProperties = Array.from(new Set(this.map(keySelector)));
    distinctProperties.forEach((property) => {
      grouped[property] = this.filter((item) => keySelector(item) === property);
    });
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
    return { ...destination, ...grouped };
  }

  binarySearch(element, fromIndex = 0, toIndex = this.length) {
    const halfIndex = Math.floor((toIndex - fromIndex) / 2 + fromIndex);
    if (element === this[halfIndex]) return halfIndex;
    if (Math.abs(fromIndex - toIndex) === 1) return null;
    return element < this[halfIndex]
      ? this.binarySearch(element, fromIndex, halfIndex)
      : this.binarySearch(element, halfIndex, toIndex);
  }

  binarySearchBy(element, keySelector, fromIndex = 0, toIndex = this.length) {
    const halfIndex = Math.floor((toIndex - fromIndex) / 2 + fromIndex);
    const keySelect = keySelector(this[halfIndex]);
    if (element === keySelect) return this[halfIndex];
    if (Math.abs(fromIndex - toIndex) === 1) return null;
    return element < keySelect
      ? this.binarySearchBy(element, keySelector, fromIndex, halfIndex)
      : this.binarySearchBy(element, keySelector, halfIndex, toIndex);
  }

  /**
   *
   * @param {List} destination
   * @param {Function} transform
   */
  mapTo(destination, transform) {
    const mapped = this.map(transform);
    return new List(...destination.concat(mapped));
  }

  /**
   * Performs a map on all elements in the list that are not null or undefined
   * @param {Function} transform
   * @returns {List}
   */
  mapNotNull(transform) {
    let results = listOf();
    for (let it = 0; it < this.length; it++) {
      if (this[it] !== null && this[it] !== undefined) {
        const promise = transform(this[it], it);
        results.push(promise);
      }
    }
    return results;
  }

  /**
   * Performs a map on all elements in the list that are not null or undefined and appends it to the destination
   * @param {List} destination
   * @param {Function} transform
   * @returns {List}
   */
  mapNotNullTo(destination, transform) {
    if (!Array.isArray(destination)) {
      const error = `Parameter 'destination' must be an Array or List`;
      throw new Error(error);
    }
    let results = listOf();
    for (let it = 0; it < this.length; it++) {
      if (this[it] !== null && this[it] !== undefined) {
        const promise = transform(this[it], it);
        results.push(promise);
      }
    }
    return new List(...destination.concat(results));
  }

  /**
   * Given two lists, merges them into a map
   * @param {List} other
   * @returns {Map}
   */
  mapWith(other) {
    const map = new Map();
    for (let i = 0; i < Math.min(this.length, other.length); i++) {
      map.set(this[i], other[i]);
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
   *
   * @returns {List}
   */
  unzip() {
    const maxLength = Math.max(...this.map((arr) => arr.length));
    const result = listOf(...List.from({ length: maxLength }, () => []));
    this.forEach((arr) => {
      for (let i = 0; i < maxLength; i++) {
        result[i].push(arr[i]);
      }
    });
    return result;
  }

  /**
   * Given two or more lists, returns pairs of one element in one list with
   * another element in the other list
   * @param {...List} lists
   * @returns {List}
   */
  zip(...lists) {
    return this.map((item, index) =>
      [item, ...lists.map((list) => list[index]).toList()].toList()
    ).toList();
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
   * @returns {Array<Array<any>>}
   */
  partition(predicate) {
    const listTrue = listOf();
    const listFalse = listOf();
    for (const item of this) {
      if (isMatch(predicate, item)) {
        listTrue.push(item);
      } else {
        listFalse.push(item);
      }
    }
    return listOf(listTrue, listFalse);
  }

  /**
   * Repeats the list n times and returns the result
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,8,7).repeat(3) ==> [3,4,8,7,3,4,8,7,3,4,8,7]
   */
  repeat(n) {
    const repeatedList = listOf();
    for (const _ of listOf(0, n - 1).range()) {
      repeatedList.push(...this);
    }
    return repeatedList;
  }

  /**
   * Returns a list of all elements sorted according to natural sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortBy(selector) {
    const newArray = this.map((n) => n);
    return newArray.sort((a, b) => (selector(a) > selector(b) ? 1 : -1));
  }

  /**
   * Returns a list of all elements sorted according to natural sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortedBy(selector) {
    return this.sortBy(selector);
  }

  /**
   * Returns a list of all elements sorted by descending order according to natural
   * sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortByDescending(selector) {
    const newArray = this.map((n) => n);
    return newArray.sort((a, b) => (selector(a) > selector(b) ? -1 : 1));
  }

  /**
   * Returns a list of all elements sorted by descending order according to natural
   * sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortedByDescending(selector) {
    return this.sortByDescending(selector);
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
   * Adds the element to the list and returns the list
   * @param {any} element
   * @returns {List}
   * @example listOf(3,4,8,7).add(6) ==> [3,4,8,7,6]
   */
  add(element) {
    this.push(element);
    return this;
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
    const sorted = this.sort((a, b) => a - b);
    const idx = Math.floor(sorted.length / 2);
    return sorted[idx];
  }

  /**
   * Returns the mode (most frequently occurring element) of the list
   * @returns {*}
   * @example listOf(3,4,8,8,7,6).mode() ==> 8
   */
  mode() {
    const counts = {};
    for (let i = 0; i < this.length; i++) {
      if (counts[this[i]]) {
        counts[this[i]] += 1;
      } else {
        counts[this[i]] = 1;
      }
    }
    const max = Math.max(...Object.values(counts));
    for (const [key, value] of Object.entries(counts)) {
      if (value === max) {
        return key;
      }
    }
  }

  /**
   * Calculate the standard deviation of the list of numbers
   * @returns {Number}
   * @example listOf(3,4,8,7,6).stdev() ==> 1.8547236990991407
   */
  stdev() {
    const mean = this.reduce((acc, cur) => +acc + cur) / this.length;
    return Math.sqrt(
      this.map((n) => (n - mean) ** 2).reduce((a, b) => +a + b) / this.length
    );
  }

  /**
   * Returns all the prime numbers in the list
   * @returns {List}
   * @example listOf(1,2,4,7,9).filterOddNumbers() ==> [1,7,9]
   */
  filterOddNumbers() {
    return this.filter((it) => it % 2 === 1);
  }

  /**
   * Returns all the prime numbers in the list
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
    const cts = {};
    for (let i = 0; i < this.length; i++) {
      if (this[i] in cts) {
        cts[this[i]] = +cts[this[i]] + 1;
      } else {
        cts[this[i]] = 1;
      }
    }
    return cts;
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
      obj[item] = transform(item, idx);
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
   * Multiplies each element in the list with a given number
   * @param {Number} number
   * @returns {List}
   * @example listOf(3,2,1).multiply(2) ==> [6,4,2]
   */
  multiply(number) {
    return this.map((n) => n * number);
  }

  /**
   * Divides each element in the list with a given number
   * @param {Number} number
   * @returns {List}
   * @example listOf(4,8,10).divide(2) ==> [2,4,5]
   */
  divide(number) {
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
   * @param {Number} number
   * @returns {List}
   * @example listOf(1,2,3).toFixed(2) ==> ['1.00', '2.00', '3.00']
   */
  toFixed(number) {
    return this.map((n) => n.toFixed(number));
  }

  /**
   * Converts a list of numbers into english
   * @returns {List}
   */
  toEnglish() {
    return this.map((num) => (!isNaN(num) ? numToEnglish(num) : num));
    function numToEnglish(num) {
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
      const sign = Math.sign(num);
      const number = Math.abs(num);
      const [integer, decimal] = number.toString().split(".");
      const chunks = integer.split("").reverse().toList().chunked(3);
      if (number === 0) {
        return "Zero";
      }

      const lastDigits = (num, n) =>
        num.toString().slice(num.toString().length - n);

      function parseThreeDigits(num) {
        if (num < 10) {
          return dictionary[parseInt(num)];
        }
        const twoPlaces = lastDigits(num, 2);
        let twoPlacesEnglish = dictionary[twoPlaces];
        if (!twoPlacesEnglish) {
          const [tens, ones] = twoPlaces.split("");
          const tensEnglish = dictionary[tens * 10] || "";
          const onesEnglish = dictionary[ones] || "";
          twoPlacesEnglish =
            parseInt(twoPlaces) > 0 ? `${tensEnglish} ${onesEnglish}` : "";
        }
        let hundredth = "",
          hundredthEnglish;
        if (num >= 100) {
          hundredth = Math.floor(num / 100);
          hundredthEnglish = `${dictionary[hundredth]} ${
            dictionary[(hundredth * 100) / hundredth]
          }${twoPlaces > 0 ? " and " : ""}`;
          return `${hundredthEnglish}${twoPlacesEnglish}`;
        }
        return twoPlacesEnglish;
      }

      const hundredthChunks = chunks.map((chunk) =>
        parseThreeDigits(chunk.reverse().join(""))
      );

      const integerEnglish =
        (sign < 0 ? "Minus " : "") +
        hundredthChunks
          .map((digit, index) => {
            if (index === 0) return digit;
            if (digit) return `${digit} ${bigNums[index - 1]}`;
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
        return `${integerEnglish} Point ${decimalEnglish}`;
      }
      return integerEnglish;
    }
  }

  /**
   * Replaces every occurence of an element in a list with a new value
   * @param {any} element
   * @param {any} replaced
   * @returns {List}
   * @example  listOf(1,2,3,4).replace(2,7) ==> [1,7,3,4]
   */
  replace(element, replaced) {
    return this.map((item) => (item === element ? replaced : item));
  }

  /**
   * Returns a list of numbers counting from start to end
   * @returns {List}
   * @example listOf(1,4).range()  ==> [1,2,3,4]
   */
  range() {
    const start = this[0];
    const end = this[1];
    const arr = listOf();
    for (
      let i = start;
      start < end ? i <= end : i >= end;
      start < end ? i++ : i--
    ) {
      arr.push(i);
    }
    return arr;
  }

  /**
   * Checks if an item exists in the list that matches the given predicate
   * @param {Function} predicate
   * @returns {Boolean}
   */
  exists(predicate) {
    for (const item of this) {
      if (isMatch(predicate, item)) {
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
   * Clears all elements from the list
   * @returns {List}
   */
  clear() {
    while (this.length) {
      this.pop();
    }
    return this;
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
   * Checks if two lists are equal using a deep comparison
   * @param {List} list
   * @returns {Boolean}
   */
  equals(list) {
    // Check if the length of the lists are the same
    if (this.length !== list.length) {
      return false;
    }

    // Check each element of the lists for equality
    for (let i = 0; i < this.length; i++) {
      const element1 = this[i];
      const element2 = list[i];

      // If both elements are lists, perform a deep comparison
      if (Array.isArray(element1) && Array.isArray(element2)) {
        if (!element1.equals(element2)) {
          return false;
        }
      }
      // Otherwise, use strict equality check
      else if (element1 !== element2) {
        return false;
      }
    }

    // All elements are equal, return true
    return true;
  }
}

class Triple extends Array {
  constructor(first, second, third) {
    Object.freeze(super(first, second, third));
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
    Object.freeze(super(key, value));
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
function isMatch(predicate, element) {
  return isFn(predicate) ? predicate(element) : predicate === element;
}

/**
 * Checks if the argument is a function
 * @param {*} argument
 * @returns {Boolean}
 */
function isFn(argument) {
  return typeof argument === "function";
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
      current = current.next;
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
      current = current.next;
    }
    return current.value;
  }

  /**
   * Removes the node at the head of the linked list
   */
  removeHead() {
    this.head = this.head.next;
    this.length--;
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
    this.tail.next = newNode;
    newNode.previous = this.tail;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head.previous = newNode;
    this.head = newNode;
    this.length++;
    return this;
  }

  insert(index, value) {
    return this.insertAtIndex(index, value);
  }

  insertAtIndex(index, value) {
    if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
      throw new Error(`Invalid index. Current length is ${this.length}`);
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

    for (let k = 0; k < index - 1; k++) {
      previousNode = previousNode.next;
    }

    let nextNode = previousNode.next;
    newNode.next = nextNode;
    previousNode.next = newNode;
    newNode.previous = previousNode;
    nextNode.previous = newNode;

    this.length++;
    return this;
  }

  remove(index) {
    if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
      throw new Error(`Invalid index. Current length is ${this.length}`);
    }

    if (index === 0) {
      this.head = this.head.next;
      this.head.previous = null;
      this.length--;
      return this;
    }

    if (index === this.length - 1) {
      this.tail = this.tail.previous;
      this.tail.next = null;
      this.length--;
      return this;
    }

    let previousNode = this.head;

    for (let k = 0; k < index - 1; k++) {
      previousNode = previousNode.next;
    }

    let deleteNode = previousNode.next;
    let nextNode = deleteNode.next;

    previousNode.next = nextNode;
    nextNode.previous = previousNode;

    this.length--;
    return this;
  }
}

class StringExtended extends String {
  constructor(...args) {
    super(...args);
  }

  /**
   * Capitalizes the first letter of each word as defined by a separator and a joiner
   * @param {Array} separators
   * @param {String} joiner
   * @returns {String}
   */
  capitalize(separators = [" "], joiner = " ") {
    const pattern = separators.join("|");
    const regex = new RegExp(pattern, "gi");
    return this.split(regex)
      .map((part) => (part[0] ? part[0].toUpperCase() : "") + part.slice(1))
      .join(joiner);
  }
}

function listOf(...args) {
  if (args.length === 1) {
    return new List(1).fill(...args);
  }
  return new List(...args);
}

function listOfType(clazz) {
  return (...items) => {
    items.forEach((item, idx) => {
      const isInstance =
        item instanceof clazz || typeof item === clazz.name.toLowerCase();
      if (!isInstance) {
        const error = `Item at index '${idx}' of type '${typeof item}' is not assignable to type: '${
          clazz.name
        }'`;
        throw new Error(error);
      }
    });
    return listOf(...items);
  };
}

function pairOf(arg1, arg2) {
  if (arguments.length !== 2) {
    const error = `Argument length of two expected`;
    throw new Error(error);
  }
  return new Pair(arg1, arg2);
}

function tripleOf(first, second, third) {
  if (arguments.length !== 3) {
    const error = `Argument length of three expected`;
    throw new Error(error);
  }
  return new Triple(first, second, third);
}

Array.prototype.toList = function () {
  return listOf(...this);
};

Set.prototype.toList = function () {
  return listOf(...this);
};

Object.prototype.toList = function () {
  return Object.entries(this)
    .map((arr) => arr.toList())
    .toList();
};

Object.prototype.keys = function () {
  return Object.keys(this).toList();
};

Object.prototype.values = function () {
  return Object.values(this).toList();
};

Object.prototype.entries = function () {
  return this.toList();
};

Object.prototype.equals = function (obj) {
  const keys1 = Object.keys(this);
  const keys2 = Object.keys(obj);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = this[key];
    const val2 = obj[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !val1.equals(val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
};

function strOf(str) {
  return new StringExtended(str);
}

String.prototype.toExtended = function () {
  return new StringExtended(this);
};

class Utils {
  static uuid() {
    const chars = "0123456789abcdef".split("").toList();
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

module.exports = {
  listOf,
  listOfType,
  pairOf,
  tripleOf,
  Pair,
  Triple,
  List,
  LinkedList,
  DoublyLinkedList,
  Utils,
  StringExtended,
  strOf,
};
