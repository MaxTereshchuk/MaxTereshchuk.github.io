var text1Element = document.getElementById('text1');
var text2Element = document.getElementById('text2');

var text1 = text1Element.innerHTML;
var text2 = text2Element.innerHTML;

text1Element.innerHTML = text2;
text2Element.innerHTML = text1;

function calculatePentagonArea(sideLength) {
    const area = (1/4) * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(sideLength, 2);
    return area;
}

const sideLength = 4;
const area = calculatePentagonArea(sideLength);

const formattedArea = area.toFixed(2);


document.getElementById('result').innerHTML = `Площа п'ятикутника зі стороною ${sideLength} одиниць дорівнює ${formattedArea} `;

function checkTriangle() {
    var sideA = parseFloat(document.getElementById('sideA').value);
    var sideB = parseFloat(document.getElementById('sideB').value);
    var sideC = parseFloat(document.getElementById('sideC').value);

    if (sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA) {
      var result = 'Можливо побудувати трикутник.';
    } else {
      var result = 'Не можливо побудувати трикутник.';
    }

    alert(result);

    document.cookie = 'triangleResult=' + result + '; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/';

    document.getElementById('triangleForm').style.display = 'none';

    document.getElementById('triangleForm').style.display = 'none';

  }

function showStoredResult() {
var storedResult = getCookie('triangleResult');

if (storedResult) {
    var userResponse = confirm(storedResult + '\n\nПісля натискання кнопки "ОК" дані будуть видалені. Продовжити?');

    if (userResponse) {
    document.cookie = 'triangleResult=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

    alert('Дані були видалені. Сторінка буде перезавантажена.');
    location.reload();
    }
} else {
    document.getElementById('triangleForm').style.display = 'block';
}
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
        return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}

function isLocalStorageSupported() {
    try {
      const testKey = "test";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

function setCapitalize(value) {
  const contentDiv = document.getElementById('content');

  if (value) {
    if (!contentDiv.hasAttribute('data-original-text')) {
      contentDiv.setAttribute('data-original-text', contentDiv.innerText);
    }

    const originalText = contentDiv.getAttribute('data-original-text');
    const words = originalText.split(' ');

    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    contentDiv.innerText = capitalizedWords.join(' ');
  } else {
    if (contentDiv.hasAttribute('data-original-text')) {
      contentDiv.innerText = contentDiv.getAttribute('data-original-text');
    }
  }

  if (isLocalStorageSupported()) {
    localStorage.setItem('capitalizeState', value);
  }
}

function getCapitalizeState() {
  if (isLocalStorageSupported()) {
    return localStorage.getItem('capitalizeState') === 'true';
  }
  return false;
}

document.getElementById('capitalizeCheckbox').checked = getCapitalizeState();

document.getElementById('capitalizeCheckbox').addEventListener('change', function () {
  setCapitalize(this.checked);
});

setCapitalize(getCapitalizeState());

function editContainer(containerNumber) {
  var containerId = "container" + containerNumber;
  var container = document.getElementById(containerId);

  if (container && container.childNodes.length === 1 && container.childNodes[0].nodeType === 3) {
      var input = document.createElement("input");
      input.type = "text";
      input.value = container.childNodes[0].nodeValue;

      var saveButton = document.createElement("button");
      saveButton.innerHTML = "Зберегти";
      saveButton.onclick = function () {
          localStorage.setItem(containerId, input.value);
          container.removeChild(container.childNodes[0]);
          container.appendChild(document.createTextNode(input.value));
      };

      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Видалити";
      deleteButton.onclick = function () {
          localStorage.removeItem(containerId);
          container.removeChild(container.childNodes[0]);
          container.appendChild(document.createTextNode("Container " + containerNumber));
      };

      container.innerHTML = "";
      container.appendChild(input);
      container.appendChild(saveButton);
      container.appendChild(deleteButton);
  }
}

function showStoredResult() {
  for (var i = 1; i <= 6; i++) {
      var containerId = "container" + i;
      var container = document.getElementById(containerId);

      var storedText = localStorage.getItem(containerId);
      if (container && storedText) {
          container.removeChild(container.childNodes[0]);
          container.appendChild(document.createTextNode(storedText));
      }
  }
}