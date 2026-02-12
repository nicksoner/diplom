неа, давайка все в маркдаун чтобы я смог просто вставить
markdown
# 🎓 Дипломный проект: Автоматизация тестирования Sauce Demo

[![Run Auto Tests](https://github.com/nicksoner/diplom/actions/workflows/run-tests.yml/badge.svg)](https://github.com/nicksoner/diplom/actions/workflows/run-tests.yml)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-GitHub%20Pages-blue)](https://nicksoner.github.io/diplom/)
[![Allure TestOps](https://img.shields.io/badge/Allure%20TestOps-Integration-purple)](https://allure.autotests.cloud)
[![Telegram](https://img.shields.io/badge/Telegram-Notifications-26A5E4)](https://t.me/)

---

## 📌 О проекте

**Sauce Demo Diploma** — дипломный проект по автоматизации тестирования интернет-магазина [Sauce Demo](https://www.saucedemo.com).

**Цель:** продемонстрировать навыки автоматизатора тестирования, полученные в рамках курса.

**Реализовано:**
- ✅ UI тесты с Page Object, генератором данных, кастомными ассертами
- ✅ API тесты с Service Object, генератором данных
- ✅ CI/CD на GitHub Actions с уведомлениями в Telegram
- ✅ Allure отчеты с историей в GitHub Pages
- ✅ Интеграция с Allure TestOps + скриншоты

---

## 🛠 Технологический стек

| Технология | Назначение |
|-----------|-----------|
| Playwright | Автоматизация браузера и API |
| JavaScript/Node.js | Язык программирования |
| Allure Report | Формирование отчетов |
| Allure TestOps | Управление тестовой документацией |
| GitHub Actions | CI/CD |
| Telegram Bot | Уведомления |
| Page Object / Service Object | Архитектурные паттерны |
| Faker.js | Генерация тестовых данных |

---

## ✅ Реализованные тесты

### 🔹 UI тесты (5 тестов)

| № | Тест | Описание | Проверки |
|---|------|---------|---------|
| 1 | **Успешная авторизация** | Вход под `standard_user` | URL, заголовок, товары |
| 2 | **Ошибка авторизации** | Вход под `locked_out_user` | Сообщение об ошибке |
| 3 | **Добавление в корзину** | Добавление Sauce Labs Backpack | Счетчик, кнопка Remove |
| 4 | **Удаление из корзины** | Удаление Sauce Labs Bike Light | Счетчик, кнопка Add to cart |
| 5 | **Полное оформление заказа** | Логин → товар → корзина → данные → завершение | URL, заголовок, скриншот |

### 🔸 API тесты (5 тестов)

| № | Тест | Метод | Ожидаемый результат |
|---|------|-------|---------------------|
| 1 | **Доступность сайта** | GET / | Статус 200 |
| 2 | **Content-Type** | GET / | text/html; charset=utf-8 |
| 3 | **Наличие контента** | GET / | Содержит "Swag Labs" |
| 4 | **Статические ресурсы** | GET /favicon.ico | 200 или 404 |
| 5 | **Производительность** | GET / | Время ответа < 5с |

---

## 📁 Структура проекта
diplom/
├── .github/
│ └── workflows/
│ ├── run-tests.yml # Основной CI/CD пайплайн
│ └── publish-allure.yml # Публикация Allure отчета
├── tests/
│ ├── UI/
│ │ ├── pages/ # Page Objects (4 класса)
│ │ │ ├── LoginPage.js
│ │ │ ├── InventoryPage.js
│ │ │ ├── CartPage.js
│ │ │ └── CheckoutPage.js
│ │ ├── fixtures/ # Генератор тестовых данных
│ │ │ └── testDataGenerator.js
│ │ ├── utils/ # Кастомные ассерты
│ │ │ └── customAssertions.js
│ │ └── specs/ # UI тесты
│ │ └── sauceDemoUiTests.test.js
│ ├── API/
│ │ ├── services/ # Service Object
│ │ │ └── SauceDemoService.js
│ │ ├── fixtures/ # Генератор тестовых данных
│ │ │ └── testDataGenerator.js
│ │ └── specs/ # API тесты
│ │ └── sauceDemoApi.test.js
│ └── helpers/ # Вспомогательные утилиты
│ └── allureHelper.js
├── allure-results/ # Результаты Allure (gitignored)
├── allure-report/ # Сгенерированный отчет (gitignored)
├── playwright.config.js # Конфигурация Playwright
├── package.json # Зависимости
└── README.md # Документация

text

---

## 🚀 Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/nicksoner/diplom.git
cd diplom
2. Установка зависимостей
bash
npm install
npx playwright install chromium
3. Запуск тестов
bash
# Все тесты
npm test

# Только UI тесты
npm run test:ui

# Только API тесты
npm run test:api

# С генерацией Allure отчета
npm run test:allure
4. Просмотр Allure отчета
bash
# Сгенерировать отчет
allure generate allure-results --clean

# Открыть в браузере
allure open allure-report
📊 Отчетность
🔹 Allure Report (GitHub Pages)
Актуальный отчет: https://nicksoner.github.io/diplom/

📌 Что содержит:

📈 Графики прохождения тестов

🏷 Детальная информация по каждому тесту

📸 Скриншоты успешных сценариев

🔄 История запусков

🔸 Allure TestOps
Платформа: https://allure.autotests.cloud
Логин: allure8
Пароль: allure8
Проект: nicksoner

📌 Что реализовано:

✅ Автоматическая загрузка результатов

✅ 337 файлов результатов

✅ 105 скриншотов

✅ Интеграция с GitHub Actions

🔄 CI/CD: GitHub Actions + Telegram
Триггеры запуска:
✅ Push в main / master

✅ Pull Request

✅ Ручной запуск (workflow_dispatch)

Пайплайн:
text
1. Checkout репозитория
2. Установка Node.js и зависимостей
3. Установка Playwright
4. Запуск UI тестов
5. Запуск API тестов
6. Генерация Allure отчета
7. Публикация в GitHub Pages
8. Загрузка в Allure TestOps
9. Отправка уведомления в Telegram
📱 Telegram уведомления
Пример сообщения:

text
🎓 Diploma Project: Sauce Demo

✅ Tests completed!

📊 Status: success
🌿 Branch: master
🔗 https://github.com/nicksoner/diplom/actions/runs/21958519679
🧪 Примеры кода
Page Object (LoginPage.js)
javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = LoginPage;
Service Object (SauceDemoService.js)
javascript
class SauceDemoService {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://www.saucedemo.com';
  }

  async checkAvailability() {
    const response = await this.request.get(this.baseURL);
    return {
      status: response.status(),
      ok: response.ok(),
      url: response.url()
    };
  }

  async checkContent() {
    const response = await this.request.get(this.baseURL);
    const body = await response.text();
    return {
      hasSwagLabs: body.includes('Swag Labs'),
      bodyLength: body.length
    };
  }
}

module.exports = SauceDemoService;
Кастомный ассерт (customAssertions.js)
javascript
const { expect } = require('@playwright/test');

class CustomAssertions {
  static async assertLoginSuccessful(page) {
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  }

  static async assertLoginFailed(loginPage, expectedError) {
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(expectedError);
  }
}

module.exports = CustomAssertions;
Генератор данных (testDataGenerator.js)
javascript
function generateTestData() {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  
  return {
    users: {
      standard: { username: 'standard_user', password: 'secret_sauce' },
      locked: { username: 'locked_out_user', password: 'secret_sauce' }
    },
    products: [
      { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
      { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' }
    ],
    checkoutData: {
      firstName: `John_${randomId}`,
      lastName: `Doe_${randomId}`,
      postalCode: (10000 + Math.floor(Math.random() * 90000)).toString()
    },
    testInfo: {
      testId: `UI-TEST-${timestamp}`,
      randomId: randomId
    }
  };
}

module.exports = { generateTestData };
📈 Итоги выполнения дипломного проекта
Требование	Реализация	Статус
UI тесты: 5 шт + Page Object + генератор данных + кастомные ассерты	✅ 5 тестов, 4 Page Object, генератор, 6 ассертов	ГОТОВО
API тесты: 5 шт + Service Object + генератор данных	✅ 5 тестов, 1 Service Object, генератор	ГОТОВО
CI/CD: GitHub Actions	✅ Рабочий пайплайн	ГОТОВО
Уведомления в Telegram	✅ Интеграция с ботом	ГОТОВО
Allure отчеты	✅ Подключены	ГОТОВО
История в GitHub Pages	✅ https://nicksoner.github.io/diplom/	ГОТОВО
Скриншоты в Allure	✅ 105 скриншотов	ГОТОВО
Allure TestOps	✅ Загрузка результатов	ГОТОВО
🎓 Заключение
Дипломный проект выполнен в полном соответствии с требованиями:

✅ UI автоматизация — 5 тестов с Page Object, генератором данных, кастомными ассертами
✅ API автоматизация — 5 тестов с Service Object, генератором данных
✅ CI-CD — GitHub Actions с уведомлениями в Telegram
✅ Reporting — Allure + GitHub Pages + Allure TestOps + скриншоты

👨‍💻 Автор
Николай (@nicksoner)
Студент курса «Автоматизация тестирования»
📅 Срок сдачи: 19.02.2026

📬 Контакты
GitHub: https://github.com/nicksoner

Проект: https://github.com/nicksoner/diplom

Allure Report: https://nicksoner.github.io/diplom/

