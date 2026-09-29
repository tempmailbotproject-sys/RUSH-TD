const { cmd } = require("../command");
const config = require('../config');

// 1. Main .menu Command
cmd(
  {
    pattern: "menu",
    react: "⚙️️",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const menuText =
`╭━━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━━╮
┃     💠 *Ｍ Ａ Ｉ 🇳 - 𝗠 𝗘 𝗡 𝗨*     ┃
┃━━━━━━━━━━━━━━━━━━━✦
│
├─ 1️⃣ ⭔ *DOWNLOAD MENU*
├─ 2️⃣ ⭔ *LOGO MENU*
├─ 3️⃣ ⭔ *SEARCH MENU*
├─ 4️⃣ ⭔ *CREATOR INFO*
├─ 5️⃣ ⭔ *GROUP MENU*
├─ 6️⃣ ⭔ *SYSTEM MENU*
├─ 7️⃣ ⭔ *OTHER MENU*
│
╰➤ 💡 *Reply with a number (1-7) to get menu!*
╭━━━━━━━━━━━━━━━━━━━✦
┃ ⚙️ Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`.trim();

      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/main-menu.png?raw=true";

      await rush.sendMessage(from, {
        image: { url: imageUrl },
        caption: menuText,
      }, { quoted: mek });

    } catch (err) {
      console.error("Error in .menu command:", err);
      reply("❌ Error generating menu.");
    }
  }
);

// 2. Number Reply Handler using standard text check
cmd({
    on: "text"
}, async (rush, mek, m, { from, body }) => {
    try {
        // Check if message is a reply to another message
        if (!m.message.extendedTextMessage || !m.message.extendedTextMessage.contextInfo) return;
        
        const contextInfo = m.message.extendedTextMessage.contextInfo;
        const quotedText = contextInfo.quotedMessage?.conversation || 
                          contextInfo.quotedMessage?.extendedTextMessage?.text || 
                          contextInfo.quotedMessage?.imageMessage?.caption || "";
        
        // Check if user is replying to the Main Menu
        if (!quotedText.includes("Ｍ Ａ Ｉ 🇳 - 𝗠 𝗘 𝗡 𝗨") && !quotedText.includes("MAIN - MENU")) return;

        // Parse number
        const choice = parseInt(body.trim());
        if (isNaN(choice) || choice < 1 || choice > 7) return;

        const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true";

        // 1️⃣ DOWNLOAD MENU
        if (choice === 1) {
            await rush.sendMessage(from, { react: { text: "📥", key: mek.key } });
            const downloadText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    💠 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 - 𝗠𝗘𝗡𝗨    ┃
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
            return await rush.sendMessage(from, { image: { url: imageUrl }, caption: downloadText }, { quoted: mek });

        // 2️⃣ LOGO MENU
        } else if (choice === 2) {
            await rush.sendMessage(from, { react: { text: "🎨", key: mek.key } });
            const logoText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    💠 𝗟𝗢𝗚𝗢 - 𝗠𝗘𝗡𝗨                    ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤🎨 *Naruto* - Type: .naruto
╰➤🎨 *Dragonball* - Type: .dragonball
╰➤🎨 *Onepiece* - Type: .onepiece
╰➤🎨 *3DComic* - Type: .3dcomic
╰➤🎨 *Marvel* - Type: .marvel
╰➤🎨 *Deadpool* - Type: .deadpool
╰➤🎨 *Blackpink* - Type: .blackpink
╰➤🎨 *Neon* - Type: .neon
╰➤🎨 *Glitch* - Type: .glitch
╰➤🎨 *Gold* - Type: .gold
╰➤🎨 *Fire* - Type: .fire
╭━━━━━━━━━━━━━━━━━✦
┃    📥Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
            return await rush.sendMessage(from, { image: { url: imageUrl }, caption: logoText }, { quoted: mek });

        // 3️⃣ SEARCH MENU
        } else if (choice === 3) {
            await rush.sendMessage(from, { react: { text: "🔍", key: mek.key } });
            const searchText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    💠 𝗦𝗘𝗔𝗥𝗖𝗛 - 𝗠𝗘𝗡𝗨           ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤🔍 *YouTube Search* - Type: .yts
╭━━━━━━━━━━━━━━━━━✦
┃    📥Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
            return await rush.sendMessage(from, { image: { url: imageUrl }, caption: searchText }, { quoted: mek });

        // 4️⃣ OWNER INFO
        } else if (choice === 4) {
            await rush.sendMessage(from, { react: { text: "👑", key: mek.key } });
            const ownerText = 
`╭─ 👑 *${config.BOT_NAME} Creator Info* 👑
│
│👤 *NAME:* RAMESH DISSANAYAKA
│🌍 *Location:* Sri Lanka 
│📱 *WhatsApp:* +94775938007 
╰───────────────⬣
🚀 Powered By
╰─ ${config.OWNER_NAME}🔥`;
            const ownerImg = "https://github.com/rush1617/RUSH-TD/blob/main/images/Ramesh%20Dissanayaka.jpg?raw=true";
            return await rush.sendMessage(from, { image: { url: ownerImg }, caption: ownerText }, { quoted: mek });

        // 5️⃣ GROUP MENU
        } else if (choice === 5) {
            await rush.sendMessage(from, { react: { text: "👥", key: mek.key } });
            const groupText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    👥 𝗚𝗥𝗢𝗨𝗣 - 𝗠𝗘𝗡𝗨              ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤👢 *Kick user:* .kick
╰➤📢 *Tag all:* .tagall
╰➤🖼️ *Set group DP:* .setup
╰➤👑 *Admins list:* .admins
╰➤➕ *Add user:* .add
╰➤⬆️ *Promote:* .promote
╰➤⬇️ *Demote:* .demote
╰➤⚠️ *Open Group:* .open
╰➤⚠️ *Close Group:* .close
╰➤♻️ *Reset Invite Link:* .revoke
╭━━━━━━━━━━━━━━━━━✦
┃    📥Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
            return await rush.sendMessage(from, { image: { url: imageUrl }, caption: groupText }, { quoted: mek });

        // 6️⃣ SYSTEM MENU
        } else if (choice === 6) {
            await rush.sendMessage(from, { react: { text: "🛠️", key: mek.key } });
            const systemText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃      🛠️ 𝗦𝗬𝗦𝗧𝗘𝗠-𝗠𝗘𝗡𝗨            ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤⚙️ *MENU* - Type: .menu
╰➤👀 *ALIVE* - Type: .alive
╰➤🤖 *BOT* - Type: .bot
╰➤♻️ *RESTART* - Type: .restart
╰➤🎭 *CHANGE MODE* - Type: .mode
╭━━━━━━━━━━━━━━━━━✦
┃    🛠️Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
            return await rush.sendMessage(from, { image: { url: imageUrl }, caption: systemText }, { quoted: mek });

        // 7️⃣ OTHER MENU
        } else if (choice === 7) {
            await rush.sendMessage(from, { react: { text: "📂", key: mek.key } });
            const otherText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    📂 𝗢𝗧𝗛𝗘𝗥 - 𝗠𝗘𝗡𝗨              ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤💾 *Saves View Once:* .sv
╰➤📸 *Get profile pic:* .dp
╭━━━━━━━━━━━━━━━━━✦
┃    📂Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
            return await rush.sendMessage(from, { image: { url: imageUrl }, caption: otherText }, { quoted: mek });
        }

    } catch (err) {
        console.error("Error in menu text handler:", err);
    }
});
