define('AudioController', [
    'bufferLoader',
    'audioConfig',
    'audioService'
], function(bufferLoader, audioConfig, audioService) {
    'use strict';

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
        rhythmIndex = 0,
        glasbaOzadje = document.getElementById("glasba-ozadje"),
        gainNode
    ;

    return {
        init: init,
        startPlaying: startPlaying,
        stopPlaying: stopPlaying,
        setGainValue: setGainValue
    };

    function init() {
        glasbaOzadje.volume = 0.2;
        setAudioContext();
        if(context) {
            setAudioBuffer();
            setTimeWorker();
            setEffectsDefault();
        }
    }

    function startPlaying() {
        noteTime = 0.0;
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

    function setEffectsDefault() {
        gainNode = context.createGain();
        gainNode.gain.value = 1;
    }

    function setGainValue(value) {
        gainNode.gain.value = value;
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

        source.connect(gainNode);

        gainNode.connect(context.destination);
        source.start(time);
    }

    function advanceNote() {
        var secondsPerBeat = 60.0 / tempo;

        document.querySelector('.timeline')
            .dispatchEvent(audioService.getRhytmIndexEvent(rhythmIndex));
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
