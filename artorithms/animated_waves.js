let canvasWidth = 720;
let canvasHeight = 720;
let wavesDistance = 45;
let pointsDistance = 10;
let peaksNormalizer = 100;
let minWavesDistance = 5;
let chunk = 50;
let wavesurfer = WaveSurfer.create({
  container: 'body',
  height: 0 // hide waveform HTML element
});

let peaks = undefined;

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
  frameRate(3);
  //noLoop();
}

function draw() {
  background(183, 113, 61);
  translate(0, 150);
  console.log('Initiating...')
  if (peaks === undefined) {
    wavesurfer.on('ready', function () {
      peaks = wavesurfer.backend.mergedPeaks
    });
  }
  else if(peaks.length > 0) {
    for (let i = 0; i < 10; i++) {
      drawPeaks(peaks.splice(0, chunk), i);
    }
  }
  else {
    console.log('The end');
  }
}

function drawPeaks(_peaks, iteration) {
  let iterationSpace = iteration * wavesDistance;
  let prevPoint = {
    x: 100,
    y: 0 + iterationSpace
  };

  for(let i = 0; i < _peaks.length; i++) {
    stroke(255);
    strokeWeight(1);
    let newPoint = {
      x: prevPoint.x + pointsDistance,
      y: maxPeakValue(_peaks[i], iteration)
    };

    line(prevPoint.x, prevPoint.y, newPoint.x, newPoint.y);
    prevPoint = newPoint;
  }
}

function maxPeakValue(peak, iteration) {
  let normalizedPeak = Math.abs(peak * peaksNormalizer) + iteration * wavesDistance;
  let nextWaveStart = (iteration + 1) * wavesDistance;
  let iterationBound = nextWaveStart - minWavesDistance;

  return normalizedPeak > iterationBound ? iterationBound : normalizedPeak
}