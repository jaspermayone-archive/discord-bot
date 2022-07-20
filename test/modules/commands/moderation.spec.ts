import { assert } from "chai";

import { updateHistory } from "../../../src/modules/commands/moderation/updateHistory";

suite("updateHistory", () => {
  test("is defined", () => {
    assert.isDefined(updateHistory, "updateHistory is not defined");
    assert.isFunction(updateHistory, "updateHistory is not a function");
  });
});
