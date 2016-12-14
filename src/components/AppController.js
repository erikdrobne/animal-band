define('AppController', [
    'TimelineController',
], function (TimelineController) {
    'use strict';

    TimelineController.init();
    TimelineController.renderSequencer();
});
