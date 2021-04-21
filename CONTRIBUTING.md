## Contributing
Contributing is welcomed! We have extensive documentation bellow as well as comments in the code to help you out.
Please take a look at our GitHub issues for ideas on what to work on. Our Github issues are labeled by prioritys. 1 being the highest, and 3 being the lowest. Brownie points if you finish something from our [Initial Release Features Milestone](https://github.com/Heptagram-Bot/Heptagram/milestone/1) Our one request is that you keep our comments in the code. You are welcome to remove them and then add them back, but please have them in whatever code you submit. To contibute, please do all your work on a fork and then open a PR. You can also check out our [ZenHub Board](https://app.zenhub.com/workspaces/heptagram-606c69c7b879620019c7a8dd/board?repos=351886849,353174783,354975052)

### Workflow

#### Step 1: Create a fork or branch.
All work should be done on a fork unless you have been added as a contributor. In that case, please use a branch off of master. We update our branches with changes frequently, so make sure to [keep your fork up to date](https://dev.to/giannellitech/keeping-your-fork-up-to-date-klh)

#### Step 2: Making changes
Make nessisary changes then commit.

### Step 4: Make sure readme has correct documentation
If you made changes that require updates to the documentation, make sure to update it

#### Step 5: Pull Request
Open a pull request into the Heptagram-Staged branch. Someonne will reveiw your project as soon as they can.


## Bot Community.
You can join our discord at https://discord.gg/HSupF99kpq. This server is still iorning out some details, so please be patient. :)

# Documentation

## Setting Up Discord

### Setting Up Sandbox Server for testing.
Create a empty server in Discord.

Create roles `Mods` , `Users` , and  `Muted`.

Invite Bot to your Server (see **Creating a Bot User** below).

### Setting Up Bot User

You will need a discord bot token for testing. If you don't know that, you should read https://www.writebots.com/discord-bot-token/

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

For local development we recommend copying the `example-config.json` file with your own credentials, for production we recommend you refer to your systems preferred way of storing environment variables securely.

Fill out the `config.json` will your Discord applications credentials, e.g.

```shell
{
    "prefix": "!",
    "token": "your-token-goes-here"
}
```

## Running Heptagram

### Running Heptagram locally

Make sure you are in the correct folder. Run the Heptagram using the following command.

```
yarn start
```

## Troubleshooting Heptagram

Heptagram is still in active development - bugs and issues are expected. If your experience a bug or issues you could not fix, do not hesitate to open a new [GitHub issue](https://github.com/Heptagram-Bot/Heptagram/issues/new).
