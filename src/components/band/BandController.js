define('BandController', [
    'bandConfig',
    'bandService'
], function(bandConfig, bandService) {
    'use strict';

    var $bandContainer =
        document.querySelector('#animalBand .band__container'),
        renderer,
        stage;

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
        var bison = null;
        var lion = null;
        var elephant = null;
        var monkey = null;
        var girafe = null;

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

                bison = factory.buildArmatureDisplay("Bison");
                lion = factory.buildArmatureDisplay("Lion");
                elephant = factory.buildArmatureDisplay("Elephant");
                monkey = factory.buildArmatureDisplay("Monkey");
                girafe = factory.buildArmatureDisplay("Girafe");

                bison.scale.set(0.3);
                bison.x = renderer.width * 0.1;
                bison.y = renderer.height * 0.5;

                lion.scale.set(0.3);
                lion.x = renderer.width * 0.2 * 1.3;
                lion.y = renderer.height * 0.5 + 220;

                elephant.scale.set(0.3);
                elephant.x = renderer.width * 0.3 * 1.6;
                elephant.y = renderer.height * 0.5 + 90;

                monkey.scale.set(0.3);
                monkey.x = renderer.width * 0.4 * 1.7;
                monkey.y = renderer.height * 0.5 + 120;

                girafe.scale.set(0.25);
                girafe.x = renderer.width * 0.4 * 2.1;
                girafe.y = renderer.height * 0.5 + 40;


                stage.addChild(bison);
                stage.addChild(lion);
                stage.addChild(elephant);
                stage.addChild(monkey);
                stage.addChild(girafe);


                stage.interactive = true;
                stage.addChild(backgroud);
                backgroud.width = renderer.width;
                backgroud.height = renderer.height;
                //s tem nadzoruješ hitrost animacije
                bison.animation.timeScale = 1;
                bison.animation.gotoAndPlay('PlayingRight', -1, -1, 0);

                lion.animation.timeScale = 1;
                lion.animation.gotoAndPlay('PlayingRight_TomTom', -1, -1, 0);

                elephant.animation.timeScale = 1;
                elephant.animation.gotoAndPlay('PlayingLeft', -1, -1, 0);

                monkey.animation.timeScale = 2;
                monkey.animation.gotoAndPlay('PlayingRight', -1, -1, 0);
                //monkey.animation.gotoAndPlay('PlayingLeft', -1, -1, 0);

                girafe.animation.timeScale = 1;
                girafe.animation.gotoAndPlay('PlayingRight', -1, -1, 0);
            }

            function renderHandler (deltaTime) {
                renderer.render(stage);
            };

    }

    function toggleAnimalAnimation() {
        document.querySelector('.timeline')
            .addEventListener('animalBand.audio.rhythmIndex', function(e) {
                console.log(e.detail);
                // audioConfig.matrix.result.map(function(instrument, index) {
                //     var rhythmIndex = e.detail.rhythmIndex;
                //     if(audioConfig.matrix.entities[instrument][rhythmIndex]) {
                //         timelineService.highlightNote(
                //             instrument,
                //             rhythmIndex,
                //             60000 / audioConfig.tempo
                //         );
                //
                //     }
                // });
            });
    }
});
