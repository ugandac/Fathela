const {zokou} = require("../framework/zokou");
const conf = require("../set")
const {jidDecode}=require("@whiskeysockets/baileys")


zokou( {
  nomCom : "profile",
 categorie : "Fun",
   },
      async(dest,zk, commandeOptions)=> {

        const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu} = commandeOptions ;
        let jid = null 
          let nom = null ;

          



        if (!msgRepondu) {
            jid = auteurMessage;
           nom = nomAuteurMessage;

        let ppUrl;
        try {
            ppUrl = await zk.profilePictureUrl(auteurMessage, 'image');
        } catch {
            ppUrl = "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg";
        }

        let status;
        try {
            status = await zk.fetchStatus(auteurMessage);
        } catch (error) {
            status = { status: "About not accessible due to user privacy" };
        }

        const mess = {
            image: { url: ppUrl },
            caption: 'Name: ' + name + '\nAbout:\n' + status.status
        };

        await client.sendMessage(m.chat, mess, { quoted: m });

    } else {
        auteurMessage = m.quoted.sender;
        name = "@" + m.quoted.sender.split("@")[0];

        let ppUrl;
        try {
            ppUrl = await zk.profilePictureUrl(auteurMessage, 'image');
        } catch {
            ppUrl = "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg";
        }

        let status;
        try {
            status = await zk.fetchStatus(auteurMessage);
        } catch (error) {
            status = { status: "About not accessible due to user privacy" };
        }

        const mess = {
            image: { url: ppUrl },
            caption: 'Name: ' + name + '\nAbout:\n' + status.status,
            mentions: [m.quoted.sender]
        };

        await zk.sendMessage(m.chat, mess, { quoted: m });
    }
};
