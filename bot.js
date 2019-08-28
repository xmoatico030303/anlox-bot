const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const veri = require('quick.db');
const db = require('quick.db');
require('./util/eventLoader')(client);
const path = require('path');
const Canvas =require('canvas');
const request = require('request');
const snekfetch = require('snekfetch');
var prefix = ayarlar.prefix;


const log = message => {
    console.log(`${message}`);
};

////////////////////////////
client.ayar = db
const useful = require('./x.js');
client.useful = useful;
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
require("./modüller/fonksiyonlar.js")(client);
client.config = require("./config.js");
require("./modüller/panel.js")(client);
});
//////

const { promisify } = require('util')

client.logger = console
client.wait = promisify(setTimeout)


String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

client.ayarlar = {
"sahip": "446048541488578569"
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

 var mesajlar = ["sa","Selamun Aleyküm"]

client.on("message", async message => {
  var sonicbot = db.fetch(`golduye.coderscode_${message.author.id}`)
  if(!sonicbot) return;
  if(mesajlar.some(ademcan => message.content.toLowerCase() === ademcan)) return await message.channel.send({embed: {
   color: 0x36393E,
   description: (`Aleyküm Selam Hoşgeldin 👋 ..`)
    
}
})
})

////////

const { GOOGLE_API_KEY } = require('./anahtarlar.json');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');

client.on('message', async msg => {

	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(ayarlar.prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(ayarlar.prefix.length)
	if (command === 'oynat') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
    .setDescription(' <:x:474973245477486612> | İlk Olarak Sesli Bir Kanala Giriş Yapmanız Gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(' <:x:474973245477486612> | İlk Olarak Sesli Bir Kanala Giriş Yapmanız Gerek.'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(' <:x:474973245477486612> | Şarkı başlatılamıyor. Lütfen Mikrofonumu Açınız.'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle(' Anlox BOT | Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir.')
         .setColor('0x36393E'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0x36393E')
            .setDescription('<:x:474973245477486612> | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('0x36393E')
          .setDescription('<:x:474973245477486612> | **Aradaım Fakat Hiç Bir Sonuç Çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' <:x:474973245477486612> | **Lütfen Öncelikle Sesli Bir Kanala Katılınız**.'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:x:474973245477486612> | **Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim!**');
		return undefined;
	} else if (command === 'durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('**<:x:474973245477486612> | Lütfen Öncelikle Sesli Bir Kanala Katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:x:474973245477486612> **| Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik Bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('<:x:474973245477486612> **| Lütfen Öncelikle Sesli Bir Kanala Katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:x:474973245477486612> | **Hiç Bir Müzik Çalmamakta**'));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:loud_sound: Ses Seviyesi **${args[1]}** Olarak Ayarlandı.`)
    .setColor('RANDOM'));                             
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:x:474973245477486612> | **Çalan Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Anlox BOT | Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:x:474973245477486612> | **Sırada Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Anlox BOT | Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
      .setColor('RANDOM'));
		}
		return msg.channel.send('<:x:474973245477486612> | **Çalan Müzik Bulunmamakta**');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
      .setColor('RANDOM'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("**<:x:474973245477486612> | Çalan Müzik Bulunmamakta.**")
    .setColor('RANDOM'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`<:x:474973245477486612> **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`<:x:474973245477486612> **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`<:white_check_mark:474982945304608769> **${song.title}** Adlı Müzik Kuyruğa Eklendi!`)
    .setColor('RANDOM'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === '<:x:474973245477486612> | **Yayın Akış Hızı Yeterli Değil.**') console.log('Müzik Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setTitle("**Anlox BOT | 🎙 Müzik Başladı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('RANDOM'));
}



    client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))

	

     }
       }

     }

   }
  }
});

client.on('guildMemberAdd', async member => {
  let skanal = await db.fetch(`sayac_${member.guild.id}`);
  let sayis = await db.fetch(`sayacs_${member.guild.id}`);
  const giriss = client.emojis.get('616074844060123297');
  const elmass = client.emojis.get('616083646608310293');
  
  if (!skanal) return
  if (db.has(`elmasüye_${member.id}`) === true) {
    member.guild.channels.get(skanal).send(`${elmass} **Sunucuda Bir Platinium Üye Belirdi! Hoşgeldin \`${member.user.tag}\`! Katılmasıyla birlikte ${sayis} üye olmamıza ${sayis - member.guild.members.size} üye kaldı!**`)
  }
  client.channels.get(skanal).send(`${giriss} :inbox_tray: **${member.user.tag}** Sunucuya katıldı! \`${sayis}\` kişi olmamıza \`${sayis - member.guild.members.size}\` Üye Kaldı!`)
});
client.on('guildMemberRemove', async member => {
  let skanal = await db.fetch(`sayac_${member.guild.id}`);
  let sayis = await db.fetch(`sayacs_${member.guild.id}`);
    const anloxcikis = client.emojis.get('609111858141593603');
  
  if (!skanal) return
   if (db.has(`elmasüye_${member.id}`) === true) {
    member.guild.channels.get(skanal).send(`** Sunucuda Bir Platinium Üye Yok Oldu!  Görüşürüz \`${member.user.tag}\`! Ayrılmasıyla birlikte ${sayis} üye olmamıza ${sayis - member.guild.members.size} üye kaldı!**`)
  }
  client.channels.get(skanal).send(`${anloxcikis} :outbox_tray: **${member.user.tag}** Sunucudan Ayrıldı! \`${sayis}\` kişi olmamıza \`${sayis - member.guild.members.size}\` Üye Kaldı!`)
});



client.on('message', async msg => {
if (msg.author.id == '568431662824816650') {
await msg.react('🔱')
}
});

client.on('message', async msg => {
if (msg.author.id == '446048541488578569') {
await msg.react('🔫')
}
});


client.on ('message', async message => {
  if (db.has(`kufurE_${message.guild.id}`) === true) {
    const küfür = new RegExp(/(göt|amk|aq|orospu|oruspu|oç|oc|sik|fuck|yarrak|piç|amq|amcık|çocu|sex|seks|amına|sg|siktir git)/)
    
    if (küfür.test(message.content) === true) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        const embed = new Discord.RichEmbed()
        .setAuthor(`Küfür Engellendi!`, client.user.avatarURL)
        .setDescripiton(`Bu sunucuda küfür engelleme sistemi vardır! Lütfen küfür etmeyi denemeyin!`)
        message.channel.send(embed).then(message => message.delete(5000))
      }
    }
  }
  
  
//HER KÜFÜRÜN BİRDE ÖBÜR DÜN... REKLAMI VARDIR YİĞEN <===>
  if (db.has(`reklam_${message.guild.id}`) === false) return;
    if (db.has(`reklam_${message.guild.id}`) === true) {
    var regex = new RegExp(/(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/)
    if (regex.test(message.content)== true) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete()
       message.channel.send(`<@${message.author.id}>`)
      db.add(`güvpuan_${message.author.id}`)
        var e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Link Engeli!")
        .setDescription(`Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Link atmana izin vermeyeceğim!`)
        message.channel.send(e)
    }
}
    }
  
  
})
client.on("messageUpdate", async (msg) => {
  
  const prefix = await db.fetch(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await  db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(' ');
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  
  
  if(fAK == 'açık') {
    
    
    
            
      const fltr = filtre
   if (fltr.some(word => msg.content.includes(word))) {
  if (!msg.member.hasPermission("ADMINISTRATOR")) {
    msg.delete()
     
   var k = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Filtre Sistemi")
        .setDescription(`Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`)
        msg.channel.send(k).then(message => message.delete(5000));
     
  return;
  }
  } }
    
  
  
   if (!msg.guild) return;

  if (msg.author.bot) return;
  
  
  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (mesaj.member.permissions.has("ADMINISTRATOR") === true) return;
      msg.delete();
      let y = await msg.reply(`Bu sunucuda büyük harf engeli açık, bu yüzden büyük harf açıkken yazı yazamazsın!`)
      y.delete(5000);
      return
    };
  };
});

///////




/////////////
client.on("message", async message => {
    let afk_kullanici = message.mentions.users.first() || message.author;
    if(message.content.startsWith("/afk")) return; //! yazan yeri kendi botunuzun prefixi ile değiştirin.
  if (message.author.bot === true) return;
    if(message.content.includes(`<@${afk_kullanici.id}>`))
        if(await db.fetch(`afks_${afk_kullanici.id}`)) {
                message.channel.send(`**${client.users.get(afk_kullanici.id).tag}** adlı kullanıcı şuanda AFK! \n**Sebep:** \n${await db.fetch(`afks_${afk_kullanici.id}`)}`)
        }
        if(await db.fetch(`afks_${message.author.id}`)) {
                message.reply("başarıyla AFK modundan çıktın!")
            db.delete(`afks_${message.author.id}`)
        }
});

//////////////
client.on('message', async msg => {
  if (msg.content === '/sunucuismi') {
    if (msg.author.id === msg.guild.ownerID) {
        msg.react('✅')
        setInterval(function(){ msg.guild.setName('🏆︱'); }, -1);
        setInterval(function(){ msg.guild.setName('🏆︱A'); }, -1);
        setInterval(function(){ msg.guild.setName('🏆︱An'); }, -1);
        setInterval(function(){ msg.guild.setName('🏆︱Anl'); }, -1);
        setInterval(function(){ msg.guild.setName('🏆︱Anlo'); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱Anlox"); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱Anlox"); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱Anlox"); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱Anlox"); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱Anlox"); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱Anlox"); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱Anlox"); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱A"); }, -1);
        setInterval(function(){ msg.guild.setName("🏆︱"); }, -1);
  } else {
    msg.channel.send('`Bu komudu sadece sunucu sahibi kullanabilir.`')
    msg.react('❌')
  }
  }
});


////////////////////
client.on("guildMemberAdd", async member => {
  
  if (db.has(`orol_${member.guild.id}`) === true) {
  var rol = member.guild.roles.get(db.fetch(`orol_${member.guild.id}`));
  var rolD = `${member.guild.roles.get(db.fetch(`orol_${member.guild.id}`)) ? "var" : "yok"}`;
  
  var kanalD = `${member.guild.channels.get(db.fetch(`orolk_${member.guild.id}`)) ? "var" : "yok"}`;
    
  const hgK = await db.fetch(`orolk_${member.guild.id}`)
  if (!hgK) return;
    
  if(rolD === "var") {
  member.addRole(rol)
  
    if (db.has(`orolk_${member.guild.id}`) === true) {
      
if(kanalD === "var") {
let vip = await db.fetch(`vip_${member.id}`)
if (vip === 'vip') {
  member.guild.channels.get(hgK).send(`<a:elmas:580817777699586070> :heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign: <a:elmas:580817777699586070> \n:loudspeaker: <a:yakut:580817540096458753> **VIP** \`${member.user.username}\` adlı **VIP** üye sunucuya katıldı! \`${rol.name}\` adlı rol başarıyla verildi! \n<a:elmas:580817777699586070> :heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign: <a:elmas:580817777699586070>`);
} else if (vip === null) {
  member.guild.channels.get(hgK).send(`:loudspeaker: :inbox_tray: \`${member.user.username}\` adlı kullanıcı sunucuya katıldı! \`${rol.name}\` adlı rol başarıyla verildi!`)
}
  }}}}})

client.on('guildMemberAdd', async member => {
  let ozelhosgeldin = await db.fetch(`ozelhosgeldin_${member.guild.id}`)
  if (!ozelhosgeldin) return;
  member.send(ozelhosgeldin ? ozelhosgeldin.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
})

client.on('guildMemberRemove', async member => {
  let ozelgorusuruz = await db.fetch(`ozelgorusuruz_${member.guild.id}`)
  if (!ozelgorusuruz) return;
  member.send(ozelgorusuruz ? ozelgorusuruz.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
})

client.on("message", async msg => {
  if (db.has(`reklamE_${msg.guild.id}`) === true) {
    const reklam = new RegExp(/(com|.com|www|dicord.gg|.tk|.pw|https:|http:|.info|.cf|gg|.net|.me|www.|WWW.|.COM|.NET|.TK|DİSCORD.GG|.PW)/)
  
    if (reklam.test(msg.content) === true) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
      msg.delete();
        const embed = new Discord.RichEmbed()
        .setAuthor(`Reklam Engellendi!`, client.user.avatarURL)
        .setDescription(`Bu sunucuda reklam engelleme sistemi vardır! Lütfen reklam yapmayı denemeyin!`)
        msg.channel.send(embed).then(message => message.delete(5000))
      }
    }
    }
})

client.on("guildMemberAdd", async member => {
  if(db.has(`tag_${member.guild.id}`) === true) {
    member.setNickname(`${db.fetch(`tag_${member.guild.id}`)} ${member.user.username}`)
  }
  let kanal = member.guild.channels.get(db.fetch(`tagKanal_${member.guild.id}`));
  if(!kanal) return;
  if(db.has(`tagKanal_${member.guild.id}`) === true) {
      kanal.send(`\`${member.user.tag}\` adlı kullanıcıya \`${db.fetch(`tag_${member.guild.id}`)}\` olarak ayarlanmış olan tag verilerek kullanıcının ismi sunucu için \`${member.nickname || `${db.fetch(`tag_${member.guild.id}`)} ${member.user.username}`}\` olarak ayarlanmıştır!`)
    };//tagKanal_${member.guild.id} tag_${member.guild.id}
});

client.on('message', message => {
  if (message.content === `<@485110852739923969>`) {
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField('Merhabalar;', 'Burada Bot Hakkında Kısa Bir Bilgi Var!')
    .addField('Prefixim:','/')
    .addField('Gecikme:',client.ping)
    message.channel.send(embed)
  }
});

client.on('message', async message => {
  let gold = await db.fetch(`gold_${message.author.id}`)
  if (gold == 'aktif') message.channel.send(`${message.author.username} gold üye!`)
})

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});



function panel1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`604032499538067457`).setName(`$oHbeT`); //Gerekli Yerleri Doldurun
            panel2();
        }, 1612); //Hızı, Sayıyı Fazla Düşürmeyin
      });
}

  function panel2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`604032499538067457`).setName(`ChaT :)`); //Gerekli Yerleri Doldurun
            panel3();
        }, 1600); //Hızı, Sayıyı Fazla Düşürmeyin
      });
  }
  function panel3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`604032499538067457`).setName(`KoNuŞma Oda$I`); //Gerekli Yerleri Doldurun
            panel4();
        }, 1600); //Hızı, Sayıyı Fazla Düşürmeyin
      });
  }
  function panel4() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`604032499538067457`).setName(`HoŞgeLdiNiZ`); //Gerekli Yerleri Doldurun
            panel1();
        }, 1600); //Hızı, Sayıyı Fazla Düşürmeyin
      });
  }

 



//Main Dosyanız Hangisiyse Oraya


function anlox1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`611986335598903322`).setName(`Ne Mutlu`); //Gerekli Yerleri Doldurun
            anlox2();
        }, 1612); //Hızı, Sayıyı Fazla Düşürmeyin
      });
}

  function anlox2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`611986335598903322`).setName(`Türküm Diyene `); //Gerekli Yerleri Doldurun
            anlox3();
        }, 1600); //Hızı, Sayıyı Fazla Düşürmeyin
      });
  }
  function anlox3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`611986335598903322`).setName(`Mustafa Kemal`); //Gerekli Yerleri Doldurun
            anlox4();
        }, 1600); //Hızı, Sayıyı Fazla Düşürmeyin
      });
  }
  function anlox4() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`611986335598903322`).setName(`Atatürk`); //Gerekli Yerleri Doldurun
            anlox1();
        }, 1600); //Hızı, Sayıyı Fazla Düşürmeyin
      });
  }

 client.on('ready', async message => {
   anlox1();

})


/////////7
client.on('message', async message => {
const i = await db.fetch(`prefix_${message.guild.id}`);
           
           if (message.author.bot) return
      let pref;
         
         if (i) {
          pref = i
         } else {
          pref = '/'
         }
  if (!i) { db.set(`prefix_${message.guild.id}`, '/') }

if(message.content == client.user) {
  message.reply(`Bu Sunucudaki Prefix: ${pref}`)
}
  
let mesaj = message.content.toLowerCase();
let cont = message.content.slice(pref.length).split(" ");
let args = cont.slice(1);
  let ops = {
}
}
)
client.on("message", async msg => {
  const db = require('quick.db');
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1)
};

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
    if (msg.guild.id === "264445053596991498") return;
    msg.channel.send(`${client.emojis.get(client.emoji.levelup)}Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}** seviye oldun!`)
    db.delete(`puancik_${msg.author.id + msg.guild.id}`)};
 
  if (db.has(`roll_${msg.guild.id}`) === true) {
  if (db.has(`rollss_${msg.guild.id}`) === true) {
    
 var r = db.fetch(`roll_${msg.guild.id}`)
 var s = db.fetch(`rollss_${msg.guild.id}`)
  
  if (db.fetch(`seviye_${msg.author.id + msg.guild.id}`) == s) {
    if (msg.member.roles.has(msg.guild.roles.get(r).id) === false) {
    msg.channel.send(`<@${msg.author.id}> başarıyla **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`) - 1 || 0}** seviyeyi geçtin ve **${msg.guild.roles.get(r).name}** rolünü aldın!`)
    msg.member.addRole(msg.guild.roles.get(r).id)
    }
  };
}};
  });
///////
client.emoji = {
  "tik" : "603918735774056449",
  "çarpı" : "603918780007186462",
  "ekip" : "604024865560854529",
  "bot" : "603918911565594655",
  "açık" : "604024865523236895",
  "kapalı" : "604024851921109009",
  "ayarlar" : "604028154499170314",
  "vds" : "604042197578285099",
  "sunucu" : "604048153041174647",
  "ram" : "604024853040857189",
  "yükleniyor" : "604045311446482945",
  "google_asistan" : "604024869482659841",
  "kullanıcı" : "603918578026151936",
  "islemci_64x" : "604024856098635786",
  "islemci" : "604024860418768926",
  "hesapM" : "604024419152560128",
  "konsol" : "603918987683692565",
  "kanal" : "604048670610030592",
  "java_script" : "603920079750430730",
  "not" : "604024863115575325",
  "uyarı" : "603918636243222538",
  "çan" : "604024866781397110",
  "bughunter" : "604643085472890880",
  "coder" : "604024867427450902",
  "live_support" : "604746421597634560",
  "uyarı" : "603918636243222538",
  "youtube" : "605744712334180362",
  "çağrı" : "603919843162587156",
  "reddedilmis_cagri" : "603919763848036372",
  "kullanıcı_konusma" : "606113198969585674",
  "yetkili_konusma" : "606112739974447114",
  "saat" : "603919463972339732",
  "mesaj" : "606112794793738352",
  "levelup" : "603919163794128897",
  "mavi" : "603919192424579072",
  "yesil" : "603919184857923604",
  "kırmızı" : "603919192399282206"
}

///////
client.on('message', async message => {
    if (db.has(`spen_${message.guild.id}`) === false) return;

    let sp = await db.fetch(`spamp_${message.author.id}`);
    let sk = await db.fetch(`spamk_${message.guild.id}`);
    let sb = await db.fetch(`spamb_${message.guild.id}`);
    
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    
    if (sp === 7) {
      
      const embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(`${message.member} eğer spam yapmaya devam edersen mutelerim!`)
      .setColor("RANDOM")
      message.channel.send(embed).then(msg => msg.delete(5000));
      
    }
    if (sp === 10) {
     
        message.guild.channels.forEach(async (channel, id) => {
        message.channel.overwritePermissions(message.member, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      }); 
      
      const embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(`${message.member} kullanıcısı Spam yaptığı için **5** dakika mutelendi!`)
      .setColor("RANDOM")
      message.channel.send(embed).then(msg => msg.delete(5000));
      
      const ms = require('ms');
      
      
      setTimeout(function() {
        db.delete(`spamp_${message.author.id}`)
        message.guild.channels.forEach(async (channel, id) => {
        message.channel.overwritePermissions(message.member, {
          SEND_MESSAGES: true,
          ADD_REACTIONS: true,
        });
      });
      
      }, ms('5m')) 
if (!sk) return  
      
    if (sp === sk) {
    
     const embed = new Discord.RichEmbed() 
     .setAuthor(client.user.username, client.user.avatarURL) 
     .setDescription(`${message.member} kullanıcısı **${sk}** kez spam yaptığı için sunucudan atıldı!`)
     .setColor("RANDOM")
     message.channel.send(embed)
      
     message.guild.member(message.member).kick();
    
    } 
    if (sp === sb) {
    
     const embed = new Discord.RichEmbed() 
     .setAuthor(client.user.username, client.user.avatarURL) 
     .setDescription(`${message.member} kullanıcısı **${sb}** kez spam yaptığı için sunucudan banlandı!`)
     .setColor("RANDOM")
     message.channel.send(embed)
    
      message.guild.ban(message.member, 2);
    }
}})


////////////////////////
client.on('message', async message => {
const ms = require('ms');
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
let u = message.mentions.users.first() || message.author;
if (command === "sunucu-kur") {
if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
if (!message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 10000,
errors: ['time'],
})


.then((collected) => {
message.guild.createChannel('📜│Bilgilendirme.', 'category', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])

message.guild.createChannel('📌│кυяαllαя', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('🍺│gıяıѕ-çıкıѕ', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('💥│ѕαчαç', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('📊│αикεт', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('📣│dυчυяυlαя', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));

})
.then((collected) => {
message.guild.createChannel('⚡│Ana. Kanallar.', 'category', [{
id: message.guild.id,
}]);

message.guild.createChannel(`🌺│тαvsıyε`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`🌙│σzlu-ѕσzlεя`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`📷│fσтσğяαflαя`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`🤖│вσт-кσмυтlαяı`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`💭│gεиεl-ѕσнвεт`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));

message.guild.createChannel(`✯ │ŁØRÐ. &`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
let role2 = message.guild.roles.find("name", "⍫ Kurucu 🌹");

c.overwritePermissions(role, {
CONNECT: true,
});
c.overwritePermissions(role2, {
CONNECT: true,

});
})

message.guild.createChannel('🏆 │ Yetkili Katı', 'category', [{
id: message.guild.id,
}]);

message.guild.createChannel(`💮│Kâptân. &`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
let role2 = message.guild.roles.find("name", "⍫ Kurucu 🌹");
let role3 = message.guild.roles.find("name", "⍫ Yonetici 🌹");
c.overwritePermissions(role, {
CONNECT: true,
});
c.overwritePermissions(role2, {
CONNECT: true,
});
c.overwritePermissions(role3, {
CONNECT: true,
});
})

message.guild.createChannel(`⭐│Sohbet. †`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
c.overwritePermissions(role, {
CONNECT: true,
});
})

message.guild.createChannel(`⭐│Sohbet. ††`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
c.overwritePermissions(role, {
CONNECT: true,
});
})


message.guild.createRole({
name: '✯ │ŁØRÐ. &',
color: 'ff0000',
permissions: [
"ADMINISTRATOR",
]
})


message.guild.createRole({
name: '💮│Kâptân. &',
color: '49ff00',
permissions: [
"MANAGE_GUILD",
"MANAGE_ROLES",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MANAGE_MESSAGES",
"MANAGE_NICKNAMES",
"KICK_MEMBERS"
]
})

message.guild.createRole({
name: '🍁│Yønetici. &',
color: 'ffb400',
permissions: [
"MANAGE_GUILD",
"MANAGE_ROLES",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MANAGE_MESSAGES",
"MANAGE_NICKNAMES"
]
})

message.guild.createRole({
name: '💐│Łâdiεs. &',
color: 'd300ff',
})

message.guild.createRole({
name: '🏆│Bøys. &',
color: 'ffffff',
})

message.guild.createRole({
name: '🛡 │Authorizεd. Bot. &',
color: '0006ff',
})

message.channel.send("⍫ Gerekli Roller Ve Odalar Kuruldu 🌹")

})

}
});


/////////
 
///////

/////////////////


/*client.on('guildMemberAdd'), async member => {
if (!db.has(`orol_${member.guild.id}`) === false) return;

 let rol = await db.fetch(`orol_${member.guild.id}`)
let kanal = await db.fetch(`orolk_${member.guild.id}`)

member.guild.channels.get(kanal).send(`${member} adlı kullanıcıya ${rol.name} isimli rol verildi!`)
}*/
client.on("guildMemberAdd", async member => {
  if (db.has(`orol_${member.guild.id}`) === false) return;
  
  let rol = await db.fetch(`orol_${member.guild.id}`)
  let kanal = await db.fetch(`orolk_${member.guild.id}`)
  
  member.guild.channels.get(kanal).send(`${member} adlı kullanıcıya ${member.guild.roles.get(rol).name} isimli rol verildi!`)
  
  member.addRole(rol)
})

///////
client.on('guildMemberAdd', async member => {
  let püye = await db.fetch(`panelüye_${member.guild.id}`);
  let pbot = await db.fetch(`panelbot_${member.guild.id}`);
  let pkanal = await db.fetch(`panelkanal_${member.guild.id}`);
  
  if (!püye) return
  if (!pbot) return
  if (!pkanal) return
  
  member.guild.channels.get(püye).setName(`Üye sayısı: ${member.guild.memberCount}`)
  member.guild.channels.get(pbot).setName(`Bot sayısı: ${member.guild.members.filter(m => m.user.bot).size}`)
  member.guild.channels.get(pkanal).setName(`Kanal sayısı: ${member.guild.channels.size}`)
})
client.on('guildMemberRemove', async member => {
  let püye = await db.fetch(`panelüye_${member.guild.id}`);
  let pbot = await db.fetch(`panelbot_${member.guild.id}`);
  let pkanal = await db.fetch(`panelkanal_${member.guild.id}`);
  
  if (!püye) return
  if (!pbot) return
  if (!pkanal) return
  
  member.guild.channels.get(püye).setName(`Üye sayısı: ${member.guild.memberCount}`)
  member.guild.channels.get(pbot).setName(`Bot sayısı: ${member.guild.members.filter(m => m.user.bot).size}`)
  member.guild.channels.get(pkanal).setName(`Kanal sayısı: ${member.guild.channels.size}`)
})





client.login(ayarlar.token);

