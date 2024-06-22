from typing import Type

from sqlalchemy import select, func
from sqlalchemy.orm import aliased

from db_api.dal.base_dal import BaseDAL
from db_api.models import UserInfo, UserHistory
from db_api.postgresql import Database


class UserInfoDAL(BaseDAL):
    _model: Type = UserInfo

    @classmethod
    async def get_user_stat(cls, user_id: int):
        db = Database.get_instance()

        async with db.session() as session:
            async with session.begin():
                subquery = select(
                    UserHistory.user_id,
                    func.count(UserHistory.user_id).label('count_user_id'),
                    func.sum(UserHistory.kcal).label('sum_kcal'),
                    func.sum(UserHistory.squirrels).label('sum_squirrels'),
                    func.sum(UserHistory.fats).label('sum_fats'),
                    func.sum(UserHistory.carbohydrates).label('sum_carbohydrates'),
                ).select_from(UserHistory).where(UserHistory.user_id == user_id).group_by(
                    UserHistory.user_id).subquery()

                subquery_alias = aliased(subquery)

                query = select(
                    UserInfo.user_id,
                    UserInfo.daily_kcal_norm,
                    UserInfo.daily_eating_norm,
                    subquery_alias.c.count_user_id,
                    subquery_alias.c.sum_kcal,
                    subquery_alias.c.sum_squirrels,
                    subquery_alias.c.sum_fats,
                    subquery_alias.c.sum_carbohydrates
                ).select_from(UserInfo).join(
                    subquery_alias, UserInfo.user_id == subquery_alias.c.user_id
                ).filter(UserInfo.user_id == user_id)

                results = await session.execute(query)
                result = results.fetchone()

                return result