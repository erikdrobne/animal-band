define('bandConfig', function() {
    return {
        rendererOptions: { transparent: true },
        animations: {
            elephant: {
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink'],
                data: {
                    bones: 'assets/animations/Elephant/Elephant_ske.json',
                    texture: 'assets/animations/Elephant/Elephant_tex.json',
                    atlas: 'assets/animations/Elephant/Elephant_tex.png'
                }
            },
            bison: {
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink'],
                data: {
                    bones: 'assets/animations/Bison/Bison_ske.json',
                    texture: 'assets/animations/Bison/Bison_tex.json',
                    atlas: 'assets/animations/Bison/Bison_tex.png'
                }
            },
            giraffe: {
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink'],
                data: {
                    bones: 'assets/animations/Girafe/Girafe_ske.json',
                    texture: 'assets/animations/Girafe/Girafe_tex.json',
                    atlas: 'assets/animations/Girafe/Girafe_tex.png'
                }
            },
            monkey: {
                types: ['PlayingRight', 'PlayingLeft','PlayingRight_Blink'],
                data: {
                    bones: 'assets/animations/Monkey/Monkey_ske.json',
                    texture: 'assets/animations/Monkey/Monkey_tex.json',
                    atlas: 'assets/animations/Monkey/Monkey_tex.png'
                }
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
                }
            }
        },
        animationsMapping: {
            basskick: 'elephant',
            cowbell: 'bison',
            hihat: 'giraffe',
            snare: 'monkey',
            tom1: 'lion',
            tom2: 'lion',
            tom1tom2: 'lion'
        }
    };
});
