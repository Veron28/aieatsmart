import datetime
import random

from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Command

from backend.db_api.dal.user_history_dal import UserHistoryDAL
from backend.filters.users_filters import IsAdmin
from backend.loader import dp
from backend.utils.bot_send import send_message


@dp.message_handler(Command('add_eat'), IsAdmin(), chat_type=[types.ChatType.PRIVATE])
async def drop_context(message: types.Message, state: FSMContext):
    user_id = message.chat.id
    user_eat_id = (message.text).replace('/add_eat', '').replace(' ', '')

    if not user_eat_id:
        user_eat_id = user_id
    else:
        if user_eat_id.isnumeric():
            user_eat_id = int(user_eat_id)

    try:
        await UserHistoryDAL.add(
            user_id=user_eat_id,
            message_id=message.message_id,
            prompt_id=0,
            is_eat=True,
            time=datetime.datetime.now(),
            food_name='пиво',
            kcal=random.randint(350, 700),
            grams=random.randint(100, 200),
            squirrels = random.randint(100, 200),
            fats = random.randint(100, 200),
            carbohydrates=random.randint(100, 200),
        )
        await send_message(
            user_id=user_id,
            text='add'
        )
        return
    except:
        pass

    await send_message(
        user_id=user_id,
        text='user_id not found'
    )