define('bandConfig', function(){
    return {
        rendererOptions: { transparent: true },
        animations: {
            basskick: {
                id: 'elephant',
                types: ['PlayingRight', 'PlayingLeft']
            },
            cowbell: {
                id: 'bison',
                types: ['PlayingRight', 'PlayingLeft']
            },
            hihat: {
                id: 'girafe',
                types: ['PlayingRight', 'PlayingLeft']
            },
            snare: {
                id: 'monkey',
                types: ['PlayingRight', 'PlayingLeft']
            },
            tom1: {
                id: 'lion',
                types: ['PlayingLeft_Tom1', 'PlayingRight_Tom1']
            },
            tom2: {
                id: 'lion',
                types: ['PlayingLeft_Tom2', 'PlayingRight_Tom2']
            },
            tom1_tom2: {
                id: 'lion',
                types: ['PlayingLeft_TomTom', 'PlayingRight_TomTom']
            }
        }
    };
});
