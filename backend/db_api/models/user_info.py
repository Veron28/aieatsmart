from sqlalchemy import Column, Integer, BigInteger, String

from db_api.base import Base


class UserInfo(Base):
    __tablename__ = 'user_info'

    user_id = Column(BigInteger, primary_key=True)
    time_zone = Column(Integer, default=3)

    weight = Column(BigInteger)
    weight_type = Column(String, default='kg')

    height = Column(BigInteger)
    height_type = Column(String, default='cm')

    gender = Column(String)
    age = Column(BigInteger)
    goal = Column(String, default='')

    activity_level = Column(Integer, default=1)
    stress_level = Column(Integer, default=1)
    life_info = Column(String, default='')

    dayly_eating_norm = Column(Integer, default=0)
    daily_kcal_norm = Column(BigInteger, default=0)