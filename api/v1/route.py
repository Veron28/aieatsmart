import io
import json
import logging as log
import traceback
from base64 import b64encode

import aiohttp_jinja2
from aiohttp import web
from aiohttp.web_request import Request
from aiohttp.web_response import json_response

from api.v1.routes.registration import Registration
from api.v1.routes.stat import Stat
from handlers.start import webapp_start
from utils.auth_checker import _is_auth_by_init_data, status_by_request
from utils.send_share_link import send_share_link
from utils.share import share_stat_check_user
from utils.stat_and_reg import stat_or_reg
from utils.user_stat import get_user_stat


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

        if 'start_app' in data or not response_obj['status']:
            await webapp_start(user_id=user_id, start_app=data['start_app']) # need to write funct

        if 'share_stat' in data:
            user_id_to_share = data['share_stat']
            await share_stat_check_user(user_id=user_id)  # need to write funct
            user_stat = await get_user_stat(user_id=user_id_to_share)  # need to write funct

            if user_stat:
                response_obj['is_share'] = True
                response_obj['stat'] = user_stat
            else:
                response_obj['status'] = False
                response_obj['text'] = 'user not found'
            return json_response(response_obj)

        response_obj.update(await stat_or_reg(user_id=user_id))  # need to write funct

        return json_response(response_obj)

    # just my mind
    #
    # if user not auth:
    #     need registration + send add to db + take deep link
    #     + if deeplink invites send prize to friend
    # else:
    #     if not registred:
    #         need registration
    #     else:
    #         send stat