const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');

exports.run = async(client, message, args) => {
  let user = message.mentions.users.first() || message.author
  
  let seviye = await db.fetch(`puancik_${user.id + message.guild.id}`)
  if (!seviye) seviye = '0'
  
  let syazı;
  if (seviye == '0' || seviye == '2') syazı = 'Yeni'
  if (seviye == '3' || seviye == '4') syazı = 'Acemi'
  if (seviye == '5' || seviye == '6') syazı = 'Hırslı'
  if (seviye == '7' || seviye == '8') syazı = 'Uzman'
  if (seviye > '8') syazı = 'Profesyonel'
  
  let rutbe = await db.fetch(`elmasüye_${user.id}`)
  let saygınlık = await db.fetch(`profil_${user.id}.saygınlık`)
  let biyografi = await db.fetch(`profil_${user.id}.biyografi`)
  
  const canvas = Canvas.createCanvas(300, 287); // yeni güncelleme iyi oldu aw
	const ctx = canvas.getContext('2d');
  
  const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/611989193639591990/615547465591947264/anlox.jpg');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  /*ctx.fillStyle = `#ffffff`;
	ctx.font = `25px "Warsaw"`;
	ctx.textAlign = "left";
	ctx.fillText(`${user.username}`, 190, 130);*/
  
  ctx.fillStyle = `#ffffff`;
	ctx.font = `15px "Warsaw"`;
	ctx.textAlign = "left";
	ctx.fillText(`${saygınlık || "0"}`, 210, 185);
  
  ctx.fillStyle = `#ffffff`;
	ctx.font = `15px "Warsaw"`;
	ctx.textAlign = "left";
	ctx.fillText(`${syazı}`, 210, 218);
  
  ctx.fillStyle = `#ffffff`;
	ctx.font = `15px "Warsaw"`;
	ctx.textAlign = "left";
	ctx.fillText(`${rutbe || "Kullanıcı"}`, 207, 247);
  
  ctx.fillStyle = `#ffffff`;
	ctx.font = `15px "Warsaw"`;
	ctx.textAlign = "left";
	ctx.fillText(`${biyografi || "?"}`, 77, 265);
  
  let avatarURL = user.avatarURL || user.defaultAvatarURL
  const { body } = await request.get(avatarURL);
	const avatar = await Canvas.loadImage(body);
  
  ctx.beginPath();
	ctx.lineWidth = 8;
  ctx.fill()
	ctx.lineWidth = 8;
	ctx.arc(20 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
	ctx.clip();
	ctx.drawImage(avatar, 20, 55, 110, 110);
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'Avcı_Profil.png');
  message.channel.send(`:notepad_spiral: ${user} adlı Kullanıcının Profil Bilgisi`, attachment)
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLvl: 0,
  kategori: 'Profil'
};

exports.help = {
  name: "profil",
  description: "Profil bilgilerinizi görüntülersiniz.",
  usage: "profil"
};
