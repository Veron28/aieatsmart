import random

from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text
from aiogram.types import ContentType

from backend.data.texts import successful_payment, premium_text
from backend.keyboards.inline.payment_kb import payment_kb
from backend.loader import dp, bot
from backend.utils.bot_send import send_message
from backend.utils.premium import give_user_premium

comment = 'comment'
amount_in_stars = 100
invoice_data = {
    'title': comment,
    'description': comment,
    'currency': 'XTR',
    'payload': str('айди внутренний платежа'),
    'prices': [{'label': comment, 'amount': amount_in_stars}],
    'provider_token': ''
}


@dp.message_handler(Text(equals='Premium'), chat_type=[types.ChatType.PRIVATE])
async def premium(message: types.Message, state: FSMContext):
    user_id = message.chat.id
    comment = 'EatSmart 1 month sub'
    amount_in_stars = 250
    invoice_data = {
        'title': comment,
        'description': comment,
        'currency': 'XTR',
        'payload': str(f'{random.randint(1000, 1_000_000)}'),
        'prices': [{'label': comment, 'amount': amount_in_stars}],
        'provider_token': ''
    }

    await send_message(
        user_id=user_id,
        text=premium_text,
        kb=await payment_kb(invoice_data)
    )

@dp.pre_checkout_query_handler(lambda query: True)
async def pre_checkout_query(pre_checkout_q: types.PreCheckoutQuery):
    await bot.answer_pre_checkout_query(pre_checkout_q.id, ok=True)

@dp.message_handler(content_types=ContentType.SUCCESSFUL_PAYMENT)
async def process_successful_payment(message: types.Message):
    print('successful_payment:')
    payment_info = message.successful_payment.to_python()
    for k, v in payment_info.items():
        print(f"{k} = {v}")

    user_id = message.chat.id
    await give_user_premium(user_id=user_id, months=1)

    await send_message(
        user_id=user_id,
        text=successful_payment
    )