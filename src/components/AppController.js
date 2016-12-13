define('AppController', [
    'soundMatrix',
    'TimelineController',
], function (soundMatrix, TimelineController) {
    'use strict';

    soundMatrix.init();
    TimelineController.renderSequencer();
});
