describe('TS07 - Device Compatibility and UI Suite', () => {

  beforeAll(async () => {
    // 1. Fresh launch and automatic bypass of login requirements
    await device.launchApp({ delete: true, newInstance: true });
    await element(by.id('loginButton')).tap();

    await element(by.id('usernameInput')).typeText('sashika');
    await element(by.id('passwordInput')).typeText('pwd-123');
    await element(by.id('submitButton')).tap();

    // 2. Ensure we start safely on the main marketplace feed
    await expect(element(by.id('productList'))).toBeVisible();
  });

  afterEach(async () => {
    // CRITICAL PROFESSIONAL QA CLEANUP:
    // Always force the device back to portrait after a test runs, 
    // so subsequent test suites don't inherit a flipped screen!
    await device.setOrientation('portrait');
  });

  /**
   * TC24 - UI RESPONSIVENESS: Screen Rotation Handling
   */
  it('TC24 - should dynamically adapt layout elements when changing device orientation to landscape', async () => {
    // 1. Flip the phone sideways into Landscape mode
    await device.setOrientation('landscape');

    // 2. Assert that your critical components are still perfectly rendered and visible
    await expect(element(by.id('productList'))).toBeVisible();
    await expect(element(by.id('productName_1'))).toBeVisible();
    await expect(element(by.id('viewButton_1'))).toBeVisible();

    // 3. Optional: Tap a button while in landscape to ensure click targets remain aligned
    await element(by.id('viewButton_1')).tap();
    await expect(element(by.id('productDetailsPage'))).toBeVisible();
    
    // Return back to main feed
    await element(by.id('backButton')).tap();
  });

  /**
   * TC25 - UI COMPATIBILITY: View Scrollability Check
   */
  it('TC25 - should allow downward scrolling to reveal items hidden below the viewport fold', async () => {
    // If a device screen is short, the Backpack (ID: 4) might be cut off.
    // We explicitly instruct Detox to scroll the FlatList down by 300 pixels
    await element(by.id('productList')).scroll(300, 'down');

    // Verify that the bottom item is now visible and interactive to the user
    await expect(element(by.id('productCard_4'))).toBeVisible();
    await expect(element(by.id('productName_4'))).toHaveText('Backpack');
    await expect(element(by.id('viewButton_4'))).toBeVisible();
  });

});