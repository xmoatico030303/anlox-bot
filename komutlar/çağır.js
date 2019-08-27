const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async(client, message, args, guild) => {
     if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0x2488E7)
    .setTimestamp()
    .setDescription('Bu komutu `özel mesajlar`da kullanamazsınız. ')
    return message.author.sendEmbed(ozelmesajuyari); }
  
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bunun için gerekli iznin yok');

    if(args[0] == 'sıfırla') {
        if (message.author.id !== '446048541488578569') return message.channel.send(`Bunu Sadece Sahibim Kullanabilir`)
    db.delete(`sahip1_${message.guild.id}`)
    db.delete(`sahipsil_${message.guild.id}`)
    message.channel.send('Bu sunucu artık tekrar davet edebilir.')
  };
    if(args[0] == 'sil') {
    let sistem = db.fetch(`sahipsil_${message.guild.id}`)
    if(sistem == 'silindi') return message.channel.send('Daha davet etmemişsiniz.');
  message.channel.send(`Davet isteğinizi silmek istediğine emin misin?\nSilecekseniz **evet** yazınız.\n**10** saniyeniz var.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
                max: 1,
        time: 10000,
        errors: ['time'],
      }).then(() => {
        db.delete(`sahip1_${message.guild.id}`)
         let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`\`\`${message.guild.name}\`\` Sunucusundan \`\`${message.guild.owner.user.tag}\`\``)
    .setDescription('`Davet isteğini geri çekti.`');
         client.channels.get('611989191622000654').send(embed);
        message.channel.send('Davet isteğiniz geri alınmıştır')
        db.set(`sahipsil_${message.guild.id}`,'silindi')
  
});
};
  let sebep = args.slice(0).join(' ')
  let sistem = await db.fetch(`sahip1_${message.guild.id}`)
  if(sistem) {
    if(args[0] == 'sıfırla') return;
    if(args[0] == 'sil') return;
    message.channel.send('Sahibimi daha önceden zaten davet etmişsiniz.\nSunucuna gelmesini bekle.\nGelince çağırma hakkını yeniler.')
  };
  if(!sebep){
    if(sistem) return;
    message.channel.send('Sahibimi ne için davet ediyorsun ? **"/çağır (sebep)"**')
  };
  let msg = message
  if(sebep) {
    if(args[0] == 'sil') return;
   message.channel.send(`Sahibimi Sunucuya Davet Edeyim mi ?\nEdecekseniz **evet** yazınız.\n**10** saniyeniz var.\nDavet isteğinizi daha sonra **"/çağır sil"** ile iptal edebilirsiniz.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
                max: 1,
        time: 10000,
        errors: ['time'],
      }).then(() => {

  msg.channel.createInvite({maxAge: 0}).then(invite => {
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`\`\`${message.guild.name}\`\` Sunucusundan \`\`${message.guild.owner.user.tag}\`\``)
    .addField('**Sebep**',`${sebep}`)
    .setDescription(`\`Seni Sunucusuna Davet Ediyor\`\n**Bu Sunucunun Davet Linki**: ${invite}`);
   client.channels.get('611989191622000654').send(embed);
  message.channel.sendMessage('Sahibim Sunucuya Davet Edildi.')
    db.set(`sahip1_${message.guild.id}`, 'edildi')
     db.delete(`sahipsil_${message.guild.id}`)
  });
      });
  };

  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'çağır',
  description: 'Bir kullanıcıyı kara listeden çıkartır.',
  usage: 'Çalıp Paylaşmayın AMK'
};