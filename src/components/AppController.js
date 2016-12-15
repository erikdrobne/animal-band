define('AppController', [
    'TimelineController',
    'AnimationController'
], function (TimelineController, AnimationController) {
    'use strict';

    TimelineController.init();
    AnimationController.init();
});
