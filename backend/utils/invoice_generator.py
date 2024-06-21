from environs import Env

env = Env()
env.read_env()

BOT_TOKEN = env.str("BOT_TOKEN")


import sys
import json
from aiogram import Bot
from aiogram.types import LabeledPrice
import uuid
import asyncio


async def create_invoice_link(title, description, currency, payload, prices, provider_token):
    bot = Bot(token=BOT_TOKEN)
    invoice = await bot.create_invoice_link(
        title=title,
        description=description,
        currency=currency,
        payload=payload,
        prices=[LabeledPrice(label=price['label'], amount=price['amount']) for price in prices],
        provider_token=provider_token
    )
    return invoice


def main():
    data = json.loads(sys.argv[1])
    loop = asyncio.get_event_loop()
    invoice_url = loop.run_until_complete(create_invoice_link(**data))
    print(invoice_url)


if __name__ == '__main__':
    main()