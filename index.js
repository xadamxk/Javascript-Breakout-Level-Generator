let painting = false;
document.body.addEventListener("mousedown", event => {
  if (event.target.className === "pixel") {
    painting = true;
    paint(event.target);
  }
});
document.body.addEventListener("mouseup", event => {
  painting = false;
});
document.body.addEventListener("mouseover", event => {
  if (painting && event.target.className === "pixel") {
    paint(event.target);
  }
});
function paint(pixel) {
  let brush = document.querySelector('input[name="brush"]:checked');
  let color = brush ? brush.value : "";
  let index = Math.floor(
    Array.prototype.indexOf.call(
      brush.parentNode.parentNode.childNodes,
      brush.parentNode
    ) / 2
  );
  pixel.style.backgroundColor = color;
  pixel.dataset.brush = index;
  updateTemplates();
}
function updateTemplates() {
  // Height - 22 cells
  let data = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  let columns = document.querySelectorAll("#grid > ul > li");
  Array.prototype.forEach.call(columns, (col, x) => {
    let cells = col.querySelectorAll(".pixel");
    Array.prototype.forEach.call(cells, (cell, y) => {
      let brush = cell.dataset.brush || 0;
      data[y][x] = brush;
    });
  });
  updateLevelCode(data);
}
function updateLevelCode(data) {
  let stringData = "[" + data.map(row => row.join()).join("],[") + "]";
  let arrayData = JSON.parse("[" + stringData + "]");
  convertDataArray(arrayData);
}
function convertDataArray(dataArray) {
  let finalArray = dataArray;
  let prevLetter = "";
  let currentLetter = "";

  for (x = 0; x < dataArray.length; x++) {
    let row = dataArray[x];
    for (y = 0; y < row.length; y++) {
      currentLetter = convertNumberToLetter(dataArray[x][y]);
      if (currentLetter == prevLetter)
        if (currentLetter == currentLetter.toUpperCase())
          currentLetter = currentLetter.toLowerCase();
        else currentLetter = currentLetter.toUpperCase();
      finalArray[x][y] = currentLetter;
      prevLetter = currentLetter;
    }
  }
  document.getElementById("levelcode").value = convertCodeToOutput(convertArrayToPretty(finalArray));
}
function convertCodeToOutput(levelCode) {
  var colorStr = '"colors": {"a": "#00B500","b": "#FF2121","c": "#4d2f5d","d": "#333333","e": "#1F1F1F","f": "#ffcc00","g": "#0066ff","h": "#afaaaa","i": "#ed1c24","j": "#00cc66","k": "#99ccff","l": "#aa00ff","m": "#2D7E52","n": "#9999FF","o": "#ffcd94"},';
  var nameStr1 = '"name": "';
  var nameStr2 = '",';
  brickStr = '"bricks": [';
  
  return btoa("{" + colorStr + nameStr1 + document.getElementById("levelname").value + nameStr2 + brickStr + levelCode + "]}");
}
function convertArrayToPretty(array) {
  let tempString = "\"";
  for (x = 0; x < array.length; x++) {
    let row = array[x];
    for (y = 0; y < row.length; y++) {
      tempString += array[x][y];
    }
    if (x+1 < array.length)
      tempString += "\",\n\"";
    else
      tempString += "\""
  }
  return tempString;
}
function convertNumberToLetter(number) {
  switch (number-1) {
    case 0:
      return " ";
      break;
    case 1:
      return "a";
      break;
    case 2:
      return "b";
      break;
    case 3:
      return "c";
      break;
    case 4:
      return "d";
      break;
    case 5:
      return "e";
      break;
    case 6:
      return "f";
      break;
    case 7:
      return "g";
      break;
    case 8:
      return "h";
      break;
    case 9:
      return "i";
      break;
    case 10:
      return "j";
      break;
    case 11:
      return "k";
      break;
    case 12:
      return "l";
      break;
    case 13:
      return "m";
      break;
    case 14:
      return "n";
      break;
    case 15:
      return "o";
      break;
    case 16:
      return "p";
      break;
    case 17:
      return "q";
      break;
    case 18:
      return "r";
      break;
    case 19:
      return "s";
      break;
    case 20:
      return "t";
      break;
    case 21:
      return "u";
      break;
    case 22:
      return "v";
      break;
    case 23:
      return "w";
      break;
    case 24:
      return "x";
      break;
    case 25:
      return "y";
      break;
    case 26:
      return "z";
      break;
    default:
      return " ";
  }
}
