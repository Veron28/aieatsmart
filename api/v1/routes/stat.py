import traceback

from aiohttp.web_request import Request
from aiohttp.web_response import json_response

from data.texts import registration_end_message
from utils.auth_checker import status_by_request
from utils.bot_send import send_message


class Stat:
    @staticmethod
    async def get_stat(request: Request):
        response_obj = await status_by_request(request)
        try:
            if response_obj['status']:
                user_id = int(response_obj['status'])
                response_obj['status'] = bool(response_obj['status'])
                response_obj['stat'] = {
                    'is_stat': True,
                    'fats': 150,
                    'carbohydrates': 150,
                    'squirrels': 150,
                    'meals': {
                        'current': 1,
                        'total': 3,
                    },
                    'eaten': 1200,
                    'left': 800
                }
            else:
                response_obj['status'] = False
                response_obj['text'] = 'user not authorized'

        except Exception as e:
            response_obj['status'] = False
            response_obj['text'] = f'Error: {e}'

        return json_response(response_obj)