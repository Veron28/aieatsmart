from aiogram import types


async def set_default_commands(dp):
    await dp.bot.set_my_commands(
        [
            types.BotCommand("/start", "Перезапуск"),
            types.BotCommand("/info", "Узнать о возможностях бота"),
            types.BotCommand("/premium", "Premium"),
            # types.BotCommand("/edit", "Изменить анкету"),
        ]
    )