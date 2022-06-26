/**
 * A small helper to replace some HTML entities within a string.
 *
 * @param {string} text The text to sanitize.
 * @returns {string} The sanitized text.
 */
export const replaceHtml = (text: string): string => {
  return text
    .replace(/&quot;/g, `"`)
    .replace(/&#039;/g, `'`)
    .replace(/ &amp;/g, `&`);
};
