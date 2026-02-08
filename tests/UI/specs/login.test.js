const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Успешная авторизация', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // 1. Открываем страницу
  await loginPage.goto();
  
  // 2. Логинимся
  await loginPage.login('standard_user', 'secret_sauce');
  
  // 3. Проверяем, что залогинились
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
});

test('Ошибка при неверном пароле', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  await loginPage.login('standard_user', 'wrong_password');
  
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Username and password do not match');
});