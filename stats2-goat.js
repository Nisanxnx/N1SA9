const os = require('os');
const chalk = require("chalk");

const bold = chalk.bold;
const thin = chalk.dim;
const cyan = chalk.cyan;
const yellow = chalk.yellow;
const green = chalk.green;
const red = chalk.red;
const magenta = chalk.magenta;

// Author পরিবর্তন প্রতিরোধ করা হচ্ছে
const config = Object.freeze({
    name: 'stats',
    aliases: ['rtm', 'UpT'],
    version: '1.4',
    author: 'BaYjid',
    countDown: 15,
    role: 0,
    shortDescription: '📊 𝗦𝘆𝘀𝘁𝗲𝗺 𝗦𝘁𝗮𝘁𝘀',
    longDescription: '📊 𝗗𝗶𝘀𝗽𝗹𝗮𝘆 𝗯𝗼𝘁 𝘀𝘆𝘀𝘁𝗲𝗺 𝘀𝘁𝗮𝘁𝘀 𝘄𝗶𝘁𝗵 𝗱𝗲𝘁𝗮𝗶𝗹𝗲𝗱 𝗶𝗻𝗳𝗼',
    category: '🖥️ 𝗦𝘆𝘀𝘁𝗲𝗺',
    guide: '{pn}: 𝗦𝗵𝗼𝘄 𝗦𝘆𝘀𝘁𝗲𝗺 𝗦𝘁𝗮𝘁𝘀'
});

module.exports = {
    config,
    onStart: async function ({ message, event, usersData, threadsData, api }) {
        const startTime = Date.now();
        const users = await usersData.getAll();
        const groups = await threadsData.getAll();
        const uptime = process.uptime();

        const loadingBar = [
            "🔵 █▒▒▒▒▒▒▒▒▒ 𝟏𝟎%",
            "🔵 ██▒▒▒▒▒▒▒▒ 𝟐𝟎%",
            "🔵 ████▒▒▒▒▒▒ 𝟑𝟎%",
            "🔵 ██████▒▒▒▒ 𝟓𝟎%",
            "🔵 ████████▒▒ 𝟕𝟎%",
            "🔵 ██████████ 𝟏𝟎𝟎%"
        ];

        let frameIndex = 0;
        let sentMessage = await message.reply(thin(`⏳ ${bold(magenta(loadingBar[frameIndex]))}`));

        // 🔄 লোডিং অ্যানিমেশন চালু করা হচ্ছে
        const interval = setInterval(async () => {
            frameIndex = (frameIndex + 1) % loadingBar.length;
            api.editMessage(thin(`⏳ ${bold(magenta(loadingBar[frameIndex]))}`), sentMessage.messageID);
        }, 700);

        try {
            const days = Math.floor(uptime / (3600 * 24));
            const hours = Math.floor((uptime % (3600 * 24)) / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);

            const totalMemory = os.totalmem();
            const freeMemory = os.freemem();
            const usedMemory = totalMemory - freeMemory;
            const memoryUsagePercentage = ((usedMemory / totalMemory) * 100).toFixed(2);

            const cpuCores = os.cpus().length;
            const cpuModel = os.cpus()[0].model;
            const nodeVersion = process.version;
            const platform = os.platform();

            const endTime = Date.now();
            const botPing = endTime - startTime;
            const apiPing = sentMessage.timestamp - startTime;

            const messageContent = `🚀 ${bold(cyan("𝗦𝘆𝘀𝘁𝗲𝗺 𝗦𝘁𝗮𝘁𝗶𝘀𝘁𝗶𝗰𝘀"))}:\n\n` +
                `⏳ ${bold("𝗨𝗽𝘁𝗶𝗺𝗲")}: ${green(days)}𝗱 ${green(hours)}𝗵 ${green(minutes)}𝗺 ${green(seconds)}𝘀\n` +
                `💾 ${bold("𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝗺𝗼𝗿𝘆")}: ${yellow((totalMemory / 1024 / 1024 / 1024).toFixed(2))} 𝗚𝗕\n` +
                `📉 ${bold("𝗙𝗿𝗲𝗲 𝗠𝗲𝗺𝗼𝗿𝘆")}: ${green((freeMemory / 1024 / 1024 / 1024).toFixed(2))} 𝗚𝗕\n` +
                `🔥 ${bold("𝗠𝗲𝗺𝗼𝗿𝘆 𝗨𝘀𝗮𝗴𝗲")}: ${red(memoryUsagePercentage)}%\n` +
                `🛠️ ${bold("𝗖𝗣𝗨 𝗖𝗼𝗿𝗲𝘀")}: ${cpuCores}\n` +
                `⚡ ${bold("𝗖𝗣𝗨 𝗠𝗼𝗱𝗲𝗹")}: ${cpuModel}\n` +
                `📌 ${bold("𝗡𝗼𝗱𝗲.𝗷𝘀 𝗩𝗲𝗿𝘀𝗶𝗼𝗻")}: ${nodeVersion}\n` +
                `🌍 ${bold("𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺")}: ${platform}\n\n` +
                `⚡ ${bold("𝗣𝗶𝗻𝗴")}: ${botPing}𝗺𝘀\n` +
                `🔗 ${bold("𝗔𝗣𝗜 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲")}: ${apiPing}𝗺𝘀\n\n` +
                `👥 ${bold("𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀")}: ${users.length}\n` +
                `📢 ${bold("𝗧𝗼𝘁𝗮𝗹 𝗚𝗿𝗼𝘂𝗽𝘀")}: ${groups.length}`;

            clearInterval(interval); // লোডিং বন্ধ করা হচ্ছে
            return api.editMessage(thin(messageContent), sentMessage.messageID);
        } catch (err) {
            console.error(err);
            clearInterval(interval); // লোডিং বন্ধ করা হচ্ছে
            return api.editMessage("❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗳𝗲𝘁𝗰𝗵𝗶𝗻𝗴 𝘀𝘆𝘀𝘁𝗲𝗺 𝘀𝘁𝗮𝘁𝘀.", sentMessage.messageID);
        }
    }
};

// "author" ফিল্ড পরিবর্তন প্রতিরোধের জন্য defineProperty ব্যবহার
Object.defineProperty(module.exports.config, "author", {
    writable: false,
    configurable: false
});
