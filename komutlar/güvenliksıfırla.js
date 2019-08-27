const Discord = require('discord.js');
const client = new Discord.Client();
const veri = require('quick.db');

exports.run = async(client, message, args) => {
  let orol = await veri.fetch(`güvenlik_${message.guild.id}`)
  if (!orol) { return message.channel.send("Kanal ayarlanmamış!"); }
  
  veri.delete(`güvenlik_${message.guild.id}`);
  const başarılı = new Discord.RichEmbed()
  başarılı.setDescription("<:evet:604614138261536768> | Başarılı, bu özellik sıfırlandı!")
  return message.channel.send(başarılı)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kontrol-sıfırla'],
  permLevel: 3,
  kategori: "moderasyon"
}

exports.help = {
  name: "güvenlik-sıfırla",
  description: "",
  usage: "güvenlik-sıfırla"
}
