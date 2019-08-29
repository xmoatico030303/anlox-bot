const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
  
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  const ayarlarr = new Discord.RichEmbed()
  .setColor(`#FE4469`)
  .setAuthor(`${message.guild.name} Sunucusunun Ayarları`)
  .setDescription(`Botumuz artık panelden de yönetilebilmekte, panele gitmek için [bana](https://panel-pribblebot.glitch.me/) tıkla`)
  .setThumbnail(message.guild.iconURL)
  .addField(`Prefix`, `${prefix}`, true)
  .addField(`Log Kanalı`, db.has(`logK_${message.guild.id}`) ? `${ message.guild.channels.get(db.fetch(`logK_${message.guild.id}`)).name}`: ` Ayarlanmamış`, true)
  .addField(`Giriş Çıkış Kanalı`, db.has(`gcc_${message.guild.id}`) ? `${ message.guild.channels.get(db.fetch(`gcc_${message.guild.id}`)).name}`: ` Ayarlanmamış`, true)
  .addField(`Sayaç Kanalı`, db.has(`sk_${message.guild.id}`) ? `${ message.guild.channels.get(db.fetch(`sk_${message.guild.id}`)).name}`: ` Ayarlanmamış`, true)
  .addField(`Sayaç`, db.has(`s_${message.guild.id}`) ? (db.fetch(`s_${message.guild.id}`)):` Ayarlanmamış`, true)
  .addField(`Oto Rol Kanalı`, db.has(`orolk_${message.guild.id}`) ? `${ message.guild.channels.get(db.fetch(`orolk_${message.guild.id}`)).name}`: ` Ayarlanmamış`, true)
  .addField(`Oto Rol`, db.has(`orol_${message.guild.id}`) ? `${ message.guild.roles.get(db.fetch(`orol_${message.guild.id}`)).name}`: ` Ayarlanmamış`, true)
  .addField(`Giriş Mesajı`, db.has(`ozelhosgeldin_${message.guild.id}`) ? db.fetch(`ozelhosgeldin_${message.guild.id}`).replace("-kullanıcı", "`-kullanıcı-`").replace("-sunucu-", "`-sunucu-`").replace("{kişi-sayısı}", "`{kişi-sayısı}`"): `Varsayılan`, true)
  .addField(`Çıkış Mesajı`, db.has(`ozelgorusuruz_${message.guild.id}`) ? db.fetch(`ozelgorusuruz_${message.guild.id}`).replace("-kullanıcı-", "`-kullanıcı-`").replace("-sunucu-", "`{sunucu}`").replace("{kişi-sayısı}", "`{kişi-sayısı}`"): `Varsayılan`, true)
  message.channel.send(ayarlarr);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  category: "ayarlar"
};

exports.help = {
  name: "ayarlar",
  description: "Sunucu ayarlarını gösterir",
  usage: "ayarlar"
};
