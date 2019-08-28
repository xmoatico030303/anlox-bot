const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komut için yeterli iznin **yok!**')
  let kanal = message.mentions.channels.first()
  if (!kanal) return message.channel.send('Yanlış kullanım! **[**`<#kanal | süre | mesaj>`**]**')
  let sure = args[1]
  if (!sure) return message.channel.send('Yanlış kullanım! **[**`<#kanal | süre | mesaj>`**]**')
  let mesaj = args[2]
  if (!mesaj) return message.channel.send('Yanlış kullanım! **[**`<#kanal | süre | mesaj>`**]**')

  if (ms(sure) < 60000) return message.channel.send('Anonslar en az 5 dk olur!') 
  
  message.channel.send(`Artık ${ms(ms(sure))} aralığı ile ${kanal} adlı kanala, belirtilen mesaj **gönderilecek!**`)
  
  await db.set(`anonsk_${message.guild.id}_${kanal.id}`, kanal.id)
  await db.set(`anonss_${message.guild.id}_${kanal.id}`, ms(sure))
  await db.set(`anonsm_${message.guild.id}_${kanal.id}`, args.slice(2).join(' '))
  
  
   let sure2 = await db.fetch(`anonss_${message.guild.id}_${kanal.id}`)
   if (!sure2) return
  
  
 setInterval(async()=>{
    let mesaj2 = await db.fetch(`anonsm_${message.guild.id}_${kanal.id}`)
    if (!mesaj2) return
    let kanal2 = await db.fetch(`anonsk_${message.guild.id}_${kanal.id}`)
   if (!kanal2) return
   let kanal3 = message.guild.channels.get(kanal2)
   if (!kanal3) return
   kanal3.send(mesaj2)
 }, sure2)
  
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 2,
  kategori: 'moderasyon'
};

exports.help = {
  name: 'anons', 
  description: 'Mesajınızı emoji haline getirir',
  usage: 'emojiyazı <mesaj>'
};