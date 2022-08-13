import { assert } from "chai";

import { threadCreate } from "../../src/events/threadEvents/threadCreate";

suite("threadCreate", () => {
  test("is defined", () => {
    assert.isDefined(threadCreate, "threadCreate is not defined");
    assert.isFunction(threadCreate, "threadCreate is not a function");
  });
});
