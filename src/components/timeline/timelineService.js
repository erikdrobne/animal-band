define('timelineService', [
    'domHelpers'
], function(domHelpers) {
    return {
        toggleActiveNote: toggleActiveNote
    };

    function toggleActiveNote(matrix) {
        var index = parseInt(this.getAttribute('data-index')),
            instrument = domHelpers.findAncestor(this, 'instrument')
                .getAttribute('data-id'),
            value = this.getAttribute('data-value');

        if(typeof(value) !== "boolean") {
            if(value === "true") {
                value = false;
            } else {
                value = true;
            }
        } else {
            value = !value;
        }

        matrix.entities[instrument][index] = value;
        this.setAttribute('data-value', value);

        if(value === true) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
    }
});
