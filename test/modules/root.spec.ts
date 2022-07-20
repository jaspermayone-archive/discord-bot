import { assert } from "chai";

import { loadPM2 } from "../../src/modules/loadPM2";
import { validateEnv } from "../../src/utils/validateEnv";

suite("loadPM2", () => {
  test("is defined", () => {
    assert.isDefined(loadPM2, "loadPM2 is not defined");
    assert.isFunction(loadPM2, "loadPM2 is not a function");
  });
});

suite("validateEnv", () => {
  test("is defined", () => {
    assert.isDefined(validateEnv, "validateEnv is not defined");
    assert.isFunction(validateEnv, "validateEnv is not a function");
  });
});
