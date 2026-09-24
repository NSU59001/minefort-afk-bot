const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'snapfun.minefort.com',
    port: 25565,
    username: 'AFK_Bot_247',
    version: '1.21.1'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot lobby / captcha room me enter ho gaya hai!');
    
    // Auto jump har 15 seconds me
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 15000);
  });

  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString();
    console.log('[CHAT]:', message);

    // 1. Agar Chat me '/captcha' aaye toh solve karein
    if (message.includes('/captcha')) {
      const match = message.match(/\/captcha\s+([a-zA-Z0-9]+)/);
      if (match) {
        const code = match[1];
        setTimeout(() => {
          bot.chat(`/captcha ${code}`);
          console.log(`🤖 Captcha code send kiya: /captcha ${code}`);
          
          // Captcha ke 2 second baad main server join karne ki command
          setTimeout(() => {
            bot.chat('/join'); // Minefort me server switch / join ke liye
            bot.chat('/server snapfun'); // Direct server join
          }, 2000);
        }, 1000);
      }
    }

    // 2. Agar verification success ka message aaye
    if (message.toLowerCase().includes('success') || message.toLowerCase().includes('verified')) {
      setTimeout(() => {
        bot.chat('/join');
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
