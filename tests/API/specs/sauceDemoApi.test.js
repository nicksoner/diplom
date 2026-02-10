const { test, expect } = require('@playwright/test');
const SauceDemoService = require('../services/SauceDemoService');
const { generateTestData } = require('../fixtures/testDataGenerator');

let service;
let testData;

test.beforeEach(async ({ request }) => {
  service = new SauceDemoService(request);
  testData = generateTestData();
});

test.describe('🎓 API ТЕСТЫ ДЛЯ ДИПЛОМА (5 обязательных тестов)', () => {
  
  test('1. Проверка доступности сайта', async () => {
    const result = await service.checkAvailability();
    
    // Используем кастомные ассерты из Service
    const response = await service.request.get(service.baseURL);
    service.assertStatus(response, 200);
    
    // Стандартные ассерты
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
  });

  test('2. Проверка заголовков и Content-Type', async () => {
    const result = await service.checkHeaders();
    
    // Кастомный ассерт
    const response = await service.request.get(service.baseURL);
    service.assertContentType(response, 'text/html');
    
    // Стандартные проверки
    expect(result.isHtml).toBe(true);
    expect(result.isUtf8).toBe(true);
  });

  test('3. Проверка содержания страницы', async () => {
    const result = await service.checkContent();
    
    // Кастомный ассерт
    const response = await service.request.get(service.baseURL);
    const body = await response.text();
    service.assertContains(body, 'Swag Labs');
    
    // Стандартные проверки
    expect(result.hasSwagLabs || result.hasSauceLabs).toBe(true);
    expect(result.isNotEmpty).toBe(true);
  });

  test('4. Проверка статических ресурсов', async () => {
    const result = await service.checkFavicon();
    
    // Фавикон может быть или не быть
    expect([200, 404]).toContain(result.status);
  });

  test('5. Проверка производительности', async () => {
    const result = await service.checkPerformance();
    
    expect(result.isFast).toBe(true);
    expect(result.responseTime).toBeLessThan(5000);
  });
});