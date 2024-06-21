import asyncio
import os

from aiogram import executor, Dispatcher

from db_api.postgresql import db
from loader import dp

from aiohttp import web
from api.v1.setup import app
from utils.notify_admins import on_startup_notify

async def health(request):
    return web.Response(text="OK")

app.router.add_get('/health', health)

async def on_startup(dispatcher):
    await db.create_all()
    await on_startup_notify(dispatcher)

    loop = asyncio.get_event_loop()
    port = int(os.environ.get("PORT", 8080))
    loop.create_task(web._run_app(app, port=port))


async def on_shutdown(dp: Dispatcher):
    await dp.storage.close()
    await dp.storage.wait_closed()

if __name__ == '__main__':
    executor.start_polling(dp, on_startup=on_startup, on_shutdown=on_shutdown)
