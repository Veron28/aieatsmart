from typing import Type

from backend.db_api.dal.base_dal import BaseDAL
from backend.db_api.models import Utc


class UtcDAL(BaseDAL):
    _model: Type = Utc
