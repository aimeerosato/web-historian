var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers.js');
// require more modules/folders here!
var temp = [];

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
  
  var sendResponse = function(response, data, statusCode){
    console.log(data);
    var statusCode = statusCode || 200;
    response.writeHead(statusCode, headers.headers);
    response.end(JSON.stringify(data));
  };

  var actions = {
    //User types something into index.html
    'GET': function(request, response){
      console.log("here");
      sendResponse(response, data);
    },
    'POST': function(request, response){
    //   collectData(request, function(message){

    //   });
        //How will data come in?  Is this the url?
        var currentData = '';
        request.on('data', function(data){
          currentData += data;
        });
        request.on('end'), function(){
          //How do we want to store this data?  
          //add to sites.txt?
          temp.push(JSON.parse(currentData));
          //fs.appendFile('../archives/sites.txt', currentData)
          //fs.readFile('index.html', function(err, data){
           // response.writeHead(200)
          //});

        }


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
