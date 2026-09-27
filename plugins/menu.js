const { cmd } = require("../command");
const config = require('../config');

// 1. Menu Reply Handler (අංක වලට reply කරන කොටස)
cmd({
    on: "text"
}, async (rush, mek, m, { from, body }) => {
    try {
        // Message එකක් ආවම මේක console එකේ print වෙයි, එතකොට අපිට බලාගන්න පුළුවන් bot ට message එක එනවද කියලා
        console.log("📥 Message received in on:text handler"); 

        if (!m.quoted) {
            console.log("⚠️ No quoted message found.");
            return;
        }

        let quotedText = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.msg || "";
        
        // Photo caption එකක් නම් මේකෙන් ගනීවි
        if (!quotedText && m.msg?.contextInfo?.quotedMessage?.imageMessage?.caption) {
            quotedText = m.msg.contextInfo.quotedMessage.imageMessage.caption;
        }

        if (!quotedText) {
            console.log("⚠️ Could not extract text from the quoted message.");
            return;
        }

        console.log("📝 Quoted Text:", quotedText); // Quoted text එක මොකක්ද කියලා print වෙයි

        // Main Menu එකද කියලා check කරනවා
        if (!quotedText.includes("Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ") && !quotedText.includes("MAIN - MENU")) {
            console.log("⚠️ Quoted text does not contain MAIN - MENU.");
            return;
        }

        // User යවපු අංකය ගන්නවා
        const userText = body || m.text || "";
        const choice = parseInt(userText.trim());
        
        console.log("🔢 User Choice:", choice);

        if (isNaN(choice) || choice < 1 || choice > 7) {
            console.log("❌ Invalid choice. Must be between 1 and 7.");
            return;
        }

        console.log("✅ Valid choice! Sending menu for option:", choice);
        const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true";

        // 1️⃣ DOWNLOAD MENU
        if (choice === 1) {
            await rush.sendMessage(from, { react: { text: "📥", key: mek.key } });
            const downloadText = 
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
            return await rush.sendMessage(from, { image: { url: imageUrl }, caption: downloadText }, { quoted: mek });

        // 2️⃣ LOGO MENU
        } else if (choice === 2) {
            await rush.sendMessage(from, { react: { text: "🎨", key: mek.key } });
            // ... (ඉතිරි menu ටික ඔයාගේ කලින් code එකේ විදිහටම දාගන්න)
             const logoText = 
`╭━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━╮
┃    💠 𝗟𝗢𝗚𝗢 - 𝗠𝗘𝗡𝗨                ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤🎨 *Naruto* - Type: .naruto
// ... ඉතිරි ටික
╰─ ${config.OWNER_NAME}🔥`;
            return await rush.sendMessage(from, { image: { url: imageUrl }, caption: logoText }, { quoted: mek });
        }
        
        // ... (අනිත් options ටිකත් මේ විදිහටම)

    } catch (err) {
        console.error("❌ Menu Reply Error:", err);
    }
});

// 2. Main .menu Command (ප්‍රධාන මෙනු එක ගන්න command එක)
cmd(
  {
    pattern: "menu",
    react: "⚙️",
    desc: "Get bot menu list.",
    category: "main",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      console.log("✅ Menu command triggered!"); // Command එක වැඩද කියලා බලන්න

      const menuText =
`╭━━━━ ⚡ ${config.BOT_NAME} ⚡ ━━━━╮
┃     💠 *Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ*     ┃
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
      console.error("❌ Error generating menu:", err);
      reply("❌ Error generating menu.");
    }
  }
);
