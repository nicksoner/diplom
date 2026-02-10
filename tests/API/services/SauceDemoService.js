const { expect } = require('@playwright/test');

class SauceDemoService {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://www.saucedemo.com';
  }

  // ------------------- 5 ПРОСТЫХ МЕТОДОВ -------------------

  // Метод 1: Проверить доступность сайта
  async checkAvailability() {
    const response = await this.request.get(this.baseURL);
    return {
      status: response.status(),
      ok: response.ok(),
      url: response.url()
    };
  }

  // Метод 2: Проверить заголовки
  async checkHeaders() {
    const response = await this.request.get(this.baseURL);
    const headers = response.headers();
    
    return {
      contentType: headers['content-type'],
      contentLength: headers['content-length'],
      isHtml: headers['content-type']?.includes('text/html'),
      isUtf8: headers['content-type']?.includes('utf-8')
    };
  }

  // Метод 3: Проверить содержание страницы
  async checkContent() {
    const response = await this.request.get(this.baseURL);
    const body = await response.text();
    
    return {
      hasSauceLabs: body.includes('Sauce Labs'),
      hasSwagLabs: body.includes('Swag Labs'),
      hasLogin: body.includes('login') || body.includes('Login'),
      bodyLength: body.length,
      isNotEmpty: body.length > 100
    };
  }

  // Метод 4: Проверить фавикон
  async checkFavicon() {
    const response = await this.request.get(`${this.baseURL}/favicon.ico`);
    return {
      status: response.status(),
      exists: response.ok(),
      contentType: response.headers()['content-type']
    };
  }

  // Метод 5: Проверить производительность
  async checkPerformance() {
    const startTime = Date.now();
    const response = await this.request.get(this.baseURL);
    const endTime = Date.now();
    
    return {
      responseTime: endTime - startTime,
      isFast: (endTime - startTime) < 3000
    };
  }

  // ------------------- КАСТОМНЫЕ АССЕРТЫ -------------------
  
  // Ассерт 1: Проверить статус
  assertStatus(response, expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
  }
  
  // Ассерт 2: Проверить содержание
  assertContains(text, expected) {
    expect(text).toContain(expected);
  }
  
  // Ассерт 3: Проверить тип контента
  assertContentType(response, expectedType) {
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain(expectedType);
  }
}

module.exports = SauceDemoService;