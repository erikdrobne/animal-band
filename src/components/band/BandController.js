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
        var bizon = null;
        var lev = null;
        var slon = null;
        var opica = null;

        //to more bit
        var backgroud = new PIXI.Sprite(PIXI.Texture.EMPTY);

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
                .add("monkeyAtlas", "assets/animations/Monkey/Monkey_tex.png");
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
                
                bizon = factory.buildArmatureDisplay("Bison");
                lev = factory.buildArmatureDisplay("Lion");
                slon = factory.buildArmatureDisplay("Elephant");
                opica = factory.buildArmatureDisplay("Monkey");

                bizon.scale.set(0.3);
                bizon.x = renderer.width * 0.1;
                bizon.y = renderer.height * 0.5;

                lev.scale.set(0.3);
                lev.x = renderer.width * 0.2 * 1.3;
                lev.y = renderer.height * 0.5 + 220;

                slon.scale.set(0.3);
                slon.x = renderer.width * 0.3 * 1.6;
                slon.y = renderer.height * 0.5 + 90;

                opica.scale.set(0.3);
                opica.x = renderer.width * 0.4 * 1.7;
                opica.y = renderer.height * 0.5 + 140;

                
                stage.addChild(bizon);
                stage.addChild(lev);
                stage.addChild(slon);
                stage.addChild(opica);

                stage.interactive = true;
                stage.addChild(backgroud);
                backgroud.width = renderer.width;
                backgroud.height = renderer.height;
                //s tem nadzoruješ hitrost animacije
                bizon.animation.timeScale = 1;
                bizon.animation.gotoAndPlay('Idle', -1, -1, 0);

                lev.animation.timeScale = 1;
                lev.animation.gotoAndPlay('Idle', -1, -1, 0);

                slon.animation.timeScale = 1;
                slon.animation.gotoAndPlay('Idle', -1, -1, 0);

                opica.animation.timeScale = 1;
                opica.animation.gotoAndPlay('Idle', -1, -1, 0);
            }

            function renderHandler (deltaTime) {
                renderer.render(stage);
            };
            
    }
});
