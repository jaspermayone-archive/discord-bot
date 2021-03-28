module.exports = {
    name: 'admin',
    description: "admin example",
    execute(message, args, Discord){

        if(message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)){
        message.channel.send('This is an admin command example');
    
    } else {
        message.channel.send('Sorry, this command is resticted!');
       }
    }
}