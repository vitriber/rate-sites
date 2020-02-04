const axios = require('axios');
const Site = require('../models/Site');
const GetSites = require('../crawler');
const GetImages = require('../screenshot');
const fs = require('fs');
const mkdirp = require('mkdirp');


// Create directory if not exist (function)
const GenerateDirectory = async (directory) => {

    const dir = "./src/images/" 
    const link = directory.substr(8);
    const finaldir = dir.concat(link);


    mkdirp(finaldir, function (err) {
        if (err) console.error(err)
        else console.log('Done!')
    });
};

module.exports = {
    async index(request, response){
        const sites = await Site.find();

        return response.json(sites);
    },

    async store(request, response) {
        const   {linkFirst} = request.body;
        const {linkSecond} = request.body;


        const sitemapFirst = await GetSites.getAllUrls(linkFirst);
        const sitemapSecond = await GetSites.getAllUrls(linkSecond);


        GenerateDirectory(linkFirst);
        GenerateDirectory(linkSecond);

        sitemapFirst.map(site => (
            GetImages.getImages(site, linkFirst)
        ));

        sitemapSecond.map(site => (
            GetImages.getImages(site, linkSecond)
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