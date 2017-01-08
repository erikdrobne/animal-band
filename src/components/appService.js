define('appService', function() {
    'use strict';

    return {
        getAppVisibilityEvent: getAppVisibilityEvent
    };

    function getAppVisibilityEvent(isVisible) {
        return new CustomEvent(
            'animalBand.visibility',
            { detail: { isVisible: isVisible }}
        );
    }
});
