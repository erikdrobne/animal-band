define('audioConfig', function () {
    'use strict';

    return {
        matrix: {
            entities: {
                'basskick': [true, false, true, false, true, false, true, false],
                'cowbell': [false, true, false, true, false, true, false, true],
                'hihat': [true, true, true, true, false, true, true, true],
                'snare': [false, true, false, true, false, true, false, true],
                'tom1': [false, true, false, false, false, true, false, false],
                'tom2': [true, true, false, true, false, true, false, true]
            },
            result: ['basskick', 'cowbell', 'hihat', 'snare', 'tom1', 'tom2']
        },
        audioFiles: [
            'assets/sounds/samples/basskick.wav',
            'assets/sounds/samples/cowbell.wav',
            'assets/sounds/samples/hihat.wav',
            'assets/sounds/samples/snare.wav',
            'assets/sounds/samples/tom1.wav',
            'assets/sounds/samples/tom2.wav'
        ],
        tempo: 60,
        loopLength: 8
    };
});
