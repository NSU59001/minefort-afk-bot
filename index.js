const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'snapfun.minefort.com',
    port: 25565,
    username: 'AFK_Bot_247',
    version: '1.21.1'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot joined directly into main world!');
    
    // AFK Anti-Kick Loop
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 15000);
  });

  bot.on('end', () => setTimeout(createBot, 5000));
  bot.on('error', (err) => console.log('❌ Error:', err));
}

createBot();
