 const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
   let pre = args.slice(0).join(' ');
      if (!pre[0]) {
       msg.channel.send(`${client.emojis.get(client.emoji.çarpı)} Lütfen \`katıl\` veya \`ayrıl\` **yazın!**`)
  }
   
       if (pre === 'ayrıl') {
         
          client.emit('guildMemberRemove', msg.member || await msg.guild.fetchMember(msg.author));
         msg.channel.send('Başarılı!')
         
       }
       
  if (pre === 'katıl') {
    
     client.emit('guildMemberAdd', msg.member || await msg.guild.fetchMember(msg.author));
    msg.channel.send('Başarılı!')
  
 
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLvl: 4,
  kategori: "Geliştirici"
};

exports.help = {
  name: 'sahte',
  description: 'Sunucuya katılmaları/ayrılmaları simüle eder.',
  usage: 'sahte'
};
 