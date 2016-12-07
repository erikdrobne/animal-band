define([
    './soundMatrixConstants'
], function () {
    'use strict';

    return {
        getMatrix: getMatrix,
        setRhytm: setRhytm,
        setDefaultMatrix: setDefaultMatrix
    };

    var matrix = setDefaultMatrix();

    function getMatrix() {
        return matrix;
    }

    function setDefaultMatrix() {
        matrix.slice();
    }

    function setRhytm() {

    }
});
