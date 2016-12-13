define('soundMatrix', [
    'soundMatrixConstants'
], function (soundMatrixConstants) {
    'use strict';

    var matrix;

    return {
        getMatrix: getMatrix,
        setDefaultMatrix: setDefaultMatrix,
        init: init
    }

    function getMatrix() {
        return matrix;
    }

    function setDefaultMatrix() {
        return soundMatrixConstants.getMatrix().slice();
    }

    function init() {
         matrix = setDefaultMatrix();
    }
});
