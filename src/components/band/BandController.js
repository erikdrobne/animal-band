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
        stage = new PIXI.Container();
        renderer.render(stage);
    }
});
