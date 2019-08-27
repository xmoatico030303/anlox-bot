const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json")

exports.run = async (bot, msg, args, dil) => {
  const client = bot;
  let prefix = (await db.fetch(`prefix_${msg.guild.id}`)) || ayarlar.prefix;

  var arg = ``;
  if (args[0] === "özel") {
    var arg = `moderasyon`;
  } else if (args[0] === "lvl") {
    var arg = `profil`;
  } else if (args[0] === "müzik") {
    let müzik = [
      `
[${prefix}oynat](anloxforum.cf/) • İstenilen şarkıyı oynatır
[${prefix}durdur](anloxforum.cf/) • Çalan şarkıyı durdurur
[${prefix}duraklat](anloxforum.cf/ • Çalan şarkıyı duraklatır
[${prefix}devam-ettir](anloxforum.cf/) • Duraklatılmış şarkıyı devam ettirir
[${prefix}ses](anloxforum.cf/) • Şarkının sesini ayarlamanızı sağlar
[${prefix}geç](anloxforum.cf/) • Sıradaki şarkıya geçer
[${prefix}kuyruk](anloxforum.cf/) • Şarkı kuyruğunu ve çalan şarkıyı gösterir  
`
    ];

    const müzikE = new Discord.RichEmbed()
      .setColor(`#FE4469`)
      .setTitle(`Müzik Komutlarım`)
      .setDescription(müzik)
    msg.channel.send(müzikE);
    return;
  } else {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }

  let arr = [];
  client.commands.forEach(x => {
    if (!arr.includes(x.conf.kategori)) {
      arr.push(x.conf.kategori);
    }
  });

  let cats = arr
    .filter(x => x !== undefined)
    .map(
      k =>
        `[${prefix}yardım ${k}](anloxforum.cf/) • ${k.charAt(0).toUpperCase() +
          k.slice(1)} komutlarını gösterir`
    )
    .join("\n");

  if (!arg) {
    /*  msg.channel.send(`# ${client.user.username} - categoryler

${cats}

> ${prefix}yardım [category] yazarak komutları görebilirsiniz.
`, {split: true, code: "md"})
*/
    const embed = new Discord.RichEmbed()
      .setColor(`#FE4469`)
      .setTitle(`Komut Gruplarım`)
      .setDescription(
        `${cats}
        [${prefix}yardım müzik](anloxforum.cf/) • Müzik komutlarını gösterir`
      )
      .setFooter(`Örnek kullanım: ${prefix}yardım eğlence`)
    .addField(`Linkler`, `[Bot Davet Linki](hhttps://discordapp.com/oauth2/authorize?client_id=485110852739923969&scope=bot&permissions=268443710) • [Destek Sunucusu](https://discord.gg/AJ6tpFT) • [İnternet Sitesi](http://anloxforum.cf/)`);
    msg.channel.send(embed);
  } else {
    let list = client.commands.filter(x => x.conf.kategori === arg);

    if (!arr.includes(arg))
      return msg.channel.send(`<:hata:563998148754669568> Doğru komut grubundan yardım aldığınızdan emin olun`);

    const cmds = Array.from(list.keys());
    const longest = cmds.reduce((long, str) => Math.max(long, str.length), 0);

    // msg.channel.send(list.map(k => `${k.help.name}${' '.repeat(longest - k.help.name.length)} :: ${k.help.description}`).join("\n"), {split: true, code: "asciidoc"})

    const e = new Discord.RichEmbed()
      .setColor(`#FE4469`)
      .setTitle(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Komutlarım`)
      .setDescription(
        list
          .map(
            k =>
              `[${prefix + k.help.name}](anloxforum.cf/) • ${k.help.description}`
          )
          .join("\n")
      );
    msg.channel.send(e);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help"],
  permLevel: 0,
  category: "genel"
};

exports.help = {
  name: "yardım",
  description: "Botun komutlarını veya yazdığınız kategorideki komutları listeler",
  usage: "yardım - yardım <kategori>"
};
