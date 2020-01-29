const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    linkFirst: String,
    linkSecond: String,
    pagesFirst: [String],
    pagesSecond: [String]
});

module.exports = mongoose.model('Site', SiteSchema);