module.exports = {
  name: 'hack',
  description: 'Another Fun Command',
  category: 'Fun',
  minArgs: 0,
  maxArgs: 1,
  expectedArgs: '<@user you want to hack>',
  cooldown: '1m',

  callback: async (message) => {
    const msgObj = message.message;

    const tohack = msgObj.mentions.members.first();
    const msg = await msgObj.channel.send({
      content: `Hacking ${tohack.displayName}....`,
    });

    setTimeout(function () {
      msg.edit(`Finding ${tohack.displayName}'s Email and Password.....`);
    }, 1000);

    setTimeout(function () {
      msg.edit(`E-Mail: ${tohack.displayName}@gmail.com \nPassword: ********`);
    }, 9000);

    setTimeout(function () {
      msg.edit('Finding Other Accounts.....');
    }, 15000);

    setTimeout(function () {
      msg.edit('Setting up Epic Games Account.....');
    }, 21000);

    setTimeout(function () {
      msg.edit('Hacking Epic Games Account......');
    }, 26000);

    setTimeout(function () {
      msg.edit('Hacked Epic Games Account!!');
    }, 31000);

    setTimeout(function () {
      msg.edit('Collecting Info.....');
    }, 35000);

    setTimeout(function () {
      msg.edit('Selling data to FBI....');
    }, 38000);

    setTimeout(function () {
      msg.edit(`Finished Hacking ${tohack.displayName}`);
    }, 40000);
  },
};
