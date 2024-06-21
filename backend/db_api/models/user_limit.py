from sqlalchemy import Column, BigInteger, String

from backend.db_api.base import Base


class UserLimit(Base):
    __tablename__ = 'user_limit'

    user_id = Column(BigInteger, primary_key=True)
    limit_id = Column(BigInteger, primary_key=True, autoincrement=True)
    type = Column(String, default='base')
    text = Column(String, default='')
