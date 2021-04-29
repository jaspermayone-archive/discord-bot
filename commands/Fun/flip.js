const { del } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "coinflip",
    category: "fun",
    description: "Flips a coin for heads or tails.",
    execute({ message, client, args, roles }) {
        let embed = new MessageEmbed()
            .setColor("#0efefe")
            .setTitle("A coin was flipped..")
            .setTimestamp()

        let number = Math.floor(Math.random() * 2);

        if (number === 0) embed.addField("Result", "\`Heads\`")
        else embed.addField("Result", "\`Tails\`")

        message.channel.send(embed).then(m => del(m, 15000));
    }
}