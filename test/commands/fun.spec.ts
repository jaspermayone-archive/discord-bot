import { assert } from "chai";

import { fun } from "../../src/commands/fun";

suite("fun command", () => {
  test("is defined", () => {
    assert.isDefined(fun, "fun is not defined");
    assert.isDefined(fun.data, "data property is missing");
    assert.isObject(fun.data, "data property is not an object");
    assert.isDefined(fun.run, "run property is missing");
    assert.isFunction(fun.run, "run property is not a function");
  });
});
