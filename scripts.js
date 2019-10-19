console.log('scripts loaded')

var storedText;
var log = document.getElementById('log')
var url = 'https://s3.zylowski.net/public/input/8.txt';

var fileChooser = document.getElementById('file-chooser')
var fileDownloadSection = document.getElementById('download-file')
var fileLocal = document.getElementById('local-file')

var urlInput = document.getElementById('url-input')
var fileInput = document.getElementById('file-input')

document.getElementById("1").onclick = function () {
  fileChooser.className = 'block'
};

document.getElementById("choose-download-yes").onclick = function () {
  fileDownloadSection.className = 'block'
  fileLocal.className = 'none'
};

document.getElementById("choose-download-no").onclick = function () {
  fileLocal.className = 'block'
  fileDownloadSection.className = 'none'
};

document.getElementById("download-file-btn").onclick = function () {
  fetch(urlInput.value)
    .then(handleErrors)
    .then(function (response) {
      response.text().then(function (text) {
        storedText = text;
        done();
      })
    })

  function done() {
    log.textContent = "Plik wczytany";
  }

  function handleErrors(response) {
    if (!response.ok) {
      return log.textContent = "Błąd";
    }
    return response;
  }
};


document.getElementById("local-file-btn").onclick = function () {
  var file = fileInput.files[0]
  var reader = new FileReader()
  reader.onload = (function (reader) {
    return function () {
      var contents = reader.result;
      storedText = contents
      log.textContent = "Plik wczytany";
    }
  })(reader);

  reader.readAsText(file);
};


document.getElementById("2").onclick = function () {
  if (!!storedText) {
    log.textContent = ''
    log.insertAdjacentHTML("beforeend", `Liczba samogłosek: ${(storedText.match(/[eyoiaąęóu]/gi) || []).length} <br>`)
    log.insertAdjacentHTML("beforeend", `Liczba spółgłosek: ${(storedText.match(/[qwrtpsdfghjklzxcvbnmłżźść]/gi) || []).length} <br>`)
  } else {
    log.textContent = 'Brak pliku!'
  }
}
  

document.getElementById("3").onclick = function () {
  if (!!storedText) {
    var words = storedText.split(' ').filter(function (n) { return n != '' && n.length > 1 }).length
    log.textContent = 'Liczba wyrazów to: ' + words;
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
        log.textContent = 'Liczba zdań to: ' + (storedText.match(/[\w|\)][.?](\s|$)/g) || []).length
    } else {
        log.textContent = 'Brak pliku!'
    }

};

document.getElementById("6").onclick = function () {
  if (!!storedText) {
    var counts = {}
    var ch, index, len, count;
    log.textContent = ''
    for (index = 0, len = storedText.length; index < len; ++index) {
      ch = storedText.charAt(index);
      count = counts[ch];
      counts[ch] = count ? count + 1 : 1;
    }
    for (char in counts) {
      log.insertAdjacentHTML("beforeend", `${char}: ${counts[char]} <br>`)
    }

  } else {
    log.textContent = 'Brak pliku!'
  }

};

document.getElementById("8").onclick = function () {
  window.close();
}
