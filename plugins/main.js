const { cmd } = require("../command");
const config = require('../config');

cmd(
  {
    pattern: "menu",
    react: "⚙️",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const menuText =
`╭━━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━━╮
┃    💠 *Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ*      ┃
┃━━━━━━━━━━━━━━━━━━━✦
│
├─ 1️⃣ 📥 *DOWNLOAD MENU*
├─ 2️⃣ 🎨 *LOGO MENU*
├─ 3️⃣ 👥 *GROUP MENU*
├─ 4️⃣ 🔍 *SEARCH MENU*
├─ 5️⃣ 🛠️ *SYSTEM MENU*
├─ 6️⃣ 📂 *OTHER MENU*
├─ 7️⃣ 👑 *OWNER MENU*
│
╰➤ 💡 Reply with a number (1-7) to get menu!
╭━━━━━━━━━━━━━━━━━━━✦
┃ ⚙️ Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`.trim();

      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/main-menu.png?raw=true";

      await rush.sendMessage(from, {
        image: { url: imageUrl },
        caption: menuText,
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error generating menu.");
    }
  }
);

cmd(
  {
    filter: (text, data) => {
      if (!text) return false;
      const num = text.trim();
      const validNumbers = ["1", "2", "3", "4", "5", "6", "7"];
      
      const isReply = data.message?.message?.extendedTextMessage?.contextInfo?.stanzaId;
      
      return Boolean(isReply && validNumbers.includes(num));
    }
  },
  async (rush, mek, m, { from, reply, body }) => {
    try {
      const choice = body.trim();
      let subMenuText = "";
      let imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true";
      let reaction = "";

      switch (choice) {
        case "1":
          reaction = "📥";
          subMenuText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    💠 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 - 𝗠𝗘𝗡𝗨   ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤🎶 *SONG* - Type: .song
╰➤🎼 *TIK TOK* - Type: .tt
╰➤📼 *YOUTUBE* - Type: .yt
╰➤📘 *FACEBOOK* - Type: .fb
╰➤📍 *APK* - Type: .apk
╰➤🖼️ *WALLPAPER* - Type: .wp
╰➤📌 *PINTEREST* - Type: .pin
╭━━━━━━━━━━━━━━━━━✦
┃    📥Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
          break;

        case "2":
          reaction = "🎨";
          subMenuText = 
`╭━━━ ⚡  ${config.BOT_NAME} ⚡ ━━━╮
┃  💠 𝗟𝗢𝗚𝗢 - 𝗠𝗘𝗡𝗨               ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤🎨*Naruto* - Type: .naruto
╰➤🎨*Dragonball* - Type: .dragonball
╰➤🎨*Onepiece* - Type: .onepiece
╰➤🎨*3DComic* - Type: .3dcomic
╰➤🎨*Marvel* - Type: .marvel
╰➤🎨*Deadpool* - Type: .deadpool
╰➤🎨*Blackpink* - Type: .blackpink
╰➤🎨*Neon* - Type: .neon
╰➤🎨*Glitch* - Type: .glitch
╰➤🎨*Rainbow* - Type: .rainbow
╰➤🎨*Glass* - Type: .glass
╰➤🎨*Neon Glass* - Type: .neonglass
╰➤🎨*Gold* - Type: .gold
╰➤🎨*Silver* - Type: .silver
╰➤🎨*Diamond* - Type: .diamond
╰➤🎨*Fire* - Type: .fire
╰➤🎨*Water* - Type: .water
╰➤🎨*Smoke* - Type: .smoke
╰➤🎨*Ice* - Type: .ice
╰➤🎨*Crystal* - Type: .crystal
╰➤🎨*Luxury* - Type: .luxury
╰➤🎨*Modern* - Type: .modern
╰➤🎨*Christmas* - Type: .christmas
╰➤🎨*Halloween* - Type: .halloween
╰➤🎨*Graffiti* - Type: .graffiti
╰➤🎨*Sand* - Type: .sand
╰➤🎨*Sky* - Type: .sky
╰➤🎨*Space* - Type: .space
╭━━━━━━━━━━━━━━━━━✦
┃  📥Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
          break;

        case "3":
          reaction = "👥";
          subMenuText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃  👥 𝗚𝗥𝗢𝗨𝗣 - 𝗠𝗘𝗡𝗨            ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤👢𝙺𝚒𝚌𝚔 𝚞𝚜𝚎𝚛 𝚏𝚛𝚘𝚖 𝚐𝚛𝚘𝚞𝚙: .kick
╰➤📢 𝚃𝚊𝚐 𝚊𝚕𝚕 𝚐𝚛𝚘𝚞𝚙 𝚖𝚎𝚖𝚋𝚎𝚛𝚜: .tagall
╰➤🖼️ 𝚂𝚎𝚝 𝚐𝚛𝚘𝚞𝚙 𝚙𝚛𝚘𝚏𝚒𝚕𝚎 𝚙𝚒𝚌𝚝𝚞𝚛𝚎: .setup
╰➤👑 𝙻𝚒𝚜𝚝 𝚊𝚕𝚕 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗𝚜: .admins
╰➤➕ 𝙰𝚍𝚍 𝚊 𝚞𝚜𝚎𝚛 𝚝𝚘 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙: .add
╰➤⬆️ 𝙿𝚛𝚘𝚖𝚘𝚝𝚎 𝚞𝚜𝚎𝚛 𝚝𝚘 𝚊𝚍𝚖𝚒𝚗: .promote
╰➤⬇️ 𝙳𝚎𝚖𝚘𝚝𝚎 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚖𝚎𝚖𝚋𝚎𝚛: .demote
╰➤⚠️ 𝙰𝚕𝚕𝚘𝚠 𝚎𝚟𝚎𝚛𝚢𝚘𝚗𝚎 𝚝𝚘 𝚜𝚎𝚗𝚍 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚒𝚗 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙: .open
╰➤⚠️ 𝚂𝚎𝚝 𝚐𝚛𝚘𝚞𝚙 𝚌𝚑𝚊𝚝 𝚝𝚘 𝚊𝚍𝚖𝚒𝚗-𝚘𝚗𝚕𝚢 𝚖𝚎𝚜𝚜𝚊𝚐𝚎: .close
╰➤♻️ 𝚁𝚎𝚜𝚎𝚝 𝚐𝚛𝚘𝚞𝚙 𝚒𝚗𝚟𝚒𝚝𝚎 𝚕𝚒𝚗𝚔: .revoke
╰➤✏️ 𝙲𝚑𝚊𝚗𝚐𝚎 𝚐𝚛𝚘𝚞𝚙 𝚗𝚊𝚖𝚎: .setsubject
╰➤📝 𝙲𝚑𝚊𝚗𝚐𝚎 𝚐𝚛𝚘𝚞𝚙 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: .setdesc
╰➤📄𝚂𝚑𝚘𝚠 𝚐𝚛𝚘𝚞𝚙 𝚍𝚎𝚝𝚊𝚒𝚕𝚜: .ginfo
╭━━━━━━━━━━━━━━━━━✦
┃  📥Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
          break;

        case "4":
          reaction = "🔍";
          subMenuText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃  💠 𝗦𝗘𝗔𝗥𝗖𝗛 - 𝗠𝗘𝗡𝗨          ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤🔍 *YouTube Search* - Type: .yts
╭━━━━━━━━━━━━━━━━━✦
┃  📥Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
          break;

        case "5":
          reaction = "🛠️";
          subMenuText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    🛠️ 𝗦𝗬𝗦𝗧𝗘𝗠-𝗠𝗘𝗡𝗨            ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤⚙️ *MENU* - Type: . menu
╰➤👀 *ALIVE* - Type: .alive
╰➤🤖 *BOT* - Type: .bot
╰➤♻️ *RESTART* - Type: .restart
╰➤🎭 *CHANGE MODE* - Type: .mode
╭━━━━━━━━━━━━━━━━━✦
┃  🛠️Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
          break;

        case "6":
          reaction = "📂";
          subMenuText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃  📂 𝗢𝗧𝗛𝗘𝗥 - 𝗠𝗘𝗡𝗨              ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤💾 Saves View Once: .sv
╰➤📸 Get profile pic: .dp
╭━━━━━━━━━━━━━━━━━✦
┃  📂Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
          break;

        case "7":
          reaction = "👑";
          subMenuText = 
`╭─ 👑 *${config.BOT_NAME} Owner Info* 👑
│
│👤 *NAME:* 𝐑𝐚𝐦𝐞𝐬𝐡 𝐃𝐢𝐬𝐬𝐚𝐧𝐚𝐲𝐚𝐤𝐚
│🌍 *Location:* Sri Lanka🇱🇰
│📱 *WhatsApp:* +94775938007
╰───────────────⬣
│ 🚀 Powered By
╰─ 𝐑𝐚𝐦𝐞𝐬𝐡 𝐃𝐢𝐬𝐬𝐚𝐧𝐚𝐲𝐚𝐤𝐚🔥`;
      
          imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Ramesh%20Dissanayaka.jpg?raw=true";
          break;
      }

      if (subMenuText) {
      
        await rush.sendMessage(from, { react: { text: reaction, key: mek.key } });


        await rush.sendMessage(from, {
          image: { url: imageUrl },
          caption: subMenuText,
        }, { quoted: mek });
      }

    } catch (err) {
      console.error(err);
      reply("❌ Error processing menu selection.");
    }
  }
);
