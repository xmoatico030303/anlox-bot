const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let arguman = args[0]
  
  if (!arguman) return message.channel.send(`${client.emojis.get(client.emoji.çarpı)} **Lütfen \`aç\` veya \`kapat\` yazın!**`)
  
  if (arguman === "aç") {
  if (db.has(`kufurE_${message.guild.id}`) === true) {
    message.channel.send(`${client.emojis.get(client.emoji.çarpı)} **İşlem başarısız! Küfür engelleme sistemi zaten aktif!**`)
  }
  if (db.has(`kufurE_${message.guild.id}`) === false) {
    db.set(`kufurE_${message.guild.id}`, "Aktif")
    message.channel.send(`${client.emojis.get(client.emoji.tik)} **Küfür engelleme sistemi başarıyla açıldı!**`)
  }
  if (arguman === "kapat") {
    if (db.has(`kufurE_${message.guild.id}`) === true) {
    db.delete(`kufurE_${message.guild.id}`)
    message.channel.send(`${client.emojis.get(client.emoji.çarpı)} **Küfür engelleme sistemi başarıyla kapatıldı!**`)
  }
  if (db.has(`kufurE_${message.guild.id}`) === false) {
    
    message.channel.send(`${client.emojis.get(client.emoji.tik)} **İşlem başarısız! Küfür engelleme sistemi zaten kapalı**`)
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
  name : "küfür-engel",
  description : "Küfür engelleme sistemini ayarlar. (Kullanmanızı Öneririz)",
  "usage" : "küfür-engel aç/kapat"
}