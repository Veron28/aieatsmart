from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

start_kbd = ReplyKeyboardMarkup(
    resize_keyboard=True,
    keyboard=[
        [
            KeyboardButton(text='Что поесть'),
            KeyboardButton(text='Анализ')
        ],
        [
            # KeyboardButton(text='Статистика'),
            KeyboardButton(text='Настройки'),
            KeyboardButton(text='Premium'),
        ]
    ]
)