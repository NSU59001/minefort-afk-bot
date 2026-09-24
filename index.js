const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'snapfun.minefort.com', // Aapka server host[cite: 1]
    port: 25565,                  // Java Port[cite: 1]
    username: 'AFK_Bot_247',
    version: '1.21.1'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot successfully server me join ho gaya hai!');

    // Anti-AFK Jump Loop
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 20000);
  });

  // Auto-Captcha Resolver
  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString();
    console.log('[CHAT]:', message);

    if (message.includes('/captcha')) {
      const match = message.match(/\/captcha\s+([a-zA-Z0-9]+)/);
      if (match) {
        const code = match[1];
        setTimeout(() => {
          bot.chat(`/captcha ${code}`);
          console.log(`🤖 Auto-Sent Captcha: /captcha ${code}`);
        }, 1000);
      }
    }
  });

  bot.on('end', (reason) => {
    console.log(`⚠️ Disconnected: ${reason}. Reconnecting...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('❌ Error:', err));
}

createBot();
