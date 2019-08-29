const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
  
  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
 
  const kapal  = client.emojis.get("616087430969163798");
  const evettek = client.emojis.get("616092520148893707")
  
  const ayarlarr = new Discord.RichEmbed()
  .setColor(`#FE4469`)
  .setAuthor(`${message.guild.name} Sunucusunun Ayarları`)
  .setDescription(`Botumuz artık panelden de yönetilebilmekte, panele gitmek için [bana]() tıkla`)
  .setThumbnail(message.guild.iconURL)
  .addField(`<:sag:616426337116094464> Prefix`, `${prefix}`, true)
  .addField(`<:sag:616426337116094464> Log Kanalı`, db.has(`logK_${message.guild.id}`) ? `${ message.guild.channels.get(db.fetch(`logK_${message.guild.id}`)).name}`: `${kapal} Ayarlanmamış`, true)
  .addField(`<:sag:616426337116094464> Giriş Çıkış Kanalı`, db.has(`gcc_${message.guild.id}`) ? `${ message.guild.channels.get(db.fetch(`gcc_${message.guild.id}`)).name}`: `${kapal}  Ayarlanmamış`, true)
  .addField(`<:sag:616426337116094464> Sayaç Kanalı`, db.has(`sk_${message.guild.id}`) ? `${ message.guild.channels.get(db.fetch(`sk_${message.guild.id}`)).name}`: `${kapal} Ayarlanmamış`, true)
  .addField(`<:sag:616426337116094464> Sayaç`, db.has(`s_${message.guild.id}`) ? (db.fetch(`s_${message.guild.id}`)):` ${kapal} Ayarlanmamış`, true)
  .addField(`<:sag:616426337116094464> Oto Rol Kanalı`, db.has(`orolk_${message.guild.id}`) ? `${ message.guild.channels.get(db.fetch(`orolk_${message.guild.id}`)).name}`: ` ${kapal} Ayarlanmamış`, true)
  .addField(`<:sag:616426337116094464> Oto Rol`, db.has(`orol_${message.guild.id}`) ? `${ message.guild.roles.get(db.fetch(`orol_${message.guild.id}`)).name}`: `${kapal} Ayarlanmamış`, true)
  .addField(`<:sag:616426337116094464> Giriş Mesajı`, db.has(`ozelhosgeldin_${message.guild.id}`) ? db.fetch(`ozelhosgeldin_${message.guild.id}`).replace("-kullanıcı", "`-kullanıcı-`").replace("-sunucu-", "`-sunucu-`").replace("{kişi-sayısı}", "`{kişi-sayısı}`"): `${kapal} Varsayılan`, true)
  .addField(`<:sag:616426337116094464> Çıkış Mesajı`, db.has(`ozelgorusuruz_${message.guild.id}`) ? db.fetch(`ozelgorusuruz_${message.guild.id}`).replace("-kullanıcı-", "`-kullanıcı-`").replace("-sunucu-", "`{sunucu}`").replace("{kişi-sayısı}", "`{kişi-sayısı}`"): `${kapal} Varsayılan`, true)
  message.channel.send(ayarlarr);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  category: "ayarlar"
};

exports.help = {
  name: "ayarlar",
  description: "Sunucu ayarlarını gösterir",
  usage: "ayarlar"
};
