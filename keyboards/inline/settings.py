from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

from keyboards.callback_data import setting_callback_data, utc_callback_data

settings_kb = InlineKeyboardMarkup(
        inline_keyboard=[
        [
            InlineKeyboardButton(text='Основное', callback_data=setting_callback_data.new(type='base')),
            InlineKeyboardButton(text='Часовой пояс', callback_data=setting_callback_data.new(type='utc'))
        ],
        [
            InlineKeyboardButton(text='Ежедневные цели', callback_data=setting_callback_data.new(type='daily_goal'))
        ],
    ]
)

daily_goal_kb = InlineKeyboardMarkup(
        inline_keyboard=[
        [
            InlineKeyboardButton(text='Отменить', callback_data=setting_callback_data.new(type='сansel')),
        ],
    ]
)

utc_kb = InlineKeyboardMarkup(
        inline_keyboard=[
        [
            InlineKeyboardButton(text='0', callback_data=utc_callback_data.new(type='change', number='0')),
            InlineKeyboardButton(text='1', callback_data=utc_callback_data.new(type='change', number='1')),
            InlineKeyboardButton(text='2', callback_data=utc_callback_data.new(type='change', number='2')),
            InlineKeyboardButton(text='3', callback_data=utc_callback_data.new(type='change', number='3')),
        ],
        [
            InlineKeyboardButton(text='4', callback_data=utc_callback_data.new(type='change', number='4')),
            InlineKeyboardButton(text='5', callback_data=utc_callback_data.new(type='change', number='5')),
            InlineKeyboardButton(text='6', callback_data=utc_callback_data.new(type='change', number='6')),
        ],
        [
            InlineKeyboardButton(text='7', callback_data=utc_callback_data.new(type='change', number='7')),
            InlineKeyboardButton(text='8', callback_data=utc_callback_data.new(type='change', number='8')),
            InlineKeyboardButton(text='9', callback_data=utc_callback_data.new(type='change', number='9')),
        ]
    ]
)