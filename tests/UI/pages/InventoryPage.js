class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartButton = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async addToCart(productName) {
    const addButton = this.page.locator(`[data-test="add-to-cart-${productName}"]`);
    await addButton.click();
  }

  async removeFromCart(productName) {
    const removeButton = this.page.locator(`[data-test="remove-${productName}"]`);
    await removeButton.click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}

module.exports = InventoryPage;