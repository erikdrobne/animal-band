define('AppController', [
    'TimelineController',
    'BandController'
], function (TimelineController, BandController) {
    'use strict';

    TimelineController.init();
    BandController.init();
});
