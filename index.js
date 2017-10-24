const request = require('request');
const cheerio = require('cheerio');

function tnews(topic="")
{
	return new Promise((resolve,reject)=>{
		if(topic=="")
		{
			reject('Please provide a topic to search for');
		}
		var name=topic.split(" ").join("%20")
		var url="https://twitter.com/search?f=news&q=%22"+name+"%22&src=tren";
		request(url,(err,response,html)=>{
			if(!err)
			{
				
				var $= cheerio.load(html);
				$("#timeline").filter(function(){
					var data=$(this);
					var stream=data.find('.stream-items')
					var r=[];
					$(stream).children().each(function(idx,ele){
						var temp={};
						temp['src']=$(ele).find('.twitter-timeline-link').attr('href');
						temp['image']=$(ele).find('.AdaptiveMedia-photoContainer').attr('data-image-url');
						r.push(temp);
					})
					resolve(r);
				})
			}
			else
			{
				reject(err);
			}
		})
	})
}
module.exports=tnews;