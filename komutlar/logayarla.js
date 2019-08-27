const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
 let p = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  
 let kanal = message.mentions.channels.first();
 if (!kanal) return message.channel.send(`${client.emojis.get(client.emoji.çarpı)} Log kanalını ayarlamak için bir kanal **etiketlermisin?** Örnek kullanım; \`${p}log-ayarla #kanal\``)

 if (db.has(`logK_${message.guild.id}`) === true) {
   db.set(`logK_${message.guild.id}`, kanal.id)
   
   message.channel.send(`${client.emojis.get(client.emoji.tik)} Log kanalı başarıyla ${kanal} olarak **değiştirildi!**`)
 }
 if (db.has(`logK_${message.guild.id}`) === false) {
   db.set(`logK_${message.guild.id}`, kanal.id)
   
   message.channel.send(`${client.emojis.get(client.emoji.tik)} Log kanalı başarıyla ${kanal} olarak **ayarlandı!**`)
 }
}
exports.conf = {
  guildOnly : true,
  enabled : true,
  permLvl : 3,
  aliases : [],
  kategori : `Ayarlar`
}
exports.help = {
  name : "log-ayarla",
  description : "Sunucuda gerçekleşen çoğu işlemleri kayıt altına alır.",
  usage : "log-ayarla #kanal"
}