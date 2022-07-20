import { assert } from "chai";

import { commandListener } from "../../src/listeners/commandListener";

suite("commandListener", () => {
  test("is defined", () => {
    assert.isDefined(commandListener, "commandListener is not defined");
    assert.isDefined(
      commandListener.name,
      "commandListener.name is not defined"
    );
    assert.isString(
      commandListener.name,
      "commandListener.name is not a string"
    );
    assert.isDefined(
      commandListener.description,
      "commandListener.description is not defined"
    );
    assert.isString(
      commandListener.description,
      "commandListener.description is not a string"
    );
    assert.isDefined(commandListener.run, "commandListener.run is not defined");
    assert.isFunction(
      commandListener.run,
      "commandListener.run is not a function"
    );
  });
});
