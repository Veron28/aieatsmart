from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

start_kbd = ReplyKeyboardMarkup(
    resize_keyboard=True,
    keyboard=[
        [
            KeyboardButton(text='Питание'),
            KeyboardButton(text='Рекомендации')
        ],
        [
            KeyboardButton(text='Статистика'),
            KeyboardButton(text='Настройки'),
            KeyboardButton(text='Premium'),
        ]
    ]
)