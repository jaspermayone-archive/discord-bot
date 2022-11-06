import axios from "axios";

import { ListenerHandler } from "../../interfaces/listeners/ListenerHandler";
import { heptagramErrorHandler } from "../../modules/heptagramErrorHandler";

/**
 * Handles phishing links.
 *
 * @returns {boolean} If a scam link was detected.
 */
export const automodPhish: ListenerHandler = async (Heptagram, message) => {
  try {
    const contentWithoutCode = message.content.replace(
      /`{3}([\S]+)?\n((?!`{3})((?!```)[\s\S])+)\n`{3}/gi,
      ""
    );

    const blockedLinkList: string[] = [];

    const linkRegex =
      /(https?:\/\/(([a-z0-9-]+\.)+([a-z]{2,})))(:[\d]{1,5})?[^\s]*/gi;

    const blockedMatches = contentWithoutCode.match(linkRegex);
    if (blockedMatches) {
      blockedLinkList.push(...blockedMatches);
    }

    let scamDetected = false;

    for (const link of blockedLinkList) {
      const encodedLink = encodeURI(
        link.replace(/https?:\/\//, "").split("/")[0]
      );
      const checkHeptagramAPI = await axios
        .get<{ scamDetected: boolean; native: boolean }>(
          `https://api.heptagrambotproject.com/scam/links/check?url=${encodedLink}`,
          {
            // send authentication header
            headers: {
              Authorization: "Bearer " + Heptagram.tokens.heptagramApiToken,
            },
          }
        )
        .catch(async (err) => {
          await Heptagram.debugHook.send({
            embeds: [
              {
                title: "Heptagram Api Error",
                description: JSON.stringify(err, null, 2),
                fields: [
                  {
                    name: "Link Detected",
                    value: link,
                  },
                ],
              },
            ],
          });
          return { data: { scamDetected: false } };
        });

      if (checkHeptagramAPI.data.scamDetected) {
        scamDetected = true;
        break;
      }
    }

    if (!scamDetected) {
      return false;
    }

    await message.delete();

    return true;
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "links automodder",
      err,
      message.guild?.name,
      message
    );
  }
};
