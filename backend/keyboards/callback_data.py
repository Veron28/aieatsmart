from aiogram.utils.callback_data import CallbackData

payment_callback_data = CallbackData("payment", "type")
setting_callback_data = CallbackData("settings", "type")

utc_callback_data = CallbackData("settings", "type", "number")

photo_callback_data = CallbackData("photo", "action")
photo_cal_callback_data = CallbackData("photo_cal", "action", "user_id", "message_id")