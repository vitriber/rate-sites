const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    linkFirst: String,
    linkSecond: String,
    pagesFirst: [String],
    pagesSecond: [String],
    imagesFirst:{
        name: [String],
        url: [String],
        urlScreenshot: [String],
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    imagesSecond:{
        name: [String],
        url: [String],
        urlScreenshot: [String],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = mongoose.model('Site', SiteSchema);