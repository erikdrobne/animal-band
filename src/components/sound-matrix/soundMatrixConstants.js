define('soundMatrixConstants', function () {
    'use strict';

    var matrix = [
        { id: 'basskick', value: [false, false, false, false, false, false, false, false] },
        { id: 'cowbell', value: [false, false, false, false, false, false, false, false] },
        { id: 'hihat', value: [false, false, false, false, false, false, false, false] },
        { id: 'snare', value: [false, false, false, false, false, false, false, false] },
        { id: 'tom1', value: [false, false, false, false, false, false, false, false] },
        { id: 'tom2', value: [false, false, false, false, false, false, false, false] }
    ];

    return {
        getMatrix: getMatrix
    }

    function getMatrix() {
        return matrix;
    }
});
