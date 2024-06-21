from typing import Union

from aiohttp.web_request import Request

from api.v1.web_app import safe_parse_webapp_init_data
from db_api.dal.user_dal import UserDAL
from loader import bot


async def _is_auth_by_init_data(init_data: str) -> Union[bool, int]:
    try:
        web_app_data = safe_parse_webapp_init_data(
            token=bot._token,
            init_data=init_data
        )
        return int(web_app_data['user']['id'])
    except:
        return False


async def status_by_request(request: Request, in_db: bool = False, return_id: bool = True) -> dict:
    response_obj = {}

    try:
        headers = request.headers
        if 'Authorization' in headers:

            _auth = headers.get('Authorization').replace('Bearer ', '')
            user_id = await _is_auth_by_init_data(_auth)
            if user_id:
                if in_db:
                    if await UserDAL.get(
                            user_id=user_id,
                            type='active'
                    ):
                        response_obj['status'] = True
                    else:
                        response_obj['status'] = False
                else:
                    response_obj['status'] = True
            else:
                response_obj['status'] = False
        else:
            response_obj['status'] = False
    except:
        response_obj['status'] = False

    if return_id:
        if response_obj['status']:
            response_obj['status'] = True
            response_obj['user_id'] = user_id

    if not response_obj['status']:
        #test version
        response_obj['status'] = True
        if return_id:
            response_obj['user_id'] = 398015513

    return response_obj