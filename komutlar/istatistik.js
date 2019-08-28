const Discord = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
const os = require('os');
const client = new Discord.Client();
const cpuStat = require("cpu-stat");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let gbs = await db.fetch(`geribildirim_${client.user.id}`)
  let surum = await db.fetch(`activity_${client.user.id}`)
  const dikkat = client.emojis.get('616361735770865672');
    const yuklenmee = client.emojis.get('616362262902472791');
  
  
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  
  const embed = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setAuthor(`${client.user.username} - İstatistik`, `https://cdn.discordapp.com/emojis/604040658239356929.png?v=1`)
  .addField(`Geliştirici Ekibi :`, ` ${dikkat} Ekip Lideri : <@${client.ayarlar.sahip}>`, true)
  .addField(`${yuklenmee} **Ram Kullanımı:**`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``,true)
  .addField(`<:vds:616363338946838567> **Çalışma Süresi :**`, `\`${duration}\``, true)
  .addField(`<:adamlar:616365356252004358> **Kullanıcı Sayısı :**`, `\`${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``, true)
  .addField(` **Sunucu Sayısı :**`, `\`${client.guilds.size.toLocaleString()}\``, true)
  .addField(` **Kanal Sayısı :**`, `\`${client.channels.size.toLocaleString()}\``, true)
  .addField(`**Bit**`, `\`${os.arch()}\``, true)
  .addField(`**İşletim Sistemi**`, `\`\`${os.platform()}\`\``,true) 
  .addField(`**Discord.JS Sürüm**`, `\`v ${Discord.version}\``, true)
  .addField(`$**Ping**`, `\`${client.ping} ms\``, true)
  .addField(`**Komut Sayısı**`, `\`${client.commands.size+10}\``, true)
  .addField(`**Güncellemeler Hakkında :**`, `**Son Güncelleme : ${surum || "beta - 0.0.1"}** - **Geri Bildirim Sayısı : ${gbs || "0"}**`, true)
  .addField(`**Botun yapımında kullanılan modüller**`, `\`\`\`diff\n- ${Object.keys(require('../package.json').dependencies).map(p => p).join(', ')} -\`\`\``, true)
  .addField(`**İşlemci**`, `\`\`\`diff\n+ ${os.cpus().map(i => `${i.model}`)[0]} +\`\`\``, true)
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