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
        animationObjects;

    return {
        init: init,
        setIdle: setIdle
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
        var factory = new dragonBones.PixiFactory();
        animationObjects = {
            bison: null,
            lion: null,
            elephant: null,
            monkey: null,
            girafe: null
        };

        var backgroud = new PIXI.Sprite(PIXI.Texture.fromImage('assets/img/background.png'));

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

                animationObjects.monkey.interactive = true;
                
                animationObjects.monkey.mousedown = function(data){
                    if(numberOfClicksOnMonkey==5){
                        text.setText("Oh no, you did it now!");
                         animationObjects.monkey.y = -1000;
                         setTimeout(function(){ text.destroy(); }, 2000);
                        
                    }
                    else if(numberOfClicksOnMonkey==3){
                        text = new PIXI.Text("Don't poke the monkey!", {font:"50px Arial", fill:"gray", dropShadow: true});
                        text.x = renderer.width * 0.32;
                        text.y = renderer.height * 0.2;
                        stage.addChild(text);
                    }
                    numberOfClicksOnMonkey++;
                }
                animationObjects.elephant.scale.set(0.3);
                animationObjects.elephant.x = renderer.width * 0.24;
                animationObjects.elephant.y = renderer.height * 0.5 + 70;

                animationObjects.bison.scale.set(0.3);
                animationObjects.bison.x = renderer.width * 0.38;
                animationObjects.bison.y = renderer.height * 0.5;

                animationObjects.monkey.scale.set(0.3);
                animationObjects.monkey.x = renderer.width * 0.5;
                animationObjects.monkey.y = renderer.height * 0.5 + 100;

                animationObjects.lion.scale.set(0.3);
                animationObjects.lion.x = renderer.width  * 0.62;
                animationObjects.lion.y = renderer.height * 0.5 + 190;

                animationObjects.girafe.scale.set(0.25);
                animationObjects.girafe.x = renderer.width * 0.75;
                animationObjects.girafe.y = renderer.height * 0.5 + 40;

                stage.addChild(backgroud);
                setIdle();
               
                backgroud.width = renderer.width;
                backgroud.height = renderer.height;
                
                
            }

            function renderHandler (deltaTime) {
                renderer.render(stage);
            };

    }

    function setIdle(){

        stage.addChild(animationObjects.bison);
        stage.addChild(animationObjects.lion);
        stage.addChild(animationObjects.elephant);
        stage.addChild(animationObjects.monkey);
        stage.addChild(animationObjects.girafe);

        animationObjects.bison.animation.timeScale = 1;
        animationObjects.lion.animation.timeScale = 1;
        animationObjects.elephant.animation.timeScale = 1;
        animationObjects.monkey.animation.timeScale = 1;
        animationObjects.girafe.animation.timeScale = 1;
        animationObjects['bison'].animation.gotoAndPlay('Idle', 0.3, -1, 0);
        animationObjects['lion'].animation.gotoAndPlay('Idle', 0.3, -1, 0);
        animationObjects['elephant'].animation.gotoAndPlay('Idle', 0.3, -1, 0);
        animationObjects['monkey'].animation.gotoAndPlay('Idle', 0.3, -1, 0);
        animationObjects['girafe'].animation.gotoAndPlay('Idle', 0.3, -1, 0);
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
                            animationObjects[animation.id].animation.gotoAndPlay('Idle', -1, -1, 1);
                        }
                    }
                });
            });
    }
});
