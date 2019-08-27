const Discord = require('discord.js');

exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.RichEmbed()
.setDescription('Kullanım: /öneri <Öneri>'));
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(' <:evet:601861431540973595> Öneri Bildirildi!')
message.channel.send(embed)
const embed2 = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(` <:bildirim2:601861434187710526>  **${message.author.tag}** adlı kullanıcının Önerisi:`)
.addField(`Kulanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}`)
.addField("Şikayet", type)
.setThumbnail(message.author.avatarURL)
client.channels.get('601912869499568139').send(embed2); // Kanal ID 

};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 ,
  kategori:'kullanıcı'
};

exports.help = {
  name: 'öneri',
  description: 'Öneride Bulunursunuz.',
  usage: 'sikayet <Şikayet>'
};