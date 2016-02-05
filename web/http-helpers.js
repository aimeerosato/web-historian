var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(response, obj, statusCode){
    var statusCode = statusCode || 200;
    response.writeHead(statusCode, headers);
    response.end(obj);
    
  };

exports.collectData = function(request, callback){
    var currentData = '';
    request.on('data', function(snippet){
      currentData += snippet;
    });
    request.on('end', function(){ 
      callback(currentData);
    });
  };

exports.send404 = function(response){
  exports.sendResponse(response, '404: Not found', 404);
};

exports.redirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};
  
exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  var encoding = {encoding: 'utf8'};
  // css, or anything that doesn't change often.)
  // check if in public folder
  fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, data){
    //if it's not there, check the archive folder
    if (err) {
      fs.readFile(archive.paths.archivedSites + asset, encoding, function(err, data){
        //if it's not in the archive folder, send 404
        if (err) {
          callback ? callback() : exports.send404(response);
        } 
        else {
          exports.sendResponse(response, data);  
        }
      });
    } 
    else {
      exports.sendResponse(response, data);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
