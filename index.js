const mineflayer = require('mineflayer');
const https = require('https');

// Apna Discord Webhook URL yahan dalein
const WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE'; 

function sendDiscordAlert(msg) {
  if (!WEBHOOK_URL || WEBHOOK_URL.includes('YOUR_DISCORD')) return;
  const data = JSON.stringify({ content: msg });
  const url = new URL(WEBHOOK_URL);
  
  const req = https.request({
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  });
  req.write(data);
  req.end();
}

function createBot() {
  const bot = mineflayer.createBot({
    host: 'snapfun.minefort.com',
    port: 25565,
    username: 'AFK_Bot_247',
    version: '1.21.1'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot Limbo/Lobby me enter ho gaya hai!');
    sendDiscordAlert('🤖 **Bot Join Hua:** Limbo/Captcha Room me hai.');
    
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 15000);
  });

  bot.on('message', (jsonMsg) => {
    const msg = jsonMsg.toString();
    console.log('[CHAT]:', msg);

    // Chat me captcha command check karna
    const match = msg.match(/\/captcha\s+([a-zA-Z0-9]+)/i);
    if (match) {
      const code = match[1];
      setTimeout(() => {
        bot.chat(`/captcha ${code}`);
        console.log(`🤖 Auto-Sent Captcha: /captcha ${code}`);
        sendDiscordAlert(`✅ Captcha Auto-Solved: \`/captcha ${code}\``);
      }, 1000);
    } else if (msg.toLowerCase().includes('captcha') || msg.toLowerCase().includes('please enter')) {
      sendDiscordAlert(`⚠️ **Captcha Warning:** Chat me captcha maanga gaya hai: \`${msg}\``);
    }
  });

  bot.on('end', (reason) => {
    console.log(`⚠️ Disconnected: ${reason}`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('❌ Error:', err));
}

createBot();
