const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    SourceHostname: String,
    TargetHostname: String,
    Screnshots:[],
});

module.exports = mongoose.model('Site', SiteSchema);