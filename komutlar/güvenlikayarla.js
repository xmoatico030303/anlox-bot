const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
 let p = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  
 let kanal = message.mentions.channels.first();
 if (!kanal) return message.channel.send(`${client.emojis.get(client.emoji.çarpı)} Güvenlik kanalını ayarlamak için bir kanal **etiketlermisin?** Örnek kullanım; \`${p}güvenlik-ayarla #kanal\``)

 if (db.has(`güvenlikK_${message.guild.id}`) === true) {
   db.set(`güvenlikK_${message.guild.id}`, kanal.id)
   
   message.channel.send(`${client.emojis.get(client.emoji.tik)} Güvenlik kanalı başarıyla ${kanal} olarak **değiştirildi!**`)
 }
 if (db.has(`güvenlikK_${message.guild.id}`) === false) {
   db.set(`güvenlikK_${message.guild.id}`, kanal.id)
   
   message.channel.send(`${client.emojis.get(client.emoji.tik)} Güvenlik kanalı başarıyla ${kanal} olarak **ayarlandı!**`)
 }
}
exports.conf = {
  guildOnly : true,
  enabled : true,
  permLvl : 3,
  aliases : [],
  kategori : `ayarlar`
}
exports.help = {
  name : "güvenlik-ayarla",
  description : "Sunucuya katılan kişileri ceza puanına göre değerlendirir.",
  usage : "güvenlik-ayarla #kanal"
}