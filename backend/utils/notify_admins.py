import logging

from aiogram import Dispatcher

from data.config import ADMINS
from utils.bot_send import send_message


async def on_startup_notify(dp: Dispatcher):
    for admin in ADMINS:
        try:
            await send_message(admin, text="Бот Запущен")

        except Exception as err:
            logging.exception(err)
