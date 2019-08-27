const Discord = require('discord.js');

exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.RichEmbed()
.setDescription('Kullanım: /sipariş <nasıl bot istiyon>'));
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(' <:evet:601861431540973595> Sipariş Gönderildi!')
message.channel.send(embed)
const embed2 = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(` <:bildirim2:601861434187710526>  **${message.author.tag}** adlı kullanıcının Siparişi:`)
.addField(`Kulanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}`)
.addField("Sipariş", type)
.setThumbnail(message.author.avatarURL)
client.channels.get('606180432618192897').send(embed2); // Kanal ID 

};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 ,
  kategori:'kullanıcı'
};

exports.help = {
  name: 'sipariş',
  description: 'Öneride Bulunursunuz.',
  usage: 'sikayet <Şikayet>'
};