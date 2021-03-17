// this is for CSS

let page = 0;

// Query the the chosen API with the current choices and modifiers
// Grabbing values from HTML to assign variables.

//This is main apiQuery function, if function for Marvel, if else function for Google Books //
function apiQuery() {
  //this is the chosen API from index
  var chooseAPI = document.getElementById("apiChoice").value;

  //this is name input box
  var nameStartsWith = document.getElementById("name-starts").value;

  //this is number to Return value variable
  var numbertoDisplay = document.getElementById("num-to-display");
  var numbertoDisplayValue =
    numbertoDisplay.options[numbertoDisplay.selectedIndex].value;

  //this parses number to return
  var results = parseInt(numbertoDisplayValue);

  //this is Marvel Function if chosen ......//

  if (chooseAPI === "marvel") {
    //checks to see valid input
    if (nameStartsWith.length > 0) {
      nameStarts = `nameStartsWith=${nameStartsWith}`;
    } else {
      nameStarts = ``;
    }
    //variables for function
    var marvelUrl = "http://gateway.marvel.com/v1/public/";
    var pub_Key = "11a71eed96128ec62bd061b4d096a38a";
    var priv_Key = "68249a1ca55b9f3b6c691fb85d3568c9fb74eede";

    //Marvel requires timestamp, hash for valid query
    var ts = new Date().getTime();

    //Uses crypto JS library to help with valid Marvel Call
    var hash = CryptoJS.MD5(ts + priv_Key + pub_Key).toString();
    //search method
    var searchBy = "characters";

    //user inputs
    var userInputs = `?${nameStarts}&limit=${results}&offset=${page}`;

    //gets data with ajax call from Marvel
    $.ajax({
      type: "GET",
      url: marvelUrl + searchBy + userInputs,
      data: {
        apikey: pub_Key,
        ts: ts,
        hash: hash,
      },
      dataType: "json",
      contentType: "application/json",
    })

      //then function to go down to dynamic display
      .then(
        function (data) {
          dynamicDisplay(data);
        },
        function (error) {
          alert("Error Found " + error.responseText);
        }
      );

    //Google function to go here
  } else if (chooseAPI === "Google") {
    // Googleapi function goes here//
  }
}

// Display the returned data to dynamically change page based on function returns.

function dynamicDisplay(data) {
  pageData = data.data.results;

  //data row from HTML
  var dataRow = document.getElementById("data-row-show");
  var rowDataShow = ``;

  for (var i = 0; i < pageData.length; i++) {
    var name = pageData[i].name;
    var description = pageData[i].description;
    var thumbnail = pageData[i].thumbnail.path;
    var extension = pageData[i].thumbnail.extension;

    // This filters to only show items that have thumbnail
    if (!pageData[i].thumbnail.path.includes("image_not_available")) {
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
  dataRow.innerHTML = rowDataShow;
}
