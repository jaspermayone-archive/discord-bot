import { assert } from "chai";

import { handleEvents } from "../../src/events/handleEvents";

suite("handleEvents", () => {
  test("is defined", () => {
    assert.isDefined(handleEvents, "handleEvents is not defined");
    assert.isFunction(handleEvents, "handleEvents is not a function");
  });
});
