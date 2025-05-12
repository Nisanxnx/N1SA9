module.exports = {
  config: {
    name: "offbot",
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 45,
    role: 0,
    shortDescription: "Turn off bot",
    longDescription: "Turn off bot",
    category: "owner",
    guide: "{p}{n}"
  },
  onStart: async function ({event, api}) {
    const permission = [ "set_your_uid" ];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("╭───────────────╮\nYou don't have permission to use this command.\n───────────────╯", event.threadID, event.messageID);
    return;
  }
    api.sendMessage("╭───────────────╮\nsuccessfully Turned Off System ✅\───────────────╯",event.threadID, () =>process.exit(0))}
};
