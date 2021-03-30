# Heptagram Bot

[![CodeQL](https://github.com/Heptagram-Bot/Heptagram/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/Heptagram-Bot/Heptagram/actions/workflows/codeql-analysis.yml)

# Welcome to Heptagram. 
The goal is for Heptagram to be the all in one open source discord bot with as many features as possible.

## Contributing
Contributing is welcomed! We have extensive documentation bellow as well as comments in the code to help you out.
Please take a look at our GitHub issues for ideas on what to work on. Our one request is that you keep our comments in the code. You are welcome to remove them and then add them back, but please have them in whatever code you submit. To contibute, please do all your work on a branch and then open a PR.

## Bot Community.
We are working on setting up a Discord Server for our community. This will serve as Bot Support and a place for our developers and contributers to talk. This server will be up and running in the very near future. 

# Open Sauced
Heptagram is proud to work with Open Sauced and the Open Sauced discord server. Open Saucedis a website that helps you track your open source contributions and contribution goals. You can find the website at https://opensauced.pizza/. They also have an amaazing Discord community and I highly recommend you check it out. The link for the discord server is https://discord.gg/PDJNR7u37h. I am in the server and you can feel free to message me there about the Bot until our server is up and running. My username is J-dogcoder#0803.


# Documentation

## Setting Up Discord

### Setting Up Sandbox Server for testing.
Create a emty server in Discord.

Create roles `Mods` , `Users` , and  `Muted`.

Invite Bot to your Server (see **Creating a Bot User** below).

### Setting Up Bot User

First you need to go to [discord developers](https://discordapp.com/developers/applications/me) and click "New Application"
![Application Screen](http://i.imgur.com/FvgfY2Z.png)
Now give your bot a name and a picture, a description isn't necessary.
![New Application Screen](http://i.imgur.com/MOS7yvH.png)
Click "Create Application". On the next page scroll down until you see "Create a bot user", click that. Also click yes do it.
![Screen you see after creating a new application then scrolling down a little.](http://i.imgur.com/YAzK5ml.png)
![Yes Do It.](http://i.imgur.com/vkF6Rxo.png)
Now you can get your bot's token, by using the "click to reveal button" in the app bot user section. Remember to uncheck `Public Bot`
![New Bot Page](http://i.imgur.com/xhKMUVU.png)
![Token](http://i.imgur.com/QwCmJJM.png)
There's your token! Now its time to invite your bot to your server. Don't worry about your bot being started for this next step. Change the `client_id` in the URL to your Client ID under App Details, then go to this url ```https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0```
![Authorize Bot](http://i.imgur.com/Ggwy0BP.png)
Now select your sever, then click authorize.
![Authorized](http://i.imgur.com/4cqNcs1.png)
That's it! Now you can start your bot.


## Install & Dependencies

### Clone repository

git clone https://github.com/Heptagram-Bot/Heptagram.git or git clone git@github.com:Heptagram-Bot/Heptagram.git
cd Heptagram

Create new file for bot config with the following contents in the directory specified below. You willl have to change our values to maatch yours:

**For Development:** `.env`

```
BOT_TOKEN=NzgzMDczMDk1MDM2MDQz*******************
ADMIN_ROLE_ID=825176********
MUTED_ROLE_ID=825848********
USER_ROLE_ID=82584********
```

## Running Bot

##### For Development

Make sure you are in the correct folder. Run the bot using 

```
node main.js
```

