import { assert } from "chai";

import CommandCountModel from "../../src/database/models/CommandCountModel";
import HistoryModel from "../../src/database/models/HistoryModel";
import UsageModel from "../../src/database/models/UsageModel";
import { testCommandCount } from "../../src/interfaces/database/CommandCount";
import { testHistory } from "../../src/interfaces/database/History";
import { testUsage } from "../../src/interfaces/database/Usage";

suite("Schema Validation", () => {
  suite("Command Count Model", () => {
    const testModel = new CommandCountModel();
    for (const key in testCommandCount) {
      test(`${key} should be in the Command Count schema`, () => {
        assert(
          key in testModel,
          `Missing ${key} from the Command Count schema.`
        );
      });
    }
  });

  suite("History Model", () => {
    const testModel = new HistoryModel();
    for (const key in testHistory) {
      test(`${key} should be in the History schema`, () => {
        assert(key in testModel, `Missing ${key} from the History schema.`);
      });
    }
  });

  suite("Usage Model", () => {
    const testModel = new UsageModel();
    for (const key in testUsage) {
      test(`${key} should be in the Usage schema`, () => {
        assert(key in testModel, `Missing ${key} from the Usage schema.`);
      });
    }
  });
});
