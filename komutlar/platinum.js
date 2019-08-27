const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let arguman = args[0]
  let user = client.users.get(args[1]);
  let sure = args[2]
  const tik = client.emojis.get(client.emoji.tik)
  const çarpı = client.emojis.get(client.emoji.çarpı);
  
  if (!arguman) {
  message.channel.send(`**Lütfen** bir argüman **belirtin.** \`ver\` veya \`al\` **yazın.**`)
  return;
  }
  if (arguman === 'ver') {
  if (!user) {
  var uyari1 = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .setDescription(`**Platinium Üyeliğini** **aktif** etmek istediğin kullanıcının **ID**'sini yazmalısın.`) 
  .setColor("RANDOM")
  message.channel.send(uyari1)
  return;
  };
  if (!sure) {
  var uyari2 = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .setDescription(`**Platinium Üyeliğini** **aktif** olmasını istediğin süreyi yazmalısın.`) 
  .setColor("RANDOM")
  message.channel.send(uyari2)
  return;
  }
  if (db.has(`elmasüye_${user.id}`) === true) {
  var uyari3 = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .setDescription(`Kullanıcı zaten **Platinium Üye** !`)
  .setColor("RANDOM")
  message.channel.send(uyari3)
  return;
  }
  db.set(`elmasüye_${user.id}`, "Platinium")
  
  var eoldu = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .setDescription(`${user} **(${args[1]})** adlı kullanıcının Platinium üyeliği ${sure} olarak **aktif edildi!**`)
  .setColor("RANDOM")
  message.channel.send(eoldu)
  
  var eoldulog = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .addField(`Kullanıcı :`, `${user} **(${user.id})**`)
  .addField(`Yetkili :`, `${message.author}`)
  .addField(`Süre :`, `**${sure}**`)
  .addField(`Durum :`, `${tik}`)
  .setColor("RANDOM")
  client.channels.get('611989186026668047').send(eoldulog)
  }
  if (arguman === 'al') {
  if (!user) {
  var uyari1 = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .setDescription(`**Platinium Üyeliğini** **deaktif** etmek istediğin kullanıcının **ID**'sini yazmalısın.`) 
  .setColor("RANDOM")
  message.channel.send(uyari1)
  return;
  };
  if (db.has(`elmasüye_${user.id}`) === false) {
  var uyari3 = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .setDescription(`Kullanıcı zaten **Platinium Üye** __değil__ !`)
  .setColor("RANDOM")
  message.channel.send(uyari3)
  return;
  }
  db.delete(`elmasüye_${user.id}`)
  var ebitti = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .setDescription(`${user} **(${args[1]})** adlı kullanıcının elmas üyeliği **bitirildi!**`)
  .setColor("RANDOM")
  message.channel.send(ebitti)
  var ebittilog = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} | Platinium Üye Sistemi`, client.user.avatarURL)
  .addField(`Kullanıcı :`, `${user} **(${user.id})**`)
  .addField(`Yetkili :`, `${message.author}`)
  .addField(`Durum :`, `${çarpı}`)
  client.channels.get('611989186026668047').send(ebittilog)
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
  name: 'platinium-üye',
  description: "Belirtilen kullancıya platinium üye verir/alır",
  usage: "platinium-üye ver/al"
};