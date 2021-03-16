var PRIV_KEY = "68249a1ca55b9f3b6c691fb85d3568c9fb74eede";
var PUBLIC_KEY = "11a71eed96128ec62bd061b4d096a38a";

function getMarvelResponse() {
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts+PRIV_KEY+PUBLIC_KEY).toString();
 

    var titleStartsWith = $('#name').val();
    var startYear = $('#startYear').val();

    var url = 'http://gateway.marvel.com:80/v1/public/comics';
    
    console.log(url);

    $.getJSON(url, {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        limit: 10,
        titleStartsWith: titleStartsWith,
        startYear: startYear
        
        
    })

    .done(function(data) {
        console.log(data)
        for (var i = 0; i < data.data.count; i++) {
           $('#result').append('<p>'+data.data.results[i].title+'</p')
        }
    })

    .fail(function(err) {
        console.log(err);
    });
};

getMarvelResponse();