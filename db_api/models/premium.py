from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, BigInteger, String, DateTime, Boolean, LargeBinary

from db_api.base import Base


class Premium(Base):
    __tablename__ = 'premium'

    user_id = Column(BigInteger, primary_key=True)
    premium_id = Column(BigInteger, primary_key=True, autoincrement=True)

    time_start = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    time_end = Column(DateTime, default=datetime.now, onupdate=datetime.now)