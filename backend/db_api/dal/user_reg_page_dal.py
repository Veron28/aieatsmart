from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import UserRegPage


class UserRegPageDAL(BaseDAL):
    _model: Type = UserRegPage
