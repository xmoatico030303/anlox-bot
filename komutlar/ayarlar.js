const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args, member, guild) => {
let p = await db.fetch(`prefix_${message.guild.id}`) || '!'
let arg = args.slice(0).join(' ');
const tik = client.emojis.get('548865650454560769');
const çarpı = client.emojis.get('548865604652892160');
const bilgi = client.emojis.get('556475622617251840');
const ayarlar2 = client.emojis.get('557665634482257950');
const yapimda = client.emojis.get('548944381043015723');
//Küfür Filtresi
let kufurfiltre = await db.fetch(`kufur_${message.guild.id}`)
let kufurYazi;
if (kufurfiltre == null) kufurYazi = `${çarpı} ${p}küfür-engel`
if (kufurfiltre == 'Aktif') kufurYazi = `${tik}`
if (kufurfiltre == 'Deaktif') kufurYazi = `${çarpı} ${p}küfür-engel`
//Reklam Filtresi
let reklamm = await db.fetch(`reklam_${message.guild.id}`)
let reklam;
if (reklamm == null) reklam = `${çarpı} ${p}reklam-engel`
if (reklamm == 'Aktif') reklam = `${tik}`
if (reklamm == 'Deaktif') reklam = `${çarpı} ${p}reklam-engel`
//Capslock Filtresi
let capps = await db.fetch(`capsE_${message.guild.id}`)
let caps;
if (capps == null) caps =`${çarpı} ${p}caps-engel`
if (capps == 'Aktif') caps = `${tik}`
if (capps == 'Deaktif') caps `${çarpı} ${p}caps-engel`

//Everyone Filtresi
let eve = await db.fetch(`ever_${message.guild.id}`)
let ever;
if (eve== null) ever = `${çarpı} ${p}everyone-engel`
if (eve == 'Aktif') ever = `${tik}`
if (eve == 'Deaktif') ever = `${çarpı} ${p}everyone-engel`
//Spam-engel
let sp = await db.fetch(`spen_${message.guild.id}`)
let sps;
if (sp == null) sps = `${çarpı} ${p}spam-engel`
if (sp == 'acik') sps = `${tik}`
if (sp == 'kapali') sps = `${çarpı} ${p}spam-engel`
//Otorol
let rol = await db.fetch(`otorol_${message.guild.id}`)
let ot;
if (rol == null) ot = `${çarpı} ${p}otorol`
else ot = `<@&${rol}>`
//Log Kanalı
let mod = await db.fetch(`modlogK_${message.guild.id}`)
let modl;
if (mod == null) modl = `${çarpı} ${p}log-ayarla`
else modl = `<#${mod}>`
//sayaç
let sayacs = await db.fetch(`sayacs_${message.guild.id}`)
let ss;
if (sayacs == null) ss = `${çarpı} ${p}sayaç`
else ss = `${sayacs}`
//sayaç kanal
let sayac = await db.fetch(`sayac_${message.guild.id}`)
let sk;
if (sayac == null) sk = `${çarpı} ${p}sayaç`
else sk = `<#${sayac}>`
//Hg-BB 
let rgç = await db.fetch(`gckanal_${message.guild.id}`)
let rgç2;
if(rgç == null) rgç2 = `${çarpı} ${p}hg-bb-ayarla`
else rgç2 = `<#${rgç}>`
//Otorol Kanal
let otok = await db.fetch(`otorolkanal_${message.guild.id}`)
let otok2;
if(otok == null) otok2 = `${çarpı} ${p}otorol`
else otok2 = `<#${otok}>`
//Prefix
let prefix = await db.fetch(`prefix_${message.guild.id}`)
let pref;
if (prefix == null) pref = `${bilgi} Varsayılan !`
else pref = `\`${prefix}\``
// Güvenlik
let güvenlik = await db.fetch(`güvenlik_${message.guild.id}`)
let gk;
if (güvenlik == null) gk = `${çarpı} ${p}güvenlik-kanal-ayarla`
else gk = `<#${güvenlik}>`
// Giriş-Çıkış
let gç = await db.fetch(`mesajk_${message.guild.id}`)
let gç2;
if (gç == null) gç2 = `${çarpı} ${p}giriş-çıkış-ayarla`
else gç2 = `<#${gç}>`
// Davet Kanalı
let dk = await db.fetch(`davetChannel_${message.guild.id}`)
let dk2;
if(dk == null) dk2 = `${çarpı} ${p}davet-kanal-ayarla`
else dk2 = `<#${dk}>`
let tagknl = await db.fetch(`tagKanal_${message.guild.id}`)
let tgknl;
if (tagknl == null) tgknl = `${çarpı} ${p}tag`
else tgknl = (`<#${tagknl}>`)
let tag = await db.fetch(`tag_${message.guild.id}`)
let tg;
if (tag == null) tg = `${çarpı} ${p}tag`
else tg = `${tag}`
//seviye mesaj
let seviyemesaj = await db.fetch(`seviyeMesaj_${message.guild.id}`)
let sm;
if (seviyemesaj == null) sm = `${çarpı} ${p}seviye-mesaj`
if (seviyemesaj == 'Aktif') sm = `${tik}`
if (seviyemesaj == 'Deaktif') sm = `${çarpı} ${p}seviye-mesaj`
// Seviye mesaj tipi
let seviyemtipi = await db.fetch(`seviyeMesajTipi_${message.guild.id}`)
let smt;
if (seviyemtipi == null) smt = `${yapimda}`
if (seviyemtipi == 'Dm') smt = `${yapimda}`
if (seviyemtipi == 'Kanal') smt = `${yapimda}`
// Selam Sistemi
let selam = await db.fetch(`selam_${message.guild.id}`)
let slm;
if (selam == null) slm = `${çarpı} ${p}selam-filtre`
if (selam == 'Aktif') slm = `${tik}`
if (selam == 'Deaktif') slm = `${çarpı} ${p}selam-filtre`
///////////////////////////
const ayarlar = new Discord.RichEmbed()
.setColor("0x36393e")
.setAuthor(`${message.guild.name} || Sunucu Ayarları`, `https://cdn.discordapp.com/emojis/557665634482257950.png?v=1`)        
.setDescription(`Bot panelden de yönetilmekte, panele gitmek için [bana](https://panel.gtrbot.cf/)\ tıkla\nAyarları kapatmak için ${p}sıfırla ayarisim`)
.addField('Sunucuya Ait ön-ek/prefix', pref, true)
.addField('Küfür Engel', kufurYazi, true)
.addField('Reklam Engel', reklam, true) 
.addField('Everyone Engel', ever, true)
.addField('Capslock Engel', caps, true)
.addField('Spam Engel', sp, true)
.addField('Selam Filtre', slm,true)
.addField('Seviye Mesaj', sm, true)
.addField('Seviye Mesaj Tipi', smt, true)
.addField('Otorol', ot, true)
.addField('Sayaç', ss, true)
.addField('Tag', tg, true)
.addField('Sayaç Kanalı', sk, true)
.addField('Hg Bb Kanalı', rgç2, true)
.addField('Giriş-Çıkış Kanalı', gç2, true)
.addField('Otorol Kanalı', otok2, true)
.addField('Log Kanalı', modl, true)
.addField('Güvenlik Kanalı', gk, true)
//.addField('Davet Kanalı', dk2, true)
.addField('Tag Kanalı', tgknl, true)
.setFooter(`${message.author.username + '#' + message.author.discriminator} tarafından istendi`)
message.channel.send(ayarlar)

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 1,
  kategori: `Sunucu`
};

exports.help = {
  name: 'ayarlar',
  description: 'Sunucunun ayarlarını gösterir.',
  usage: 'ayarlar genel/kanal'
};