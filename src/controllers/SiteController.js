const Site = require('../models/Site');
const GetSites = require('../crawler');
const GetImages = require('../screenshot');
const GetPageSpeed = require('../pagespeed');
const puppeteer = require('puppeteer');

module.exports = {
    async index(request, response) {

        const { site } = request.headers;

        const sites = await Site.findById(site);

        return response.json(sites);
    },

    async store(request, response) {
        
        const { SourceHostname } = request.body;
        const { TargetHostname } = request.body;

        //Inserindo Pagespeed

        console.log('> Resgatando PageSpeed das Páginas...');

        const SourceHostScore = await Promise.resolve(
            GetPageSpeed.getPageSpeed(SourceHostname)
        );

        const TargetHostScore = await Promise.resolve(
            GetPageSpeed.getPageSpeed(TargetHostname)
        );

        console.log('> PageSpeed Coletado...');

        //Resgatando o Sitemap das urls inseridas

        console.log('> Coletando SiteMap...')

        const sitemapFirst = await Promise.resolve(
            GetSites.getAllUrls(SourceHostname)
        );

        console.log('> Sitemap Coletado');

        // Criando a estrutura de dados do sitemap
        const sitesMap = sitemapFirst.map(link => {
            return {
                sourceUrl: link,
                sourceImage: null,
                targetUrl: null,
                targetImage:null,
                pathName: null
            };
        });

        // Resgatando ScreenShot das imagens e salvando no S3
        console.log('> Resgatando ScreenShot das imagens e salvando no S3....');
        const generateTargetUtl = (url, newHost) => {
                const u = new URL(url)
                const ul = new URL(newHost)
                u.host = ul.host;
                return u.toString()
        }

        const generatePathName = (url) => {
            const u = new URL(url)
            return u.pathname;
        }

        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        
        const processingSitesMap = sitesMap.map(async siteMap => {
            const sourceImage = await GetImages.getImage(
                siteMap.sourceUrl, 
                SourceHostname, 
                browser,
            );

            const targetUrl = generateTargetUtl(siteMap.sourceUrl, TargetHostname);

            const targetImage = await GetImages.getImage(
                targetUrl, 
                TargetHostname, 
                browser,
            );

            const pathName = generatePathName(siteMap.sourceUrl);

            return {
                ...siteMap,
                sourceImage,
                targetUrl,
                targetImage,
                pathName
            };
        });

        const sourceImageSitesMap = await Promise.all(processingSitesMap);
    
        await browser.close();

        console.log('> Imagens Salvas com sucesso!');

       // Salvando os dados no model

        const site = await Site.create({
            SourceHostname,
            TargetHostname,
            SourceHostScore,
            TargetHostScore,
            Screnshots: sourceImageSitesMap,
        })


        return response.json(site);
    }
};