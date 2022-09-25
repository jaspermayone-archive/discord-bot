import { APIApplicationCommandOptionChoice } from "discord-api-types/v10";

import { ArraySettings } from "../../interfaces/settings/ArraySettings";
import {
  AutomodSettings,
  AutomodToggleSettings,
} from "../../interfaces/settings/AutomodSettings";
import { Settings } from "../../interfaces/settings/Settings";

export const configChoices: APIApplicationCommandOptionChoice<Settings>[] = [
  { name: "Blocked Users", value: "blocked" },
];

export const configViewChoices: APIApplicationCommandOptionChoice<
  ArraySettings | "global"
>[] = [
  { name: "Global Settings", value: "global" },
  // global must be on top for tests to pass
  { name: "Blocked Users", value: "blocked" },
];

export const automodChoices: APIApplicationCommandOptionChoice<AutomodSettings>[] =
  [
    { name: "Automodded Channels", value: "automod_channels" },
    { name: "Automod Ignored Channels", value: "no_automod_channels" },
    { name: "Automod Exempt Roles", value: "automod_roles" },
    { name: "Allowed Link Regex", value: "allowed_links" },
    { name: "Link Delete Message", value: "link_message" },
  ];

export const automodViewChoices: APIApplicationCommandOptionChoice<
  ArraySettings | "global"
>[] = [
  { name: "Global Settings", value: "global" },
  // global must be on top for tests to pass
  { name: "Automodded Channels", value: "automod_channels" },
  { name: "Automod Ignored Channels", value: "no_automod_channels" },
  { name: "Automod Exempt Roles", value: "automod_roles" },
  { name: "Allowed Link Regex", value: "allowed_links" },
];

export const automodToggleChoices: APIApplicationCommandOptionChoice<AutomodToggleSettings>[] =
  [{ name: "Link Detection", value: "links" }];

export const automodAntiphishChoices: APIApplicationCommandOptionChoice<
  "none" | "mute" | "kick" | "ban"
>[] = [
  { name: "Do nothing when a scam link is detected.", value: "none" },
  { name: "Mute the user for 24 hours.", value: "mute" },
  { name: "Kick the user.", value: "kick" },
  { name: "Ban the user.", value: "ban" },
];
