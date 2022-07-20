import { assert } from "chai";

import {
  accountVerificationMap,
  contentFilterMap,
} from "../../src/config/commands/serverInfo";
import { nextScheduledRelease } from "../../src/config/commands/updatesData";
import { UserFlagMap } from "../../src/config/commands/userInfo";

suite("serverInfo", () => {
  test("is defined", () => {
    assert.isDefined(
      accountVerificationMap,
      "accountVerificationMap is not defined"
    );
    assert.isObject(
      accountVerificationMap,
      "accountVerificationMap is not an object"
    );
    assert.isDefined(contentFilterMap, "contentFilterMap is not defined");
    assert.isObject(contentFilterMap, "contentFilterMap is not an object");
  });
});

suite("updatesData", () => {
  test("is defined", () => {
    assert.isDefined(
      nextScheduledRelease,
      "nextScheduledRelease is not defined"
    );
    assert.isString(
      nextScheduledRelease,
      "nextScheduledRelease is not a string"
    );
  });
});

suite("userInfo", () => {
  test("is defined", () => {
    assert.isDefined(UserFlagMap, "UserFlagMap is not defined");
    assert.isObject(UserFlagMap, "UserFlagMap is not an object");
  });
});
