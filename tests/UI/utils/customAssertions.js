const { expect } = require('@playwright/test');

class CustomAssertions {
  // Ассерт для проверки успешного логина
  static async assertLoginSuccessful(page) {
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  }

  // Ассерт для проверки ошибки логина
  static async assertLoginFailed(loginPage, expectedError) {
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(expectedError);
  }

  // Ассерт для проверки корзины
  static async assertCartHasItems(inventoryPage, expectedCount) {
    if (expectedCount > 0) {
      await expect(inventoryPage.cartBadge).toBeVisible();
      await expect(inventoryPage.cartBadge).toHaveText(expectedCount.toString());
    } else {
      await expect(inventoryPage.cartBadge).not.toBeVisible();
    }
  }

  // Ассерт для проверки завершения заказа
  static async assertOrderComplete(page) {
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
  }

  // Ассерт для проверки видимости элемента
  static async assertElementVisible(element) {
    await expect(element).toBeVisible();
  }

  // Ассерт для проверки текста элемента
  static async assertElementText(element, expectedText) {
    await expect(element).toHaveText(expectedText);
  }
}

module.exports = CustomAssertions;