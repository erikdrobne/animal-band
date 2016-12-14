define('audioConfig', function () {
    'use strict';

    return {
        matrix: {
            entities: {
                'basskick': [false, false, false, false, false, false, false, false],
                'cowbell': [false, false, false, false, false, false, false, false],
                'hihat': [false, false, false, false, false, false, false, false],
                'snare': [false, false, false, false, false, false, false, false],
                'tom1': [false, false, false, false, false, false, false, false],
                'tom2': [false, false, false, false, false, false, false, false]
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
        tempo: 180,
        loopLength: 8
    };
});
