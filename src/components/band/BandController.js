define('BandController', [], function() {
    'use strict';

    var $bandContainer =
        document.querySelector('#animalBand .band__container'),
        renderer,
        stage;

    return {
        init: init
    };

    function init() {
        var renderer = PIXI.autoDetectRenderer(600, 400);
        $bandContainer.appendChild(renderer.view);

        var stage = new PIXI.Container();
        renderer.render(stage);
    }
});
