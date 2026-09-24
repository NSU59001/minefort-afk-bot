const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'snapfun.minefort.com',
    port: 25565,
    username: '+AFK_Bot_247',
    version: '1.21.1'
  });

  bot.on('spawn', () => {
    console.log('✅ Whitelisted Bot main server me successfully join ho gaya!');

    // Spawn / Join server fallback
    setTimeout(() => {
      bot.chat('/join snapfun');
      bot.chat('/server snapfun');
    }, 2000);

    // Anti-AFK Jump Loop (Har 15 seconds me jump karega)
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 15000);
  });

  bot.on('end', (reason) => {
    console.log(`⚠️ Disconnected: ${reason}. 5s me reconnect ho raha hai...`);
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => console.log('❌ Error:', err));
}

createBot();
