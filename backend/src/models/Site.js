const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    blogUrl: String,
    pages: [String],
});

module.exports = mongoose.model('Site', SiteSchema);