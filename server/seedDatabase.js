// server/seedDatabase.js
const pool = require('./db/db');

const computerComponents = [
  // Процессоры
  {
    name: 'AMD Ryzen 7 5800X',
    description: 'Мощный 8-ядерный процессор для игр и работы с высокой производительностью',
    price: 32990,
    characteristics: {
      'Сокет': 'AM4',
      'Количество ядер': '8',
      'Частота': '3.8 ГГц',
      'Техпроцесс': '7 нм',
      'TDP': '105 Вт'
    },
    image_url: 'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    category: 'Процессоры'
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
    },
    image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Процессоры'
  },
  {
    name: 'AMD Ryzen 9 7900X',
    description: 'Флагманский процессор AMD с архитектурой Zen 4',
    price: 49990,
    characteristics: {
      'Сокет': 'AM5',
      'Количество ядер': '12',
      'Частота': '4.7 ГГц',
      'Техпроцесс': '5 нм',
      'TDP': '170 Вт'
    },
    image_url: 'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    category: 'Процессоры'
  },

  // Видеокарты
  {
    name: 'NVIDIA GeForce RTX 4070',
    description: 'Видеокарта для игр в 1440p с поддержкой Ray Tracing и DLSS 3',
    price: 64990,
    characteristics: {
      'Память': '12 ГБ GDDR6X',
      'Интерфейс': 'PCIe 4.0',
      'Разъемы': 'HDMI 2.1, DisplayPort 1.4a',
      'Длина': '267 мм',
      'Энергопотребление': '200 Вт'
    },
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
    category: 'Видеокарты'
  },
  {
    name: 'AMD Radeon RX 7800 XT',
    description: 'Мощная игровая видеокарта с архитектурой RDNA 3',
    price: 69990,
    characteristics: {
      'Память': '16 ГБ GDDR6',
      'Интерфейс': 'PCIe 4.0',
      'Разъемы': 'HDMI 2.1, DisplayPort 2.1',
      'Длина': '276 мм',
      'Энергопотребление': '263 Вт'
    },
    image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    category: 'Видеокарты'
  },
  {
    name: 'NVIDIA GeForce RTX 4080',
    description: 'Топовая видеокарта для игр в 4K с максимальными настройками',
    price: 124990,
    characteristics: {
      'Память': '16 ГБ GDDR6X',
      'Интерфейс': 'PCIe 4.0',
      'Разъемы': 'HDMI 2.1, DisplayPort 1.4a',
      'Длина': '304 мм',
      'Энергопотребление': '320 Вт'
    },
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
    category: 'Видеокарты'
  },

  // Оперативная память
  {
    name: 'Corsair Vengeance LPX 32GB',
    description: 'Комплект оперативной памяти DDR4-3200 32GB (2x16GB) для игр',
    price: 12490,
    characteristics: {
      'Тип': 'DDR4',
      'Объем': '32 ГБ (2x16 ГБ)',
      'Частота': '3200 МГц',
      'Тайминги': 'CL16',
      'Напряжение': '1.35 В'
    },
    image_url: 'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    category: 'Оперативная память'
  },
  {
    name: 'Kingston Fury Beast 16GB',
    description: 'Оперативная память DDR4-3200 16GB (2x8GB) с RGB подсветкой',
    price: 6990,
    characteristics: {
      'Тип': 'DDR4',
      'Объем': '16 ГБ (2x8 ГБ)',
      'Частота': '3200 МГц',
      'Тайминги': 'CL16',
      'Напряжение': '1.35 В'
    },
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Оперативная память'
  },
  {
    name: 'G.Skill Trident Z5 RGB 32GB',
    description: 'Высокоскоростная память DDR5-5600 с RGB подсветкой',
    price: 18990,
    characteristics: {
      'Тип': 'DDR5',
      'Объем': '32 ГБ (2x16 ГБ)',
      'Частота': '5600 МГц',
      'Тайминги': 'CL36',
      'Напряжение': '1.25 В'
    },
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Оперативная память'
  },

  // Накопители
  {
    name: 'Samsung 980 PRO 1TB',
    description: 'Быстрый NVMe SSD накопитель PCIe 4.0 для системы и игр',
    price: 11990,
    characteristics: {
      'Интерфейс': 'NVMe PCIe 4.0',
      'Объем': '1 ТБ',
      'Скорость чтения': '7000 МБ/с',
      'Скорость записи': '5000 МБ/с',
      'Форм-фактор': 'M.2 2280'
    },
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Накопители'
  },
  {
    name: 'WD Black SN850X 2TB',
    description: 'Игровой NVMe SSD с радиатором и высокой производительностью',
    price: 18990,
    characteristics: {
      'Интерфейс': 'NVMe PCIe 4.0',
      'Объем': '2 ТБ',
      'Скорость чтения': '7300 МБ/с',
      'Скорость записи': '6600 МБ/с',
      'Форм-фактор': 'M.2 2280'
    },
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Накопители'
  },
  {
    name: 'Seagate BarraCuda 2TB',
    description: 'Надежный жесткий диск для хранения больших объемов данных',
    price: 5990,
    characteristics: {
      'Интерфейс': 'SATA III',
      'Объем': '2 ТБ',
      'Скорость': '7200 об/мин',
      'Кэш': '256 МБ',
      'Форм-фактор': '3.5 дюйма'
    },
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    category: 'Накопители'
  },

  // Материнские платы
  {
    name: 'ASUS ROG STRIX B550-F',
    description: 'Игровая материнская плата для процессоров AMD с Wi-Fi 6',
    price: 15990,
    characteristics: {
      'Сокет': 'AM4',
      'Чипсет': 'AMD B550',
      'Память': 'DDR4 до 128 ГБ',
      'Слоты PCIe': '2x PCIe 4.0 x16',
      'Форм-фактор': 'ATX'
    },
    image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    category: 'Материнские платы'
  },
  {
    name: 'MSI MAG Z690 TOMAHAWK',
    description: 'Материнская плата для процессоров Intel 12-го поколения с DDR5',
    price: 21990,
    characteristics: {
      'Сокет': 'LGA1700',
      'Чипсет': 'Intel Z690',
      'Память': 'DDR5 до 128 ГБ',
      'Слоты PCIe': '2x PCIe 5.0 x16',
      'Форм-фактор': 'ATX'
    },
    image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    category: 'Материнские платы'
  },
  {
    name: 'GIGABYTE B650 AORUS ELITE',
    description: 'Современная материнская плата для процессоров AMD Ryzen 7000',
    price: 18990,
    characteristics: {
      'Сокет': 'AM5',
      'Чипсет': 'AMD B650',
      'Память': 'DDR5 до 128 ГБ',
      'Слоты PCIe': '1x PCIe 5.0 x16, 2x PCIe 4.0 x16',
      'Форм-фактор': 'ATX'
    },
    image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    category: 'Материнские платы'
  },

  // Охлаждение
  {
    name: 'be quiet! Dark Rock Pro 4',
    description: 'Мощная башенная система охлаждения с тихой работой',
    price: 8990,
    characteristics: {
      'Тип': 'Башенный кулер',
      'Сокеты': 'AMD AM4/AM5, Intel LGA1700',
      'TDP': '250 Вт',
      'Скорость вентилятора': '1500 об/мин',
      'Уровень шума': '24.3 дБ'
    },
    image_url: 'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    category: 'Охлаждение'
  },
  {
    name: 'Corsair H100i RGB PLATINUM',
    description: 'Жидкостная система охлаждения с RGB подсветкой и радиатором 240мм',
    price: 13990,
    characteristics: {
      'Тип': 'Жидкостное охлаждение',
      'Размер радиатора': '240 мм',
      'Сокеты': 'AMD AM4/AM5, Intel LGA1700',
      'TDP': '250 Вт',
      'RGB подсветка': 'Да'
    },
    image_url: 'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    category: 'Охлаждение'
  },
  {
    name: 'Noctua NH-D15',
    description: 'Премиальный воздушный кулер с двумя вентиляторами',
    price: 9990,
    characteristics: {
      'Тип': 'Башенный кулер',
      'Сокеты': 'AMD AM4/AM5, Intel LGA1700',
      'TDP': '220 Вт',
      'Вентиляторы': '2x 140мм',
      'Уровень шума': '24.6 дБ'
    },
    image_url: 'https://images.unsplash.com/photo-1555617078-d3dea82e7a37?w=400&h=300&fit=crop',
    category: 'Охлаждение'
  },

  // Блоки питания
  {
    name: 'Corsair RM850x',
    description: 'Полностью модульный блок питания 850W 80+ Gold с тихим вентилятором',
    price: 14990,
    characteristics: {
      'Мощность': '850 Вт',
      'Сертификат': '80+ Gold',
      'Модульность': 'Полностью модульный',
      'Вентилятор': '135 мм',
      'Гарантия': '10 лет'
    },
    image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    category: 'Блоки питания'
  },
  {
    name: 'EVGA SuperNOVA 750 G5',
    description: 'Надежный блок питания 750W с высоким КПД и длительной гарантией',
    price: 11990,
    characteristics: {
      'Мощность': '750 Вт',
      'Сертификат': '80+ Gold',
      'Модульность': 'Полностью модульный',
      'Вентилятор': '135 мм',
      'Гарантия': '10 лет'
    },
    image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    category: 'Блоки питания'
  },
  {
    name: 'Seasonic Focus GX-650',
    description: 'Компактный и эффективный блок питания 650W 80+ Gold',
    price: 9990,
    characteristics: {
      'Мощность': '650 Вт',
      'Сертификат': '80+ Gold',
      'Модульность': 'Полностью модульный',
      'Вентилятор': '120 мм',
      'Гарантия': '10 лет'
    },
    image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    category: 'Блоки питания'
  },

  // Корпуса
  {
    name: 'Fractal Design Define 7',
    description: 'Тихий корпус ATX с отличной вентиляцией и шумоизоляцией',
    price: 17990,
    characteristics: {
      'Форм-фактор': 'ATX',
      'Материал': 'Сталь, закаленное стекло',
      'Вентиляторы': '3x 140 мм',
      'Поддержка GPU': 'до 440 мм',
      'Шумоизоляция': 'Да'
    },
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
    category: 'Корпуса'
  },
  {
    name: 'NZXT H7 Flow',
    description: 'Современный корпус с отличным воздушным потоком и RGB подсветкой',
    price: 12990,
    characteristics: {
      'Форм-фактор': 'ATX',
      'Материал': 'Сталь, закаленное стекло',
      'Вентиляторы': '3x 120 мм',
      'Поддержка GPU': 'до 413 мм',
      'RGB подсветка': 'Да'
    },
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
    category: 'Корпуса'
  },
  {
    name: 'Lian Li PC-O11 Dynamic',
    description: 'Популярный корпус для жидкостного охлаждения с двойным стеклом',
    price: 15990,
    characteristics: {
      'Форм-фактор': 'ATX',
      'Материал': 'Алюминий, закаленное стекло',
      'Вентиляторы': 'Без вентиляторов',
      'Поддержка GPU': 'до 420 мм',
      'Особенности': 'Двойное стекло'
    },
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
    category: 'Корпуса'
  },
  {
    name: 'Игровая сборка Ultimate RTX',
    description: 'Максимальная производительность для 4K-гейминга и стриминга.',
    price: 285000,
    characteristics: {
      'Процессор': 'Intel Core i9-13900K',
      'Видеокарта': 'NVIDIA GeForce RTX 4090 24GB',
      'Оперативная память': '64GB DDR5 6000MHz',
      'Хранение данных': '2TB NVMe SSD + 4TB HDD',
      'Материнская плата': 'ASUS ROG Maximus Z790 Hero',
      'Блок питания': '1000W 80+ Platinum',
      'Корпус': 'Lian Li PC-O11 Dynamic',
      'Охлаждение': 'Кастомная СВО'
    },
    image_url: 'https://images.unsplash.com/photo-1619531210520-b802c8fe46c4?w=400&h=300&fit=crop',
    category: 'Сборки'
  },
  {
    name: 'Сборка для дизайнеров PRO',
    description: 'Рабочая станция для рендеринга, 3D-графики и Adobe пакета.',
    price: 210000,
    characteristics: {
      'Процессор': 'AMD Ryzen 9 7950X',
      'Видеокарта': 'NVIDIA RTX 4080 16GB',
      'Оперативная память': '64GB DDR5 5600MHz',
      'Хранение данных': '1TB SSD + 2TB HDD',
      'Материнская плата': 'MSI X670E ACE',
      'Блок питания': '850W 80+ Gold',
      'Корпус': 'Fractal Design Define 7',
      'Охлаждение': 'Noctua NH-D15'
    },
    image_url: 'https://images.unsplash.com/photo-1626908013355-26536f110b8c?w=400&h=300&fit=crop',
    category: 'Сборки'
  },
  {
    name: 'Бюджетный геймер',
    description: 'Отличный выбор для игр на средне-высоких настройках в 1080p.',
    price: 75000,
    characteristics: {
      'Процессор': 'Intel Core i5-12400F',
      'Видеокарта': 'GeForce GTX 1660 Super 6GB',
      'Оперативная память': '16GB DDR4 3200MHz',
      'Хранение данных': '512GB SSD',
      'Материнская плата': 'Gigabyte B660M DS3H',
      'Блок питания': '600W 80+ Bronze',
      'Корпус': 'DEEPCOOL MATREXX 55',
      'Охлаждение': 'Стоковое'
    },
    image_url: 'https://images.unsplash.com/photo-1610484827261-f64d6ee6bdc3?w=400&h=300&fit=crop',
    category: 'Сборки'
  },
  {
    name: 'Офисная сборка Silent Box',
    description: 'Тихий и компактный ПК для работы и учебы.',
    price: 48000,
    characteristics: {
      'Процессор': 'AMD Ryzen 5 5600G',
      'Видеокарта': 'Встроенная Radeon Vega',
      'Оперативная память': '16GB DDR4 3200MHz',
      'Хранение данных': '512GB SSD',
      'Материнская плата': 'ASRock B550M-ITX/ac',
      'Блок питания': '450W 80+ Bronze',
      'Корпус': 'Cooler Master NR200',
      'Охлаждение': 'Низкопрофильное'
    },
    image_url: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=300&fit=crop',
    category: 'Сборки'
  },
  {
    name: 'Стриминговая сборка StreamX',
    description: 'Оптимальное решение для стримов и гейминга в 2K.',
    price: 135000,
    characteristics: {
      'Процессор': 'Intel Core i7-13700K',
      'Видеокарта': 'NVIDIA RTX 4070 Ti 12GB',
      'Оперативная память': '32GB DDR5 5600MHz',
      'Хранение данных': '1TB SSD',
      'Материнская плата': 'ASUS TUF Z790-Plus',
      'Блок питания': '750W 80+ Gold',
      'Корпус': 'Phanteks Eclipse G360A',
      'Охлаждение': '240мм СЖО'
    },
    image_url: 'https://images.unsplash.com/photo-1587202372775-9897f90d7a5e?w=400&h=300&fit=crop',
    category: 'Сборки'
  }
]

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
        'INSERT INTO products (name, description, price, characteristics, category) VALUES ($1, $2, $3, $4, $5)',
        [component.name, component.description, component.price, JSON.stringify(component.characteristics), component.category]
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