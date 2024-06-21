import datetime

import asyncio

from aiogram.utils import exceptions

from db_api.dal.user_dal import UserDAL
from loader import bot
import logging as log


async def send_message(
        user_id: int, text: str = None, photo=None, video=None, gif=None,
        voice=None, audio=None, document=None, media=None, kb=None, webapp=None,
        reply_to_message_id: int = None,
        disable_notification: bool = True, delete_message: bool = False):
    """
    Safe messages sender

    :param user_id:
    :param text:
    :param disable_notification:
    :return:
    """
    try:
        if text.count('{{username}}') != 0:
            text = text.replace('{{username}}', f'@{(await bot.get_chat(user_id)).username}')
    except:
        pass

    try:
        if webapp:
            kb = webapp
    except:
        pass

    try:
        if photo:
            msg = await bot.send_photo(
                chat_id=user_id, caption=text, photo=photo, reply_markup=kb,
                disable_notification=disable_notification, reply_to_message_id=reply_to_message_id
            )
        elif video:
            msg = await bot.send_video(
                chat_id=user_id, caption=text, video=video, reply_markup=kb,
                disable_notification=disable_notification, reply_to_message_id=reply_to_message_id
            )
        elif gif:
            msg = await bot.send_animation(
                chat_id=user_id, caption=text, animation=gif, reply_markup=kb,
                disable_notification=disable_notification, reply_to_message_id=reply_to_message_id
            )
        elif voice:
            msg = await bot.send_voice(
                chat_id=user_id, caption=text, voice=voice, reply_markup=kb,
                disable_notification=disable_notification, reply_to_message_id=reply_to_message_id
            )
        elif audio:
            msg = await bot.send_audio(
                chat_id=user_id, caption=text, audio=audio, reply_markup=kb,
                disable_notification=disable_notification, reply_to_message_id=reply_to_message_id)
        elif document:
            msg = await bot.send_document(
                chat_id=user_id, caption=text, document=document, reply_markup=kb,
                disable_notification=disable_notification, reply_to_message_id=reply_to_message_id)
        elif media and media != [None]:
            msg = (await bot.send_media_group(
                chat_id=user_id, media=media,
                disable_notification=disable_notification, reply_to_message_id=reply_to_message_id))
        else:
            if not text:
                msg = await send_message(
                    user_id=user_id,
                    text = 1,
                    kb=kb
                )
                await bot.delete_message(chat_id=user_id, message_id=msg)
                return False
            msg = await bot.send_message(
                chat_id=user_id, text=text, reply_markup=kb, disable_web_page_preview=True,
                disable_notification=disable_notification, reply_to_message_id=reply_to_message_id)
    except exceptions.BotBlocked:
        await UserDAL.update(where={'user_id': user_id}, type='block')
        log.error(f"Target [ID:{user_id}]: blocked by user")
    except exceptions.ChatNotFound:
        log.error(f"Target [ID:{user_id}]: invalid user ID")
    except exceptions.RetryAfter as e:
        log.error(f"Target [ID:{user_id}]: Flood limit is exceeded. Sleep {e.timeout} seconds.")
        await asyncio.sleep(e.timeout)
        return await send_message(
            user_id=user_id,
            photo=photo,
            video=video,
            gif=gif,
            voice=voice,
            audio=audio,
            document=document,
            text=text,
            kb=kb,
            webapp=webapp,
            reply_to_message_id=reply_to_message_id,
            disable_notification=disable_notification,
            delete_message=delete_message
        )
    except exceptions.UserDeactivated:
        log.error(f"Target [ID:{user_id}]: user is deactivated")
    except exceptions.TelegramAPIError:
        log.exception(f"Target [ID:{user_id}]: failed")
    else:
        if isinstance(msg, list):
            return [m.message_id for m in msg]
        return msg.message_id
    return False


async def edit_message(
        user_id: int, message_id: int, text: str = None, media=None, kb=None) -> bool:
    try:
        if media:
            await bot.edit_message_media(
                media=media,
                chat_id=user_id,
                message_id=message_id,
                reply_markup=kb
            )
        else:
            if text:
                await bot.edit_message_text(chat_id=user_id,
                                            message_id=message_id,
                                            text=text,
                                            reply_markup=kb
                                            )
            else:
                await bot.edit_message_reply_markup(chat_id=user_id,
                                            message_id=message_id,
                                            reply_markup=kb
                                            )

    except exceptions.BotBlocked:
        await UserDAL.update(where={'user_id': user_id}, type='block')
        log.error(f"Target [ID:{user_id}]: blocked by user")
    except exceptions.ChatNotFound:
        log.error(f"Target [ID:{user_id}]: invalid user ID")
    except exceptions.UserDeactivated:
        log.error(f"Target [ID:{user_id}]: user is deactivated")
    except exceptions.RetryAfter as e:
        log.error(f"Target [ID:{user_id}]: Flood limit is exceeded. Sleep {e.timeout} seconds.")
        await asyncio.sleep(e.timeout)
        return await edit_message(
            user_id=user_id, message_id=message_id, text=text,
            media=media, kb=kb
        )
    except (exceptions.MessageToEditNotFound, KeyError):
        message_id = await send_message(
            user_id=user_id, text=text, media=[media],
            kb=kb
        )
    except exceptions.MessageNotModified:
        log.exception(f"Target [ID:{user_id}]: Message is not modified")
    except exceptions.TelegramAPIError:
        log.exception(f"Target [ID:{user_id}]: failed")
    return message_id
