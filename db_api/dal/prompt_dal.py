from typing import Type

from sqlalchemy import select, func
from sqlalchemy.sql import or_

from db_api.dal.base_dal import BaseDAL
from db_api.models import Prompt
from db_api.postgresql import Database


class PromptDAL(BaseDAL):
    _model: Type = Prompt
