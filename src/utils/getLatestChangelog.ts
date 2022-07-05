import axios from "axios";

export async function getLatestChangelog() {
  const url =
    "https://api.github.com/repos/Heptagram-Bot-Project/discord-bot/releases";
  const response = await axios.get(url);
  const latestRelease = response.data[0];
  const rawChangelog = latestRelease.body;

  // check if line contains "by @renovate"
  const raw1 = rawChangelog
    .split("\n")
    .filter((line) => {
      return !line.includes("by @renovate");
    })
    .join("\n");

  // remove the line that contains "**Full Changelog**:"
  const raw2 = raw1
    .split("\n")
    .filter((line) => {
      return !line.includes("**Full Changelog**:");
    })
    .join("\n");

  const changelog = raw2;

  const changelogLink = rawChangelog
    .split("\n")
    .filter((line) => {
      // find the line that contains "**Full Changelog**:" and return the url
      return line.includes("**Full Changelog**:");
    })
    .map((line) => {
      // get rid of the "**Full Changelog**:"
      const lineWithoutTitle = line.replace("**Full Changelog**:");
      // get rid of "undefined "
      const lineWithoutUndefined = lineWithoutTitle.replace("undefined ", "");
      // get rid of the " "
      const lineWithoutSpace = lineWithoutUndefined.replace(" ", "");

      return lineWithoutSpace;
    })
    .join("");

  return { changelog, changelogLink };
}
