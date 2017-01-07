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
        numberOfClicksOnMonkey = 0,
        text,
        animationObjects = {},
        blinkingIdle;

    return {
        init: init,
        setIdleAnimationState: setIdleAnimationState
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
        stage = new PIXI.Container();
        PIXI.ticker.shared.add(renderHandler);
        setAnimalAnimation();

        function renderHandler (deltaTime) {
            renderer.render(stage);
        };
    }

    function setAnimalAnimation() {
        var factory = new dragonBones.PixiFactory(),
            animationData;

        for(var animation in bandConfig.animations) {
            animationData = bandConfig.animations[animation].data
            PIXI.loader.add(animation + 'Bones', animationData.bones)
            PIXI.loader.add(animation + 'Texture', animationData.texture)
            PIXI.loader.add(animation + 'Atlas', animationData.atlas)
        }

        PIXI.loader.once("complete", onLoadComplete);
        PIXI.loader.load();

        function onLoadComplete (loader, object) {
            for(var animation in bandConfig.animations) {
                factory.parseDragonBonesData(
                    object[animation + 'Bones'].data
                );
                factory.parseTextureAtlasData(
                    object[animation + 'Texture'].data,
                    object[animation + 'Atlas'].texture
                );
                animationObjects[animation] = factory.buildArmatureDisplay(
                    animation.charAt(0).toUpperCase() + animation.slice(1)
                );
                animationObjects[animation].scale.set(
                    bandConfig.animations[animation].scale
                );
                animationObjects[animation].x =
                    renderer.width * bandConfig.animations[animation].position.x;
                animationObjects[animation].y =
                    renderer.height * bandConfig.animations[animation].position.y;
                animationObjects[animation].animation.timeScale = 1;
                animationObjects[animation].animation.gotoAndPlay('Idle', 0.3, -1, 0);
            }
            setBackground();
            setIdleAnimationState();
        }

        function setBackground() {
            var backgroud = new PIXI.Sprite(
                PIXI.Texture.fromImage(bandConfig.backgroundImg
            ));
            backgroud.width = renderer.width;
            backgroud.height = renderer.height;
            stage.addChild(backgroud);
        }

        function setAnimationItemsonStage() {
            for(var animation in animations) {
                stage.addChild(animationObjects[animation]);
            }
        }
    }

    function setIdleAnimationState() {
        for(var animation in bandConfig.animations) {
            animationObjects[animation].animation.timeScale = 1;
            animationObjects[animation].animation.gotoAndPlay('Idle', 0.3, -1, 0);
            stage.addChild(animationObjects[animation]);
        }
    }

    function toggleAnimalAnimation() {
        document.querySelector('.timeline')
            .addEventListener('animalBand.audio.rhythmIndex', function(e) {

                audioConfig.matrix.result.map(function(instrument, index) {
                    var rhythmIndex = e.detail.rhythmIndex,
                        animation = bandConfig.animations[instrument],
                        isSet = audioConfig.matrix.entities[instrument][rhythmIndex],
                        tom1 = audioConfig.matrix.entities['tom1'][rhythmIndex],
                        tom2 = audioConfig.matrix.entities['tom2'][rhythmIndex],
                        isSetTom1Tom2 = tom1 && tom2
                    ;

                    if(isSet) {
                        if(isSetTom1Tom2){
                            if(animation.id == 'lion'){
                                //animation play speed
                                animationObjects[animation.id].animation.timeScale = 2;
                                animationObjects['lion'].animation.gotoAndPlay(
                                bandConfig.animations['tom1_tom2'].types[Math.floor(Math.random()*animation.types.length)], -1, -1, 1);
                             }
                            else {
                                animationObjects[animation.id].animation.timeScale = 2;
                                animationObjects[animation.id].animation.gotoAndPlay(animation.types[Math.floor(Math.random()*animation.types.length)],-1,-1,1);
                            }


                        }
                        else{
                            animationObjects[animation.id].animation.timeScale = 2;
                            animationObjects[animation.id].animation.gotoAndPlay(animation.types[Math.floor(Math.random()*animation.types.length)],-1,-1,1);
                        }
                    } else {
                        //if tom1 is playing dont animate Idle for tom2
                        if(!tom1){
                            animationObjects[animation.id].animation.timeScale = 2;

                            //blinking if idle
                            var animation = bandConfig.animations[instrument]
                            var rand = Math.floor((Math.random() * 100) + 1);
                            if( rand < 10) {
                                animationObjects[animation.id].animation.gotoAndPlay('Idle_Blink', -1, -1, 1);
                            }
                            else
                            {
                                 animationObjects[animation.id].animation.gotoAndPlay('Idle', -1, -1, 1);
                            }

                        }
                    }
                });
            });
    }
});
