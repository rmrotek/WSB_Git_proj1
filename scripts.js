console.log('scripts loaded')

var storedText;
var log = document.getElementById('log')
var url = 'https://s3.zylowski.net/public/input/8.txt';

document.getElementById("1").onclick = function () {
    fetch(url)
        .then(function (response) {
            response.text().then(function (text) {
                storedText = text;
                done();
            });
        });

    function done() {
        log.textContent =
            "Plik wczytany";
    }
};

document.getElementById("2").onclick = function () {
    if (!!storedText) {
        log.textContent = 'Liczba znakow to: ' + storedText.length
    } else {
        log.textContent = 'Brak pliku!'
    }
    
};