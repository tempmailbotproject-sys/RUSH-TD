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
┃      💠 *Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ*     ┃
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
      console.error(err);
      reply("❌ Error generating menu.");
    }
  }
);
