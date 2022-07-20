import { assert } from "chai";

import { heptagramLogHandler } from "../../src/modules/heptagramLogHandler";

suite("heptagramLogHandler", () => {
  test("is defined", () => {
    assert.isDefined(heptagramLogHandler, "heptagramLogHandler is not defined");
    assert.isObject(
      heptagramLogHandler,
      "heptagramLogHandler is not an object"
    );
  });

  test("has log function", () => {
    assert.isDefined(heptagramLogHandler.log, "log is not defined");
    assert.isFunction(heptagramLogHandler.log, "log is not a function");
  });
});
