from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, BigInteger, String, DateTime, Boolean, LargeBinary

from db_api.base import Base


class Error(Base):
    __tablename__ = 'error'

    user_id = Column(BigInteger, primary_key=True)
    message_id = Column(BigInteger, primary_key=True)

    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    type = Column(String, default='active')

    prompt_input = Column(String, default='')
    prompt_output = Column(String, default='')