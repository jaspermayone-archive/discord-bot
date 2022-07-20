import { assert } from "chai";

import { formatTextToTable } from "../../src/utils/formatText";

suite("formatTextToTable", () => {
  test("is defined", () => {
    assert.isDefined(formatTextToTable, "formatTextToTable is not defined!");
    assert.isFunction(
      formatTextToTable,
      "formatTextToTable is not a function!"
    );
  });
  test("given empty array returns empty string", () =>
    assert.deepEqual(
      formatTextToTable([]),
      "",
      "function did not return empty string"
    ));
  test("given 2d empty array, returns empty string", () =>
    assert.deepEqual(
      formatTextToTable([[]]),
      "",
      "function did not return empty string"
    ));
  test("given 2d empty array, with seperate defined headers, returns headers", () =>
    assert.deepEqual(
      formatTextToTable([], {
        headers: ["one", "two"],
      }),
      "one | two\n---------",
      "did not return headers"
    ));
  // TODO: add tests to check for custom column delimiters
  test("given 2d empty array, with empty seperate defined headers, returns empty string", () =>
    assert.deepEqual(
      formatTextToTable([[]], {
        headers: [],
      }),
      "",
      "did not return empty string"
    ));
  test("given 2d array with data with long headers, display table", () =>
    assert.deepEqual(
      formatTextToTable(
        [
          ["brad", "100"],
          ["foo", "bar"],
        ],
        {
          headers: ["name", "aggeeeeeeeee"],
        }
      ),
      "name | aggeeeeeeeee\n-------------------\nbrad | 100         \nfoo  | bar         ",
      "did not return table"
    ));
});
