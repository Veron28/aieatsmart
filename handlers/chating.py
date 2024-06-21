import base64
import datetime
import io
import json

from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text
from aiogram.types import ContentType, Message, ChatType, CallbackQuery

from data.texts import cal_text
from db_api.dal.user_history_dal import UserHistoryDAL
from keyboards.callback_data import photo_cal_callback_data
from keyboards.inline.photo import calories_kb
from loader import dp, bot
from openai.base import openai_request
from openai.prompting.photo_texts import ask_calories
from openai.prompting.system_texts import base_text
from openai.registration import payload
from utils.bot_send import send_message, edit_message
from utils.get_user_data import get_user_data

@dp.message_handler(Text(equals='Питание'), state='*', chat_type=[ChatType.PRIVATE])
async def text_ask(message: Message, state: FSMContext):
    user_id = message.chat.id
    await send_message(
        user_id=user_id,
        text='Отправь мне фото блюдо, которое съел или собираешься съесть, чтобы узнать о нем важную информацию и получить рекомеднацию'
    )

@dp.message_handler(Text(equals='Рекомендации'), state='*', chat_type=[ChatType.PRIVATE])
async def text_ask(message: Message, state: FSMContext):
    user_id = message.chat.id
    await send_message(
        user_id=user_id,
        text='Задай мне о правильном питании и я отвечу на него, исходя из твой данных и истории питания'
    )

@dp.message_handler(state=None, chat_type=[ChatType.PRIVATE])
async def text_ask(message: Message, state: FSMContext):
    user_id = message.chat.id
    text_ = message.text

    async with state.proxy() as data:
        if 'messages' not in data:
            data['messages'] = [
                {
                    "role": "system",
                    "content": base_text(await get_user_data(user_id=user_id))
                }
            ]
        data['messages'].append(
            {"role": "user", "content": text_}
        )
        openai_request_answer = await openai_request(payload=payload(messages=data['messages']))
        print(openai_request_answer)
        openai_request_answer_json = openai_request_answer['choices'][0]['message']['content']
        data['messages'].append(
            {
                "role": "assistant",
                "content": openai_request_answer_json
            }
        )
        await send_message(
            user_id=user_id,
            text=openai_request_answer_json
        )


@dp.message_handler(state=None, content_types=[ContentType.PHOTO], chat_type=[ChatType.PRIVATE])
async def photo_ask(message: Message, state=FSMContext):
    user_id = message.chat.id
    message_id = message.message_id
    file_in_io = io.BytesIO()
    await message.photo[-1].download(destination_file=file_in_io)

    async with state.proxy() as data:
        data['message_id'] = message_id
        if 'messages' not in data:
            data['messages'] = [
                {
                    "role": "system",
                    "content": base_text(await get_user_data(user_id=user_id))
                }
            ]
        data['messages'].append(
            {"role": "user", "content":
                [
                {
                    "type": "text",
                    "text": ask_calories
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64.b64encode(file_in_io.getvalue()).decode('utf-8')}"
                    }
                }
            ]
            }
        )
        openai_request_answer = await openai_request(payload=payload(messages=data['messages']))
        openai_request_answer_json = openai_request_answer['choices'][0]['message']['content']
        data['messages'].append(
            {
                "role": "assistant",
                "content": openai_request_answer_json
            }
        )
        try:
            openai_request_answer_json = json.loads(openai_request_answer_json)
        except:
            await send_message(
                user_id=user_id,
                text='Произошла ошибка. Попробуйте снова.'
            )

        if openai_request_answer_json['is_food'] == 'true':
            text_ = cal_text(openai_request_answer_json)
            try:
                await UserHistoryDAL.add(
                    user_id=user_id,
                    message_id=data['message_id'],
                    prompt_id=0,
                    time=datetime.datetime.now(),
                    food_name=openai_request_answer_json['food_name'],
                    kcal=int(openai_request_answer_json['calories']),
                    grams=int(openai_request_answer_json['grams']),
                    squirrels=int(openai_request_answer_json['squirrels']),
                    fats=int(openai_request_answer_json['fats']),
                    carbohydrates=int(openai_request_answer_json['carbohydrates']),
                    recommendation=openai_request_answer_json['carbohydrates']
                )
            except:
                pass
            await send_message(
                user_id=user_id,
                text=text_,
                kb=calories_kb(user_id=user_id, message_id=data['message_id']),
                reply_to_message_id=data['message_id']
            )

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
    # await bot.edit_message_reply_markup(
    #     chat_id=user_id,
    #     message_id=message_id
    # )
    await edit_message(
        user_id=user_id,
        message_id=call.message.message_id,
        text='Блюдо добавлено в историю'
    )
