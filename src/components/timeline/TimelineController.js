define('TimelineController', [
    'timelineService',
    'audioConfig',
    'AudioController',
    'BandController'
], function(timelineService, audioConfig, AudioController, BandController) {
    'use strict';

    var $timeline = document.querySelector('#animalBand .timeline'),
        isPlaying = false,
        lastClickedNote;

    return {
        init: init,
        renderSequencer: renderSequencer,
        isPlaying: isPlaying
    };

    function init() {
        renderSequencer();
        togglePlaying();
        toggleActiveNotes();
        AudioController.init();
        updateGainValue();
        highlightRhytm();
        handleVisibilityChange();
    }

    function renderSequencer() {
        var $sequencer = $timeline.querySelector('.sequencer'),
            matrix = audioConfig.matrix;

        matrix.result.map(function(instrument, index) {
            var $instrument = document.createElement('div');
            $instrument.className = 'instrument';
            $instrument.setAttribute('data-id', instrument);

            matrix.entities[instrument].map(function(note, index) {
                var $note = document.createElement('div'),
                    $noteSymbol = document.createElement('div');

                if(note){
                    $noteSymbol.className = 'note__symbol active';
                }
                else
                    $noteSymbol.className = 'note__symbol';

                $note.setAttribute('ondragstart','return false;');
                $noteSymbol.setAttribute('data-index', index);
                $noteSymbol.setAttribute('data-value', note);
                $note.className = 'note';
                $note.appendChild($noteSymbol);
                $instrument.appendChild($note);
            });
            $sequencer.appendChild($instrument);
        });
    }

    function togglePlaying() {
        $timeline.querySelector('.btn--play')
            .addEventListener('click', function() {
                isPlaying = !isPlaying;
                if(isPlaying) {
                    this.querySelector('.icon')
                        .classList.remove('icon--play');
                    this.querySelector('.icon')
                        .classList.add('icon--stop');
                    AudioController.startPlaying();
                } else {
                    this.querySelector('.icon')
                        .classList.remove('icon--stop');
                    this.querySelector('.icon')
                        .classList.add('icon--play');
                    AudioController.stopPlaying();
                    BandController.setIdleAnimationState();
                }
            });
    }

    function toggleActiveNotes() {
        var $noteSymbols = $timeline.querySelectorAll('.note__symbol'),
            $notes = $timeline.querySelectorAll('.note'),
        i;
        var target = null;
        $noteSymbols
        for(i = 0; i < $noteSymbols.length; i++) {
            $notes[i]
                .addEventListener('mouseover', function(e) {
                    if(e.which==1
                        && this!= lastClickedNote
                        && this!= lastClickedNote.children[0]) {
                            timelineService.toggleActiveNote.call(
                                this.children[0],
                                audioConfig.matrix
                            );
                            lastClickedNote=this;
                    }
                });

            $notes[i]
                .addEventListener('mousedown', function() {
                    lastClickedNote=this;
                    timelineService.toggleActiveNote.call(
                        this.children[0],
                        audioConfig.matrix
                    );
                });
        }

        //take care of touch screens
        $timeline
            .addEventListener('touchmove', function(e) {
                var newTarget = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);

                if(lastClickedNote == null
                    && newTarget.classList.contains('note')) {
                        target = newTarget;
                        lastClickedNote = newTarget;
                        timelineService.toggleActiveNote.call(
                            newTarget.children[0],
                            audioConfig.matrix
                        );
                } else if(newTarget!=target
                    && newTarget.classList.contains('note')
                    && newTarget != lastClickedNote
                    && newTarget != lastClickedNote.children[0]) {
                        target = newTarget;
                        lastClickedNote = newTarget;
                        timelineService.toggleActiveNote.call(
                            newTarget.children[0],
                            audioConfig.matrix
                        );
                }
            });

        $timeline
            .addEventListener('touchend', function(e) {
                    lastClickedNote = null;
            });
    }

    function updateGainValue() {
        $timeline.querySelector('.timeline .gain')
            .addEventListener('input', function() {
                AudioController.setGainValue(this.value/100);
            });
    }

    function highlightRhytm() {
        document.querySelector('.timeline')
            .addEventListener('animalBand.audio.rhythmIndex', function(e) {
                audioConfig.matrix.result.map(function(instrument, index) {
                    var rhythmIndex = e.detail.rhythmIndex;
                    if(audioConfig.matrix.entities[instrument][rhythmIndex]) {
                        timelineService.highlightNote(
                            instrument,
                            rhythmIndex,
                            60000 / audioConfig.tempo
                        );
                    }
                });
            });
    }

    function handleVisibilityChange() {
        document.addEventListener('animalBand.visibility', function(e) {
            if(!e.detail.isVisible && isPlaying) {
                $timeline.querySelector('.btn--play').click();
            }
        });
    }
});
