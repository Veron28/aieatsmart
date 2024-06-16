export default async function handler(req, res) {
        const {
            body
        } = req;

        // Example: Respond to '/start' command
        if (body.message && body.message.text === '/start') {
            const chatId = body.message.chat.id;
            const responseText = "Welcome to my Telegram bot! Click the link to visit the app: https://your-vercel-app.vercel.app";

            const sendMessageUrl = `https://api.telegram.org/bot7226911794:AAFzsxnXyd-3hfLZs4xmSZ1j7BgLvm50I54/sendMessage`;

            await fetch(sendMessageUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: responseText,
                }),
            });

            return res.status(200).json
