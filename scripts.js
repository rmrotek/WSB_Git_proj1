console.log('scripts loaded')

var storedText;

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
        document.getElementById('log').textContent =
            "file loaded";
    }
};