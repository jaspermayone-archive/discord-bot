import { assert } from "chai";

import * as logger from "../../src/modules/heptagramLogger";

suite("heptagramLogHandler", () => {
  test("is defined", () => {
    assert.isDefined(logger, "heptagramLogHandler is not defined");
    assert.isObject(logger, "heptagramLogHandler is not an object");
  });

  test("has log function", () => {
    assert.isDefined(logger.log, "log is not defined");
    assert.isFunction(logger.log, "log is not a function");
  });
});
