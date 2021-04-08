const profileModel = require(`../../models/profileSchema`)

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guid.id,
        coins: 0,
        bank: 0
    });
    profile.save();
}