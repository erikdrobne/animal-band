define('soundMatrix', function () {
    'use strict';

    var matrix = {
        entities: {
            'basskick': [false, false, false, false, false, false, false, false],
            'cowbell': [false, false, false, false, false, false, false, false],
            'hihat': [false, false, false, false, false, false, false, false],
            'snare': [false, false, false, false, false, false, false, false],
            'tom1': [false, false, false, false, false, false, false, false],
            'tom2': [false, false, false, false, false, false, false, false]
        },
        result: ['basskick', 'cowbell', 'hihat', 'snare', 'tom1', 'tom2']
    }

    return {
        matrix: matrix
    }
});
