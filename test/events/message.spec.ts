import { assert } from "chai";

import { messageCreate } from "../../src/events/messageEvents/messageCreate";

suite("messageCreate", () => {
  test("is defined", () => {
    assert.isDefined(messageCreate, "messageCreate is not defined");
    assert.isFunction(messageCreate, "messageCreate is not a function");
  });
});
