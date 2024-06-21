from loader import bot

start_text_not_reg = \
'''
<b>Привет. Это бот EatSmart — твой личный умный помощник по питанию.</b>

Я умею:
<blockquote>- Считать калории и БЖУ по фото
- Следить за твоим прогрессом и вести статистику
- Давать персонализированные советы по питанию
- Генерировать полезные рецепты по фото продуктов
- Помочь выбрать блюдо из меню в ресторане</blockquote>

<i>Чтобы бот был максимально полезен, обучи его под себя. Для этого просто пройди короткую регистрацию по снизу:</i>
'''

start_text_not_reg_webapp = \
'''
<b>Привет. Это бот EatSmart — твой личный умный помощник по питанию.</b>

Я умею:
<blockquote>- Считать калории и БЖУ по фото
- Следить за твоим прогрессом и вести статистику
- Давать персонализированные советы по питанию
- Генерировать полезные рецепты по фото продуктов
- Помочь выбрать блюдо из меню в ресторане</blockquote>

<i>Чтобы бот был максимально полезен, обучи его под себя. Для этого просто пройди короткую регистрацию по снизу:</i>
'''

start_text_not_reg_share = \
'''
<b>Привет. Это бот EatSmart — твой личный умный помощник по питанию.</b>

Я умею:
<blockquote>- Считать калории и БЖУ по фото
- Следить за твоим прогрессом и вести статистику
- Давать персонализированные советы по питанию
- Генерировать полезные рецепты по фото продуктов
- Помочь выбрать блюдо из меню в ресторане</blockquote>

<i>Чтобы бот был максимально полезен, обучи его под себя. Для этого просто пройди короткую регистрацию по снизу:</i>
'''

start_text_reg = \
'''
<b>Привет. Это бот EatSmart — твой личный умный помощник по питанию.</b>

Я умею:
<blockquote>- Считать калории и БЖУ по фото
- Следить за твоим прогрессом и вести статистику
- Давать персонализированные советы по питанию
- Генерировать полезные рецепты по фото продуктов
- Помочь выбрать блюдо из меню в ресторане</blockquote>

<i>Вы уже зарегистрированы и можете пользоваться ботом!</i>
'''

start_text_reg_webapp = \
'''
<b>Привет. Это бот EatSmart — твой личный умный помощник по питанию.</b>

Я умею:
<blockquote>- Считать калории и БЖУ по фото
- Следить за твоим прогрессом и вести статистику
- Давать персонализированные советы по питанию
- Генерировать полезные рецепты по фото продуктов
- Помочь выбрать блюдо из меню в ресторане</blockquote>

<i>Вы уже зарегистрированы и можете пользоваться ботом!</i>
'''

start_text_reg_share = \
'''
<b>Привет. Это бот EatSmart — твой личный умный помощник по питанию.</b>

Я умею:
<blockquote>- Считать калории и БЖУ по фото
- Следить за твоим прогрессом и вести статистику
- Давать персонализированные советы по питанию
- Генерировать полезные рецепты по фото продуктов
- Помочь выбрать блюдо из меню в ресторане</blockquote>

<i>Вы уже зарегистрированы и можете пользоваться ботом!</i>
'''


registration_message = \
'''
Для начала мне нужно получить от тебя информацию, <b>расскажи</b>: 
<blockquote>- Твой возраст, рост, вес и пол
- Противопоказания
- Цели в питании (например, скинуть вес или набрать массу)
- Предпочтения в еде и образ жизни, ограничения по религиозным или этическим соображениям, режим и график питания
- Занимаешься ли ты спортом? Если да, то каким и как часто?</blockquote>

Эти данные нужны, чтобы максимально точно помогать тебе с питанием. Ответь на эти вопросы в свободной форме одним сообщением. '''


registration_end_message = \
'''
<b>Регистрация завершена</b>

Теперь вы можете пользоваться вашим персональным ассистентом. Отправляй ему фото еды и узнай все секреты питания.
'''


pay_info_message = \
'''
Попробуй все преимущества подписки <b>Premium</b>. Возможности подписки:
<blockquote>
✅ Безлимитный доступ ко всему функционалу
✅ Получение рекомендаций по фото холодильника или фото меню
✅ Расширенная статистика питания и персонализированные советы
✅ Текстовое общение с ботом как с личным нутрициологом.
</blockquote>

Стоимость подписки 399 руб/месяц.
'''


text_message = \
'''
Функционал текстового общения ограничени в текущей версии.
Чтобы расширить возможности бота подключите Premium
'''

reg_text = \
'''
Перед использованием бота необходимо пройти регистрацию
'''

info_mes = \
'''
<b>Это бот EatSmart — твой персонализированный умный помощник по питанию.</b>

Я умею:
<blockquote>
- Считать калории по фото еды
- Следить за твоим прогрессом
- Рекомендовать приемы пищи по твоим предпочтениям
</blockquote>

'''


async def share_text(user_id: int):
    return \
f'''
Вы можете поделиться своей статистикой по ссылке: https://t.me/{(await bot.get_me())['username']}/app/share_stat?invite{user_id}
'''



