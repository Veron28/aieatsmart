from db_api.dal.user_info_dal import UserInfoDAL
from db_api.models import UserInfo


async def count_user_daily_norm(user_id: int):
    daily_norm = 2000
    await UserInfoDAL.insert_or_update(
        index_elements=[UserInfo.user_id],
        set_={
            'daily_norm': daily_norm,
        },
        user_id=user_id, daily_norm=daily_norm
    )