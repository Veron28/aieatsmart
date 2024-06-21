from typing import Union

from db_api.dal.user_info_dal import UserInfoDAL
from db_api.models import UserInfo


async def get_user_stat(user_id: int) -> Union[bool, dict]:
    response_obj = {}
    response_obj['status'] = True
    response_obj['user_id'] = user_id

    try:
        stat = await UserInfoDAL.get_user_stat(user_id=user_id)
        if stat:
            response_obj['squirrels'] = stat[5]
            response_obj['fats'] = stat[6]
            response_obj['carbohydrates'] = stat[7]
            response_obj['eating_today'] = stat[3]
            response_obj['eating_daily_norm'] = stat[2]
            response_obj['kcal_today'] = stat[4]
            response_obj['kcal_left'] = stat[1] - stat[4]
        else:
            response_obj['squirrels'] = 0
            response_obj['fats'] = 0
            response_obj['carbohydrates'] = 0
            response_obj['eating_today'] = 0
            response_obj['kcal_today'] = 0

            user_info : UserInfo = await UserInfoDAL.get(user_id=user_id)
            if user_info:
                response_obj['eating_daily_norm'] = user_info.dayly_eating_norm
                response_obj['kcal_left'] = user_info.daily_kcal_norm
            else:
                response_obj['eating_daily_norm'] = 0
                response_obj['kcal_left'] = 0
    except:
        response_obj['status'] = False
        response_obj['text'] = 'some error'
    return response_obj