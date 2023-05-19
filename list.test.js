const {
  listOf,
  tripleOf,
  List,
  Pair,
  pairOf,
  mapOf,
  Table,
} = require("./public/List");

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

const l = listOf(
  { id: 3, name: "apple" },
  { id: 5, name: "orange" },
  { id: 19, name: "banana" },
  { id: 32, name: "pear" }
);

// console.log(l.reduce((acc,cur) => acc+cur.id, it => it.id, 0));

function timeInSeconds(str) {
  const regex = /^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?$/gi;
  const matches = str.trim().match(regex).split(/:| |_/);
  const toS = (part, sep) =>
    parseInt(part.substring(0, part.indexOf(sep)) || 0);

  if (!matches) {
    return null; // Invalid format
  }

  console.log({ matches });

  let seconds = 0;
  for (const match of matches) {
    if (!match) continue;
    const t = match[match.length - 1].toLowerCase();
    switch (t) {
      case "h":
        seconds += toS(match, "h") * 3600;
        break;
      case "m":
        seconds += toS(match, "m") * 60;
        break;
      case "s":
        seconds += toS(match, "s") * 1000;
        break;
      default:
        return null;
    }
  }

  if (seconds < 0) {
    return null; // Negative durations not supported
  }

  return seconds;
}

function timeInMilliseconds(str) {
  return timeInSeconds(str) * 1000;
}

// console.log("g-man".extend().capitalize());

const list1 = listOf("id", "name");
const list2 = listOf(12, "Jake");

let output = list1.mapWith(list2);

console.log(output);
// Map { 'id' => 12, 'name' => 'Jake' }
