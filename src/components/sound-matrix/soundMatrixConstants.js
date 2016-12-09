define('soundMatrixConstants', function () {
    'use strict';

    var matrix = [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false]
    ];

    return {
        getMatrix: getMatrix
    }

    function getMatrix() {
        return matrix;
    }
});
