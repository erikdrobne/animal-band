define('AudioController', [
    'bufferLoader',
    'audioConfig'
], function(bufferLoader, audioConfig) {

    var buffer,
        context,
        timerWorkerBlobURL,
        timerWorker,
        startTime,
        tempo = audioConfig.tempo,
        matrix = audioConfig.matrix,
        loopLength = audioConfig.loopLength,
        quarterNoteTime = 60 / tempo,
        noteTime = 0.0,
        rhythmIndex = 0
    ;

    return {
        init: init,
        startPlaying: startPlaying,
        stopPlaying: stopPlaying
    };

    function init() {
        setAudioContext();
        if(context) {
            setAudioBuffer();
            setTimeWorker();
        }
    }

    function startPlaying() {
        startTime = context.currentTime + 0.005;
        scheduleSounds(buffer.bufferlist);
        timerWorker.postMessage("start");
    }

    function stopPlaying() {
        rhythmIndex = 0;
        timerWorker.postMessage("stop");
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
            audioConfig.audioFiles,
            bufferLoadCompleted
        );
        buffer.load();
    }

    function setTimeWorker() {
        timerWorkerBlobURL = window.URL.createObjectURL(new Blob([
            "var timeoutID=0;function schedule(){timeoutID=setTimeout(function(){postMessage('schedule'); schedule();},10);} onmessage = function(e) { if (e.data == 'start') { if (!timeoutID) schedule();} else if (e.data == 'stop') {if (timeoutID) clearTimeout(timeoutID); timeoutID=0;};}"
        ]));

        timerWorker = new Worker(timerWorkerBlobURL);
        timerWorker.onmessage = function(e) {
            scheduleSounds();
        };
        timerWorker.postMessage('init');
    }

    function scheduleSounds() {
            var currentTime = context.currentTime;
            currentTime -= startTime;

            while (noteTime < currentTime + 0.25) {
                var contextPlayTime = noteTime + startTime;
                for(var i=0; i < matrix.result.length; i++){
                    if(matrix.entities[matrix.result[i]][rhythmIndex]) {
                        playNote(buffer.bufferList[i], contextPlayTime);
                    }
                }
                advanceNote();
            }
    }

    function playNote(buffer, time) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(time);
    }

    function advanceNote() {
        var secondsPerBeat = 60.0 / tempo;
        rhythmIndex++;
        if (rhythmIndex === loopLength) {
            rhythmIndex = 0;
        }
        noteTime += 0.50 * secondsPerBeat;
    }

    function bufferLoadCompleted() {
        console.log('buffer loaded');
    }
});