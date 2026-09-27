const { cmd } = require("../command");
const config = require('../config');

cmd(
  {
    pattern: "bot",
    react: "🤖",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const downloadText = 
`╔══◉ 🟢 *STATUS: ONLINE* ◉══╗
║  𝙷𝚎𝚢 𝙳𝚞𝚍𝚎, 𝙸’𝚖 𝚑𝚎𝚛𝚎 𝚝𝚘 𝚑𝚎𝚕𝚙 𝚢𝚘𝚞.
║  Use Me Anything! 💬
╚════════════════════╝
🧾 *PROFILE INFORMATION*
┌──────── ⋆⋅☆⋅⋆ ────────┐
│ 🔐 *Owner:* ${config.OWNER_NAME}
│ 👤 *Botname:* ${config.BOT_NAME}
│ ⚡ *Bio:* Powerful WhatsApp Bot
└──────── ⋆⋅☆⋅⋆ ────────┘
🚀 Powered By
╰─ ${config.OWNER_NAME}🔥
`.trim();

      // Photo eke path eka / url eka denna
      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/RUSH-TD%201.png?raw=true"; // <-- Replace with your image URL

      await rush.sendMessage(from, {
        image: { url: imageUrl },
        caption: downloadText,
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error generating download.");
    }
  }
);
