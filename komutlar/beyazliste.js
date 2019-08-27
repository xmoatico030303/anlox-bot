const db = require('quick.db')

exports.run = async (bot, message, args) => {
  
  let id = args[0]
  if (!id) return message.channel.send('Bir ID yazmalısın.')
  db.delete(`karaliste_${id}`)
  message.channel.send('✅ | Kullanıcı Karalisteden Alındı')
                        
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['karalistekaldır'],
  permLevel: 4
};
exports.help = {
  name: 'beyazliste',
  description: 'Bir kullanıcıyı kara listeden çıkartır.',
  usage: 'Çalıp Paylaşmayın AMK'
};
