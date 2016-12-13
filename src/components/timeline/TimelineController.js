define('TimelineController', [
    'soundMatrix'
], function(soundMatrix) {
    'use strict';

    var isPlaying = false;

    return {
        init: init,
        renderSequencer: renderSequencer,
        isPlaying: isPlaying
    }

    function init() {
        togglePlaying()
    }

    function renderSequencer() {
        var $sequencer = document.querySelector('.timeline .sequencer');

        soundMatrix.getMatrix().map(function(instrument, index) {
            var $instrument = document.createElement('div');
            $instrument.className = 'instrument';
            $instrument.setAttribute('data-id', instrument.id);
            instrument.instrumentPattern.map(function(note, index) {
                var $note = document.createElement('div'),
                    $noteSymbol = document.createElement('div');
                $noteSymbol.className = 'note__symbol';
                $note.className = 'note';
                $note.setAttribute('data-value', note);
                $note.appendChild($noteSymbol);
                $instrument.appendChild($note);
            });
            $sequencer.appendChild($instrument);
        });
    }

    function togglePlaying() {
        document.querySelector('.timeline .btn--play')
            .addEventListener('click', function() {
                isPlaying = !isPlaying;
                console.log(isPlaying);
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

            }, false);
    }
})
