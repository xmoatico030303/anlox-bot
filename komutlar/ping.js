const Discord = require('discord.js');


exports.run = function(client, message) {

    message.channel.send(`Gecikme: ${client.ping}ms, mesaj gecikmesi: ${new Date().getTime() - message.createdTimestamp}ms.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['p'],
  permLevel: 0,
  kategori:'kullanıcı'
};

exports.help = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  usage: 'ping'
};