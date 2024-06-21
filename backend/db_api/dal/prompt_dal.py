from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import Prompt


class PromptDAL(BaseDAL):
    _model: Type = Prompt
