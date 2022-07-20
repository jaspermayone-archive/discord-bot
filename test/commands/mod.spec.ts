import { assert } from "chai";

import { mod } from "../../src/commands/mod";

suite("mod command", () => {
  test("is defined", () => {
    assert.isDefined(mod, "mod is not defined");
    assert.isDefined(mod.data, "data property is missing");
    assert.isObject(mod.data, "data property is not an object");
    assert.isDefined(mod.run, "run property is missing");
    assert.isFunction(mod.run, "run property is not a function");
  });
});
