const Site = require('../models/Site');
const GetSites = require('../crawler');
const GetImages = require('../screenshot');
const puppeteer = require('puppeteer');

module.exports = {
    async index(request, response) {

        const { site } = request.headers;

        const sites = await Site.findById(site);

        return response.json(sites);
    },

    async store(request, response) {
        const { linkFirst } = request.body;
        const { linkSecond } = request.body;


        const [sitemapFirst, sitemapSecond] = await Promise.all([
            GetSites.getAllUrls(linkFirst),
            GetSites.getAllUrls(linkSecond)]
        );


        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        //const browser = await chromium.launch();

        const [firstSiteImages, secondSiteImages] = await Promise.all([
            GetImages.getImages(sitemapFirst, linkFirst, browser),
            GetImages.getImages(sitemapSecond, linkSecond, browser),
        ]);
    
        await browser.close();

        console.log('Finished save all images');

        const { name: namesFirst, url: urlFirst, urlScreenshot: urlScreenshotFirst } = firstSiteImages.reduce( ( accumulator, item ) => {
            Object.keys( item ).forEach( key => {
                accumulator[ key ] = ( accumulator[ key ] || [] ).concat( item[ key ] ) 
            } )
            return accumulator
        }, {} );

        const { name: namesSecond, url: urlSecond, urlScreenshot: urlScreenshotSecond } = secondSiteImages.reduce( ( accumulator, item ) => {
            Object.keys( item ).forEach( key => {
                accumulator[ key ] = ( accumulator[ key ] || [] ).concat( item[ key ] ) 
            } )
            return accumulator
        }, {} );
        

        const site = await Site.create({
            linkFirst,
            linkSecond,
            pagesFirst: sitemapFirst,
            pagesSecond: sitemapSecond,
            imagesFirst:{
                name: namesFirst,
                url: urlFirst,
                urlScreenshot: urlScreenshotFirst,
            },
            imagesSecond:{
                name: namesSecond,
                url: urlSecond,
                urlScreenshot: urlScreenshotSecond,
            }
        })


        return response.json(site);
    }
};