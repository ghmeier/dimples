var express = require('express');
var makereq = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {

	var text = request.query.text;
	var words = text.split(" ");
	var top = words.slice(0,words.length/2);
	var bottom = words.slice(words.length/2);
	var token = request.query.token;
	var team_id = request.query.team_id;
	var channel= request.query.channel_id;

	makereq("http://api.imgflip.com/caption_image?template_id=42404825&username=headin_thecloud&password=headin_thecloud&text0="+top.join(" ")+"&text1="+bottom.join(" "),
			function(error,res,body){
		
		if (!error && response.statusCode == 200){
			var img = JSON.parse(res.body).data;

			makereq.post("https://hooks.slack.com/services/"+team_id+"/"+channel+"/"+token,
				"payload="+JSON.stringify({text:"<"+img.url+">"}),
				function(error,slackRes,body){
					response.json(body);
				});
			//response.send(img.url);
		}
	});

//	response.json(request.query);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


