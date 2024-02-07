import sqlite3
import telebot
from telebot import types

# подключение к бд
conn = sqlite3.connect("../hotel.db", check_same_thread=False)
cur = conn.cursor()
bot = telebot.TeleBot('6216828751:AAHRSKvjeyfzuv5fNzX24h5n2pYY7CYjmfQ')

about_text = """
Добро пожаловать в нашего бота!

Мы предоставляем уникальные номера и отличный сервис для наших гостей. Наши уютные номера обеспечат вам комфорт и удовольствие во время вашего пребывания.

Наши услуги:
- Доступные номера для различных потребностей
- Информация о нашем отеле и контактные данные
- Удобный доступ к нашему веб-сайту
- Показ местоположения на карте

Мы гордимся предоставлением качественного обслуживания и ждем вас в нашем отеле!

Свяжитесь с нами, если у вас есть какие-либо вопросы или пожелания. Спасибо, что выбрали нас!
Номер телефона: +7-846-900-40-40
"""

map_text = """
Мы находимся по адресу г.Самара, ул.Урицкого, д.17
Вот наше местоположение на карте: 
"""

listRooms = """
В нашем ассортименте присутствуют 5 вариаций комнат: 
1) Эконом
2) Стандарт
3) Бизнес
4) Комфорт
5) Люкс
"""

room_types = ["Эконом", "Стандарт", "Бизнес", "Комфорт", "Люкс"]

@bot.message_handler(commands=['start'])
def handle_start(message):
    # Создание клавиатуры
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)

    button1 = types.KeyboardButton('🏨 Доступные номера')
    button2 = types.KeyboardButton('ℹ️ О нас/Телефон')
    button3 = types.KeyboardButton('🌐 Наш сайт')
    button4 = types.KeyboardButton('🗺️ Показать на карте')

    keyboard.add(button1, button2, button3, button4)

    # Отправка сообщения с клавиатурой
    bot.send_message(message.chat.id, 'Выбери действие:', reply_markup=keyboard)


@bot.message_handler(func=lambda message: message.text == '🏨 Доступные номера')
def handle_rooms(message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)

    cancelBtn = types.KeyboardButton('Назад')
    economyBtn = types.KeyboardButton('Эконом')
    standartBtn = types.KeyboardButton('Стандарт')
    buisnessBtn = types.KeyboardButton('Бизнес')
    comfortBtn = types.KeyboardButton('Комфорт')
    luxeBtn = types.KeyboardButton('Люкс')

    keyboard.add(cancelBtn, economyBtn, standartBtn, buisnessBtn, comfortBtn, luxeBtn)
    # Отправка сообщения с клавиатурой
    bot.send_message(message.chat.id, listRooms, reply_markup=keyboard)


@bot.message_handler(func=lambda message: message.text == 'ℹ️ О нас/Телефон')
def handle_about(message):
    bot.send_message(message.chat.id, about_text)


@bot.message_handler(func=lambda message: message.text == '🌐 Наш сайт')
def handle_website(message):
    bot.send_message(message.chat.id, 'Наш сайт: http://hotel_smr.ru')


@bot.message_handler(func=lambda message: message.text == '🗺️ Показать на карте')
def handle_show_map(message):
    bot.send_message(message.chat.id, map_text)
    with open('./map.jpg', 'rb') as photo:
        bot.send_photo(message.chat.id, photo)


@bot.message_handler(func=lambda message: message.text == 'Назад')
def handle_cancel(message):
    # Создание клавиатуры
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)

    button1 = types.KeyboardButton('🏨 Доступные номера')
    button2 = types.KeyboardButton('ℹ️ О нас/Телефон')
    button3 = types.KeyboardButton('🌐 Наш сайт')
    button4 = types.KeyboardButton('🗺️ Показать на карте')

    keyboard.add(button1, button2, button3, button4)

    # Отправка сообщения с клавиатурой
    bot.send_message(message.chat.id, 'Выбери действие:', reply_markup=keyboard)


@bot.message_handler(func=lambda message: message.text in room_types)
def handle_show_room(message):
    query = "SELECT * FROM Hotel_room WHERE name = ?"
    cur.execute(query, (message.text,))

    # Получение результатов запроса
    row = cur.fetchone()

    bot.send_message(message.chat.id, f"""
Название: {row[1]}
Цена: {row[2]}
Описание: {row[3]} 
""")
    bot.send_photo(message.chat.id, row[4])



bot.polling()
