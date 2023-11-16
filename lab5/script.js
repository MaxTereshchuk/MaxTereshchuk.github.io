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

        // Знаходимо елемент на сторінці за його ідентифікатором і встановлюємо вміст
        document.getElementById('result').innerHTML = `Площа п'ятикутника зі стороною ${sideLength} одиниць дорівнює ${formattedArea} `;