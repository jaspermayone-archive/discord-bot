//This is the admin example command.

module.exports = {
    name: 'admin',
    description: "admin example",
    guildOnly: true,
    execute({ message, roles }) {

        //All code to be exixuted with correct permisions goes inside this if.
        if (message.member.roles.cache.has(roles.admin)) {
            message.channel.send('This is an admin command example');
            //The resricted reponse message goes in here.
        } else {
            message.channel.send('Sorry, this command is resticted!');
        }
    }
}