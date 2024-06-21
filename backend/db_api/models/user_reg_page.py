from datetime import datetime

from sqlalchemy import Column, BigInteger, String, DateTime

from backend.db_api.base import Base


class UserRegPage(Base):
    __tablename__ = 'user_reg_page'

    user_id = Column(BigInteger, primary_key=True)
    reg_page_id = Column(BigInteger, primary_key=True, autoincrement=True)

    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    reg_page_name = Column(String)
