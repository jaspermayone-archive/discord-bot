import { assert } from "chai";

import { getRandomValue } from "../../src/utils/getRandomValue";

suite("getRandomValue", () => {
  test("is defined", () => {
    assert.isDefined(getRandomValue, "getRandomValue is not defined");
    assert.isFunction(getRandomValue, "getRandomValue is not a function");
  });
});
