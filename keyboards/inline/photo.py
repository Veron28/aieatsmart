from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

from keyboards.callback_data import photo_callback_data, photo_cal_callback_data

def calories_kb(user_id: int, message_id: int):
    return InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(
                text='Отметить как съедененное',
                callback_data=photo_cal_callback_data.new(
                    action='add',
                    user_id=user_id,
                    message_id=message_id
                )
            )
        ]
    ]
)