const { allure } = require('allure-playwright');

class AllureHelper {
  static async attachScreenshot(page, name = 'Screenshot') {
    try {
      const screenshot = await page.screenshot();
      await allure.attachment(name, screenshot, 'image/png');
      console.log(`📸 Скриншот: ${name}`);
    } catch (error) {
      console.log(`❌ Ошибка скриншота: ${error.message}`);
    }
  }
}

module.exports = AllureHelper;