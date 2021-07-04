# Contributing

Contributing is welcomed! We have extensive documentation below as well as comments in the code to help you out.
Please take a look at our GitHub issues for ideas on what to work on. Our Github issues are labeled by priorities. Critical being the highest, and low being the lowest. (Brownie points if you finish something from our [Initial Release Features Milestone](https://github.com/Heptagram-Bot/Heptagram/milestone/1).) We have a variety of tags you can sort issues by to find the right one for you. You cann sort by [Good First Issue](https://github.com/Heptagram-Bot/Heptagram/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22), [Help Wanted](https://github.com/Heptagram-Bot/Heptagram/issues?q=is%3Aopen+is%3Aissue+label%3A%22%F0%9F%91%90+help+wanted+%F0%9F%91%90%22), and more are being added all the time. Please make sure to check for issues flaged with things like "Staff Only" or "ticket work required". These are issues that need stff attention, and should not be assigned to people. Also keep you eye out for things marked as "assigned to user".

## Workflow

### Step 1: Find an issue

Step 1 is to find an issue that you can do. If you comment .take in the issue, it will be assigned to you.

### Step 2: Create a fork or branch

All work should be done on a fork unless you have been added as a contributor. In that case, please use a branch off of master. We update our branches with changes frequently, so make sure to [keep your fork up to date](https://dev.to/giannellitech/keeping-your-fork-up-to-date-klh)

### Step 3: Making changes

Make necessary changes then commit.

### Step 4: Make sure readme has correct documentation

If you made changes that require updates to the documentation, make sure to update it.

#### Step 5: Pull Request

Open a pull request into the Heptagram-Staged branch. Someonne will review your project as soon as they can.

## Bot Community

You can join our discord at <https://discord.gg/HSupF99kpq>. This server is still ironing out some details, so please be patient. :)

## Documentation

## Setting Up Discord

### Setting Up Sandbox Server for testing

Create an empty server in Discord.

Create roles `Mods` , `Users` , and  `Muted`.

Invite Bot to your Server (see **Creating a Bot User** below).

### Setting Up Bot User

You will need a Discord bot token for testing. If you don't know that, you should read <https://www.writebots.com/discord-bot-token/>

## Installing Heptagram

### Clone repository

```bash
git clone https://github.com/Heptagram-Bot/Heptagram.git
```

Or with GitHub CLI

```bash
gh repo clone Heptagram-Bot/Heptagram
```

### Installing dependencies

Make sure you are in the correct folder.

```bash
yarn install
```

### Connecting Heptagram with Discord

To connect Heptagram with Discord you will need to set your environment variables with your credentials.

#### Setting up your local development

```bash
cp example-config.json config.json   # Linux/Mac.

copy example-config.json config.json # Window.
```

For local development we recommend copying the `example-config.json` file with your own credentials, for production we recommend you refer to your system's preferred way of storing environment variables securely.

Fill out the `config.json` will your Discord application's credentials, e.g.

```shell
{
    "prefix": "!",
    "token": "your-token-goes-here"
}
```

## Running Heptagram

### Running Heptagram locally

Make sure you are in the correct folder. Run the Heptagram using the following command.

```zsh
yarn start
```

## Troubleshooting Heptagram

Heptagram is still in active development - bugs and issues are expected. If you experience a bug or issues you could not fix, do not hesitate to open a new [GitHub issue](https://github.com/Heptagram-Bot/Heptagram/issues/new).
