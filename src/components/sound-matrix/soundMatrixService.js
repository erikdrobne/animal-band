define('soundMatrixService', [
], function () {
    'use strict';


    return {
        setInstrumentPattern: setInstrumentPattern
    }

    function setInstrumentPattern(matrix, instrument, index, value) {
        matrix.entities[instrument][index] = value;
    }
});
