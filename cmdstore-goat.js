const axios = require("axios");
const availableCmdsUrl = "https://raw.githubusercontent.com/Nisanxnx/N1SA9/refs/heads/main/availableCmds.json";
const cmdUrlsJson = "https://raw.githubusercontent.com/Nisanxnx/N1SA9/refs/heads/main/cmdUrls.json";
const ITEMS_PER_PAGE = 10;

module.exports.config = {
  name: "cmdstore",
  aliases: ["cs", "cmds"],
  author: "Dipto",
  role: 0,
  version: "6.9",
  description: {
    en: "Commands Store of Dipto",
  },
  countDown: 3,
  category: "goatbot",
  guide: {
    en: "{pn} [command name | single character | page number]",
  },
};
module.exports.onStart = async function ({ api, event, args }) {
  const query = args.join(" ").trim().toLowerCase();
  try {
    const response = await axios.get(availableCmdsUrl);
    let cmds = response.data.cmdName;
    let finalArray = cmds;
    let page = 1;

    if (query) {
      if (!isNaN(query)) {
        page = parseInt(query);
      } else if (query.length === 1) {
        finalArray = cmds.filter(cmd => cmd.cmd.startsWith(query));
        if (finalArray.length === 0) {
          return api.sendMessage(`❌ | 𝙽𝚘 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚏𝚘𝚞𝚗𝚍 𝚜𝚝𝚊𝚛𝚝𝚒𝚗𝚐 𝚠𝚒𝚝𝚑 "${query}".`, event.threadID, event.messageID);
        }
      } else {
        finalArray = cmds.filter(cmd => cmd.cmd.includes(query));
        if (finalArray.length === 0) {
          return api.sendMessage(`❌ | 𝙲𝚘𝚖𝚖𝚊𝚗𝚍 "${query}" 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍.`, event.threadID, event.messageID);
        }
      }
    }

    const totalPages = Math.ceil(finalArray.length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) {
      return api.sendMessage(
        `❌ | 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚙𝚊𝚐𝚎 𝚗𝚞𝚖𝚋𝚎𝚛. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚎𝚗𝚝𝚎𝚛 𝚊 𝚗𝚞𝚖𝚋𝚎𝚛 𝚋𝚎𝚝𝚠𝚎𝚎𝚗 𝟷 𝚊𝚗𝚍 ${totalPages}.`,
        event.threadID,
        event.messageID
      );
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const cmdsToShow = finalArray.slice(startIndex, endIndex);
    let msg = `✨《 𝐘𝐎𝐔𝐑 𝐍𝐈𝐒𝐀𝐍 𝐂𝐌𝐃𝐒𝐓𝐎𝐑𝐄 》🎀\n\n╭━━━━━━━━━━━━━━━━━━━━━━━━╮\n├‣ 𝙿𝚊𝚐𝚎 ${page} 𝚘𝚏 ${totalPages} 𝚙𝚊𝚐𝚎(s)\n├‣ 𝚃𝚘𝚝𝚊𝚕 ${finalArray.length} 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜\n`;
    cmdsToShow.forEach((cmd, index) => {
      msg += `├‣ ${startIndex + index + 1}. ${cmd.cmd}\n├‣ 𝙰𝚄𝚃𝙷𝙾𝚁: ${cmd.author}\n│ 𝚄𝙿𝙳𝙰𝚃𝙴: ${cmd.update || null}\n`;
    });
    msg += `╰━━━━━━━━━━━━━━━━━━━━━━━━╯`;

    if (page < totalPages) {
      msg += `\nType "${this.config.name} ${page + 1}" for more commands.`;
    }
    api.sendMessage(
      msg,
      event.threadID,
      (error, info) => {
global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          cmdName: finalArray,
          page: page
        });
      },
      event.messageID
    );
    console.log(finalArray)
  } catch (error) {
    api.sendMessage(
      "❌ | Failed to retrieve commands.",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.onReply = async function ({ api, event, Reply }) {

  if (Reply.author != event.senderID) {
    return api.sendMessage("𝚆𝚑𝚘 𝚊𝚛𝚎 𝚢𝚘𝚞?🐸", event.threadID, event.messageID);
  }
  const reply = parseInt(event.body);
  const startIndex = (Reply.page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  if (isNaN(reply) || reply < startIndex + 1 || reply > endIndex) {
    return api.sendMessage(
      `❌ | 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚠𝚒𝚝𝚑 𝚊 𝚗𝚞𝚖𝚋𝚎𝚛 𝚋𝚎𝚝𝚠𝚎𝚎𝚗 ${startIndex + 1} 𝚊𝚗𝚍 ${Math.min(endIndex, Reply.cmdName.length)}.`,
      event.threadID,
      event.messageID
    );
  }
  try {
  const cmdName = Reply.cmdName[reply - 1].cmd
const  { status }  = Reply.cmdName[reply - 1]
    const response = await axios.get(cmdUrlsJson);
    const selectedCmdUrl = response.data[cmdName];
    if (!selectedCmdUrl) {
      return api.sendMessage(
        "❌ | 𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝚄𝚁𝙻 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗.",
        event.threadID,
        event.messageID
      );
    }
    api.unsendMessage(Reply.messageID);
    const msg = `╭───────⭓\n├‣ 𝚂𝚃𝙰𝚃𝚄𝚂 :${status || null}\n├‣ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝚄𝚛𝚕: ${selectedCmdUrl}\n╰─────────────⭓`;
    api.sendMessage(msg, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(
      "❌ | 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚛𝚎𝚝𝚛𝚒𝚎𝚟𝚎 𝚝𝚑𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚄𝚁𝙻.",
      event.threadID,
      event.messageID
    );
  }
};
