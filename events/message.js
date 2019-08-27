const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

module.exports = async message => {
  
  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length)
  let params = message.content.split(' ').slice(1)
  let perms = client.elevation(message);
  let cmd;
  let kanal = await db.fetch(`botuncalismamakanali_${message.channel.id}`)
  let karaliste = await db.fetch(`karaliste_${message.author.id}`)
  
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
  
  if (!cmd) return;
  
  if (kanal == null) {
    if (karaliste == 'aktif') return message.channel.send('Sen bu komutu kullanamazsın çünkü karalistedesin.')
    if (cmd) {
      if (perms < cmd.conf.permLevel) return;
      message.channel.startTyping()
      cmd.run(client, message, params, perms)
      message.channel.stopTyping()
    }
  }
  if (kanal == 'calismiyor') {
    if (cmd.help.name == "çalışmakanal") {
      if (karaliste == 'aktif') return message.channel.send('Sen bu komutu kullanamazsın çünkü karalistedesin.')
      cmd.run(client, message, params, perms)
      return;
    }
    if (cmd) return;
  }
};