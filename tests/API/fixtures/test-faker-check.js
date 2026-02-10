const { faker } = require('@faker-js/faker');

console.log('=== Тестирование Faker 10.3.0 ===');
console.log('Версия Faker:', require('@faker-js/faker/package.json').version);
console.log('Username:', faker.internet.username());
console.log('Password:', faker.internet.password());
console.log('Email:', faker.internet.email());
console.log('First Name:', faker.person.firstName());
console.log('Last Name:', faker.person.lastName());
console.log('Zip Code:', faker.location.zipCode());
console.log('Phone:', faker.phone.number());
console.log('Street Address:', faker.location.streetAddress());
console.log('City:', faker.location.city());
console.log('Product Name:', faker.commerce.productName());
console.log('Credit Card:', faker.finance.creditCardNumber());
console.log('=================================\n');