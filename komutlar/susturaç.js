const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    var rol = message.guild.roles.find(e => e.name === `Sustur`,);
    var etiket = message.mentions.members.first()
     if (!etiket) return message.channel.send('Kimin susturmasını kaldırmak istersin?')

    etiket.removeRole(rol)
    
    await etiket.removeRole(rol)
    message.send.channel(`Başarıyla susturma kaldırıldı **${etiket.displayName}**`)
}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['sustur-aç'],
 permLevel: 3,
  kategori:'ayarlar'
};

exports.help = {
 name: 'unmute',
 description: 'Susturulan Kişiyi Mutesini Açar',
 usage: ''
};