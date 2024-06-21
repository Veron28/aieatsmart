from db_api.dal.user_health_dal import UserHealthDAL
from db_api.dal.user_info_dal import UserInfoDAL
from db_api.dal.user_limit_dal import UserLimitDAL
from db_api.dal.user_reg_page_dal import UserRegPageDAL
from db_api.models import UserRegPage, UserInfo
from utils.user_stat import get_user_stat


async def stat_or_reg(user_id: int, get_data=False):
    response_obj = {}
    response_obj['status'] = True
    response_obj['user_id'] = user_id
    response_obj['is_stat'] = False

    is_auth = await UserRegPageDAL.get(user_id=user_id, reg_page_name='final')
    if is_auth and not get_data:
        response_obj['is_stat'] = True
        response_obj.update(await get_user_stat(user_id=user_id))
    else:
        weight = None
        height = None
        gender = None
        age = None
        health = {}
        goal = None
        limit = {}
        stress_level = None
        activity_level = None
        life_info = None

        user_reg: UserRegPage = await UserRegPageDAL.get(user_id=user_id, orderby=UserRegPage.reg_page_id, desc=True)
        if user_reg:
            user_reg_page = user_reg.reg_page_name
            user_info: UserInfo = await UserInfoDAL.get(user_id=user_id)
            if user_info:
                if user_info.weight:
                    weight = user_info.weight
                if user_info.height:
                    height = user_info.height
                if user_info.gender:
                    gender = user_info.gender
                if user_info.age:
                    age = user_info.age
                if user_info.goal:
                    goal = user_info.goal
                if user_info.stress_level:
                    stress_level = user_info.stress_level
                if user_info.activity_level:
                    activity_level = user_info.activity_level
                if user_info.life_info:
                    life_info = user_info.life_info

            health_info = await UserHealthDAL.get(user_id=user_id, many=True)
            health_base = []
            health_flag = 0
            for x in health_info:
                if x.type == 'base':
                    health_base.append(x.text)
                    health_flag = 1
                else:
                    health['custom'] = x.text
            if health_flag:
                health['base'] = health_base

            limit_info = await UserLimitDAL.get(user_id=user_id, many=True)
            limit_base = []
            limit_flag = 0
            for x in limit_info:
                if x.type == 'base':
                    limit_base.append(x.text)
                    limit_flag = 1
                else:
                    limit['custom'] = x.text
            if limit_flag:
                limit['base'] = limit_base
        else:
            user_reg_page = 'default'

        response_obj['page'] = user_reg_page
        response_obj['weight'] = weight
        response_obj['height'] = height
        response_obj['gender'] = gender
        response_obj['age'] = age
        response_obj['health'] = health
        response_obj['goal'] = goal
        response_obj['limit'] = limit
        response_obj['stress_level'] = stress_level
        response_obj['activity_level'] = activity_level
        response_obj['life_info'] = life_info

    return response_obj