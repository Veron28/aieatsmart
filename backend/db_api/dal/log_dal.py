from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import Log


class LogDAL(BaseDAL):
    _model: Type = Log
