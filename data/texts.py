from loader import bot

start_text_not_reg = \
'''
Добро пожаловать в EatSmart!

Этот бот создан, чтобы стать твоим личным помощником в трекинге питания. С ним ты сможешь постоянно получать персональные советы, сканировать КБЖУ блюда по фото или описанию, создавать новые полезные и вкусные рецепты, а также постоянно отслеживать детальную статистику рациона.

EatSmart будет работать, исходя из твоих личных особенностей и целей. Поэтому мы просим тебя пройти небольшую регистрацию по кнопке ниже. Если дойдешь до конца, то получишь целых 7 дополнительных дней бесплатного пользования!

Не переживайте, все ваши данные защищены.
'''

start_text_not_reg_webapp = \
'''
Привет, это EatSmart! Нам так приятно, что ты заглянул в наше приложение... Может, познакомимся ближе?

Этот бот создан, чтобы стать твоим личным помощником в трекинге питания. С ним ты сможешь постоянно получать персональные советы, сканировать КБЖУ блюда по фото или описанию, создавать новые полезные и вкусные рецепты, а также постоянно отслеживать детальную статистику рациона.

EatSmart будет работать, исходя из твоих личных особенностей и целей. Поэтому мы просим тебя пройти небольшую регистрацию по кнопке ниже. Если дойдешь до конца, то получишь целых 7 дополнительных дней бесплатного пользования!

Не переживайте, все ваши данные защищены.  
'''

start_text_not_reg_share = \
'''
Привет, это EatSmart!

Мы заметили, что недавно ты внимательно рассматривал чью-то статистику...

Хочешь тоже сделать свое питание правильнее и разнообразнее? Тогда давай познакомимся поближе!

Этот бот создан, чтобы стать твоим личным помощником в трекинге питания. С ним ты сможешь постоянно получать персональные советы, сканировать КБЖУ блюда по фото или описанию, создавать новые полезные и вкусные рецепты, а также постоянно отслеживать детальную статистику рациона.

EatSmart будет работать, исходя из твоих личных особенностей и целей. Поэтому мы просим тебя пройти небольшую регистрацию по кнопке ниже. Если дойдешь до конца, то получишь целых 7 дополнительных дней бесплатного пользования!

Не переживайте, все ваши данные защищены.
'''

start_text_reg = \
'''
Добро пожаловать в EatSmart!

Этот бот создан, чтобы стать твоим личным помощником в трекинге питания. С ним ты сможешь постоянно получать персональные советы, сканировать КБЖУ блюда по фото или описанию, создавать новые полезные и вкусные рецепты, а также постоянно отслеживать детальную статистику рациона.

EatSmart будет работать, исходя из твоих личных особенностей и целей.
'''

start_text_reg_webapp = \
'''
Привет, это EatSmart! Нам так приятно, что ты заглянул в наше приложение...

Этот бот создан, чтобы стать твоим личным помощником в трекинге питания. С ним ты сможешь постоянно получать персональные советы, сканировать КБЖУ блюда по фото или описанию, создавать новые полезные и вкусные рецепты, а также постоянно отслеживать детальную статистику рациона.

EatSmart будет работать, исходя из твоих личных особенностей и целей.
'''

reg_end = \
'''
Поздравляем! Теперь EatSmart будет всегда давать тебе рекомендации, учитывая все детали твоего образа жизни, предпочтения и цели. А еще мы начислили тебе целых 7 дней дополнительного бесплатного пользования!

Ну а теперь... хочешь получить свой первый гайд по питанию или проанализировать какое-нибудь блюдо?
'''

premium_text = \
'''
Цена Премиум подписки составляет 599 рублей. C ней ты сможешь целый месяц безлимитно использовать все функции EatSmart.

<tg-spoiler>Также тебе доступна реферальная программа. Пригласи друга, и если он полностью пройдет регистрацию, ты получишь еще 3 дня бесплатного пользования!</tg-spoiler>
'''

successful_payment = \
'''Спасибо за оформленную подписку! На протяжении месяца тебе будут неограниченно доступны все функции EatSmart!

Может быть, хочешь проанализировать какое-нибудь блюдо или получить персональный совет уже сейчас?'''

settings_text = \
'''
Что будем редактировать?
'''

utc_text = 'По умолчанию стоит UTC+3(Москва). Если у вас другой часовой пояс, выберите его:'
utc_edit_end = 'Часовой пояс изменен'

async def share_text(user_id: int):
    return \
f'''
Отлично, просто перешли другу это сообщение, а потом мы о нем позаботимся.

<pre>Приглашаю тебя присоединиться к EatSmart и вывести свой трекинг питания на новый уровень: https://t.me/{(await bot.get_me())['username']}/app/share_stat?invite{user_id}</pre>
'''





