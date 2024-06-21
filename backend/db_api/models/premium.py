from datetime import datetime

from sqlalchemy import Column, BigInteger, DateTime

from backend.db_api.base import Base


class Premium(Base):
    __tablename__ = 'premium'

    user_id = Column(BigInteger, primary_key=True)
    premium_id = Column(BigInteger, primary_key=True, autoincrement=True)

    time_start = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    time_end = Column(DateTime, default=datetime.now, onupdate=datetime.now)