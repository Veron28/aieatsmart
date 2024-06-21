from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import Utc


class UtcDAL(BaseDAL):
    _model: Type = Utc
