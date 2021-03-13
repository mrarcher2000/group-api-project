document.addEventListener("DOMContentLoaded", buttonSearch);
var apiKey = "68249a1ca55b9f3b6c691fb85d3568c9fb74eede";
var publicKey = "11a71eed96128ec62bd061b4d096a38a";

function buttonSearch(event) 
{

    // Marvel requires timestamp, private key key, public key

    var timestamp = event.timestamp;
    var req = new XMLHttpRequest();
    var marvelWebsite = 'http://gateway.marvel.com/v1/public/characters?name='
    var heroName = document.getElementById('heroName').value;
    var web = marvelWebsite + heroName + "ts=" + timestamp + 'apiKey=' + apiKey + '$hash=' + publicKey;

        document.getElementById('submit').addEventListener('click', function (event) {
            document.getElementById('heroName').textContent = "";
            document.getElementById('description').textContent = "";
        });

        req.open('GET', web, true);

        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if(req.status >= 200 && req.status < 400) {
                var result = JSON.parse(req.responseText);
                document.getElementById('name').textContent = result.name;
                document.getElementById('description').texContent = result.description;

            }

            event.preventDefault();
        });
        req.send(null);

        }




