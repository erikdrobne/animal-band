define('BandController', [
    'audioConfig',
    'bandConfig',
    'bandService',
    'arrayHelpers'
], function(audioConfig, bandConfig, bandService, arrayHelpers) {
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
        initAnimalAnimation();

        function renderHandler (deltaTime) {
            renderer.render(stage);
        };
    }

    function initAnimalAnimation() {
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
            setMusicHandler();
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

    function setMusicHandler() {
        document.querySelector('.timeline')
            .addEventListener('animalBand.audio.rhythmIndex', function(e) {
                audioConfig.matrix.result.map(function(instrument, index) {
                    var rhythmIndex = e.detail.rhythmIndex,
                        animationId = bandConfig.animationsMapping[instrument],
                        animationData = bandConfig.animations[animationId],
                        isInstrumentSet = audioConfig.matrix.entities[instrument][rhythmIndex],
                        isTom1Set = audioConfig.matrix.entities['tom1'][rhythmIndex],
                        isTom2Set = audioConfig.matrix.entities['tom2'][rhythmIndex],
                        animationType;

                    if(isInstrumentSet) {
                        if(animationId === 'lion') {
                            if(isTom1Set && isTom2Set) {
                                animationType = arrayHelpers.getRandomValue(
                                    animationData.types.tom1tom2
                                );
                            } else if (isTom1Set) {
                                animationType = arrayHelpers.getRandomValue(
                                    animationData.types.tom1
                                );
                            } else if (isTom2Set) {
                                animationType = arrayHelpers.getRandomValue(
                                    animationData.types.tom2
                                );
                            }
                        } else {
                            animationType = arrayHelpers.getRandomValue(
                                animationData.types
                            );
                        }
                        animationObjects[animationId].animation.timeScale = 2;
                        animationObjects[animationId].animation.gotoAndPlay(
                            animationType, -1, -1, 1
                        );
                    } else {
                        animationObjects[animationId].animation.timeScale = 2;
                        var animation = bandConfig.animations[instrument]
                        var rand = Math.floor((Math.random() * 100) + 1);
                        if(rand < 10) {
                            animationObjects[animationId].animation.gotoAndPlay(
                                'Idle_Blink', -1, -1, 1
                            );
                        }
                        else {
                            animationObjects[animationId].animation.gotoAndPlay(
                                'Idle', -1, -1, 1
                            );
                        }
                    }
                });
            });
    }
});
