var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
    // var found = false;
    //loop through list in text file
    var found = dataArray.indexOf(url) !== -1;
    //callback(url, dataArray.indexOf(url) !== -1);
    callback(found);
  });
    
    // for(var i = 0; i < dataArray.length; i++) {
    //   if (url === dataArray[i]) {
    //     //return boolean if or if not found
    //     found = true;
    //     break;
    //   }
    // }
  //callback(found);
};

exports.addUrlToList = function(url, callback){
  //use isUrlInList to see if new url coming in
  exports.isUrlInList(function(found){
    if(!found){
      //if not in list, add it to the file (sites.txt)
      fs.appendFile(exports.paths.list, url.join('\n'), callback);  
    }
  }, url);
   
};

exports.isUrlArchived = function (url, callback) {
  //search /archives/sites directory for url 
  fs.readFile(exports.paths.archivedSites, function(err, data){
    
  });
  //see if url is there
  //return boolean
};

//Save until end
exports.downloadUrls = function(){
};


/* sites.txt file?
www.google.com/archives/sites.txt/n'
www.example.com
www.facebook.com
*/

