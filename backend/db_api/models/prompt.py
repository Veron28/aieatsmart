from datetime import datetime

from sqlalchemy import Column, BigInteger, String, DateTime

from db_api.base import Base


class Prompt(Base):
    __tablename__ = 'prompt'

    user_id = Column(BigInteger, primary_key=True)
    prompt_id = Column(BigInteger, primary_key=True, autoincrement=True)

    type = Column(String)
    time = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    input = Column(String, default='')
    output = Column(String, default='')

    tokens_input = Column(BigInteger, default=0)
    tokens_output = Column(BigInteger, default=0)
