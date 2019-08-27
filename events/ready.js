const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

var prefix = ayarlar.prefix;

module.exports = client => {
  let i = db.fetch(`bakım_${client.user.id}`)
    if (i == 'acik') {
var Games = [
  
        "» Bakım Modu Aktif",
        "» Bot Kısa Süreliğine Kullanıma Kapalıdır!",
        "» Web Sitemiz anloxforum.tk",
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(Games.length-0+1)+0);

        client.user.setGame(Games[random], "https://www.twitch.tv/anloxbot");
        },  2500);
      const rahatsız = client.emojis.get('552191745258029071');
//client.channels.get('558313359670247434').send(`${rahatsız} **[Bağlandı]** **-** Bot Discorda Bağlandı ve Sunucularda Kullanıma Kapalı.`);
} else if (!i || i == 'kapali') {
   var Games = [
  
        "» /yardım",
      
        "» /davet",
        "» Web Sitemiz http://anloxforum.tk/",
        `» ` +  client.guilds.size + ` Sunucu için teşekkürler`,
        "» Veri Tabanı Sıfırlandı, Tekrardan Ayarlayın",
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(Games.length-0+1)+0);

        client.user.setGame(Games[random], "https://www.twitch.tv/anloxbot");
        },  2500);
    const çevrimiçi = client.emojis.get('552191745279000601');
  //client.channels.get('558313359670247434').send(`${çevrimiçi} **[Bağlandı]** **-** <@488427918989590528>\n\`Ana Sistem\` Discorda Bağlandı ve Kullanıma Hazır.`);
    }
  console.log(`BOT : ${client.user.username} adı ile giriş yaptı!`);
  console.log(`BOT : Komutlar Yüklendi ve kullanıma hazır!`)
  console.log(`BOT : Developed By Avcı Coder Studios`)
  console.log(client.channels.size + ` Kanal - ` + client.guilds.size + ` Sunucu - ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` Kullanıcı`);
}
