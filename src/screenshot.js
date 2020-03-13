const workerpool = require('workerpool');
// const pool = workerpool.pool();
const ImageToS3 = require('./controllers/ImageToS3');
const uuidv5 = require('uuid/v5');

// async function uploadImage (image, principalLink, url) {
  
  
//   const link = principalLink.substr(8);
//   const pageName = uuidv5(url, uuidv5.URL);
  
//   let uploadedImage = { 
//     url: null,
//     name: pageName 
//   };

//   console.log('> Uploaded to s3');

//   if (image) {
//       try {
//           uploadedImage = await ImageToS3.upload(image, {
//               Key: `images/${link}/${pageName}`,
//           });
//       } catch (error) {
//         throw error;
//       }
//   }
//   return uploadedImage;
// };

// const saveImage = (image, principalLink, url) => {
//   const fs = require('fs');
//   const uuidv5 = require('uuid/v5');

//   const link = principalLink.substr(8);
//   const pageName = uuidv5(url, uuidv5.URL);

//   return new Promise((resolve, reject) => {
//     fs.writeFile(`./src/images/${link}/${pageName}.jpeg`, image, (err) => {
//       if (err) {
//         return reject(err);
//       }

//       return resolve();
//     })
//   })
// };

module.exports = {
  async getImages(urls, principalLink, browser) {
    // console.log('> Process started');

    processingImages = urls.map(async url => {
      const page = await browser.newPage();
      // console.log('> Processing url:', url)

      await page.goto(`${url}`);
      await page.setViewport({ width: 1080, height: 1080 });

      // console.time('screenshot' + url)
      const image = await page.screenshot({
        fullPage: true,
        type: 'jpeg',
        quality: 70,
      });
      // console.timeEnd('screenshot' + url)
      await page.close();

      const link = principalLink.substr(8);
      const pageName = uuidv5(url, uuidv5.URL);
      
      let uploadedImage = { 
        urlScreenshot: url,
        url: null,
        name: pageName 
      };
    
      // console.log('> Uploaded to s3');
    
      if (image) {
          try {
              uploadedImage.url = await ImageToS3.upload(image, {
                  Key: `${link}${pageName}.jpeg`,
              });
          } catch (error) {
            throw error;
          }
      }

      return uploadedImage;
    })

    const processedImages = await Promise.all(processingImages);

    // console.log('> All urls processed');

    return processedImages;
  }
}