document.addEventListener("DOMContentLoaded", bindButtons);
var apiKey = 
var publicKey = 

function buttonSearch(event) 
{

    // Marvel requires timestamp, private key key, public key

    var timestamp = event.timestamp;
    var req = new XMLHttpRequest();
    var marvelWebsite = 'http://gateway.marvel.com/v1/public/characters?name='
    var heroName = document.getElementById.('heroName').value;
    var web = marvelWebsite + heroName + "ts=" + timestamp + 'apiKey=' + apiKey + '$hash=' + publicKey;

        document.getElementById('submit').addEventListener('click', function (event) {

        });

        req.open('GET', web, true);

        req.setRequestHeader('Content-Tyoe', 'application/json');
        req.addEventListener('load', function() {
            if(req.status >=200 && req.status <400) {
                var result = JSON.parse(req.responseText);
                document.getElementById('name').textContent = result.name;
                document.getElementById('description').texContent = result.description;

            }

            event.preventDefault();
        });
        req.send(null);

        }




