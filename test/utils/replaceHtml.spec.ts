import { assert } from "chai";

import { replaceHtml } from "../../src/utils/replaceHtml";

suite("replaceHtml", () => {
  test("is defined", () => {
    assert.isDefined(replaceHtml, "replaceHtml is not defined");
    assert.isFunction(replaceHtml, "replaceHtml is not a function");
  });

  test("returns a string", () => {
    assert.isString(replaceHtml(""), "replaceHtml did not return a string");
  });

  test("replaces &quot;", () => {
    const result = replaceHtml("&quot;");
    assert.equal(result, `"`, "replaceHtml did not replace &quot;");
  });

  test("replaces &#039;", () => {
    const result = replaceHtml("&#039;");
    assert.equal(result, `'`, "replaceHtml did not replace &#039;");
  });

  test("replaces &amp;", () => {
    const result = replaceHtml(" &amp;");
    assert.equal(result, `&`, "replaceHtml did not replace &amp;");
  });

  test("replaces multiple occurrences", () => {
    const result = replaceHtml("&quot; &#039;  &amp; test &quot;");
    assert.equal(
      result,
      `" ' & test "`,
      "replaceHtml did not replace multiple occurrences"
    );
  });
});
