const puppeteer = require("puppeteer");
const path = require("path");
const { report } = require("process");
const downloadPath = path.resolve("./report");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://makassar.sakti112.id/login");
  await page.type("#email", "spvmakassar@sakti112.id");
  await page.type("#password", "spv12345");
  await page.click(".btnColor");
  await page.waitForTimeout(2500);
  await page.goto("https://makassar.sakti112.id/dashboard/112/call/report");
  await page._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadPath,
  });
  await page.waitForTimeout(4500);
  // await page.select('#cbinteraksi', '1')
  
  await page.click(".btn-report-excel");
  await page.waitForTimeout(2500);
  await browser.close();
})();
