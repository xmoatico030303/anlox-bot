const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();

let emoji = client.emojis.get("599695534483046420")




exports.run = async (client, message, args) => {
  let arguman = args[0]
  
  if (!arguman) return message.channel.send(`${client.emojis.get(client.emoji.çarpı)} **Lütfen \`aç\` veya \`kapat\` yazın!**`)
  
  if (arguman === "aç") {
  if (db.has(`reklamE_${message.guild.id}`) === true) {
   message.channel.send(`${emoji} **Reklam engelleme sistemi başarıyla açıldı!**`)
  }
  if (db.has(`reklamE_${message.guild.id}`) === false) {
    db.set(`reklamE_${message.guild.id}`, "Aktif")
   message.channel.send(`${emoji} **Reklam engelleme sistemi başarıyla açıldı!**`)
  }
  if (arguman === "kapat") {
    if (db.has(`reklamE_${message.guild.id}`) === true) {
    db.delete(`reklamE_${message.guild.id}`)
    message.channel.send(`${emoji} **Reklam engelleme sistemi başarıyla açıldı!**`)
  }
  if (db.has(`reklamE_${message.guild.id}`) === false) {
    
    message.channel.send(`${emoji} **Reklam engelleme sistemi başarıyla açıldı!**`)
  }
  }
  } 
}
exports.conf = {
  guildOnly : true,
  enabled : true,
  aliases : [],
  permLvl : 3,
  kategori : `ayarlar`
}
exports.help = {
  name : "reklam-engel",
  description : "Reklam engelleme sistemini ayarlar. (Kullanmanızı Öneririz)",
  "usage" : "reklam-engel aç/kapat"
}