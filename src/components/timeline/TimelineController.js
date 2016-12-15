define('TimelineController', [
    'timelineService',
    'audioConfig',
    'AudioController'
], function(timelineService, audioConfig, AudioController) {
    'use strict';

    var $timeline = document.querySelector('.timeline'),
        isPlaying = false;

    return {
        init: init,
        renderSequencer: renderSequencer,
        isPlaying: isPlaying
    };

    function init() {
        renderSequencer();
        togglePlaying();
        toggleActiveNotes();
        AudioController.init();
        updateGainValue();
        highlightRhytm();
    }

    function renderSequencer() {
        var $sequencer = $timeline.querySelector('.sequencer'),
            matrix = audioConfig.matrix;
        matrix.result.map(function(instrument, index) {
            var $instrument = document.createElement('div');
            $instrument.className = 'instrument';
            $instrument.setAttribute('data-id', instrument);

            matrix.entities[instrument].map(function(note, index) {
                var $note = document.createElement('div'),
                    $noteSymbol = document.createElement('div');
                $noteSymbol.className = 'note__symbol';
                $noteSymbol.setAttribute('data-index', index);
                $noteSymbol.setAttribute('data-value', note);
                $note.className = 'note';
                $note.appendChild($noteSymbol);
                $instrument.appendChild($note);
            });
            $sequencer.appendChild($instrument);
        });
    }

    function togglePlaying() {
        $timeline.querySelector('.btn--play')
            .addEventListener('click', function() {
                isPlaying = !isPlaying;
                if(isPlaying) {
                    this.querySelector('.icon')
                        .classList.remove('icon--play');
                    this.querySelector('.icon')
                        .classList.add('icon--stop');
                    AudioController.startPlaying();
                } else {
                    this.querySelector('.icon')
                        .classList.remove('icon--stop');
                    this.querySelector('.icon')
                        .classList.add('icon--play');
                    AudioController.stopPlaying();
                }
            });
    }

    function toggleActiveNotes() {
        var $noteSymbols = $timeline.querySelectorAll('.note__symbol'),
        i;

        for(i = 0; i < $noteSymbols.length; i++) {
            $noteSymbols[i]
                .addEventListener(
                    'click',
                    function() {
                        timelineService.toggleActiveNote.call(
                            this,
                            audioConfig.matrix
                        );
                    }
                );
        }
    }

    function updateGainValue() {
        $timeline.querySelector('.timeline .gain')
            .addEventListener('input', function() {
                AudioController.setGainValue(this.value/100);
            });
    }

    function highlightRhytm() {
        document.querySelector('.timeline')
            .addEventListener('animalBand.audio.rhythmIndex', function(e) {
                audioConfig.matrix.result.map(function(instrument, index) {
                    var rhythmIndex = e.detail.rhythmIndex;
                    if(audioConfig.matrix.entities[instrument][rhythmIndex]) {
                        timelineService.highlightNote(instrument, rhythmIndex, 300);
                    }
                });
            });
    }
});
