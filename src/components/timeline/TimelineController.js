define('TimelineController', [
    'timelineService',
    'audioConfig',
    'AudioController'
], function(timelineService, audioConfig, AudioController) {
    'use strict';

    var $timeline = document.querySelector('#animalBand .timeline'),
        isPlaying = false;

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
                        if(e.which==1) {
                        timelineService.toggleActiveNote.call(
                            this.children[0],
                            audioConfig.matrix
                        );
                        }
                    }
                );
            //take care of touch screens
             $timeline
                .addEventListener(
                    'touchmove',
                    function(e) {
                        var newTarget = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
                        if(newTarget!=target && newTarget.classList.contains('note'))
                        {
                            target = newTarget;
                            timelineService.toggleActiveNote.call(
                            newTarget.children[0],
                            audioConfig.matrix
                            );     
                        }
                    }
                );
     
            $notes[i]
                .addEventListener(
                    'mousedown',
                    function() {
                       
                        timelineService.toggleActiveNote.call(
                            this.children[0],
                            audioConfig.matrix
                        );
                        
                    }
                );
        }
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
