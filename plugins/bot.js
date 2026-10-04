const config = require('../config');
const { cmd } = require("../command");

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
╚════════════════════╝
🧾 *PROFILE INFORMATION*
┌──────── ⋆⋅☆⋅⋆ ────────┐
│ 🔐 *Owner:* ${config.OWNER_NAME}
│ 👤 *Botname:* ${config.BOT_NAME}
│ ⚡ *Bio:* Powerful WhatsApp Bot
│ 🧩 *Role:* Wizard Lord 🧙‍♂️
└──────── ⋆⋅☆⋅⋆ ────────┘
│  🚀 Powered By
╰━ ${config.OWNER_NAME}🔥``.trim();

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
