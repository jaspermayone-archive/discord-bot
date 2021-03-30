//This is the invite command. The innvite command sends the server invite. 
//THIS IS CURRENTLY BROKEN UNTILL WE IMPLEMENT A DATABASE SYSTEM (See Github Issue #1)

module.exports = {
    name: 'invite',
    description: "sends server invite link",
    execute(message, args, Discord) {

        if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
            message.channel.send('The public server invite link is SERVER_LINK_HERE');

        } else {
            message.channel.send('Sorry, this command is resticted!');
        }
    }
}