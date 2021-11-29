const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://makassar.sakti112.id/dashboard/112/call/report');
  // await page.click('#login');
  // enter email with fdsfsaf
  await page.type('#email', 'test@t.com');
  // enter password with fdsfsaf
  await page.type('#password', '12345');

  // click type submit button
  await page.click('.btnColor');

  // await page.click('#login');
  // await page.waitForNavigation();

  // // wait for the page to load
  // await page.waitForSelector('#login');
  // // get the text of the page

  // wait 3 seconds
  await page.waitForTimeout(3000);
  
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();