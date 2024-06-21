from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text

from data.texts import settings_text
from loader import dp
from utils.bot_send import send_message


@dp.message_handler(Text(equals='Premium'), chat_type=[types.ChatType.PRIVATE])
async def premium(message: types.Message, state: FSMContext):
    user_id = message.chat.id
    message_id = message.message_id

    await send_message(
        user_id=user_id,
        text=settings_text
    )