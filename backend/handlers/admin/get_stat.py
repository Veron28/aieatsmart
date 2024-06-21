from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Command

from backend.db_api.dal.user_info_dal import UserInfoDAL
from backend.filters.users_filters import IsAdmin
from backend.loader import dp
from backend.utils.bot_send import send_message


@dp.message_handler(Command('get_stat'), IsAdmin(), chat_type=[types.ChatType.PRIVATE])
async def drop_context(message: types.Message, state: FSMContext):
    user_id = message.chat.id
    user_stat_id = (message.text).replace('/get_stat', '').replace(' ', '')

    if not user_stat_id:
        user_stat_id = user_id
    else:
        if user_stat_id.isnumeric():
            user_stat_id = int(user_stat_id)

    try:
        stat = await UserInfoDAL.get_user_stat(user_id=user_stat_id)
        await send_message(
            user_id=user_id,
            text=stat
        )
        return
    except Exception as e:
        print(e)

    await send_message(
        user_id=user_id,
        text='user_id not found'
    )