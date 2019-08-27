const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args, color, prefix) => {
   var request = require('request');
request(`https://api.avci.ml/api/sondakika?key=QDvF0Q3zQj3osfpgwiHaWBDjI`, function (error, response, body) {
    if (error) return console.log('Hata:', error); // Hata olursa, konsola göndersin,
    else if (!error) { // Eğer hata yoksa;
        var api = JSON.parse(body); // info değişkeninin içerisine JSON'ı ayrıştırsın,
      const embed = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} - Son Dakika Haberleri`, client.user.avatarURL)
     .addField('Haber - 1', `Kaynak: ${api.kaynak1}\nBaşlık: ${api.baslik1}\nİçerik: ${api.icerik1}\n[Link](${api.haberurl1})\nHaber Tarihi: ${api.habertarihi1}`)
      .addField('Haber - 2', `Kaynak: ${api.kaynak2}\nBaşlık: ${api.baslik2}\nİçerik: ${api.icerik2}\n[Link](${api.haberurl2})\nHaber Tarihi: ${api.habertarihi2}`)
       .addField('Haber - 3', `Kaynak: ${api.kaynak3}\nBaşlık: ${api.baslik3}\nİçerik: ${api.icerik3}\n[Link](${api.haberurl3})\nHaber Tarihi: ${api.habertarihi3}`)
      .setColor('RANDOM')
      message.channel.send({embed : embed})
    }
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: `kullanıcı`
};
exports.help = {
  name: 'sondakika',
  description: 'Son dakika haberlerini gösterir!',
  usage: 'sondakika'
};