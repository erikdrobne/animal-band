define('timelineService', [
    'domHelpers'
], function(domHelpers) {
    'use strict';
    
    return {
        toggleActiveNote: toggleActiveNote,
        highlightNote: highlightNote
    };

    function toggleActiveNote(matrix) {

        var index = parseInt(this.getAttribute('data-index')),
            instrument = domHelpers.findAncestor(this, 'instrument')
                .getAttribute('data-id'),
            value = this.getAttribute('data-value');

        if(typeof(value) !== "boolean") {
            if(value === "true") {
                value = false;
            } else {
                value = true;
            }
        } else {
            value = !value;
        }

        matrix.entities[instrument][index] = value;
        this.setAttribute('data-value', value);

        if(value === true) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }

        highlightNote(instrument, index, 500);
    }

    function highlightNote(instrument, index, time) {
        var $noteSymbol = document.querySelector(
            '.instrument[data-id="'+ instrument +'"] .note__symbol[data-index="'+ index +'"]'
        );
        $noteSymbol.classList.add('highlighted');
        setTimeout(function () {
            $noteSymbol.classList.remove('highlighted');
        }, time);
    }

   
});
