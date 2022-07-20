import { assert } from "chai";

import { misc } from "../../src/commands/misc";

suite("misc command", () => {
  test("is defined", () => {
    assert.isDefined(misc, "misc is not defined");
    assert.isDefined(misc.data, "data property is missing");
    assert.isObject(misc.data, "data property is not an object");
    assert.isDefined(misc.run, "run property is missing");
    assert.isFunction(misc.run, "run property is not a function");
  });
});
