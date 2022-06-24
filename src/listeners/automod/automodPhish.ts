/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { MessageEmbed } from "discord.js";

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
    let scamLink = "";
    let scamSource = "";

    for (const link of blockedLinkList) {
      const encodedLink = encodeURI(
        link.replace(/https?:\/\//, "").split("/")[0]
      );
      const checkHeptagramAPI = await axios
        .get<{ scamDetected: boolean }>(
          `https://api.heptagrambotproject.com/v4/scam/links/check?url=${encodedLink}`,
          {
            // send authentication header
            headers: {
              Authorization: "Bearer " + Heptagram.configs.heptagramApiToken,
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
        scamLink = link;
        scamSource = "Heptagram";
        break;
      }

      const checkWalshyAPI = await axios
        .post<{
          badDomain: boolean;
          detection: "discord" | "community";
        }>("https://bad-domains.walshy.dev/check", {
          domain: link,
        })
        .catch(async (err) => {
          await Heptagram.debugHook.send({
            embeds: [
              {
                title: "Walshy Api Error",
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
          return { data: { badDomain: false } };
        });

      if (checkWalshyAPI.data.badDomain) {
        scamDetected = true;
        scamLink = link;
        scamSource = "walshy";
        break;
      }

      const checkSinkingYachtsAPI = await axios
        .get<boolean>(`https://phish.sinking.yachts/v2/check/${encodedLink}`, {
          headers: {
            accept: "application/json",
            "X-Identity": "Heptagram Bot - built & coded by J-dogcoder",
          },
        })
        .catch(async (err) => {
          await Heptagram.debugHook.send({
            embeds: [
              {
                title: "Sinking Yachts Api Error",
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
          return { data: false };
        });

      if (checkSinkingYachtsAPI.data) {
        scamDetected = true;
        scamLink = link;
        scamSource = "sinking yachts";
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
