define('TimelineController', [
    'timelineService',
    'audioConfig',
    'AudioController',
    'BandController'
], function(timelineService, audioConfig, AudioController, BandController) {
    'use strict';

    var $timeline = document.querySelector('#animalBand .timeline'),
        isPlaying = false,
        lastClicked;

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
    }

    function renderSequencer() {
        var $sequencer = $timeline.querySelector('.sequencer'),
            matrix = audioConfig.matrix;

            //example1
            matrix.entities.basskick=[true,false,true,false,true,false,true,false];
            matrix.entities.cowbell=[false,true,false,true,false,true,false,true];
            matrix.entities.hihat=[true,true,true,true,false,true,true,true];
            matrix.entities.snare=[false,true,false,true,false,true,false,true];
            matrix.entities.tom1=[false,true,false,false,false,true,false,false];
            matrix.entities.tom2=[true,true,false,true,false,true,false,true];

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
                    BandController.setIdle();
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
                .addEventListener(
                    'mouseover',
                    function(e) {
                        if(e.which==1 && this!= lastClicked && this!= lastClicked.children[0]) {
                            //console.log(this);
                            timelineService.toggleActiveNote.call(
                                this.children[0],
                                audioConfig.matrix
                            );
                            lastClicked=this;
                        }
                    }
                );
           
            $notes[i]
                .addEventListener(
                    'mousedown',
                    function() {
                        lastClicked=this;
                        timelineService.toggleActiveNote.call(
                            this.children[0],
                            audioConfig.matrix
                        );
                        
                    }
                );
        }

        //take care of touch screens
        $timeline
            .addEventListener(
                'touchmove',
                function(e) {
                    var newTarget = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
                    
                    if(lastClicked == null && newTarget.classList.contains('note')){
                        target = newTarget;
                        lastClicked = newTarget;
                        timelineService.toggleActiveNote.call(
                        newTarget.children[0],
                        audioConfig.matrix
                        );     
                    }

                    else if(newTarget!=target && newTarget.classList.contains('note') && newTarget != lastClicked && newTarget != lastClicked.children[0])
                    {
                        target = newTarget;
                        lastClicked = newTarget;
                        timelineService.toggleActiveNote.call(
                        newTarget.children[0],
                        audioConfig.matrix
                        );     
                    }
                }
            );

        $timeline
            .addEventListener(
                'touchend',
                function(e) {
                    lastClicked = null;
                }
            );
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

    
});
