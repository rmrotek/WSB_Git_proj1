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

document.getElementById("3").onclick = function () {
    if (!!storedText) {
        log.textContent = 'Liczba wyrazów to: ' + storedText.split(' ')
            .filter(function (n) { return n != '' })
            .length;
    } else {
        log.textContent = 'Brak pliku!'
    }

};

document.getElementById("4").onclick = function () {
    if (!!storedText) {
        log.textContent = 'Liczba znaków interpunkcyjnych to: ' + (storedText.match(/[,.!@#$%^&*()]/g) || []).length;
    } else {
        log.textContent = 'Brak pliku!'
    }

};

document.getElementById("5").onclick = function () {
    if (!!storedText) {
        log.textContent = 'Liczba zdań to: ' + (storedText.match(/[\w|\)][.?!](\s|$)/g) || []).length
    } else {
        log.textContent = 'Brak pliku!'
    }

};

document.getElementById("6").onclick = function () {
    if (!!storedText) {
        var counts = {}
        var ch, index, len, count;
        log.textContent = ''
        // Loop through the string...
        for (index = 0, len = storedText.length; index < len; ++index) {
            // Get this character
            ch = storedText.charAt(index); // Not all engines support [] on strings

            // Get the count for it, if we have one; we'll get `undefined` if we
            // don't know this character yet
            count = counts[ch];

            // If we have one, store that count plus one; if not, store one
            // We can rely on `count` being falsey if we haven't seen it before,
            // because we never store falsey numbers in the `counts` object.
            counts[ch] = count ? count + 1 : 1;
        }
        for (char in counts) {
            log.insertAdjacentHTML("beforeend",`${char}: ${counts[char]} <br>` ) 
        }
        
    } else {
        log.textContent = 'Brak pliku!'
    }

};

