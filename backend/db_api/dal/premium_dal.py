from typing import Type

from backend.db_api.dal.base_dal import BaseDAL
from backend.db_api.models import Premium


class PremiumDAL(BaseDAL):
    _model: Type = Premium
