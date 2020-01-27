const puppeteer = require('puppeteer');
const uuidv5 = require('uuid/v5');

module.exports = {
  getImages(url) {
    const gettingImages = new Promise((resolve, reject) => {
      (async () => {

        const pageName = uuidv5( url , uuidv5.URL);

        console.log('> Process started');

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${url}`);
        await page.setViewport({width: 1080, height: 1080});

        await page.screenshot({path: `./src/images/${pageName}.png`, fullPage: true});

        await browser.close();

        console.log('> Process finished');
      })();

    });

    return gettingImages;
  }
}