var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')  //node - specific to each file, shows loc'n. Resovles to string
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
// Reference using paths above

exports.readListOfUrls = function(callback){
  // access to sites.txt
  fs.readFile(exports.paths.list, function(err, data) {
  // take data & split into urls
  var dataArray = data.toString().split('\n');
  // pass array to cb - pass formatted data
  callback(dataArray);
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(dataArray) {
    //loop through list in text file
    var found = dataArray.indexOf(url) !== -1;
    //callback(url, dataArray.indexOf(url) !== -1);
    callback(found);
  });
    
};

exports.addUrlToList = function(url, callback){
  //use isUrlInList to see if new url coming in
  exports.isUrlInList(url, function(found){
    if(!found){
      //if not in list, add it to the file (sites.txt)
      fs.appendFile(exports.paths.list, url + '\n', function(err,data){
        callback(data);
      });  
    }
  });  
};

exports.isUrlArchived = function (url, callback) {
  //search /archives/sites directory for url 
  fs.readFile(path.join(exports.paths.archivedSites, url), function(err, data){
    err ? callback(url, undefined) : callback(url, data);
  });
};

//Save until end
exports.downloadUrls = function(urlArray, callback){
 //createwritesteam - use to get file where need
 //iterate over urls
 // var urlArray = exports.paths.
 //pipe them into new file

 //url.toString()
 //path
 // var sites = fs.createWriteStream(exports.paths.archivedSites);
 // //piping writestream on to request
 // var request = http.get(url, function(response) {
 //    response.pipe(sites);
  for(var i = 0; i < urlArray.length; i++){
    var source_url =  urlArray[i]
    var destination_file = exports.paths.archivedSites + "/" + source_url
    var write_stream = fs.createWriteStream(destination_file)
    request('http://' + source_url).pipe(write_stream);
  }

};

  //  file.on('finish', function() {
  //     file.close(callback);
  //   });
  // });
 

/* sites.txt file?
www.google.com/archives/sites.txt/n'
www.example.com
www.facebook.com
*/

