const axios = require('axios');
const Site = require('../models/Site');
const GetSites = require('../crawler');

module.exports = {
    async index(request, response){
        const sites = await Site.find();

        return response.json(sites);
    },

    async store(request, response) {
        const{ blogUrl} = request.body;

        let site = await Site.findOne({blogUrl});

        const sitemap = GetSites.getAllUrls(blogUrl);

        site = await Site.create({
            blogUrl,
            pages: sitemap,
        })

    
        return response.json(site);
    }
};