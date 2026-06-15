describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should launch the app successfully', async () => {
    await expect(element(by.text('Welcome to React Native'))).toBeVisible();
  });
});