import { listOf } from "./public/List";
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
