const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let kanal = message.mentions.channels.first();
  if (!kanal) return message.reply('Davet Özelliği İçin Bir Kanal Etiketlemelisin!')
  
  if (db.has(`davetk_${message.guild.id}`) === true){
  
  db.set(`davetk_${message.guild.id}`, kanal.id);  
  message.channel.send(`Davet Kanal Özelliği Başarıyla ${kanal} olarak değiştirildi!`)
  }
  if (db.has(`davetk_${message.guild.id}`) === false){
  
    db.set(`davetk_${message.guild.id}`, kanal.id);
    
    message.channel.send(`Davet Kanalı Başarıyla ${kanal} olarak ayarlandı!`)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  kategori: "moderasyon"
}
exports.help = {
  name: 'davet-kanal-ayarla',
  description: 'Davet Kanal Ayarlar.',
  usage: '/davet-kanal-ayarla'
}