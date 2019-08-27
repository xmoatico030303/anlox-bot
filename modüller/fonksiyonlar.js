 const Discord = require('discord.js');
const db = require('quick.db');
const fs = require("fs");
module.exports = (client, clientt) => {

client.panel = {};

    client.customCmds = (id, cmd) => {
    
    let komut = cmd['komut']
    let aciklama = cmd['aciklama']
    
    var array = []
	  var kontrol2 = []
    let komutlar = client.cmdd
    
    if(komutlar[id]) {
		for (var i = 0; i < Object.keys(komutlar[id]).length; i++) {
			if(komut === Object.keys(komutlar[id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${aciklama}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${komutlar[id][i][Object.keys(komutlar[id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[id][i])[0].toString())
		}
		if(!kontrol2.includes(komut)) {
			array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
			komutlar[id] = array

			fs.writeFile("../komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		} else {
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		}
	} else {
		array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
		komutlar[id] = array

		fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		return
	}
    
  };
  
  
client.panel.ayarlarKaydetKullanici = (kullaniciID, kullanici, yeniAyar, req, res) => {
if (yeniAyar['renk']) {
db.set(`${kullanici.id}.renk`, yeniAyar['renk'])
}

if (yeniAyar['resim']) {
db.set(`${kullanici.id}.resim`, yeniAyar['resim'])
}
};
  

    client.writeSettings = (id, newSettings) => {
    
    if (!client.guilds.get(id)) return
    
    try {
      
      
      
if (newSettings['küfürEngel'] === 'Aktif') {
db.set(`kufur_${id}`, newSettings['küfürEngel'])
}
if (!newSettings['küfürEngel']) {
db.delete(`kufur_${id}`)
}
if (newSettings['linkEngel'] === 'Aktif') {
db.set(`reklam_${id}`, newSettings['linkEngel'])
}
if (!newSettings['linkEngel']) {
db.delete(`reklam_${id}`)
}
if (newSettings['capslockEngel'] === 'Aktif') {
db.set(`capsE_${id}`, newSettings['capslockEngel'])
}
if (!newSettings['capslockEngel']) {
db.delete(`capsE_${id}`)
}   
if (newSettings['guvEn']) {
db.set(`güvenlik_${id}`, newSettings['guvEn'])
}
if (newSettings['tgknl']) {
db.set(`tagKanal_${id}`, newSettings['tgknl'])
}
if (newSettings['hgbb']) {
db.set(`gckanal_${id}`, newSettings['hgbb'])
}
if (newSettings['otorol']) {
db.set(`otorol_${id}`, newSettings['otorol'])
}
      
if (newSettings['otoRK']) {
db.set(`otorolkanal_${id}`, newSettings['otoRK'])   
}

      
 if (newSettings['otoTag']) {
db.set(`tag_${id}`, newSettings['otoTag'])   
}
 if (newSettings['prefix']) {
db.set(`prefix_${id}`, newSettings['prefix'])
}
if (newSettings['sRol']) {
db.set(`sRol_${id}`, newSettings['sRol'])
}
if (newSettings['girisCikis']) {
db.set(`gc_${id}`, newSettings['girisCikis'])   
}
if (newSettings['girisM']) {
db.set(`gmesaj_${id}`, newSettings['girisM']);
}
if (newSettings['cikisM']) {
db.set(`cmesaj_${id}`, newSettings['cikisM']);
}
if (newSettings['gc']) {
db.set(`mesajk_${id}`, newSettings['gc']);
}
if (newSettings['destekK']) {
db.set(`destekK_${id}`, newSettings['destekK']);
}
if (newSettings['destekR']) {
db.set(`destekR_${id}`, newSettings['destekR']);
}
if (newSettings['sayacKanal']) {
db.set(`sayacK_${id}`, newSettings['sayacKanal']);
}
if (newSettings['sayac']) {
db.set(`sayac_${id}`, newSettings['sayac']);
}
if (newSettings['dkanal']) {
db.set(`davetChannel_${id}`, newSettings['dkanal']);
}
  
     } catch (err) {
      //console.error(err)
    };
        }; 


String.prototype.toProperCase = function() {
return this.charAt(0).toUpperCase() + this.slice(1); 
};

Array.prototype.random = function() {
return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
console.error("Uncaught Exception: ", errorMsg);

process.exit(1);
});
};