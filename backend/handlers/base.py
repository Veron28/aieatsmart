import base64
import io

from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.types import ChatType, Message, ContentType, CallbackQuery

from db_api.dal.user_history_dal import UserHistoryDAL
from keyboards.callback_data import photo_cal_callback_data
from keyboards.inline.photo import calories_kb
from loader import dp, bot
from openai.dialog import dialog_request
from openai.payload import payload
from openai.prompting.dialog import chating_system_prompt
from utils.bot_send import send_message, edit_message
from utils.get_user_data import get_user_data


async def send_request(user_id, message_id, state: FSMContext, text=None, photo=None):
    await bot.send_chat_action(user_id, action=types.ChatActions.TYPING)

    async with state.proxy() as data:
        if 'messages' not in data:
            data['system'] = {
                    "role": "system",
                    "content": chating_system_prompt(await get_user_data(user_id=user_id))
                }
            data['messages'] = []
        if photo and text:
            data['messages'].append(
                {"role": "user", "content":
                    [
                        {
                            "type": "text",
                            "text": text
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{photo}"
                            }
                        }
                    ]
                }
            )
        elif photo:
            data['messages'].append(
                {"role": "user", "content":
                    [
                        {
                            "type": "text",
                            "text": 'None text'
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{photo}"
                            }
                        }
                    ]
                 }
            )
        else:
            data['messages'].append(
                {"role": "user", "content": text}
            )
        messages = data['messages']
        messages.insert(0, data['system'])

        payload_ = payload(messages=messages)
        text_to_user, text_to_messages, is_food = await dialog_request(user_id, message_id, payload_)

        if text_to_messages:
            data['messages'].append(
                {
                    "role": "assistant",
                    "content": text_to_messages
                }
            )

        kb = None
        if is_food:
            kb = calories_kb(user_id=user_id, message_id=message_id)

        await send_message(
            user_id=user_id,
            text=text_to_user,
            reply_to_message_id=message_id,
            kb=kb
        )

@dp.message_handler(state=None, content_types=[ContentType.PHOTO], chat_type=[ChatType.PRIVATE])
async def photo_ask(message: Message, state: FSMContext):
    user_id = message.chat.id
    message_id = message.message_id
    text = message.text

    file_in_io = io.BytesIO()
    await message.photo[-1].download(destination_file=file_in_io)
    photo = base64.b64encode(file_in_io.getvalue()).decode('utf-8')

    await send_request(user_id, message_id, state, text, photo)

@dp.message_handler(state=None, chat_type=[ChatType.PRIVATE])
async def text_ask(message: Message, state: FSMContext):
    user_id = message.chat.id
    message_id = message.message_id
    text = message.text

    await send_request(user_id, message_id, state, text)

@dp.callback_query_handler(photo_cal_callback_data.filter(action=['add']))
async def calories_count(call: CallbackQuery, state=FSMContext):
    callback_data = photo_cal_callback_data.parse(
        callback_data=call.data
    )
    user_id = int(callback_data['user_id'])
    message_id = int(callback_data['message_id'])

    await UserHistoryDAL.update(
        where={'user_id': user_id,
        'message_id':message_id},
        is_eat=True
    )

    await edit_message(
        user_id=user_id,
        message_id=call.message.message_id,
        text='Блюдо добавлено в историю'
    )


