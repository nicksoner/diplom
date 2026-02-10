// tests/api/debug/debug-page.js
const { request } = require('@playwright/test');

async function debugPage() {
  const req = await request.newContext();
  const response = await req.get('https://www.saucedemo.com');
  const body = await response.text();
  
  console.log('Status:', response.status());
  console.log('Content-Type:', response.headers()['content-type']);
  console.log('Body length:', body.length);
  console.log('Has <!DOCTYPE html>:', body.includes('<!DOCTYPE html>'));
  console.log('Has <html:', body.includes('<html'));
  console.log('Has login-button:', body.includes('login-button'));
  console.log('Has user-name:', body.includes('user-name'));
  console.log('Has data-test="username":', body.includes('data-test="username"'));
  console.log('First 500 chars:', body.substring(0, 500));
  
  // Посмотрим на реальные security headers
  console.log('\nSecurity Headers:');
  console.log('X-Frame-Options:', response.headers()['x-frame-options']);
  console.log('X-Content-Type-Options:', response.headers()['x-content-type-options']);
  console.log('Content-Security-Policy:', response.headers()['content-security-policy']);
  
  await req.dispose();
}

debugPage();