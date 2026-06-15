describe('TS01 - App Launch Suite', () => {

  /**
   * SECTION 1: COLD LAUNCH (TS01 COLD LAUNCH)
   */
  describe('TS01 - Cold Launch Scenarios', () => {
    beforeAll(async () => {
      await device.launchApp({
        delete: true, 
        newInstance: true,
        permissions: { notifications: 'YES', location: 'always' }
      });
    });

    it('TC01 & TC02 & TC04 - should launch cleanly and display Welcome to Market text', async () => {
      await expect(element(by.id('welcomeLabel'))).toBeVisible();
    });

    it('TC03 - should successfully load and display the main product list feed', async () => {
      await expect(element(by.id('productList'))).toBeVisible();
    });

    it('TC05 - UI should render within acceptable performance threshold (10s)', async () => {
      await waitFor(element(by.id('welcomeLabel')))
        .toBeVisible()
        .withTimeout(10000); 
    });
  });

  /**
   * SECTION 2: DEEP LINKING (TS02 DEEP LINK)
   */
  describe('TS02 - Deep Link Scenarios', () => {
    it('TC06 - should launch via deep link and route straight to product asset page', async () => {
      await device.launchApp({
        newInstance: true,
        url: 'market://products/item-123', 
      });

      await expect(element(by.id('productDetailsPage'))).toBeVisible();
    });
  });

  /**
   * SECTION 3: LIFECYCLE MANAGEMENT (TS03 LIFECYCLE)
   */
  describe('TS03 - Lifecycle Scenarios', () => {
    beforeAll(async () => {
      await device.launchApp({ newInstance: true });
    });

    it('TC07 - should contextually resume from device background state without crash', async () => {
      await device.sendToHome(); 
      await device.launchApp({ newInstance: false }); 
      
      await expect(element(by.id('welcomeLabel'))).toBeVisible();
    });
  });

  /**
   * SECTION 4: WARM LAUNCH & SESSION MANAGEMENT (TS04 WARM LAUNCH)
   */
  describe('TS04 - Warm Launch Scenarios', () => {
    beforeAll(async () => {
      await device.launchApp({ delete: true, newInstance: true });

      // Perform initial login using provided credentials
      await element(by.id('usernameInput')).typeText('sashika');
      await element(by.id('passwordInput')).typeText('pwd-123');
      await element(by.id('loginButton')).tap();

      await expect(element(by.id('productList'))).toBeVisible();
    });

    it('TC08 - should retain active user session and bypass auth on warm launch', async () => {
      await device.launchApp({
        delete: false, // Keep data intact to stay logged in
        newInstance: true,
      });

      await expect(element(by.id('productList'))).toBeVisible();
      await element(by.id('usernameInput')).not.toBeVisible(); 
    });
  });

});