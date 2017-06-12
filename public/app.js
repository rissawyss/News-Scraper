//AJAX functions for loading data from collection in MongoDB

$.getJSON("/all", function(data) {
	console.log(data);
	for (var i = 0; i < data.length; i++) {
		$("#results").append("<tr><td>" + data[i].title + "</td>" +
			"<td>" + data[i].link + "</td></tr>")
	}
});

// $("#os-sort").on("click", function() {
// 	$("#results").empty();
// 	$("#results").append("<tr><th>Name</th><th>Row Number</th>" + 
// 		"<th class='active'>Operating System</th><th>Hobbies</th><th>Gave Candy</th></tr>")

// 	$.getJSON("/os", function(data) {
// 		console.log(data);
// 		for (var i = 0; i < data.length; i++) {
// 			$("#results").append("<tr><td>" + data[i].name + "</td>" +
// 				"<td>" + data[i].rownumber + "</td>" +
// 				"<td>" + data[i].os + "</td>" +
// 				"<td>" + data[i].hobbies + "</td>" +
// 				"<td>" + data[i].gavecandy + "</td></tr>")
// 		}
// 	});
// });

// $("#name-sort").on("click", function() {
// 	$("#results").empty();
// 	$("#results").append("<tr>" + 
// 		"<th class='active'>Name</th><th>Row Number</th><th>Operating System</th><th>Hobbies</th><th>Gave Candy</th></tr>")

// 	$.getJSON("/name", function(data) {
// 		console.log(data);
// 		for (var i = 0; i < data.length; i++) {
// 			$("#results").append("<tr><td>" + data[i].name + "</td>" +
// 				"<td>" + data[i].rownumber + "</td>" +
// 				"<td>" + data[i].os + "</td>" +
// 				"<td>" + data[i].hobbies + "</td>" +
// 				"<td>" + data[i].gavecandy + "</td></tr>")
// 		}
// 	});
// });