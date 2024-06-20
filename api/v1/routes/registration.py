import datetime
import traceback

from aiohttp.web_request import Request
from aiohttp.web_response import json_response

from data.texts import registration_end_message
from db_api.dal.user_dal import UserDAL
from db_api.dal.user_health_dal import UserHealthDAL
from db_api.dal.user_info_dal import UserInfoDAL
from db_api.dal.user_limit_dal import UserLimitDAL
from db_api.dal.user_reg_page_dal import UserRegPageDAL
from db_api.models import User, UserInfo, UserHealth
from utils.auth_checker import status_by_request
from utils.bot_send import send_message
from utils.daily_norm import count_user_daily_norm


class Registration:
    @staticmethod
    async def user_reg_start(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        if response_obj['status']:
            user_id = response_obj['user_id']

            await UserRegPageDAL.add(
                user_id=user_id,
                reg_page_name='auth_start'
            )
            response_obj['text'] = 'add to db'
        else:
            response_obj['text'] = 'some error'

        return json_response(response_obj)

    @staticmethod
    async def user_main_info(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        if response_obj['status']:
            try:
                data = await request.json()
            except:
                data = await request.post()

            if 'gender' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'gender not in data'
            elif 'weight' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'weight not in data'
            elif 'height' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'height not in data'
            elif 'age' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'age not in data'
            if not response_obj['status']:
                return json_response(response_obj)

            user_id = response_obj['user_id']
            weight = data['weight']
            height = data['height']
            gender = data['gender']
            age = data['age']

            try:
                await UserInfoDAL.insert_or_update(
                    index_elements=[UserInfo.user_id],
                    set_={
                        'weight': weight,
                        'height': height,
                        'gender': gender,
                        'age': age
                    },
                    user_id=user_id, weight=weight, height=height, gender=gender, age=age)
                await UserRegPageDAL.add(
                    user_id=user_id,
                    reg_page_name='main_info'
                )
                response_obj['text'] = 'add to db'
            except Exception as e:
                print(e)
                response_obj['text'] = 'types error'
        else:
            response_obj['text'] = 'some error'
        return json_response(response_obj)

    @staticmethod
    async def user_health_info(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        if response_obj['status']:
            try:
                data = await request.json()
            except:
                data = await request.post()
            user_id = response_obj['user_id']

            if 'base' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'base option not send'
            if not response_obj['status']:
                return json_response(response_obj)

            healt_permissions = []
            for permission in data['base']:
                healt_permissions.append(UserHealth(user_id=user_id, type='base', text=permission))

            if 'custom' in data:
                healt_permissions.append(UserHealth(user_id=user_id, type='custom', text=data['custom']))
            print(healt_permissions)
            try:
                await UserHealthDAL.delete(user_id=user_id)
                await UserHealthDAL.adds(*healt_permissions)
                await UserRegPageDAL.add(
                    user_id=user_id,
                    reg_page_name='health_info'
                )
                response_obj['text'] = 'add to db'
            except Exception as e:
                print(e)
                response_obj['text'] = 'types error'
        else:
            response_obj['text'] = 'some error'
        return json_response(response_obj)

    @staticmethod
    async def user_goal_info(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        if response_obj['status']:
            try:
                data = await request.json()
            except:
                data = await request.post()

            if 'goal' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'goal not in data'
            if not response_obj['status']:
                return json_response(response_obj)

            user_id = response_obj['user_id']
            goal = data['goal']

            try:
                await UserInfoDAL.insert_or_update(
                    index_elements=[UserInfo.user_id],
                    set_={
                        'goal': goal,
                    },
                    user_id=user_id, goal=goal)
                await UserRegPageDAL.add(
                    user_id=user_id,
                    reg_page_name='goal_info'
                )
                response_obj['text'] = 'add to db'
            except Exception as e:
                print(e)
                response_obj['text'] = 'types error'
        else:
            response_obj['text'] = 'some error'
        return json_response(response_obj)

    @staticmethod
    async def user_limit_info(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        if response_obj['status']:
            try:
                data = await request.json()
            except:
                data = await request.post()
            user_id = response_obj['user_id']

            if 'base' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'base option not send'
            if not response_obj['status']:
                return json_response(response_obj)

            eat_permissions = []
            for permission in data['base']:
                eat_permissions.append(UserHealth(user_id=user_id, type='base', text=permission))

            if 'custom' in data:
                eat_permissions.append(UserHealth(user_id=user_id, type='custom', text=data['custom']))
            print(eat_permissions)
            try:
                await UserLimitDAL.delete(user_id=user_id)
                await UserLimitDAL.adds(*eat_permissions)
                await UserRegPageDAL.add(
                    user_id=user_id,
                    reg_page_name='limit_info'
                )
                response_obj['text'] = 'add to db'
            except Exception as e:
                print(e)
                response_obj['text'] = 'types error'
        else:
            response_obj['text'] = 'some error'
        return json_response(response_obj)

    @staticmethod
    async def user_stress_and_activity_info(request: Request):
        response_obj = await status_by_request(request, return_id=True)
        if response_obj['status']:
            try:
                data = await request.json()
            except:
                data = await request.post()

            if 'stress_level' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'stress_level not in data'
            if 'activity_level' not in data:
                response_obj['status'] = False
                response_obj['text'] = 'activity_level not in data'
            if not response_obj['status']:
                return json_response(response_obj)

            user_id = response_obj['user_id']
            stress_level = data['stress_level']
            activity_level = data['activity_level']

            life_info = ''
            if 'custom' in data:
                life_info = data['custom']

            try:
                await UserInfoDAL.insert_or_update(
                    index_elements=[UserInfo.user_id],
                    set_={
                        'stress_level': stress_level,
                        'activity_level': activity_level,
                        'life_info': life_info
                    },
                    user_id=user_id, stress_level=stress_level, activity_level=activity_level, life_info=life_info
                )
                await UserRegPageDAL.add(
                    user_id=user_id,
                    reg_page_name='final'
                )
                await count_user_daily_norm(user_id=user_id)
                response_obj['text'] = 'add to db'
            except Exception as e:
                print(e)
                response_obj['text'] = 'types error'
        else:
            response_obj['text'] = 'some error'
        return json_response(response_obj)