describe('TS02 - Login Functional Suite', () => {

  beforeEach(async () => {
    // Fresh launch before every test to ensure clean functional states
    await device.launchApp({ delete: true, newInstance: true });
    
    // Tap the initial login button on the welcome screen to reach the login page
    await element(by.id('loginButton')).tap();
  });

  /**
   * TC09 - POSITIVE: Valid Login
   */
  it('TC09 - should login successfully with correct credentials', async () => {
    await element(by.id('usernameInput')).typeText('sashika');
    await element(by.id('passwordInput')).typeText('pwd-123');
    await element(by.id('submitButton')).tap();

    // Verify user landed on the main product view dashboard
    await expect(element(by.id('productList'))).toBeVisible();
  });

  /**
   * TC10 - UX / FUNCTIONAL: Password Masking Check
   */
  it('TC10 - should mask password characters using dots (secure text entry)', async () => {
    await element(by.id('passwordInput')).typeText('pwd-123');

    // NATIVE MOBILITY QA TRICK:
    // When secureTextEntry={true} is enabled on mobile, the raw text string 
    // is masked behind dots and cannot be read as plain text by Detox.
    await expect(element(by.id('passwordInput'))).not.toHaveText('pwd-123');
  });

  /**
   * TC11 - NEGATIVE: Invalid Data
   */
  it('TC11 - should display clear error feedback on invalid credential submission', async () => {
    await element(by.id('usernameInput')).typeText('wrongUser');
    await element(by.id('passwordInput')).typeText('wrongPassword');
    await element(by.id('submitButton')).tap();

    // Verify error notification is visible to the user
    await expect(element(by.id('errorMessage'))).toBeVisible();
    await expect(element(by.id('errorMessage'))).toHaveText('Invalid credentials');
  });

  /**
   * TC12 - NEGATIVE: Empty Input Validation
   */
  it('TC12 - should enforce required field validation and block empty submission', async () => {
    await element(by.id('submitButton')).tap();

    // Ensure dashboard did not load
    await expect(element(by.id('productList'))).not.toBeVisible();
    
    // Verify that data requirements alert is displayed
    await expect(element(by.id('requiredFieldMessage'))).toBeVisible();
  });

});