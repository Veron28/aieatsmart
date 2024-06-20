import datetime

from aiogram import types
from aiogram.dispatcher.filters import Command
from aiogram.types import InputFile, Chat

from data.texts import start_text_reg, start_text_not_reg, start_text_not_reg_webapp, start_text_reg_webapp, \
    start_text_not_reg_share, start_text_reg_share
from db_api.dal.user_dal import UserDAL
from db_api.dal.user_reg_page_dal import UserRegPageDAL
from db_api.models import User
from keyboards.webapp.main import reg_kb, stat_kb
from loader import dp, bot
from utils.bot_send import send_message
from utils.premium import give_user_premium


@dp.message_handler(Command('start'), chat_type=[types.ChatType.PRIVATE], state='*')
async def start(message: types.Message):
    user_id = message.chat.id
    name = message.chat.first_name
    last_name = message.chat.last_name
    deep_link = message.get_args()

    username = ''
    if 'username' in message.chat:
        username = message.chat.username

    if await UserRegPageDAL.get(user_id=user_id, reg_page_name='final'):
        await send_message(
            user_id=user_id,
            gif=InputFile("data/video/start_video.mp4"),
            text=start_text_not_reg,
            kb=stat_kb
        )
    else:
        await send_message(
            user_id=user_id,
            gif=InputFile("data/video/start_video.mp4"),
            text=start_text_reg,
            kb=reg_kb
        )

    if not await UserDAL.get(user_id=user_id, type='active'):
        await UserDAL.insert_or_update(
            index_elements=[User.user_id],
            set_={
                'time': datetime.datetime.now(),
                'type': 'active',
                'name': name, 'last_name': last_name,
                'username': username, 'deep_link': deep_link,
            },
            user_id=user_id, name=name, last_name=last_name, username=username,
            deep_link=deep_link
        )
        await give_user_premium(user_id=user_id, days=3)


async def webapp_start(user_id: int, start_app: str):
    chat : Chat = await bot.get_chat(chat_id=user_id)
    user_id = chat.id
    name = chat.first_name
    last_name = chat.last_name

    username = ''
    if 'username' in chat:
        username = chat.username

    deep_link = ''
    if start_app.count('ad'):
        deep_link = start_app.replace('ad', '')

    who_invite = 0
    pass_ = False
    if start_app.count('invite'):
        invite = start_app.replace('invite', '')
        if invite.isnumeric():
            inviter_id = int(invite)

            if await UserDAL.get(user_id=inviter_id, type='active'):
                if not await UserDAL.get(user_id=user_id, type='active'):
                    pass_ = True
                    who_invite = inviter_id

    if pass_:
      return

    if not await UserDAL.get(user_id=user_id, type='active'):
        if await UserRegPageDAL.get(user_id=user_id, reg_page_name='final'):
            await send_message(
                user_id=user_id,
                gif=InputFile("data/video/start_video.mp4"),
                text=start_text_not_reg_webapp,
                kb=stat_kb
            )
        else:
            await send_message(
                user_id=user_id,
                gif=InputFile("data/video/start_video.mp4"),
                text=start_text_reg_webapp,
                kb=reg_kb
            )
        await UserDAL.insert_or_update(
            index_elements=[User.user_id],
            set_={
                'time': datetime.datetime.now(),
                'type': 'active',
                'name': name, 'last_name': last_name,
                'username': username, 'deep_link': deep_link,
                'who_invite': who_invite
            },
            user_id=user_id, name=name, last_name=last_name, username=username,
            deep_link=deep_link, who_invite=who_invite
        )
        await give_user_premium(user_id=user_id, days=3)

async def share_stat_check_user(user_id: int, user_id_to_share: int):
    chat : Chat = await bot.get_chat(chat_id=user_id)
    user_id = chat.id
    name = chat.first_name
    last_name = chat.last_name

    username = ''
    if 'username' in chat:
        username = chat.username

    who_invite = user_id_to_share
    if not await UserDAL.get(user_id=user_id, type='active'):
        if await UserRegPageDAL.get(user_id=user_id, reg_page_name='final'):
            await send_message(
                user_id=user_id,
                gif=InputFile("data/video/start_video.mp4"),
                text=start_text_not_reg_share,
                kb=stat_kb
            )
        else:
            await send_message(
                user_id=user_id,
                gif=InputFile("data/video/start_video.mp4"),
                text=start_text_reg_share,
                kb=reg_kb
            )
        await UserDAL.insert_or_update(
            index_elements=[User.user_id],
            set_={
                'time': datetime.datetime.now(),
                'type': 'active',
                'name': name, 'last_name': last_name,
                'username': username, 'deep_link': '',
                'who_invite': who_invite
            },
            user_id=user_id, name=name, last_name=last_name, username=username,
            deep_link='', who_invite=who_invite
        )
        await give_user_premium(user_id=user_id, days=3)