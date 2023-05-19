# List.JS (Array Extended)

## How to declare a list

There are several ways to declare a list.

You can declare a list using a constructor.

**Usage**

```js
const { List } = require("./List.js");

const list = new List(1, 2, 3, 4);
console.log(list);
// List(4) [ 1, 2, 3, 4 ]
```

You can also use the `listOf` function, similar to Kotlin.

**Usage**

```js
const { listOf } = require("./List.js");

const list = listOf("a", "b", "c", "d");
console.log(list);
// List(4) [ 'a', 'b', 'c', 'd' ]
```

You can also convert a JavaScript array to a list.

**Usage**

```js
require("./List.js");

const array = [9, 8, 7, 6];
const list = array.toList();
console.log(list);
// List(4) [ 9, 8, 7, 6 ]
```

## Why List.JS?

JavaScript array lacks a lot of functionality to manipulate and modify existing array.

The `List` object extends the `Array` object, so all functionality that is available on a regular JavaScript array is available on the `List`.

## Functions

## `add(...elements)`

**Description**
Adds elements to the list and returns the list.

**Usage**

**Usage**

```js
const input = listOf("a", "b", "c");
const output = input.add("d", "e");
console.log(output);
// List(4) [ 'a', 'b', 'c', 'd', 'e' ]
```

## `all(predicate, thisArg = undefined)`

**Description**
Checks whether _all_ the elements in the list matches a given `predicate`

**Usage**

**Usage**

```js
const input = listOf(4, 5, 6);
let output = input.all((item) => item > 3);
console.log(output);
// true

output = input.all((item) => item > 5);
console.log(output);
// false
```

## `any(predicate, thisArg = undefined)`

**Description**
Checks whether _any_ of the elements in the list matches a given element

**Usage**

```js
const input = listOf(4, 5, 6);
let output = input.any((item) => item > 7);
console.log(output);
// false

output = input.any((item) => item > 5);
console.log(output);
// true
```

## `associate(transform)`

**Description**
Returns an object containing key-value pairs provided by transform function applied to each elements of the list

**Usage**

```js
const input = listOf("apple", "banana", "orange");
let output = input.associate((item) => item.toUpperCase());

console.log(output);
// { apple: 'APPLE', banana: 'BANANA', orange: 'ORANGE' }
```

## `associateWith(valueSelector)`

**Description**
Returns a `Map` where keys are elements from the given collection and values are produced by the valueSelector function applied to each element.

**Usage**

```js
const fruits = listOf(
  { name: "apple", type: "fruit" },
  { name: "banana", type: "fruit" },
  { name: "brocolli", type: "vegetable" }
);
let associated = list.associateWith((fruit) => fruit.type);

console.log(associated);
// Map {
//   { name: 'apple', type: 'fruit' } => 'fruit',
//   { name: 'banana', type: 'fruit' } => 'fruit',
//   { name: 'brocolli', type: 'vegetable' } => 'vegetable'
// }
```

###

## `binarySearch(element, fromIndex = 0, toIndex = this.length)`

**Description**
Performs a binary search on a sorted list of elements and returns the index of the search result

**Usage**

```js
const numbers = listOf(8, 34, 56, 89, 105);
const result = numbers.binarySearch(56);
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
Capitalizes the first letter of each word in the list

**Usage**

```js
const input = listOf("apple", "baNANA", "CARROT");

const output = input.capitalize();

console.log(output);
// List(3) [ 'Apple', 'Banana', 'Carrot' ]
```

## `ceil()`

**Description**
Rounds up all the numbers in the list

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

const output = input.chunked(2);

console.log(output);
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

const output = input.compact();

console.log(output);
// List(6) [ 1, 4, 8, 'test', 'foo', true ]
```

## `contains(...elements)`

**Description**
Checks if the list contains any of the given elements

**Usage**

```js
const input = listOf(2, 6, 9, -1, 3);

let output = input.contains(7, -1, 8);
console.log(output);
// true

output = input.contains(7, -2, 8);
console.log(output);
// false
```

## `containsAll(...elements)`

**Description**
Checks if a list contains all of the given elements

**Usage**

```js
const numbers = listOf(2, 6, 9, -1, 3);
let contains = numbers.containsAll(2, -1, 3);
console.log(contains);
// true

contains = numbers.containsAll(2, -1, 8);
console.log(contains);
// false
```

## `count(predicate)`

**Description**
Returns the number of elements matching a given `predicate`.

- If the `predicate` is a function, returns the number of instances for which the function returns `true`.
- If the `predicate` is a value, counts the number of occurences in the list.
- If no `predicate` is provided, returns the length of the list.

**Usage**

```js
const input = listOf(2, 6, 9, -1, 3, 2, 2, 5);
let output;

output = input.count();
console.log(output);
// 8

output = input.count((it) => it > 5);
console.log(output);
// 2

output = input.count(2);
console.log(output);
// 3
```

## `counts()`

**Description**
Counts unique occurences in the list and returns them as an object

**Usage**

```js
const input = listOf("apple", "apple", "orange", "banana", "banana", "banana");

const output = input.counts();

console.log(output);

// { apple: 2, orange: 1, banana: 3 }
```

## `delete(...elements)`

**Description**
Deletes any given number of elements from a list.

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
Finds all the elements that are _not_ common to both lists

**Note**
Opposite of `intersection()`

**Usage**

```js
const fruits1 = listOf("apple", "orange", "banana", "pear");
const fruits2 = listOf("peach", "apple", "orange", "plum");

const difference = fruits1.difference(fruits2);

console.log(difference);
// List(4) [ 'peach', 'plum', 'banana', 'pear' ]
```

## `distinct()`

**Description**
Returns all the unique elements in the list

**Note**
This is the same as the `unique()` function, except that it returns a `List` object instead of a `Set`

**Usage**

```js
const input = listOf("apple", "apple", "orange", "banana", "banana", "pear");

const output = input.distinct();

console.log(output);
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

const output = input.distinctBy((item) => item.name);

console.log(output);
// List(4) [
//   { id: 3, name: 'apple' },
//   { id: 5, name: 'orange' },
//   { id: 19, name: 'banana' },
//   { id: 32, name: 'pear' }
// ]
```

## `divide(number)`

**Description**
Divides each element in the list with a given `number`

**Usage**

```js
const input = listOf(32, 78, 56, 19, 22, 31);

const output = input.divide(4);

console.log(output);
// List(6) [ 8, 19.5, 14, 4.75, 5.5, 7.75 ]
```

## `drop(n)`

**Description**
Returns a list containing all elements except first `n` elements

**Usage**

```js
const input = listOf(32, 78, 56, 19, 22, 31);

const output = input.drop(4);

console.log(output);
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

const dropped = numbers.dropLastWhile((it) => it > 30);

console.log(dropped);
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

let output = input.eighth();
console.log(output);
// 21

output = input.eighth((it) => it > 30);
console.log(output);
// 43

output = input.eighth((it) => it > 40);
console.log(output);
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

**Usage**

```js
const numbers = listOf(32, 78, 56);

let element = numbers.elementAt(2);
console.log(element);
// 56

element = numbers.elementAt(4);
console.log(element);
// IndexOutOfBoundsException [Error]: Index out of bounds: 4
```

## `elementAtOrElse(index, defaultValue)`

**Description**
Returns an element at the given `index` or the result of calling the `defaultValue` function if the `index` is out of bounds of this list.

**Note**
`defaultValue` can either be a function or a value

**Usage**

```js
const numbers = listOf(32, 78, 56);

let element = numbers.elementAtOrElse(2, 70);
console.log(element);
// 56

element = numbers.elementAtOrElse(4, 70);
console.log(element);
// 70

element = numbers.elementAtOrElse(4, () => Math.random());
console.log(element);
// 0.5232938553939832
```

## `elementAtOrNull(index)`

**Description**
Returns an element at the given `index` or `null` if the `index` is out of bounds.

**Usage**

```js
const input = listOf(32, 78, 56);

let output = input.elementAtOrNull(2);
console.log(output);
// 56

output = input.elementAtOrNull(4);
console.log(output);
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

let output = numbers1.equals(numbers2);
console.log(output);
// false

output = numbers1.equals(numbers3);
console.log(output);
// true
```

## `exclude(...elements)`

**Description**
Takes in a variable number of arguments and excludes them from the list.

**Note**
Does not modify original list. To modify original list, use `delete()` instead.

**Usage**

```js
const input = listOf("z", "a", "d", "b", "e", "c", "f");
const output = input.exclude("a", "b", "c");

console.log(input);
// List(7) [
//   'z', 'a', 'd',
//   'b', 'e', 'c',
//   'f'
// ]
//

console.log(output);
// List(4) [ 'z', 'd', 'e', 'f' ]
```

## `exists(predicate)`

**Description**
Checks if an item exists in the list that matches the given `predicate`

**Note**
The `predicate` can either be a function or a value

**Usage**

```js
const items = listOf("apple", "carrot", "orange", "banana", "celery");

let output = items.exists("apple");
console.log(output);
// true

output = items.exists((item) => item.startsWith("c"));
console.log(output);
// true

output = items.exists((item) => item.startsWith("d"));
console.log(output);
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

let output = input.fifth();
console.log(output);
// 22

output = input.fifth((it) => it > 30);
console.log(output);
// 40

output = input.fifth((it) => it > 40);
console.log(output);
// NoSuchElementException [Error]: No such element
```

## `fifthOrNull(predicate)`

**Description**
Returns the fifth element in the list or the fifth element that matches the predicate, or `null` if the element is not found

**Usage**

```js
let input = listOf(32, 78, 56, 19, 22, 31, 40, 21, 29, 39, 20, 55, 43, 19, 39);

let output = input.fifthOrNull();
console.log(output);
// 22

output = input.fifthOrNull((it) => it > 30);
console.log(output);
// 40

output = input.fifthOrNull((it) => it > 40);
console.log(output);
// null
```

## `filterEvenNumbers()`

**Description**
Returns all the even numbers in the list

**Usage**

```js
const numbers = listOf(1, 2, 4, 7, 9);

const output = numbers.filterEvenNumbers();

console.log(output);
// List(2) [ 2, 4 ]
```

## `filterFalsy(zeroTruthy=false)`

**Description**
Only returns values that are falsy.

**Params**
`zeroTruthy` controls whether the value '0' should be treated as truthy or not.
The default value of `zeroTruthy` is `false`

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
Filters out the first `null` element, but keeps the rest

**Usage**

```js
const input = listOf(12, null, 32, null, 78, 56);

const output = input.filterFirstNotNull();

console.log(output);
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

let output = animals.filterIsInstance(Dog);
console.log(output);
// List(1) [ Dog { type: 'dog', color: 'grey' } ]

output = animals.filterIsInstance(Animal);
console.log(output);
// List(4) [
//   Animal { type: 'tiger' },
//   Animal { type: 'lion' },
//   Dog { type: 'dog', color: 'grey' },
//   Animal { type: 'cheetah' }
// ]

output = animals.filterIsInstance(Insect);
console.log(output);
// List(0) []
```

## `filterIsInstanceTo(destinationList, className)`

**Description**
Appends all elements that are instances of specified `className` to the given `destination`.

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

let output = input.filterIsInstanceTo(animals, Animal);

console.log(output);
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
const output = input.filterNot((it) => it > 5);

console.log(output);
// List(3) [ 3, 1, 2 ]
```

## `filterNotNull()`

**Description**
Filters out all the elements in the list that are not `null`. Keeps `undefined` values.

**Usage**

```js
const items = listOf(null, "apple", "carrot", undefined, null, null, "ginger");
const filtered = items.filterNotNull();

console.log(filtered);
// List(4) [ 'apple', 'carrot', undefined, 'ginger' ]
```

## filterNotNullTo

###

## filterNotTo

###

## filterNotUndefined

**Description**
Filters out all the elements in the list that are not `undefined`. Keeps `null` values.

**Usage**

```js
const items = listOf(null, "apple", "carrot", undefined, null, null, "ginger");

const output = items.filterNotUndefined();

console.log(output);
// List(6) [ null, 'apple', 'carrot', null, null, 'ginger' ]
```

## `filterOddNumbers()`

**Description**
Returns all the odd numbers in the list

**Usage**

```js
const input = listOf(1, 2, 4, 7, 9);

const output = input.filterOddNumbers();

console.log(output);
// List(2) [ 1, 7, 9 ]
```

## `filterPrimeNumbers()`

**Description**
Returns all the prime numbers in the list

**Usage**

```js
const input = listOf(16, 17, 18, 19, 20, 21, 22, 23);

let output = input.filterPrimeNumbers();

console.log(output);
// List(3) [ 17, 19, 23 ]
```

## filterTo

###

## `filterTruthy(zeroTruthy = true)`

**Description**
Filters out all values that are truthy. Value of '0' is treated as truthy by default

**Usage**

```js
const input = listOf(3, 4, null, 7, undefined, 0, 8);

let output = input.filterTruthy();
console.log(output);
// List(5) [ 3, 4, 7, 0, 8 ]

output = input.filterTruthy(false);
console.log(output);
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

let output = input.first();
console.log(output);
// 32

output = input.first((it) => it > 60);
console.log(output);
// 78

output = input.first((it) => it > 80);
console.log(output);
// NoSuchElementException [Error]: No such element
```

## `firstHalf(keepMiddle = true)`

**Description**
Returns the first half of the list

@param `keepMiddle` (Boolean) - controls whether the middle element of the list should be included in this list if the size of the list is an odd number

**Usage**

```js
const numbers = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);
let firstHalf = numbers.firstHalf();
console.log(firstHalf);
// List(5) [ 3, 4, 5, 6, 7 ]

firstHalf = numbers.firstHalf(false);
console.log(firstHalf);
// List(4) [ 3, 4, 5, 6 ]
```

## firstNotNullOf

###

## firstNotNullOfOrNull

###

## `firstOfEach()`

**Description**
Returns the first element of each element in the list

```js
const input = listOf("apple", ["pear", "banana"], "carrot");

let output = input.firstOfEach();

console.log(output);
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

let output = input.firstOrNull();
console.log(output);
// 32

output = input.firstOrNull((it) => it > 60);
console.log(output);
// 78

output = input.firstOrNull((it) => it > 80);
console.log(output);
// null
```

## flatten(depth=1)

**Description**
Flattens the list specified by the depth.

**Note**
This function is an alias for `flat()`

**Usage**

```js
let input = listOf([32, 78], [56, 23], listOf(21, listOf(22, 24)));

let output = input.flatten();
console.log(output);
// List(6) [ 32, 78, 56, 23, 21, List(2) [ 22, 24 ] ]

output = input.flatten(2);
console.log(output);
// List(7) [
//   32, 78, 56, 23,
//   21, 22, 24
// ]
```

## `floor()`

**Description**
Rounds down all the numbers in the list

**Usage**

```js
const numbers = listOf(3.14, 4.45, -5.34, 6.98, -7.47, 8.57, -9.35, -10.22, 11);

const output = numbers.floor();

console.log(output);
// Output:
// List(9) [
//   3,   4,  -6,  6, -8,
//   8, -10, -11, 11
// ]
```

## `fold(callback, initialValue)`

###

## forEachAsync

###

## fourth

###

## fourthOrNull

###

## get

###

## groupBy

###

## groupByTo

###

## `halve(keepMiddle = true)`

**Description**
Halves the list into two and returns the two parts.

- If the list contains an odd number of elements, the middle element is added to the second list.
- To control this behaviour, set param `keepMiddle` to `false`

**Usage**

```js
const input = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);
let output = input.halve();
console.log(output);
// List(2) [
//  List(4) [ 3, 4, 5, 6 ],
//  List(5) [ 7, 8, 9, 10, 11 ]
// ]

output = input.halve(false);
console.log(output);
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

## hundredth

###

## hundredthOrNull

###

## `ifEmpty(defaultValue)`

**Description**
If the list is empty, return the `defaultValue`. Or else returns the list.

**Usage**

```js
let numbers = listOf(3, 4, 5);
let output = numbers.ifEmpty(listOf(5, 6, 7));
console.log(output);
// List(3) [ 3, 4, 5 ]

numbers = listOf();
output = numbers.ifEmpty(listOf(5, 6, 7));
console.log(output);
// List(3) [ 5, 6, 7 ]
```

## `ifNotEmpty(defaultValue)`

**Description**
If the list is not empty, return the defaultValue. Or else return the list.

**Usage**

```js
let input = listOf(3, 4, 5);
let output = input.ifNotEmpty(listOf(5, 6, 7));
console.log(output);
// List(3) [ 5, 6, 7 ]

input = listOf();
output = input.ifNotEmpty(listOf(5, 6, 7));
console.log(output);
// List(0) []
```

## `includesAll(...args)`

**Description**
Returns true if the list includes all the specified elements, else returns false

**Usage**

```js
let input = listOf(3, 4, 5);
let output = input.includesAll(5, 6, 7);
console.log(output);
// false

input = listOf(3, 4, 5, 6, 7, 8);
output = input.includesAll(5, 6, 7);
console.log(output);
// true
```

## `indices`

**Description**
Returns the valid indices of the list

**Usage**

```js
let input = listOf(3, 4, 5);
let output = input.indices;
console.log(output);
// List(3) [ 0, 1, 2 ]
```

## `indicesOf(element)`

**Description**
Returns every index of the occurence of the element in the list

**Usage**

```js
const input = listOf("banana", "apple", "carrot", "grape", "apple", "peach");
let output = input.indicesOf("apple");
console.log(output);
// List(2) [ 1, 4 ]
```

## `intersect(...lists)`

**Description**
Finds all the elements that exist in all given lists

**Note**
Accepts multiple arguments
Opposite of `difference()`
Unlike `union()`, returns a `List` object instead of a `Set`

**Usage**

```js
const list1 = listOf(1, 2, 3, 4);
const list2 = listOf(2, 4, 6, 8);
const list3 = listOf(3, 4, 5, 6);
const list4 = [4, 6, 8, 10];

const input = listOf(1, 2, 3, 4, 5, 6);

let output;

output = input.intersect(list1);
console.log(output);
// List(4) [ 1, 2, 3, 4 ]

output = input.intersect(list1, list2);
console.log(output);
// List(2) [ 2, 4 ]

output = input.intersect(list1, list2, list3); // Output: [4]
console.log(output);
// List(1) [ 4 ]

output = input.intersect(list1, list2, list3, list4);
console.log(output);
// List(1) [ 4 ]
```

## `intersection(...lists)`

**Description**
Alias for `intersect(...lists)`

**Usage**

```js
const list1 = listOf(1, 2, 3, 4);
const list2 = listOf(2, 4, 6, 8);
const list3 = listOf(3, 4, 5, 6);
const list4 = [4, 6, 8, 10];

const input = listOf(1, 2, 3, 4, 5, 6);

let output;

output = input.intersection(list1);
console.log(output);
// List(4) [ 1, 2, 3, 4 ]

output = input.intersection(list1, list2);
console.log(output);
// List(2) [ 2, 4 ]

output = input.intersection(list1, list2, list3); // Output: [4]
console.log(output);
// List(1) [ 4 ]

output = input.intersection(list1, list2, list3, list4);
console.log(output);
// List(1) [ 4 ]
```

## isEmpty

**Description**
Returns whether a list is empty

**Usage**

```js
let input = listOf(3, 4, 5, 6);
let output = input.isEmpty();
console.log(output);
// false

input = listOf();
output = input.isEmpty();
console.log(output);
// true
```

## isNotEmpty

**Description**
Returns whether a list is not empty

**Usage**

```js
let input = listOf(3, 4, 5, 6);
let output = input.isNotEmpty();
console.log(output);
// true

input = listOf();
output = input.isNotEmpty();
console.log(output);
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

let output = input.joinEach(":");
console.log(output);
// List(3) [ 'Foo:Bar', 'Baz:Test', 'Hello:World' ]

output = input.joinEach(":", "<b>", "</b>");
console.log(output);
// List(3) [ '<b>Foo:Bar</b>', '<b>Baz:Test</b>', '<b>Hello:World</b>' ]
```

## `joinTo(list, separator, prefix = "", postfix = "")`

**Description**
Joins a list using a `separator`, `prefix` and `postfix`, then appends that string to the end of a specified `list`.

**Usage**

```js
const input1 = listOf("Hello", "World");
const input2 = listOf("Foo", "Bar");

let output = input1.joinTo(input2, "-", "<b>", "</b>");
console.log(output);
// List(3) [ 'Foo', 'Bar', '<b>Hello-World</b>' ]
```

## `joinWith(separator, prefix = "", postfix = "")`

- `separator`
- `prefix`
- `postfix`

**Description**
Given a list of strings, joins them with the given separator, prefix and postfix

**Usage**

```js
let input = listOf("h", "t", "m", "l");

let output = input.joinWith("", "<", ">");

console.log(output);
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

let output = input.lastIndex;

console.log(output);
// 3
```

## `lastOfEach()`

**Description**
Returns the last element of each element in the list

```js
const input = listOf("apple", ["pear", "banana"], "carrot");

let output = input.lastOfEach();

console.log(output);
// List(3) [ 'e', 'banana', 't' ]
```

## lastOrNull

###

## mapAsync

###

## `mapNotNull(transform)`

**Description**
Performs a map on all elements in the list that are not `null` or `undefined`

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

let output = input.mapNotNull((it) => it.name);

console.log(output);
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

let output = input.mapNotNullTo(list, (it) => it.name);

console.log(output);
// List(6) [ 'Chris', 'Jake', 'John', 'Michael', 'Smith', 'David' ]
```

## mapTo(destination, transform)

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

let output = input.mapTo(list, (it) => it.name);

console.log(output);
// List(5) [ 'Chris', 'Jake', 'John', 'Michael', 'Smith' ]
```

## `mapWith(list)`

**Description**
Given two lists, merges them into a map where the first list contains the keys and the second list contains the values.

**Usage**

```js
const list1 = listOf("id", "name");
const list2 = listOf(12, "Jake");

let output = list1.mapWith(list2);

console.log(output);
// Map { 'id' => 12, 'name' => 'Jake' }
```

## `match(predicate, nth = 1)`

**Description**
Returns the `nth` element in the list or the `nth` element that matches the `predicate`

**Note**
Throws an error if no item matches the `predicate`

**Usage**

```js

```

## matchOrNull

###

## `max()`

**Description**
Finds the largest number in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let output = input.max();

console.log(output);
// 18
```

## maxOf

###

## `mean()`

**Description**
Returns the average of the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);
let output = input.mean();
console.log(output);
// 3.5
```

## `median()`

**Description**
Returns the median number in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let output = input.median();

console.log(output);
// 6
```

## `min()`

**Description**
Finds the smallest number in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let output = input.min();

console.log(output);
// -17
```

## minOf

###

## `minmax()`

**Description**
Returns a list containing the smallest and the largest numbers in the list

**Usage**

```js
const input = listOf(3, 18, -4, 15, 6, -17);

let output = input.minmax();

console.log(output);
// List(2) [ -17, 18 ]
```

## minmaxOf

###

## minus

###

## `mode()`

**Description**
Returns the most frequently occuring element in the list

**Usage**

```js
const input = listOf("apple", "banana", "lettuce", "carrot", "banana");

let output = input.mode();

console.log(output);
// banana
```

## multiply

###

## ninth

###

## ninthOrNull

###

## none(predicate)

**Description**
Returns `true` if none of the items match the given `predicate`, else returns `false`. If no `predicate` is provided, returns `true` if the list is empty, else returns `false`.

**Usage**

```js
const input = listOf(4, 5, 6);

let output = input.none((item) => item > 7);
console.log(output);
// true

output = input.none((item) => item > 5);
console.log(output);
// false
```

## `nthOfEach(n)`

**Description**
Returns the `nth` element of each element in the list

**Usage**

```js
const input = listOf(["a", "b", "c"], ["d", "a", "f"], "test");

output = input.nthOfEach(1);

console.log(output);
// List(3) [ 'b', 'a', 'e' ]
```

## pairWith(list)

**Description**
Given two lists, merges them into an object where the first list contains the keys and the second list contains the values.

**Usage**

```js
const list1 = listOf("fruit", "animal", "test");
const list2 = listOf("apple", "dog", "test123");

output = list1.pairWith(list2);

console.log(output);
// { fruit: 'apple', animal: 'dog', test: 'test123' }
```

## `partition(predicate)`

**Description**
Splits the original collection into pair of lists, where the first list contains elements for which `predicate` yielded `true`, while the second list contains elements for which `predicate` yielded `false`.

**Usage**

```js
const input = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9);

output = input.partition((it) => it > 5);

console.log(output);
// List(2) [
//   List(4) [ 6, 7, 8, 9 ],
//   List(5) [ 1, 2, 3, 4, 5 ]
// ]
```

## plus()

###

## `postfix(string)`

**Description**
Postfixes each element in the list with a specified string

**Usage**

```js
const numbers = listOf("John", "Michael", 1234);

const output = numbers.postfix(": Name");

console.log(output);
// List(3) [ 'John: Name', 'Michael: Name', '1234: Name' ]
```

## `power(number)`

###

## `prefix(string)`

**Description**
Prefixes each element in the list with a specified string

**Usage**

```js
const numbers = listOf("John", "Michael", 1234);

const output = numbers.prefix("Name: ");

console.log(output);
// List(3) [ 'Name: John', 'Name: Michael', 'Name: 1234' ]
```

## `product()`

**Description**
Returns the multiplication of all the numbers in the list.

**Usage**

```js
const input = listOf(4, 5, 10, 20);

let output = input.product();

console.log(output);
// 4000
```

## `random()`

**Description**
Returns a randomly chosen element within the list

**Usage**

```js
const input = listOf("apple", "banana", "lettuce", "carrot");

let output = input.random();
console.log(output);
// banana

output = input.random();
console.log(output);
// lettuce
```

## `range()`

**Description**
Returns a list of numbers counting from start to end.

**Note**
The list must contain only 2 elements, both of which are numbers.

```js
let input, output;

input = listOf(4, 10);
output = input.range();
console.log(output);
// List(7) [
//   4, 5,  6, 7,
//   8, 9, 10
// ]

input = listOf(10, -4);
output = input.range();
console.log(output);
// List(15) [
//   10,  9,  8, 7, 6,  5,
//    4,  3,  2, 1, 0, -1,
//   -2, -3, -4
// ]

input = listOf("a", 2);
output = input.range();
console.log(output);
// Error: Invalid list parameters
```

## `repeat(n=1)`

**Description**
Repeats the list `n` number of times and returns the result

**Usage**

```js
const input = listOf("a", "b", "c");

let output = input.repeat(3);

console.log(output);
// List(9) [
//   'a', 'b', 'c',
//   'a', 'b', 'c',
//   'a', 'b', 'c'
// ]
```

## `replace(element, replacer, count = -1)`

**Description**
Replaces every occurence of an element in a list with a new value

**Params**

- `element` - the element to replace
- `replacer` - the value to replace with
- `count` - indicates how many elements to replace, default is `-1` which indicates replace all

**Usage**

```js
const input = listOf("a", "b", "c", "a", "b");
let output = input.replace("a", "d");
console.log(output);
// List(5) [ 'd', 'b', 'c', 'd', 'b' ]

output = input.replace("a", "d", 1);
console.log(output);
// List(5) [ 'd', 'b', 'c', 'a', 'b' ]
```

## `round()`

**Description**
Rounds all the numbers in the list to the nearest integer

**Usage**

```js
const numbers = listOf(3.14, 4.45, -5.34, 6.98, -7.47, 8.57, -9.35, -10.22, 11);

const output = numbers.round();
console.log(output);
// List(9) [
//   3,  4,  -5,  7, -7,
//   9, -9, -10, 11
// ]
```

## `sample(sampleSize, allowRepeats=true)`

**Description**
Returns a randomly chosen sample of elements within the list.

**Note**
If `allowRepeats` is set to `false`, `sampleSize` cannot be greater than the list length, or else an error will be thrown

**Usage**

```js
const input = listOf("apple", "banana", "carrot", "lettuce", "eggplant");

let output = input.sample(3);
console.log(output);
// List(3) [ 'lettuce', 'eggplant', 'apple' ]

output = input.sample(7);
console.log(output);
// List(7) [
//   'lettuce', 'carrot',
//   'apple',   'apple',
//   'banana',  'lettuce',
//   'carrot'
// ]

output = input.sample(3, false);
console.log(output);
// List(3) [ 'eggplant', 'banana', 'carrot' ]

output = input.sample(6, false);
console.log(output);
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

let output = input.scan((acc, cur) => acc + cur, 0);

console.log(output);
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
let output = input.search("Chocolate");
console.log(output);
// List(3) [
//   'Chocolate milkshake',
//   'Chocolate cake',
//   'Almond chocolate croissant'
// ]

// Case sensitive
output = input.search("Chocolate", true);
console.log(output);
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

let output = input.secondHalf();
console.log(output);
// List(4) [ 8, 9, 10, 11 ]

output = input.secondHalf(true);
console.log(output);
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

let output = input.segment(3);
console.log(output);
// List(3) [
//   List(4) [ 1, 2, 3, 4 ],
//   List(4) [ 5, 6, 7, 8 ],
//   List(4) [ 9, 10, 11, 12 ]
// ]

output = input.segment(4);
console.log(output);
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

let output = input.shuffled();

console.log(output);
// List(6) [ 'b', 'a', 'd', 'c', 'f', 'e' ]
```

## `single(predicate)`

**Description**
Returns the single element matching the given predicate, or throws exception if there is none or more than one matching element.

**Usage**

```js
const input = listOf(3, 4, 5, 6);

let output = input.single((it) => it > 5);
console.log(output);
// 6

output = input.single((it) => it > 4 && it < 6);
console.log(output);
// 5

output = input.single((it) => it < 6);
console.log(output);
// Error: NoSuchElementException [Error]: No single element matches the given predicate Found: (3)

output = input.single((it) => it < 3);
console.log(output);
// Error: NoSuchElementException [Error]: No single element matches the given predicate Found: (0)
```

## `singleOrNull(predicate)`

**Description**
Returns the single element matching the given predicate, or returns `null` if there is none or more than one matching element.

**Usage**

```js
const input = listOf(3, 4, 5, 6);

let output = input.singleOrNull((it) => it > 5);
console.log(output);
// 6

output = input.singleOrNull((it) => it > 4 && it < 6);
console.log(output);
// 5

output = input.singleOrNull((it) => it < 6);
console.log(output);
// null

output = input.singleOrNull((it) => it < 3);
console.log(output);
// null
```

## sixth

###

## sixthOrNull

###

## `size`

###

## `sortBy(selector)`

###

## `sortByDescending(selector)`

###

## `sortNumbers()`

**Description**
Given a list of numbers, sorts them in ascending order.

**Note**
The default JavaScript `sort()` method does not sort numbers correctly without specifying a sort operation. For example:

```js
const input = listOf(10, 1, -1, 100, -10);
let output = input.sort();
```

Will result in:

```js
console.log(output);
// List(5) [ -1, -10, 1, 10, 100 ]
```

Which is incorrect.

This function `sortNumbers()` sorts the numbers correctly, as follows.

**Usage**

```js
const input = listOf(10, 1, -1, 100, -10);

let output = input.sortNumbers();

console.log(output);
// List(5) [ -10, -1, 1, 10, 100 ]
```

## `sortNumbersDescending()`

**Description**
Given a list of numbers, sorts them in descending order

```js
const input = listOf(10, 1, -1, 100, -10);

let output = input.sortNumbersDescending();

console.log(output);
// List(5) [ 100, 10, 1, -1, -10 ]
```

## sortedBy(selector)

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

let output = input.splitEach(":");
console.log(output);
// List(3) [
//   List(2) [ 'Foo', 'Bar' ],
//   List(2) [ 'Baz', 'Test' ],
//   List(1) [ 'Hello_World' ]
// ]

output = input.splitEach(":", "_");
console.log(output);
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

let output = input.stdev();

console.log(output);
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

let output = input.subList(3, 7);

console.log(output);
// List(4) [ 19, 20, 21, 22 ]
```

## `sum()`

**Description**
Returns the sum of all numbers in a list

**Usage**

```js
const input = listOf(5, 17, -15, 3, 1, 8);

let output = input.sum();

console.log(output);
// 19
```

## sumOf

###

## `tail(n=1)`

**Description**
Returns the last `n` elements in a list

**Usage**

```js
const numbers = listOf(3, 4, 5, 6, 7, 8, 9, 10, 11);
let tail = numbers.tail();
console.log(tail);
//List(1) [ 11 ]

tail = numbers.tail(4);
console.log(tail);
// List(4) [ 8, 9, 10, 11 ]
```

## take

###

## takeLast

###

## takeLastWhile

###

## takeWhile

###

## tenth

###

## tenthOrNull

###

## third

###

## thirdOrNull

###

## toBoolean

###

## `toEnglish()`

###

**Usage**

```js
const numbers = listOf(60, 3.5, 111111, 323_975_291_397);
let output = numbers.toEnglish();
console.log(output);
// List(4) [
//   'Sixty',
//   'Three Point Five',
//   'One Hundred and Eleven Thousand, One Hundred and Eleven',
//   'Three Hundred and Twenty Three Billion, Nine Hundred and Seventy Five Million, Two Hundred and Ninety One Thousand, Three Hundred and Ninety Seven'
// ]
```

## `toFixed(digits)`

**Description**
Sets the decimal places of each number in the list

**Usage**

```js
const numbers = listOf(2.34324, 9.6735, -0.5656, 99.998);

const output = numbers.toFixed(2);

console.log(output);
// List(4) [ '2.34', '9.67', '-0.57', '100.00' ]
```

## `toLowerCase()`

**Description**
Converts all elements in the list to lower case

**Usage**

```js
const input = listOf("Apple", "Banana", "CARROT");
const output = input.toLowerCase();
console.log(output);
// List(3) [ 'apple', 'banana', 'carrot' ]
```

## `toMap()`

**Description**
Converts a list of lists to a map

**Usage**

```js
const numbers = listOf(["a", 1], ["b", 2], ["c", 3]);
let output = numbers.toMap();
console.log(output);
// Map { 'a' => 1, 'b' => 2, 'c' => 3 }
```

## `toObject()`

**Description**
Converts a list of lists to an object

**Usage**

```js
const input = listOf(["a", 1], ["b", 2], ["c", 3]);
let output = input.toObject();
console.log(output);
// { a: 1, b: 2, c: 3 }
```

## `toUpperCase()`

**Description**
Converts all elements in the list to upper case

**Usage**

```js
const input = listOf("Apple", "Banana", "CARROT");
const output = input.toUpperCase();
console.log(output);
// List(3) [ 'APPLE', 'BANANA', 'CARROT' ]
```

## `trimEach()`

**Description**
Trims each string in the list off its trailing whitespace

**Usage**

```js
const input = listOf("   foo", "  bar   ", "baz    ", "   te st");

const output = input.trimEach();

console.log(output);
// List(4) [ 'foo', 'bar', 'baz', 'te st' ]
```

## `union(list)`

**Description**
Returns a `Set` containing all distinct elements from both collections.

**Note**
Unlike `intersection()`, returns a `Set` object containing only unique entries instead of a `List`

**Usage**

```js
const list1 = listOf(3, 4, 5, 6, 7);
const list2 = listOf(6, 7, 5, 8, 9);

let output = list1.union(list2);

console.log(output);
// Set { 6, 7, 5 }
```

## `unique()`

**Description**
Returns all the unique elements in the list as a `Set` object

**Note**
This is the same as the `distinct()` function, except that it returns a `Set` object instead of a `List`

**Usage**

```js
const fruits = listOf("apple", "apple", "orange", "banana", "banana", "pear");

const unique = fruits.unique();

console.log(unique);
// Set { 'apple', 'orange', 'banana', 'pear' }
```

## unzip

**Description**

## `zip(...lists)`

**Description**
Given two or more lists, returns pairs of one element in one list with another element in the other list

**Usage**

```js
const list1 = listOf("fruit", "animal", "test");
const list2 = listOf("apple", "dog", "test123");
const list3 = listOf("banana", "cat", "test456", "hello world");

let output = list1.zip(list2);
console.log(output);
// List(3) [
//   List(2) [ 'fruit', 'apple' ],
//   List(2) [ 'animal', 'dog' ],
//   List(2) [ 'test', 'test123' ]
// ]

output = list1.zip(list2, list3);
console.log(output);
// List(3) [
//   List(3) [ 'fruit', 'apple', 'banana' ],
//   List(3) [ 'animal', 'dog', 'cat' ],
//   List(3) [ 'test', 'test123', 'test456' ]
// ]
```

##
