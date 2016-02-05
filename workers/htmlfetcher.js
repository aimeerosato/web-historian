// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var fs = require('fs')
var archive = require('../helpers/archive-helpers');

fs.readFile(archive.paths.list, "utf8", function(err, data) {
        console.log(data)
        archive.downloadUrls(data.split('\n'))

    });
//cron tab - tell it what to do 
//set up in terminal cron-tab  to call this file
