define('AppController', [
    'TimelineController',
    'BandController',
    'appService'
], function (TimelineController, BandController, appService) {
    'use strict';

    return {
        init: init
    }

    function init() {
        handleAppVisibility();
        TimelineController.init();
        BandController.init();
    }

    function handleAppVisibility() {
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        function handleVisibilityChange() {
            if (document[hidden]) {
                document.dispatchEvent(
                    appService.getAppVisibilityEvent(false)
                );
            } else {
                document.dispatchEvent(
                    appService.getAppVisibilityEvent(true)
                );
            }
        }
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
});
