var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!
var temp = [];

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
  


  var actions = {
    //User types something into index.html
    'GET': function(request, response){
      
      // urlParser(request.url)
      
      // urlPath = 
      // serveAssets(response, urlPath);

      

      console.log("here");
      var data = "input";
      sendResponse(response, data);
    },
    'POST': function(request, response){
      //client sends in url
      httpHelpers.collectData(request, function(data){
        var url = 'www.google.com';
        // check if have in list
        archive.isUrlInList(url, function(found){
          
          if(!found){ // no, then add 
            // process
            archive.addUrlToList(url, function(){
              httpHelpers.redirect(response, '/loading.html');
            });
          } else {
            // yes, check archive
            archive.isUrlArchived(url, function(exists){
              if(exists){
                // no, take to loading page
                if(!exists){
                  httpHelpers.redirect(response, '/loading.html');
                } else { // yes, take to page
                  httpHelpers.redirect(response, url);
                }   
              }
            });  
          }

        });
      });
      
            
            
            
            


      sendResponse(response, temp);
    }


  };

  var action = actions[request.method];
  if(action){
    console.log("Using " + request.method);
    action(request, response);
  } else {
    sendResponse(response, "Not found", 404);
  }

//Part 1
 //User types in url they want archived
  //POST request or get request?
  //POST requests save submitted URLs into single file on computer


//Part 2
 //Read list of URLs from file from above
 //Fetches the pages
 //Saves pages into file on computer

 //Other info:
  //archives/sites.txt - web app will add more URLS to file, worker app will read list when it runs
  //archives/sites/ - worker app adds more files to this diretory, web app will serve the files

  //var fs = require('fs') - file system..... fs.appendFile
  
};
