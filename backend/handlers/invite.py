from aiogram.dispatcher import FSMContext
from aiogram.types import CallbackQuery

from data.texts import share_text
from keyboards.callback_data import payment_callback_data
from loader import dp
from utils.bot_send import edit_message


@dp.callback_query_handler(payment_callback_data.filter(type='invite'), state=None)
async def invite(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id

    await edit_message(
        user_id=user_id,
        message_id=message_id,
        text=await share_text(user_id=user_id)
    )