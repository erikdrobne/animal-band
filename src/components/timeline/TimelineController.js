define('TimelineController', [
    'soundMatrix'
], function(soundMatrix) {
    'use strict';

    return {
        renderSequencer: renderSequencer
    }

    function renderSequencer() {
        var $sequencer = document.querySelector('.timeline .sequencer');

        soundMatrix.getMatrix().map(function(instrument, index) {
            var $instrument = document.createElement('div');
            $instrument.className = 'instrument';
            $instrument.setAttribute('data-id', instrument.id);
            instrument.instrumentPattern.map(function(note, index) {
                var $note = document.createElement('div'),
                    $noteSymbol = document.createElement('div')
                ;
                $noteSymbol.className = 'note__symbol';

                $note.className = 'note';
                $note.setAttribute('data-value', note);
                $note.appendChild($noteSymbol);
                $instrument.appendChild($note);
            });
            $sequencer.appendChild($instrument);
        });
    }
})
