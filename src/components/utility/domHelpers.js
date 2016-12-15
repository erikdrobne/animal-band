define('domHelpers', function() {
    'use strict';
    
    return {
        findAncestor: findAncestor
    };

    function findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
});
