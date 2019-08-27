const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let biyo = args.slice(0).join(' ');
  if (!biyo) return message.channel.send(`${client.emojis.get(client.emoji.çarpı)} Biyografini ayarlamak için birşeyler **yazmalısın!**`)
  
  db.set(`profil_${message.author.id}.biyografi`, biyo)
  message.channel.send(`${client.emojis.get(client.emoji.tik)} Biyografi başarıyla **ayarlandı!**`)
}
exports.conf = {
  guildOnly : false,
  enabled : true,
  aliases : [],
  permLvl : 0,
  kategori : `Profil`
}
exports.help = {
  name : "biyografi-ayarla",
  description : "Profil sistemindeki biyografiyi ayarlar.",
  usage : "biyografi-ayarla biyografi"
}