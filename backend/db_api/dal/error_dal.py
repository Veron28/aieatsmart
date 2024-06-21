from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import Error


class ErrorDAL(BaseDAL):
    _model: Type = Error
