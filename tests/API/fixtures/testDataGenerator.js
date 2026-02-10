// Простой генератор данных для UI тестов
function generateTestData() {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  
  return {
    // Фиксированные пользователи из сайта
    users: {
      standard: { username: 'standard_user', password: 'secret_sauce' },
      locked: { username: 'locked_out_user', password: 'secret_sauce' },
      problem: { username: 'problem_user', password: 'secret_sauce' },
      performance: { username: 'performance_glitch_user', password: 'secret_sauce' }
    },
    
    // Продукты для тестирования
    products: [
      { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack', price: '$29.99' },
      { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light', price: '$9.99' },
      { id: 'sauce-labs-bolt-t-shirt', name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' }
    ],
    
    // Данные для оформления заказа
    checkoutData: {
      firstName: `John${randomId}`,
      lastName: `Doe${randomId}`,
      postalCode: `${timestamp.toString().slice(-5)}`
    },
    
    testInfo: {
      id: `UI-TEST-${timestamp}`,
      timestamp: new Date().toLocaleString()
    }
  };
}

module.exports = { generateTestData };