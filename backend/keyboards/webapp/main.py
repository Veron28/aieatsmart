from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

from backend.data.config import WEBAPP_URL

reg_kb = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton("Регистрация", web_app=WebAppInfo(url=WEBAPP_URL))
        ]

    ]
)

stat_kb = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton("Статистика", web_app=WebAppInfo(url=WEBAPP_URL))
        ]

    ]
)