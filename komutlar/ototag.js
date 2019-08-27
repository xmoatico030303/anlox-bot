const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let tag = args[0];
  let kanal = message.mentions.channels.first();

  if (!tag) return message.channel.send(` Ototag'ı ayarlamak için bir tag **yazmalısın!**`)
  if (!kanal) return message.channel.send(` Ototag'ı ayarlamak için bir kanal **etiketlemelisin!**`)
  
  if (db.has(`tag_${message.guild.id}.tag`) === true) {
  db.set(`tag_${message.guild.id}.tag`, tag)
  db.set(`tag_${message.guild.id}.kanal`, kanal.id)
  
  message.channel.send(`Ototag ${tag}, kanalı ${kanal} olarak **değiştirildi!**`)
  }
  if (db.has(`tag_${message.guild.id}.tag`) === false) {
  db.set(`tag_${message.guild.id}.tag`, tag)
  db.set(`tag_${message.guild.id}.kanal`, kanal.id)
  
  message.channel.send(` Ototag ${tag}, kanalı ${kanal} olarak **ayarlandı!**`)
  }
}
exports.conf = {
  guildOnly : true,
  enabled : true,
  aliases : [],
  permLvl : 3,
  kategori : 'ayarlar'
}
exports.help = {
  name : "ototag-ayarla",
  description : "Ototag sisteminin tagını ve kanalını ayarlar.",
  usage : "ototag-ayarla tag #kanal"
}