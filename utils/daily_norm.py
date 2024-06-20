from db_api.dal.user_info_dal import UserInfoDAL
from db_api.models import UserInfo


async def count_user_daily_norm(user_id: int):
    daily_kcal_norm = 2000
    dayly_eating_norm = 3
    await UserInfoDAL.insert_or_update(
        index_elements=[UserInfo.user_id],
        set_={
            'daily_kcal_norm': daily_kcal_norm,
            'dayly_eating_norm': dayly_eating_norm
        },
        user_id=user_id,
        daily_kcal_norm=daily_kcal_norm, dayly_eating_norm=dayly_eating_norm
    )