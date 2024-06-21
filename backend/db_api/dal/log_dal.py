from typing import Type

from backend.db_api.dal.base_dal import BaseDAL
from backend.db_api.models import Log


class LogDAL(BaseDAL):
    _model: Type = Log
