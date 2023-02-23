describe('Screen tests', () => {
  before(async () => {
    await device.reloadReactNative();
  });

  it('should have navbar', async () => {
    await expect(element(by.id('navbarContainer'))).toExist();
  })

  it('should show side menu when hamburger button is clicked', async () => {
    await waitFor(element(by.id('hamburgerBtn'))).toExist().withTimeout(1000);
    await element(by.id('hamburgerBtn')).tap();
    await expect(element(by.id('sideMenuContainer'))).toBeVisible();
    await element(by.id('hamburgerBtn')).tap();
    await expect(element(by.id('sideMenuContainer'))).toBeNotVisible();
  });

  it('should display car listings', async () => {
    await waitFor(element(by.id('featuredListingsContainer'))).toExist().withTimeout(1000);
    await expect(element(by.id('featuredListingsContainer'))).toExist();
  });


  it('should cancel searching keywords by clicking cancel button', async () => {
    await waitFor(element(by.id('searchbarInput'))).toExist().withTimeout(1000);
    await element(by.id('searchbarInput')).tap();
    await waitFor(element(by.label('Cancel'))).toBeVisible().withTimeout(1000);
    await element(by.id('featuredListingsContainer')).tap();
    await expect(element(by.label('Cancel'))).toBeNotVisible();
  });

  it('input keywords on the search bar for cars', async () => {
    await waitFor(element(by.id('searchbarInput'))).toExist().withTimeout(1000);
    await element(by.id('searchbarInput')).tap();
    await element(by.id('searchbarInput')).typeText('Suzuki');
    await waitFor(element(by.label('Search'))).toBeVisible().withTimeout(1000);
    await element(by.label('Search')).tap();
  });
  
  it('should display coupon listings', async () => {
    await waitFor(element(by.id('CouponsTab'))).toExist().withTimeout(1000);
    await element(by.id('CouponsTab')).tap();
    await waitFor(element(by.id('FeaturedCouponsContainer'))).toExist().withTimeout(1000);
    await expect(element(by.id('FeaturedCouponsContainer'))).toExist();
  });

  it('should display coupon listings', async () => {
    await waitFor(element(by.id('CouponsTab'))).toExist().withTimeout(1000);
    await element(by.id('CouponsTab')).tap();
    await waitFor(element(by.id('FeaturedCouponsContainer'))).toExist().withTimeout(1000);
    await expect(element(by.id('FeaturedCouponsContainer'))).toExist();
  });
 

})