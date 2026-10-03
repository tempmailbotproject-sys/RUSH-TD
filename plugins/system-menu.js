const { cmd } = require("../command");

// 1. මේක තමයි Main Menu එක (.menu ගැහුවම එන එක)
cmd(
  {
    pattern: "menu",
    react: "⚙️",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const menuText =
`╭━━━━ ⚡ *RUSH-TD* ⚡ ━━━━╮\n` +
`┃    💠 *Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ*      ┃\n` +
`┃━━━━━━━━━━━━━━━━━━━✦\n` +
`╰➤ 1 | 📥 *DOWNLOAD MENU*\n` +
`╰➤ 2 | 🎨 *LOGO MENU*\n` +
`╰➤ 3 | 👥 *GROUP MENU*\n` +
`╰➤ 4 | 🔍 *SEARCH MENU*\n` +
`╰➤ 5 | 🛠️ *SYSTEM MENU*\n` +
`╰➤ 6 | 📂 *OTHER MENU*\n` +
`╰➤ 7 | 👑 *OWNER MENU*\n` +
`╭━━━━━━━━━━━━━━━━━━━✦\n` +
`┃ 💡 *Reply to this message with a number*\n` +
`┃ ⚙️ Made with ❤️ by\n` +
`╰─🔥 *RAMESH DISSANAYAKA* 🔥\n`;

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

// 2. මේක තමයි අංක වලට Reply කරාම වැඩ කරන කොටස
cmd(
  {
    // pattern එකක් නැතුව filter එකක් දුන්නම මේක replyHandler එකක් විදියට වැඩ කරනවා
    filter: (text, data) => {
      if (!text) return false;
      const num = text.trim();
      const validNumbers = ["1", "2", "3", "4", "5", "6", "7"];
      
      // Reply කරපු message එකක්ද කියලා check කරනවා
      const isReply = data.message?.message?.extendedTextMessage?.contextInfo?.stanzaId;
      
      // Reply එකක් වෙන්නත් ඕනේ, 1-7 අතර අංකයක් වෙන්නත් ඕනේ
      return Boolean(isReply && validNumbers.includes(num));
    }
  },
  async (rush, mek, m, { from, reply, body }) => {
    try {
      const choice = body.trim();
      let subMenuText = "";
      let imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true";
      let reaction = "";

      // අංකය අනුව අදාළ මෙනු එක තෝරනවා
      switch (choice) {
        case "1":
          reaction = "📥";
          subMenuText = 
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮\n` +
`┃  💠 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 - 𝗠𝗘𝗡𝗨  ┃\n` +
`┃━━━━━━━━━━━━━━━━━✦\n` +
`╰➤🎶 *SONG* - Type: .song\n` +
`╰➤🎼 *TIK TOK* - Type: .tt\n` +
`╰➤📼 *YOUTUBE* - Type: .yt\n` +
`╰➤📘 *FACEBOOK* - Type: .fb\n` +
`╰➤📍 *APK* - Type: .apk\n` +
`╰➤🖼️ *WALLPAPER* - Type: .wp\n` +
`╰➤📌 *PINTEREST* - Type: .pin\n` +
`╭━━━━━━━━━━━━━━━━━✦\n` +
`┃  📥Made with ❤️ by\n` +
`╰─🔥 *RAMESH DISSANAYAKA* 🔥\n`;
          break;

        case "2":
          reaction = "🎨";
          subMenuText = 
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮\n` +
`┃  💠 𝗟𝗢𝗚𝗢 - 𝗠𝗘𝗡𝗨               ┃\n` +
`┃━━━━━━━━━━━━━━━━━✦\n` +
`╰➤🎨*Naruto* - Type: .naruto\n` +
`╰➤🎨*Dragonball* - Type: .dragonball\n` +
`╰➤🎨*Onepiece* - Type: .onepiece\n` +
`╰➤🎨*3DComic* - Type: .3dcomic\n` +
`╰➤🎨*Marvel* - Type: .marvel\n` +
`╰➤🎨*Neon* - Type: .neon\n` +
`╰➤🎨*Graffiti* - Type: .graffiti\n` +
`╰➤🎨*Space* - Type: .space\n` +
`╭━━━━━━━━━━━━━━━━━✦\n` +
`┃  📥Made with ❤️ by\n` +
`╰─🔥 *RAMESH DISSANAYAKA* 🔥\n`; // දිග වැඩි නිසා logo ටිකක් අඩු කරලා තියෙන්නේ, ඔයාට ඕන නම් ඉතුරු ටික මෙතනට add කරගන්න.
          break;

        case "3":
          reaction = "👥";
          subMenuText = 
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮\n` +
`┃  👥 𝗚𝗥𝗢𝗨𝗣 - 𝗠𝗘𝗡𝗨            ┃\n` +
`┃━━━━━━━━━━━━━━━━━✦\n` +
`╰➤👢𝙺𝚒𝚌𝚔 𝚞𝚜𝚎𝚛: .kick\n` +
`╰➤📢 𝚃𝚊𝚐 𝚊𝚕𝚕: .tagall\n` +
`╰➤⬆️ 𝙿𝚛𝚘𝚖𝚘𝚝𝚎: .promote\n` +
`╰➤⬇️ 𝙳𝚎𝚖𝚘𝚝𝚎: .demote\n` +
`╰➤⚠️ 𝙾𝚙𝚎𝚗/𝙲𝚕𝚘𝚜𝚎: .open / .close\n` +
`╰➤♻️ 𝚁𝚎𝚟𝚘𝚔𝚎: .revoke\n` +
`╭━━━━━━━━━━━━━━━━━✦\n` +
`┃  📥Made with ❤️ by\n` +
`╰─🔥 RAMESH DISSANAYAKA 🔥\n`;
          break;

        case "4":
          reaction = "🔍";
          subMenuText = 
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮\n` +
`┃  💠 𝗦𝗘𝗔𝗥𝗖𝗛 - 𝗠𝗘𝗡𝗨          ┃\n` +
`┃━━━━━━━━━━━━━━━━━✦\n` +
`╰➤🔍 *YouTube Search* - Type: .yts\n` +
`╭━━━━━━━━━━━━━━━━━✦\n` +
`┃  📥Made with ❤️ by\n` +
`╰─🔥 *RAMESH DISSANAYAKA* 🔥\n`;
          break;

        case "5":
          reaction = "🛠️";
          subMenuText = 
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮\n` +
`┃    🛠️ 𝗦𝗬𝗦𝗧𝗘𝗠-𝗠𝗘𝗡𝗨            ┃\n` +
`┃━━━━━━━━━━━━━━━━━✦\n` +
`╰➤⚙️ *MENU* - Type: . menu\n` +
`╰➤👀 *ALIVE* - Type: .alive\n` +
`╰➤🤖 *BOT* - Type: .bot\n` +
`╰➤♻️ *RESTART* - Type: .restart\n` +
`╰➤🎭 *CHANGE MODE* - Type: .mode\n` +
`╭━━━━━━━━━━━━━━━━━✦\n` +
`┃  🛠️Made with ❤️ by\n` +
`╰─🔥 *RAMESH DISSANAYAKA* 🔥\n`;
          break;

        case "6":
          reaction = "📂";
          subMenuText = 
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮\n` +
`┃  📂 𝗢𝗧𝗛𝗘𝗥 - 𝗠𝗘𝗡𝗨              ┃\n` +
`┃━━━━━━━━━━━━━━━━━✦\n` +
`╰➤💾 Saves View Once: .sv\n` +
`╰➤📸 Get profile pic: .dp\n` +
`╭━━━━━━━━━━━━━━━━━✦\n` +
`┃  📂Made with ❤️ by\n` +
`╰─🔥 *RAMESH DISSANAYAKA* 🔥\n`;
          break;

        case "7":
          reaction = "👑";
          subMenuText = 
`╭─ 👑 *RUSH-TD Owner Info* 👑\n` +
`│\n` +
`│👤 *NAME:* RAMESH DISSANAYAKA\n` +
`│🌍 *Location:* Sri Lanka🇱🇰 \n` +
`│📱 *WhatsApp:* +94775938007 \n` +
`╰───────────────⬣\n` +
`🚀 Powered By\n` +
`*RAMESH DISSANAYAKA* 🔥\n`;
          // Owner menu එකට විතරක් වෙනම photo එකක් දාමු
          imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Ramesh%20Dissanayaka.jpg?raw=true";
          break;
      }

      // අදාළ මෙනු එක තියෙනවා නම් ඒක යවනවා
      if (subMenuText) {
        // අංකය reply කරපු මැසේජ් එකට අදාළ Reaction එක දානවා
        await rush.sendMessage(from, { react: { text: reaction, key: mek.key } });

        // අදාළ Sub Menu එක යවනවා
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
