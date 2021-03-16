var OAuth = ({
    Headers: {
        'Authorization':"110390812845-atel9olo9j4m7m705ticrtk2df1nsrg8.apps.googleusercontent.com",
        'targetCountry':'US'
    }
});
var gURL = "https://www.googleapis.com/books/v1/volumes?q=the+amazing+spiderman+1950&?key=AIzaSyCmKU98XNUkZoT2jqpQ1_EiwLKAdSZmqpA";

// "https://www.googleapis.com/books/v1/volumes?key=AIzaSyCmKU98XNUkZoT2jqpQ1_EiwLKAdSZmqpA?q=spider+man+issue+417
// https://cors-anywhere.herokuapp.com/
// http://webservices.amazon.com/SearchItems


var parseGoogleBooks = function(titleStartsWith) {
    
    console.log(titleStartsWith);
    $("#characterName").html(titleStartsWith);
   

    titleVar = titleStartsWith.replace(' ', '+');
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

    });
};

var queryButton = document.getElementById("marvelQuery")
    queryButton.addEventListener("click", function(){
        var titleStartsWith = $('#name').val();
        // var startYear = $('#startYear').val();
        // getMarvelResponse(titleStartsWith,startYear);
        parseGoogleBooks(titleStartsWith);
});



// $.ajax({
//     url: gURL,
//     headers: {
//     'Authorization':'v^1.1#i^1#f^0#I^3#p^3#r^0#t^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',
//     'Access-Control-Allow-Origin':'*',
//     'Content-Type':'application/json',
//     'X-EBAY-C-MARKETPLACE-ID':'EBAY_US',
//     // 'X-EBAY-C-ENDUSERCTX':'affiliateCampaignId=96896098-7b7d-4aaf-b5c3-c791929f17e8'
//     }})
//     .then(function(response) {
//         if (response.ok){
//             response.json().then(function(data){
//                 console.log(data);
//             })
//         } else {
//             console.log("there was an error");
//         };
//     });

