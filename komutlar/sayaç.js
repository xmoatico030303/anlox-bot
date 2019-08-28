const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment');
const ms = require('ms')
const fs = require('fs')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
var room;
var title;
var duration;
var filter = m => m.author.id === message.author.id;
 
  
      const kanal = new Discord.RichEmbed()
      .setColor(`#FE4469`)
      .setTitle(`Kanal Belirtin`)
      .setDescription(`Sayaç kanalının adını belirtin`)
      .setFooter(`Kanal seçimi 10 saniye içinde otomatik olarak sona erecek`)
      message.channel.send(kanal).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 10000,
        errors: ['time']
      }).then(collected => {
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send('Böyle bir kanal bulunmuyor');
        room = collected.first().content;
            const hedef = new Discord.RichEmbed()
            .setColor(`#FE4469`)
            .setTitle(`Hedef Belirtin`)
            .setDescription(`Hedef kullanıcı sayısını belirtin`)
            .setFooter(`Hedef seçimi 10 saniye içinde otomatik olarak sona erecek`)
            msg.channel.send(hedef).then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                  message.channel.send(`<:onay:563998148821909505> Sayaç kanalı başarıyla \`${channel.name}\` adlı kanal olarak ve sayaç sayısı \`${title}\` olarak ayarlandı!`)
                
                var sk = db.set(`sk_${message.guild.id}`, channel.id)
               var s = db.set(`s_${message.guild.id}`, title)
    
                }
            );
                }
              );
            });
          });
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['sayaç', 'sayaçayarla'],
	permLevel: 4,
  category: 'ayarlar'
}

exports.help = {
	name: 'sayaç-ayarla',
	description: 'Sayaç sayısını ve kanalını ayarlamanızı sağlar',
	usage: 'sayaç-ayarla <#kanal> <sayı>',
}
