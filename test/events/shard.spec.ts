import { assert } from "chai";

import { shardError } from "../../src/events/shardEvents/shardError";
import { shardReady } from "../../src/events/shardEvents/shardReady";

suite("shardError", () => {
  test("is defined", () => {
    assert.isDefined(shardError, "shardError is not defined");
    assert.isFunction(shardError, "shardError is not a function");
  });
});

suite("shardReady", () => {
  test("is defined", () => {
    assert.isDefined(shardReady, "shardReady is not defined");
    assert.isFunction(shardReady, "shardReady is not a function");
  });
});
