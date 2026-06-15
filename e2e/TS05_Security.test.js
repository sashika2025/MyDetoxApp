describe('TS05 - Security and Data Protection Suite', () => {

  beforeEach(async () => {
    // Start fresh for each security probe to prevent state pollution
    await device.launchApp({ delete: true, newInstance: true });
    await element(by.id('loginButton')).tap();
  });

  /**
   * TC19 - SECURITY: Brute Force Throttling
   */
  it('TC19 - should trigger rate limiting alerts after multiple consecutive failed login attempts', async () => {
    const maxAttempts = 5;

    // Simulate an attacker hammering the login button with bad passwords
    for (let i = 0; i < maxAttempts; i++) {
      await element(by.id('usernameInput')).replaceText('unauthorized_user');
      await element(by.id('passwordInput')).replaceText('bad_password_999');
      await element(by.id('submitButton')).tap();
    }

    // Professional Security Assertion: Verify the system triggered a lockout message
    // (Replace 'lockoutErrorMessage' with your app's actual security alert ID)
    await expect(element(by.id('lockoutErrorMessage'))).toBeVisible();
    await expect(element(by.id('lockoutErrorMessage'))).toHaveText('Too many attempts. Try again later');
  });

  /**
   * TC20 - SECURITY: Input Sanitization & Attack Vectors
   */
  it('TC20 - should safely reject SQL injection vectors and extreme string inputs without crashing', async () => {
    // 1. Inject a classic SQL bypass string into the username field
    await element(by.id('usernameInput')).typeText("' OR '1'='1");
    await element(by.id('passwordInput')).typeText('any_password');
    await element(by.id('submitButton')).tap();

    // Verify the bypass failed and standard error handled it safely
    await expect(element(by.id('productList'))).not.toBeVisible();
    await expect(element(by.id('errorMessage'))).toBeVisible();

    // 2. Inject a massive string to check for buffer memory leakage or UI breakage
    const massiveString = 'A'.repeat(250);
    await element(by.id('usernameInput')).replaceText(massiveString);
    await element(by.id('submitButton')).tap();

    // Verify the app didn't crash and remains interactive on the login page
    await expect(element(by.id('loginButton'))).toBeVisible();
  });

  /**
   * TC21 - SECURITY: Session Cleansing on Logout
   */
  it('TC21 - should destroy the session token and prevent access to protected routes after logout', async () => {
    // 1. Log in with your valid credentials
    await element(by.id('usernameInput')).typeText('sashika');
    await element(by.id('passwordInput')).typeText('pwd-123');
    await element(by.id('submitButton')).tap();
    await expect(element(by.id('productList'))).toBeVisible();

    // 2. Trigger logout action (Assuming you have a logoutButton on the home screen)
    await expect(element(by.id('logoutButton'))).toBeVisible();
    await element(by.id('logoutButton')).tap();

    // 3. Security Check: Verify we are thrown back to the login gateway
    await expect(element(by.id('usernameInput'))).toBeVisible();

    // 4. Try to assert the dashboard elements are completely missing from the view hierarchy
    await expect(element(by.id('productList'))).not.toBeVisible();
  });

});