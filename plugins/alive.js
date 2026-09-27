const config = require('../config');
const { cmd, commands } = require('../command');
const os = require('os');

// Function to convert uptime in seconds to hh:mm:ss
const formatUptime = (seconds) => {
    const pad = (s) => (s < 10 ? '0' + s : s);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};

cmd({
     pattern: "alive",
    react: "👀",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, reply
}) => {
    try {
        const start = Date.now();
        const ping = Date.now() - start;
        const uptime = formatUptime(process.uptime());
        const platform = os.platform();
        const cpu = os.cpus()[0].model;

        const aliveCaption = 
`╭───〔 🤖 *Bot Status* 〕───⬣
│
│ 🔹 *Bot Name:* ${config.BOT_NAME}
│ 🔹 *Status:* Online & Active
│ 🔹 *Ping:* ${ping} ms
│ 🔹 *Uptime:* ${uptime}
│ 🔹 *Owner:* ${config.OWNER_NAME}
│ 🔹 *Version:* ${config.VERSION}
│
╰───────────────⬣
🚀 Powered By
╰─ ${config.OWNER_NAME}🔥
        `.trim();

        return await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: aliveCaption
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        return reply(`❌ Error: ${error.message}`);
    }
});
