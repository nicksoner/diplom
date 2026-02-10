const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const { generateTestData } = require('../fixtures/testDataGenerator');
const CustomAssertions = require('../utils/customAssertions');

test.describe('🎓 UI ТЕСТЫ ДЛЯ ДИПЛОМА (5 обязательных тестов)', () => {
  let loginPage, inventoryPage, cartPage, checkoutPage;
  let testData;

  test.beforeEach(async ({ page }) => {
    // Инициализация Page Objects
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    // Генерация тестовых данных для каждого теста
    testData = generateTestData();
    
    // Логирование сгенерированных данных (для отладки)
    console.log(`Запуск теста с ID: ${testData.testInfo.testId}`);
  });

  test('1. Успешная авторизация стандартного пользователя', async ({ page }) => {
    // Получаем данные пользователя
    const user = testData.users.standard;
    
    // Действия
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    
    // Проверки с использованием кастомных ассертов
    // Замените на:
await CustomAssertions.assertLoginSuccessful(page);
// Дополнительная проверка - есть ли продукты на странице
await expect(page.locator('.inventory_item').first()).toBeVisible();
  });

  test('2. Ошибка авторизации заблокированного пользователя', async ({ page }) => {
    // Получаем данные заблокированного пользователя
    const user = testData.users.locked;
    
    // Действия
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    
    // Проверки с использованием кастомных ассертов
    await CustomAssertions.assertLoginFailed(loginPage, 'Sorry, this user has been locked out');
    
    // Дополнительная проверка
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
  });

  test('3. Добавление товара в корзину', async ({ page }) => {
    // Подготовка
    const user = testData.users.standard;
    const product = testData.products[0];
    
    // Логин
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    
    // Добавление товара в корзину
    await inventoryPage.addToCart(product.id);
    
    // Проверки
    await CustomAssertions.assertCartHasItems(inventoryPage, 1);
    
    // Проверка что кнопка изменилась на "Remove"
    const removeButton = page.locator(`[data-test="remove-${product.id}"]`);
    await CustomAssertions.assertElementText(removeButton, 'Remove');
  });

  test('4. Удаление товара из корзины', async ({ page }) => {
    // Подготовка
    const user = testData.users.standard;
    const product = testData.products[1];
    
    // Логин
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    
    // Добавление товара
    await inventoryPage.addToCart(product.id);
    await CustomAssertions.assertCartHasItems(inventoryPage, 1);
    
    // Удаление товара
    await inventoryPage.removeFromCart(product.id);
    
    // Проверки
    await CustomAssertions.assertCartHasItems(inventoryPage, 0);
    
    // Проверка что кнопка вернулась в состояние "Add to cart"
    const addButton = page.locator(`[data-test="add-to-cart-${product.id}"]`);
    await CustomAssertions.assertElementText(addButton, 'Add to cart');
  });

  test('5. Полное оформление заказа', async ({ page }) => {
    // Подготовка
    const user = testData.users.standard;
    const product = testData.products[0];
    const customer = testData.checkoutData;
    
    console.log(`Оформление заказа для: ${customer.firstName} ${customer.lastName}, почтовый индекс: ${customer.postalCode}`);
    
    // Логин
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    
    // Добавление товара в корзину
    await inventoryPage.addToCart(product.id);
    await CustomAssertions.assertCartHasItems(inventoryPage, 1);
    
    // Переход в корзину
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Переход к оформлению
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    
    // Заполнение данных доставки
    await checkoutPage.fillShippingInfo(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );
    
    // Завершение оформления
    await checkoutPage.completeOrder();
    
    // Проверки
    await CustomAssertions.assertOrderComplete(page);
    
    // Дополнительная проверка
    await expect(page.locator('.pony_express')).toBeVisible();
  });
});