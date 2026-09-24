const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'snapfun.minefort.com',
    port: 25565,
    username: '+AFK_Bot_247', // Aage '+' lagaya hai kyunki console me '+AFK_Bot_247' dikh raha hai
    version: '1.21.1'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot successfully main world me spawn ho gaya!');

    // Anti-AFK Jump Loop (Har 15 sec me jump karega)
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 15000);
  });

  // Automatically Captcha solve + Auto join main server
  bot.on('message', (jsonMsg) => {
    const msg = jsonMsg.toString();
    console.log('[CHAT]:', msg);

    // Agar kisi captcha ki command aaye
    const match = msg.match(/\/captcha\s+([a-zA-Z0-9]+)/i);
    if (match) {
      setTimeout(() => {
        bot.chat(`/captcha ${match[1]}`);
        console.log(`🤖 Auto Captcha Sent: /captcha ${match[1]}`);
      }, 1000);
    }
  });

  bot.on('end', (reason) => {
    console.log(`⚠️ Disconnected: ${reason}. Reconnecting in 10s...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('❌ Error:', err));
}

createBot();
