const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, params, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: Hoşgeldin kanalı ayarlamak için `Yönetici` yetkisine sahip olman gerek.')
  let hgkanali = message.mentions.channels.first();
  if (!hgkanali) return message.channel.send(':no_entry: Hoşgeldin kanalı ayarlamak için bir kanal etiketlemeniz gerekli. `/gkanal #kanal`')
    db.set(`gcc_${message.guild.id}`, hgkanali.id)
  let i = await db.fetch(`gcc_${message.guild.id}`)
  message.channel.send(`Hoşgeldin kanalı, ${hgkanali} olarak ayarlandı.`)    
        
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
  kategori:'ayarlar'
};

exports.help = {
 name: 'gkanal',
 description: 'Resimli GİRİŞ çIKIŞ aYARLAR',
 usage: 'gkanal'
};
