const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')

  
  
  let kanal = message.mentions.channels.first();
  if (!kanal) return message.reply('Sayaç Özelliği İçin Bir Kanal, Sayı Belirlemelisin!')
  
  let sayi = args[0];
  if (!sayi) return message.reply('Sayaç Özelliği İçin Bir Kanal, Sayı Belirlemelisin!')
      
  if (db.has(`sayac_${message.guild.id}`) === true){
  
  db.set(`sayacs_${message.guild.id}`, sayi)  
  db.set(`sayac_${message.guild.id}`, kanal.id);
    
  message.channel.send(`Sayaç Kanalı ${kanal} ve Sayaç Sayısı ${sayi} olarak değiştirildi!`) 
  }
  
  if (db.has(`sayac_${message.guild.id}`) === false){
  
  db.set(`sayacs_${message.guild.id}`, sayi)  
  db.set(`sayac_${message.guild.id}`, kanal.id);
  
  message.channel.send(`Sayaç Kanalı ${kanal} ve Sayaç Sayısı ${sayi} olarak ayarlandı!`)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sayac','set-counter','counter'],
  permLevel: 0,
  kategori: "moderasyon"
}
exports.help = {
  name: 'sayaç',
  description: 'Sayaç Özelliği Ayarlar.',
  usage: '/sayaç'
}