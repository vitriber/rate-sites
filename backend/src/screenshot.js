const puppeteer = require('puppeteer');

module.exports = {
  getImages(url) {
    const gettingImages = new Promise((resolve, reject) => {
      (async () => {

        console.log('> Process started');

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${url}`);
        await page.setViewport({width: 1080, height: 1080});

        await page.screenshot({path: `images\${url}`, fullPage: true});

        await browser.close();

        console.log('> Process finished');
      })();

    });

    return getImages;
  }
}