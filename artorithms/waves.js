let canvasWidth = 720;
let canvasHeight = 720;
let wavesDistance = 45;
let pointsDistance = 10;
let peaksNormalizer = 100;
let chunk = 50;
let wavesurfer = WaveSurfer.create({
  container: 'body',
  height: 0 // hide waveform HTML element
});

$(document).on("change", "#fileinput", function(){
  var file = this.files[0];

  if (file) {
    var reader = new FileReader();
    
    reader.onload = function (evt) {
        var blob = new window.Blob([new Uint8Array(evt.target.result)]);

        wavesurfer.loadBlob(blob);
    };

    reader.onerror = function (evt) {
        console.error("An error ocurred reading the file: ", evt);
    };

    reader.readAsArrayBuffer(file);
  }
});

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
}

function draw() {
  background(183, 113, 61);
  translate(0, 150);
  console.log('Initiating...')
  wavesurfer.on('ready', function () {
    // Uncomment to also play the song :)
    //wavesurfer.play();
    for(let i = 0; i < 10; i++) {
      drawPeaks(
        wavesurfer.backend.mergedPeaks.slice(i * chunk, i * chunk + chunk),
        i
      );
    }
  });
}

function drawPeaks(peaks, iteration) {
  let iterationSpace = iteration * wavesDistance;
  let prevPoint = {
    x: 100,
    y: 0 + iterationSpace
  };

  for(let i = 0; i < peaks.length; i++) {
    stroke(255);
    strokeWeight(2);
    let newPoint = {
      x: prevPoint.x + pointsDistance,
      y: Math.abs(peaks[i] * peaksNormalizer) + iterationSpace
    };

    line(prevPoint.x, prevPoint.y, newPoint.x, newPoint.y);
    prevPoint = newPoint;
  }
}