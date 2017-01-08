define('bandConfig', function() {
    return {
        rendererOptions: { transparent: true },
        backgroudImg: 'assets/img/background.png',
        animations: {
            elephant: {
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink'],
                data: {
                    bones: 'assets/animations/Elephant/Elephant_ske.json',
                    texture: 'assets/animations/Elephant/Elephant_tex.json',
                    atlas: 'assets/animations/Elephant/Elephant_tex.png'
                },
                scale: 0.3,
                position: { x: 0.24, y: 0.7 }
            },
            bison: {
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink'],
                data: {
                    bones: 'assets/animations/Bison/Bison_ske.json',
                    texture: 'assets/animations/Bison/Bison_tex.json',
                    atlas: 'assets/animations/Bison/Bison_tex.png'
                },
                scale: 0.3,
                position: { x: 0.38, y: 0.5 }
            },
            girafe: {
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink'],
                data: {
                    bones: 'assets/animations/Girafe/Girafe_ske.json',
                    texture: 'assets/animations/Girafe/Girafe_tex.json',
                    atlas: 'assets/animations/Girafe/Girafe_tex.png'
                },
                scale: 0.25,
                position: { x: 0.75, y: 0.6 }
            },
            monkey: {
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink'],
                data: {
                    bones: 'assets/animations/Monkey/Monkey_ske.json',
                    texture: 'assets/animations/Monkey/Monkey_tex.json',
                    atlas: 'assets/animations/Monkey/Monkey_tex.png'
                },
                scale: 0.3,
                position: { x: 0.5, y: 0.8 }
            },
            lion: {
                types: {
                    tom1: ['PlayingLeft_Tom1', 'PlayingRight_Tom1', 'PlayingRight_Tom1_Blink'],
                    tom2: ['PlayingLeft_Tom2', 'PlayingRight_Tom2', 'PlayingRight_Tom2_Blink'],
                    tom1tom2: ['PlayingLeft_TomTom', 'PlayingRight_TomTom', 'PlayingRight_TomTom_Blink']
                },
                data: {
                    bones: 'assets/animations/Lion/Lion_ske.json',
                    texture: 'assets/animations/Lion/Lion_tex.json',
                    atlas: 'assets/animations/Lion/Lion_tex.png'
                },
                scale: 0.3,
                position: { x: 0.62, y: 1.1 }
            }
        },
        animationsMapping: {
            basskick: 'elephant',
            cowbell: 'bison',
            hihat: 'girafe',
            snare: 'monkey',
            tom1: 'lion',
            tom2: 'lion',
            tom1tom2: 'lion'
        },
        backgroundImg: 'assets/img/background.png'
    };
});
