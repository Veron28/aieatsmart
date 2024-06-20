from typing import Union


async def get_user_stat(user_id: int) -> Union[bool, dict]:

    print('get_user_stat: ', user_id)
    return True