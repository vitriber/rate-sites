const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    SourceHostname: String,
    TargetHostname: String,
    SourceHostScore: {},
    TargetHostScore: {},
    Screnshots:[],
});

module.exports = mongoose.model('Site', SiteSchema);