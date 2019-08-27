const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
    var rol = message.guild.roles.find(e => e.name === `Sustur`);
    var etiket = message.mentions.members.first()
    if (!etiket) return message.channel.send('Hangi kullanıcıyı susturma mı istersin ?')
    if(message.member.roles.has(rol)) return message.channel.send("Adlı kişi susturulmuş gözüküyor.");
    if(!rol){
        rol = await message.guild.createRole({
        name: `Sustur`,
        color: "ORANGE" 
        })
    }

    message.guild.channels.forEach((channel, id) => {
         channel.overwritePermissions(rol, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false
            });
          });
   
    etiket.addRole(rol)
    
    await etiket.addRole(rol)
    message.channel.send(`Susturma işlemi başarılı **${etiket.displayName}** `)
  }

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['sustur'],
 permLevel: 3,
  kategori:'ayarlar'
  
};

exports.help = {
 name: 'mute',
 description: 'Belirlediğiniz Kişiyi Susturur',
 usage: ''
}