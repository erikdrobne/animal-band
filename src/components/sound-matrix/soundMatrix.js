define('soundMatrix', [
    'soundMatrixConstants'
], function (soundMatrixConstants) {
    'use strict';

    var matrix = setDefaultMatrix();

    return {
        getMatrix: getMatrix,
        setRhytm: setRhytm,
        setDefaultMatrix: setDefaultMatrix
    }

    function getMatrix() {
        return matrix;
    }

    function setDefaultMatrix() {
        return soundMatrixConstants.getMatrix().slice();
    }

    function setRhytm() {

    }
});
