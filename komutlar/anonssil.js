const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komut için yeterli iznin **yok!**')
  let kanal = message.mentions.channels.first()
  if (!kanal) return message.channel.send('Hangi kanaldaki anons silinecek?')
  let kanal2 = await db.fetch(`anonsk_${message.guild.id}_${kanal.id}`)
  if (!kanal2) return message.channel.send('Bu kanalda bir anons ayarlanmamış!')

  message.channel.send(`Artık ${kanal} adlı kanala, mesaj **gönderilmeyecek!**`)
  
  await db.delete(`anonsk_${message.guild.id}_${kanal.id}`)
  await db.delete(`anonss_${message.guild.id}_${kanal.id}`)
  await db.delete(`anonsm_${message.guild.id}_${kanal.id}`)
  
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 2,
  kategori: 'moderasyon'
};

exports.help = {
  name: 'anons-sil', 
  description: 'Mesajınızı emoji haline getirir',
  usage: 'emojiyazı <mesaj>'
};