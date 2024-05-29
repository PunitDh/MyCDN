# List.JS (Array Extended)

## Why List.JS?

JavaScript array lacks a lot of functionality to manipulate and modify existing array.

The `List` extends `Array`, so all functionality that is available on a regular JavaScript array is available on the `List`.

## How to declare a list

There are several ways to declare a list.

You can use the `listOf` function, similar to Kotlin.

**Usage**

```js
const { listOf } = require("./List.js");

const list = listOf("a", "b", "c", "d");

console.log(list);
// List(4) [ 'a', 'b', 'c', 'd' ]
```

You can also declare a list using the `List` constructor.

**Usage**

```js
const { List } = require("./List.js");

const list = new List(1, 2, 3, 4);

console.log(list);
// List(4) [ 1, 2, 3, 4 ]
```

You can also convert a JavaScript `Array` to a `List` using the `toList()` function.

**Usage**

```js
require("./List.js");

const array = [9, 8, 7, 6];

const list = array.toList();

console.log(list);
// List(4) [ 9, 8, 7, 6 ]
```

## Functions

## `add(...elements)`

**Description**

Adds all the specified `elements` to the list and returns the list.

**Usage**

```js
const list = listOf("a", "b", "c");

const result = list.add("d", "e");

console.log(result);
// List(4) [ 'a', 'b', 'c', 'd', 'e' ]
```

## `all(predicate, thisArg = undefined)`

**Description**

Checks whether _all_ the elements in the list matches a given `predicate`

**Usage**

```js
const input = listOf(4, 5, 6);

let result = input.all((item) => item > 3);
console.log(result);
// true

result = input.all((item) => item > 5);
console.log(result);
// false
```

## `any(predicate, thisArg = undefined)`

**Description**

Checks whether _any_ of the elements in the list matches a given element

**Usage**

```js
const input = listOf(4, 5, 6);

let result = input.any((item) => item > 7);
console.log(result);
// false

result = input.any((item) => item > 5);
console.log(result);
// true
```

## `associate(transform)`

**Description**

Returns an object containing key-value pairs provided by the `transform` function applied to each of the elements in the list.

**Usage**

```js
const people = listOf("Alice", "Bob", "Charlie");

const result = people.associate((it) => it.toUpperCase());

console.log(result);
// { Alice: 'ALICE', Bob: 'BOB', Charlie: 'CHARLIE' }
```

## `associateBy(keySelector)`

**Description**
Returns an object containing key-value pairs provided by `keySelector` function applied, where the key is the result of the `keySelector` function and the value is the item itself.

**Usage**

```js
const people = listOf(
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
);

let result = people.associateBy((it) => it.id);
console.log(result);
// {
//   '1': { id: 1, name: 'Alice' },
//   '2': { id: 2, name: 'Bob' },
//   '3': { id: 3, name: 'Charlie' }
// }

result = people.associateBy((it) => it.name);
console.log(result);
// {
//   Alice: { id: 1, name: 'Alice' },
//   Bob: { id: 2, name: 'Bob' },
//   Charlie: { id: 3, name: 'Charlie' }
// }
```

## `associateWith(valueSelector)`

**Description**

Returns a `Map` where keys are elements from the given collection and values are produced by the `valueSelector` function applied to each element.

**Usage**

```js
const list = listOf(
  { name: "apple", type: "fruit" },
  { name: "banana", type: "fruit" },
  { name: "brocolli", type: "vegetable" }
);
let result = list.associateWith((fruit) => fruit.type);

console.log(result);
// Map {
//   { name: 'apple', type: 'fruit' } => 'fruit',
//   { name: 'banana', type: 'fruit' } => 'fruit',
//   { name: 'brocolli', type: 'vegetable' } => 'vegetable'
// }
```

## `average()`

**Description**

Returns the average of the numbers in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let result = input.average();

console.log(result);
// 3.5
```

## `binarySearch(element, fromIndex = 0, toIndex = this.length)`

**Description**

Performs a binary search on a sorted list of elements and returns the index of the search result

**Note**
The list must be in a sorted ascendingly first before this function can be used.

**Usage**

```js
const list = listOf(8, 34, 56, 89, 105);

const result = list.binarySearch(56);

console.log(result);
// 2
```

## `binarySearchBy(element, keySelector, fromIndex = 0, toIndex = this.length)`

**Description**

Performs a binary search on a sorted list of elements based on the keySelector

**Usage**

```js
const users = listOf(
  { id: 1, name: "Tony" },
  { id: 7, name: "Chris" },
  { id: 17, name: "Dave" },
  { id: 28, name: "Pat" },
  { id: 39, name: "Fred" },
  { id: 105, name: "George" }
);

const result = users.binarySearchBy(28, (it) => it.id);

console.log(result);
// 3
```

## `capitalize()`

**Description**

Converts each word in the list to capitalized case

**Usage**

```js
const words = listOf("alice", "boB", "cHARLIE", "hello world");

const result = words.capitalize();

console.log(result);
// List(4) [ 'Alice', 'Bob', 'Charlie', 'Hello World' ]
```

## `ceil()`

**Description**

Rounds all numbers in the list up to their nearest integer values

**Usage**

```js
const numbers = listOf(2.34, 6.54, 9.67, -0.56, 3.14);

const ceil = numbers.ceil();

console.log(ceil);
// List(5) [ 3, 7, 10, -0, 4 ]
```

## `chunked(size)`

**Description**

Splits a list down into smaller chunks specified by the size

**Usage**

```js
const input = listOf(2, 6, 9, -1, 3);

const result = input.chunked(2);

console.log(result);
// List(3) [
//   List(2) [ 2, 6 ],
//   List(2) [ 9, -1 ],
//   List(1) [ 3 ]
// ]
```

## `clear()`

**Description**

Clears all elements from the list.

**Note**

Mutates the original list.

**Usage**

```js
const list = listOf(2, 6, 9, -1, 3);

list.clear();

console.log(list);
// List(0) []
```

## `compact()`

**Description**

Removes from the list all falsy values, including `0`, `false`, `undefined`, `null` and empty strings

**Usage**

```js
const input = listOf(
  1,
  4,
  null,
  undefined,
  0,
  8,
  "",
  "test",
  "foo",
  false,
  true
);

const result = input.compact();

console.log(result);
// List(6) [ 1, 4, 8, 'test', 'foo', true ]
```

## `contains(...elements)`

**Description**

Checks if the list contains _any_ of the given `elements`

**Note**

Not a deep comparison

**Usage**

```js
const input = listOf(2, 6, 9, -1, 3);

let result = input.contains(7, -1, 8);
console.log(result);
// true

result = input.contains(7, -2, 8);
console.log(result);
// false
```

## `containsAll(...elements)`

**Description**

Checks if a list contains _all_ of the given elements

**Usage**

```js
const numbers = listOf(2, 6, 9, -1, 3);

let result = numbers.containsAll(2, -1, 3);
console.log(result);
// true

result = numbers.containsAll(2, -1, 8);
console.log(result);
// false
```

## `count(predicate)`

**Description**

Returns the number of elements matching a given `predicate`.

- If the `predicate` is a **function**, returns the number of instances for which the function returns `true`.
- If the `predicate` is a **value**, counts the number of occurences of the `predicate` in the list.
- If no `predicate` is provided, returns the length of the list.

**Usage**

```js
const input = listOf(2, 6, 9, -1, 3, 2, 2, 5);
let result;

result = input.count();
console.log(result);
// 8

result = input.count((it) => it > 5);
console.log(result);
// 2

result = input.count(2);
console.log(result);
// 3
```

## `counts()`

**Description**

Counts occurences of every element in the list and returns them as a `Map`

**Usage**

```js
const list = listOf("apple", "apple", "orange", "banana", "banana", "banana");

const result = list.counts();

console.log(result);
// Map(3) { 'apple' => 2, 'orange' => 1, 'banana' => 3 }
```

## `delete(...elements)`

**Description**

Deletes all occurences of the given elements from the list.

**Note**

Mutates the original list. To ensure original list is not mutated, use `exclude()` instead.

**Usage**

```js
const fruits = listOf("apple", "apple", "orange", "banana", "banana", "pear");

fruits.delete("apple", "orange");

console.log(fruits);
// List(3) [ 'banana', 'banana', 'pear' ]
```

## `difference()`

**Description**

Returns the "difference" between two lists, i.e. finds all the elements that are _not_ common to both lists

**Note**

Opposite of `intersection()`

**Usage**

```js
const fruits1 = listOf("apple", "orange", "banana", "pear");
const fruits2 = listOf("peach", "apple", "orange", "plum");

const difference = fruits1.difference(fruits2);

console.log(difference);
// List(4) [ 'banana', 'pear', 'peach', 'plum' ]
```

## `distinct()`

**Description**

Returns all the unique elements in the list

**Usage**

```js
const input = listOf("apple", "apple", "orange", "banana", "banana", "pear");

const result = input.distinct();

console.log(result);
// List(4) [ 'apple', 'orange', 'banana', 'pear' ]
```

## `distinctBy(keySelector)`

**Description**

Returns a list containing only elements from the given collection having distinct keys returned by the given selector function.

**Usage**

```js
const input = listOf(
  { id: 3, name: "apple" },
  { id: 7, name: "apple" },
  { id: 5, name: "orange" },
  { id: 19, name: "banana" },
  { id: 21, name: "banana" },
  { id: 32, name: "pear" }
);

const result = input.distinctBy((item) => item.name);

console.log(result);
// List(4) [
//   { id: 3, name: 'apple' },
//   { id: 5, name: 'orange' },
//   { id: 19, name: 'banana' },
//   { id: 32, name: 'pear' }
// ]
```

## `divideBy(number)`

**Description**

Divides each element in the list with a given `number` or a list of numbers.

**Usage**

```js
const input = listOf(32, 78, 56);

let result = input.divideBy(4);

console.log(result);
// List(3) [ 8, 19.5, 14 ]

result = input.divideBy([4, 3, 2]);
console.log(result);
// List(3) [ 8, 26, 28 ]
```

## `drop(n)`

**Description**

Returns a list containing all elements except first `n` elements

**Usage**

```js
const input = listOf(32, 78, 56, 19, 22, 31);

const result = input.drop(4);

console.log(result);
// List(2) [ 22, 31 ]
```

## `dropLast(n)`

**Description**

Returns a list containing all elements except last `n` elements

**Usage**

```js
const numbers = listOf(32, 78, 56, 19, 22, 31);

const dropped = numbers.dropLast(4);

console.log(dropped);
// List(2) [ 32, 78 ]
```

## `dropLastWhile(predicate)`

**Description**

Returns a list containing all elements except last elements that satisfy the given `predicate`.

**Usage**

```js
const numbers = listOf(32, 78, 56, 19, 22, 31);

const result = numbers.dropLastWhile((it) => it > 30);

console.log(result);
// List(5) [ 32, 78, 56, 19, 22 ]
```

## `dropWhile(predicate)`

**Description**

Returns a list containing all elements except first elements that satisfy the given `predicate`.

**Usage**

```js
const numbers = listOf(32, 78, 56, 19, 22, 31);

const dropped = numbers.dropWhile((it) => it > 30);

console.log(dropped);
// List(3) [ 19, 22, 31 ]
```

## `eighth(predicate)`

**Description**

Returns the eighth element in the list, or the eighth element that matches the `predicate`.

**Note**
Throws an error if the element is not found.

**Usage**

```js
let input = listOf(32, 78, 56, 19, 22, 31, 40, 21, 29, 39, 20, 55, 43, 19, 39);

let result = input.eighth();
console.log(result);
// 21

result = input.eighth((it) => it > 30);
console.log(result);
// 43

result = input.eighth((it) => it > 40);
console.log(result);
// NoSuchElementException [Error]: No such element
```

## `eighthOrNull(predicate)`

**Description**

Returns the eighth element in the list or the eighth element that matches the `predicate`, or `null` if the element is not found.

**Usage**

```js
let numbers = listOf(
  32,
  78,
  56,
  19,
  22,
  31,
  40,
  21,
  29,
  39,
  20,
  55,
  43,
  19,
  39
);

let eighth = numbers.eighthOrNull();
console.log(eighth);
// 21

eighth = numbers.eighthOrNull((it) => it > 30);
console.log(eighth);
// 43

eighth = numbers.eighthOrNull((it) => it > 40);
console.log(eighth);
// null
```

## `elementAt(index)`

**Description**

Returns an element at the given `index` or throws an `IndexOutOfBoundsException` if the `index` is larger than the length of the list.

**Note**

Supports negative indices. If a negative index is given, it counts backwards from the end of the list.

**Usage**

```js
const numbers = listOf(32, 78, 56);

let result = numbers.elementAt(2);
console.log(result);
// 56

let result = numbers.elementAt(-2);
console.log(result);
// 78

result = numbers.elementAt(4);
console.log(result);
// IndexOutOfBoundsException [Error]: Index out of bounds: 4
```

## `elementAtOrElse(index, defaultValue)`

**Description**

Returns an element at the given `index` or the result of calling the `defaultValue` function if the `index` is out of bounds of this list.

**Note**

- Supports negative indices
- `defaultValue` can either be a function or a value

**Usage**

```js
const numbers = listOf(32, 78, 56);

let result = numbers.elementAtOrElse(2, 70);
console.log(result);
// 56

result = numbers.elementAtOrElse(4, 70);
console.log(result);
// 70

result = numbers.elementAtOrElse(4, () => Math.random());
console.log(result);
// 0.5232938553939832

let result = numbers.elementAtOrElse(-2, 70);
console.log(result);
// 78

result = numbers.elementAtOrElse(-4, 70);
console.log(result);
// 70
```

## `elementAtOrNull(index)`

**Description**

Returns an element at the given `index` or `null` if the `index` is out of bounds.

**Note**

Supports negative indices

**Usage**

```js
const input = listOf(32, 78, 56);

let result = input.elementAtOrNull(2);
console.log(result);
// 56

result = input.elementAtOrNull(4);
console.log(result);
// null

result = numbers.elementAtOrNull(-2);
console.log(result);
// 78

result = numbers.elementAtOrNull(-4);
console.log(result);
// null
```

## `equals(list)`

**Description**

Checks if two lists are equal using a deep comparison

**Usage**

```js
const numbers1 = listOf(32, listOf(22, 33), 56);
const numbers2 = listOf(32, listOf(22, 13), 56);
const numbers3 = listOf(32, listOf(22, 33), 56);

let result = numbers1.equals(numbers2);
console.log(result);
// false

result = numbers1.equals(numbers3);
console.log(result);
// true
```

## `exclude(...elements)`

**Description**

Takes in a variable number of arguments and excludes them from the list.

**Note**

Does not mutate original list. To mutate original list, use `delete()` instead.

**Usage**

```js
const input = listOf("a", "d", "b", "e", "c", "f");
const result = input.exclude("a", "b", "c");

console.log(result);
// List(3) [ 'd', 'e', 'f' ]

// Does not mutate original list
console.log(input);
// List(6) [
//   'a', 'd', 'b',
//   'e', 'c', 'f'
// ]
//
```

## `exists(predicate)`

**Description**

Checks if an item exists in the list that matches the given `predicate`

**Note**

The `predicate` can be a function or a value

**Usage**

```js
const items = listOf("apple", "carrot", "orange", "banana", "celery");

let result = items.exists("apple");
console.log(result);
// true

result = items.exists((item) => item.startsWith("c"));
console.log(result);
// true

result = items.exists((item) => item.startsWith("d"));
console.log(result);
// false
```

## `fifth(predicate)`

**Description**

Returns the fifth element in the list or the fifth element that matches the `predicate`

**Note:**
Throws an error if the element is not found.

**Usage**

```js
let input = listOf(32, 78, 56, 19, 22, 31, 40, 21, 29, 39, 20, 55, 43, 19, 39);

let result = input.fifth();
console.log(result);
// 22

result = input.fifth((it) => it > 30);
console.log(result);
// 40

result = input.fifth((it) => it > 40);
console.log(result);
// NoSuchElementException [Error]: No such element
```

## `fifthOrNull(predicate)`

**Description**

Returns the fifth element in the list or the fifth element that matches the predicate, or `null` if the element is not found

**Usage**

```js
let input = listOf(32, 78, 56, 19, 22, 31, 40, 21, 29, 39, 20, 55, 43, 19, 39);

let result = input.fifthOrNull();
console.log(result);
// 22

result = input.fifthOrNull((it) => it > 30);
console.log(result);
// 40

result = input.fifthOrNull((it) => it > 40);
console.log(result);
// null
```

## `filterEvenNumbers()`

**Description**

Returns all the even numbers in the list

**Usage**

```js
const numbers = listOf(1, 2, 4, 7, 9);

const result = numbers.filterEvenNumbers();

console.log(result);
// List(2) [ 2, 4 ]
```

## `filterFalsy(zeroTruthy=false)`

**Description**

Only returns values that are falsy.

**Params**

- `zeroTruthy` controls whether the value `0` should be treated as truthy or not. The default value of `zeroTruthy` is `false`, which means it is treated as falsy.

**Usage**

```js
let items = listOf(3, 4, null, 7, undefined, 0, 8);

let filtered = items.filterFalsy();
console.log(filtered);
// List(3) [ null, undefined, 0 ]

filtered = items.filterFalsy(true);
console.log(filtered);
// List(2) [ null, undefined ]
```

## `filterFirstNotNull()`

**Description**

Filters out the **first** `null` element, but keeps the rest

**Usage**

```js
const input = listOf(12, null, 32, null, 78, 56);

const result = input.filterFirstNotNull();

console.log(result);
// List(5) [ 12, 32, null, 78, 56 ]
```

## `filterIsInstance(className)`

**Description**

Returns a list containing all elements that are instances of the specified class

**Usage**

```js
class Animal {
  constructor(type) {
    this.type = type;
  }
}

class Dog extends Animal {
  constructor(color) {
    super("dog");
    this.color = color;
  }
}

class Insect {
  constructor(type) {
    this.type = type;
  }
}

const animals = listOf(
  new Animal("tiger"),
  new Animal("lion"),
  new Dog("grey"),
  { type: "crocodile" },
  new Animal("cheetah")
);

let result = animals.filterIsInstance(Dog);
console.log(result);
// List(1) [ Dog { type: 'dog', color: 'grey' } ]

result = animals.filterIsInstance(Animal);
console.log(result);
// List(4) [
//   Animal { type: 'tiger' },
//   Animal { type: 'lion' },
//   Dog { type: 'dog', color: 'grey' },
//   Animal { type: 'cheetah' }
// ]

result = animals.filterIsInstance(Insect);
console.log(result);
// List(0) []
```

## `filterIsInstanceTo(destinationList, className)`

**Description**

Appends all elements that are instances of specified `className` to the given `destinationList`.

**Usage**

```js
class Animal {
  constructor(type) {
    this.type = type;
  }
}

class Bird {
  constructor(type) {
    this.type = type;
  }
}

const animals = listOf(new Animal("dog"), new Animal("cat"));

const input = listOf(
  new Animal("lion"),
  new Bird("parrot"),
  new Animal("cheetah")
);

let result = input.filterIsInstanceTo(animals, Animal);

console.log(result);
// List(4) [
//   Animal { type: 'dog' },
//   Animal { type: 'cat' },
//   Animal { type: 'lion' },
//   Animal { type: 'cheetah' }
// ]
```

## `filterNot(predicate)`

**Description**

Returns a list containing all elements _not_ matching the given `predicate`.

**Usage**

```js
const input = listOf(3, 7, 9, 1, 2, 7, 8, 10);
const result = input.filterNot((it) => it > 5);

console.log(result);
// List(3) [ 3, 1, 2 ]
```

## `filterNotNull()`

**Description**

Filters out all the elements in the list that are not `null`. Keeps `undefined` values.

**Note**

To remove both `null` and `undefined` values, use `filterNotNullish()` or `filterTruthy()`

**Usage**

```js
const items = listOf(null, "apple", "carrot", undefined, null, null, "ginger");
const filtered = items.filterNotNull();

console.log(filtered);
// List(4) [ 'apple', 'carrot', undefined, 'ginger' ]
```

## `filterNotNullish()`

**Description**

Filters out all the elements in the list that are `null` or `undefined`.

**Note**

- To remove only `null` values while keeping `undefined` values, use `filterNotNull()`
- To remove only `undefined` values while keeping `null` values, use `filterNotUndefined()`

**Usage**

```js
const items = listOf(null, "apple", "carrot", undefined, null, null, "ginger");

const result = items.filterNotNullish();

console.log(result);
// List(3) [ 'apple', 'carrot', 'ginger' ]
```

## `filterNotNullTo(destination)`

**Description**

Filters out all the elements in the list that are not `undefined` and appends them to a `destination` list. Keeps `null` values.

**Usage**

```js
const items = listOf(null, "apple", "carrot", undefined, null, null, "ginger");
const list = listOf("banana", "watermelon");

const result = items.filterNotNullTo(list);

console.log(result);
// List(6) [
//   'banana',
//   'watermelon',
//   'apple',
//   'carrot',
//   undefined,
//   'ginger'
// ]
```

## `filterNotTo(destination, predicate)`

**Description**

Appends all elements not matching the given `predicate` to the given `destination`.

**Usage**

```js
const items = listOf(1, 2, 3, 6, 7, 8);
const list = listOf(4, 5);

const result = items.filterNotTo(list, (x) => x > 5);

console.log(result);
// List(5) [ 4, 5, 1, 2, 3 ]
```

## `filterNotUndefined()`

**Description**

Filters out all the elements in the list that are not `undefined`. Keeps `null` values.

**Note**

To remove both `null` and `undefined` values, use `filterNotNullish()` or `filterTruthy()`

**Usage**

```js
const items = listOf(null, "apple", "carrot", undefined, null, null, "ginger");

const result = items.filterNotUndefined();

console.log(result);
// List(6) [ null, 'apple', 'carrot', null, null, 'ginger' ]
```

## `filterOddNumbers()`

**Description**

Returns all the odd numbers in the list

**Usage**

```js
const input = listOf(1, 2, 4, 7, 9);

const result = input.filterOddNumbers();

console.log(result);
// List(2) [ 1, 7, 9 ]
```

## `filterPrimeNumbers()`

**Description**

Returns all the prime numbers in the list

**Usage**

```js
const input = listOf(16, 17, 18, 19, 20, 21, 22, 23);

let result = input.filterPrimeNumbers();

console.log(result);
// List(3) [ 17, 19, 23 ]
```

## `filterTo(destination, predicate)`

**Description**

Appends all elements matching the given `predicate` to the given `destination`.

**Usage**

```js
const items = listOf(1, 2, 3, 6, 7, 8);
const list = listOf(4, 5);

const result = items.filterTo(list, (x) => x > 5);

console.log(result);
// List(5) [ 4, 5, 6, 7, 8 ]
```

## `filterTruthy(zeroTruthy = true)`

**Description**

Filters out all values that are truthy. Value of `0` is treated as truthy by default

**Usage**

```js
const input = listOf(3, 4, null, 7, undefined, 0, 8);

let result = input.filterTruthy();
console.log(result);
// List(5) [ 3, 4, 7, 0, 8 ]

result = input.filterTruthy(false);
console.log(result);
// List(4) [ 3, 4, 7, 8 ]
```

## `first(predicate)`

**Description**

Returns the first element in the list or the first element that matches the `predicate`

**Note**
If no `predicate` is specified, returns the first value in the list.
Throws an error if element is not found.

**Usage**

```js
const input = listOf(32, 78, 56);

let result = input.first();
console.log(result);
// 32

result = input.first((it) => it > 60);
console.log(result);
// 78

result = input.first((it) => it > 80);
console.log(result);
// NoSuchElementException [Error]: No such element
```

## `firstHalf(keepMiddle = true)`

**Description**

Returns the first half of the list

**Param**
`keepMiddle` (Boolean) - if the size of the list is an odd number, controls whether the middle element of the list should be included

**Usage**

```js
const numbers = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);

let result = numbers.firstHalf();
console.log(result);
// List(5) [ 3, 4, 5, 6, 7 ]

result = numbers.firstHalf(false);
console.log(result);
// List(4) [ 3, 4, 5, 6 ]
```

## `firstNotNull()`

**Description**

Returns the first non-null value of the elements of this collection in iteration order, or throws `NoSuchElementException` if no non-null value was produced. By default, it ignores undefined values, but this behaviour can be turned off by setting the `ignoreUndefined` flag to `false`.

**Usage**

```js
const numbers = listOf(null, null, undefined, null, 39, 105);

let result = numbers.firstNotNull();
console.log(result);
// 39

result = numbers.firstNotNullOf(false);
console.log(result);
// undefined
```

## `firstNotNullOf(transform)`

**Description**

Returns the first non-null value produced by `transform` function being applied to elements of this collection in iteration order, or throws `NoSuchElementException` if no non-null value was produced.

**Usage**

```js
const users = listOf(
  { id: null, name: "Tony", isAdmin: null },
  { id: null, name: "Dave", isAdmin: null },
  { id: null, name: "Pat", isAdmin: null },
  { id: null, name: "Chris", isAdmin: null },
  { id: 39, name: "Fred", isAdmin: null },
  { id: 105, name: "George", isAdmin: null }
);

let result = users.firstNotNullOf((it) => it.id);
console.log(result);
// 39

result = users.firstNotNullOf((it) => it.isAdmin);
console.log(result);
// NoSuchElementException [Error]: No such element
```

## `firstNotNullOfOrNull(transform)`

**Description**

Returns the first non-null value produced by `transform` function being applied to elements of this collection in iteration order, or throws NoSuchElementException if no non-null value was produced.

**Usage**

```js
const users = listOf(
  { id: null, name: "Tony", isAdmin: null },
  { id: null, name: "Dave", isAdmin: null },
  { id: null, name: "Pat", isAdmin: null },
  { id: null, name: "Chris", isAdmin: null },
  { id: 39, name: "Fred", isAdmin: null },
  { id: 105, name: "George", isAdmin: null }
);

let result = users.firstNotNullOfOrNull((it) => it.id);
console.log(result);
// 39

result = users.firstNotNullOfOrNull((it) => it.isAdmin);
console.log(result);
// null
```

## `firstOfEach()`

**Description**

Returns the first element of each element in the list

```js
const input = listOf("apple", ["pear", "banana"], "carrot");

let result = input.firstOfEach();

console.log(result);
// List(3) [ 'a', 'pear', 'c' ]
```

## `firstOrNull(predicate)`

**Description**

Returns the first element in the list or the first element that matches the `predicate`

**Note**
If no `predicate` is specified, returns the first value in the list.

**Usage**

```js
const input = listOf(32, 78, 56);

let result = input.firstOrNull();
console.log(result);
// 32

result = input.firstOrNull((it) => it > 60);
console.log(result);
// 78

result = input.firstOrNull((it) => it > 80);
console.log(result);
// null
```

## `flatten(depth=1)`

**Description**

Flattens the list specified by the depth.

**Note**
This function is an alias for `flat()`

**Usage**

```js
let input = listOf([32, 78], [56, 23], listOf(21, listOf(22, 24)));

let result = input.flatten();
console.log(result);
// List(6) [ 32, 78, 56, 23, 21, 22, 24 ]

result = input.flatten(1);
console.log(result);
// List(7) [
//   32, 78, 56, 23,
//   21, List(2) [22, 24]
// ]
```

## `floor()`

**Description**

Rounds each numbers in the list down to the nearest integer

**Usage**

```js
const numbers = listOf(3.14, 4.45, -5.34, 6.98, -7.47, 8.57, -9.35, -10.22, 11);

const result = numbers.floor();

console.log(result);
// Output:
// List(9) [
//   3,   4,  -6,  6, -8,
//   8, -10, -11, 11
// ]
```

## `fold(callback, initialValue)`

###

## `forEachAsync(callback)`

###

## `fourth`

###

## `fourthOrNull`

###

## `get(index, defaultValue)`

**Description**

Returns the element at a particular `index`, or returns `defaultValue` if that index doesn't exist.

**Usage**

```js
const list = listOf("a", "b", "c");

let result = list.get(1);
console.log(result);
// b

result = list.get(-1);
console.log(result);
// c

result = list.get(2, "d");
console.log(result);
// c

result = list.get(3, "d");
console.log(result);
// d
```

## `groupBy(keySelector)`

**Description**

Groups the items in a unique key-value pair based on the key selector

**Usage**

```js
const list = listOf(
  { name: "apple", type: "fruit" },
  { name: "banana", type: "fruit" },
  { name: "celery", type: "vegetable" },
  { name: "spinach", type: "vegetable" },
  { name: "wheat", type: "grain" }
);

const result = list.groupBy((it) => it.type);

console.log(result);
// {
//   fruit: List(2) [
//     { name: 'apple', type: 'fruit' },
//     { name: 'banana', type: 'fruit' }
//   ],
//   vegetable: List(2) [
//     { name: 'celery', type: 'vegetable' },
//     { name: 'spinach', type: 'vegetable' }
//   ],
//   grain: List(1) [
//     { name: 'wheat', type: 'grain' }
//   ]
// }
```

## `groupByTo(destination, keySelector)`

**Description**

Groups the items in a unique key-value pair based on the `keySelector` and adds them to a `destination` object

**Usage**

```js
const stock = {
  fruit: [{ name: "carrot", type: "vegetable" }],
  grain: [{ name: "barley", type: "grain" }],
  legumes: [{ name: "peas", type: "legumes" }],
};

const list = listOf(
  { name: "apple", type: "fruit" },
  { name: "banana", type: "fruit" },
  { name: "celery", type: "vegetable" },
  { name: "spinach", type: "vegetable" },
  { name: "wheat", type: "grain" }
);

const result = list.groupByTo(stock, (it) => it.type);

console.log(result);
// {
//   fruit: [
//     { name: 'carrot', type: 'vegetable' },
//     { name: 'apple', type: 'fruit' },
//     { name: 'banana', type: 'fruit' }
//   ],
//   grain: [
//     { name: 'barley', type: 'grain' },
//     { name: 'wheat', type: 'grain' }
//   ],
//   legumes: [ { name: 'peas', type: 'legumes' } ],
//   vegetable: List(2) [
//     { name: 'celery', type: 'vegetable' },
//     { name: 'spinach', type: 'vegetable' }
//   ]
// }
```

## `halve(keepMiddle = true)`

**Description**

Halves the list into two and returns the two parts.

- If the list contains an odd number of elements, the middle element is added to the second list.
- To control this behaviour, set param `keepMiddle` to `false`

**Usage**

```js
const input = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);

let result = input.halve();
console.log(result);
// List(2) [
//  List(4) [ 3, 4, 5, 6 ],
//  List(5) [ 7, 8, 9, 10, 11 ]
// ]

result = input.halve(false);
console.log(result);
// List(2) [
//  List(5) [ 3, 4, 5, 6, 7 ],
//  List(4) [ 8, 9, 10, 11 ]
// ]
```

## `head(n=1)`

**Description**

Returns the first `n` elements in a list

Default value of `n` is `1`.

**Usage**

```js
const numbers = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);

let head = numbers.head();
console.log(head);
//List(1) [ 3 ]

head = numbers.head(4);
console.log(head);
// List(4) [ 3, 4, 5, 6 ]
```

## `hundredth(predicate)`

###

## `hundredthOrNull(predicate)`

###

## `ifEmpty(defaultValue)`

**Description**

If the list is empty, return the `defaultValue`. Or else returns the list.

**Usage**

```js
let numbers = listOf(3, 4, 5);

let result = numbers.ifEmpty(listOf(5, 6, 7));
console.log(result);
// List(3) [ 3, 4, 5 ]

numbers = listOf();

result = numbers.ifEmpty(listOf(5, 6, 7));
console.log(result);
// List(3) [ 5, 6, 7 ]
```

## `ifNotEmpty(defaultValue)`

**Description**

If the list is not empty, return the `defaultValue`. Or else return the list.

**Usage**

```js
let input = listOf(3, 4, 5);

let result = input.ifNotEmpty(listOf(5, 6, 7));
console.log(result);
// List(3) [ 5, 6, 7 ]

input = listOf();

result = input.ifNotEmpty(listOf(5, 6, 7));
console.log(result);
// List(0) []
```

## `includesAll(...args)`

**Description**

Returns `true` if the list includes all the specified elements, else returns `false`

**Usage**

```js
let input = listOf(3, 4, 5);
let result = input.includesAll(5, 6, 7);
console.log(result);
// false

input = listOf(3, 4, 5, 6, 7, 8);
result = input.includesAll(5, 6, 7);
console.log(result);
// true
```

## `indices`

**Description**

Returns the valid indices of the list

**Usage**

```js
let input = listOf(3, 4, 5);

let result = input.indices;

console.log(result);
// List(3) [ 0, 1, 2 ]
```

## `indicesOf(element)`

**Description**

Returns a list of indices where the `element` occurs in the list.

**Usage**

```js
const input = listOf("banana", "apple", "carrot", "grape", "apple", "peach");

let result = input.indicesOf("apple");

console.log(result);
// List(2) [ 1, 4 ]
```

## `instanceTypes(primitives = false)`

**Description**

Returns a list containing the "types" of each element in the list

**Params**

- `primitives` (Boolean) - Controls whether the function should return primitive types or class names (if they exist)

**Usage**

```js
const list = listOf(
  66,
  "666",
  1n,
  false,
  new Date(),
  undefined,
  new Set([1, 1]),
  null,
  [],
  () => {},
  class Animal {},
  +"12",
  Symbol(9)
);

const primitiveTypes = list.instanceTypes(true);
const nonPrimitiveTypes = list.instanceTypes();

console.log(primitiveTypes);
// List(13) [
//   'number',   'string',
//   'bigint',   'boolean',
//   'object',   'undefined',
//   'object',   'object',
//   'object',   'function',
//   'function', 'number',
//   'symbol'
// ]

console.log(nonPrimitiveTypes);
// List(13) [
//   'number',   'string',
//   'bigint',   'boolean',
//   'Date',     'undefined',
//   'Set',      'object',
//   'Array',    'function',
//   'function', 'number',
//   'symbol'
// ]
```

## `intersect(list)`

**Description**

Returns all the elements that exist in the given lists.

**Usage**

```js
const list1 = listOf(1, 2, 3, 4);
const list2 = listOf(2, 4, 6, 8);

let result;

result = list1.intersect(list2);
console.log(result);
// List(2) [ 2, 4 ]
```

## `intersection(list)`

**Description**

Alias for `intersect(list)`

**Usage**

```js
const list1 = listOf(1, 2, 3, 4);
const list2 = listOf(2, 4, 6, 8);

let result;

result = list1.intersection(list2);
console.log(result);
// List(2) [ 2, 4 ]
```

## `isEmpty()`

**Description**

Returns `true` if the list is empty

**Usage**

```js
let input = listOf(3, 4, 5, 6);
let result = input.isEmpty();
console.log(result);
// false

input = listOf();
result = input.isEmpty();
console.log(result);
// true
```

## `isNotEmpty()`

**Description**

Returns `true` if the list is not empty

**Usage**

```js
let input = listOf(3, 4, 5, 6);
let result = input.isNotEmpty();
console.log(result);
// true

input = listOf();
result = input.isNotEmpty();
console.log(result);
// false
```

## `joinEach(separator, prefix = "", postfix = "")`

**Params**

- `separator`
- `prefix`
- `postfix`

**Description**

Given a list of lists, joins each list with the given separator, prefix and postfix

**Usage**

```js
const input = listOf(["Foo", "Bar"], listOf("Baz", "Test"), ["Hello", "World"]);

let result = input.joinEach(":");
console.log(result);
// List(3) [ 'Foo:Bar', 'Baz:Test', 'Hello:World' ]

result = input.joinEach(":", "<b>", "</b>");
console.log(result);
// List(3) [ '<b>Foo:Bar</b>', '<b>Baz:Test</b>', '<b>Hello:World</b>' ]
```

## `joinTo(list, separator, prefix = "", postfix = "")`

**Description**

Joins a list using a `separator`, `prefix` and `postfix`, then appends that string to the end of a specified `list`.

**Usage**

```js
const input1 = listOf("Hello", "World");
const input2 = listOf("Foo", "Bar");

let result = input1.joinTo(input2, "-", "<b>", "</b>");
console.log(result);
// List(3) [ 'Foo', 'Bar', '<b>Hello-World</b>' ]
```

## `joinWith(separator, prefix = "", postfix = "")`

**Description**

Given a list of strings, joins them with the given `separator`, `prefix` and `postfix`

**Usage**

```js
let input = listOf("h", "t", "m", "l");

let result = input.joinWith("", "<", ">");

console.log(result);
// <html>
```

## `last()`

###

## `lastHalf(keepMiddle = false)`

**Description**

Returns the second half of the list

**Usage**

```js
const numbers = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);

let firstHalf = numbers.lastHalf();
console.log(firstHalf);
// List(4) [ 8, 9, 10, 11 ]

firstHalf = numbers.lastHalf(true);
console.log(firstHalf);
// List(5) [ 7, 8, 9, 10, 11 ]
```

## `lastIndex`

**Description**

Returns the last valid index of the list

**Usage**

```js
const input = listOf(3, 4, 5, 6);

let result = input.lastIndex;

console.log(result);
// 3
```

## `lastOfEach()`

**Description**

Returns the last element of each element in the list

```js
const input = listOf("apple", ["pear", "banana"], "carrot");

let result = input.lastOfEach();

console.log(result);
// List(3) [ 'e', 'banana', 't' ]
```

## lastOrNull

###

## `mapAsync`

###

## `mapNotNull(transform)`

**Description**

Performs a map on all elements in the list that are not `null` or `undefined`.

**Usage**

```js
let input = listOf(
  { id: 1, name: "John" },
  { id: 12, name: "Michael" },
  null,
  { id: 23, name: "Smith" },
  undefined,
  { id: 34, name: "David" }
);

let result = input.mapNotNull((it) => it.name);

console.log(result);
// List(4) [ 'John', 'Michael', 'Smith', 'David' ]
```

## `mapNotNullTo(destination, transform)`

**Description**

Performs a map on all elements in the list that are not null or undefined and appends it to the `destination` list

**Note**
Throws an error if the `destination` is not an `Array` or a `List`

**Usage**

```js
let input = listOf(
  { id: 1, name: "John" },
  { id: 12, name: "Michael" },
  null,
  { id: 23, name: "Smith" },
  undefined,
  { id: 34, name: "David" }
);

const list = listOf("Chris", "Jake");

let result = input.mapNotNullTo(list, (it) => it.name);

console.log(result);
// List(6) [ 'Chris', 'Jake', 'John', 'Michael', 'Smith', 'David' ]
```

## `mapTo(destination, transform)`

**Description**

Performs a `transform` on each element of the list and appends the result to a `destination` list

**Usage**

```js
let input = listOf(
  { id: 1, name: "John" },
  { id: 12, name: "Michael" },
  { id: 23, name: "Smith" }
);

const list = listOf("Chris", "Jake");

let result = input.mapTo(list, (it) => it.name);

console.log(result);
// List(5) [ 'Chris', 'Jake', 'John', 'Michael', 'Smith' ]
```

## `mapWith(list)`

**Description**

Given two lists, merges them into a `Map` where the first list contains the keys and the second list contains the values.

**Note**
This method creates a `Map`. In order to create an `Object` instead of a `Map`, use `pairWith()` instead.

**Usage**

```js
const list1 = listOf("id", "name");
const list2 = listOf(12, "Jake");

let result = list1.mapWith(list2);

console.log(result);
// Map { 'id' => 12, 'name' => 'Jake' }
```

## `match(predicate, nth = 1)`

**Description**

Returns the `nth` element in the list that matches the `predicate`, or the `nth` element in the list if no `predicate` is specified.

**Note**

Throws an error if no item matches the `predicate`

**Usage**

```js
const input = listOf(7, 8, 9, 10, 11, 12, 13);

let result = input.match((n) => n > 9, 3);
console.log(result);
// 12

result = input.match(null, 3);
console.log(result);
// 9

result = input.match((n) => n > 9, 5);
console.log(result);
// NoSuchElementException [Error]: No such element
```

## `matchOrNull(predicate, nth = 1)`

**Description**

Returns the `nth` element in the list matches the `predicate`, or `null` if such an element does not exist.

**Usage**

```js
const input = listOf(7, 8, 9, 10, 11, 12, 13);

let result = input.match((n) => n > 9, 3);
console.log(result);
// 12

result = input.match(null, 3);
console.log(result);
// 9

result = input.match((n) => n > 9, 5);
console.log(result);
// null
```

## `max()`

**Description**

Finds the largest number in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let result = input.max();

console.log(result);
// 18
```

## `maxBy(selector, findAll=false)`

**Description**

Returns the first element yielding the largest value of the given function.

If `findAll` is set `true`, returns all the elements that yield the largest value.

**Usage**

```js
const input = listOf(
  { name: "Pizza", price: 23.99 },
  { name: "Burger", price: 20.99 },
  { name: "Sushi", price: 15.99 },
  { name: "Cake", price: 15.99 },
  { name: "Kebab", price: 23.99 }
);

let result = input.maxBy((item) => item.price);
console.log(result);
// { name: 'Pizza', price: 23.99 }

result = input.maxBy((item) => item.price, true);
console.log(result);
// List(2) [
//   { name: 'Pizza', price: 23.99 },
//   { name: 'Kebab', price: 23.99 }
// ]
```

## `maxOf(selector)`

**Description**

Returns the largest value among all values produced by `selector` function applied to each element in the collection.

**Note**

The `selector` can be a function or a string.

**Usage**

```js
const input = listOf(
  { name: "Pizza", price: 23.99 },
  { name: "Burger", price: 20.99 },
  { name: "Sushi", price: 15.99 },
  { name: "Cake", price: 15.99 },
  { name: "Kebab", price: 23.99 }
);

const result = input.maxOf((item) => item.price);
console.log(result);
// 23.99

result = input.maxOf("price");
console.log(result);
// 23.99
```

## `mean()`

**Description**

Alias for `average()`

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let result = input.mean();

console.log(result);
// 3.5
```

## `median()`

**Description**

Returns the median number in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let result = input.median();

console.log(result);
// 6
```

## `min()`

**Description**

Finds the smallest number in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let result = input.min();

console.log(result);
// -17
```

## `minBy(selector, findAll=false)`

**Description**

Returns the first element yielding the smallest value of the given function.

If `findAll` is set `true`, returns all the elements that yield the smallest value.

**Usage**

```js
const items = listOf(
  { name: "Pizza", price: 23.99 },
  { name: "Burger", price: 20.99 },
  { name: "Sushi", price: 15.99 },
  { name: "Cake", price: 15.99 },
  { name: "Kebab", price: 23.99 }
);

let result = items.minBy((item) => item.price);
console.log(result);
// { name: 'Sushi', price: 15.99 }

result = items.minBy((item) => item.price, true);
console.log(result);
// List(2) [
//   { name: 'Sushi', price: 15.99 },
//   { name: 'Cake', price: 15.99 }
// ]
```

## `minOf()`

**Description**

Returns the smallest value among all values produced by `selector` function applied to each element in the collection.

**Usage**

```js
const input = listOf(
  { name: "Pizza", price: 23.99 },
  { name: "Burger", price: 20.99 },
  { name: "Sushi", price: 15.99 },
  { name: "Cake", price: 15.99 },
  { name: "Kebab", price: 23.99 }
);

const result = input.minOf((item) => item.price);

console.log(result);
// 15.99
```

## `minmax()`

**Description**

Returns an `Object` containing the smallest and the largest numbers in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let result = input.minmax();

console.log(result);
// { min: -17, max: 18 }
```

## `minmaxBy(selector, findAll=false)`

**Description**

Returns an object containing first elements yielding both the smallest and largest values of the given function applied to the list.

If `findAll` is set `true`, returns all the elements that yield the values.

**Usage**

```js
const input = listOf(
  { name: "Pizza", price: 23.99 },
  { name: "Burger", price: 20.99 },
  { name: "Sushi", price: 15.99 },
  { name: "Cake", price: 15.99 },
  { name: "Kebab", price: 23.99 }
);

let result = input.minmaxBy((item) => item.price);
console.log(result);
// {
//   min: { name: 'Sushi', price: 15.99 },
//   max: { name: 'Pizza', price: 23.99 }
// }

result = input.minmaxBy((item) => item.price, true);
console.log(result);
// {
//   min: List(2) [
//     { name: 'Sushi', price: 15.99 },
//     { name: 'Cake', price: 15.99 }
//   ],
//   max: List(2) [
//     { name: 'Pizza', price: 23.99 },
//     { name: 'Kebab', price: 23.99 }
//   ]
// }
```

## `minmaxOf(selector)`

**Description**

Returns an `Object` containing the smallest and largest values among all values produced by `selector` function applied to each element in the collection.

**Usage**

```js
const input = listOf(
  { name: "Pizza", price: 23.99 },
  { name: "Burger", price: 20.99 },
  { name: "Sushi", price: 15.99 },
  { name: "Cake", price: 15.99 },
  { name: "Kebab", price: 23.99 }
);

let result = input.minmaxOf((item) => item.price);
console.log(result);
// { min: 15.99, max: 23.99 }
```

## `minus(...elements)`

**Description**

Returns a list with all the specified elements excluded

**Note**

This function is an alias for `exclude()`

**Usage**

```js
const input = listOf(2, 4, 6, 8, 10, 12);

let result = input.minus(6, 10, 12);

console.log(result);
// List(3) [ 2, 4, 8 ]
```

## `mode()`

**Description**

Returns the most frequently occuring element in the list

**Usage**

```js
const input = listOf("apple", "banana", "lettuce", "carrot", "banana");

let result = input.mode();

console.log(result);
// banana
```

## `multiplyBy(number)`

**Description**

Multiplies each number in the list with a given `number`.
If the `number` argument is a `List` or an `Array`, multiplies each number in the list with the corresponding number in the supplied list

**Usage**

```js
const input = listOf(3, 7, 5);

let result = input.multiplyBy(4);
console.log(result);
// List(3) [ 12, 28, 20 ]

result = input.multiplyBy([2, 3, 4]);
console.log(result);
// List(3) [ 6, 21, 20 ]
```

## ninth

###

## ninthOrNull

###

## `none(predicate)`

**Description**

Returns `true` if none of the items match the given `predicate`, else returns `false`. If no `predicate` is provided, returns `true` if the list is empty, else returns `false`.

**Usage**

```js
const input = listOf(4, 5, 6);

let result = input.none((item) => item > 7);
console.log(result);
// true

result = input.none((item) => item > 5);
console.log(result);
// false

result = input.none();
console.log(result);
// false

result = input.none(5);
console.log(result);
// false

result = input.none(7);
console.log(result);
// true
```

## `nthLargest(n)`

**Description**

Returns the `nth` largest number in the list

**Usage**

```js
const list = listOf(3, 4, 5, 6, 6, 6, 7, 7);

let output = list.nthLargest(2);
console.log(output);
// 6

output = list.nthLargest(10);
console.log(output);
// undefined
```

## `nthLargestOf(selector, n)`

**Description**

Returns the `nth` largest number in the list created by applying the `selector` function.

**Usage**

```js
const input = listOf(
  { name: "Pizza", price: 23 },
  { name: "Burger", price: 20 },
  { name: "Sushi", price: 15 },
  { name: "Cake", price: 18 },
  { name: "Kebab", price: 23 }
);

let result = input.nthLargestOf((item) => item.price, 2);

console.log(result);
// { name: "Burger", price: 20 }
```

## `nthOfEach(n)`

**Description**

Returns the `nth` element of each element in the list

**Usage**

```js
const input = listOf(["a", "b", "c"], ["d", "a", "f"], "test");

result = input.nthOfEach(1);

console.log(result);
// List(3) [ 'b', 'a', 'e' ]
```

## `nthSmallest(n)`

**Description**

Returns the `nth` smallest number in the list

**Usage**

```js
const list = listOf(3, 4, 5, 6, 6, 6, 7, 7);

let output = list.nthSmallest(2);
console.log(output);
// 4

output = list.nthSmallest(10);
console.log(output);
// undefined
```

## `nthSmallestOf(selector, n)`

**Description**

Returns the `nth` smallest element in the list created by applying the `selector` function.

**Usage**

```js
const input = listOf(
  { name: "Pizza", price: 23 },
  { name: "Burger", price: 20 },
  { name: "Sushi", price: 15 },
  { name: "Cake", price: 18 },
  { name: "Kebab", price: 23 }
);

let result = input.nthSmallestOf((item) => item.price, 2);

console.log(result);
// { name: "Cake", price: 18 }
```

## `onEach(callback)`

**Description**

Performs the given action on each element and returns the list itself afterwards.

**Usage**

```js
const input = listOf(4, 5, 10, 20);
const squared = listOf();

let result = input.onEach((it) => squared.push(it ** 2));

console.log(result);
// List(4) [ 4, 5, 10, 20 ]

console.log(squared);
// List(4) [ 16, 25, 100, 400 ]
```

## `pairWith(list)`

**Description**

Given two lists, merges them into an `Object` where the first list contains the keys and the second list contains the values.

**Usage**

```js
const list1 = listOf("fruit", "animal", "test");
const list2 = listOf("apple", "dog", "test123");

result = list1.pairWith(list2);

console.log(result);
// { fruit: 'apple', animal: 'dog', test: 'test123' }
```

## `partition(predicate)`

**Description**

Splits the original list into a pair of lists, where the first list contains elements for which `predicate` yielded `true`, while the second list contains elements for which `predicate` yielded `false`.

**Usage**

```js
const input = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9);

result = input.partition((it) => it > 5);

console.log(result);
// List(2) [
//   List(4) [ 6, 7, 8, 9 ],
//   List(5) [ 1, 2, 3, 4, 5 ]
// ]
```

## `plus(...elements)`

**Description**

Adds all the specified elements to the list

**Usage**

```js
const input = listOf("a", "b", "c");

const result = input.plus("d", "e", "f");

console.log(result);
// List(6) [ 'a', 'b', 'c', 'd', 'e', 'f' ]
```

## `postfix(string)`

**Description**

Postfixes each element in the list with a specified string

**Usage**

```js
const input = listOf("John", "Michael", 1234);

const result = input.postfix(": Name");

console.log(result);
// List(3) [ 'John: Name', 'Michael: Name', '1234: Name' ]
```

## `power(number)`

**Description**

Raises each number in the list to the power of the specified `number`

**Usage**

```js
const input = listOf(2, 4, 6);

let result = input.power(3);

console.log(result);
// List(3) [ 8, 64, 216 ]
```

## `prefix(string)`

**Description**

Prefixes each element in the list with a specified string

**Usage**

```js
const numbers = listOf("John", "Michael", 1234);

const result = numbers.prefix("Name: ");

console.log(result);
// List(3) [ 'Name: John', 'Name: Michael', 'Name: 1234' ]
```

## `product(initialValue = 1)`

**Description**

Returns the multiplication of all the numbers in the list. If an `initialValue` is provided, multiplies the the product of the numbers with the `initialValue`.

**Usage**

```js
const input = listOf(4, 5, 10, 20);

let result = input.product();
console.log(result);
// 4000

result = input.product(5);
console.log(result);
// 20000
```

## `productOf()`

**Description**

Returns the multiplication of all the numbers in the list.

**Usage**

```js
const input = listOf(4, 5, 10, 20);

let result = input.product();

console.log(result);
// 4000
```

## `random()`

**Description**

Returns a randomly chosen element within the list

**Note**

This function only returns one randomly chosen element. To return multiple randomly chosen elements, use `sample()` instead.

**Usage**

```js
const input = listOf("apple", "banana", "lettuce", "carrot");

let result = input.random();
console.log(result);
// banana

result = input.random();
console.log(result);
// lettuce
```

## `range()`

**Description**

Returns a list of numbers counting from `start` to `end` (non-inclusive).

**Note**
The list must contain only 2 elements, both of which are numbers.

```js
let input, result;

input = listOf(4, 10);
result = input.range();
console.log(result);
// List(6) [
//   4, 5,  6, 7,
//   8, 9
// ]

input = listOf(10, -4);
result = input.range();
console.log(result);
// List(14) [
//   10,  9,  8, 7, 6,  5,
//    4,  3,  2, 1, 0, -1,
//   -2, -3
// ]

input = listOf("a", 2);
result = input.range();
console.log(result);
// Error: Invalid list parameters
```

## `repeat(n=1)`

**Description**

Repeats the list `n` number of times and returns the result

**Usage**

```js
const input = listOf("a", "b", "c");

let result = input.repeat(3);

console.log(result);
// List(9) [
//   'a', 'b', 'c',
//   'a', 'b', 'c',
//   'a', 'b', 'c'
// ]
```

## `replace(element, value, count = -1)`

**Description**

Replaces every occurence of an element in a list with a new value

**Params**

- `element` - the element to replace
- `value` - the value to replace with
- `count` - indicates how many elements to replace, default is `-1` which indicates replace all

**Usage**

```js
const input = listOf("a", "b", "c", "a", "b");
let result = input.replace("a", "d");
console.log(result);
// List(5) [ 'd', 'b', 'c', 'd', 'b' ]

result = input.replace("a", "d", 1);
console.log(result);
// List(5) [ 'd', 'b', 'c', 'a', 'b' ]
```

## `round()`

**Description**

Rounds all the numbers in the list to the nearest integer

**Usage**

```js
const numbers = listOf(3.14, 4.45, -5.34, 6.98, -7.47, 8.57, -9.35, -10.22, 11);

const result = numbers.round();
console.log(result);
// List(9) [
//   3,  4,  -5,  7, -7,
//   9, -9, -10, 11
// ]
```

## `sample(sampleSize, allowRepeats = true)`

**Description**

Returns a randomly chosen sample of elements within the list.

**Note**

If `allowRepeats` is set to `false`, `sampleSize` cannot be greater than the list length, or else an error will be thrown

**Usage**

```js
const input = listOf("apple", "banana", "carrot", "lettuce", "eggplant");

let result = input.sample(3);
console.log(result);
// List(3) [ 'lettuce', 'eggplant', 'apple' ]

result = input.sample(7);
console.log(result);
// List(7) [
//   'lettuce', 'carrot',
//   'apple',   'apple',
//   'banana',  'lettuce',
//   'carrot'
// ]

result = input.sample(3, false);
console.log(result);
// List(3) [ 'eggplant', 'banana', 'carrot' ]

result = input.sample(6, false);
console.log(result);
// Error: Sample size '6' is greater than list length '5'
```

## `scan(operation, initialValue = 0)`

**Description**

Returns a list containing successive accumulation values generated by applying operation from left to right to each element and current accumulator value that starts with an initial value.

**Note**

This function is similar to performing a `reduce` operation on an array, except that it returns the result of each accumulated operation.

**Usage**

```js
const input = listOf(1, 2, 3, 4, 5);

let result = input.scan((acc, cur) => acc + cur, 0);

console.log(result);
// List(6) [ 0, 1, 3, 6, 10, 15 ]
```

## `search(query, caseSensitive=false)`

**Description**

Searches for a string in an array and returns the search results as a list

**Usage**

```js
const input = listOf(
  "Chocolate milkshake",
  "Chocolate cake",
  "Cream crumpets",
  "Cream fraiche",
  "Almond chocolate croissant"
);

// Case insensitive
let result = input.search("Chocolate");
console.log(result);
// List(3) [
//   'Chocolate milkshake',
//   'Chocolate cake',
//   'Almond chocolate croissant'
// ]

// Case sensitive
result = input.search("Chocolate", true);
console.log(result);
// List(2) [ 'Chocolate milkshake', 'Chocolate cake' ]
```

## `second()`

###

## `secondHalf(keepMiddle=false)`

**Description**

Returns the second half of the list.

**Note**

By default, if the list contains an odd number of elements, the middle value will not be included in the resultant list. To control this behaviour, set `keepMiddle` to `true`.

**Usage**

```js
const input = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);

let result = input.secondHalf();
console.log(result);
// List(4) [ 8, 9, 10, 11 ]

result = input.secondHalf(true);
console.log(result);
// List(5) [ 7, 8, 9, 10, 11 ]
```

## `secondOrNull(predicate)`

###

## `segment(parts)`

**Description**

Splits a list down into a number of smaller parts as specified by `parts`

**Note**

This method is different from `chunked()`, which splits the list into equal-sized chunks

**Usage**

```js
const input = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);

let result = input.segment(3);
console.log(result);
// List(3) [
//   List(4) [ 1, 2, 3, 4 ],
//   List(4) [ 5, 6, 7, 8 ],
//   List(4) [ 9, 10, 11, 12 ]
// ]

result = input.segment(4);
console.log(result);
// List(4) [
//   List(3) [ 1, 2, 3 ],
//   List(3) [ 4, 5, 6 ],
//   List(3) [ 7, 8, 9 ],
//   List(3) [ 10, 11, 12 ]
// ]
```

## seventh

###

## seventhOrNull

###

## `shuffled()`

**Description**

Returns a new list with its original elements randomly shuffled

**Usage**

```js
const input = listOf("a", "b", "c", "d", "e", "f");

let result = input.shuffled();

console.log(result);
// List(6) [ 'b', 'a', 'd', 'c', 'f', 'e' ]
```

## `single(predicate)`

**Description**

Returns the single element matching the given predicate, or throws exception if there is none or more than one matching element.

**Usage**

```js
const input = listOf(3, 4, 5, 6);

let result = input.single((it) => it > 5);
console.log(result);
// 6

result = input.single((it) => it > 4 && it < 6);
console.log(result);
// 5

result = input.single((it) => it < 6);
console.log(result);
// Error: NoSuchElementException [Error]: No single element matches the given predicate Found: (3)

result = input.single((it) => it < 3);
console.log(result);
// Error: NoSuchElementException [Error]: No single element matches the given predicate Found: (0)
```

## `singleOrNull(predicate)`

**Description**

Returns the single element matching the given predicate, or returns `null` if there is none or more than one matching element.

**Usage**

```js
const input = listOf(3, 4, 5, 6);

let result = input.singleOrNull((it) => it > 5);
console.log(result);
// 6

result = input.singleOrNull((it) => it > 4 && it < 6);
console.log(result);
// 5

result = input.singleOrNull((it) => it < 6);
console.log(result);
// null

result = input.singleOrNull((it) => it < 3);
console.log(result);
// null
```

## sixth

###

## sixthOrNull

###

## `size`

###

## `sortBy(selector)`

**Description**

**Usage**

```js
const users = listOf(
  { id: 39, name: "Fred" },
  { id: 105, name: "George" },
  { id: 1, name: "Tony" },
  { id: 17, name: "Dave" },
  { id: 28, name: "Pat" },
  { id: 7, name: "Chris" }
);

const result = users.sortBy((it) => it.id);

console.log(result);
// List(6) [
//   { id: 1, name: 'Tony' },
//   { id: 7, name: 'Chris' },
//   { id: 17, name: 'Dave' },
//   { id: 28, name: 'Pat' },
//   { id: 39, name: 'Fred' },
//   { id: 105, name: 'George' }
// ]
```

## `sortByDescending(selector)`

###

```js
const users = listOf(
  { id: 39, name: "Fred" },
  { id: 105, name: "George" },
  { id: 1, name: "Tony" },
  { id: 17, name: "Dave" },
  { id: 28, name: "Pat" },
  { id: 7, name: "Chris" }
);

const result = users.sortByDescending((it) => it.id);

console.log(result);
// List(6) [
//   { id: 105, name: 'George' },
//   { id: 39, name: 'Fred' },
//   { id: 28, name: 'Pat' },
//   { id: 17, name: 'Dave' },
//   { id: 7, name: 'Chris' },
//   { id: 1, name: 'Tony' }
// ]
```

## `sortNumbers()`

**Description**

Given a list of numbers, sorts them in ascending order.

**Note**

The default JavaScript `sort()` method does not sort numbers correctly without specifying a sort operation. For example:

```js
const input = listOf(10, 1, -1, 100, -10);
let result = input.sort();
```

Will result in:

```js
console.log(result);
// List(5) [ -1, -10, 1, 10, 100 ]
```

Which is incorrect.

This function `sortNumbers()` sorts the numbers correctly, as follows.

**Usage**

```js
const input = listOf(10, 1, -1, 100, -10);

let result = input.sortNumbers();

console.log(result);
// List(5) [ -10, -1, 1, 10, 100 ]
```

## `sortNumbersDescending()`

**Description**

Given a list of numbers, sorts them in descending order

```js
const input = listOf(10, 1, -1, 100, -10);

let result = input.sortNumbersDescending();

console.log(result);
// List(5) [ 100, 10, 1, -1, -10 ]
```

## `sortedBy(selector)`

**Description**

Alias for `sortBy()`

## sortedByDescending

**Description**

Alias for `sortByDescending()`

## `splitEach(...separators)`

**Description**

Given a list of separators, splits each string in the list at each of the given separators

**Usage**

```js
const input = listOf("Foo:Bar", "Baz:Test", "Hello_World");

let result = input.splitEach(":");
console.log(result);
// List(3) [
//   List(2) [ 'Foo', 'Bar' ],
//   List(2) [ 'Baz', 'Test' ],
//   List(1) [ 'Hello_World' ]
// ]

result = input.splitEach(":", "_");
console.log(result);
// List(3) [
//   List(2) [ 'Foo', 'Bar' ],
//   List(2) [ 'Baz', 'Test' ],
//   List(2) [ 'Hello', 'World' ]
// ]
```

## `stdev()`

**Description**

Calculates the standard deviation of a list of numbers

**Usage**

```js
const input = listOf(5, 17, -15, 3, 1, 8);

let result = input.stdev();

console.log(result);
// 9.598900399987954
```

## `subList(fromIndex, toIndex)`

**Description**

Creates a sub list based on the `fromIndex` and `toIndex`

**Note**
This method is an alias for JavaScript `slice()`

**Usage**

```js
const input = listOf(16, 17, 18, 19, 20, 21, 22, 23);

let result = input.subList(3, 7);

console.log(result);
// List(4) [ 19, 20, 21, 22 ]
```

## `sum(initialValue = 0)`

**Description**

Returns the sum of all numbers in a list, plus an optional `initialValue` if one is provided

**Usage**

```js
const input = listOf(5, 17, -15, 3, 1, 8);

let result = input.sum();
console.log(result);
// 19

result = input.sum(5);
console.log(result);
// 24
```

## `sumOf(selector, initialValue = 0)`

**Description**

Returns the sum of all values produced by `selector` function applied to each element in the collection.

**Note**

- The `selector` can be a function or a string.
- The `initialValue` is added to the final sum and is `0` by default.

**Usage**

```js
const order = listOf(
  { name: "Pizza", price: 23 },
  { name: "Burger", price: 20 },
  { name: "Sushi", price: 15 },
  { name: "Cake", price: 15 },
  { name: "Kebab", price: 23 }
);

let total = order.sumOf((item) => item.price);
console.log(total);
// 96

total = order.sumOf((item) => item.price, 4);
console.log(total);
// 100

total = order.sumOf("price");
console.log(total);
// 96

total = order.sumOf("price", 4);
console.log(total);
// 100
```

## `tail(n=1)`

**Description**

Returns the last `n` elements in a list

**Usage**

```js
const numbers = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);

let tail = numbers.tail();
console.log(tail);
// List(1) [ 11 ]

tail = numbers.tail(4);
console.log(tail);
// List(4) [ 8, 9, 10, 11 ]
```

## `take(n)`

**Description**

Returns a list containing first `n` elements.

**Note**

This function is an alias for `head()`

**Usage**

```js
const input = listOf(3, 4, 5, 6, 7);

let result = input.take(3);

console.log(result);
// List(3) [ 3, 4, 5 ]
```

###

## `takeLast(n)`

**Description**

Returns a list containing last `n` elements.

**Note**

This function is an alias for `tail()`

**Usage**

```js
const input = listOf(3, 4, 5, 6, 7);

let result = input.takeLast(3);

console.log(result);
// List(3) [ 5, 6, 7 ]
```

###

## `takeLastWhile(predicate)`

**Description**

Returns a list containing the last elements satisfying the given `predicate`.

**Usage**

```js
const input = listOf(2, 4, 6, 3, 8, 10);

let result = input.takeLastWhile((it) => it % 2 === 0);

console.log(result);
// List(2) [ 8, 10 ]
```

## `takeWhile(predicate)`

**Description**

Returns a list containing the first elements satisfying the given `predicate`.

**Usage**

```js
const input = listOf(2, 4, 6, 3, 8, 10);

let result = input.takeWhile((it) => it % 2 === 0);

console.log(result);
// List(3) [ 2, 4, 6 ]
```

## tenth

###

## tenthOrNull

###

## third

###

## thirdOrNull

###

## `toArray()`

**Description**

Converts a list to an array

**Usage**

```js
const list = listOf(1, 2, 3, 4);

const output = list.toArray();
console.log(output);
// [ 1, 2, 3, 4 ]

console.log(Array.isArray(output));
// true

console.log(List.isList(output));
// false
```

## `toBoolean()`

**Description**

Casts each item in the list to Boolean

**Usage**

```js
const input = listOf(
  1,
  0,
  "true",
  "test",
  false,
  undefined,
  null,
  "hello",
  true
);

let result = input.toBoolean();
console.log(result);
// List(9) [
//   true,  false, true,
//   true,  false, false,
//   false, true,  true
// ]
```

## `toEnglish()`

**Description**

Converts a list of numbers into their full english forms.

**Usage**

```js
const numbers = listOf(60, 3.5, 111111, 323_975_291_397, -77.97);

let result = numbers.toEnglish();

console.log(result);
// List(5) [
//   'Sixty',
//   'Three Point Five',
//   'One Hundred and Eleven Thousand, One Hundred and Eleven',
//   'Three Hundred and Twenty Three Billion, Nine Hundred and Seventy Five Million, Two Hundred and Ninety One Thousand, Three Hundred and Ninety Seven',
//   'Minus Seventy Seven Point Nine Seven'
// ]
```

## `toFixed(digits)`

**Description**

Sets the decimal places of each number in the list

**Usage**

```js
const numbers = listOf(2.34324, 9.6735, -0.5656, 99.998);

const result = numbers.toFixed(2);

console.log(result);
// List(4) [ '2.34', '9.67', '-0.57', '100.00' ]
```

## `toLowerCase()`

**Description**

Converts all elements in the list to lower case

**Usage**

```js
const input = listOf("Apple", "Banana", "CARROT");
const result = input.toLowerCase();
console.log(result);
// List(3) [ 'apple', 'banana', 'carrot' ]
```

## `toMap()`

**Description**

Converts a list of lists to a map

**Usage**

```js
const numbers = listOf(["a", 1], ["b", 2], ["c", 3]);

let result = numbers.toMap();

console.log(result);
// Map { 'a' => 1, 'b' => 2, 'c' => 3 }
```

## `toObject()`

**Description**

Converts a list of lists to an object

**Usage**

```js
const input = listOf(["a", 1], ["b", 2], ["c", 3]);

let result = input.toObject();

console.log(result);
// { a: 1, b: 2, c: 3 }
```

## `toUpperCase()`

**Description**

Converts all elements in the list to upper case

**Usage**

```js
const input = listOf("Apple", "Banana", "CARROT");
const result = input.toUpperCase();
console.log(result);
// List(3) [ 'APPLE', 'BANANA', 'CARROT' ]
```

## `trimEach()`

**Description**

Trims each string in the list off its trailing whitespace

**Usage**

```js
const input = listOf("   foo", "  bar   ", "baz    ", "   te st");

const result = input.trimEach();

console.log(result);
// List(4) [ 'foo', 'bar', 'baz', 'te st' ]
```

## `union(list)`

**Description**

Returns a `List` containing a union of all distinct elements from both lists.

**Usage**

```js
const list1 = listOf(3, 4, 5, 6, 7);
const list2 = listOf(5, 6, 7, 8, 9);

let result = list1.union(list2);

console.log(result);
// List(7) [
//   3, 4, 5, 6,
//   7, 8, 9
// ]
```

## `unique()`

**Description**

Returns all the unique elements in the list as a `List`.

**Usage**

```js
const fruits = listOf("apple", "apple", "orange", "banana", "banana", "pear");

const unique = fruits.unique();

console.log(unique);
// List(4) [ 'apple', 'orange', 'banana', 'pear' ]
```

## `unzip()`

**Description**

Given a list of lists, pairs each value in the first list with corresponding values in subsequent lists.

**Note**

If the lists are of different sizes, the value of `undefined` will be stored in the place of the missing values.

**Usage**

```js
const numbers = listOf([20, 30], listOf(40, 50), [-70]);

let result = numbers.unzip();

console.log(result);
// List(2) [ [ 20, 40, -70 ], [ 30, 50, undefined ] ]
```

## `windowed(size, step=1, partialWindows=false)`

**Description**

Returns a list of snapshots of the window of the given `size` sliding along this collection with the given `step`, where each snapshot is a list.

**Params**

- `size` - the number of elements to take in each window

- `step` - the number of elements to move the window forward by on an each step, by default 1

- `partialWindows` - controls whether or not to keep partial windows in the end if any, by default `false` which means partial windows won't be preserved

**Usage**

```js
const input = listOf(1, 2, 3, 4, 5, 6);

let result = input.windowed(3);
console.log(result);
// List(4) [
//   List(3) [ 1, 2, 3 ],
//   List(3) [ 2, 3, 4 ],
//   List(3) [ 3, 4, 5 ],
//   List(3) [ 4, 5, 6 ]
// ]

result = input.windowed(3, 2);
console.log(result);
// List(2) [
//   List(3) [ 1, 2, 3 ],
//   List(3) [ 3, 4, 5 ]
// ]

result = input.windowed(3, 2, true);
console.log(result);
// List(3) [
//   List(3) [ 1, 2, 3 ],
//   List(3) [ 3, 4, 5 ],
//   List(2) [ 5, 6 ]
// ]
```

## `zip(...lists)`

**Description**

Given two or more lists, returns "pairs" of one element in one list with another element in the other list

**Note**

If the lists are of different sizes, the resulting list will be the length of the original list. All other elements will be dropped.

**Usage**

```js
const list1 = listOf("fruit", "animal", "test");
const list2 = listOf("apple", "dog", "test123");
const list3 = listOf("banana", "cat", "test456", "hello world");

let result = list1.zip(list2);
console.log(result);
// List(3) [
//   List(2) [ 'fruit', 'apple' ],
//   List(2) [ 'animal', 'dog' ],
//   List(2) [ 'test', 'test123' ]
// ]

result = list1.zip(list2, list3);
console.log(result);
// List(3) [
//   List(3) [ 'fruit', 'apple', 'banana' ],
//   List(3) [ 'animal', 'dog', 'cat' ],
//   List(3) [ 'test', 'test123', 'test456' ]
// ]
```

## `List.isList(object)` (static)

**Description**

Checks if the given object is a `List`.

**Usage**

```js
let input = listOf(1, 2, 3, 4);
let result = List.isList(input);
console.log(result);
// true

input = [1, 2, 3, 4];
result = List.isList(input);
console.log(result);
// false

input = [1, 2, 3, 4];
result = List.isArray(input);
console.log(result);
// true

input = listOf(1, 2, 3, 4);
result = Array.isArray(input);
console.log(result);
// true
```

## `List.range()`

## `List.from(object)`

**Description**

**Note**

Similar to `Array.from()`, but converts into a `List` instead of an array.

**Usage**

```js
let input = "foo";
let result = List.from(input);
console.log(result);
// List(3) [ 'f', 'o', 'o' ]

input = new Set([1, 2, 3, 4]);
result = List.from(input);
console.log(result);
// List(4) [ 1, 2, 3, 4 ]

let map = new Map();
map.set("a", 1);
map.set("b", 2);
result = List.from(map);
console.log(result);
// List(2) [ [ 'a', 1 ], [ 'b', 2 ] ]

input = listOf(1, 2, 3, 4);
result = List.from(input, (x) => x * 2);
console.log(result);
// List(4) [ 2, 4, 6, 8 ]
```
