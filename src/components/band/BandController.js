define('BandController', [
    'audioConfig',
    'bandConfig',
    'bandService'
], function(audioConfig, bandConfig, bandService) {
    'use strict';

    var $bandContainer =
        document.querySelector('#animalBand .band__container'),
        renderer,
        stage,
        animationObjects;

    return {
        init: init
    };

    function init() {
        setRenderer();
        setStage();
        toggleAnimalAnimation();
    }

    function setRenderer() {
        renderer = PIXI.autoDetectRenderer(
            $bandContainer.offsetWidth,
            $bandContainer.offsetHeight,
            bandConfig.rendererOptions
        );
        bandService.setRendererStyle(renderer);
        renderer.autoResize = true;
        $bandContainer.appendChild(renderer.view);
    }

    function setStage() {


        var stage = new PIXI.Container();
        var factory = new dragonBones.PixiFactory();
        animationObjects = {
            bison: null,
            lion: null,
            elephant: null,
            monkey: null,
            girafe: null
        };


        //to more bit
        var backgroud = new PIXI.Sprite(PIXI.Texture.EMPTY);
        //var backgroud = new PIXI.Sprite(PIXI.Texture.fromImage('assets/img/background.png'));

        PIXI.ticker.shared.add(renderHandler);

            // Load data.
            PIXI.loader
                .add("bisonBonesData", "assets/animations/Bison/Bison_ske.json")
                .add("bisonTextureData", "assets/animations/Bison/Bison_tex.json")
                .add("bisonAtlas", "assets/animations/Bison/Bison_tex.png")
                .add("lionBonesData", "assets/animations/Lion/Lion_ske.json")
                .add("lionTextureData", "assets/animations/Lion/Lion_tex.json")
                .add("lionAtlas", "assets/animations/Lion/Lion_tex.png")
                .add("elephantBonesData", "assets/animations/Elephant/Elephant_ske.json")
                .add("elephantTextureData", "assets/animations/Elephant/Elephant_tex.json")
                .add("elephantAtlas", "assets/animations/Elephant/Elephant_tex.png")
                .add("monkeyBonesData", "assets/animations/Monkey/Monkey_ske.json")
                .add("monkeyTextureData", "assets/animations/Monkey/Monkey_tex.json")
                .add("monkeyAtlas", "assets/animations/Monkey/Monkey_tex.png")
                .add("girafeBonesData", "assets/animations/Girafe/Girafe_ske.json")
                .add("girafeTextureData", "assets/animations/Girafe/Girafe_tex.json")
                .add("girafeAtlas", "assets/animations/Girafe/Girafe_tex.png");
            PIXI.loader.once("complete", loadComplateHandler);
            PIXI.loader.load();


            function loadComplateHandler (loader, object) {
             // Parse data.
                factory.parseDragonBonesData(object["bisonBonesData"].data);
                factory.parseTextureAtlasData(object["bisonTextureData"].data, object["bisonAtlas"].texture);
                factory.parseDragonBonesData(object["lionBonesData"].data);
                factory.parseTextureAtlasData(object["lionTextureData"].data, object["lionAtlas"].texture);
                factory.parseDragonBonesData(object["elephantBonesData"].data);
                factory.parseTextureAtlasData(object["elephantTextureData"].data, object["elephantAtlas"].texture);
                factory.parseDragonBonesData(object["monkeyBonesData"].data);
                factory.parseTextureAtlasData(object["monkeyTextureData"].data, object["monkeyAtlas"].texture);
                factory.parseDragonBonesData(object["girafeBonesData"].data);
                factory.parseTextureAtlasData(object["girafeTextureData"].data, object["girafeAtlas"].texture);

                animationObjects.bison = factory.buildArmatureDisplay("Bison");
                animationObjects.lion = factory.buildArmatureDisplay("Lion");
                animationObjects.elephant = factory.buildArmatureDisplay("Elephant");
                animationObjects.monkey = factory.buildArmatureDisplay("Monkey");
                animationObjects.girafe = factory.buildArmatureDisplay("Girafe");

                animationObjects.bison.scale.set(0.3);
                animationObjects.bison.x = renderer.width * 0.1;
                animationObjects.bison.y = renderer.height * 0.5;

                animationObjects.lion.scale.set(0.3);
                animationObjects.lion.x = renderer.width * 0.2 * 1.3;
                animationObjects.lion.y = renderer.height * 0.5 + 220;

                animationObjects.elephant.scale.set(0.3);
                animationObjects.elephant.x = renderer.width * 0.3 * 1.6;
                animationObjects.elephant.y = renderer.height * 0.5 + 90;

                animationObjects.monkey.scale.set(0.3);
                animationObjects.monkey.x = renderer.width * 0.4 * 1.7;
                animationObjects.monkey.y = renderer.height * 0.5 + 120;

                animationObjects.girafe.scale.set(0.25);
                animationObjects.girafe.x = renderer.width * 0.4 * 2.1;
                animationObjects.girafe.y = renderer.height * 0.5 + 40;


                stage.addChild(animationObjects.bison);
                stage.addChild(animationObjects.lion);
                stage.addChild(animationObjects.elephant);
                stage.addChild(animationObjects.monkey);
                stage.addChild(animationObjects.girafe);


                stage.interactive = true;
                stage.addChild(backgroud);
                backgroud.width = renderer.width;
                backgroud.height = renderer.height;
                //s tem nadzoruješ hitrost animacije
                animationObjects.bison.animation.timeScale = 2;
                // animationObjects.bison.animation.gotoAndPlay('PlayingRight', -1, -1, 0);
                //
                animationObjects.lion.animation.timeScale = 2;
                // animationObjects.lion.animation.gotoAndPlay('PlayingRight_TomTom', -1, -1, 0);
                //
                animationObjects.elephant.animation.timeScale = 2;
                // animationObjects.elephant.animation.gotoAndPlay('PlayingLeft', -1, -1, 0);
                //
                animationObjects.monkey.animation.timeScale = 2;
                // animationObjects.monkey.animation.gotoAndPlay('PlayingRight', -1, -1, 0);
                // //monkey.animation.gotoAndPlay('PlayingLeft', -1, -1, 0);
                //
                animationObjects.girafe.animation.timeScale = 2;
                // animationObjects.girafe.animation.gotoAndPlay('PlayingRight', -1, -1, 0);
            }

            function renderHandler (deltaTime) {
                renderer.render(stage);
            };

    }

    function toggleAnimalAnimation() {
        document.querySelector('.timeline')
            .addEventListener('animalBand.audio.rhythmIndex', function(e) {
                audioConfig.matrix.result.map(function(instrument, index) {
                    var rhythmIndex = e.detail.rhythmIndex,
                        animation = bandConfig.animations[instrument],
                        isSet = audioConfig.matrix.entities[instrument][rhythmIndex]
                    ;

                    if(isSet) {
                        animationObjects[animation.id].animation.gotoAndPlay(
                            animation.types[Math.floor(Math.random()*animation.types.length)],
                            -1,
                            -1,
                            1
                        );
                    } else {
                        animationObjects[animation.id].animation.gotoAndPlay('Idle', -1, -1, 1);
                    }
                });
            });
    }
});
