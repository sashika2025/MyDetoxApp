describe('TS03 - Product Exploration Suite', () => {

  beforeAll(async () => {
    // 1. Launch the app fresh and bypass security login walls
    await device.launchApp({ delete: true, newInstance: true });
    await element(by.id('loginButton')).tap();

    await element(by.id('usernameInput')).typeText('sashika');
    await element(by.id('passwordInput')).typeText('pwd-123');
    await element(by.id('submitButton')).tap();

    // 2. Double-check we hit the product marketplace layout
    await expect(element(by.id('productList'))).toBeVisible();
  });

  /**
   * TC13 - Main Feed Check
   */
  it('TC13 - should accurately render the names and price values for all 4 inventory items', async () => {
    // Verify Nike Shoes
    await expect(element(by.id('productName_1'))).toHaveText('Nike Shoes');
    await expect(element(by.id('productPrice_1'))).toHaveText('$120');

    // Verify Apple Watch
    await expect(element(by.id('productName_2'))).toHaveText('Apple Watch');
    await expect(element(by.id('productPrice_2'))).toHaveText('$350');

    // Verify Headphones
    await expect(element(by.id('productName_3'))).toHaveText('Headphones');
    await expect(element(by.id('productPrice_3'))).toHaveText('$80');

    // Verify Backpack
    await expect(element(by.id('productName_4'))).toHaveText('Backpack');
    await expect(element(by.id('productPrice_4'))).toHaveText('$60');
  });

  /**
   * TC14 & TC15 - Deep Page Inspection & Action Integration
   */
  it('TC14 & TC15 - should navigate to detailed view, verify asset metadata, and allow adding to cart', async () => {
    // 1. Click "View" button for Nike Shoes on the main feed
    await element(by.id('viewButton_1')).tap();

    // 2. TC14 Assertion: Verify page loaded and displays matching text values
    await expect(element(by.id('productDetailsPage'))).toBeVisible();
    await expect(element(by.id('detailProductName_1'))).toHaveText('Nike Shoes');
    await expect(element(by.id('detailProductPrice_1'))).toHaveText('$120');

    // 3. TC15 Assertion: Verify interactive "Add to Cart" button exists and can be tapped smoothly
    await expect(element(by.id('detailAddToCartButton'))).toBeVisible();
    await element(by.id('detailAddToCartButton')).tap();

    // 4. Return safely back to the catalog (assuming your navigation stack has a global back layout indicator)
    // If your header has a native back button, you can use by.id('backButton') or similar indicator here.
  });

});