const db = require('quick.db')

exports.run = async (bot, message, args) => {
  let id = args[0]
  if(!id) return message.channel.send('Bir ID yazmalısın.')
  db.set(`karaliste_${id}`, 'aktif')
  message.channel.send('Kullanıcı kara listeye alındı')
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['blacklist'],
  permLevel: 4
};
exports.help = {
  name: 'karaliste',
  description: 'Bir kullanıcıyı kara listeye alır.',
  usage: 'Çalıp Paylaşmayın AMK'
};
