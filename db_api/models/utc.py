from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, BigInteger, String, DateTime, Boolean, LargeBinary

from db_api.base import Base


class Utc(Base):
    __tablename__ = 'utc'

    user_id = Column(BigInteger, primary_key=True)
    utc = Column(Integer, default=3)