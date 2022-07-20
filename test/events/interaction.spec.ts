import { assert } from "chai";

import { interactionCreate } from "../../src/events/interactionEvents/interactionCreate";

suite("interactionCreate", () => {
  test("is defined", () => {
    assert.isDefined(interactionCreate, "interactionCreate is not defined");
    assert.isFunction(interactionCreate, "interactionCreate is not a function");
  });
});
