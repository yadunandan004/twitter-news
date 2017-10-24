Twitter News
=========

	A small library providing news articles based on a particular topic, scraped from twitter.

## Installation

  	npm install twitter-news --save

## Usage
	Input Data Type: String
	Output: Promise containing data of type array.
		 Each element in the array will be an object containing at most two elements.
		 {
		 	src:'link to the article',
		 	image:'image for the article' (can be undefined in some objects)
		 }

	var tnews = require('twitter-news')
	  tnews("homer simpson")
	  .then(function(data){
	  	console.log(data);	// prints [{src : 'link to article1', image : 'link to image1'}, {src : 'link to article2', image : 'link to image2'}...]
	  })
	  .catch(function(error){
	  	console.log(error)
	   });

## Release History

* 0.1.0 Initial release