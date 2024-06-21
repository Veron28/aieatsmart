from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import UserHealth


class UserHealthDAL(BaseDAL):
    _model: Type = UserHealth
