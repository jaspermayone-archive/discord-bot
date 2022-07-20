import { assert } from "chai";

import { utils } from "../../src/commands/utils";

suite("utils command", () => {
  test("is defined", () => {
    assert.isDefined(utils, "utils is not defined");
    assert.isDefined(utils.data, "data property is missing");
    assert.isObject(utils.data, "data property is not an object");
    assert.isDefined(utils.run, "run property is missing");
    assert.isFunction(utils.run, "run property is not a function");
  });
});
