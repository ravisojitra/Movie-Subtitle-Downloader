var imdb = require('imdb-api');
var fs = require('fs');
var http = require('http');
var ysa = require('yifysubtitles-api');

imdb.get('Cancer Man')
    .then(function(data) { 
        console.log('inside imdb');
//        data.episodes().then(function(data){
//            console.log(data.length);
//            data.forEach(function(item){
//                console.log(item.season);
//            });
//        });
        console.log(data.imdbid);
        ysa.search({
            imdbid: data.imdbid  //get imdbid 
        }).then(function(subtitles){
            console.log(subtitles);
            console.log(subtitles.en.url);
            var url = subtitles.en.url; //extract the subtitle url
            var file_name = url.split('/subtitle-api/').pop(); //generate file name
            
            var file = fs.createWriteStream(file_name); //create file to be written
            
            var request = http.get(url, function(response) {
              response.pipe(file);
            });
        }).catch(console.error.bind(console));
    });
