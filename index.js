var express = require('express');
var makereq = require('request');
var app = express();
var firebase = require("firebase");
var fb_ref = new firebase("https://help-me.firebaseio.com/images");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/list",function(request,response){
	var images = fb_ref;
	var imgs = [];
	images.once("value",function(snapshot){
		var data = snapshot.val();
		for (i in data){
			imgs.push(data[i]);
		}
		response.render("meme",{imgs:imgs});
	});
});

app.get("/random",function(request,response){
	fb_ref.once("value",function(snapshot){
		var data = snapshot.val();
		var keys = Object.keys(data);
		var num = Math.floor(Math.random() * keys.length);
		
		var imgs = [];
		imgs.push(data[keys[num]]);

		response.render("meme",{imgs:imgs});
		
	});
});

app.get('/', function(request, response) {

	var text = request.query.text;
	var words = text.split(" ");
	var top = "",bottom = "";
	while(words.length > 0){
		if (top.length > bottom.length){
			bottom = words.pop() + " " + bottom;
		}else{
			top += " "+words.shift();
		}
	}

	var token = "xoxp-2153342770-2579407953-5198644515-1e2e4f";
	var team_id = request.query.team_id;
	var channel= request.query.channel_id;
	
	if (!channel || !team_id){
		response.json({error:"Slack Data Required for meme creation."});
	}

	makereq("http://api.imgflip.com/caption_image?template_id=42404825&username=headin_thecloud&password=headin_thecloud&text0="+top+"&text1="+bottom,
			function(error,res,body){
		
		if (!error && response.statusCode == 200){
			var img = JSON.parse(res.body).data;
			fb_ref.push({url:img.url});
			makereq.get("https://slack.com/api/chat.postMessage?channel="+channel+"&username=Dimplebot&token="+token+"&text=<"+img.url+">",
				function(error,slackRes,body){
					console.log(body);
				});
		}
	});

//	response.json(request.query);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


