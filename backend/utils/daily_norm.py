from backend.data.texts import reg_end
from backend.db_api.dal.user_info_dal import UserInfoDAL
from backend.db_api.models import UserInfo
from backend.keyboards.reply.start_kbd import start_kbd
from backend.utils.bot_send import send_message
from backend.utils.premium import give_user_premium


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

    await give_user_premium(user_id=user_id, days=7)
    await send_message(
        user_id=user_id,
        text=reg_end,
        kb=start_kbd
    )
