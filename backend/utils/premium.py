import datetime

from backend.db_api.dal.premium_dal import PremiumDAL
from backend.db_api.models import Premium


async def give_user_premium(user_id: int, years: int = 0, months: int = 0, days: int = 0):
    prem : Premium = await PremiumDAL.get(
        user_id=user_id,
        orderby=Premium.time_end,
        desc=True
    )
    now_ = datetime.datetime.now()

    if not prem or prem.time_end < now_:
        time_start = now_
        time_end = time_start + datetime.timedelta(weeks=(years*52) + (months*4), days=days)

        await PremiumDAL.add(
            user_id=user_id,
            time_start=time_start,
            time_end=time_end
        )
    else:
        time_end = prem.time_end + datetime.timedelta(weeks=(years*52) + (months*4), days=days)

        await PremiumDAL.update(
            where={
                'user_id': user_id,
                'premium_id': prem.premium_id
            },
            time_end=time_end
        )
