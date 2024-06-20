from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, BigInteger, String, DateTime, Boolean, LargeBinary

from db_api.base import Base


class UserRegPage(Base):
    __tablename__ = 'user_reg_page'

    user_id = Column(BigInteger, primary_key=True)
    reg_page_id = Column(Integer, primary_key=True, autoincrement=True)

    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    reg_page_name = Column(String)
