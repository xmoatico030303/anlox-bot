const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const sie = ["<:hayr:601861431796957214> | Bu komudu sadece **Sahibim** kullanabilir!"]
    const tmm = ["<:evettt:604299851546492928> | Yeniden başlıyorum."]
    if (message.author.id !== "446048541488578569") {
      message.channel.send(sie);
    } else {
      message.channel.send(tmm).then(msg => {
      console.log(`Yeniden basliyom`);
        console.log(`Sahibim Algılandı | Bot Yeniden Başlıyor`);
      process.exit(0);
    })
   }
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'yenile',
    description: 'Sahip Özel',
  usage: 'yenile'
};