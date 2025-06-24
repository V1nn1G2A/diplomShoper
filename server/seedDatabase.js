// server/seedDatabase.js
const pool = require('./db/db');

const computerComponents = [
  {
    name: 'AMD Ryzen 7 5800X',
    description: 'Мощный 8-ядерный процессор для игр и работы',
    price: 32990,
    characteristics: {
      'Сокет': 'AM4',
      'Количество ядер': '8',
      'Частота': '3.8 ГГц',
      'Техпроцесс': '7 нм',
      'TDP': '105 Вт'
    }
  },
  {
    name: 'Intel Core i7-12700K',
    description: 'Процессор Intel 12-го поколения с архитектурой Alder Lake',
    price: 34500,
    characteristics: {
      'Сокет': 'LGA1700',
      'Количество ядер': '12',
      'Частота': '3.6 ГГц',
      'Техпроцесс': '10 нм',
      'TDP': '125 Вт'
    }
  },
  {
    name: 'NVIDIA GeForce RTX 4070',
    description: 'Видеокарта для игр в 1440p с поддержкой Ray Tracing',
    price: 64990,
    characteristics: {
      'Память': '12 ГБ GDDR6X',
      'Интерфейс': 'PCIe 4.0',
      'Разъемы': 'HDMI 2.1, DisplayPort 1.4a',
      'Длина': '267 мм',
      'Энергопотребление': '200 Вт'
    }
  },
  {
    name: 'AMD Radeon RX 6700 XT',
    description: 'Игровая видеокарта с 12 ГБ памяти',
    price: 45990,
    characteristics: {
      'Память': '12 ГБ GDDR6',
      'Интерфейс': 'PCIe 4.0',
      'Разъемы': 'HDMI 2.1, DisplayPort 1.4',
      'Длина': '267 мм',
      'Энергопотребление': '230 Вт'
    }
  },
  {
    name: 'Corsair Vengeance LPX 32GB',
    description: 'Комплект оперативной памяти DDR4-3200 32GB (2x16GB)',
    price: 12490,
    characteristics: {
      'Тип': 'DDR4',
      'Объем': '32 ГБ (2x16 ГБ)',
      'Частота': '3200 МГц',
      'Тайминги': 'CL16',
      'Напряжение': '1.35 В'
    }
  },
  {
    name: 'Kingston Fury Beast 16GB',
    description: 'Оперативная память DDR4-3200 16GB (2x8GB)',
    price: 6990,
    characteristics: {
      'Тип': 'DDR4',
      'Объем': '16 ГБ (2x8 ГБ)',
      'Частота': '3200 МГц',
      'Тайминги': 'CL16',
      'Напряжение': '1.35 В'
    }
  },
  {
    name: 'Samsung 980 PRO 1TB',
    description: 'Быстрый NVMe SSD накопитель для системы и игр',
    price: 11990,
    characteristics: {
      'Интерфейс': 'NVMe PCIe 4.0',
      'Объем': '1 ТБ',
      'Скорость чтения': '7000 МБ/с',
      'Скорость записи': '5000 МБ/с',
      'Форм-фактор': 'M.2 2280'
    }
  },
  {
    name: 'WD Black SN850X 2TB',
    description: 'Игровой NVMe SSD с высокой производительностью',
    price: 18990,
    characteristics: {
      'Интерфейс': 'NVMe PCIe 4.0',
      'Объем': '2 ТБ',
      'Скорость чтения': '7300 МБ/с',
      'Скорость записи': '6600 МБ/с',
      'Форм-фактор': 'M.2 2280'
    }
  },
  {
    name: 'ASUS ROG STRIX B550-F',
    description: 'Игровая материнская плата для процессоров AMD',
    price: 15990,
    characteristics: {
      'Сокет': 'AM4',
      'Чипсет': 'AMD B550',
      'Память': 'DDR4 до 128 ГБ',
      'Слоты PCIe': '2x PCIe 4.0 x16',
      'Форм-фактор': 'ATX'
    }
  },
  {
    name: 'MSI MAG Z690 TOMAHAWK',
    description: 'Материнская плата для процессоров Intel 12-го поколения',
    price: 21990,
    characteristics: {
      'Сокет': 'LGA1700',
      'Чипсет': 'Intel Z690',
      'Память': 'DDR4 до 128 ГБ',
      'Слоты PCIe': '2x PCIe 5.0 x16',
      'Форм-фактор': 'ATX'
    }
  },
  {
    name: 'be quiet! Dark Rock Pro 4',
    description: 'Мощная башенная система охлаждения для процессора',
    price: 8990,
    characteristics: {
      'Тип': 'Башенный кулер',
      'Сокеты': 'AMD AM4, Intel LGA1700',
      'TDP': '250 Вт',
      'Скорость вентилятора': '1500 об/мин',
      'Уровень шума': '24.3 дБ'
    }
  },
  {
    name: 'Corsair H100i RGB PLATINUM',
    description: 'Жидкостная система охлаждения с RGB подсветкой',
    price: 13990,
    characteristics: {
      'Тип': 'Жидкостное охлаждение',
      'Размер радиатора': '240 мм',
      'Сокеты': 'AMD AM4, Intel LGA1700',
      'TDP': '250 Вт',
      'RGB подсветка': 'Да'
    }
  },
  {
    name: 'Corsair RM850x',
    description: 'Полностью модульный блок питания 850W 80+ Gold',
    price: 14990,
    characteristics: {
      'Мощность': '850 Вт',
      'Сертификат': '80+ Gold',
      'Модульность': 'Полностью модульный',
      'Вентилятор': '135 мм',
      'Гарантия': '10 лет'
    }
  },
  {
    name: 'EVGA SuperNOVA 750 G5',
    description: 'Надежный блок питания 750W с высоким КПД',
    price: 11990,
    characteristics: {
      'Мощность': '750 Вт',
      'Сертификат': '80+ Gold',
      'Модульность': 'Полностью модульный',
      'Вентилятор': '135 мм',
      'Гарантия': '10 лет'
    }
  },
  {
    name: 'Fractal Design Define 7',
    description: 'Тихий корпус ATX с отличной вентиляцией',
    price: 17990,
    characteristics: {
      'Форм-фактор': 'ATX',
      'Материал': 'Сталь, закаленное стекло',
      'Вентиляторы': '3x 140 мм',
      'Поддержка GPU': 'до 440 мм',
      'Шумоизоляция': 'Да'
    }
  },
  {
    name: 'NZXT H7 Flow',
    description: 'Современный корпус с отличным воздушным потоком',
    price: 12990,
    characteristics: {
      'Форм-фактор': 'ATX',
      'Материал': 'Сталь, закаленное стекло',
      'Вентиляторы': '3x 120 мм',
      'Поддержка GPU': 'до 413 мм',
      'RGB подсветка': 'Нет'
    }
  }
];

const users = [
  {
    first_name: 'Иван',
    last_name: 'Иванов',
    middle_name: 'Иванович',
    email: 'ivanov@example.com',
    phone: '+79001234567',
    city: 'Москва',
    role: 'user'
  },
  {
    first_name: 'Кирилл',
    last_name: 'Шагаев',
    middle_name: 'Алексеевич',
    email: 'avcc@example.com',
    phone: '+79176313087',
    city: 'Ульяновск',
    role: 'admin'
  },
  {
    first_name: 'Мария',
    last_name: 'Сидорова',
    middle_name: null,
    email: 'sidorova@example.com',
    phone: null,
    city: 'Казань',
    role: 'user'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Начинаем заполнение базы данных...');

    // Заполнение таблицы products
    for (const component of computerComponents) {
      await pool.query(
        'INSERT INTO products (name, description, price, characteristics) VALUES ($1, $2, $3, $4)',
        [component.name, component.description, component.price, JSON.stringify(component.characteristics)]
      );
      console.log(`Добавлен товар: ${component.name}`);
    }

    // Заполнение таблицы users
    for (const user of users) {
      await pool.query(
        `INSERT INTO users (first_name, last_name, middle_name, email, phone, city, role) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [user.first_name, user.last_name, user.middle_name, user.email, user.phone, user.city, user.role]
      );
      console.log(`Добавлен пользователь: ${user.first_name} ${user.last_name}`);
    }

    console.log('База данных успешно заполнена!');
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
  }
};

module.exports = seedDatabase;