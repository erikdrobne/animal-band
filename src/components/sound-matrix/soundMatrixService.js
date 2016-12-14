define('soundMatrixService', [
    'soundMatrixConstants'
], function (soundMatrixConstants) {
    'use strict';

    var matrix = soundMatrixConstants.matrix.slice();

    return {
        matrix: matrix,
        setInstrumentPattern: setInstrumentPattern
    }

    function setInstrumentPattern(instrument, index, value) {
        var i;
        for(i = 0; i < matrix.length; i++) {
            if (matrix[i].id === instrument) {
                matrix[i].instrumentPattern[index] = value;
                break;
            }
        }
    }
});
