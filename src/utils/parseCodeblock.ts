/**
 * Parses a Markdown codeblock and returns the text inside of it.
 * @param {string} script - The code to parse
 * @returns {string} Code without codeblock
 */
export const parseCodeblock = (script: string): string => {
  const cbr = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
  const result: RegExpExecArray | null = cbr.exec(script);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return result![4];
};
