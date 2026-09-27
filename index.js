const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  AnyMessageContent,
  prepareWAMessageMedia,
  areJidsSameUser,
  downloadContentFromMessage,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  generateMessageID, makeInMemoryStore,
  jidDecode,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');

const fs = require('fs');
const P = require('pino');
const express = require('express');
const axios = require('axios');
const path = require('path');
const qrcode = require('qrcode-terminal');

const config = require('./config');
const { sms, downloadMediaMessage } = require('./lib/msg');
const {
  getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson
} = require('./lib/functions');
const { File } = require('megajs');
const { commands, replyHandlers } = require('./command');

const app = express();
const port = process.env.PORT || 8000;

const prefix = '.';
const ownerNumber = [config.BOT_OWNER];
const credsPath = path.join(__dirname, '/auth_info_baileys/creds.json');

async function ensureSessionFile() {
  if (!fs.existsSync(credsPath)) {
    if (!config.SESSION_ID) {
      console.error('❌ SESSION_ID env variable is missing. Cannot restore session.');
      process.exit(1);
    }

    console.log("❗ [RUSH-TD] SESSION_ID not found in env. Please configure it.");

    const sessdata = config.SESSION_ID;
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);

    filer.download((err, data) => {
      if (err) {
        console.error("❌ Failed to download session file from MEGA:", err);
        process.exit(1);
      }

      fs.mkdirSync(path.join(__dirname, '/auth_info_baileys/'), { recursive: true });
      fs.writeFileSync(credsPath, data);
      console.log("📥 [RUSH-TD] Session file downloaded and saved.");
      setTimeout(() => {
        connectToWA();
      }, 2000);
    });
  } else {
    setTimeout(() => {
      connectToWA();
    }, 1000);
  }
}


const antiDeletePlugin = require('./plugins/antidelete.js');
global.pluginHooks = global.pluginHooks || [];
global.pluginHooks.push(antiDeletePlugin);


async function connectToWA() {
  console.log("🛰️ [RUSH-TD] Initializing WhatsApp connection...");
  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, '/auth_info_baileys/'));
  const { version } = await fetchLatestBaileysVersion();

  const rush = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    auth: state,
    version,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
  });

  rush.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else if (connection === 'open') {
      console.log('✅ RUSH-TD connected to WhatsApp');

      const up = 
`╭─────── ⭓ ⭓ ⭓───────╮\n` +
`│     🧿 *SYSTEM ONLINE* 🧿       │\n` +
`╰─────────⟡─────────╯\n` +
`│ 👋 *Hi there, I'm Alive Now!*\n` +
`│ 🍁 *PREFIX:* "."\n` +
`│ ⚡ *BOT NAME:* RUSH-TD\n` +
`│ 🔋 *PLATFORM:* linux\n` +
`│ 🧩 *VERSION:* 1.0.0\n` +
`╰───────────────────⬣\n` +
`👑 O  W  N  E  R\n` +
`🔥 *RAMESH DISSANAYAKA* 🔥\n`;
      rush.sendMessage(ownerNumber[0] + "@s.whatsapp.net", {
        image: { url: 'https://raw.githubusercontent.com/rush1617/RUSH-TD/refs/heads/main/images/RUSH-TD_Alive.png' },
        caption: up
      });

      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() === ".js") {
          require(`./plugins/${plugin}`);
        }
      });
    }
  });

  rush.ev.on('creds.update', saveCreds);

  rush.ev.on('messages.upsert', async ({ messages }) => {
    for (const msg of messages) {
      if (msg.messageStubType === 68) {
        await rush.sendMessageAck(msg.key);
      }
    }

    const mek = messages[0];
    if (!mek || !mek.message) return;
    mek.message = getContentType(mek.message) === 'ephemeralMessage' ? mek.message.ephemeralMessage.message : mek.message;

    
        if (global.pluginHooks) {
      for (const plugin of global.pluginHooks) {
        if (plugin.onMessage) {
          try {
            await plugin.onMessage(rush, mek);
          } catch (e) {
            console.log("onMessage error:", e);
          }
        }
      }
    }
    
             
    
if (mek.key?.remoteJid === 'status@broadcast') {
  const senderJid = mek.key.participant || mek.key.remoteJid || "unknown@s.whatsapp.net";
  const mentionJid = senderJid.includes("@s.whatsapp.net") ? senderJid : senderJid + "@s.whatsapp.net";

  if (config.AUTO_STATUS_SEEN === "true") {
    try {
      await rush.readMessages([mek.key]);
      console.log(`[✓] Status seen: ${mek.key.id}`);
    } catch (e) {
      console.error("❌ Failed to mark status as seen:", e);
    }
  }

    if (config.AUTO_STATUS_REACT === "true" && mek.key.participant) {
    try {
      const emojis = ['❤️', '💸', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '🙌', '🙆', '🚩', '💐', '🤎', '✅', '🧡', '🌟', '🗿', '💜', '💙', '🖤,'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      await rush.sendMessage('status@broadcast', {
        react: {
          text: randomEmoji,
          key: mek.key,
        }
      }, { statusJidList: [mek.key.participant] });

      console.log(`[✓] Reacted to status of ${mek.key.participant} with ${randomEmoji}`);
    } catch (e) {
      console.error("❌ Failed to react to status:", e);
    }
  }

  if (mek.message?.extendedTextMessage && !mek.message.imageMessage && !mek.message.videoMessage) {
    const text = mek.message.extendedTextMessage.text || "";
    if (text.trim().length > 0) {
      try {
        await rush.sendMessage(ownerNumber[0] + "@s.whatsapp.net", {
          text: `📝 *Text Status*\n👤 From: @${mentionJid.split("@")[0]}\n\n${text}`,
          mentions: [mentionJid]
        });
        console.log(`✅ Text-only status from ${mentionJid} forwarded.`);
      } catch (e) {
        console.error("❌ Failed to forward text status:", e);
      }
    }
  }

  if (mek.message?.imageMessage || mek.message?.videoMessage) {
    try {
      const msgType = mek.message.imageMessage ? "imageMessage" : "videoMessage";
      const mediaMsg = mek.message[msgType];

      const stream = await downloadContentFromMessage(
        mediaMsg,
        msgType === "imageMessage" ? "image" : "video"
      );

      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      const mimetype = mediaMsg.mimetype || (msgType === "imageMessage" ? "image/jpeg" : "video/mp4");
      const captionText = mediaMsg.caption || "";

      await rush.sendMessage(ownerNumber[0] + "@s.whatsapp.net", {
        [msgType === "imageMessage" ? "image" : "video"]: buffer,
        mimetype,
        caption: `📥 *Forwarded Status*\n👤 From: @${mentionJid.split("@")[0]}\n\n${captionText}`,
        mentions: [mentionJid]
      });

      console.log(`✅ Media status from ${mentionJid} forwarded.`);
    } catch (err) {
      console.error("❌ Failed to download or forward media status:", err);
    }
  }
}


    const m = sms(rush, mek);
    const type = getContentType(mek.message);
    const from = mek.key.remoteJid;
    const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage' && mek.message.imageMessage.caption) ? mek.message.imageMessage.caption : (type == 'videoMessage' && mek.message.videoMessage.caption) ? mek.message.videoMessage.caption : '';
    const isCmd = body.startsWith(prefix);
    const commandName = isCmd ? body.slice(prefix.length).trim().split(" ")[0].toLowerCase() : '';
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(' ');

    const sender = mek.key.fromMe ? rush.user.id : (mek.key.participant || mek.key.remoteJid);
    const senderNumber = sender.split('@')[0].split(':')[0];
    const isGroup = from.endsWith('@g.us');
    const botNumber = rush.user.id.split(':')[0];
    const pushname = mek.pushName || 'Sin Nombre';
    const isMe = botNumber.includes(senderNumber);
    const isOwner = ownerNumber.includes(senderNumber) || isMe;
    const botNumber2 = await jidNormalizedUser(rush.user.id);

    const groupMetadata = isGroup ? await rush.groupMetadata(from).catch(() => {}) : '';
    const groupName = isGroup ? groupMetadata.subject : '';
    const participants = isGroup ? groupMetadata.participants : '';
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : '';
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false;

    const reply = (text) => rush.sendMessage(from, { text }, { quoted: mek });

    // Direct Text Handler for Menu Number Replies
    if (m.quoted) {
        const quotedText = m.quoted.text || m.quoted.caption || m.quoted.conversation || "";
        if (quotedText.includes("MAIN - MENU") || quotedText.includes("Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ") || quotedText.includes("Reply with a number")) {
            const cleanBody = body.replace(/[^0-9]/g, "").trim();
            const choice = parseInt(cleanBody);
            
            if (!isNaN(choice) && choice >= 1 && choice <= 7) {
                const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true";

                if (choice === 1) {
                    await rush.sendMessage(from, { react: { text: "📥", key: mek.key } });
                    const downloadText = `╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮\n┃    💠 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 - 𝗠𝗘𝗡𝗨    ┃\n┃━━━━━━━━━━━━━━━━━✦\n╰➤🎶 *SONG* - Type: .song\n╰➤🎼 *TIK TOK* - Type: .tt\n╰➤📼 *YOUTUBE* - Type: .yt\n╰➤📘 *FACEBOOK* - Type: .fb\n╰➤📍 *APK* - Type: .apk\n╰➤🖼️ *WALLPAPER* - Type: .wp\n╰➤📌 *PINTEREST* - Type: .pin\n╭━━━━━━━━━━━━━━━━━✦\n┃    📥Made with ❤️ by\n╰─ ${config.OWNER_NAME}🔥`;
                    return await rush.sendMessage(from, { image: { url: imageUrl }, caption: downloadText }, { quoted: mek });

                } else if (choice === 2) {
                    await rush.sendMessage(from, { react: { text: "🎨", key: mek.key } });
                    const logoText = `╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮\n┃    💠 𝗟𝗢𝗚𝗢 - 𝗠𝗘𝗡𝗨                    ┃\n┃━━━━━━━━━━━━━━━━━✦\n╰➤🎨 *Naruto* - Type: .naruto\n╰➤🎨 *Dragonball* - Type: .dragonball\n╰➤🎨 *Onepiece* - Type: .onepiece\n╰➤🎨 *3DComic* - Type: .3dcomic\n╰➤🎨 *Marvel* - Type: .marvel\n╰➤🎨 *Deadpool* - Type: .deadpool\n╰➤🎨 *Blackpink* - Type: .blackpink\n╰➤🎨 *Neon* - Type: .neon\n╰➤🎨 *Glitch* - Type: .glitch\n╰➤🎨 *Gold* - Type: .gold\n╰➤🎨 *Fire* - Type: .fire\n╭━━━━━━━━━━━━━━━━━✦\n┃    📥Made with ❤️ by\n╰─ ${config.OWNER_NAME}🔥`;
                    return await rush.sendMessage(from, { image: { url: imageUrl }, caption: logoText }, { quoted: mek });

                } else if (choice === 3) {
                    await rush.sendMessage(from, { react: { text: "🔍", key: mek.key } });
                    const searchText = `╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮\n┃    💠 𝗦𝗘𝗔𝗥𝗖𝗛 - 𝗠𝗘𝗡𝗨             ┃\n┃━━━━━━━━━━━━━━━━━✦\n╰➤🔍 *YouTube Search* - Type: .yts\n╭━━━━━━━━━━━━━━━━━✦\n┃    📥Made with ❤️ by\n╰─ ${config.OWNER_NAME}🔥`;
                    return await rush.sendMessage(from, { image: { url: imageUrl }, caption: searchText }, { quoted: mek });

                } else if (choice === 4) {
                    await rush.sendMessage(from, { react: { text: "👑", key: mek.key } });
                    const ownerText = `╭─ 👑 *${config.BOT_NAME} Creator Info* 👑\n│\n│👤 *NAME:* RAMESH DISSANAYAKA\n│🌍 *Location:* Sri Lanka \n│📱 *WhatsApp:* +94775938007 \n╰───────────────⬣\n🚀 Powered By\n╰─ ${config.OWNER_NAME}🔥`;
                    const ownerImg = "https://github.com/rush1617/RUSH-TD/blob/main/images/Ramesh%20Dissanayaka.jpg?raw=true";
                    return await rush.sendMessage(from, { image: { url: ownerImg }, caption: ownerText }, { quoted: mek });

                } else if (choice === 5) {
                    await rush.sendMessage(from, { react: { text: "👥", key: mek.key } });
                    const groupText = `╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮\n┃    👥 𝗚𝗥𝗢𝗨𝗣 - 𝗠𝗘𝗡𝗨                ┃\n┃━━━━━━━━━━━━━━━━━✦\n╰➤👢 *Kick user:* .kick\n╰➤📢 *Tag all:* .tagall\n╰➤🖼️ *Set group DP:* .setup\n╰➤👑 *Admins list:* .admins\n╰➤➕ *Add user:* .add\n╰➤⬆️ *Promote:* .promote\n╰➤⬇️ *Demote:* .demote\n╰➤⚠️ *Open Group:* .open\n╰➤⚠️ *Close Group:* .close\n╰➤♻️ *Reset Invite Link:* .revoke\n╭━━━━━━━━━━━━━━━━━✦\n┃    📥Made with ❤️ by\n╰─ ${config.OWNER_NAME}🔥`;
                    return await rush.sendMessage(from, { image: { url: imageUrl }, caption: groupText }, { quoted: mek });

                } else if (choice === 6) {
                    await rush.sendMessage(from, { react: { text: "🛠️", key: mek.key } });
                    const systemText = `╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮\n┃      🛠️ 𝗦𝗬𝗦𝗧𝗘𝗠-𝗠𝗘𝗡𝗨               ┃\n┃━━━━━━━━━━━━━━━━━✦\n╰➤⚙️ *MENU* - Type: .menu\n╰➤👀 *ALIVE* - Type: .alive\n╰➤🤖 *BOT* - Type: .bot\n╰➤♻️ *RESTART* - Type: .restart\n╰➤🎭 *CHANGE MODE* - Type: .mode\n╭━━━━━━━━━━━━━━━━━✦\n┃    🛠️Made with ❤️ by\n╰─ ${config.OWNER_NAME}🔥`;
                    return await rush.sendMessage(from, { image: { url: imageUrl }, caption: systemText }, { quoted: mek });

                } else if (choice === 7) {
                    await rush.sendMessage(from, { react: { text: "📂", key: mek.key } });
                    const otherText = `╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮\n┃    📂 𝗢𝗧𝗛𝗘𝗥 - 𝗠𝗘𝗡𝗨                ┃\n┃━━━━━━━━━━━━━━━━━✦\n╰➤💾 *Saves View Once:* .sv\n╰➤📸 *Get profile pic:* .dp\n╭━━━━━━━━━━━━━━━━━✦\n┃    📂Made with ❤️ by\n╰─ ${config.OWNER_NAME}🔥`;
                    return await rush.sendMessage(from, { image: { url: imageUrl }, caption: otherText }, { quoted: mek });
                }
            }
        }
    }

    if (isCmd) {
      const cmd = commands.find((c) => c.pattern === commandName || (c.alias && c.alias.includes(commandName)));
      if (cmd) {
        
        if (!isOwner) {
            if (config.MODE === 'private') {
              if (isGroup) return;
              return reply
(`❌ Access Denied!
🚫 *PRIVATE MODE ACTIVATED.*
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
            }
            if (config.MODE === 'group' && !isGroup) {
              return reply
(`❌ Access Denied!
🚫 *PRIVATE MODE ACTIVATED.*
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
            }
          }
        
        if (cmd.react) rush.sendMessage(from, { react: { text: cmd.react, key: mek.key } });
        try {
          cmd.function(rush, mek, m, {
            from, quoted: mek, body, isCmd, command: commandName, args, q,
            isGroup, sender, senderNumber, botNumber2, botNumber, pushname,
            isMe, isOwner, groupMetadata, groupName, participants, groupAdmins,
            isBotAdmins, isAdmins, reply,
          });
        } catch (e) {
          console.error("[PLUGIN ERROR]", e);
        }
      }
    }

    const replyText = body;
    for (const handler of replyHandlers) {
      if (handler.filter(replyText, { sender, message: mek })) {
        try {
          await handler.function(rush, mek, m, {
            from, quoted: mek, body: replyText, sender, reply,
          });
          break;
        } catch (e) {
          console.log("Reply handler error:", e);
        }
      }
    }
  });


  rush.ev.on('messages.update', async (updates) => {
    if (config.MODE === 'private') {
      updates = updates.filter(u => !u.key?.remoteJid?.endsWith('@g.us'));
    }

    if (updates.length === 0) return;
    
    if (global.pluginHooks) {
      for (const plugin of global.pluginHooks) {
        if (plugin.onDelete) {
          try {
            await plugin.onDelete(rush, updates);
          } catch (e) {
            console.log("onDelete error:", e);
          }
        }
      }
    }
  });
}



ensureSessionFile();

app.get("/", (req, res) => {
  res.send("Hey, RUSH-TD started✅");
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
