import datetime

from db_api.dal.user_reg_page_dal import UserRegPageDAL
from utils.stat_and_reg import stat_or_reg
from utils.user_stat import get_user_history


async def get_user_data_dict(user_id: int):
    user_reg = False
    response_obj = {}
    if await UserRegPageDAL.get(user_id=user_id, reg_page_name='final'):
        user_reg = True

    response_obj['user_reg'] = user_reg
    response_obj.update(await stat_or_reg(user_id=user_id, get_data=True))
    response_obj['history'] = await get_user_history(user_id=user_id)

    return response_obj

async def get_user_data(user_id: int):
    user_data = ''
    user_data_dict = await get_user_data_dict(user_id=user_id)

    if user_data_dict['user_reg']:
        user_data += \
f'''
рост: {user_data_dict['height']} см, вес: {user_data_dict['weight']} кг, пол: {user_data_dict['gender']}, возраст: {user_data_dict['age']},
цель: {user_data_dict['goal']}, уровень стресса по 5-ти балльной шкале, где 5 — это высокий уровень стресса: {user_data_dict['stress_level']}, уровень активности по 5-ти балльной шкале, где 5 — это высокий уровень активности: {user_data_dict['activity_level']}
Противопоказания по здоровью (если нет, то пусто): {user_data_dict['health']['base']} {user_data_dict['health'].get('custom')}
Не употребляю (если нет, то пусто): {user_data_dict['limit']['base']} {user_data_dict['limit'].get('custom')}
'''
    if user_data_dict['history']:
        user_data += f'История питания за последнее время (если что сейчас {datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")}):\n'
        for n, x in enumerate(user_data_dict['history']):
            user_data += f'#{n}: время {x["time"].strftime("%m/%d/%Y, %H:%M:%S")}, название блюда: {x["food_name"]}, название блюда: {x["food_name"]}, общая ккалорийность: {x["kcal"]}\n'

    return user_data

