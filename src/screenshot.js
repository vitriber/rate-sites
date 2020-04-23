const ImageToS3 = require('./controllers/ImageToS3');
const uuidv5 = require('uuid/v5');

module.exports = {
  async getImage(url, principalLink, browser) {
    //console.log('> Process started');
    //console.log('> Processing url:', url);
    
    const processedImage = await (async () => {
      //console.log('Start process');
      const page = await browser.newPage();

      // Configure the navigation timeout
      await page.setDefaultNavigationTimeout(0);

      await page.goto(`${url}`);
      await page.setViewport({ width: 1080, height: 1080 });

      //console.time('screenshot' + url)
      const image = await page.screenshot({
        fullPage: true,
        type: 'jpeg',
        quality: 70,
      });
      //console.timeEnd('screenshot' + url)
      await page.close();

      const u = new URL(principalLink)
      const link = u.host;
      const pageName = uuidv5(url, uuidv5.URL);
      
      let urlUploadedImage = null;
      
      //console.log('> Uploaded to s3');

      if (image) {
          try {
              urlUploadedImage = await ImageToS3.upload(image, {
                  Key: `${link}/${pageName}.jpeg`,
              });
          } catch (error) {
            throw error;
          }
      }
      //console.log('> All urls processed');

      return urlUploadedImage;
    })();
    
    return processedImage;

  }
}