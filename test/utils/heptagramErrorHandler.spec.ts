import { assert } from "chai";

import { heptagramErrorHandler } from "../../src/modules/heptagramErrorHandler";

suite("heptagramErrorHandler", () => {
  test("is defined", () => {
    assert.isDefined(
      heptagramErrorHandler,
      "heptagramErrorHandler is not defined"
    );
    assert.isFunction(
      heptagramErrorHandler,
      "heptagramErrorHandler is not a function"
    );
  });
});
