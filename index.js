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
					var urls={}
					$(stream).children().each(function(idx,ele){
						var temp={};
						temp['src']=$(ele).find('.twitter-timeline-link').attr('href');
						if (!(temp['src'] in urls))
						{
							r.push(temp);	
						}
					})
					delete urls;
					captureNewsData(r,function(news){
						resolve(news);
					})
				})
			}
			else
			{
				reject(err);
			}
		})
	})
}
function captureNewsData(data,done)
{
	var cnt=0
	data.forEach((item,i)=>{
		request(item.src,(err,response,html)=>{
			if(!err)
			{
				var $=cheerio.load(html);
				var title = $('meta[property="og:title"]').attr('content');
				var description = $('meta[property="og:description"]').attr('content');
				var image=$('meta[property="og:image"]').attr('content');
				data[i].title=title;
				data[i].description=description;
				data[i].image=image;
				cnt++;
				if( cnt==data.length)
				{
					done(data);
				}	
			}
		})
	})
}
module.exports=tnews;