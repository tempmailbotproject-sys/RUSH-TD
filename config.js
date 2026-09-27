const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: "7N8BHChL#GQmtZU2PwpEpAyWusLnX8xhZJXWzwIBaYxT0PvHX5wU", // Put your session id here
  ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true",
                
  BOT_OWNER: "94775938007", // Replace your bot owner number here with 94(country code)
  BOT_NAME: process.env.BOT_NAME || "𝐑𝐔𝐒𝐇-𝐓𝐃",
  OWNER_NAME: process.env.OWNER_NAME || "𝐑𝐚𝐦𝐞𝐬𝐡 𝐃𝐢𝐬𝐬𝐚𝐧𝐚𝐲𝐚𝐤𝐚",
  VERSION: process.env.VERSION || "1.0.0",
  AUTO_STATUS_SEEN: 'true',
  AUTO_STATUS_REACT: 'true',
  MODE: process.env.MODE || "public", //public,private,group

};
