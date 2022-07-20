import { assert } from "chai";

import { sleep } from "../../src/utils/sleep";

suite("sleep", () => {
  test("is defined", () => {
    assert.isDefined(sleep, "sleep is not defined");
    assert.isFunction(sleep, "sleep is not a function");
  });

  test("resolves in given time", async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    assert.isAtLeast(end - start, 100, "sleep did not resolve in given time");
  });
});
