const { cmd } = require("../command");
const config = require('../config');

cmd({
  filter: (replyText, { sender, message }) => {
    if (!message || !message.quoted) return false;
    const quotedText = message.quoted.text || message.quoted.caption || message.quoted.conversation || "";
    const isMenuReply = quotedText.includes("MAIN - MENU") || quotedText.includes("Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ");
    return isMenuReply && /^\d+$/.test(String(replyText).trim());
  }
}, async (rush, mek, m, { from, body, reply }) => {
  try {
    const choice = parseInt(body.trim());
    if (isNaN(choice)) return;

    const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true";

    if (choice === 1) {
      await rush.sendMessage(from, { react: { text: "📥", key: mek.key } });
      const downloadText = `
╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
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
      return await rush.sendMessage(from, { image: { url: imageUrl }, caption: downloadText }, { quoted: mek });
    }

    if (choice === 2) {
      await rush.sendMessage(from, { react: { text: "🎨", key: mek.key } });
      const logoText = `
╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    💠 𝗟𝗢𝗚𝗢 - 𝗠𝗘𝗡𝗨                ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤🎨 *Naruto* - Type: .naruto
╰➤🎨 *Dragonball* - Type: .dragonball
╰➤🎨 *Onepiece* - Type: .onepiece
╭━━━━━━━━━━━━━━━━━✦
┃    📥Made with ❤️ by
╰─ ${config.OWNER_NAME}🔥`;
      return await rush.sendMessage(from, { image: { url: imageUrl }, caption: logoText }, { quoted: mek });
    }

  } catch (err) {
    console.error(err);
  }
});
