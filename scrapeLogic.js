const puppeteer = require('puppeteer');

const scrapeLogic = async (res) => {
    const browser = await puppeteer.launch(
        {ignoreHTTPSErrors: true,
            executablePath: process.env.CHROME_PATH || '/opt/bin/chromium',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        } // Set headless to true for production
    );
    const page = await browser.newPage();
    await page.goto('https://www.bankier.pl/gielda/notowania/akcje');

    await page.waitForSelector('.colWalor.textNowrap');
    await page.setViewport({ width: 1200, height: 800 });
    const data = await page.evaluate(() => {
        const elements = document.querySelectorAll('.colWalor.textNowrap');
        return Array.from(elements).map(element => element.innerText);
    });
    res.send(`Hello from scrapeLogic! ${data}`);
    browser.close();
    console.log('Scraping completed');
}

module.exports = {scrapeLogic};