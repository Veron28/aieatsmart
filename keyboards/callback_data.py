from aiogram.utils.callback_data import CallbackData

payment_callback_data = CallbackData("payment", "type")
setting_callback_data = CallbackData("settings", "type")

utc_callback_data = CallbackData("settings", "type", "number")