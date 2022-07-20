import { assert } from "chai";

import { validateChannelPerms } from "../../../src/modules/commands/server/validateChannelPerms";
import { validateServerPerms } from "../../../src/modules/commands/server/validateServerPerms";

suite("validateChannelPerms", () => {
  test("is defined", () => {
    assert.isDefined(
      validateChannelPerms,
      "validateChannelPerms is not defined"
    );
    assert.isFunction(
      validateChannelPerms,
      "validateChannelPerms is not a function"
    );
  });
});

suite("validateServerPerms", () => {
  test("is defined", () => {
    assert.isDefined(validateServerPerms, "validateServerPerms is not defined");
    assert.isFunction(
      validateServerPerms,
      "validateServerPerms is not a function"
    );
  });
});
