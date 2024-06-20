import asyncio
import os

from aiogram import executor, Dispatcher
import handlers
from db_api.postgresql import db
from loader import dp, bot
from utils.notify_admins import on_startup_notify

from aiohttp import web
from api.v1.setup import app


async def on_startup(dispatcher):
    await db.drop_all()
    await db.create_all()
    await on_startup_notify(dispatcher)

    loop = asyncio.get_event_loop()
    port = int(os.environ.get("PORT", 5004))
    loop.create_task(web._run_app(app, port=port))


async def on_shutdown(dp: Dispatcher):
    await dp.storage.close()
    await dp.storage.wait_closed()

if __name__ == '__main__':
    executor.start_polling(dp, on_startup=on_startup, on_shutdown=on_shutdown)
