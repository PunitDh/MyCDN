# List.JS (Array Extended)

## How to declare a list
There are several ways to declare a list.

You can declare a list using a constructor.
```js
const { List } = require("./List.js");

const list = new List(1,2,3,4);
console.log(list);
// List(4) [ 1, 2, 3, 4 ]
```

You can also use the `listOf` function, similar to Kotlin.
```js
const { listOf } = require("./List.js");

const list = listOf('a','b','c','d');
console.log(list);
// List(4) [ 'a', 'b', 'c', 'd' ]
```

You can also convert a JavaScript array to a list.

```js
require("./List.js");

const array = [9, 8, 7, 6];
const list = array.toList();
console.log(list);
// List(4) [ 9, 8, 7, 6 ]
```

## Why List.JS?

JavaScript array lacks a lot of functionality to manipulate and modify existing array.

## Functions

## `add(element)`

Adds an element to the list and returns the list.

```js
const list = listOf("a", "b", "c");
const added = list.add("d");
console.log(added);
// List(4) [ 'a', 'b', 'c', 'd' ]
```

## `all(predicate, thisArg = undefined)`

### Checks whether all the elements in the list matches a given element

```js
const list = listOf(4, 5, 6);
let all = list.all((item) => item > 3);
console.log(all);
// true

all = list.all((item) => item > 5);
console.log(all);
// false
```

## `any(predicate, thisArg = undefined)`

### Checks whether any of the elements in the list matches a given element

```js
const list = listOf(4, 5, 6);
let any = list.any((item) => item > 7);
console.log(any);
// false

any = list.any((item) => item > 5);
console.log(any);
// true
```

## `associate(transform)`

### Returns an object containing key-value pairs provided by transform function applied to each elements of the list

```js
const fruits = listOf("apple", "banana", "orange");
let associated = list.associate((fruit) => fruit.toUpperCase());

console.log(associated);
// { apple: 'APPLE', banana: 'BANANA', orange: 'ORANGE' }
```

## `associateWith(valueSelector)`

### Returns a Map where keys are elements from the given collection and values are produced by the valueSelector function applied to each element.

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

### Performs a binary search on a sorted list of elements and returns the index of the search result

```js
const numbers = listOf(8, 34, 56, 89, 105);
const result = numbers.binarySearch(56);
console.log(result);
// 2
```

## `binarySearchBy(element, keySelector, fromIndex = 0, toIndex = this.length)`

### Performs a binary search on a sorted list of elements based on the keySelector

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

### Capitalizes the first letter of each word in the list

```js
const input = listOf('apple','baNANA','CARROT');
const output = input.capitalize();
console.log(output);
// List(3) [ 'Apple', 'Banana', 'Carrot' ]
```

## `ceil()`

### Rounds all the numbers up in the arguments provided

```js
const numbers = listOf(2.34, 6.54, 9.67, -0.56, 3.14);
const ceil = numbers.ceil();
console.log(ceil);
// List(5) [ 3, 7, 10, -0, 4 ]
```

## `chunked(size)`

### Splits a list down into smaller chunks specified by the size

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

Clears all elements from the list.
**Note**: Mutates the original list.

```js
const numbers = listOf(2, 6, 9, -1, 3);
numbers.clear();
console.log(numbers);
// List(0) []
```

## `compact()`

### Removes from the list all falsy values, including `0`, `false`, `undefined`, `null` and empty strings

```js
const numbers = listOf(
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
const compact = numbers.compact();
console.log(compact);
// List(6) [ 1, 4, 8, 'test', 'foo', true ]
```

## `contains(...elements)`

### Checks if the list contains any of the given elements

```js
const numbers = listOf(2, 6, 9, -1, 3);
let contains = numbers.contains(7, -1, 8);
console.log(contains);
// true

contains = numbers.contains(7, -2, 8);
console.log(contains);
// false
```

## `containsAll(...elements)`

### Checks if a list contains all given elements

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

Returns the number of elements matching a given `predicate`.
If the `predicate` is a function, returns the number of instances for which the function returns `true`.
If the `predicate` is a value, counts the number of occurences in the list.
If no `predicate` is provided, returns the length of the list.

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

## `counts`

### Counts unique occurences in the list and returns them as an object

```js
const fruits = listOf("apple", "apple", "orange", "banana", "banana", "banana");

const counts = fruits.counts();

console.log(counts);

// { apple: 2, orange: 1, banana: 3 }
```

## `delete(...elements)`

Deletes any given number of elements from a list.
**Note:** Mutates the original list. To ensure original list is not mutated, use `exclude()` instead

```js
const fruits = listOf("apple", "apple", "orange", "banana", "banana", "pear");

fruits.delete("apple", "orange");

console.log(fruits);
// List(3) [ 'banana', 'banana', 'pear' ]
```

## `difference()`

### Finds all the elements that do not exist in both lists

```js
const fruits1 = listOf("apple", "orange", "banana", "pear");
const fruits2 = listOf("peach", "apple", "orange", "plum");

const difference = fruits1.difference(fruits2);

console.log(difference);
// List(4) [ 'peach', 'plum', 'banana', 'pear' ]
```

## `distinct()`

### Returns the distinct elements in the list

```js
const fruits = listOf("apple", "apple", "orange", "banana", "banana", "pear");
const distinct = fruits.distinct();
console.log(distinct);
// List(4) [ 'apple', 'orange', 'banana', 'pear' ]
```

## `distinctBy(keySelector)`

### Returns a list containing only elements from the given collection having distinct keys returned by the given selector function.

```js
const fruits = listOf(
  { id: 3, name: "apple" },
  { id: 7, name: "apple" },
  { id: 5, name: "orange" },
  { id: 19, name: "banana" },
  { id: 21, name: "banana" },
  { id: 32, name: "pear" }
);

const distinct = fruits.distinctBy((it) => it.name);

console.log(distinct);
// List(4) [
//   { id: 3, name: 'apple' },
//   { id: 5, name: 'orange' },
//   { id: 19, name: 'banana' },
//   { id: 32, name: 'pear' }
// ]
```

## `divide(number)`

### Divides each element in the list with a given `number`

```js
const numbers = listOf(32, 78, 56, 19, 22, 31);

const divide = numbers.divide(4);

console.log(divide);
// List(6) [ 8, 19.5, 14, 4.75, 5.5, 7.75 ]
```

## `drop(n)`

### Returns a list containing all elements except first n elements

```js
const numbers = listOf(32, 78, 56, 19, 22, 31);

const dropped = numbers.drop(4);

console.log(dropped);
// List(6) [ 22, 31 ]
```

## `dropLast(n)`

### Returns a list containing all elements except last `n` elements

```js
const numbers = listOf(32, 78, 56, 19, 22, 31);

const dropped = numbers.dropLast(4);

console.log(dropped);
// List(2) [ 32, 78 ]
```

## `dropLastWhile(predicate)`

### Returns a list containing all elements except last elements that satisfy the given predicate.

```js
const numbers = listOf(32, 78, 56, 19, 22, 31);

const dropped = numbers.dropLastWhile((it) => it > 30);

console.log(dropped);
// List(5) [ 32, 78, 56, 19, 22 ]
```

## `dropWhile(predicate)`

### Returns a list containing all elements except first elements that satisfy the given predicate.

```js
const numbers = listOf(32, 78, 56, 19, 22, 31);

const dropped = numbers.dropWhile((it) => it > 30);

console.log(dropped);
// List(3) [ 19, 22, 31 ]
```

## `eighth()`

### Returns the eighth element in the list or the eighth element that matches the predicate

**Note:** Throws an error if element is not found

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

let eighth = numbers.eighth();
console.log(eighth);
// 21

eighth = numbers.eighth((it) => it > 30);
console.log(eighth);
// 43

eighth = numbers.eighth((it) => it > 40);
console.log(eighth);
// NoSuchElementException [Error]: No such element
```

## eighthOrNull

### Returns the eighth element in the list or the eighth element that matches the predicate, or null if the element is not found

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

### Returns an element at the given `index` or throws an `IndexOutOfBoundsException` if the `index` is larger than the length of the list.

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

### Returns an element at the given `index` or the result of calling the `defaultValue` function if the `index` is out of bounds of this list.

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

## elementAtOrNull(index)

### Returns an element at the given `index` or null if the `index` is out of bounds of this list.

```js
const numbers = listOf(32, 78, 56);

let element = numbers.elementAtOrNull(2);
console.log(element);
// 56

element = numbers.elementAtOrNull(4);
console.log(element);
// null
```

## `equals(list)`

### Checks if two lists are equal using a deep comparison

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

### Takes in a variable number of arguments and excludes them from the list.

**Note:** Does not modify original list.
To modify original list, use `delete()` instead.

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

### Checks if an item exists in the list that matches the given predicate

```js
const items = listOf("apple", "carrot", "orange", "banana", "celery");
let exists = items.exists("apple");
console.log(exists);
// true

exists = items.exists((it) => it.startsWith("c"));
console.log(exists);
// true

exists = items.exists((it) => it.startsWith("d"));
console.log(exists);
// false
```

## `fifth(predicate)`

### Returns the fifth element in the list or the fifth element that matches the `predicate`

**Note:** Throws an error if the element is not found

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

let fifth = numbers.fifth();
console.log(fifth);
// 22

fifth = numbers.fifth((it) => it > 30);
console.log(fifth);
// 40

fifth = numbers.fifth((it) => it > 40);
console.log(fifth);
// NoSuchElementException [Error]: No such element
```

## `fifthOrNull(predicate)`

### Returns the fifth element in the list or the fifth element that matches the predicate, or null if the element is not found

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

let fifth = numbers.fifthOrNull();
console.log(fifth);
// 22

fifth = numbers.fifthOrNull((it) => it > 30);
console.log(fifth);
// 40

fifth = numbers.fifthOrNull((it) => it > 40);
console.log(fifth);
// null
```

## `filterEvenNumbers()`

### Returns all the even numbers in the list

```js
const numbers = listOf(1, 2, 4, 7, 9);
const filtered = numbers.filterEvenNumbers();

console.log(filtered);
// List(2) [ 2, 4 ]
```

## `filterFalsy(zeroTruthy = false)`

### Only returns values that are falsy.
`zeroTruthy` - controls whether the value '0' should be treated as truthy or not

```js
let items = listOf(3,4,null,7,undefined,0,8)
let filtered = items.filterFalsy(true)
console.log(filtered)
// List(2) [ null, undefined ]

items = listOf(3,4,null,7,undefined,0,8)
filtered = items.filterFalsy()
console.log(filtered)
// List(3) [ null, undefined, 0 ]
```

## `filterFirstNotNull()`

### Filters out the first null element, but keeps the rest

```js
const numbers = listOf(12, null, 32, null, 78, 56);
const filtered = numbers.filterFirstNotNull();

console.log(filtered);
// List(5) [ 12, 32, null, 78, 56 ]
```

## `filterIsInstance(className)`

### Returns a list containing all elements that are instances of the specified class

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
)

let filtered = animals.filterIsInstance(Dog);
console.log(filtered);
// List(1) [ Dog { type: 'dog', color: 'grey' } ]

filtered = animals.filterIsInstance(Animal);
console.log(filtered);
// List(4) [
//   Animal { type: 'tiger' },
//   Animal { type: 'lion' },
//   Dog { type: 'dog', color: 'grey' },
//   Animal { type: 'cheetah' }
// ]

filtered = animals.filterIsInstance(Insect);
console.log(filtered);
// List(0) []
```

## filterIsInstanceTo

###

## filterNot

### Returns a list containing all elements _not_ matching the given predicate.

```js
const numbers = listOf(3,7,9,1,2,7,8,10);
const filtered = numbers.filterNot(it => it > 5);

console.log(filtered);
// List(3) [ 3, 1, 2 ]
```

## filterNotNull

### Filters out all the elements in the list that are not `null`. Keeps `undefined` values.

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

### Filters out all the elements in the list that are not `undefined`. Keeps `null` values.

```js
const items = listOf(null, "apple", "carrot", undefined, null, null, "ginger");
const filtered = items.filterNotUndefined();

console.log(filtered);
// List(6) [ null, 'apple', 'carrot', null, null, 'ginger' ]
```

## `filterOddNumbers()`

### Returns all the odd numbers in the list

```js
const numbers = listOf(1, 2, 4, 7, 9);
const filtered = numbers.filterOddNumbers();

console.log(filtered);
// List(2) [ 1, 7, 9 ]
```

## `filterPrimeNumbers()`

### Returns all the prime numbers in the list

```js
const input = listOf(16,17,18,19,20,21,22,23);
let output = input.filterPrimeNumbers();
console.log(output);
// List(3) [ 17, 19, 23 ]
```

## filterTo

###

## `filterTruthy(zeroTruthy = true)`

###

## first

###

## `firstHalf(keepMiddle = true)`

### Returns the first half of the list
@param `keepMiddle` (Boolean) - controls whether the middle element of the list should be included in this list if the size of the list is an odd number

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

## firstOfEach

###

## firstOrNull

###

## flatten

###

## floor

###

```js
const numbers = listOf(3.14, 4.45, -5.34, 6.98, -7.47, 8.57, -9.35, -10.22, 11);
const floor = numbers.floor();
console.log(floor);
// Output:
// List(9) [
//   3,   4,  -6,  6, -8,
//   8, -10, -11, 11
// ]
```

## fold

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

### Halves the list into two and returns the two parts.
   * If the list contains an odd number of elements, the middle element is added to the second list.
   * To control this behaviour, set param `keepMiddle` to `false`

```js
const input = listOf(3,4,5,6,7,8,9,10,11);
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

### Returns the first `n` elements in a list
Default value of `n` is `1`.

```js
const numbers = listOf(3,4,5,6,7,8,9,10,11);
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

### If the list is empty, return the `defaultValue`. Or else returns the list.

```js
let numbers = listOf(3,4,5);
let output = numbers.ifEmpty(listOf(5,6,7));
console.log(output);
// List(3) [ 3, 4, 5 ]

numbers = listOf();
output = numbers.ifEmpty(listOf(5,6,7));
console.log(output);
// List(3) [ 5, 6, 7 ]
```

## `ifNotEmpty(defaultValue)`

### If the list is not empty, return the defaultValue. Or else return the list.

```js
let input = listOf(3,4,5);
let output = input.ifNotEmpty(listOf(5,6,7));
console.log(output);
// List(3) [ 5, 6, 7 ]

input = listOf();
output = input.ifNotEmpty(listOf(5,6,7));
console.log(output);
// List(0) []
```

## `includesAll(...args)`

### Returns true if the list includes all the specified elements, else returns false

```js
let input = listOf(3,4,5);
let output = input.includesAll(5,6,7);
console.log(output);
// false

input = listOf(3,4,5,6,7,8);
output = input.includesAll(5,6,7);
console.log(output);
// true
```

## `indices`

### Returns the valid indices of the list

```js
let input = listOf(3,4,5);
let output = input.indices;
console.log(output);
// List(3) [ 0, 1, 2 ]
```

## `indicesOf(element)`

### Returns every index of the occurence of the element in the list

```js
const input = listOf("banana", "apple", "carrot", "grape", "apple", "peach");
let output = input.indicesOf("apple");
console.log(output);
// List(2) [ 1, 4 ]
```

## `intersect(list)`

### Finds all the elements that exist in both lists

```js
let input = listOf(3,4,5,6);
let output = input.intersect(listOf(5,6,7));
console.log(output);
// List(2) [ 5, 6 ]
```

## `intersection(list)`

### Alias for `intersect(list)`

```js
let input = listOf(3,4,5,6);
let output = input.intersection(listOf(5,6,7));
console.log(output);
// List(2) [ 5, 6 ]
```

## isEmpty

### Returns whether a list is empty

```js
let input = listOf(3,4,5,6);
let output = input.isEmpty();
console.log(output);
// false

input = listOf();
output = input.isEmpty();
console.log(output);
// true
```

## isNotEmpty

### Returns whether a list is not empty

```js
let input = listOf(3,4,5,6);
let output = input.isNotEmpty();
console.log(output);
// true

input = listOf();
output = input.isNotEmpty();
console.log(output);
// false
```

## `joinWith(separator, prefix = "", postfix = "")`
@param `separator`
@param `prefix`
@param `postfix`


### Given a list of strings, joins them with the given separator, prefix and postfix

```js
let input = listOf("apple", "banana", "carrot");
let output = input.joinWith(",", "Fruits: ", "!");
console.log(output);
// Fruits: apple,banana,carrot!
```

## `joinEach(separator, prefix = "", postfix = "")`
@param `separator`
@param `prefix`
@param `postfix`


### Given a list of lists, joins each list with the given separator, prefix and postfix

```js

```

## joinTo

###

## last

###

## `lastHalf(keepMiddle = false)`

### Returns the second half of the list

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

### Returns the last valid index of the list

```js
const numbers = listOf(3, 4, 5, 6);
let lastIndex = numbers.lastIndex;
console.log(lastIndex);
// 3
```

## lastOfEach

###

## lastOrNull

###

## mapAsync

###

## mapNotNull

###

## mapNotNullTo

###

## mapTo

###

## mapWith

###

## match

###

## matchOrNull

###

## `max()`

### Finds the max number in the arguments provided

```js
const input = listOf(3, 18, -4, 15, 6, -17);
let output = input.max();
console.log(output);
// 18
```

## maxOf

###

## `mean()`

### Returns the average of the list

```js
const input = listOf(3, 18, -4, 15, 6, -17);
let output = input.mean();
console.log(output);
// 3.5
```

## `median()`

### Returns the median number in the list

```js
const input = listOf(3, 18, -4, 15, 6, -17);
let output = input.median();
console.log(output);
// 6
```

## `min()`

### Finds the min number in the arguments provided

```js
const input = listOf(3, 18, -4, 15, 6, -17);
let output = input.min();
console.log(output);
// -17
```

## minOf

###

## `minmax()`

### Returns a list containing the min and the max value of the numbers in the list

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

## mode()

### Returns the most frequently occuring element in the list

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

## none

###

## nthOfEach

###

## pairWith

###

## partition

###

## plus

###

## power

###

## product

###

## random()

### Returns a randomly chosen element within the list

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

### Returns a list of numbers counting from start to end

## `repeat(n=1)`

### Repeats the list n times and returns the result

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

## replace(element, replacer, count = -1)


### Replaces every occurence of an element in a list with a new value

   * @param `element` - the element to replace
   * @param `replacer` - the replacer
   * @param `count` - indicates how many elements to replace, default is `-1` which indicates replace all

```js
const input = listOf("a", "b", "c", "a", "b");
let output = input.replace("a", "d");
console.log(output);
// List(5) [ 'd', 'b', 'c', 'd', 'b' ]

output = input.replace("a", "d", 1);
console.log(output);
// List(5) [ 'd', 'b', 'c', 'a', 'b' ]
```

## round

###

## sample(sampleSize, allowRepeats = true)

### Returns a randomly chosen sample of elements within the list.
* If `allowRepeats` is set to `false`, `sampleSize` cannot be greater than the list length, or else an error will be thrown

```js
const input = listOf("apple", "banana", "carrot", "lettuce", "eggplant");
let output = input.sample(3);
console.log(output);
// List(3) [ 'lettuce', 'eggplant', 'apple' ]

output = input.sample(3, false);
console.log(output);
// List(3) [ 'eggplant', 'banana', 'carrot' ]

output = input.sample(6, false);
console.log(output);
// Error: Sample size '6' is greater than list length '5'
```

## scan

###

## `search(query, caseSensitive=false)`

### Searches for a string in an array and returns the search results as a list

```js
const input = listOf("Chocolate milkshake", "Chocolate cake", "Jammy crumpets", "Cream fraiche", "Almond chocolate croissant");
let output = input.search("Chocolate");
console.log(output);
// List(3) [
//   'Chocolate milkshake',
//   'Chocolate cake',
//   'Almond chocolate croissant'
// ]

output = input.search("Chocolate", true);
console.log(output);
// List(2) [ 'Chocolate milkshake', 'Chocolate cake' ]
```

## second

###

## secondHalf

###

## secondOrNull

###

## `segment(parts)`

### Splits a list down into a number of smaller lists all of equal size, as specified by parts

```js
const input = listOf(2, 6, 9, -1, 3);
const output = input.segment(3);
console.log(output);
// List(2) [ 
//   List(3) [ 2, 6, 9 ], 
//   List(2) [ -1, 3 ] 
// ]
```

## seventh

###

## seventhOrNull

###

## `shuffled()`

### Returns a new list with its original elements randomly shuffled

```js
const input = listOf('a', 'b', 'c', 'd', 'e', 'f');
let output = input.shuffled();
console.log(output);
// List(6) [ 'b', 'a', 'd', 'c', 'f', 'e' ]
```

## single

###

## singleOrNull

###

## sixth

###

## sixthOrNull

###

## size

###

## sortBy

###

## sortByDescending

###

## sortNumbers

###

## sortNumbersDescending

###

## sortedBy

###

## sortedByDescending

###

## `splitEach(...separators)`

### Given a list of separators, splits each string in the list at each of the given separators

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
// List(3) [
//   List(2) [ 'Foo', 'Bar' ],
//   List(2) [ 'Baz', 'Test' ],
//   List(2) [ 'Hello', 'World' ]
// ]
```

## `stdev()`

### Calculates the standard deviation of the list of numbers

```js
const input = listOf(5, 17, -15, 3, 1, 8);
let output = input.stdev();
console.log(output);
// 9.598900399987954
```

## `subList(fromIndex, toIndex)`

### Creates a sub list based on the fromIndex and toIndex

```js
const input = listOf(16,17,18,19,20,21,22,23);
let output = input.subList(3,7);
console.log(output);
// List(4) [ 19, 20, 21, 22 ]
```

## `sum()`

### Returns the sum of all elements in a list

```js
const input = listOf(5, 17, -15, 3, 1, 8);
let output = input.sum();
console.log(output);
// 19
```

## sumOf

###

## `tail(n=1)`

### Returns the last `n` elements in a list

```js
const numbers = listOf(3,4,5,6,7,8,9,10,11);
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

## toFixed

###

## `toLowerCase()`

### Converts all elements in the list to lower case

```js
const input = listOf('Apple','Banana','CARROT');
const output = input.toLowerCase();
console.log(output);
// List(3) [ 'apple', 'banana', 'carrot' ]
```

## `toMap()`

### Converts a list of lists to a map

```js
const numbers = listOf(['a',1], ['b',2], ['c',3]);
let output = numbers.toMap();
console.log(output);
// Map { 'a' => 1, 'b' => 2, 'c' => 3 }
```

## `toObject()`

### Converts a list of lists to an object

```js
const input = listOf(['a',1], ['b',2], ['c',3]);
let output = input.toObject();
console.log(output);
// { a: 1, b: 2, c: 3 }
```

## `toUpperCase()`

### Converts all elements in the list to upper case

```js
const input = listOf('Apple','Banana','CARROT');
const output = input.toUpperCase();
console.log(output);
// List(3) [ 'APPLE', 'BANANA', 'CARROT' ]
```

## `trimEach()`

###

## `union(list)`

### Returns a `Set` containing all distinct elements from both collections.

```js
const numbers = listOf(3,4,5,6,7);
let output = numbers.union(listOf(6,7,5,8,9));
console.log(output);
// Set { 6, 7, 5 }
```

## `unique()`

### Alias for `distinct()`

```js
const fruits = listOf("apple", "apple", "orange", "banana", "banana", "pear");
const unique = fruits.unique();
console.log(unique);
// List(4) [ 'apple', 'orange', 'banana', 'pear' ]
```

## unzip

###

## zip

###

##
