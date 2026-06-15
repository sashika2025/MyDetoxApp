describe('TS04 - Cart and Checkout Suite', () => {

  beforeAll(async () => {
    // 1. Fresh launch and automatic bypass of login requirements
    await device.launchApp({ delete: true, newInstance: true });
    await element(by.id('loginButton')).tap();

    await element(by.id('usernameInput')).typeText('sashika');
    await element(by.id('passwordInput')).typeText('pwd-123');
    await element(by.id('submitButton')).tap();
  });

  /**
   * End-to-End Checkout Flow (TC16, TC17, TC18 Combined cleanly)
   */
  it('should successfully add Nike Shoes to cart, verify total price calculation, and place order', async () => {
    // ---- STEP 1: ADD TO CART (TC16) ----
    // Navigate into the details page for Nike Shoes (ID: 1)
    await element(by.id('viewButton_1')).tap();
    
    // Tap the 'Add to Cart' button we set up in TS03
    await element(by.id('detailAddToCartButton')).tap();

    // Navigate to the Cart Screen (Assuming header cart shortcut is available)
    // If you need to go back first, uncomment the next line:
    // await element(by.id('backButton')).tap();
    
    await expect(element(by.id('goToCartButton'))).toBeVisible();
    await element(by.id('goToCartButton')).tap();

    // Verify Cart Page opened up cleanly
    await expect(element(by.id('cartPage'))).toBeVisible();


    // ---- STEP 2: VERIFY TOTALS (TC17) ----
    // Change '$120' or 'Total: $120' to match exactly what your code strings print out
    await expect(element(by.id('cartTotalText'))).toHaveText('$120');


    // ---- STEP 3: PLACE ORDER (TC18) ----
    // Tap the final processing button
    await element(by.id('placeOrderButton')).tap();

    // Verify order went through and prints out your success message text
    await expect(element(by.id('successMessage'))).toBeVisible();
    await expect(element(by.id('successMessage'))).toHaveText('Order Successful');
  });

});