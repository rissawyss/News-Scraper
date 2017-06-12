var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static("public"));


mongoose.connect("mongodb://localhost/scienceNews");
var db = mongoose.connection;

db.on("error", function(error){
	console.log("mongoose Error:", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.get("/", function(req, res) {
	res.send("Hello World");
});


app.get("/scrape", function(req, res) {
	request("http://www.sciencemag.org/news", function(error, response, html) {
		var $ = cheerio.load(html);

		$(".media__headline").each(function(i, element) {
			var result = {};

			result.title = $(this).children("a").text();
			result.link = $(this).children("a").attr("href");

			var entry = new Article(result);

			entry.save(function (err, doc) {
					if (err) {
						console.log(err)
					} else {
						console.log(doc);
					}
			});
		});
	});

	res.send("Scrape Complete");
});



app.get("/articles", function(req, res){
	Article.find({}, function(err, found) {
		if (err) {
			console.log(err)
		} else {
			res.json(found);
		}
	});
});


app.get("/articles/:id", function(req, res) {
  Article.findOne({ "_id": req.params.id })
  .populate("note")
  .exec(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);
    }
  });
});


app.post("/articles/:id", function(req, res) {
  var newNote = new Note(req.body);

  newNote.save(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      });
    }
  });
});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
