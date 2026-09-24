const mineflayer = require('mineflayer');
const { PNG } = require('pngjs');
const axios = require('axios');
const FormData = require('form-data');

// Apna Discord Webhook URL yahan dalein
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';

function sendMapToDiscord(pngBuffer) {
  if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes('YOUR_DISCORD')) return;

  const form = new FormData();
  form.append('content', '⚠️ **Minefort Captcha Detected!** Photo dekhein aur Discord bot/command se code bhejein:');
  form.append('file', pngBuffer, { filename: 'captcha_map.png' });

  axios.post(DISCORD_WEBHOOK_URL, form, {
    headers: form.getHeaders()
  }).then(() => console.log('📸 Captcha image Discord par bhej di gayi hai!'))
    .catch(err => console.log('❌ Discord send error:', err.message));
}

function createBot() {
  const bot = mineflayer.createBot({
    host: 'snapfun.minefort.com',
    port: 25565,
    username: '+AFK_Bot_247',
    version: '1.21.1'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot joined network!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 15000);
  });

  // Map Captcha Packet Receiver
  bot.on('map', (id, data) => {
    console.log(`🗺️ Map packet received (ID: ${id})`);
    
    // 128x128 Minecraft Map PNG Conversion
    const png = new PNG({ width: 128, height: 128 });
    for (let i = 0; i < data.length; i++) {
      const idx = i * 4;
      const val = data[i];
      png.data[idx] = val;     // Red
      png.data[idx + 1] = val; // Green
      png.data[idx + 2] = val; // Blue
      png.data[idx + 3] = 255;  // Alpha
    }

    PNG.sync.write(png);
    const buffer = PNG.sync.write(png);
    sendMapToDiscord(buffer);
  });

  bot.on('message', (jsonMsg) => {
    const msg = jsonMsg.toString();
    console.log('[CHAT]:', msg);

    // Dynamic Captcha Auto-Solve (agar text base aaye)
    const match = msg.match(/\/captcha\s+([a-zA-Z0-9]+)/i);
    if (match) {
      setTimeout(() => bot.chat(`/captcha ${match[1]}`), 1000);
    }
  });

  bot.on('end', () => setTimeout(createBot, 5000));
  bot.on('error', (err) => console.log('❌ Error:', err));
}

createBot();
