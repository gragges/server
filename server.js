const express = require('express');
const app = express();
const { scrapeLogic } = require('./scrapeLogic');
const port = process.env.PORT || 8080;

const puppeteer = require('puppeteer');

app.get('/', (req, res) => {
  res.send('Hello World!');
  scrape().then((data) => {
    console.log(data);
    res.send(data);
  }).catch((error) => {
    console.error('Error during scraping:', error);
    res.status(500).send('Error during scraping');
  });
})
app.get('/scrape', (req, res) => {
    scrapeLogic(res);
  })
  app.get('/gra', (req, res) => {
    res.send('Hello from gra!');
  })

app.listen(port, () => {
  console.log('Server is running on ');
});

const scrape = async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const page2=await browser.newPage();

    const url="https://www.bankier.pl/gielda/notowania/akcje"
    const url2="https://www.bankier.pl/gielda/notowania/new-connect"

    await page.goto(url);
    await page2.goto(url2)


    //const title=await page.title()
    //console.log(`To jest tytul: ${title}`)
    const dane = await page.evaluate(()=>{
        const zmienna = document.querySelectorAll('.colWalor.textNowrap');
        //const zmienna = document.querySelectorAll('.colLiczbaTransakcji');
        
        return Array.from(zmienna).map((walor)=>{
            const tytul=walor.innerText
            //const transakcje=walor.getElementsByTagName('td').querySelectorAll('.colLiczbaTransakcji').innerText;
            return tytul
               
            
        })
    
});}