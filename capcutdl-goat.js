const axios = require('axios');
let Romim,ApiReq, Response,download;
module.exports.config={
  name:"capcutdl",
  author:"Romim",
  category:"𝙲𝚞𝚙𝙲𝚞𝚝 𝚅𝚒𝚍𝚎𝚘 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚛 "
}
module.exports.onStart = async({args,api,event}) =>{
  Romim = args.join("");
  const {threadID, messageID} = event;
  try {
     ApiReq = await axios.get(`https://mostakim.onrender.com/cupcutdl?link=${Romim}`)
    Response = ApiReq.data;
    const {eurixmp4,title,like,description} = Response;
   download = await axios.get(eurixmp4,{responseType: 'stream'})
   api.sendMessage({body:`Your Link : ${Romim}\n title:${title}\nlike:${like}\ndescription:${description}`,attachment: download.data},threadID,messageID);
  } catch (error) {
    api.sendMessage(`${error.messafe}`,threadID,messageID)
  }
}
