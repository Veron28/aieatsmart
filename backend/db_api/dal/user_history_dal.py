from typing import Type

from backend.db_api.dal.base_dal import BaseDAL
from backend.db_api.models import UserHistory


class UserHistoryDAL(BaseDAL):
    _model: Type = UserHistory
