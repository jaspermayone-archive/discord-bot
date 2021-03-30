//This is the support command. The support command sends a link for the bot support server

module.exports = {
    name: 'support',
    description: "sends a link for the bot support server",
    execute(message, args, Discord) {

        //All code to be exixuted with correct permisions goes inside this if.
        if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
            message.channel.send('Need help with Heptigram? Join our discord server at https://discord.gg/HSupF99kpq');

            //The resricted reponse message goes in here.
        } else {
            message.channel.send('Need help with Heptigram? Have someone with Admin permissions runn this command');
        }
    }
}