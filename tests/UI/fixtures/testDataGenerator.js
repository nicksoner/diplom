function generateRandomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateTestData() {
  const timestamp = Date.now();
  const randomId = generateRandomString(6);
  
  return {
    users: {
      standard: { 
        username: 'standard_user', 
        password: 'secret_sauce',
        type: 'standard'
      },
      locked: { 
        username: 'locked_out_user', 
        password: 'secret_sauce',
        type: 'locked'
      },
      problem: { 
        username: 'problem_user', 
        password: 'secret_sauce',
        type: 'problem'
      },
      performance: { 
        username: 'performance_glitch_user', 
        password: 'secret_sauce',
        type: 'performance'
      }
    },
    
    products: [
      { 
        id: 'sauce-labs-backpack', 
        name: 'Sauce Labs Backpack',
        price: '$29.99'
      },
      { 
        id: 'sauce-labs-bike-light', 
        name: 'Sauce Labs Bike Light',
        price: '$9.99'
      },
      { 
        id: 'sauce-labs-bolt-t-shirt', 
        name: 'Sauce Labs Bolt T-Shirt',
        price: '$15.99'
      }
    ],
    
    checkoutData: {
      firstName: 'John_' + randomId,
      lastName: 'Doe_' + randomId,
      postalCode: (10000 + Math.floor(Math.random() * 90000)).toString(),
      email: `test_${randomId}@example.com`,
      phone: `+1${5550000000 + Math.floor(Math.random() * 10000)}`
    },
    
    testInfo: {
      testId: 'UI-TEST-' + timestamp,
      randomId: randomId,
      timestamp: new Date().toLocaleString(),
      environment: process.env.NODE_ENV || 'development'
    }
  };
}

module.exports = { generateTestData };