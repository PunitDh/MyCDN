const {
  listOf,
  tripleOf,
  listOfType,
  List,
  Utils,
  StringExtended,
} = require("./public/List");

const l = listOf("Foo:Test", "Boo:Best", "Bar:Jest", "Baz:Test1");

const o = {
  foo: "test",
  boo: "best",
  bar: "jest",
  baz: "test1",
};

const n = listOf(
  "foo",
  "bar",
  "punjeet",
  "garply",
  "baz",
  "qux",
  "quux",
  "foo",
  "corge",
  "grault",
  "corge",
  "garply",
  "waldo",
  "fred",
  "waldo",
  "plugh"
);
// console.log(n.shuffled());

// console.log(JSON.stringifyObject.getOwnPropertyNames(Object.getPrototypeOf(new List())).sort())

const list1 = listOf(1, 2, 3);
const list2 = tripleOf("a", "b", "c").toList().delete("c");
const list3 = listOf(true, false, true);

const zipped = list1.zip(list2, list3);

const d = listOf([1, "a"], [2, "b"], [3, "c"]);
console.log(List.from(["l"]));
