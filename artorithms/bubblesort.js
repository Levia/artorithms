let arrayColors = {};
let myArray = [];
let arraySize = 16;
let squareSize = 20;
let whiteSpace = 40;
let roundSize = 5;
let canvasWidth = 720;
let canvasHeight = 720;
let widthCenter = canvasWidth / arraySize;
let heightCenter = canvasHeight / (arraySize / 2);

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
}

function draw() {
  background(255);
  //noStroke();
  //return randomImage();
  generateArray(arraySize);
  initArray();
  console.log(arrayColors);
  sortArray();
  console.log(myArray);
}

function generateArray(size) {
  //myArray = Array.from(
  //  {length: arraySize}, () => Math.floor(Math.random() * 1000)
  //);
  for(let i = 0; i < size; i++) {
    let el = getRandomInt(1000);
    myArray[i] = el;
    console.log(el);
  }
}

function initArray() {
  for (let i = 0; i < myArray.length; i++) {
    let red = randomColor();
    let green = randomColor();
    let blue = randomColor();
    
    fill(red, green, blue);
    arrayColors[myArray[i]] = {
      red: red,
      green: green,
      blue: blue
    }
    rect(
      widthCenter + (i*whiteSpace),
      heightCenter,
      squareSize,
      squareSize,
      roundSize
    );
  }
}

function sortArray() {
  let swapped = true;
  let iteration = 1;
  let swappedElements = [];
  while(swapped) {
    swapped = false;
    for (let i = 0; i < myArray.length; i++) {
      if(myArray[i] > myArray[i+1]) {
        swappedElements.push(i, i+1);
        let tmp = myArray[i];
        myArray[i] = myArray[i+1];
        myArray[i+1] = tmp;
        swapped = true;
      }
    }
    printArray(iteration, swappedElements);
    iteration++;
    swappedElements = [];
  }
}

function printArray(iteration, swappedElements) {
  for (let i = 0; i < myArray.length; i++) {
    let rgb = arrayColors[myArray[i]];
    let elemX = widthCenter + (i * whiteSpace);
    let elemY = heightCenter + (iteration * whiteSpace);

    fill(rgb.red, rgb.green, rgb.blue);
    rect(
      elemX,
      elemY,
      squareSize,
      squareSize,
      roundSize
    );
    if (i == swappedElements[0]) {
      noFill();
      ellipse(
        elemX + squareSize*1.5,
        elemY + squareSize/2,
        35*2,
        35
      );
      //ellipse(
      //  elemX + whiteSpace + squareSize/2,
      //  elemY + squareSize/2,
      //  35,
      //  35
      //)
      swappedElements.splice(0,2);
    }
  }
}

function randomImage() {
  console.log(height);
  for (let i = 0; i < height; i += 20) {
    fill(randomColor(), randomColor(), randomColor());
    rect(0, i, width, 10);
    fill(randomColor(), randomColor(), randomColor());
    rect(i, 0, 10, height);
  }
}

function randomColor() {
  return getRandomInt(256)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}