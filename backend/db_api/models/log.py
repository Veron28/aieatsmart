from datetime import datetime

from sqlalchemy import Column, BigInteger, String, DateTime

from db_api.base import Base


class Log(Base):
    __tablename__ = 'log'

    user_id = Column(BigInteger, primary_key=True)
    log_id = Column(BigInteger, primary_key=True)

    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    action = Column(String)