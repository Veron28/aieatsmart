from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, BigInteger, String, DateTime, Boolean, LargeBinary

from db_api.base import Base


class User(Base):
    __tablename__ = 'user'

    user_id = Column(BigInteger, primary_key=True)

    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    type = Column(String, default='active')

    name = Column(String, default='')
    last_name =Column(String, default='')
    username = Column(String, default='')

    deep_link = Column(String, default='')
    who_invite = Column(BigInteger, default=0)