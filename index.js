const Discord = require('discord.js');
const config = require("./config.json");
const puppeteer = require('puppeteer');
const request = require('request-promise');
const cheerio = require('cheerio');
let yturl = "https://www.youtube.com/c/VisionExBeats";

let hirdetes;
let inf = "[**Info**]: ";

const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,

    },
    intents: [ "DIRECT_MESSAGES","DIRECT_MESSAGE_REACTIONS","GUILD_EMOJIS_AND_STICKERS","GUILD_MESSAGE_REACTIONS","GUILD_WEBHOOKS","GUILD_INTEGRATIONS","GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"],
    partials: ["MESSAGE","CHANNEL","REACTION","GUILD_MEMBER"]
});



client.on("ready", () => {
    console.log("⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿");
    console.log("[Ragnaros]: A bot funkcióinak betöltése...");
    console.log("⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿");
    console.log("[Info]: A " + client.user.tag + " bot beléptetése sikeres volt.");
    console.log("⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿");
    client.user.setActivity("World of Warcraft", {type: "PLAYING"});

    console.log("[Info]: A Bot Leírásának és Állapotának beállítása megtörtént.");
    console.log("⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿");
})

client.on('messageCreate', async message => {
    const msg = message.content.toLowerCase();

   /* if(msg === 'sziasztok' || msg === 'hali' || msg === 'szia' || msg === 'jó reggelt' || msg === 'csáó') 
    {
        message.channel.send('Szia!');
    }
*/
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();




    if( command && command.length > 0 ) {
        switch(command) 
        {

            case "helppppppppppppp":    {
                const embed = new Discord.MessageEmbed()
                .setColor("#FFA500")
                .setTitle("[Ragnaros Realm]")
                .setDescription(`[Információ]: Segítség menü. \n*Jelenlegi Prefix:*  ***` +config.prefix + `***\n\n**Parancsok:**\n`)
                .setThumbnail(client.user.displayAvatarURL())
                .addFields([
                    {name: `help`, value: `> Segítség menüpont`, inline: true},
                    {name: `start`, value: `> A játék kezdés`, inline: true},
                    {name: `hunt`, value: `> Vadászat indítás`, inline: true},
                    {name: `dungeon`, value: `> Kazamata indítás`, inline: true},
                    {name: `quest start`, value: `> Új küldetés felvétel`, inline: true},
                    {name: `quest stop`, value: `> Küldetés törlés`, inline: true},
                    {name: `quest prog`, value: `> Jelenlegi küldetés helyzete`, inline: true}
                ])
                .setFooter(message.guild.name, message.guild.iconURL({dynmaic: true}));
                message.reply({
                    embeds: [embed]
                }).catch(console.error);

                
            }
            break;

            case "c":    {
                let karakter = args[0];
                scrapeProduct('https://worldofwarcraft.com/en-gb/character/eu/ragnaros/'+ args[0]);
                async function scrapeProduct(url) {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto(url);
                
                    const [el1] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/a[2]/div/div[2]')
                    const src1 = await el1.getProperty('textContent');
                    const srcTxt1 = await src1.jsonValue();

                    const [el2] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/a[1]/div/div[2]')
                    const src2 = await el2.getProperty('textContent');
                    const srcTxt2 = await src2.jsonValue();
                    
                    const [el3] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/a[3]/span/div/div[2]')
                    
                    let mythic = "0";

                    if (typeof el3 !== 'undefined') 
                    {
                        const src3 = await el3.getProperty('textContent');
                        const srcTxt3 = await src3.jsonValue();
                        mythic = srcTxt3;
                    } 
                    
                    //*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[3]/div/a/span/div/div[2]/div

                    const [el4] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[1]/div/a/span/div/div[2]/span')
                    const src4 = await el4.getProperty('textContent');
                    const srcTxt4 = await src4.jsonValue();
                    


                    //Mana, Rage stb.
                    const [el5] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[2]/div/a/span/div/div[2]/span')
                    const src5 = await el5.getProperty('textContent');
                    const srcTxt5 = await src5.jsonValue();

                    const [check1] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[2]/div/a/span/div/div[2]/div')
                    const srcc1 = await check1.getProperty('textContent');
                    const srccTxt1 = await srcc1.jsonValue();
                    
                    let firstStat;
                    let secondStat;
                    
                    
                    if(srccTxt1 === "Rage") {

                        firstStat = "> 🤬 ʀᴀɢᴇ: ";

                    } else if(srccTxt1 === "Mana") {

                        firstStat = "> ⚗️ ᴍᴘ: ";

                    } else if(srccTxt1 === "Fury") {
                        
                        firstStat = "> 💫 ꜰᴜʀʏ: ";

                    } else if(srccTxt1 === "Focus") {
                        
                        firstStat = "> 👀 ꜰᴏᴄᴜꜱ: ";

                    } else if(srccTxt1 === "Energy") {
                        
                        firstStat = "> ⚡️ ᴇɴᴇʀɢʏ: ";

                    }
                    
//>  
                    
                    const [el6] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[4]/div/a/span/div/div[2]/span')
                    const src6 = await el6.getProperty('textContent');
                    const srcTxt6 = await src6.jsonValue();



                    //Strength, Agility stb
                    const [el7] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[3]/div/a/span/div/div[2]/span')
                    const src7 = await el7.getProperty('textContent');
                    const srcTxt7 = await src7.jsonValue();

                    const [check2] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[3]/div/a/span/div/div[2]/div')
                    const srcc2 = await check2.getProperty('textContent');
                    const srccTxt2 = await srcc2.jsonValue();
                    
                    if(srccTxt2 === "Intellect") {

                        secondStat = "> 💡 ɪɴᴛ:";

                    } else if(srccTxt2 === "Agility") {

                        secondStat = "> 🐎 ᴀɢɪʟɪᴛʏ: ";

                    } else if(srccTxt2 === "Strength") {
                        
                        secondStat = "> 💪 ꜱᴛʀ: ";

                    } 





                    const [el8] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[5]/div/a/span/div/div[2]/span')
                    const src8 = await el8.getProperty('textContent');
                    const srcTxt8 = await src8.jsonValue();

                    const [el9] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[6]/div/a/span/div/div[2]/span')
                    const src9 = await el9.getProperty('textContent');
                    const srcTxt9 = await src9.jsonValue();

                    const [el10] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[7]/div/a/span/div/div[2]/span')
                    const src10 = await el10.getProperty('textContent');
                    const srcTxt10 = await src10.jsonValue();

                    const [el11] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[3]/div[8]/div/a/span/div/div[2]/span')
                    const src11 = await el11.getProperty('textContent');
                    const srcTxt11 = await src11.jsonValue();
                    
                    const [el12] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[2]/div[5]/div[2]/div/div/div[1]/div[1]')
                    const src12 = await el12.getProperty('textContent');
                    const srcTxt12 = await src12.jsonValue();
                    let spec = srcTxt12.replace(" Talents", "");
                    
                    const [el13] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[2]/div[1]/span[1] ')
                    const src13 = await el13.getProperty('textContent');
                    const srcTxt13 = await src13.jsonValue();

                    const [el14] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[2]/div[1]/span[3]')
                    const src14 = await el14.getProperty('textContent');
                    const srcTxt14 = await src14.jsonValue();

                    const [el15] = await page.$x('//*[@id="character-profile-mount"]/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[2]/div[1]/span[2]')
                    const src15 = await el15.getProperty('textContent');
                    const srcTxt15 = await src15.jsonValue();

                    

                    browser.close();
                   
                    

                    const embed = new Discord.MessageEmbed()
                    .setColor("#FFA500")
                    .setTitle("[Karakter Információk]:")
                    .setDescription(`\nNév: **`+karakter+`** \n` + srcTxt13 +`-s szintű ` + srcTxt15 +` `+ srcTxt14 + `\n`)
                    //.setThumbnail(client.user.displayAvatarURL())
                    .addFields([
                        {name: `▁ ▂ ▄ ▅ ▆ ▇ █ 🥋 ᴋᴀʀᴀᴋᴛᴇʀ 🥋 █ ▇ ▆ ▅ ▄ ▂ ▁`, value: "‎\n\n", inline: false},
                        {name: `> 📖 ɪᴛᴇᴍ ʟᴇᴠᴇʟ:`, value: `  `+srcTxt1, inline: true},
                        {name: `> 🏆 ᴀᴄʜɪ. ᴘᴏɴᴛᴏᴋ:`, value: `  `+srcTxt2, inline: true},
                        {name: `> ⚔️ ᴍʏᴛʜɪᴄ+ ʀᴀᴛɪɴɢ:`, value: `  `+mythic, inline: true},
                        {name: `▁ ▂ ▄ ▅ ▆ ▇ █ 💎 ꜱᴛᴀᴛᴏᴋ 💎 █ ▇ ▆ ▅ ▄ ▂ ▁`, value: "‎\n\n", inline: false},
                        {name: `> 💖 ʜᴘ: `, value: " "+srcTxt4, inline: true},
                        {name: ``+firstStat, value: " " + srcTxt5, inline: true},
                        {name: `> 🧫 ꜱᴛᴀᴍɪɴᴀ: `, value: " "+srcTxt6, inline: true},
                        {name: ``+secondStat, value: " "+srcTxt7, inline: true},
                        {name: `> 💢 ᴄʀɪᴛɪᴄᴀʟ: `, value: ""+srcTxt8, inline: true},
                        {name: `> ⏰ ʜᴀꜱᴛᴇ: `, value: " "+srcTxt9, inline: true},
                        {name: `> 〽️ ᴍᴀꜱᴛᴇʀʏ: `, value: " "+srcTxt10, inline: true},
                        {name: `> 💀 ᴠᴇʀꜱᴀ: `, value: " "+srcTxt11, inline: true},
                        {name: `> 🎯 ᴛᴀʟᴇɴᴛ: `, value: "**"+spec+"**", inline: true}
                    ])

                    .setFooter("ʀᴀɢɴᴀʀᴏꜱ ᴄʜᴀʀᴀᴄᴛᴇʀ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ ʙᴏᴛ ʙʏ: 🆅🅸🆂🅸🅾🅽🅴🆇", message.guild.iconURL({dynmaic: true}));
                    message.reply({
                        embeds: [embed]
                    })

                    


                }


            }
            break;

            case "54654654654456":    {

            }
            break;
            
            default: {
                message.reply(`[**Ragnaros**]: Hibás vagy nem létező parancs. Kérlek próbáld újra.`);
            }
            break;
        }
    }

/*   
   if(command === 'timer') 
   {
    var currentTime = new Date(); 
    var hours = currentTime.getHours(); 
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

        message.channel.send('[World of Szarcraft]: Időzítő bekapcsolva.');
        message.channel.send("[World of Szarcraft]: !")
        message.channel.send("[World of Szarcraft]: " + hours + ":" + minutes + ":" + seconds);

        hirdetes = setInterval(function uzenet() 
        {
            currentTime = new Date(); 
            hours = currentTime.getHours(); 
            minutes = currentTime.getMinutes();
            seconds = currentTime.getSeconds();

            message.channel.send("[World of Szarcraft]: Ez egy teszt hírdetés fél percenként!")
            message.channel.send("[World of Szarcraft]: " + hours + ":" + minutes + ":" + seconds);
        }, 
        config.sendTimer);

   }
   if(command === 'timeroff') {
    clearTimeout(hirdetes);
    message.channel.send('[World of Szarcraft]: Időzítő eltörölve.')
   }
   */

})





client.login(config.token);
    