define('bandConfig', function(){
    return {
        rendererOptions: { transparent: true },
        instruments: {
            basskick: {
                animal: 'elephant',
                animations: ['PlayingRight, PlayingLeft']
            },
            cowbell: {
                animal: 'bison',
                animations: ['PlayingRight, PlayingLeft']
            },
            hihat: {
                animal: 'girafe',
                animations: ['PlayingRight, PlayingLeft']
            },
            snare: {
                animal: 'monkey',
                animations: ['PlayingRight, PlayingLeft']
            },
            tom1: {
                animal: 'lion',
                animations: ['PlayingLeft_Tom1', 'PlayingRight_Tom1']
            },
            tom2: {
                animal: 'lion',
                animations: ['PlayingLeft_Tom2', 'PlayingRight_Tom2']
            }
            tom1_tom2: {
                animal: 'lion',
                animations: ['PlayingLeft_TomTom', 'PlayingRight_TomTom']
            }
        }
    };
});
