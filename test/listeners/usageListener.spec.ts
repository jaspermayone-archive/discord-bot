import { assert } from "chai";

import { usageListener } from "../../src/listeners/usageListener";

suite("usageListener", () => {
  test("is defined", () => {
    assert.isDefined(usageListener, "usageListener is not defined");
    assert.isDefined(usageListener.name, "usageListener.name is not defined");
    assert.isString(usageListener.name, "usageListener.name is not a string");
    assert.isDefined(
      usageListener.description,
      "usageListener.description is not defined"
    );
    assert.isString(
      usageListener.description,
      "usageListener.description is not a string"
    );
    assert.isDefined(usageListener.run, "usageListener.run is not defined");
    assert.isFunction(usageListener.run, "usageListener.run is not a function");
  });
});
