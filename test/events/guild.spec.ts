import { assert } from "chai";

import { guildCreate } from "../../src/events/guildEvents/guildCreate";
import { guildDelete } from "../../src/events/guildEvents/guildDelete";

suite("guildCreate", () => {
  test("is defined", () => {
    assert.isDefined(guildCreate, "guildCreate is not defined");
    assert.isFunction(guildCreate, "guildCreate is not a function");
  });
});

suite("guildDelete", () => {
  test("is defined", () => {
    assert.isDefined(guildDelete, "guildDelete is not defined");
    assert.isFunction(guildDelete, "guildDelete is not a function");
  });
});
