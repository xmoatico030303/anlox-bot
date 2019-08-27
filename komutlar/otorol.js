const Discord = require('discord.js')
const fs = require('fs')
const ayarlar = require('../ayarlar.json')
const moment = require('moment');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
var room;
var rolee;
var title;
var duration;
var filter = m => m.author.id === message.author.id;
 
  
      const kanal = new Discord.RichEmbed()
      .setColor(`#FE4469`)
      .setTitle(`Kanal Belirtin`)
      .setDescription(`Oto rol kanalının adını belirtin`)
      .setFooter(`Kanal seçimi 10 saniye içinde otomatik olarak sona erecek`)
      message.channel.send(kanal).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 10000,
        errors: ['time']
      }).then(collected => {
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send('Böyle bir kanal bulunmuyor');
            const rol = new Discord.RichEmbed()
            .setColor(`#FE4469`)
            .setTitle(`Rol Belirtin`)
            .setDescription(`Otomatik verilecek rolün adını belirtin`)
            .setFooter(`Rol seçimi 10 saniye içinde otomatik olarak sona erecek`)
            msg.channel.send(rol).then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ['time']
              }).then(collected => {
                
                let role = message.mentions.roles.first()
        if(!role) return message.channel.send('Böyle bir rol bulunmuyor');
                
                  message.channel.send(`<:onay:563998148821909505> Oto rol kanalı başarıyla \`${channel.name}\` adlı kanal olarak ve oto rol \`${role.name}\` olarak ayarlandı!`)
                
                var sk = db.set(`orolk_${message.guild.id}`, channel.id)
               var s = db.set(`orol_${message.guild.id}`, role.id)
    
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
	aliases: ['oto-rol', 'otorolayarla'],
	permLevel: 4,
  category: 'ayarlar'
}

exports.help = {
	name: 'oto-rol-ayarla',
	description: 'Oto rolü ve kanalını ayarlamanızı sağlar',
	usage: 'oto-rol-ayarla <#kanal> <@rol>',
}
