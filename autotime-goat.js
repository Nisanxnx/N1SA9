module.exports.config = {
  name: "autotimer",
  version: "2.0",
  role: 0,
  author: "Dipto",
  description: "সেট করা সময় অনুযায়ী স্বয়ংক্রিয়ভাবে বার্তাগুলি পাঠানো হবে!",
  category: "AutoTime",
  countDown: 3,
};

module.exports.onLoad = async ({ api }) => {
  const timerData = {
      "12:00:00 PM": {
        message: "~ এখন রাত ১২টা বেজে গেলো সবাই শুয়ে পড়ো🤟",
        url: null
      },
      "01:00:00 AM": {
        message: "~এখন রাত ১টা বাজে প্রেম না কইরা যাইয়া ঘুমা বেক্কল😾",
        url: null
      },
      "02:00:00 AM": {
        message: "~এখন রাত ২টা বাজে যারা ছ্যাকা খাইছে তারা জেগে আছে🫠🫠।",
        url: null
      },
      "03:00:00 AM": {
        message: "~এখন রাত ৩টা বাজে সবাই মনে হয় ঘুম🥹 আমার ভাই ঘুম আসে না",
        url: null
      },
      "04:00:00 AM": {
        message: "~এখন রাত ৪টা বাজে একটু পর ফজরের আযান দিলে নামাজ পড়ে নিও সবাই",
        url: null
      },
      "05:00:00 AM": {
        message: "~এখন ভোর ৫টা বাজে সবাই নামাজ পড়ছো তো?❤️",
        url: null
      },
      "06:00:00 AM": {
        message: "~এখন সকাল ৬টা বাজে ঘুম থেকে উঠো সবাই ",
        url: null
      },
      "07:00:00 AM": {
        message: "~এখন সকাল ৭টা বাজে সবাই ব্রেকফাস্ট করে নাও😊 ",
        url: null
      },
      "08:00:00 AM": {
        message: "~এখন সকাল ৮ টা বাজে সবাই মনে হয় কাজে ব্যস্ত হয়ে গেছো",
        url: null
      },
      "09:00:00 AM": {
        message: "~এখন সকাল ৯ টা বাজে মন দিয়ে কাজ করো সবাই❤️",
        url: null
      },
      "10:00:00 AM": {
        message: "~এখন সকাল ১০টা বাজে মিস করছি তোমাদের",
        url: null
      },
      "11:00:00 AM": {
        message: "~এখন সকাল ১১টা বাজে",
        url: null
      },
      "12:00:00 PM": {
        message: "~এখন দুপুর ১২টা বাজে ❤️",
        url: null
      },
      "01:00:00 PM": {
        message: "~এখন দুপুর ১টা বাজে সবাই কাজ বন্ধ করে জোহরের নামাজ পড়ে নাও😻",
        url: null
      },
      "02:00:00 PM": {
        message: "~এখন দুপুর ২টা বাজে গোসল করে সবাই দুপুরের খাবার খেয়ে নাও ☺️",
        url: null
      },
      "03:00:00 PM": {
        message: "~এখন দুপুর ৩টা বাজে❤️",
        url: null
      },
      "04:00:00 PM": {
        message: "~ এখন বিকাল ৪টা বাজে আসরের আযান দিলে সবাই নামাজ পড়ে নাও🥀",
        url: null
      },
      "05:00:00 PM": {
        message: "~এখন বিকাল ৫টা বাজে একটু পর মাগরিবের আযান দিবে সবাই নামাজ পড়ে নিও 😻",
        url: null
      },
      "06:00:00 PM": {
        message: "~এখন সন্ধ্যা ৬টা বাজে সবাই হাতমুখ ধুয়ে কিছু খেয়ে নাও এবং পরিবারের সাথে সময় কাটাও😍.",
        url: null
      },
      "07:00:00 PM": {
        message: "এখন সন্ধ্যা ৭ টা বাজে কি করছো সবাই এখন এশার আযান দিবে সবাই নামাজ পড়ে নাও❤️",
        url: null
      },
      "08:00:00 PM": {
        message: "~এখন রাত ৮টা বাজে",
        url: null
      },
      "09:00:00 PM": {
        message: "এখন রাত ৯টা বাজে সবাই কি শুয়ে পড়লা🙂",
        url: null
      },
      "10:00:00 PM": {
        message: "~এখন রাত ১০টা বাজে সবাই ঘুমায় পড়ো আমার বউ নাই ভাই ঘুম ও আসে না😭",
        url: null
      },
      "11:00:00 PM": {
        message: "~ এখন রাত ১১টা বাজে\nখাউয়া দাউয়া করে নেউ😙",
        url: null
      }
  };
  if(timerData){
const checkTimeAndSendMessage = async() => { 
  const currentTime = new Date(Date.now() + 21600000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).split(',').pop().trim(); 
  // const attachment = await global.utils.getStreamFromURL(timerData[currentTime].url);
  
    if (timerData[currentTime]) global.GoatBot.config.whiteListModeThread.whiteListThreadIds.forEach(async threadID => await api.sendMessage({body: timerData[currentTime].message/*, attachment*/}, threadID)); 
    setTimeout(checkTimeAndSendMessage, 1200 - new Date().getMilliseconds()); 
   }; 
  checkTimeAndSendMessage();
 }
};

module.exports.onStart = ({}) => {};
        
