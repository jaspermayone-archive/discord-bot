import { assert } from "chai";

import { customSubstring } from "../../src/utils/customSubstring";

suite("customSubstring", () => {
  test("is defined", () => {
    assert.isDefined(customSubstring, "customSubstring is not defined");
    assert.isFunction(customSubstring, "customSubstring is not a function");
  });

  test("returns original string when shorter", () => {
    assert.equal(customSubstring("long", 9), "long");
    assert.equal(customSubstring("short", 5), "short");
  });

  test("returns truncated string when longer", () => {
    assert.equal(customSubstring("longer", 2), "...");
    assert.equal(customSubstring("longer", 5), "lo...");
  });
});
