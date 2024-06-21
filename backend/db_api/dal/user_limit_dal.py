from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import UserLimit


class UserLimitDAL(BaseDAL):
    _model: Type = UserLimit
