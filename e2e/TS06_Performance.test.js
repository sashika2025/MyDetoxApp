// Built-in Node.js module to capture exact high-resolution timestamps
const { performance } = require('perf_hooks');

describe('TS06 - Client-Side Performance Suite', () => {

  beforeEach(async () => {
    // Start fresh to ensure previous caching doesn't skew metric results
    await device.launchApp({ delete: true, newInstance: true });
    await element(by.id('loginButton')).tap();
  });

  /**
   * TC22 - PERFORMANCE: Network Response UI Speed Validation
   */
  it('TC22 - should securely transition from Login to Dashboard within the 2000ms performance budget', async () => {
    await element(by.id('usernameInput')).typeText('sashika');
    await element(by.id('passwordInput')).typeText('pwd-123');

    // 1. Capture the start timestamp right before interacting with the network gateway
    const startTime = performance.now();

    // 2. Trigger the transaction
    await element(by.id('submitButton')).tap();

    // 3. Force Detox to wait explicitly until the target layout element is completely visible
    await expect(element(by.id('productList'))).toBeVisible();

    // 4. Capture the end timestamp immediately upon successful UI rendering
    const endTime = performance.now();
    const loginDuration = endTime - startTime;

    console.log(`=== PERFORMANCE METRIC === Login UI Transaction completed in: ${loginDuration.toFixed(2)}ms`);

    // 5. Professional Assert Rule: If loading takes longer than 2000ms, fail the build pipeline automatically
    if (loginDuration > 2000) {
      throw new Error(`PERFORMANCE FAILURE: Login loop took ${loginDuration.toFixed(2)}ms, exceeding the 2000ms threshold limit.`);
    }
  });

  /**
   * TC23 - PERFORMANCE: UI Stress Test (Navigation Thrashing)
   */
  it('TC23 - should handle rapid screen transition sequences smoothly without memory fatigue or layout lockups', async () => {
    // Authenticate into the system environment
    await element(by.id('usernameInput')).typeText('sashika');
    await element(by.id('passwordInput')).typeText('pwd-123');
    await element(by.id('submitButton')).tap();
    await expect(element(by.id('productList'))).toBeVisible();

    const loops = 5;

    // Simulate aggressive user scrolling/tapping behavior to stress-test the rendering layer
    for (let i = 0; i < loops; i++) {
      // Navigate deep into the first item's details panel
      await element(by.id('viewButton_1')).tap();
      await expect(element(by.id('productDetailsPage'))).toBeVisible();

      // Immediately return back out to the master catalog view
      await element(by.id('backButton')).tap();
      await expect(element(by.id('productList'))).toBeVisible();
    }

    // Final stability confirmation post-stress
    await expect(element(by.id('productCard_1'))).toBeVisible();
  });

});