import json
from base64 import b64encode

from aiohttp.web_request import Request
from aiohttp.web_response import json_response, Response

from backend.api.v1.routes.registration import Registration
from backend.api.v1.routes.stat import Stat
from backend.handlers.start import webapp_start, share_stat_check_user
from backend.utils.auth_checker import status_by_request
from backend.utils.stat_and_reg import stat_or_reg
from backend.utils.user_stat import get_user_stat


class Base64Encoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, bytes):
            return b64encode(0).decode()
        return json.JSONEncoder.default(self, o)


class Routes(Registration, Stat):
    @staticmethod
    async def auth(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        response_obj['is_share'] = False
        try:
            data = await request.json()
        except:
            data = await request.post()

        print('data: ', data)
        if not response_obj['status']:
            # add error to db
            response_obj['text'] = 'some error with auth'
            return json_response(response_obj)

        user_id = response_obj['user_id']

        start_app = ''
        if 'start_app' in data and 'share_stat' not in data:
            start_app = data['start_app']
        await webapp_start(user_id=user_id, start_app=start_app)

        if 'share_stat' in data:
            if not str(data['share_stat']).isnumeric():
                response_obj['status'] = False
                response_obj['text'] = 'bad share_stat user_id'
                return json_response(response_obj)

            user_id_to_share = int(data['share_stat'])
            await share_stat_check_user(user_id=user_id, user_id_to_share=user_id_to_share)
            user_stat = await get_user_stat(user_id=user_id_to_share)

            if user_stat['status']:
                response_obj['is_share'] = True
                response_obj.update(user_stat)
            else:
                response_obj['status'] = False
                response_obj['text'] = 'user not found'
            return json_response(response_obj)

        response_obj.update(await stat_or_reg(user_id=user_id))
        return Response(
            text=json.dumps(response_obj, ensure_ascii=False),
            status=200,
            content_type="application/json",
        )