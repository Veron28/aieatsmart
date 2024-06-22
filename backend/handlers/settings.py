from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text
from aiogram.types import CallbackQuery

from data.texts import settings_text, utc_text, utc_edit_end, daily_goal_text, cansel_text, daily_goal_end, \
    base_change_text, daily_change_text
from db_api.dal.user_dal import UserDAL
from db_api.dal.user_info_dal import UserInfoDAL
from db_api.models import UserInfo, User
from keyboards.callback_data import setting_callback_data, utc_callback_data
from keyboards.inline.settings import settings_kb, utc_kb, daily_goal_kb, base_change_kb, daily_change_kb
from loader import dp, bot
from states.settings import SettingsStates
from utils.bot_send import send_message, edit_message


async def send_settings_mes(user_id: int, message_id: int = None):
    if message_id:
        await edit_message(
            user_id=user_id,
            message_id=message_id,
            text=settings_text,
            kb=settings_kb
        )
    else:
        await send_message(
            user_id=user_id,
            text=settings_text,
            kb=settings_kb
        )

@dp.message_handler(Text(equals='Настройки'), chat_type=[types.ChatType.PRIVATE])
async def settings(message: types.Message, state: FSMContext):
    user_id = message.chat.id
    message_id = message.message_id

    await send_settings_mes(user_id=user_id)


@dp.callback_query_handler(setting_callback_data.filter(type='base'), chat_type=[types.ChatType.PRIVATE])
async def base(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id
    await state.reset_state()

    await edit_message(
        user_id=user_id,
        message_id=message_id,
        text=base_change_text,
        kb=base_change_kb
    )

@dp.callback_query_handler(setting_callback_data.filter(type='utc'), chat_type=[types.ChatType.PRIVATE])
async def utc(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id

    try:
        utc = (await UserDAL.get(user_id=user_id)).utc
    except:
        utc = 3

    await edit_message(
        user_id=user_id,
        message_id=message_id,
        text=utc_text(utc),
        kb=utc_kb()
    )

@dp.callback_query_handler(utc_callback_data.filter(type='change'), state='*')
async def utc_change(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id
    await state.reset_state()

    callback_data = utc_callback_data.parse(
        callback_data=call.data
    )
    utc = int(callback_data['number'])

    await UserDAL.insert_or_update(
        index_elements=[User.user_id],
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

@dp.callback_query_handler(setting_callback_data.filter(type='back'), state=None)
async def back(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id

    await send_settings_mes(user_id=user_id, message_id=message_id)


@dp.callback_query_handler(setting_callback_data.filter(type='daily_goal'), state='*')
async def daily_goal_start(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id

    await edit_message(
        user_id=user_id,
        message_id=message_id,
        text=daily_change_text(await UserInfoDAL.get(user_id=user_id)),
        kb=daily_change_kb
    )

@dp.callback_query_handler(setting_callback_data.filter(type='daily_kcal_norm'), state='*')
async def daily_goal_start(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id
    await state.reset_state()

    async with state.proxy() as data:
        data['message_id'] = message_id

    await edit_message(
        user_id=user_id,
        message_id=message_id,
        text=daily_goal_text,
        kb=daily_goal_kb
    )
    await SettingsStates.await_daily_norm.set()

@dp.callback_query_handler(setting_callback_data.filter(type='сansel'), state='*')
async def cansel(call: CallbackQuery, state: FSMContext):
    user_id = call.message.chat.id
    message_id = call.message.message_id

    await state.reset_state()

    await edit_message(
        user_id=user_id,
        message_id=message_id,
        text=cansel_text
    )


@dp.message_handler(state=SettingsStates.await_daily_norm, chat_type=[types.ChatType.PRIVATE])
async def premium(message: types.Message, state: FSMContext):
    user_id = message.chat.id
    message_id = message.message_id

    text = message.text

    if text.isnumeric():
        daily_kcal_norm = text.isnumeric()
        async with state.proxy() as data:
            await bot.delete_message(
                chat_id=user_id,
                message_id=data['message_id']
            )
        await state.reset_state()
        await send_message(
            user_id=user_id,
            text=daily_goal_end
        )
        await UserInfoDAL.insert_or_update(
            index_elements=[UserInfo.user_id],
            set_={
                'daily_kcal_norm': daily_kcal_norm,
            },
            user_id=user_id,
            daily_kcal_norm=daily_kcal_norm
        )
    else:
        await send_message(
            user_id=user_id,
            text='Неправильный ввод данных. Попробуйте снова'
        )
