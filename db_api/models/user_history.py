from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, BigInteger, String, DateTime, Boolean, LargeBinary

from db_api.base import Base


class UserHistory(Base):
    __tablename__ = 'user_history'

    user_id = Column(BigInteger, primary_key=True)
    message_id = Column(BigInteger, primary_key=True)
    prompt_id = Column(BigInteger, primary_key=True)

    is_eat = Column(Boolean, default=False)
    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    food_name = Column(String, default='')
    calories = Column(Integer, default=0)
    grams = Column(Integer, default=0)
    squirrels = Column(Integer, default=0)
    fats = Column(Integer, default=0)
    carbohydrates = Column(Integer, default=0)
    answer = Column(String, default='')
    recommendation = Column(String, default='')
