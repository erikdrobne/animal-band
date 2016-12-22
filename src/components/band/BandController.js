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
        var zmaj = null;
        var posast = null;
        var posast2 = null;

        //to more bit
        var backgroud = new PIXI.Sprite(PIXI.Texture.EMPTY);

        PIXI.ticker.shared.add(renderHandler);
            
            // Load data.
            PIXI.loader
                .add("zmajBonesData", "assets/animations/zmaj/zmaj_ske.json")
                .add("zmajTextureData", "assets/animations/zmaj/zmaj_tex.json")
                .add("zmajAtlas", "assets/animations/zmaj/zmaj_tex.png")
                .add("posastBonesData", "assets/animations/posast/posast_ske.json")
                .add("posastTextureData", "assets/animations/posast/posast_tex.json")
                .add("posastAtlas", "assets/animations/posast/posast_tex.png");
            PIXI.loader.once("complete", loadComplateHandler);
            PIXI.loader.load();


            function loadComplateHandler (loader, object) {
             // Parse data.
                factory.parseDragonBonesData(object["zmajBonesData"].data);
                factory.parseTextureAtlasData(object["zmajTextureData"].data, object["zmajAtlas"].texture);
                factory.parseDragonBonesData(object["posastBonesData"].data);
                factory.parseTextureAtlasData(object["posastTextureData"].data, object["posastAtlas"].texture);
                
                zmaj = factory.buildArmatureDisplay("zmaj");
                posast = factory.buildArmatureDisplay("posast");
                posast2 = factory.buildArmatureDisplay("posast");

                zmaj.scale.set(0.5);
                zmaj.x = renderer.width * 0.2;
                zmaj.y = renderer.height * 0.5 + 150;

                posast.scale.set(0.5);
                posast.x = renderer.width * 0.5;
                posast.y = renderer.height * 0.5 + 150;

                posast2.scale.set(0.5);
                posast2.x = renderer.width * 0.8;
                posast2.y = renderer.height * 0.5 + 150;
                
                stage.addChild(zmaj);
                stage.addChild(posast);
                stage.addChild(posast2);

                stage.interactive = true;
                stage.addChild(backgroud);
                backgroud.width = renderer.width;
                backgroud.height = renderer.height;
                //s tem nadzoruješ hitrost animacije
                zmaj.animation.timeScale = 1;
                zmaj.animation.gotoAndPlay('stand', -1, -1, 0);

                posast.animation.timeScale = 1;
                posast.animation.gotoAndPlay('run', -1, -1, 0);

                posast2.animation.timeScale = 1;
                posast2.animation.gotoAndPlay('normalAttack', -1, -1, 0);
            }

            function renderHandler (deltaTime) {
                renderer.render(stage);
            };
            
    }
});
