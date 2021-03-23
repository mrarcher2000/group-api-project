// this is for loading results, and CSS

var page = 0;

// Query the the chosen API with the current choices and modifiers
// Grabbing values from HTML to assign variables. 

//This is main apiQuery function, if function for Marvel, if else function is for Google Books //
function apiQuery() {

    //this is the chosen API from index.html, dropdown
	var chooseAPI = document.getElementById("apiChoice").value;

    //this is name input box
	var nameStartsWith = document.getElementById("name-starts").value;

    //this is number to Return value variable
	var numbertoDisplay = document.getElementById("num-to-display");
	var numbertoDisplayValue = numbertoDisplay.options[numbertoDisplay.selectedIndex].value;

    //this parses number to return, to display in results
	var results = parseInt(numbertoDisplayValue);

    
    //this is Marvel Function if chosen ......//

	if (chooseAPI === 'marvel') {
        
        //this checks input, to ensure a valid input entered
		if (nameStartsWith.length > 0) {
			nameStarts = `nameStartsWith=${nameStartsWith}`;
		} else {
			nameStarts = ``;
		}
        //variables for function, Marvel requires public and private key
		var marvelUrl = "https://gateway.marvel.com/v1/public/";
		var pub_Key = "11a71eed96128ec62bd061b4d096a38a";
		var priv_Key = "68249a1ca55b9f3b6c691fb85d3568c9fb74eede"; 

        //Marvel requires timestamp, hash for valid query

		var ts = new Date().getTime();

		//Uses crypto JS library to help with valid Marvel Call, library linked in index.html

		var hash = CryptoJS.MD5(ts + priv_Key + pub_Key).toString();

        //search method, this is for character search
		var searchBy = "characters";
        
        //user inputs, template strings
		//reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

		var userInputs = `?${nameStarts}&limit=${results}&offset=${page}`;

        //gets data with ajax call from Marvel
		//reference here: https://api.jquery.com/jquery.ajax/

		$.ajax({
			type: "GET",
			url: marvelUrl + searchBy + userInputs,
			data: {
				apikey: pub_Key,
				ts: ts,
				hash: hash
			},
			dataType: "json",
			contentType: "application/json"
		})

        //then function to go down to Marvel display
		.then(function (data) {
			marvelDisplay(data);
		},

		//if error, then shows alert
		function (error) {
			alert('There is an error on the page ' + error.responseText);
		});

        //Google function to go here
	} else if(chooseAPI === 'google') {

		
		// Googleapi function goes here//
		
				
		// Googleapi function goes here//
		console.log("google");

		var titleStartsWith = nameStartsWith;
		parseGoogleBooks(titleStartsWith);

	}
}


// START Google Books Dynamic Display
var gURL = "https://www.googleapis.com/books/v1/volumes?q=the+amazing+spiderman+1950&?key=AIzaSyCmKU98XNUkZoT2jqpQ1_EiwLKAdSZmqpA";


var parseGoogleBooks = function(titleStartsWith) {
    
    console.log(titleStartsWith);
    $("#characterName").html(titleStartsWith);
   

    titleVar = titleStartsWith.replace(' ', '+');
    titleVar = titleVar + "+comic";
    console.log(titleVar);

    gURL = "https://www.googleapis.com/books/v1/volumes?q=" + titleVar + "&?key=AIzaSyCmKU98XNUkZoT2jqpQ1_EiwLKAdSZmqpA";
    googleBooksInfo(gURL);
};


var googleBooksInfo = function(gURL) {
    fetch(gURL).then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log("There was an error");
        }
    }).then(function(data){
        console.log(data);

		googleComicsFunc(data);
    });
};

var googleComicsFunc = function(data) {

	var dataRow = $("#data-row-show");
	var rowDataShow = "";

	var numbertoDisplay = document.getElementById("num-to-display");
	var results = numbertoDisplay.options[numbertoDisplay.selectedIndex].value;
	
	console.log(results);
	for (var i = 0; i < results; i++) {
		var name = data.items[i].volumeInfo.title;
		var description = data.items[i].searchInfo.textSnippet;
		var thumbnail = data.items[i].volumeInfo.imageLinks.smallThumbnail;

		console.log(name);
		// This filters to only show items that have thumbnail
		if (!data.items[i].volumeInfo.imageLinks.smallThumbnail.includes('image_not_available')) {
			
			console.log("you made it to the data");
			var rowDataShow = rowDataShow + 
				('<div class="column">' +
					'<div class="card">' +
						'<div class="card-section">' +
							'<img src="' + thumbnail + '>' +
						'</div>' +
						'<div class="card-section">' +
							'<h4>' + name + '</h4>' +
							'<p>' + description + '</p>'+
						'</div>'+
					'</div>'+
				'</div>');
		};
	}

	document.getElementById("data-row-show").innerHTML = rowDataShow;
	console.log(dataRow);
};

// END Google Books Dynamic Display



// Display the returned data to dynamically change page based on the Marvel function returns.

function marvelDisplay(data) {
	pageData = data.data.results;
    
    //data row from HTML, tagged data-row-show in html
	var dataRow = document.getElementById('data-row-show');
	var rowDataShow = ``;

	//this is the data to get from API call to display for character search
	for (var i = 0; i < pageData.length; i++) {
		var name = pageData[i].name;
		var description = pageData[i].description;
		var thumbnail = pageData[i].thumbnail.path;
		var extension = pageData[i].thumbnail.extension;

		// This filters to only show items that have thumbnail
		if (!pageData[i].thumbnail.path.includes('image_not_available')) {
			rowDataShow += `
				<div class="column">
					<div class="card">
						<div class="card-section">
							<img src="${thumbnail}.${extension}">
						</div>
						<div class="card-section">
							<h4>${name}</h4>
							<p>${description}</p>
						</div>
					</div>
				</div>
			`;
		}
	}
	//this is the dynamic to show is rowDataShow area
	dataRow.innerHTML = rowDataShow;
}





