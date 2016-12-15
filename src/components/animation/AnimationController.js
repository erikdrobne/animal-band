define('AnimationController', [], function() {
    'use strict';

    var $animationContainer =
        document.querySelector('#animalBand .animation__container'),
        renderer,
        stage;

    return {
        init: init
    };

    function init() {
        var renderer = PIXI.autoDetectRenderer(600, 400);
        $animationContainer.appendChild(renderer.view);

        var stage = new PIXI.Container();
        renderer.render(stage);
    }
});
