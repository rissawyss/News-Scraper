var express = require("express");

var mongojs = require("mongojs");

var request = require("request");

var cheerio = require("cheerio");

var app = express();

app.use(express.static("public"));

var databaseUrl = "scienceNews";
var collections = ["scrapeData"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error){
	console.log("Database Error:", error);
});

app.get("/", function(req, res) {
	res.send("Hello World");
});


app.get("/all", function(req, res){
	db.scrapeData.find({}, function(err, found) {
		if (err) {
			console.log(err)
		} else {
			res.json(found);
		}
	});
});


app.get("/scrape", function(req, res) {
	request("http://www.sciencemag.org/news", function(error, response, html) {
		var $ = cheerio.load(html);

		$(".media__headline").each(function(i, element) {
			var title = $(this).children("a").text();
			var link = $(this).children("a").attr("href");

			if (title && link) {
				db.scrapeData.save({
					title: title,
					link: link
				},
				function (error, saved) {
					if (error) {
						console.log(error)
					} else {
						console.log(saved);
					}
				});
			}
		});
	});

	res.send("Scrape Complete");
});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
