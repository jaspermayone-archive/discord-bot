import { assert } from "chai";

import { runOwnerCommands } from "../../src/modules/events/runOwnerCommands";

suite("runOwnerCommands", () => {
  test("is defined", () => {
    assert.isDefined(runOwnerCommands, "runOwnerCommands is not defined");
    assert.isFunction(runOwnerCommands, "runOwnerCommands is not a function");
  });
});
