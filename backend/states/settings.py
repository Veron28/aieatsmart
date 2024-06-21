
from aiogram.dispatcher.filters.state import StatesGroup, State


class SettingsStates(StatesGroup):
    await_daily_norm = State()
    eating_norm = State()