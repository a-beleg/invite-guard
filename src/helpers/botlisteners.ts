import { Message } from 'node-telegram-bot-api';
import { UrbanBotTelegram } from '@urban-bot/telegram';

const setupBotListeners = (bot: UrbanBotTelegram) => {
    bot.client.on('message', async (msg: Message) => {
        try {
            const { chat, message_id, text } = msg;
            if (text !== '/start') {
                await bot.client.deleteMessage(msg.chat.id, String(msg.message_id));
            }
            if (text != null) {
                const existingMessage = await bot.client.editMessageText(text, {
                    chat_id: chat.id,
                    message_id: message_id,
                });
                if (typeof existingMessage !== 'boolean' && existingMessage.text === text) {
                    console.log('Message content is the same. Skipping edit.');
                    return;
                }
            }
        } catch (error) {
            console.error();
        }
    });
    bot.client.on('polling_error', console.log);
    bot.client.on('error', console.log);
};

export { setupBotListeners };
