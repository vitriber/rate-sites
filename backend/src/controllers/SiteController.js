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
        const{ blogUrl} = request.body;
        console.log(blogUrl);

        let site = await Site.findOne({blogUrl});

        const sitemap = await GetSites.getAllUrls(blogUrl);

        sitemap.map(
            GetImages.getImages(sitemap)
        );

        site = await Site.create({
            blogUrl,
            pages: sitemap,
        })

    
        return response.json(site);
    }
};