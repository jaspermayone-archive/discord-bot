import { assert } from "chai";

import { calculateMilliseconds } from "../../src/utils/calculateMilliseconds";

suite("calculateMilliseconds", () => {
  test("is defined", () => {
    assert.isDefined(
      calculateMilliseconds,
      "calculateMilliseconds is not defined"
    );
    assert.isFunction(
      calculateMilliseconds,
      "calculateMilliseconds is not a function"
    );
  });

  test("converts seconds properly", () => {
    assert.equal(calculateMilliseconds(1, "seconds"), 1000);
    assert.equal(calculateMilliseconds(10, "seconds"), 10000);
  });

  test("converts minutes properly", () => {
    assert.equal(calculateMilliseconds(1, "minutes"), 60000);
    assert.equal(calculateMilliseconds(5, "minutes"), 300000);
  });

  test("converts hours properly", () => {
    assert.equal(calculateMilliseconds(1, "hours"), 3600000);
    assert.equal(calculateMilliseconds(0.5, "hours"), 1800000);
  });

  test("converts days properly", () => {
    assert.equal(calculateMilliseconds(1, "days"), 86400000);
    assert.equal(calculateMilliseconds(0.5, "days"), 43200000);
  });

  test("converts weeks properly", () => {
    assert.equal(calculateMilliseconds(1, "weeks"), 604800000);
    assert.equal(calculateMilliseconds(2, "weeks"), 1209600000);
  });

  test("handles invalid units", () => {
    assert.equal(calculateMilliseconds(1, "years"), 0);
    assert.equal(calculateMilliseconds(1500, "beccas"), 0);
  });
});
