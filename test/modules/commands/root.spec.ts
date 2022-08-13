import { assert } from "chai";

import { errorEmbedGenerator } from "../../../src/modules/errorEmbedGenerator";

suite("errorEmbedGenerator", () => {
  test("is defined", () => {
    assert.isDefined(errorEmbedGenerator, "errorEmbedGenerator is not defined");
    assert.isFunction(
      errorEmbedGenerator,
      "errorEmbedGenerator is not a function"
    );
  });
});
