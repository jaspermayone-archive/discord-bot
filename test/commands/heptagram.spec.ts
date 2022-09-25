import { assert } from "chai";

import { heptagram } from "../../src/commands/heptagram";

suite("heptagram command", () => {
  test("is defined", () => {
    assert.isDefined(heptagram, "heptagram is not defined");
    assert.isDefined(heptagram.data, "data property is missing");
    assert.isObject(heptagram.data, "data property is not an object");
    assert.isDefined(heptagram.run, "run property is missing");
    assert.isFunction(heptagram.run, "run property is not a function");
  });
});
