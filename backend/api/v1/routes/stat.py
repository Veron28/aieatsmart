import json

from aiohttp.web_request import Request
from aiohttp.web_response import json_response, Response

from data.texts import share_text
from utils.auth_checker import status_by_request
from utils.bot_send import send_message
from utils.stat_and_reg import stat_or_reg


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

    @staticmethod
    async def get_user_data(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        if response_obj['status']:
            user_id = response_obj['user_id']
            response_obj.update(await stat_or_reg(user_id=user_id, get_data=True))
        else:
            response_obj['status'] = False
            response_obj['text'] = 'user not found'
        return Response(
            text=json.dumps(response_obj, ensure_ascii=False),
            status=200,
            content_type="application/json",
        )

