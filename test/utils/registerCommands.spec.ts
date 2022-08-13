import { assert } from "chai";

import { registerCommands } from "../../src/modules/commands/owner/registerCommands";

suite("registerCommands", () => {
  test("is defined", () => {
    assert.isDefined(registerCommands, "registerCommands is not defined");
    assert.isFunction(registerCommands, "registerCommands is not a function");
  });
});
