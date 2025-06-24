-- schema.sql
-- Удаляем и создаем базу заново
-- psql -U postgres -d computer_shop -f schema.sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Создание таблицы users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  city TEXT,
  role TEXT DEFAULT 'user'
);

-- Создание таблицы products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  characteristics JSONB,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Прочее'
);

-- Создание таблицы cart
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  UNIQUE(user_id, product_id)
);

-- Тестовые пользователи
INSERT INTO users (first_name, last_name, middle_name, email, phone, city, role)
VALUES
  ('Иван', 'Иванов', 'Иванович', 'ivan@example.com', '89001234567', 'Москва', 'admin'),
  ('Петр', 'Петров', 'Петрович', 'petr@example.com', '89007654321', 'Санкт-Петербург', 'user'),
  ('Анна', 'Сидорова', 'Александровна', 'anna@example.com', '89005555555', 'Екатеринбург', 'user');

-- Большой набор тестовых товаров с категориями
INSERT INTO products (name, description, price, characteristics, image_url, category)
VALUES
  -- Ноутбуки
  (
    'Игровой ноутбук ASUS ROG Strix G15',
    'Мощный игровой ноутбук с процессором AMD Ryzen 7 и видеокартой RTX 3060',
    129990.00,
    '{"ОЗУ": "16ГБ DDR4", "Процессор": "AMD Ryzen 7 5800H", "Графика": "NVIDIA RTX 3060", "Диск": "1ТБ SSD", "Экран": "15.6 144Hz"}',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    'Ноутбуки'
  ),
  (
    'MacBook Pro 16" M2',
    'Профессиональный ноутбук Apple с чипом M2 Pro',
    249990.00,
    '{"ОЗУ": "16ГБ", "Процессор": "Apple M2 Pro", "Диск": "512ГБ SSD", "Экран": "16.2 Liquid Retina XDR", "Батарея": "до 22 часов"}',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    'Ноутбуки'
  ),
  
  -- Мониторы
  (
    'Монитор Samsung Odyssey G7 27"',
    'Изогнутый игровой монитор с высокой частотой обновления',
    42990.00,
    '{"Размер": "27 дюймов", "Тип": "VA", "Частота": "240Гц", "Разрешение": "2560x1440", "Изогнутость": "1000R"}',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    'Мониторы'
  ),
  (
    'LG UltraWide 34" 4K',
    'Ультраширокий монитор для профессиональной работы',
    89990.00,
    '{"Размер": "34 дюйма", "Тип": "IPS", "Частота": "60Гц", "Разрешение": "3440x1440", "HDR": "HDR10"}',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop',
    'Мониторы'
  ),
  
  -- Периферия
  (
    'Клавиатура механическая Razer BlackWidow V3',
    'Механическая клавиатура с RGB подсветкой и переключателями Green',
    8990.00,
    '{"Тип": "Механическая", "Переключатели": "Razer Green", "Подсветка": "RGB", "Подключение": "USB-C"}',
    'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
    'Периферия'
  ),
  (
    'Мышь Logitech G Pro X Superlight',
    'Беспроводная игровая мышь с датчиком HERO 25K',
    13990.00,
    '{"Тип": "Беспроводная", "Датчик": "HERO 25K", "Вес": "63г", "Батарея": "70 часов"}',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    'Периферия'
  ),
  
  -- Видеокарты
  (
    'Видеокарта NVIDIA GeForce RTX 4070',
    'Современная видеокарта для игр в 1440p с поддержкой ray tracing',
    84990.00,
    '{"Память": "12ГБ GDDR6X", "Архитектура": "Ada Lovelace", "Разъемы": "3x DisplayPort, 1x HDMI", "Мощность": "200W"}',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
    'Видеокарты'
  ),
  (
    'AMD Radeon RX 7800 XT',
    'Мощная видеокарта AMD для игр в высоком разрешении',
    69990.00,
    '{"Память": "16ГБ GDDR6", "Архитектура": "RDNA 3", "Разъемы": "2x DisplayPort, 2x HDMI", "Мощность": "263W"}',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    'Видеокарты'
  ),
  
  -- Процессоры
  (
    'Процессор Intel Core i7-13700K',
    'Высокопроизводительный процессор для игр и работы',
    41990.00,
    '{"Ядра": "16 (8P+8E)", "Потоки": "24", "Частота": "3.4-5.4 ГГц", "Сокет": "LGA1700", "Кэш": "30МБ"}',
    'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    'Процессоры'
  ),
  (
    'AMD Ryzen 9 7900X',
    'Флагманский процессор AMD для профессиональных задач',
    49990.00,
    '{"Ядра": "12", "Потоки": "24", "Частота": "4.7-5.6 ГГц", "Сокет": "AM5", "Кэш": "76МБ"}',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'Процессоры'
  ),
  
  -- Материнские платы
  (
    'Материнская плата ASUS ROG Strix Z790-E',
    'Игровая материнская плата с поддержкой DDR5 и PCIe 5.0',
    34990.00,
    '{"Сокет": "LGA1700", "Чипсет": "Z790", "Память": "DDR5-5600", "Слоты": "4x DIMM", "Разъемы": "WiFi 6E, USB 3.2"}',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    'Материнские платы'
  ),
  
  -- Оперативная память
  (
    'Оперативная память Corsair Vengeance LPX 32ГБ',
    'Высокоскоростная память DDR4 для игр и профессиональных задач',
    12990.00,
    '{"Объем": "32ГБ (2x16ГБ)", "Тип": "DDR4", "Частота": "3200МГц", "Тайминги": "16-18-18-36", "Профиль": "XMP 2.0"}',
    'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    'Оперативная память'
  ),
  
  -- Накопители
  (
    'SSD накопитель Samsung 980 PRO 1ТБ',
    'Быстрый NVMe SSD для загрузки системы и игр',
    11990.00,
    '{"Объем": "1ТБ", "Интерфейс": "PCIe 4.0 x4", "Скорость чтения": "7000 МБ/с", "Скорость записи": "5000 МБ/с", "Форм-фактор": "M.2 2280"}',
    'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    'Накопители'
  ),
  
  -- Блоки питания
  (
    'Блок питания Corsair RM850x',
    'Модульный блок питания 80+ Gold с тихой работой',
    15990.00,
    '{"Мощность": "850Вт", "Сертификат": "80+ Gold", "Модульность": "Полная", "Вентилятор": "135мм", "Гарантия": "10 лет"}',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    'Блоки питания'
  ),
  
  -- Корпуса
  (
    'Корпус Fractal Design Define 7',
    'Тихий корпус среднего размера с отличной вентиляцией',
    19990.00,
    '{"Тип": "Midi Tower", "Материал": "Сталь", "Вентиляторы": "3x 140мм", "Отсеки": "2x 5.25, 8x 2.5/3.5", "Размер": "543x233x465мм"}',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
    'Корпуса'
  ),
  
  -- Охлаждение
  (
    'Кулер для процессора Noctua NH-D15',
    'Высокопроизводительный воздушный кулер с двумя вентиляторами',
    9990.00,
    '{"Тип": "Воздушное", "Вентиляторы": "2x 140мм", "Сокеты": "Intel/AMD", "Высота": "165мм", "Шум": "до 24.6 дБ"}',
    'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    'Охлаждение'
  ),
  
  -- Аудио
  (
    'Наушники SteelSeries Arctis 7',
    'Беспроводные игровые наушники с объемным звуком',
    16990.00,
    '{"Тип": "Беспроводные", "Драйверы": "40мм", "Частота": "20-20000 Гц", "Батарея": "24 часа", "Микрофон": "Выдвижной"}',
    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=300&fit=crop',
    'Аудио'
  ),
  (
    'Колонки Logitech Z623',
    'Мощная акустическая система 2.1 с сабвуфером',
    8990.00,
    '{"Тип": "2.1", "Мощность": "200Вт", "Сабвуфер": "130Вт", "Сателлиты": "35Вт x2", "Подключение": "3.5мм, RCA"}',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    'Аудио'
  );

-- Тестовые товары в корзине
INSERT INTO cart (user_id, product_id, quantity)
VALUES
  (1, 1, 1),
  (1, 2, 1),
  (2, 3, 2),
  (2, 4, 1);