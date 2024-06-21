from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text
from aiogram.types import CallbackQuery

from data.texts import settings_text, utc_text, utc_edit_end
from db_api.dal.utc_dal import UtcDAL
from db_api.models import Utc
from keyboards.callback_data import setting_callback_data, utc_callback_data
from keyboards.inline.settings import settings_kb, utc_kb
from loader import dp
from utils.bot_send import send_message, edit_message


@dp.message_handler(Text(equals='Настройки'), chat_type=[types.ChatType.PRIVATE])
async def premium(message: types.Message, state: FSMContext):
    user_id = message.chat.id
    message_id = message.message_id

    await send_message(
        user_id=user_id,
        text=settings_text,
        kb=settings_kb
    )

@dp.callback_query_handler(setting_callback_data.filter(type='utc'), state=None)
async def utc(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id

    await edit_message(
        user_id=user_id,
        message_id=message_id,
        text=utc_text,
        kb=utc_kb
    )

@dp.callback_query_handler(utc_callback_data.filter(type='change'), state=None)
async def utc_change(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id

    callback_data = utc_callback_data.parse(
        callback_data=call.data
    )
    utc = int(callback_data['number'])
    await UtcDAL.insert_or_update(
        index_elements=[Utc.user_id],
        set_={
            'utc': utc
        },
        user_id=user_id, utc=utc
    )

    await edit_message(
        user_id=user_id,
        message_id=message_id,
        text=utc_edit_end
    )