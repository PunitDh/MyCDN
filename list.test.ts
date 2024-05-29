import {
  deepEquals,
  emptyList,
  IllegalArgumentError,
  IndexOutOfBoundsError,
  List,
  listFrom,
  listOf,
  NoSuchElementError,
  RoundingMode,
  str,
  when,
} from "./public/List";

describe(List, () => {
  const list = listOf(4, 5, 6, 7, 6);

  const users = listOf(
    { id: null, name: "Tony", isAdmin: null },
    { id: null, name: "Dave", isAdmin: null },
    { id: null, name: "Pat", isAdmin: null },
    { id: null, name: "Chris", isAdmin: null },
    { id: 39, name: "Fred", isAdmin: null },
    { id: 105, name: "George", isAdmin: null },
    { id: 111, name: "Eden", isAdmin: null }
  );

  const people = listOf(
    { id: 10, name: "Tony" },
    { id: 20, name: "Dave" },
    { id: 30, name: "Pat" },
    { id: 35, name: "Chris" },
    { id: 39, name: "Fred" },
    { id: 105, name: "George" },
    { id: 111, name: "Eden" }
  );

  describe(listOf, () => {
    it("should create a list", () => {
      expect(list.size).toBe(5);
      expect(list.indices).toEqual(listOf(0, 1, 2, 3, 4));
      expect(list.lastIndex).toBe(4);
      expect(list.depth).toBe(0);
      expect(list).toBeInstanceOf(List);
    });
  });

  describe(listFrom, () => {
    it("should create a list from an array", () => {
      const array = [6, 3, 7, -1, 2];
      const list = listFrom(array);
      expect(list.size).toBe(5);
      expect(list.indices).toEqual(listOf(0, 1, 2, 3, 4));
      expect(list.lastIndex).toBe(4);
      expect(list.depth).toBe(0);
      expect(list).toEqual(listOf(6, 3, 7, -1, 2));
      expect(list).toBeInstanceOf(List);
    });
  });

  describe(emptyList, () => {
    it("should create an empty list", () => {
      const list = emptyList();
      expect(list.size).toBe(0);
      expect(list.indices).toEqual(listOf());
      expect(list.lastIndex).toBe(-1);
      expect(list.depth).toBe(0);
      expect(list).toEqual(listOf());
      expect(list).toBeInstanceOf(List);
    });
  });

  describe(list.get, () => {
    it("should get an element", () => {
      expect(list.get(1)).toBe(5);
      expect(list.get(-1)).toBe(6);
      expect(list.get(1, 20)).toBe(5);
      expect(list.get(7, 20)).toBe(20);
    });
  });

  describe(list.contains, () => {
    it("should check if list contains any of the provided element", () => {
      expect(list.contains(1)).toBeFalsy();
      expect(list.contains(1, 20)).toBeFalsy();
      expect(list.contains(4, 5, 8)).toBeTruthy();
      expect(list.contains(5, 6)).toBeTruthy();
    });
  });

  describe(list.containsAll, () => {
    it("should check if list contains all of the provided element", () => {
      expect(list.containsAll(1)).toBeFalsy();
      expect(list.containsAll(4, 5, 8)).toBeFalsy();
      expect(list.containsAll(4, 5, 7)).toBeTruthy();
      expect(list.containsAll(5, 6)).toBeTruthy();
    });
  });

  describe(list.subList, () => {
    it("should create a sublist", () => {
      expect(list.subList(1, 3)).toEqual(listOf(5, 6));
      expect(list.subList(4, 5)).toEqual(listOf(6));
      expect(list.subList(4, 5)).toEqual(listOf(6));
      expect(list.subList(5, 6)).toEqual(listOf());
    });
  });

  describe(list.first, () => {
    it("should get the first element, or the first element that matches the predicate", () => {
      expect(list.first()).toEqual(4);
      expect(listOf().first()).toBeUndefined();
      expect(list.first((it) => it > 6)).toEqual(7);
      expect(() => listOf<number>().first((it) => it > 3)).toThrow(
        NoSuchElementError
      );
    });
  });

  describe(list.firstOrNull, () => {
    it("should get the first element that matches the predicate or null", () => {
      expect(list.firstOrNull((it) => it > 6)).toEqual(7);
      expect(list.firstOrNull((it) => it > 8)).toBeNull();
      expect(listOf<number>().firstOrNull((it) => it > 8)).toBeNull();
    });
  });

  describe(list.second, () => {
    it("should get the second element that matches the predicate", () => {
      expect(list.second((it) => it > 5)).toEqual(7);
      expect(() => listOf<number>().second((it) => it > 3)).toThrow(
        NoSuchElementError
      );
    });
  });

  describe(list.secondOrNull, () => {
    it("should get the second element that matches the predicate", () => {
      expect(list.secondOrNull((it) => it > 6)).toBeNull();
      expect(listOf<number>().secondOrNull((it) => it > 8)).toBeNull();
    });
  });

  describe(list.third, () => {
    it("should get the third element that matches the predicate", () => {
      expect(list.third((it) => it > 4)).toEqual(7);
      expect(() => listOf<number>().third((it) => it > 3)).toThrow(
        NoSuchElementError
      );
    });
  });

  describe(list.thirdOrNull, () => {
    it("should get the third element that matches the predicate", () => {
      expect(list.thirdOrNull((it) => it > 6)).toBeNull();
      expect(listOf<number>().thirdOrNull((it) => it > 8)).toBeNull();
    });
  });

  describe(list.match, () => {
    it("should get the nth element that matches the predicate", () => {
      expect(list.match((it) => it > 4, 3)).toEqual(7);
      expect(() => listOf<number>().match((it) => it > 3, 1)).toThrow(
        NoSuchElementError
      );
    });
  });

  describe(list.matchOrNull, () => {
    it("should get the nth element that matches the predicate", () => {
      expect(list.matchOrNull((it) => it > 6, 1)).toBe(7);
      expect(listOf<number>().matchOrNull((it) => it > 8, 2)).toBeNull();
    });
  });

  describe(list.last, () => {
    it("should get the last element that matches the predicate", () => {
      expect(list.last((it) => it > 4)).toEqual(6);
      expect(() => listOf<number>().last((it) => it > 3)).toThrow(
        NoSuchElementError
      );
    });
  });

  describe(list.lastOrNull, () => {
    it("should get the last element that matches the predicate", () => {
      expect(list.lastOrNull((it) => it > 6)).toBe(7);
      expect(listOf<number>().lastOrNull((it) => it > 8)).toBeNull();
    });
  });

  describe(list.firstOfEach, () => {
    it("should get the first element of each list", () => {
      const result = listOf(
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["x", "y", "z"]
      ).firstOfEach();
      expect(result).toEqual(listOf("a", "d", "x"));
    });
  });

  describe(list.lastOfEach, () => {
    it("should get the last element of each list", () => {
      const result = listOf(
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["x", "y", "z"]
      ).lastOfEach();
      expect(result).toEqual(listOf("c", "f", "z"));
    });
  });

  describe(list.nthOfEach, () => {
    it("should get the nth element of each list", () => {
      const result = listOf(
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["x", "y", "z"]
      ).nthOfEach(1);
      expect(result).toEqual(listOf("b", "e", "y"));
    });
  });

  describe(list.joinWith, () => {
    it("should joinWith", () => {
      expect(listOf("a", "b", "c").joinWith("-")).toBe("a-b-c");
      expect(listOf("a", "b", "c").joinWith("-", "<")).toBe("<a-b-c");
      expect(listOf("a", "b", "c").joinWith("-", undefined, ">")).toBe(
        "a-b-c>"
      );
      expect(listOf("a", "b", "c").joinWith("-", "<", ">")).toBe("<a-b-c>");
    });
  });

  describe(list.joinEach, () => {
    it("should joinEach", () => {
      const result = listOf(
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["x", "y", "z"]
      ).joinEach("-", "<", ">");
      expect(result).toEqual(listOf("<a-b-c>", "<d-e-f>", "<x-y-z>"));
    });
  });

  describe(list.splitEach, () => {
    it("should splitEach", () => {
      const list = listOf("a-b:c", "d-e:f");

      expect(list.splitEach("-")).toEqual(
        listOf(listOf("a", "b:c"), listOf("d", "e:f"))
      );
      expect(list.splitEach("-", ":")).toEqual(
        listOf(listOf("a", "b", "c"), listOf("d", "e", "f"))
      );
    });
  });

  describe(list.trimEach, () => {
    it("should trim each string", () => {
      const list = listOf("abc    ", "   foo");
      expect(list.trimEach()).toEqual(listOf("abc", "foo"));
    });
  });
  describe(list.firstNotNull, () => {
    const list = listOf(null, null, undefined, null, 39, 105);
    it("should find the first not null element in the list", () => {
      expect(list.firstNotNull()).toBe(39);
      expect(list.firstNotNull(false)).toBeUndefined();
    });
  });

  describe(users.firstNotNullOf, () => {
    it("should get the first not null element matching the predicate", () => {
      expect(users.firstNotNullOf((it) => it.id)).toBe(39);
    });

    it("should throw if no matching element was found", () => {
      expect(() => users.firstNotNullOf((it) => it.isAdmin)).toThrow(
        NoSuchElementError
      );
    });
  });

  describe(users.firstNotNullOfOrNull, () => {
    it("should get the first not null element matching the predicate", () => {
      expect(users.firstNotNullOfOrNull((it) => it.id)).toBe(39);
    });

    it("should return null if no matching element was found", () => {
      expect(users.firstNotNullOfOrNull((it) => it.isAdmin)).toBeNull();
    });
  });

  describe(users.halve, () => {
    it("should halve a given list", () => {
      expect(users.halve()).toEqual(
        listOf<any>(
          listOf(
            { id: null, name: "Tony", isAdmin: null },
            { id: null, name: "Dave", isAdmin: null },
            { id: null, name: "Pat", isAdmin: null },
            { id: null, name: "Chris", isAdmin: null }
          ),
          listOf(
            { id: 39, name: "Fred", isAdmin: null },
            { id: 105, name: "George", isAdmin: null },
            { id: 111, name: "Eden", isAdmin: null }
          )
        )
      );
    });

    it("should place the middle element of an odd-numbered list of elements in the first half of the list", () => {
      expect(users.halve(false)).toEqual(
        listOf<any>(
          listOf(
            { id: null, name: "Tony", isAdmin: null },
            { id: null, name: "Dave", isAdmin: null },
            { id: null, name: "Pat", isAdmin: null }
          ),
          listOf(
            { id: null, name: "Chris", isAdmin: null },
            { id: 39, name: "Fred", isAdmin: null },
            { id: 105, name: "George", isAdmin: null },
            { id: 111, name: "Eden", isAdmin: null }
          )
        )
      );
    });
  });

  describe(users.firstHalf, () => {
    it("should get the first half of a given list", () => {
      expect(users.firstHalf()).toEqual(
        listOf(
          { id: null, name: "Tony", isAdmin: null },
          { id: null, name: "Dave", isAdmin: null },
          { id: null, name: "Pat", isAdmin: null },
          { id: null, name: "Chris", isAdmin: null }
        )
      );
    });

    it("should place the middle element of an odd-numbered list of elements in the first half of the list", () => {
      expect(users.firstHalf(false)).toEqual(
        listOf(
          { id: null, name: "Tony", isAdmin: null },
          { id: null, name: "Dave", isAdmin: null },
          { id: null, name: "Pat", isAdmin: null }
        )
      );
    });
  });

  describe(users.secondHalf, () => {
    it("should get the second half of a given list", () => {
      expect(users.secondHalf()).toEqual(
        listOf(
          { id: null, name: "Chris", isAdmin: null },
          { id: 39, name: "Fred", isAdmin: null },
          { id: 105, name: "George", isAdmin: null },
          { id: 111, name: "Eden", isAdmin: null }
        )
      );
    });

    it("should not place the middle element of an odd-numbered list of elements in the second half of the list", () => {
      expect(users.secondHalf(true)).toEqual(
        listOf(
          { id: 39, name: "Fred", isAdmin: null },
          { id: 105, name: "George", isAdmin: null },
          { id: 111, name: "Eden", isAdmin: null }
        )
      );
    });
  });

  describe(users.lastHalf, () => {
    it("should get the last half of a given list", () => {
      expect(users.lastHalf()).toEqual(
        listOf(
          { id: null, name: "Chris", isAdmin: null },
          { id: 39, name: "Fred", isAdmin: null },
          { id: 105, name: "George", isAdmin: null },
          { id: 111, name: "Eden", isAdmin: null }
        )
      );
    });

    it("should not place the middle element of an odd-numbered list of elements in the last half of the list", () => {
      expect(users.lastHalf(true)).toEqual(
        listOf(
          { id: 39, name: "Fred", isAdmin: null },
          { id: 105, name: "George", isAdmin: null },
          { id: 111, name: "Eden", isAdmin: null }
        )
      );
    });
  });

  describe(users.drop, () => {
    it("should drop the first n elements of a list", () => {
      expect(users.drop(4)).toEqual(
        listOf(
          { id: 39, name: "Fred", isAdmin: null },
          { id: 105, name: "George", isAdmin: null },
          { id: 111, name: "Eden", isAdmin: null }
        )
      );
    });
  });

  describe(users.dropLast, () => {
    it("should drop the last n elements of a list", () => {
      expect(users.dropLast(4)).toEqual(
        listOf(
          { id: null, name: "Tony", isAdmin: null },
          { id: null, name: "Dave", isAdmin: null },
          { id: null, name: "Pat", isAdmin: null }
        )
      );
    });
  });

  describe(users.take, () => {
    it("should take the first n elements of a list", () => {
      expect(users.take(3)).toEqual(
        listOf(
          { id: null, name: "Tony", isAdmin: null },
          { id: null, name: "Dave", isAdmin: null },
          { id: null, name: "Pat", isAdmin: null }
        )
      );
    });
  });

  describe(users.takeLast, () => {
    it("should take the last n elements of a list", () => {
      expect(users.takeLast(3)).toEqual(
        listOf(
          { id: 39, name: "Fred", isAdmin: null },
          { id: 105, name: "George", isAdmin: null },
          { id: 111, name: "Eden", isAdmin: null }
        )
      );
    });
  });

  describe(users.takeWhile, () => {
    it("should take the last n elements of a list", () => {
      expect(users.takeWhile((it) => Number(it.id) > 50)).toEqual(
        listOf(
          { id: 105, name: "George", isAdmin: null },
          { id: 111, name: "Eden", isAdmin: null }
        )
      );

      expect(listOf(2, 4, 6, 3, 8, 10).takeWhile((it) => it % 2 === 0)).toEqual(
        listOf(2, 4, 6)
      );
    });
  });

  describe(users.takeLastWhile, () => {
    it("should take the last n elements of a list", () => {
      expect(users.takeLastWhile((it) => it.id === null)).toEqual(
        listOf(
          { id: null, name: "Tony", isAdmin: null },
          { id: null, name: "Dave", isAdmin: null },
          { id: null, name: "Pat", isAdmin: null },
          { id: null, name: "Chris", isAdmin: null }
        )
      );

      expect(
        listOf(2, 4, 6, 3, 8, 10).takeLastWhile((it) => it % 2 === 0)
      ).toEqual(listOf(8, 10));
    });
  });

  describe(people.dropWhile, () => {
    it("should drop the first n elements of a list that match the predicate", () => {
      expect(people.dropWhile((it) => it.id < 50)).toEqual(
        listOf({ id: 105, name: "George" }, { id: 111, name: "Eden" })
      );

      expect(listOf(2, 4, 6, 3, 8, 10).dropWhile((it) => it % 2 === 0)).toEqual(
        listOf(3, 8, 10)
      );
    });
  });

  describe(people.dropLastWhile, () => {
    it("should drop the last n elements of a list that match the given predicate", () => {
      expect(people.dropLastWhile((it) => it.id > 50)).toEqual(
        listOf(
          { id: 10, name: "Tony" },
          { id: 20, name: "Dave" },
          { id: 30, name: "Pat" },
          { id: 35, name: "Chris" },
          { id: 39, name: "Fred" }
        )
      );

      expect(
        listOf(2, 4, 6, 3, 8, 10).dropLastWhile((it) => it % 2 === 0)
      ).toEqual(listOf(2, 4, 6, 3));
    });
  });

  describe(list.elementAt, () => {
    it("should return element at position", () => {
      expect(list.elementAt(4)).toBe(6);
      expect(list.elementAt(-2)).toBe(7);
      expect(() => list.elementAt(5)).toThrow(IndexOutOfBoundsError);
    });
  });

  describe(list.elementAtOrElse, () => {
    it("should return element at position or the default value", () => {
      expect(list.elementAtOrElse(4, 20)).toBe(6);
      expect(list.elementAtOrElse(-2, 20)).toBe(7);
      expect(list.elementAtOrElse(5, 20)).toBe(20);
    });
  });

  describe(list.elementAtOrNull, () => {
    it("should return element at position or the default value", () => {
      expect(list.elementAtOrNull(4)).toBe(6);
      expect(list.elementAtOrNull(-2)).toBe(7);
      expect(list.elementAtOrNull(5)).toBeNull();
    });
  });

  describe(list.ifEmpty, () => {
    it("should run a function or return a given value if list is empty", () => {
      expect(listOf(1).ifEmpty(4)).toEqual(listOf(1));
      expect(listOf().ifEmpty(20)).toBe(20);
      expect(listOf().ifEmpty(() => 4 + 5)).toBe(9);
    });
  });

  describe(list.ifNotEmpty, () => {
    it("should run a function or return a given value if list is not empty", () => {
      expect(listOf(1, 2).ifNotEmpty((list) => list.sum())).toEqual(3);
      expect(listOf(1, 2).ifNotEmpty(5)).toEqual(5);
      expect(listOf<number>().ifNotEmpty((list) => list.sum())).toEqual(
        listOf()
      );
    });
  });

  describe(list.add, () => {
    const fruits = listOf("apple", "banana");
    it("should add elements to the list mutating the original", () => {
      expect(fruits.add("cherry", "dragonfruit")).toEqual(
        listOf("apple", "banana", "cherry", "dragonfruit")
      );
      expect(fruits).toEqual(
        listOf("apple", "banana", "cherry", "dragonfruit")
      );
    });
  });

  describe(list.delete, () => {
    const fruits = listOf("apple", "banana", "cherry", "dragonfruit", "banana");
    it("should remove given elements from list mutating the original", () => {
      expect(fruits.delete("dragonfruit")).toEqual(
        listOf("apple", "banana", "cherry", "banana")
      );
      expect(fruits).toEqual(listOf("apple", "banana", "cherry", "banana"));
      expect(fruits.delete("banana")).toEqual(listOf("apple", "cherry"));
    });
  });

  describe(list.plus, () => {
    const fruits = listOf("apple", "banana");
    it("should return the original list with new elements without mutating the original", () => {
      expect(fruits.plus("cherry", "dragonfruit")).toEqual(
        listOf("apple", "banana", "cherry", "dragonfruit")
      );
      expect(fruits).toEqual(listOf("apple", "banana"));
    });
  });

  describe(list.clear, () => {
    const fruits = listOf("apple", "banana");
    it("should clear the list and mutate the original list", () => {
      expect(fruits.clear()).toEqual(listOf());
      expect(fruits).toEqual(listOf());
    });
  });

  describe(list.filterIsInstance, () => {
    class Fruit {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
    }

    class Vegetable {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
    }

    const fruits = listOf(
      new Fruit("apple"),
      new Fruit("banana"),
      new Vegetable("potato")
    );

    it("should filter out all the values that are an instance of a particular class", () => {
      expect(fruits.filterIsInstance(Fruit)).toEqual(
        listOf(new Fruit("apple"), new Fruit("banana"))
      );
    });
  });

  describe(list.filterIsInstanceTo, () => {
    class Fruit {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
    }

    class Vegetable {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
    }

    const originalList = listOf(new Fruit("dragonfruit"), new Fruit("cherry"));

    const fruits = listOf(
      new Fruit("apple"),
      new Fruit("banana"),
      new Vegetable("potato")
    );

    it("should filter out all the values that are an instance of a particular class and add them to a list", () => {
      expect(fruits.filterIsInstanceTo(originalList, Fruit)).toEqual(
        listOf(
          new Fruit("dragonfruit"),
          new Fruit("cherry"),
          new Fruit("apple"),
          new Fruit("banana")
        )
      );
    });
  });

  describe(list.filterNot, () => {
    it("should filter out all the values that do not match the criteria", () => {
      expect(listOf(3, 4, 5, 6, 7).filterNot((x) => x > 5)).toEqual(
        listOf(3, 4, 5)
      );
    });
  });

  describe(list.flatten, () => {
    it("should flatten the list by the given depth", () => {
      const input = listOf<any>(
        [32, 78],
        [56, 23],
        listOf<any>(21, listOf(22, 24))
      );

      expect(input.flatten()).toEqual(listOf<any>(32, 78, 56, 23, 21, 22, 24));
      expect(input.flatten(1)).toEqual(
        listOf<any>(32, 78, 56, 23, 21, listOf(22, 24))
      );
    });
  });

  describe(list.compact, () => {
    it("should remove all falsy values, including 0, undefined, null and empty strings", () => {
      const input = listOf<any>(
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

      expect(input.compact()).toEqual(
        listOf<any>(1, 4, 8, "test", "foo", true)
      );
    });
  });

  describe(list.fold, () => {
    it("should flatten the list by the given depth", () => {
      const input = listOf(1, 2, 3, 4);

      expect(input.fold((a, c) => +a + c, 1)).toEqual(11);
    });
  });

  describe(list.joinTo, () => {
    const htmlTags = listOf("<head>", "<body>");
    const moreTags = listOf("d", "i", "v");

    it("should join the list by the given parameters and add the result to a given list", () => {
      const result = moreTags.joinTo(htmlTags, "", "<", ">");
      expect(result).toEqual(listOf("<head>", "<body>", "<div>"));
    });
  });

  describe(list.mapAsync, () => {
    async function getId(id: number): Promise<string> {
      return new Promise((resolve) => resolve(`id-${id}`));
    }

    const ids = listOf(3, 4, 5);

    it("should perform a map function asynchronously", async () => {
      const result = await ids.mapAsync((id) => getId(id));
      expect(result).toEqual(listOf("id-3", "id-4", "id-5"));
    });
  });

  describe(list.forEachAsync, () => {
    async function getId(id: number): Promise<string> {
      return new Promise((resolve) => resolve(`id-${id}`));
    }

    const ids = listOf(3, 4, 5);

    it("should perform a forEach function asynchronously", async () => {
      const result = listOf();
      await ids.forEachAsync(async (id) => {
        result.push(await getId(id));
      });
      expect(result).toEqual(listOf("id-3", "id-4", "id-5"));
    });
  });

  describe(list.onEach, () => {
    const list = listOf();
    const ids = listOf(3, 4, 5);

    it("should perform a onEach function", () => {
      const result = ids.onEach((id) => {
        list.push(`id-${id}`);
      });
      expect(result).toEqual(listOf(3, 4, 5));
      expect(list).toEqual(listOf("id-3", "id-4", "id-5"));
    });
  });

  describe(list.exclude, () => {
    const fruits = listOf("apple", "banana", "cherry", "dragonfruit", "banana");
    it("should remove given elements from list without mutating the original list", () => {
      expect(fruits.exclude("dragonfruit")).toEqual(
        listOf("apple", "banana", "cherry", "banana")
      );
      expect(fruits.exclude("banana")).toEqual(
        listOf("apple", "cherry", "dragonfruit")
      );
      expect(fruits.exclude("banana", "apple")).toEqual(
        listOf("cherry", "dragonfruit")
      );
      expect(fruits).toEqual(
        listOf("apple", "banana", "cherry", "dragonfruit", "banana")
      );
    });
  });

  describe(list.distinct, () => {
    const fruits = listOf("apple", "banana", "cherry", "cherry", "banana");
    it("should return unique elements in the list", () => {
      expect(fruits.distinct()).toEqual(listOf("apple", "banana", "cherry"));
      expect(fruits).toEqual(
        listOf("apple", "banana", "cherry", "cherry", "banana")
      );
    });
  });

  describe(list.distinctBy, () => {
    const people = listOf(
      { id: 10, name: "Tony" },
      { id: 105, name: "Dave" },
      { id: 20, name: "Dave" },
      { id: 39, name: "Tony" },
      { id: 30, name: "Pat" },
      { id: 35, name: "Chris" },
      { id: 111, name: "Pat" }
    );

    it("should return unique elements in the list given a keyselector", () => {
      expect(people.distinctBy((it) => it.name)).toEqual(
        listOf(
          { id: 10, name: "Tony" },
          { id: 105, name: "Dave" },
          { id: 30, name: "Pat" },
          { id: 35, name: "Chris" }
        )
      );
    });
  });

  describe(list.unique, () => {
    const fruits = listOf("apple", "banana", "cherry", "cherry", "banana");
    it("should return unique elements in the list", () => {
      expect(fruits.unique()).toEqual(listOf("apple", "banana", "cherry"));
      expect(fruits).toEqual(
        listOf("apple", "banana", "cherry", "cherry", "banana")
      );
    });
  });

  describe(list.toUpperCase, () => {
    const fruits = listOf("apple", "banana", "cherry");
    it("should convert every string in the list to uppercase", () => {
      expect(fruits.toUpperCase()).toEqual(listOf("APPLE", "BANANA", "CHERRY"));
    });
  });

  describe(list.toLowerCase, () => {
    const fruits = listOf("APPLE", "BaNaNa", "CherrY");
    it("should convert every string in the list to lowercase", () => {
      expect(fruits.toLowerCase()).toEqual(listOf("apple", "banana", "cherry"));
    });
  });

  describe(list.capitalize, () => {
    const fruits = listOf("aPPLE", "baNaNa", "cheRrY", "dragon fRuit");
    it("should convert every string in the list to capitalized case", () => {
      expect(fruits.capitalize()).toEqual(
        listOf("Apple", "Banana", "Cherry", "Dragon Fruit")
      );
    });
  });

  describe(list.sum, () => {
    const list1 = listOf(1, 2, 3, 4);
    const list2 = listOf(-60, -40, 30, 70);
    const list3 = listOf(-1.25, -4.75, 3.5, 1.5);

    it("should return the sum of a list of numbers, optionally passing an initial value", () => {
      expect(list1.sum()).toEqual(10);
      expect(list2.sum()).toEqual(0);
      expect(list3.sum()).toEqual(-1);
      expect(list3.sum(1)).toEqual(0);
    });
  });

  describe(list.sumOf, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 }
    );

    it("should sum of a list of numbers of the value returned by the key, optionally passing an initial value", () => {
      expect(order.sumOf((it) => it.price)).toEqual(96);
      expect(order.sumOf((it) => it.price, 4)).toEqual(100);
      expect(order.sumOf("price")).toEqual(96);
      expect(order.sumOf("price", 4)).toEqual(100);
    });
  });

  describe(list.product, () => {
    const numbers = listOf(1, 2, 3, 4);

    it("should return the product of a list of numbers, optionally passing an initial value", () => {
      const factorial = numbers.product();
      expect(factorial).toEqual(24);
      expect(numbers.product(5)).toEqual(120);
    });
  });

  describe(list.productOf, () => {
    const textInputs = listOf(
      { name: "input1", value: 1 },
      { name: "input2", value: 2 },
      { name: "input3", value: 3 },
      { name: "input4", value: 4 }
    );

    it("should return the product of a list of numbers, optionally passing an initial value", () => {
      const factorial = textInputs.productOf((it) => it.value);
      expect(factorial).toEqual(24);
      expect(textInputs.productOf((it) => it.value, 5)).toEqual(120);
      expect(textInputs.productOf("value")).toEqual(24);
      expect(textInputs.productOf("value", 5)).toEqual(120);
    });
  });

  describe(list.isEmpty, () => {
    it("should return true if a list is empty", () => {
      expect(listOf().isEmpty()).toBeTruthy();
      expect(listOf(1).isEmpty()).toBeFalsy();
    });
  });

  describe(list.isNotEmpty, () => {
    it("should return false if a list is not empty", () => {
      expect(listOf().isNotEmpty()).toBeFalsy();
      expect(listOf(1).isNotEmpty()).toBeTruthy();
    });
  });

  describe(list.chunked, () => {
    const input = listOf(2, 6, 9, -1, 3);
    it("should chunk a list down into smaller lists", () => {
      expect(input.chunked(2)).toEqual(
        listOf(listOf(2, 6), listOf(9, -1), listOf(3))
      );
    });
  });

  describe(list.segment, () => {
    const input = listOf(2, 6, 9, -1, 3);
    it("should segment a list into equal parts", () => {
      expect(input.segment(2)).toEqual(listOf(listOf(2, 6, 9), listOf(-1, 3)));
    });
  });

  describe(list.includesAll, () => {
    it("should check if list contains all of the provided element", () => {
      expect(list.includesAll(1)).toBeFalsy();
      expect(list.includesAll(4, 5, 8)).toBeFalsy();
      expect(list.includesAll(4, 5, 7)).toBeTruthy();
      expect(list.includesAll(5, 6)).toBeTruthy();
    });
  });

  describe(list.intersect, () => {
    const list1 = listOf(3, 4, 5, 6, 7);
    const list2 = listOf(6, 7, 8, 9, 1);
    it("should check get the common elements between two lists", () => {
      expect(list1.intersect(list2)).toEqual(listOf(6, 7));
    });
  });

  describe(list.intersection, () => {
    const list1 = listOf(3, 4, 5, 6, 7);
    const list2 = listOf(6, 7, 8, 9, 1);
    it("should check get the common elements between two lists", () => {
      expect(list1.intersection(list2)).toEqual(listOf(6, 7));
    });
  });

  describe(list.difference, () => {
    const list1 = listOf(3, 4, 5, 6, 7);
    const list2 = listOf(6, 7, 8, 9, 1);
    it("should gets the elements that are different between two lists", () => {
      expect(list1.difference(list2)).toEqual(listOf(3, 4, 5, 8, 9, 1));
    });
  });

  describe(list.union, () => {
    const list1 = listOf(3, 4, 5, 6, 7);
    const list2 = listOf(6, 7, 8, 9, 1);
    it("should gets the elements that are different between two lists", () => {
      expect(list1.union(list2)).toEqual(listOf(3, 4, 5, 6, 7, 8, 9, 1));
    });
  });

  describe(list.count, () => {
    it("should perform the count function on a list", () => {
      const input = listOf(2, 6, 9, -1, 3, 2, 2, 5);

      expect(input.count()).toBe(8);
      expect(input.count((it) => it > 5)).toBe(2);
      expect(input.count(2)).toBe(3);
    });
  });

  describe(list.max, () => {
    const list1 = listOf(1, 2, 3, 4);
    const list2 = listOf(-60, -40, 30, 70);
    const list3 = listOf(-1.25, -4.75, 3.5, 1.5);

    it("should return max number in the list", () => {
      expect(list1.max()).toBe(4);
      expect(list2.max()).toBe(70);
      expect(list3.max()).toBe(3.5);
    });
  });

  describe(list.min, () => {
    const list1 = listOf(1, 2, 3, 4);
    const list2 = listOf(-60, -40, 30, 70);
    const list3 = listOf(-1.25, -4.75, 3.5, 1.5);

    it("should return min number in the list", () => {
      expect(list1.min()).toBe(1);
      expect(list2.min()).toBe(-60);
      expect(list3.min()).toBe(-4.75);
    });
  });

  describe(list.maxOf, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 }
    );

    it("should get the max of a list of numbers of the value returned by the keyselector", () => {
      expect(order.maxOf((it) => it.price)).toEqual(23);
      expect(order.maxOf("price")).toEqual(23);
    });
  });

  describe(list.minOf, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 }
    );

    it("should get the min of a list of numbers of the value returned by the keyselector", () => {
      expect(order.minOf((it) => it.price)).toEqual(15);
      expect(order.minOf("price")).toEqual(15);
    });
  });

  describe(list.maxBy, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 }
    );

    it("should return the element(s) yielding the largest value of the given function", () => {
      expect(order.maxBy((it) => it.price)).toEqual({
        name: "Pizza",
        price: 23,
      });
      expect(order.maxBy((it) => it.price, true)).toEqual(
        listOf({ name: "Pizza", price: 23 }, { name: "Kebab", price: 23 })
      );
    });
  });

  describe(list.minBy, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 }
    );

    it("should return the element(s) yielding the smallest value of the given function", () => {
      expect(order.minBy((it) => it.price)).toEqual({
        name: "Sushi",
        price: 15,
      });
      expect(order.minBy((it) => it.price, true)).toEqual(
        listOf({ name: "Sushi", price: 15 }, { name: "Cake", price: 15 })
      );
    });
  });

  describe(list.minmax, () => {
    const list1 = listOf(1, 2, 3, 4);
    const list2 = listOf(-60, -40, 30, 70);
    const list3 = listOf(-1.25, -4.75, 3.5, 1.5);

    it("should return min and max numbers in the list", () => {
      expect(list1.minmax()).toEqual({ min: 1, max: 4 });
      expect(list2.minmax()).toEqual({ min: -60, max: 70 });
      expect(list3.minmax()).toEqual({ min: -4.75, max: 3.5 });
    });
  });

  describe(list.minmaxOf, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 }
    );

    it("should get the min and max of a list of numbers of the value returned by the keyselector", () => {
      expect(order.minmaxOf((it) => it.price)).toEqual({ min: 15, max: 23 });
      expect(order.minmaxOf("price")).toEqual({ min: 15, max: 23 });
    });
  });

  describe(list.minmaxBy, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 }
    );

    it("should return the element(s) yielding the min and the max values of the given function", () => {
      expect(order.minmaxBy((it) => it.price)).toEqual({
        min: {
          name: "Sushi",
          price: 15,
        },
        max: {
          name: "Pizza",
          price: 23,
        },
      });
      expect(order.minmaxBy((it) => it.price, true)).toEqual({
        min: listOf({ name: "Sushi", price: 15 }, { name: "Cake", price: 15 }),
        max: listOf({ name: "Pizza", price: 23 }, { name: "Kebab", price: 23 }),
      });
    });
  });

  describe(list.nthLargest, () => {
    const list = listOf(23, 20, 15, 15, 23, 8, 12);

    it("should return nth largest element in the list", () => {
      expect(list.nthLargest(3)).toEqual(20);
      expect(list.nthLargest(3, true)).toEqual(15);
      expect(list.nthLargest(-1)).toEqual(8);
      expect(list.nthLargest(-2)).toEqual(12);
      expect(list.nthLargest(-3)).toEqual(15);
      expect(list.nthLargest(-4, true)).toEqual(20);
      expect(list.nthLargest(-4)).toEqual(15);
    });
  });

  describe(list.nthLargestOf, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 },
      { name: "Ramen", price: 8 },
      { name: "Pho", price: 12 }
    );

    it("should return the nth largest element(s) yielding the value of the given function", () => {
      expect(order.nthLargestOf("price", 3)).toEqual({
        name: "Burger",
        price: 20,
      });
      expect(order.nthLargestOf((it) => it.price, 3)).toEqual({
        name: "Burger",
        price: 20,
      });
    });
  });

  describe(list.nthSmallest, () => {
    const list = listOf(23, 20, 15, 15, 23, 8, 12);

    it("should return nth smallest element in the list", () => {
      expect(list.nthSmallest(3)).toEqual(15);
      expect(list.nthSmallest(3, true)).toEqual(15);
      expect(list.nthSmallest(-1)).toEqual(23);
      expect(list.nthSmallest(-2)).toEqual(23);
      expect(list.nthSmallest(-3)).toEqual(20);
      expect(list.nthSmallest(-4, true)).toEqual(12);
      expect(list.nthSmallest(-4)).toEqual(15);
    });
  });

  describe(list.nthSmallestOf, () => {
    const order = listOf(
      { name: "Pizza", price: 23 },
      { name: "Burger", price: 20 },
      { name: "Sushi", price: 15 },
      { name: "Cake", price: 15 },
      { name: "Kebab", price: 23 },
      { name: "Ramen", price: 8 },
      { name: "Pho", price: 12 }
    );

    it("should return the nth smallest element(s) yielding the value of the given function", () => {
      expect(order.nthSmallestOf("price", 3)).toEqual({
        name: "Sushi",
        price: 15,
      });
      expect(order.nthSmallestOf((it) => it.price, 3)).toEqual({
        name: "Sushi",
        price: 15,
      });
    });
  });

  describe(list.minus, () => {
    const fruits = listOf("apple", "banana", "cherry", "dragonfruit", "banana");
    it("should remove given elements from list without mutating the original list", () => {
      expect(fruits.minus("dragonfruit")).toEqual(
        listOf("apple", "banana", "cherry", "banana")
      );
      expect(fruits.minus("banana")).toEqual(
        listOf("apple", "cherry", "dragonfruit")
      );
      expect(fruits.minus("banana", "apple")).toEqual(
        listOf("cherry", "dragonfruit")
      );
      expect(fruits).toEqual(
        listOf("apple", "banana", "cherry", "dragonfruit", "banana")
      );
    });
  });

  describe(list.scan, () => {
    it("should return a list containing successive accumulation values generated by applying operation from left to right to each element and current accumulator value that starts with initial value.", () => {
      let result = list.scan((acc, cur) => acc + cur, 0);
      expect(result).toEqual(listOf(0, 4, 9, 15, 22, 28));
    });
  });

  describe(list.single, () => {
    it("should return the single element matching the given predicate, or throws exception if there are none or more than one matching elements.", () => {
      const input = listOf(3, 4, 5, 6);

      expect(input.single((it) => it > 5)).toBe(6);
      expect(input.single((it) => it > 4 && it < 6)).toBe(5);
      expect(() => input.single((it) => it < 6)).toThrow(NoSuchElementError);
      expect(() => input.single((it) => it < 3)).toThrow(NoSuchElementError);
    });
  });

  describe(list.singleOrNull, () => {
    it("should return the single element matching the given predicate, or null if there are none or more than one matching elements.", () => {
      const input = listOf(3, 4, 5, 6);

      expect(input.singleOrNull((it) => it > 5)).toBe(6);
      expect(input.singleOrNull((it) => it > 4 && it < 6)).toBe(5);
      expect(input.singleOrNull((it) => it < 6)).toBeNull();
      expect(input.singleOrNull((it) => it < 3)).toBeNull();
    });
  });

  describe(list.round, () => {
    it("should round all numbers in the list to nearest integer or given decimal places", () => {
      const list = listOf(2.35, 3.145159, -0.5, -1.75);

      expect(list.round()).toEqual(listOf(2, 3, -1, -2));
      expect(list.round(1)).toEqual(listOf(2.4, 3.1, -0.5, -1.8));
      expect(list.round(1, RoundingMode.HALF_DOWN)).toEqual(
        listOf(2.4, 3.1, -0.5, -1.8)
      );
      expect(list.round(1, RoundingMode.UP)).toEqual(
        listOf(2.4, 3.2, -0.5, -1.7)
      );
      expect(list.round(1, RoundingMode.DOWN)).toEqual(
        listOf(2.3, 3.1, -0.5, -1.8)
      );
    });
  });

  describe(list.ceil, () => {
    it("should round all numbers in the list up to the nearest integer", () => {
      const list = listOf(2.35, 3.145159, -0.5, -1.75);
      expect(list.ceil()).toEqual(listOf(3, 4, -0, -1));
    });
  });

  describe(list.floor, () => {
    it("should round all numbers in the list up to the nearest integer", () => {
      const list = listOf(2.35, 3.145159, -0.5, -1.75);
      expect(list.floor()).toEqual(listOf(2, 3, -1, -2));
    });
  });

  describe(list.none, () => {
    it("should return the single element matching the given predicate, or throws exception if there are none or more than one matching elements.", () => {
      const input = listOf(3, 4, 5, 6);

      expect(input.none((it) => it > 5)).toBeFalsy();
      expect(input.none((it) => it > 4 && it < 6)).toBeFalsy();
      expect(input.none((it) => it < 6)).toBeFalsy();
      expect(input.none((it) => it < 3)).toBeTruthy();
      expect(listOf().none()).toBeTruthy();
      expect(listOf(1).none()).toBeFalsy();
    });
  });

  describe(list.findDuplicates, () => {
    it("should find duplicate items in the list using deep equality", () => {
      const input = listOf("One", "Three", "Two", "Five", "Five", "Two");
      expect(input.findDuplicates()).toEqual(listOf("Five", "Two"));
      expect(input.findDuplicates(true)).toEqual(listOf(4, 5));

      const order = listOf(
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 20 },
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 8 },
        { name: "Ramen", price: 12 }
      );

      expect(order.findDuplicates()).toEqual(
        listOf({ name: "Pizza", price: 23 })
      );
      expect(order.findDuplicates(true)).toEqual(listOf(2));
    });
  });

  describe(list.removeDuplicates, () => {
    it("should remove duplicate items from the list using deep equality", () => {
      const input = listOf("One", "Three", "Two", "Five", "Five", "Two");
      expect(input.removeDuplicates()).toEqual(
        listOf("One", "Three", "Two", "Five")
      );

      const order = listOf(
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 20 },
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 8 },
        { name: "Ramen", price: 12 }
      );

      expect(order.removeDuplicates()).toEqual(
        listOf(
          { name: "Pizza", price: 23 },
          { name: "Burger", price: 20 },
          { name: "Burger", price: 8 },
          { name: "Ramen", price: 12 }
        )
      );
    });
  });

  describe(list.indicesOf, () => {
    it("should find the indices of the given element using deep equality", () => {
      const input = listOf("One", "Three", "Two", "Five", "Five", "Two");

      expect(input.indicesOf("Two")).toEqual(listOf(2, 5));
      expect(input.indicesOf("One")).toEqual(listOf(0));

      const order = listOf(
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 20 },
        { name: "Sushi", price: 19 },
        { name: "Pizza", price: 23 },
        { name: "Ramen", price: 12 }
      );

      expect(order.indicesOf({ name: "Ramen", price: 12 })).toEqual(listOf(4));
      expect(order.indicesOf({ name: "Pizza", price: 23 })).toEqual(
        listOf(0, 3)
      );
    });
  });

  describe(list.random, () => {
    it("should return a randomly chosen element within the list", () => {
      const input = listOf("One", "Three", "Two", "Five", "Five", "Two");

      const randomInput = input.random();
      expect(input).toContain(randomInput);

      const order = listOf(
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 20 },
        { name: "Sushi", price: 19 },
        { name: "Pho", price: 15 },
        { name: "Ramen", price: 12 }
      );

      const randomOrder = order.random();
      expect(order).toContain(randomOrder);
    });
  });

  describe(list.sample, () => {
    it("should return randomly chosen elements within the list", () => {
      const input = listOf("One", "Three", "Two", "Five", "Five", "Two");

      const randomInputs = input.sample(3);
      expect(randomInputs).toHaveLength(3);
      expect(input).toContain(randomInputs[0]);
      expect(input).toContain(randomInputs[1]);
      expect(input).toContain(randomInputs[2]);

      const order = listOf(
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 20 },
        { name: "Sushi", price: 19 },
        { name: "Pho", price: 20 },
        { name: "Ramen", price: 12 }
      );

      const randomOrders = order.sample(3);
      expect(randomOrders).toHaveLength(3);
      expect(order).toContain(randomOrders[0]);
      expect(order).toContain(randomOrders[1]);
      expect(order).toContain(randomOrders[2]);

      expect(() => order.sample(6, false)).toThrow(IllegalArgumentError);
      const noRepeat = input.sample(3, false);
      expect(noRepeat).toHaveLength(3);
    });
  });

  describe(list.shuffled, () => {
    it("should randomly shuffle the elements within the list", () => {
      const input = listOf("One", "Three", "Two", "Six", "Five", "Seven");

      const shuffledInputs = input.shuffled();
      expect(shuffledInputs).toHaveLength(6);
      expect(input).toContain(shuffledInputs[0]);
      expect(input).toContain(shuffledInputs[1]);
      expect(input).toContain(shuffledInputs[2]);
      expect(input).toContain(shuffledInputs[3]);
      expect(input).toContain(shuffledInputs[4]);
      expect(input).toContain(shuffledInputs[5]);

      const order = listOf(
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 20 },
        { name: "Sushi", price: 19 },
        { name: "Pho", price: 20 },
        { name: "Ramen", price: 12 }
      );

      const shuffledOrders = order.shuffled();
      expect(shuffledOrders).toHaveLength(5);
      expect(order).toContain(shuffledOrders[0]);
      expect(order).toContain(shuffledOrders[1]);
      expect(order).toContain(shuffledOrders[2]);
      expect(order).toContain(shuffledOrders[3]);
      expect(order).toContain(shuffledOrders[4]);
    });
  });

  describe(list.toBoolean, () => {
    it("should cast each value in the list to a boolean", () => {
      let a;
      const input = listOf<any>(
        "One",
        "Three",
        null,
        false,
        0,
        -3,
        undefined,
        "",
        [],
        {},
        ![],
        !!{},
        (a = 3),
        () => {}
      );

      expect(input.toBoolean()).toEqual(
        listOf(
          true,
          true,
          false,
          false,
          false,
          true,
          false,
          false,
          true,
          true,
          false,
          true,
          true,
          true
        )
      );
    });
  });

  describe(list.all, () => {
    it("should return the single element matching the given predicate, or throws exception if there are all or more than one matching elements.", () => {
      const input = listOf(3, 4, 5, 6);

      expect(input.all((it) => it > 5)).toBeFalsy();
      expect(input.all((it) => it > 4 && it < 6)).toBeFalsy();
      expect(input.all((it) => it < 6)).toBeFalsy();
      expect(input.all((it) => it >= 3)).toBeTruthy();
      expect(listOf<number>().all((it) => it > 0)).toBeTruthy();
      expect(listOf(1).all((it) => !isNaN(it))).toBeTruthy();
    });
  });

  describe(list.any, () => {
    it("should return the single element matching the given predicate, or throws exception if there are all or more than one matching elements.", () => {
      const input = listOf(3, 4, 5, 6);

      expect(input.any((it) => it > 5)).toBeTruthy();
      expect(input.any((it) => it > 4 && it < 6)).toBeTruthy();
      expect(input.any((it) => it < 6)).toBeTruthy();
      expect(input.any((it) => it < 3)).toBeFalsy();
      expect(listOf<number>().any((it) => it > 0)).toBeFalsy();
      expect(listOf(1).any((it) => !isNaN(it))).toBeTruthy();
    });
  });

  describe(list.groupBy, () => {
    it("should group elements by the provided keySelector", () => {
      const order = listOf(
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 20 },
        { name: "Pizza", price: 19 },
        { name: "Pho", price: 20 },
        { name: "Pho", price: 12 }
      );

      const expectedGroupedByName = {
        Pizza: listOf(
          { name: "Pizza", price: 23 },
          { name: "Pizza", price: 19 }
        ),
        Burger: listOf({ name: "Burger", price: 20 }),
        Pho: listOf({ name: "Pho", price: 20 }, { name: "Pho", price: 12 }),
      };

      const expectedGroupedByPrice = {
        23: listOf({ name: "Pizza", price: 23 }),
        20: listOf({ name: "Burger", price: 20 }, { name: "Pho", price: 20 }),
        19: listOf({ name: "Pizza", price: 19 }),
        12: listOf({ name: "Pho", price: 12 }),
      };

      const groupedOrders = order.groupBy((it) => it.name);
      expect(groupedOrders).toEqual(expectedGroupedByName);

      const groupedOrdersByKey = order.groupBy("name");
      expect(groupedOrdersByKey).toEqual(expectedGroupedByName);

      const groupedByPrice = order.groupBy("price");
      expect(groupedByPrice).toEqual(expectedGroupedByPrice);
    });
  });

  describe(list.groupByTo, () => {
    it("should group elements by the provided keySelector", () => {
      const order = listOf(
        { name: "Pizza", price: 23 },
        { name: "Burger", price: 20 },
        { name: "Pizza", price: 19 },
        { name: "Pho", price: 20 },
        { name: "Pho", price: 12 }
      );

      const originalGroupByName1 = {
        Pasta: listOf({ name: "Pasta", price: 20 }),
      };

      const originalGroupByName2 = {
        Pasta: listOf({ name: "Pasta", price: 20 }),
      };

      const originalGroupByPrice = {
        20: listOf({ name: "Pasta", price: 20 }),
      };

      const expectedGroupedByName = {
        Pasta: listOf({ name: "Pasta", price: 20 }),
        Pizza: listOf(
          { name: "Pizza", price: 23 },
          { name: "Pizza", price: 19 }
        ),
        Burger: listOf({ name: "Burger", price: 20 }),
        Pho: listOf({ name: "Pho", price: 20 }, { name: "Pho", price: 12 }),
      };

      const expectedGroupedByPrice = {
        23: listOf({ name: "Pizza", price: 23 }),
        20: listOf(
          { name: "Pasta", price: 20 },
          { name: "Burger", price: 20 },
          { name: "Pho", price: 20 }
        ),
        19: listOf({ name: "Pizza", price: 19 }),
        12: listOf({ name: "Pho", price: 12 }),
      };

      const groupedOrders = order.groupByTo(
        originalGroupByName1,
        (it) => it.name
      );
      expect(groupedOrders).toEqual(expectedGroupedByName);

      const groupedOrdersByKey = order.groupByTo(originalGroupByName2, "name");
      expect(groupedOrdersByKey).toEqual(expectedGroupedByName);

      const groupedByPrice = order.groupByTo(originalGroupByPrice, "price");
      expect(groupedByPrice).toEqual(expectedGroupedByPrice);
    });
  });

  describe(list.binarySearch, () => {
    it("should search elements in a list using binary search", () => {
      const items = listOf(12, 19, 20, 23, 27);

      expect(items.binarySearch(19)).toEqual(1);
      expect(items.binarySearch(23, 1)).toEqual(3);
      expect(items.binarySearch(20, 0, 2)).toBeNull();
    });
  });

  describe(list.binarySearchBy, () => {
    it("should search elements in a list by applying keySelector using binary search", () => {
      const order = listOf(
        { name: "Pho", price: 12 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Sushi", price: 25 },
        { name: "Pasta", price: 27 }
      );

      expect(order.binarySearchBy(20, "price")).toEqual(2);
      expect(order.binarySearchBy(25, "price", 1)).toEqual(3);
      expect(order.binarySearchBy(20, "price", 0, 2)).toBeNull();
    });
  });

  describe(list.mapTo, () => {
    it("should map all the elements in the list and add them to a destination list", () => {
      const order = listOf(
        { name: "Pho", price: 12 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 }
      );

      const prices = listOf(15, 18);

      expect(order.mapTo(prices, (it) => it.price)).toEqual(
        listOf(15, 18, 12, 19, 20)
      );
    });
  });

  describe(list.mapNotNull, () => {
    it("should map all the non-null and non-undefined values in the list", () => {
      const order = listOf(
        { name: "Pho", price: 12 },
        { name: "Pizza", price: 19 },
        undefined,
        { name: "Burger", price: 20 },
        null
      );

      expect(order.mapNotNull((it) => it!.price)).toEqual(listOf(12, 19, 20));
    });
  });

  describe(list.mapNotNullTo, () => {
    it("should map all the non-null and non-undefined values in the list and add them to a destination list", () => {
      const order = listOf(
        { name: "Pho", price: 12 },
        { name: "Pizza", price: 19 },
        undefined,
        { name: "Burger", price: 20 },
        null
      );

      const prices = listOf(15, 18);

      expect(order.mapNotNullTo(prices, (it) => it!.price)).toEqual(
        listOf(15, 18, 12, 19, 20)
      );
    });
  });

  describe(list.mapWith, () => {
    it("should merge two lists into a map", () => {
      const foods = listOf("Pho", "Pizza", "Burger", "Sushi", "Pasta");

      const prices = listOf(12, 19, 20, 25, 27, 30);

      const expected = new Map();
      expected.set("Pho", 12);
      expected.set("Pizza", 19);
      expected.set("Burger", 20);
      expected.set("Sushi", 25);
      expected.set("Pasta", 27);

      expect(foods.mapWith(prices)).toEqual(expected);

      foods.add("Kebab", "Cookies");

      expected.set("Kebab", 30);
      expected.set("Cookies", undefined);
      expect(foods.mapWith(prices)).toEqual(expected);
    });
  });

  describe(list.toObject, () => {
    it("should convert a list of lists to an object", () => {
      const foods = listOf(
        ["Pho", 12],
        ["Pizza", 19],
        ["Burger", 20],
        ["Sushi", 27],
        ["Pasta", 30]
      );

      const expected = {
        Pho: 12,
        Pizza: 19,
        Burger: 20,
        Sushi: 27,
        Pasta: 30,
      };

      expect(foods.toObject()).toEqual(expected);
    });
  });

  describe(list.toMap, () => {
    it("should convert a list of lists to a map", () => {
      const foods = listOf(
        ["Pho", 12],
        ["Pizza", 19],
        ["Burger", 20],
        ["Sushi", 27],
        ["Pasta", 30]
      );

      const expected = new Map();
      expected.set("Pho", 12);
      expected.set("Pizza", 19);
      expected.set("Burger", 20);
      expected.set("Sushi", 27);
      expected.set("Pasta", 30);

      expect(foods.toMap()).toEqual(expected);
    });
  });

  describe(list.windowed, () => {
    it("should return a list of snapshots of the window of the given size sliding along this collection with the given step, where each snapshot is a list", () => {
      const foods = listOf("Pho", "Pizza", "Burger", "Sushi", "Pasta");
      const expected1 = listOf(
        listOf("Pho", "Pizza"),
        listOf("Pizza", "Burger"),
        listOf("Burger", "Sushi"),
        listOf("Sushi", "Pasta")
      );
      expect(foods.windowed(2)).toEqual(expected1);

      const expected2 = listOf(
        listOf("Pho", "Pizza", "Burger"),
        listOf("Burger", "Sushi", "Pasta"),
        listOf("Pasta")
      );
      expect(foods.windowed(3, 2, true)).toEqual(expected2);

      const expected3 = listOf(
        listOf("Pho", "Pizza", "Burger"),
        listOf("Burger", "Sushi", "Pasta")
      );
      expect(foods.windowed(3, 2, false)).toEqual(expected3);
    });
  });

  describe(list.unzip, () => {
    it("should unzip a list", () => {
      const foods1 = listOf(
        { Pho: 20 },
        { Pizza: 23 },
        { Burger: 19 },
        { Sushi: 15 },
        { Pasta: 25 }
      );

      expect(foods1.unzip()).toEqual(
        listOf<any>(
          listOf("Pho", "Pizza", "Burger", "Sushi", "Pasta"),
          listOf(20, 23, 19, 15, 25)
        )
      );

      const foods2 = listOf(
        ["Pho", 20],
        ["Pizza", 23],
        ["Burger", 19],
        ["Sushi", 15],
        ["Pasta", 25]
      );

      expect(foods2.unzip()).toEqual(
        listOf<any>(
          listOf("Pho", "Pizza", "Burger", "Sushi", "Pasta"),
          listOf(20, 23, 19, 15, 25)
        )
      );
    });
  });

  describe(list.zip, () => {
    it("should zip a list", () => {
      const foods = listOf("Pho", "Pizza", "Burger", "Sushi", "Pasta");
      const prices = listOf(20, 23, 19, 15, 25);

      const expected1 = listOf(
        listOf<any>("Pho", 20),
        listOf<any>("Pizza", 23),
        listOf<any>("Burger", 19),
        listOf<any>("Sushi", 15),
        listOf<any>("Pasta", 25)
      );

      const expected2 = listOf(
        "Pho=20",
        "Pizza=23",
        "Burger=19",
        "Sushi=15",
        "Pasta=25"
      );

      expect(foods.zip(prices)).toEqual(expected1);
      expect(foods.zip(prices, (a, b) => `${a}=${b}`)).toEqual(expected2);
    });
  });

  describe(list.pairWith, () => {
    it("should pair a list with another list into an object", () => {
      const foods = listOf("Pho", "Pizza", "Burger", "Sushi", "Pasta");
      const prices = listOf(20, 23, 19, 15, 25);

      const expected = { Pho: 20, Pizza: 23, Burger: 19, Sushi: 15, Pasta: 25 };

      expect(foods.pairWith(prices)).toEqual(expected);
    });
  });

  describe(list.partition, () => {
    it("should partition a list based on a condition", () => {
      const foods = listOf("Pho", "Pizza", "Burger", "Sushi", "Pasta");

      const expected = listOf(
        listOf("Pho", "Pizza", "Pasta"),
        listOf("Burger", "Sushi")
      );

      expect(foods.partition((it) => it.startsWith("P"))).toEqual(expected);
    });
  });

  describe(list.repeat, () => {
    it("should repeat a list n times", () => {
      const foods = listOf("Pho", "Burger");

      const expected = listOf(
        "Pho",
        "Burger",
        "Pho",
        "Burger",
        "Pho",
        "Burger"
      );

      expect(foods.repeat(3)).toEqual(expected);
    });
  });

  describe(list.reversed, () => {
    it("should reverse a list without changing the original", () => {
      const foods = listOf("Pho", "Burger", "Sushi");
      const expected = listOf("Sushi", "Burger", "Pho");

      expect(foods.reversed()).toEqual(expected);
      expect(foods).toEqual(listOf("Pho", "Burger", "Sushi"));
    });
  });

  describe(list.search, () => {
    it("should search a list for a given string and return the results in a list", () => {
      const foods = listOf("Pho", "Burger", "Sushi", "Pasta");

      expect(foods.search("u")).toEqual(listOf("Burger", "Sushi"));
      expect(foods.search("p", false)).toEqual(listOf("Pho", "Pasta"));
      expect(foods.search("p", true)).toEqual(listOf());
    });
  });

  describe(list.sortBy, () => {
    it("should sort the elements in a list by applying keySelector while modifying the original list", () => {
      const order1 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      const expectedSortByPrice = listOf(
        { name: "Pho", price: 12 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Sushi", price: 25 },
        { name: "Pasta", price: 27 }
      );

      expect(order1.sortBy((it) => it.price)).toEqual(expectedSortByPrice);
      expect(order1).toEqual(expectedSortByPrice);

      const order2 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      const expectedSortByName = listOf(
        { name: "Burger", price: 20 },
        { name: "Pasta", price: 27 },
        { name: "Pho", price: 12 },
        { name: "Pizza", price: 19 },
        { name: "Sushi", price: 25 }
      );

      expect(order2.sortBy("price")).toEqual(expectedSortByPrice);
      expect(order2).toEqual(expectedSortByPrice);
      expect(order2.sortBy("name")).toEqual(expectedSortByName);
    });
  });

  describe(list.sortedBy, () => {
    it("should sort the elements in a list by applying keySelector while not modifying the original list", () => {
      const order1 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      const expectedSortByPrice = listOf(
        { name: "Pho", price: 12 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Sushi", price: 25 },
        { name: "Pasta", price: 27 }
      );

      expect(order1.sortedBy((it) => it.price)).toEqual(expectedSortByPrice);
      expect(order1).not.toEqual(expectedSortByPrice);

      const order2 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      const expectedSortByName = listOf(
        { name: "Burger", price: 20 },
        { name: "Pasta", price: 27 },
        { name: "Pho", price: 12 },
        { name: "Pizza", price: 19 },
        { name: "Sushi", price: 25 }
      );

      expect(order2.sortedBy("price")).toEqual(expectedSortByPrice);
      expect(order2).not.toEqual(expectedSortByPrice);
      expect(order2.sortedBy("name")).toEqual(expectedSortByName);
      expect(order2).not.toEqual(expectedSortByName);
    });
  });

  describe(list.sortByDescending, () => {
    it("should sort the elements in a list in descending order applying keySelector while modifying the original list", () => {
      const order1 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      const expectedSortByPrice = listOf(
        { name: "Pasta", price: 27 },
        { name: "Sushi", price: 25 },
        { name: "Burger", price: 20 },
        { name: "Pizza", price: 19 },
        { name: "Pho", price: 12 }
      );

      expect(order1.sortByDescending((it) => it.price)).toEqual(
        expectedSortByPrice
      );
      expect(order1).toEqual(expectedSortByPrice);

      const order2 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      const expectedSortByName = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 },
        { name: "Burger", price: 20 }
      );

      expect(order2.sortByDescending("price")).toEqual(expectedSortByPrice);
      expect(order2).toEqual(expectedSortByPrice);
      expect(order2.sortByDescending("name")).toEqual(expectedSortByName);
    });
  });

  describe(list.sortedByDescending, () => {
    it("should sort the elements in a list in descending order applying keySelector while modifying the original list", () => {
      const order1 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      const expectedSortByPrice = listOf(
        { name: "Pasta", price: 27 },
        { name: "Sushi", price: 25 },
        { name: "Burger", price: 20 },
        { name: "Pizza", price: 19 },
        { name: "Pho", price: 12 }
      );

      expect(order1.sortedByDescending((it) => it.price)).toEqual(
        expectedSortByPrice
      );
      expect(order1).not.toEqual(expectedSortByPrice);

      const order2 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Burger", price: 20 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      const expectedSortByName = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 },
        { name: "Burger", price: 20 }
      );

      expect(order2.sortedByDescending("price")).toEqual(expectedSortByPrice);
      expect(order2).not.toEqual(expectedSortByPrice);
      expect(order2.sortedByDescending("name")).toEqual(expectedSortByName);
    });
  });

  describe(list.sortNumbers, () => {
    it("should sort numbers in a list in ascending order", () => {
      const order1 = listOf(25, 19, 20, 12, 27);
      const expected = listOf(12, 19, 20, 25, 27);

      expect(order1.sortNumbers()).toEqual(expected);
      expect(order1).toEqual(expected);
    });
  });

  describe(list.sortNumbersDescending, () => {
    it("should sort numbers in a list in ascending order", () => {
      const order1 = listOf(25, 19, 20, 12, 27);
      const expected = listOf(27, 25, 20, 19, 12);

      expect(order1.sortNumbersDescending()).toEqual(expected);
      expect(order1).toEqual(expected);
    });
  });

  describe(list.average, () => {
    it("should return the average of a list of numbers", () => {
      const order1 = listOf(25, 19, 20, 12, 24);
      expect(order1.average()).toEqual(20);
    });
  });

  describe(list.mean, () => {
    it("should return the average of a list of numbers", () => {
      const order1 = listOf(25, 19, 20, 12, 24);
      expect(order1.mean()).toEqual(20);
    });
  });

  describe(list.median, () => {
    it("should return the median of a list of numbers", () => {
      const order1 = listOf(25, 19, 21, 12, 24, 33);
      expect(order1.median()).toEqual(22.5);

      const order2 = listOf(25, 19, 21, 12, 24);
      expect(order2.median()).toEqual(21);
    });
  });

  describe(list.mode, () => {
    it("should return the most frequently occuring element in a list", () => {
      const order1 = listOf(25, 19, 21, 25, 21, 25);
      expect(order1.mode()).toEqual(25);

      const order2 = listOf(
        "One",
        "Two",
        "Two",
        "Three",
        "One",
        "One",
        "Three"
      );
      expect(order2.mode()).toEqual("One");

      const order3 = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Sushi", price: 25 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );
      expect(order3.mode()).toEqual({ name: "Sushi", price: 25 });
    });
  });

  describe(list.variance, () => {
    it("should return the variance of numbers in a list", () => {
      const order1 = listOf(25, 19, 21, 12, 24, 33);
      expect(order1.variance()).toBeCloseTo(40.55556, 2);
    });
  });

  describe(list.stdev, () => {
    it("should return the standard deviation of numbers in a list", () => {
      const order1 = listOf(25, 19, 21, 12, 24, 33);
      expect(order1.stdev()).toBeCloseTo(6.368, 2);
    });
  });

  describe(list.filterOddNumbers, () => {
    it("should filters all the odd numbers in a list", () => {
      const order1 = listOf(25, 10, 21, 12, 24, 33);
      expect(order1.filterOddNumbers()).toEqual(listOf(25, 21, 33));
    });
  });

  describe(list.filterEvenNumbers, () => {
    it("should filters all the even numbers in a list", () => {
      const order1 = listOf(25, 10, 21, 12, 24, 33);
      expect(order1.filterEvenNumbers()).toEqual(listOf(10, 12, 24));
    });
  });

  describe(list.filterPrimeNumbers, () => {
    it("should filters all the even numbers in a list", () => {
      const order1 = listOf(25, 17, 21, 19, 24, 13);
      expect(order1.filterPrimeNumbers()).toEqual(listOf(17, 19, 13));
    });
  });

  describe(list.counts, () => {
    it("should return a count of all elements in the list as a map", () => {
      const order = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Sushi", price: 25 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 },
        { name: "Pasta", price: 25 },
        { name: "Pho", price: 12 }
      );

      const expected = new Map();
      expected.set({ name: "Sushi", price: 25 }, 2);
      expected.set({ name: "Pizza", price: 19 }, 1);
      expected.set({ name: "Pho", price: 12 }, 2);
      expected.set({ name: "Pasta", price: 27 }, 1);
      expected.set({ name: "Pasta", price: 25 }, 1);

      expect(order.counts()).toEqual(expected);
    });
  });

  describe(List.range, () => {
    it("should create a range of numbers", () => {
      expect(List.range(0, 5)).toEqual(listOf(0, 1, 2, 3, 4));
      expect(List.range(1, 5, 2)).toEqual(listOf(1, 3));
      expect(List.range(10, 6)).toEqual(listOf(10, 9, 8, 7));
    });
  });

  describe(List.isList, () => {
    it("should return true if an object is an instance of a list", () => {
      expect(List.isList(5)).toBeFalsy();
      expect(List.isList([1, 5, 2])).toBeFalsy();
      expect(List.isList(listOf())).toBeTruthy();
      expect(List.isList(undefined)).toBeFalsy();
    });
  });

  test("associate should transform items into key-value pairs", () => {
    const list = listOf("apple", "banana", "orange");
    const result = list.associate((fruit) => fruit.toUpperCase());
    expect(result).toEqual({
      apple: "APPLE",
      banana: "BANANA",
      orange: "ORANGE",
    });
  });

  test("associateBy should map items to their keys", () => {
    const list = listOf(
      { name: "Pizza" },
      { name: "Burger" },
      { name: "Ramen" }
    );
    const result = list.associateBy((item) => item.name);
    expect(result).toEqual({
      Pizza: { name: "Pizza" },
      Burger: { name: "Burger" },
      Ramen: { name: "Ramen" },
    });
  });

  test("associateWith should map items to their values produced by valueSelector", () => {
    const list = listOf(1, 2, 3);
    const result = list.associateWith((n) => n * 2);
    expect(result).toEqual(
      new Map([
        [1, 2],
        [2, 4],
        [3, 6],
      ])
    );
  });

  test("prefix should add a prefix to each string in the list", () => {
    const list = listOf("apple", "banana", "orange");
    const result = list.prefix("pre-");
    expect(result).toEqual(listOf("pre-apple", "pre-banana", "pre-orange"));
  });

  test("postfix should add a postfix to each string in the list", () => {
    const list = listOf("apple", "banana", "orange");
    const result = list.postfix("-post");
    expect(result).toEqual(listOf("apple-post", "banana-post", "orange-post"));
  });

  test("multiplyBy should multiply each number in the list by a given number", () => {
    const list = listOf(3, 2, 1);
    const result = list.multiplyBy(2);
    expect(result).toEqual(listOf(6, 4, 2));
  });

  test("divideBy should divide each number in the list by a given number", () => {
    const list = listOf(4, 8, 10);
    const result = list.divideBy(2);
    expect(result).toEqual(listOf(2, 4, 5));
  });

  test("power should raise each number in the list to the power of a given number", () => {
    const list = listOf(1, 2, 3);
    const result = list.power(2);
    expect(result).toEqual(listOf(1, 4, 9));
  });

  test("toFixed should set the decimal places of each number in the list", () => {
    const list = listOf(1, 2, 3);
    const result = list.toFixed(2);
    expect(result).toEqual(listOf("1.00", "2.00", "3.00"));
  });

  describe(list.toEnglish, () => {
    it("should convert a list of numbers into its english representation", () => {
      expect(listOf(1).toEnglish()).toEqual(listOf("One"));
      expect(listOf(100).toEnglish()).toEqual(listOf("One Hundred"));
      expect(listOf(312).toEnglish()).toEqual(
        listOf("Three Hundred and Twelve")
      );
      expect(listOf(19300274927556).toEnglish()).toEqual(
        listOf(
          "Nineteen Trillion, Three Hundred Billion, Two Hundred and Seventy Four Million, Nine Hundred and Twenty Seven Thousand, Five Hundred and Fifty Six"
        )
      );
      expect(listOf(1930027.4927556).toEnglish()).toEqual(
        listOf(
          "One Million, Nine Hundred and Thirty Thousand, Twenty Seven Point Four Nine Two Seven Five Five Six"
        )
      );
      expect(listOf(-32572.472023).toEnglish()).toEqual(
        listOf(
          "Minus Thirty Two Thousand, Five Hundred and Seventy Two Point Four Seven Two Zero Two Three"
        )
      );
    });
  });

  describe(list.replace, () => {
    it("should replace occurences of elements within a list with the given value", () => {
      const fruits = listOf(
        "apple",
        "banana",
        "cherry",
        "dragonfruit",
        "cherry"
      );

      expect(fruits.replace("cherry", "coconut")).toEqual(
        listOf("apple", "banana", "coconut", "dragonfruit", "coconut")
      );

      const order = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Sushi", price: 25 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      expect(
        order.replace(
          { name: "Sushi", price: 25 },
          { name: "Burger", price: 20 }
        )
      ).toEqual(
        listOf(
          { name: "Burger", price: 20 },
          { name: "Pizza", price: 19 },
          { name: "Burger", price: 20 },
          { name: "Pho", price: 12 },
          { name: "Pasta", price: 27 }
        )
      );

      expect(
        order.replace(
          { name: "Sushi", price: 25 },
          { name: "Burger", price: 20 },
          1
        )
      ).toEqual(
        listOf(
          { name: "Burger", price: 20 },
          { name: "Pizza", price: 19 },
          { name: "Sushi", price: 25 },
          { name: "Pho", price: 12 },
          { name: "Pasta", price: 27 }
        )
      );
    });
  });

  describe(list.exists, () => {
    it("should check if an element exists in the list that matches the given predicate", () => {
      const fruits = listOf(
        "apple",
        "banana",
        "cherry",
        "dragonfruit",
        "cherry"
      );

      expect(fruits.exists((it) => it.startsWith("c"))).toBeTruthy();

      const order = listOf(
        { name: "Sushi", price: 25 },
        { name: "Pizza", price: 19 },
        { name: "Sushi", price: 25 },
        { name: "Pho", price: 12 },
        { name: "Pasta", price: 27 }
      );

      expect(order.exists((it) => it.price > 25)).toBeTruthy();
      expect(order.exists((it) => it.price > 27)).toBeFalsy();
    });
  });

  describe(list.head, () => {
    it("should return the first n element in a list", () => {
      const fruits = listOf(
        "apple",
        "banana",
        "cherry",
        "dragonfruit",
        "cherry"
      );

      expect(fruits.head()).toEqual(listOf("apple"));
      expect(fruits.head(2)).toEqual(listOf("apple", "banana"));
      expect(fruits.head(10)).toEqual(
        listOf("apple", "banana", "cherry", "dragonfruit", "cherry")
      );
    });
  });

  describe(list.tail, () => {
    it("should return the last n element in a list", () => {
      const fruits = listOf(
        "apple",
        "banana",
        "cherry",
        "dragonfruit",
        "cherry"
      );

      expect(fruits.tail()).toEqual(listOf("cherry"));
      expect(fruits.tail(2)).toEqual(listOf("dragonfruit", "cherry"));
      expect(fruits.tail(10)).toEqual(
        listOf("apple", "banana", "cherry", "dragonfruit", "cherry")
      );
    });
  });

  describe(list.instanceTypes, () => {
    it("should return the instance types of all elements in the list", () => {
      const items = listOf<any>("apple", 32, {}, null, undefined, 3 == 3);

      expect(items.instanceTypes()).toEqual(
        listOf("string", "number", "Object", "object", "undefined", "boolean")
      );
      expect(items.instanceTypes(true)).toEqual(
        listOf("string", "number", "object", "object", "undefined", "boolean")
      );
    });
  });

  describe(list.isNumberList, () => {
    it("should return whether or not all the elements in the list are numbers", () => {
      expect(listOf(-43, 32, null, 3).isNumberList()).toBeFalsy();
      expect(listOf(-43, 32, 3).isNumberList()).toBeTruthy();
    });
  });
});

describe(deepEquals, () => {
  it("should check if two objects are equal", () => {
    expect(
      deepEquals({ name: "Pizza", price: 23 }, { name: "Pizza", price: 23 })
    ).toBeTruthy();
    expect(
      deepEquals({ name: "Pizza", price: 21 }, { name: "Pizza", price: 23 })
    ).toBeFalsy();
    expect(
      deepEquals({ name: "Pizza", price: {} }, { name: "Pizza", price: {} })
    ).toBeTruthy();
    expect(
      deepEquals(
        { name: "Pizza", price: { amount: 21, currency: "USD" } },
        { name: "Pizza", price: { amount: 21, currency: "AUD" } }
      )
    ).toBeFalsy();
    expect(
      deepEquals(
        { name: "Pizza", price: { amount: 21, currency: "AUD" } },
        { name: "Pizza", price: { amount: 21, currency: "AUD" } }
      )
    ).toBeTruthy();
    expect(deepEquals(["Pizza", "Burger"], ["Pizza", "Burger"])).toBeTruthy();
    expect(
      deepEquals(
        {
          items: ["Pizza", "Burger"],
          price: { amount: 21, currency: "AUD" },
        },
        { items: ["Pizza", "Sushi"], price: { amount: 21, currency: "AUD" } }
      )
    ).toBeFalsy();
    expect(deepEquals(null, null)).toBeTruthy();
    expect(deepEquals(undefined, undefined)).toBeTruthy();
    expect(deepEquals("undefined", "undefined")).toBeTruthy();
  });
});

describe(when, () => {
  it("should execute when commands returning the correct case", () => {
    const fruit = "mango";
    const generateString = (s: string) =>
      `The fruit is a${str(s).startsWithVowel() ? "n" : ""} ${s}`;
    const output = when(fruit, {
      apple: generateString,
      pear: generateString,
      banana: generateString,
      cherry: generateString,
      _: () => "It's not a fruit",
    });

    expect(output).toBe("It's not a fruit");
  });
});