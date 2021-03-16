





var PRIV_KEY = "e5adbf59cf74376ae819dac9a3acf80014e3250d";
var PUBLIC_KEY = "52f2436e7c8155ca67ba599eece92c66";

var queryButton = document.getElementById("marvelQuery")
    
    queryButton.addEventListener("click", function(){
        var titleStartsWith = $('#name').val();
        var startYear = $('#startYear').val();

    getMarvelResponse(titleStartsWith,startYear)
});

function getMarvelResponse(title,year) {
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts+PRIV_KEY+PUBLIC_KEY).toString();
    console.log("get Marvel response"+title,year)

    

    var url = 'http://gateway.marvel.com/v1/public/comics';
    
    console.log(url);

    $.getJSON(url, {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        limit: 5,
        titleStartsWith: title,
        startYear: year
        
        
    })

    .done(function(data) {
        console.log(data)
        for (var i = 0; i < data.data.count; i++) {
           $('#result').append('<p>'+data.data.results[i].title+'</p>')
           
           console.log($("#result"))
        }
    })

    .fail(function(err) {
        console.log(err);
    });
};

//$('#result').append('<p>"test data"</p')


