import { List, listFrom, listOf, str } from "./public/List";
import fs from "fs";

// const l = listOf("Foo:Test", "Boo:Best", "Bar:Jest", "Baz:Test1");
// const fs = require("fs");

// const o = {
//   foo: "test",
//   boo: "best",
//   bar: "jest",
//   baz: "test1",
// };

// const n = listOf(
//   "foo",
//   "bar",
//   "punjeet",
//   "garply",
//   "baz",
//   "qux",
//   "quux",
//   "foo",
//   "corge",
//   "grault",
//   "corge",
//   "garply",
//   "waldo",
//   "fred",
//   "waldo",
//   "plugh"
// );
// // console.log(n.shuffled());

// // function extractCommentsFromFile(filePath, outputFilePath) {
// //   fs.readFile(filePath, 'utf-8', (err, data) => {
// //     if (err) {
// //       console.error(err);
// //       return;
// //     }

// //     const regex = /\/\*\*[\s\S]*?\*\//g;
// //     const comments = data.match(regex);

// //     fs.writeFile(outputFilePath, comments.join('\n\n'), (err) => {
// //       if (err) {
// //         console.error(err);
// //         return;
// //       }
// //       console.log(`JS-Doc comments extracted from ${filePath} and written to ${outputFilePath}`);
// //     });
// //   });
// // }

// // // Example usage
// // extractCommentsFromFile('./public/List.js', './output/List-comments.txt');

// // fs.writeFileSync('./output/list.txt', Object.getOwnPropertyNames(Object.getPrototypeOf(new List())).join("\n"))

// const list1 = listOf(1, 2, 3);
// const list2 = tripleOf("a", "b", "c").toList().delete("c");
// const list3 = listOf(true, false, true);

// const zipped = list1.zip(list2, list3);

// const d = listOf([1, "a"], [2, "b"], [3, "c"]);
// console.log(List.from(["l"]));

// const snakes = listOf("s", "s", "b", "n", "x", "x", "f", "n", "x");

// const b = listOf("a", "b", "c", "d", "e", "f", "g");

// console.log(b.reversed(), b);

// const fruits = listOf(
//   { name: "apple", type: "fruit" },
//   { name: "banana", type: "fruit" },
//   { name: "brocolli", type: "vegetable" }
// );
// let associated = fruits.associateWith((fruit) => fruit.type);
// // console.log(associated);

// let numbers = listOf(
//   32,
//   78,
//   56,
//   19,
//   22,
//   31,
//   40,
//   21,
//   29,
//   39,
//   20,
//   55,
//   43,
//   19,
//   39
// );

// let fifth = numbers.fifth();
// console.log(fifth);
// // 22

// fifth = numbers.fifth((it) => it > 30);
// console.log(fifth);
// // 40

// fifth = numbers.fifth((it) => it > 40);
// console.log(fifth);
// NoSuchElementException [Error]: No such element
// List(4) [
//   { id: 3, name: 'apple' },
//   { id: 5, name: 'orange' },
//   { id: 19, name: 'banana' },
//   { id: 32, name: 'pear' }
// ]

// const numbers = listOf(Math.round(Math.random() * 10000000000));
// const english = numbers.toEnglish();
// console.log(numbers, english);

// const p = pairOf("a", 1);

// console.log(p);

// const m = mapOf(pairOf("a", 1), tripleOf("b", 2, -1), pairOf("c", 3), pairOf("d", 1));

// console.log(m);

// const l = listOf(
//   { id: 3, name: "apple" },
//   { id: 5, name: "orange" },
//   { id: 19, name: "banana" },
//   { id: 32, name: "pear" }
// );

// class CustomIterable {
//   #items;

//   constructor(...items) {
//     this.#items = items;
//   }

//   *[Symbol.iterator]() {
//     for (const item of this.#items) {
//       yield item;
//     }
//   }
// }

// Object.prototype[Symbol.iterator] = function* () {
//   for (const [key, value] of Object.entries(this)) {
//     yield [key, value];
//   }
// };

// Object.prototype.forEach = function (callback) {
//   for (const it of this) {
//     callback(it);
//   }
// };

// Object.prototype.map = function (callback) {
//   for (const it of this) {
//     callback(it);
//   }
// };

// // console.log(l.reduce((acc,cur) => acc+cur.id, it => it.id, 0));

// function timeInSeconds(str) {
//   const regex = /^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?$/gi;
//   const matches = str.trim().match(regex).split(/:| |_/);
//   const toS = (part, sep) =>
//     parseInt(part.substring(0, part.indexOf(sep)) || 0);

//   if (!matches) {
//     return null; // Invalid format
//   }

//   console.log({ matches });

//   let seconds = 0;
//   for (const match of matches) {
//     if (!match) continue;
//     const t = match[match.length - 1].toLowerCase();
//     switch (t) {
//       case "h":
//         seconds += toS(match, "h") * 3600;
//         break;
//       case "m":
//         seconds += toS(match, "m") * 60;
//         break;
//       case "s":
//         seconds += toS(match, "s") * 1000;
//         break;
//       default:
//         return null;
//     }
//   }

//   if (seconds < 0) {
//     return null; // Negative durations not supported
//   }

//   return seconds;
// }

// function timeInMilliseconds(str) {
//   return timeInSeconds(str) * 1000;
// }

// const list1 = listOf(1, 2, 3, 6, 5, 6, 8, -10);
// // const list4 = listOf(4, 5, 6);
// const list2 = listOf(1, 2, 3, 4, 5, 6, 8, 10);
// // const list3 = listOf(5, 6, 7, 8);

// const result = list1.orderedDifference(list2);

// console.log(j);

// const comparison = StringExtended.compareJSON(
//   {
//     transferred: {
//       platformCode: "IDP",
//       modelCode: "a0349162-fc23-4241-9c4c-3a85f1a3c04e",
//       investmentNumber: 36989,
//       units: "150030.145721",
//     },
//   },
//   {
//     transferred: {
//       platformCode: "IDP",
//       modelCode: "a0349162-fc23-4241-9c4c-3a85f1a3c04e",
//       investmentNumber: 36989,
//       units: "150030.145721",
//     },
//   },
// );

// console.log(comparison);

// const table = new Table("cont");

// table.addHeadings("Test1", "Test2");
// table.insertRow("A", "B");
// table.insertRow("C", "D");
// table.insertColumn("Test3");
// table.insertRow("F", "G", "E");

// const result = table.toString();
// table.deleteRow(3);
// table.insertRow("H", "J", "KH");

// table.insertRow({ Test1: "M" });

// console.table(table.tabulate());

// const test = "f";

// const switcher = when(test, {
//   a: "Abba",
//   b: "Beatles",
//   c: "Chuck",
//   else: "None",
// });

// console.log({ switcher });

// const q = new Queue(5, 6, 7, 8);
// console.log(q);

// q.pop();
// console.log(q);

// q.pop();
// console.log(q);

// q.pop();
// console.log(q);

// const s = new Stack(5, 6, 7, 8);
// console.log(s);

// s.pop();
// console.log(s);

// s.pop();
// console.log(s);

// s.pop();
// console.log(s);

// console.log(Object.getOwnPropertyNames(List.prototype).length);

const list = listOf("apple", "apple", "orange", "banana", "banana", "banana");

const result = list.counts();

console.log(result);

const list1 = List.from("abs");
const list2 = List.isList(list1);
const list3 = List.isList([list1]);

console.log(list1, list2, list3);

// fs.readFile("./public/words_dictionary.json", "utf-8", (err, data) => {
//   const dict = JSON.parse(data);
//   const words = Object.keys(dict);
//   const string = JSON.stringify(words);
//   fs.writeFile("./public/words_dictionary_clean.json", string, "utf8", () => {
//     console.log("Done");
//   });
// });
// console.log(
//   str(
//     "This is this cat this is is cat this is how cat this is to cat this is keep cat this is a cat this is retard cat this is busy cat this is for cat this is forty cat this is seconds cat"
//   )
//     .listWords()
//     .chunked(4)
//     .nthOfEach(2)
//     .join(" ")
// );

// Let's stay you have a list of order items

// const orderItems = [
//   {
//     item: "Shoes",
//     type: "Bottom Wear",
//     price: 20.99,
//     quantity: 2,
//     discounted: false,
//   },
//   {
//     item: "Pants",
//     type: "Bottom Wear",
//     price: 49.99,
//     quantity: 3,
//     discounted: false,
//   },
//   {
//     item: "Socks",
//     type: "Bottom Wear",
//     price: 6.99,
//     quantity: 6,
//     discounted: false,
//   },
//   {
//     item: "T-Shirts",
//     type: "Top Wear",
//     price: 10.99,
//     quantity: 4,
//     discounted: true,
//   },
//   {
//     item: "Business Shirts",
//     type: "Top Wear",
//     price: 59.99,
//     quantity: 5,
//     discounted: false,
//   },
//   {
//     item: "Ties",
//     type: "Top Wear",
//     price: 20.99,
//     quantity: 5,
//     discounted: true,
//   },
// ];

// // And you need to find the total cost of each of the "type" of items with regular JavaScript

// const topwearPrices = orderItems
//   .filter((it) => it.type === "Top Wear")
//   .reduce((acc, cur) => +acc + cur.price * cur.quantity, 0);

// const bottomwearPrices = orderItems
//   .filter((it) => it.type === "Bottom Wear")
//   .reduce((acc, cur) => +acc + cur.price * cur.quantity, 0);

// console.log({ topwearPrices, bottomwearPrices });

// // With list:

// const [topwearPrices1, bottomwearPrices1] = listFrom(orderItems)
//   .partition((it) => it.type === "Top Wear")
//   .map((it) => it.sumOf((item) => item.price * item.quantity));

// console.log({ topwearPrices1, bottomwearPrices1 });

const listUsers = listOf(
  { id: 1, name: "Tony" },
  { id: 2, name: "Brad" },
  { id: 4, name: "Callum" },
  { id: 5, name: "Mark" },
  { id: 6, name: "Anthony" }
);

const newusers = listUsers.insertAt(2, { id: 3, name: "John" });

listUsers.deleteAt(5);

console.log(newusers.secondOrNull((it) => !!it.id));

console.log(listOf(2,3,4,5,6,7,8,9).clamp(4,7));