from sqlalchemy import Column, BigInteger, String

from db_api.base import Base


class UserHealth(Base):
    __tablename__ = 'user_health'

    user_id = Column(BigInteger, primary_key=True)
    health_id = Column(BigInteger, primary_key=True, autoincrement=True)

    type = Column(String, default='base')
    text = Column(String, default='')
