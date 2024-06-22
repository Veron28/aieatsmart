import datetime

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

def utc_kb():
    current_time = datetime.datetime.now()

    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=f'Линяя смены дат ({(current_time + datetime.timedelta(hours=12)).strftime("%H:%M")})', callback_data=utc_callback_data.new(type='change', number='-12')),
            ],
            [
                InlineKeyboardButton(text=f'Самоа ({(current_time + datetime.timedelta(hours=13)).strftime("%H:%M")})', callback_data=utc_callback_data.new(type='change', number='-13')),
            ],
            [
                InlineKeyboardButton(text=f'Гавайи ({(current_time - datetime.timedelta(hours=10)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-10')),
            ],
            [
                InlineKeyboardButton(text=f'Аляска ({(current_time - datetime.timedelta(hours=9)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-9')),
            ],
            [
                InlineKeyboardButton(text=f'Тихоокеанское время ({(current_time - datetime.timedelta(hours=8)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-8')),
            ],
            [
                InlineKeyboardButton(text=f'Аризона ({(current_time - datetime.timedelta(hours=7)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-7')),
            ],
            [
                InlineKeyboardButton(text=f'Центральная Америка ({(current_time - datetime.timedelta(hours=6)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-6')),
            ],
            [
                InlineKeyboardButton(text=f'Богота ({(current_time - datetime.timedelta(hours=5)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-5')),
            ],
            [
                InlineKeyboardButton(text=f'Атлантическое время ({(current_time - datetime.timedelta(hours=4)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-4')),
            ],
            [
                InlineKeyboardButton(text=f'Гренландия ({(current_time - datetime.timedelta(hours=3)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-3')),
            ],
            [
                InlineKeyboardButton(text=f'Среднеатлантическое время ({(current_time - datetime.timedelta(hours=2)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-2')),
            ],
            [
                InlineKeyboardButton(text=f'Азорские острова ({(current_time - datetime.timedelta(hours=1)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='-1')),
            ],
            [
                InlineKeyboardButton(text=f'Лондон ({(current_time).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='0')),
            ],
            [
                InlineKeyboardButton(text=f'Берлин ({(current_time + datetime.timedelta(hours=1)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='1')),
            ],
            [
                InlineKeyboardButton(text=f'Калининград ({(current_time + datetime.timedelta(hours=2)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='2')),
            ],
            [
                InlineKeyboardButton(text=f'Москва ({(current_time + datetime.timedelta(hours=3)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='3')),
            ],
            [
                InlineKeyboardButton(text=f'Самара ({(current_time + datetime.timedelta(hours=4)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='4')),
            ],
            [
                InlineKeyboardButton(text=f'Екатеринбург ({(current_time + datetime.timedelta(hours=5)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='5')),
            ],
            [
                InlineKeyboardButton(text=f'Омск ({(current_time + datetime.timedelta(hours=6)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='6')),
            ],
            [
                InlineKeyboardButton(text=f'Красноярдск ({(current_time + datetime.timedelta(hours=7)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='7')),
            ],
            [
                InlineKeyboardButton(text=f'Иркутск ({(current_time + datetime.timedelta(hours=8)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='8')),
            ],
            [
                InlineKeyboardButton(text=f'Якутск ({(current_time + datetime.timedelta(hours=9)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='9')),
            ],
            [
                InlineKeyboardButton(text=f'Владивосток ({(current_time + datetime.timedelta(hours=10)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='10')),
            ],
            [
                InlineKeyboardButton(text=f'Магадан ({(current_time + datetime.timedelta(hours=11)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='11')),
            ],
            [
                InlineKeyboardButton(text=f'Камчатка ({(current_time + datetime.timedelta(hours=12)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='12')),
            ],
            [
                InlineKeyboardButton(text=f'Тонга ({(current_time + datetime.timedelta(hours=13)).strftime("%H:%M")})',
                                     callback_data=utc_callback_data.new(type='change', number='13')),
            ],
            [
                InlineKeyboardButton(text=f'← Назад',
                                     callback_data=setting_callback_data.new(type='back')),
            ],
        ]
    )