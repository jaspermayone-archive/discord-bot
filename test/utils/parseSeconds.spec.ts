import { assert } from "chai";

import { parseSeconds } from "../../src/utils/parseSeconds";

suite("parseSeconds", () => {
  test("is defined", () => {
    assert.isDefined(parseSeconds, "parseSeconds is not defined");
    assert.isFunction(parseSeconds, "parseSeconds is not a function");
  });

  test("returns a string", () => {
    assert.isString(parseSeconds(10), "parseSeconds did not return a string");
  });

  test("formats the string correctly", () => {
    const result = parseSeconds(10);
    assert.equal(
      result,
      "0d 0h 0m 10s",
      "parseSeconds did not format the string correctly"
    );
    const bigResult = parseSeconds(86400 * 365);
    assert.equal(
      bigResult,
      "365d 0h 0m 0s",
      "parseSeconds did not format the string correctly"
    );
    const randomResult = parseSeconds(948293);
    assert.equal(
      randomResult,
      "10d 23h 24m 53s",
      "parseSeconds did not format the string correctly"
    );
  });
});
