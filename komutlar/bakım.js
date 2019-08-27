const db = require('quick.db')
const Discord = require('discord.js')

var pref = "/"

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(`aç yada kapat yazmalısın! Örnek: ${pref}bakım-mod aç`)
  
  if (args[0] == 'aç') {
    var i = await db.set(`bakım_${bot.user.id}`, 'acik')
      message.channel.send(':white_check_mark: Bakım Modu Başarıyla Açıldı! Bot Sadece Bot Sahiplerine ve Geliştirici Ekibine Açık.')
  }
  if (args[0] == 'kapat') {
    var i = await db.set(`bakım_${bot.user.id}`, 'kapali')
      message.channel.send(':white_check_mark: Bakım Modu Başarıyla Kapatıldı! Bot Kullanıma Açıldı.')
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  kategori: `Geliştirici`
};

exports.help = {
  name: 'bakım-mod',
  description: '[Admin Komutu]',
  usage: '!bakım-mod aç'
};