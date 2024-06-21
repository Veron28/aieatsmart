import traceback
from typing import Optional, Union, List, Dict
from sqlalchemy import Column, update, delete, dialects, literal_column, text
from sqlalchemy.future import select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import DeclarativeMeta
from sqlalchemy.sql import or_
from sqlalchemy.sql.functions import count

from db_api.postgresql import Database


class BaseDAL:

    @classmethod
    def _get_model(cls) -> DeclarativeMeta:
        return getattr(cls, '_model')

    @classmethod
    async def add(cls, **kwargs) -> Optional[int]:
        try:
            db = Database.get_instance()

            async with db.session() as session:
                async with session.begin():
                    model = cls._get_model()
                    query = insert(model).values(**kwargs)
                    await session.execute(query)
        except:
            traceback.print_exc()

    @classmethod
    async def get(
            cls,
            id: Optional[int] = None,
            many: bool = False,
            relationship: Optional[Column] = None,
            orderby=None,
            distinct: bool = False,
            desc: bool = False,
            *args,
            **kwargs
    ) -> Union[List[any], Optional[any]]:
        db = Database.get_instance()
        model = cls._get_model()

        async with db.session() as session:
            async with session.begin():

                filters = []

                if id is not None:
                    filters.append(getattr(model, 'id') == id)
                else:
                    for key, value in kwargs.items():
                        filters.append(getattr(model, key) == value)

                if orderby:
                    if desc:
                        query = select(model).where(*filters).order_by(orderby.desc())
                    else:
                        query = select(model).where(*filters).order_by(orderby)
                else:
                    query = select(model).where(*filters)

                if distinct:
                    query = query.distinct(distinct)

                results = await session.execute(query)

                if many:
                    result = results.scalars().all()
                else:
                    result = results.fetchone()
                    if result:
                        (result,) = result

        return result


    @classmethod
    async def update(cls, id: Optional[int] = None, where: Optional[Dict] = None, **kwargs) -> None:
        db = Database.get_instance()
        model = cls._get_model()

        async with db.session() as session:
            async with session.begin():
                filters = []

                if id is not None:
                    filters.append(getattr(model, 'id') == id)
                elif where is not None:
                    for key, value in where.items():
                        filters.append(getattr(model, key) == value)

                query = update(model).where(*filters).values(**kwargs)

                await session.execute(query)

    @classmethod
    async def delete(cls, id: Optional[int] = None, *args, **kwargs) -> None:
        db = Database.get_instance()
        model = cls._get_model()

        async with db.session() as session:
            async with session.begin():
                filters = []

                if id is not None:
                    filters.append(getattr(model, 'id') == id)
                else:
                    for key, value in kwargs.items():
                        filters.append(getattr(model, key) == value)

                query = delete(model).where(*filters)
                await session.execute(query)

    @classmethod
    async def insert_or_update(cls, set_: dict, index_elements: List[str], *rows, **kwargs):
        db = Database.get_instance()

        async with db.session() as session:
            async with session.begin():
                model = cls._get_model()
                query = dialects.postgresql.insert(model).values(**kwargs).on_conflict_do_update(
                    set_=set_,
                    index_elements=index_elements
                )
                await session.execute(query)

    @classmethod
    async def adds(cls, *rows, returning_id: bool = False, **kwargs) -> Optional[int]:
        db = Database.get_instance()

        result = None

        async with db.session() as session:
            if len(rows) > 0:
                session.add_all(rows)
                await session.commit()
            else:
                query = insert(cls._model).values(**kwargs)

                if returning_id:
                    query = query.returning(literal_column('id'))

                results = await session.execute(query)
                await session.commit()

                if returning_id:
                    (result,) = results.fetchone()

        return result

    @classmethod
    async def count(
            cls,
            id: Optional[int] = None,
            *args,
            **kwargs
    ) -> Union[List[any], Optional[any]]:
        db = Database.get_instance()
        model = cls._get_model()

        async with db.session() as session:
            async with session.begin():

                filters = []

                if id is not None:
                    filters.append(getattr(model, 'id') == id)
                else:
                    for key, value in kwargs.items():
                        if hasattr(value, '__iter__') and not isinstance(value, str):
                            if '>' in value:
                                filters.append(getattr(model, key) > value[1])
                            elif '<' in value:
                                filters.append(getattr(model, key) < value[1])
                            elif '>=' in value:
                                filters.append(getattr(model, key) >= value[1])
                            elif '<=' in value:
                                filters.append(getattr(model, key) <= value[1])
                            else:
                                iters = []
                                for val in value:
                                    iters.append(getattr(model, key) == val)
                                filters.append(or_(*iters))
                        else:
                            filters.append(getattr(model, key) == value)
                query = select(count()).select_from(model).where(*filters)

                results = await session.execute(query)

                result = results.fetchone()
                if result:
                    (result,) = result

        return result


    @classmethod
    async def Kostil_Today(
            cls,
            user_id
    ):


        db = Database.get_instance()
        model = cls._get_model()

        async with db.session() as session:
            query = text("SELECT * FROM prompt WHERE user_id = :user_id AND date_trunc('day', time) = date_trunc('day', now());").bindparams(user_id=user_id)
            result = await session.execute(query)
            k=0

            for i in result:
               k+=1

            return k