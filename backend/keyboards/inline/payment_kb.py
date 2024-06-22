from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

from keyboards.callback_data import payment_callback_data
from utils.payment_method import get_invoice_url


async def payment_kb(invoice_data):
    return InlineKeyboardMarkup(
        inline_keyboard=[
        # [
        #     InlineKeyboardButton(text='Оплатить 1 месяц', url=await get_invoice_url(invoice_data))
        # ],
        [
            InlineKeyboardButton(text='Пригласить друга', callback_data=payment_callback_data.new(type='invite'))
        ]
    ]
)