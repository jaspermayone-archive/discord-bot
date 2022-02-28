# Contributing

Contributing is welcomed! We have extensive documentation below as well as comments in the code to help you out.
Please take a look at our GitHub issues for ideas on what to work on. Our Github issues are labeled by priorities. Critical being the highest, and low being the lowest. We have a variety of tags you can sort issues by to find the right one for you. You cann sort by [Good First Issue](https://github.com/Heptagram-Bot-Project/bot/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22), [Help Wanted](https://github.com/Heptagram-Bot-Project/bot/issues?q=is%3Aopen+is%3Aissue+label%3A%22%F0%9F%91%90+help+wanted+%F0%9F%91%90%22), and more are being added all the time. Please make sure to check for issues flaged with things like "Staff Only" or "ticket work required". These are issues that need staff attention, and should not be assigned to people. Also keep you eye out for things marked as "assigned to user", as someone is likely already working on this.

## Workflow

### Step 1: Find an issue

Step 1 is to find an issue [Issues Page](https://github.com/Heptagram-Bot-Project/bot/issues) that you can do, or would like to try (you can always ask for help or to be unassigned). If you comment .take in the issue, it will be automaticly assigned to you.

### Step 2: Create a fork or branch

All work should be done on a fork unless you have been added as a contributor. In that case, please use a branch off of main. We update our branches with changes frequently, so make sure to [keep your fork up to date](https://dev.to/giannellitech/keeping-your-fork-up-to-date-klh)

### Step 3: Making changes

Make necessary changes then commit.

### Step 4: Make sure readme has correct documentation, and the version is up to date.

If you made changes that require updates to the documentation, make sure to update it. Also don't forget to update the version number in the package.json file!

#### Step 5: Pull Request

Open a pull request into the staging branch. This branch is for code not quite production ready, or that hasn't been released to the main bot yet. Someone will review your project as soon as they can.

#### Step 6: Merge!

LGTM! Your PR has been appproved. It will be merged into the staged branch shoertly

## Bot Community

You can join our discord at <https://discord.gg/HSupF99kpq>.

## Documentation

### Setting Up Bot User

You will need a Discord bot token for testing. If you don't know that, you should read <https://www.writebots.com/discord-bot-token/>

## Installing Heptagram

### Clone repository

```bash
git clone https://github.com/Heptagram-Bot-Project/bot.git
```

Or with GitHub CLI

```bash
gh repo clone Heptagram-Bot-Project/bot
```

### Installing dependencies

Make sure you are in the correct folder.

```bash
yarn install
```
or
```bash
npm install
```

### Connecting Heptagram with Discord

To connect Heptagram with Discord you will need to set your environment variables with your credentials.

#### Setting up your local development

You will need to create a config.js file, and a .env file, and fill it with your own credentials.

You can see examples of these files in the Example Configs directory of **this** repository

## Running Heptagram

### Running Heptagram locally

Make sure you are in the correct folder. Run the Heptagram using the following command.

```bash
yarn start
```
or 
```bash
npm start
```

## Troubleshooting Heptagram

Heptagram is still in active development - bugs and issues are expected. If you experience a bug or issues you could not fix, do not hesitate to open a new [GitHub issue](https://github.com/Heptagram-Bot-Project/bot/issues/new).
