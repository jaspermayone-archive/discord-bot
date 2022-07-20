import { assert } from "chai";

import { heartsListener } from "../../src/listeners/heartsListener";

suite("heartsListener", () => {
  test("is defined", () => {
    assert.isDefined(heartsListener, "heartsListener is not defined");
    assert.isDefined(heartsListener.name, "heartsListener.name is not defined");
    assert.isString(heartsListener.name, "heartsListener.name is not a string");
    assert.isDefined(
      heartsListener.description,
      "heartsListener.description is not defined"
    );
    assert.isString(
      heartsListener.description,
      "heartsListener.description is not a string"
    );
    assert.isDefined(heartsListener.run, "heartsListener.run is not defined");
    assert.isFunction(
      heartsListener.run,
      "heartsListener.run is not a function"
    );
  });
});
