import { assert } from "chai";

import { Heptagram } from "../../src/interfaces/Heptagram";
import { loadCommands } from "../../src/modules/commands/loadCommands";
import { CommandNames } from "../__mocks__/statics";

suite("loadCommands", () => {
  test("is defined", () => {
    assert.isDefined(loadCommands, "loadCommands is not defined");
    assert.isFunction(loadCommands, "loadCommands is not a function");
  });

  test("returns array of commands", async () => {
    const result = await loadCommands({} as Heptagram);
    assert.isArray(result, "loadCommands did not return an array");
  });

  test("returns the expected command list", async () => {
    const result = await loadCommands({} as Heptagram);
    assert.equal(
      result.length,
      5,
      `does not return the expected number of commands (${result.length})`
    );
    const names = result.map((el) => el.data.name);
    assert.deepEqual(names, CommandNames, "does not return the expected list");
  });
});
