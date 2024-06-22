import datetime
import json

from aiogram.dispatcher import FSMContext

from data.texts import error_text, cal_text
from db_api.dal.user_history_dal import UserHistoryDAL
from openai.base import openai_request


async def dialog_request(user_id, message_id, payload_):
    is_food = False
    openai_request_answer_text = None

    try:
        openai_request_answer = await openai_request(payload=payload_)
        openai_request_answer_text = openai_request_answer['choices'][0]['message']['content']

        openai_request_answer_json = json.loads(openai_request_answer_text, strict=False)

        if openai_request_answer_json.get('is_food') == 'true':
            is_food = True
            text_to_user = cal_text(openai_request_answer_json)

            await UserHistoryDAL.add(
                user_id=user_id,
                message_id=message_id,
                prompt_id=0,
                time=datetime.datetime.now(),
                food_name=openai_request_answer_json['food_name'],
                kcal=int(openai_request_answer_json['calories']),
                grams=int(openai_request_answer_json['grams']),
                squirrels=int(openai_request_answer_json['squirrels']),
                fats=int(openai_request_answer_json['fats']),
                carbohydrates=int(openai_request_answer_json['carbohydrates']),
                recommendation=openai_request_answer_json['text']
            )
        else:
            text_to_user = openai_request_answer_json.get('text')
    except Exception as e:
        print(e)
        text_to_user = error_text

    return text_to_user, openai_request_answer_text, is_food