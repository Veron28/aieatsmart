from typing import Type

from sqlalchemy import select, func
from sqlalchemy.sql import or_

from db_api.dal.base_dal import BaseDAL
from db_api.models import Error
from db_api.postgresql import Database


class ErrorDAL(BaseDAL):
    _model: Type = Error
