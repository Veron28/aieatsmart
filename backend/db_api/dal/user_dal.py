from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import User


class UserDAL(BaseDAL):
    _model: Type = User
