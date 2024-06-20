import traceback

from aiohttp.web_request import Request
from aiohttp.web_response import json_response

from data.texts import registration_end_message, share_text
from utils.auth_checker import status_by_request
from utils.bot_send import send_message


class Stat:
    @staticmethod
    async def share_stat(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        if response_obj['status']:
            user_id = response_obj['user_id']
            await send_message(
                user_id=user_id,
                text=await share_text(user_id=user_id)
            )
            response_obj['text'] = 'send message to user'
        else:
            response_obj['text'] = 'some error'

        return json_response(response_obj)
