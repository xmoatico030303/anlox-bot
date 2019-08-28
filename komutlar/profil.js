

const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');

//Canvas.registerFont('./warsawgothicext.otf', { family: 'Warsaw' })

exports.run = async(client, message, args) => {
  
  let user = message.mentions.users.first() || message.author
  
  let para = await db.fetch(`paracık_${user.id}`)
  if (!para) para = '0'
  
  let seviye = await db.fetch(`seviye_${user.id + message.guild.id}`)
  if (!seviye) seviye = '0'
  
  let syazı;
  if (seviye == '0' || seviye == '2') syazı = 'Yeni'
  if (seviye == '3' || seviye == '4') syazı = 'Acemi'
  if (seviye == '5' || seviye == '6') syazı = 'Hırslı'
  if (seviye == '7' || seviye == '8') syazı = 'Uzman'
  if (seviye > '8') syazı = 'Profesyonel'
  
  const canvas = Canvas.createCanvas(300, 287);
    const ctx = canvas.getContext('2d');
  
  const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/541293085036904470/541710383317123097/FrezzyProfil.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = `#ffffff`;
    ctx.font = `25px "Warsaw"`;
    ctx.textAlign = "left";
    ctx.fillText(`${user.username}`, 140, 110);
  
  ctx.fillStyle = `#ffffff`;
    ctx.font = `25px "Warsaw"`;
    ctx.textAlign = "left";
    ctx.fillText(`${para}`, 195, 193);
  
  ctx.fillStyle = `#ffffff`;
    ctx.font = `25px "Warsaw"`;
    ctx.textAlign = "left";
    ctx.fillText(`${syazı}`, 200, 217);
  
  ctx.fillStyle = `#ffffff`;
    ctx.font = `25px "Warsaw"`;
    ctx.textAlign = "left";
    ctx.fillText(`${seviye}`, 207, 238);
  
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
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'FrezzyProfil.png');
  message.channel.send(`${user} işte **paran!**`, attachment)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "ekonomi"
};

exports.help = {
  name: "profil",
  description: "",
  usage: ""
};

