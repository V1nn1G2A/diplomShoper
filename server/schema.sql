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
