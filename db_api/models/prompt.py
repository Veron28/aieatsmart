from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, BigInteger, String, DateTime, Boolean, LargeBinary

from db_api.base import Base


class Prompt(Base):
    __tablename__ = 'prompt'

    user_id = Column(BigInteger, primary_key=True)
    prompt_id = Column(Integer, primary_key=True, autoincrement=True)

    type = Column(String)
    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    input = Column(String, default='')
    output = Column(String, default='')

    tokens_input = Column(BigInteger, default=0)
    tokens_output = Column(BigInteger, default=0)
