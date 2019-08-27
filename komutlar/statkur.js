const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
   if (message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")) return message.channel.send("İstatistik ztn bu sunucuda kurulmuş!")

  let kategori = await message.guild.createChannel('Sunucu İstatistik', 'category', [{
  id: message.guild.id,
  deny: ['CONNECT'],
  deny: ['VIEW_CHANNEL']
  }]);
  
 message.guild.createChannel(`Üye sayısı: ${message.guild.memberCount}`, 'voice').then(üyekanal => {
 message.guild.createChannel(`Bot sayısı: ${message.guild.members.filter(m => m.user.bot).size}`, 'voice').then(botkanal => {
 message.guild.createChannel(`Kanal sayısı: ${message.guild.channels.size}`, 'voice').then(kanalsayis => {
 üyekanal.setParent(kategori.id)  
 botkanal.setParent(kategori.id)  
 kanalsayis.setParent(kategori.id)
  
  db.set(`panelüye_${message.guild.id}`, üyekanal.id)
  db.set(`panelbot_${message.guild.id}`, botkanal.id)
  db.set(`panelkanal_${message.guild.id}`, kanalsayis.id)
  
  message.channel.send("Bu Sunucuda Stat Panel Başarıyla Kuruldu!")
  
  })
  })
  })
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['statkur'],
  permLevel: 3,
  kategori: 'moderasyon'
};
module.exports.help = {
  name: 'stat-kur',
  description: 'Sunucu Stat Ayarları Kurulur.',
  usage: '!!stat-kur'
};