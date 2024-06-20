from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, BigInteger, String, DateTime, Boolean, LargeBinary

from db_api.base import Base


class Log(Base):
    __tablename__ = 'log'

    user_id = Column(BigInteger, primary_key=True)
    log_id = Column(BigInteger, primary_key=True)

    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    action = Column(String)