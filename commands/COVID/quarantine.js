module.exports = {
    name: 'quarantine',
    guildOnly: false,
    description: "gets covid stats",
    category: "COVID",
    
    execute({ message, args }) {
        message.channel.send('Hi there, this is the state calling to inform you that you have come into close contact with somebody who has contracted the COVID-19 disease. Please quarantine untill further notice.');
    }
}
