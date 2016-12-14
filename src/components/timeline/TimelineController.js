define('TimelineController', [
    'soundMatrix',
    'soundMatrixService',
    'domHelpers',
    'AudioController'
], function(soundMatrix, soundMatrixService, domHelpers, AudioController) {
    'use strict';

    var $timeline = document.querySelector('.timeline'),
        isPlaying = false;

    return {
        init: init,
        renderSequencer: renderSequencer,
        isPlaying: isPlaying
    }

    function init() {
        renderSequencer();
        togglePlaying();
        AudioController.init();
    }

    function renderSequencer() {
        var $sequencer = $timeline.querySelector('.sequencer'),
            matrix = soundMatrix.matrix;
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
            })
            $sequencer.appendChild($instrument);
        });
        toggleNotes();
    }

    function togglePlaying() {
        $timeline.querySelector('.btn--play')
            .addEventListener('click', function() {
                isPlaying = !isPlaying;
                if(isPlaying) {
                    this.querySelector('.icon')
                        .classList.remove('icon--play');
                    this.querySelector('.icon')
                        .classList.add('icon--pause');
                } else {
                    this.querySelector('.icon')
                        .classList.remove('icon--pause');
                    this.querySelector('.icon')
                        .classList.add('icon--play');
                }

            });
    }

    function toggleNotes() {
        var $noteSymbols = $timeline.querySelectorAll('.note__symbol'),
        i;

        for(i = 0; i < $noteSymbols.length; i++) {
            $noteSymbols[i]
                .addEventListener('click', function(e) {
                    var index = parseInt(this.getAttribute('data-index')),
                        instrument = domHelpers.findAncestor(this, 'instrument')
                            .getAttribute('data-id'),
                        value = this.getAttribute('data-value')

                    if(!(typeof(value) === "boolean")) {
                        if(value === "true") {
                            value = false
                        } else if(value === "false") {
                            value = true
                        } else {
                            value = true
                        }
                    }

                    soundMatrixService.setInstrumentPattern(soundMatrix.matrix, instrument, index, value);
                    this.setAttribute('data-value', value);

                    if(value === true) {
                        this.classList.add('active');
                    } else {
                        this.classList.remove('active');
                    }
                });
        }
    }
})
