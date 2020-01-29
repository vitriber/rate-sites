const axios = require('axios');
const Site = require('../models/Site');
const GetSites = require('../crawler');
const GetImages = require('../screenshot');

module.exports = {
    async index(request, response){
        const sites = await Site.find();

        return response.json(sites);
    },

    async store(request, response) {
        const{ linkFirst} = request.body;
        const {linkSecond} = request.body;


        const sitemapFirst = await GetSites.getAllUrls(linkFirst);
        const sitemapSecond = await GetSites.getAllUrls(linkSecond);


        sitemapFirst.map(site => (
            GetImages.getImages(site)
        ));

        sitemapSecond.map(site => (
            GetImages.getImages(site)
        ));

        site = await Site.create({
            linkFirst,
            linkSecond,
            pagesFirst: sitemapFirst,
            pagesSecond: sitemapSecond,
        })

    
        return response.json(site);
    }
};