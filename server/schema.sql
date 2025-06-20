-- schema.sql
-- Удаляем и создаем базу заново
--psql -U postgres -d computer_shop -f schema.sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Создание таблицы users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  city TEXT
);

-- Создание таблицы products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  characteristics JSONB -- ключ: значение, например: {"ОЗУ": "8ГБ", "Процессор": "Intel i5"}
);

-- Создание таблицы cart_items
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  UNIQUE(user_id, product_id)
);

-- Пример тестовых данных
INSERT INTO users (first_name, last_name, middle_name, email, phone, city)
VALUES
  ('Иван', 'Иванов', 'Иванович', 'ivan@example.com', '89001234567', 'Москва'),
  ('Петр', 'Петров', 'Петрович', 'petr@example.com', '89007654321', 'Санкт-Петербург');

INSERT INTO products (name, description, price, characteristics)
VALUES
  (
    'Игровой ноутбук Acer Nitro 5',
    'Игровой ноутбук с отличной производительностью и охлаждением',
    89990.00,
    '{"ОЗУ": "16ГБ", "Процессор": "Intel Core i7", "Графика": "NVIDIA GTX 1660 Ti", "Диск": "512ГБ SSD"}'
  ),
  (
    'Монитор Samsung 27"',
    'IPS монитор с разрешением 2560x1440 и частотой обновления 144 Гц',
    23990.00,
    '{"Размер экрана": "27 дюймов", "Тип матрицы": "IPS", "Частота": "144Гц", "Разрешение": "2560x1440"}'
  );

-- Пример добавления товара в корзину
INSERT INTO cart_items (user_id, product_id, quantity)
VALUES
  (1, 1, 2), -- Иван купил 2 ноутбука
  (1, 2, 1); -- и 1 монитор
