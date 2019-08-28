const Discord = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
const os = require('os');
const cpuStat = require("cpu-stat");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let gbs = await db.fetch(`geribildirim_${client.user.id}`)
  let surum = await db.fetch(`activity_${client.user.id}`)
  
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  
  const embed = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setAuthor(`${client.user.username} - İstatistik`, `https://cdn.discordapp.com/emojis/604040658239356929.png?v=1`)
  .addField(`${client.emojis.get(client.emoji.ekip)} **Geliştirici Ekibi :**`, `**Ekip Lideri : <@${client.ayarlar.sahip}> - Ekip Üyeleri : <@396663805456809988> ve <@312962543591096322>**`, true)
  .addField(`${client.emojis.get(client.emoji.ram)} **Ram Kullanımı:**`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``,true)
  .addField(`${client.emojis.get(client.emoji.yükleniyor)} **Çalışma Süresi :**`, `\`${duration}\``, true)
  .addField(`${client.emojis.get(client.emoji.kullanıcı)} **Kullanıcı Sayısı :**`, `\`${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``, true)
  .addField(`${client.emojis.get(client.emoji.sunucu)} **Sunucu Sayısı :**`, `\`${client.guilds.size.toLocaleString()}\``, true)
  .addField(`${client.emojis.get(client.emoji.kanal)} **Kanal Sayısı :**`, `\`${client.channels.size.toLocaleString()}\``, true)
  .addField(`${client.emojis.get(client.emoji.islemci_64x)}**Bit**`, `\`${os.arch()}\``, true)
  .addField(`${client.emojis.get(client.emoji.vds)}**İşletim Sistemi**`, `\`\`${os.platform()}\`\``,true) 
  .addField(`${client.emojis.get(client.emoji.java_script)}**Discord.JS Sürüm**`, `\`v ${Discord.version}\``, true)
  .addField(`${client.emojis.get(client.emoji.bot)}**Ping**`, `\`${client.ping} ms\``, true)
  .addField(`${client.emojis.get(client.emoji.konsol)}**Komut Sayısı**`, `\`${client.commands.size+10}\``, true)
  .addField(`${client.emojis.get(client.emoji.not)}**Güncellemeler Hakkında :**`, `**Son Güncelleme : ${surum || "beta - 0.0.1"}** - **Geri Bildirim Sayısı : ${gbs || "0"}**`, true)
  .addField(`${client.emojis.get(client.emoji.hesapM)}**Botun yapımında kullanılan modüller**`, `\`\`\`diff\n- ${Object.keys(require('../package.json').dependencies).map(p => p).join(', ')} -\`\`\``, true)
  .addField(`${client.emojis.get(client.emoji.islemci)}**İşlemci**`, `\`\`\`diff\n+ ${os.cpus().map(i => `${i.model}`)[0]} +\`\`\``, true)
  message.channel.send(embed)
}
exports.conf = {
aliases : ['i'],
permLvl : 0,
kategori : `Bot`
}
exports.help = {
name : 'istatistik',
description : 'Botun istatisklerini gösterir.',
usage : 'istatistik'
}