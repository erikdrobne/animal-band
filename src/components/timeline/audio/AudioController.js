define('AudioController', [
    'bufferLoader'
], function(bufferLoader){

    var buffer,
        context,
        sounds = [
            'assets/sounds/samples/basskick.wav',
            'assets/sounds/samples/cowbell.wav',
            'assets/sounds/samples/hihat.wav',
            'assets/sounds/samples/snare.wav',
            'assets/sounds/samples/tom1.wav',
            'assets/sounds/samples/tom2.wav'
        ];

    return {
        init: init
    }

    function init() {
        setAudioContext();

        if(context) {
            setAudioBuffer();
        }
    }

    function setAudioContext() {
        try {
            context = new AudioContext();
        }
        catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
    }

    function setAudioBuffer() {
        buffer = bufferLoader.getInstance(
            context,
            sounds,
            function () {
                console.log('complete handle');
            }
        );
        console.log(buffer);
        buffer.load();
    }
});



// var matrix = {
//         entities: {
//             'basskick': [true, false, true, false, true, false, false, false],
//             'cowbell': [false, true, false, false, false, false, false, false],
//             'hihat': [false, false, false, false, false, false, false, false],
//             'snare': [false, false, true, false, false, false, false, false],
//             'tom1': [false, false, false, false, true, false, false, false],
//             'tom2': [false, false, false, false, false, false, true, false]
//         },
//         result: ['basskick', 'cowbell', 'hihat', 'snare', 'tom1', 'tom2']
//     }

//TO GRE V BUFFER.JS____________________________________________
// function BufferLoader(context, urlList, callback) {
//     this.context = context;
//     this.urlList = urlList;
//     this.onload = callback;
//     this.bufferList = new Array();
//     this.loadCount = 0;
// }
//
// BufferLoader.prototype.loadBuffer = function(url, index) {
//     var request = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.responseType = "arraybuffer";
//
//     var loader = this;
//
//     request.onload = function() {
//         loader.context.decodeAudioData(
//             request.response,
//             function(buffer) {
//                 if (!buffer) {
//                     alert('error decoding file data: ' + url);
//                     return;
//                 }
//                 loader.bufferList[index] = buffer;
//                 if (++loader.loadCount == loader.urlList.length)
//                     loader.onload(loader.bufferList);
//             }
//         );
//     }
//
//     request.onerror = function() {
//         alert('BufferLoader: XHR error');
//     }
//
//     request.send();
// }
//
// BufferLoader.prototype.load = function() {
//     for (var i = 0; i < this.urlList.length; ++i)
//         this.loadBuffer(this.urlList[i], i);
// }
// //______________________________________________________________
//
// window.onload = init;
//
// var context;
// var bufferLoader;
//
// var tempo = 180; // BPM (beats per minute)
// var quarterNoteTime = 60 / tempo;
// var rhythmIndex = 0;
// var loopLength = 8;
// var noteTime = 0.0;
// var startTime;
// var lastDrawTime = -1;
// var timerWorker = null;
//
// function init() {
//     try {
//         context = new AudioContext();
//     }
//     catch(e) {
//         alert("Web Audio API is not supported in this browser");
//     }
//
//     // Start loading the drum kit.
//     bufferLoader = new BufferLoader(
//         context,
//         [
//         "sounds/basskick.wav",
//         "sounds/cowbell.wav",
//         "sounds/hihat.wav",
//         "sounds/snare.wav",
//         "sounds/tom1.wav",
//         "sounds/tom2.wav"
//         ],
//         bufferLoadCompleted
//     );
//
//     bufferLoader.load();
//
//     var timerWorkerBlob = new Blob([
//         "var timeoutID=0;function schedule(){timeoutID=setTimeout(function(){postMessage('schedule'); schedule();},10);} onmessage = function(e) { if (e.data == 'start') { if (!timeoutID) schedule();} else if (e.data == 'stop') {if (timeoutID) clearTimeout(timeoutID); timeoutID=0;};}"]);
//
//     // Obtain a blob URL reference to our worker 'file'.
//     var timerWorkerBlobURL = window.URL.createObjectURL(timerWorkerBlob);
//
//     timerWorker = new Worker(timerWorkerBlobURL);
//     timerWorker.onmessage = function(e) {
//       schedule();
//     };
//
//     timerWorker.postMessage('init'); // Start the worker.
// }
//
// function advanceNote() {
//     //Next 8th note
//     var secondsPerBeat = 60.0 / tempo;
//
//     rhythmIndex++;
//     if (rhythmIndex == loopLength) {
//         rhythmIndex = 0;
//     }
//
//     noteTime += 0.50 * secondsPerBeat;
// }
//
// function playNote(buffer, time) {
//     var source = context.createBufferSource();
//     source.buffer = buffer;
//     source.connect(context.destination);
//
//     source.start(time);
// }
//
// // schedules notes
// function schedule() {
//
//     var currentTime = context.currentTime;
//
//     // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
//     currentTime -= startTime;
//
//      while (noteTime < currentTime + 0.25) {
//         // Convert noteTime to context time.
//         var contextPlayTime = noteTime + startTime;
//
//         for(var i=0; i<matrix.result.length; i++){
//             if(matrix.entities[matrix.result[i]][rhythmIndex]){
//                 playNote(bufferLoader.bufferList[i], contextPlayTime);
//             }
//         }
//
//         advanceNote();
//     }
// }
//
// function bufferLoadCompleted() {
//     console.log("loaded");
// }
//
// function handlePlay(bufferlist) {
//     startTime = context.currentTime + 0.005;
//     schedule(bufferlist);
//     timerWorker.postMessage("start");
//
// }
//
// function handleStop() {
//     rhythmIndex = 0;
//     timerWorker.postMessage("stop");
// }
