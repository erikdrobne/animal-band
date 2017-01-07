define('arrayHelpers', function() {
    'use strict';

    return {
        getRandomValue: getRandomValue
    };

    function getRandomValue (list) {
        return list [Math.floor(Math.random() * list.length)];
    }
});
