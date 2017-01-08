define('audioService', function() {
    'use strict';

    return {
        getRhytmIndexEvent: getRhytmIndexEvent,
        clearAudioMatrix: clearAudioMatrix
    };

    function getRhytmIndexEvent(rhythmIndex) {
        return new CustomEvent(
            'animalBand.audio.rhythmIndex',
            { detail: { rhythmIndex: rhythmIndex }}
        );
    }

    function clearAudioMatrix(matrix) {
        for(var item in matrix.entities) {
            matrix.entities[item] = matrix.entities[item].map(function() {
                return false;
            });
        }
        return matrix;
    }
});
