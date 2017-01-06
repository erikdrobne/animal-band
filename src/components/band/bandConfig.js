define('bandConfig', function() {
    return {
        rendererOptions: { transparent: true },
        animations: {
            basskick: {
                id: 'elephant',
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink']
            },
            cowbell: {
                id: 'bison',
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink']
            },
            hihat: {
                id: 'girafe',
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink']
            },
            snare: {
                id: 'monkey',
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink']
            },
            tom1: {
                id: 'lion',
                types: ['PlayingLeft_Tom1', 'PlayingRight_Tom1', 'PlayingRight_Tom1_Blink']
            },
            tom2: {
                id: 'lion',
                types: ['PlayingLeft_Tom2', 'PlayingRight_Tom2', 'PlayingRight_Tom2_Blink']
            },
            tom1_tom2: {
                id: 'lion',
                types: ['PlayingLeft_TomTom', 'PlayingRight_TomTom', 'PlayingRight_TomTom_Blink']
            }
        }
    };
});
