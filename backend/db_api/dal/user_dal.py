from typing import Type

from backend.db_api.dal.base_dal import BaseDAL
from backend.db_api.models import User


class UserDAL(BaseDAL):
    _model: Type = User
