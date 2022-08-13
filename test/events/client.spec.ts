import { assert } from "chai";

import { disconnect } from "../../src/events/clientEvents/disconnect";
import { ready } from "../../src/events/clientEvents/ready";

suite("disconnect", () => {
  test("is defined", () => {
    assert.isDefined(disconnect, "disconnect is not defined");
    assert.isFunction(disconnect, "disconnect is not a function");
  });
});

suite("ready", () => {
  test("is defined", () => {
    assert.isDefined(ready, "ready is not defined");
    assert.isFunction(ready, "ready is not a function");
  });
});
