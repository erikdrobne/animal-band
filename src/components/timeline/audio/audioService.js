define('audioService', function() {
    return {
        getRhytmIndexEvent: getRhytmIndexEvent
    };

    function getRhytmIndexEvent(rhythmIndex) {
        return new CustomEvent(
            'animalBand.audio.rhythmIndex',
            { detail: { rhythmIndex: rhythmIndex }}
        );
    }
});
