process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');

const fs = require('fs');

const cron = require('node-cron');

// токен от @BotFather
const token = '927361391:AAH6nY0_OblVfoCtaczLhZcbXmhEaLZmNxM';

// создание задания для бота
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id; // айди чата
  const textMs = msg.text; //текст входящего сообщения
  bot.sendMessage(chatId, 'Ты подписался на ежеминутную рассылку');

  cron.schedule('* * * * *', () => {
    try {
      var data = fs.readFileSync('file.txt', 'utf8'); //чтение файла
      bot.sendMessage(chatId, data);    //отправляем файл
    } catch(e) {
        bot.sendMessage(chatId, 'ошибка нет файла');
      }
  });

});