from typing import Type

from db_api.dal.base_dal import BaseDAL
from db_api.models import Premium


class PremiumDAL(BaseDAL):
    _model: Type = Premium
