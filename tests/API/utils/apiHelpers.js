const { faker } = require('@faker-js/faker');

class ApiHelpers {
  /**
   * Генерация тестовых данных для заказа
   */
  static generateOrderData() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country()
    };
  }

  /**
   * Генерация тестовых данных для пользователя
   */
  static generateUserData(type = 'random') {
    const baseUsername = faker.internet.username().toLowerCase().replace(/[^a-z0-9]/g, '');
    
    switch(type) {
      case 'standard':
        return { username: 'standard_user', password: 'secret_sauce' };
      case 'locked':
        return { username: 'locked_out_user', password: 'secret_sauce' };
      case 'problem':
        return { username: 'problem_user', password: 'secret_sauce' };
      case 'performance':
        return { username: 'performance_glitch_user', password: 'secret_sauce' };
      default:
        return {
          username: `${baseUsername}_${faker.string.numeric(3)}`,
          password: faker.internet.password({ length: 10 }),
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName()
        };
    }
  }

  /**
   * Генерация тестовых данных для продукта
   */
  static generateProductData() {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
      category: faker.commerce.department(),
      sku: faker.string.alphanumeric(10).toUpperCase()
    };
  }

  /**
   * Валидация ответа API
   */
  static validateApiResponse(response, expectedStatus = 200) {
    expect(response.status()).toBe(expectedStatus);
    
    const contentType = response.headers()['content-type'];
    if (contentType && contentType.includes('application/json')) {
      expect(() => response.json()).not.toThrow();
    }
    
    return response;
  }

  /**
   * Извлечение данных из HTML ответа
   */
  static extractDataFromHtml(html, selector) {
    const regexMap = {
      'inventory_items': /class="inventory_item"/g,
      'product_name': /class="inventory_item_name">([^<]+)</g,
      'product_price': /class="inventory_item_price">([^<]+)</g
    };
    
    const regex = regexMap[selector];
    return regex ? (html.match(regex) || []).length : 0;
  }

  /**
   * Создание заголовков для запросов
   */
  static getHeaders(contentType = 'application/x-www-form-urlencoded') {
    return {
      'Content-Type': contentType,
      'User-Agent': 'Diploma-Api-Tests/1.0',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache'
    };
  }

  /**
   * Логирование данных для отладки
   */
  static logTestData(dataName, data) {
    console.log(`\n=== ${dataName} ===`);
    console.log(JSON.stringify(data, null, 2));
    console.log('===================\n');
  }
}

module.exports = ApiHelpers;