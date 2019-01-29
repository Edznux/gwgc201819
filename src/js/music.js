var ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext;

function musicInit(){
    var lead = [
        '-   e',
        'Bb3 e',
        'A3  e',
        'Bb3 e',
        'G3  e',
        'A3  e',
        'F3  e',
        'G3  e',

        'E3  e',
        'F3  e',
        'G3  e',
        'F3  e',
        'E3  e',
        'F3  e',
        'D3  q',

        '-   e',
        'Bb3 s',
        'A3  s',
        'Bb3 e',
        'G3  e',
        'A3  e',
        'G3  e',
        'F3  e',
        'G3  e',

        'E3  e',
        'F3  e',
        'G3  e',
        'F3  e',
        'E3  s',
        'F3  s',
        'E3  e',
        'D3  q'
    ];
    var harmony = [
        '-   e',
        'D4  e',
        'C4  e',
        'D4  e',
        'Bb3 e',
        'C4  e',
        'A3  e',
        'Bb3 e',

        'G3  e',
        'A3  e',
        'Bb3 e',
        'A3  e',
        'G3  e',
        'A3  e',
        'F3  q',

        '-   e',
        'D4  s',
        'C4  s',
        'D4  e',
        'Bb3 e',
        'C4  e',
        'Bb3 e',
        'A3  e',
        'Bb3 e',

        'G3  e',
        'A3  e',
        'Bb3 e',
        'A3  e',
        'G3  s',
        'A3  s',
        'G3  e',
        'F3  q'
    ];
    var bass = [
        'D3  q',
        '-   h',
        'D3  q',

        'A2  q',
        '-   h',
        'A2  q',

        'Bb2 q',
        '-   h',
        'Bb2 q',

        'F2  h',
        'A2  h'
    ];

    var when = ac.currentTime;
    var tempo = 120;

    sequence1 = new TinyMusic.Sequence(ac, tempo, lead);
    sequence2 = new TinyMusic.Sequence(ac, tempo, harmony);
    sequence3 = new TinyMusic.Sequence(ac, tempo, bass);

    // set staccato and smoothing values for maximum coolness
    sequence1.staccato = 0.55;
    sequence2.staccato = 0.55;
    sequence3.staccato = 0.05;
    sequence3.smoothing = 0.4;

    // adjust the levels so the bass and harmony aren't too loud
    sequence1.gain.gain.value = 1.0 / 2;
    sequence2.gain.gain.value = 0.8 / 2;
    sequence3.gain.gain.value = 0.65 / 2;

    // apply EQ settings
    sequence1.mid.frequency.value = 800;
    sequence1.mid.gain.value = 3;
    sequence2.mid.frequency.value = 1200;
    sequence3.mid.gain.value = 3;
    sequence3.bass.gain.value = 6;
    sequence3.bass.frequency.value = 80;
    sequence3.mid.gain.value = -6;
    sequence3.mid.frequency.value = 500;
    sequence3.treble.gain.value = -2;
    sequence3.treble.frequency.value = 1400;
    
    // play
    document.querySelector('#play').addEventListener('click', function () {
        when = ac.currentTime;
        //start the lead part immediately
        sequence1.play(when);
        // delay the harmony by 16 beats
        sequence2.play(when + (60 / tempo) * 16);
        // start the bass part immediately
        sequence3.play(when);
    }, false);
    
    // pause
    document.querySelector('#stop').addEventListener('click', function () {
        sequence1.stop();
        sequence2.stop();
        sequence3.stop();
    }, false);

    document.querySelector('.click-sound').addEventListener('click', function () {
        var when = ac.currentTime;
        var clickySound = [
            'A1- e',
            'A3-- e',
            'A2-- e',
        ];
        var tempo = 200
        var clickSeq = new TinyMusic.Sequence(ac, tempo, clickySound);
        clickSeq.loop = false;
        clickSeq.staccato = 0.25;
        clickSeq.gain.gain.value = 1.0 / 2;
        clickSeq.mid.gain.value = 3;
        clickSeq.play(when)
    }, false);
}

document.querySelector('#debug').addEventListener('click', function () {
    collideSound()
})

function collideSound(){

    var when = ac.currentTime;
    var collisionSound = [
        'A2-- e',
        'C4-- s',
        'C2-- q',
    ];
    var tempo = 700
    var clickSeq = new TinyMusic.Sequence(ac, tempo, collisionSound);
    clickSeq.loop = false;
    clickSeq.play(when)
}

function dieSound(){
    var when = ac.currentTime;
    var clickySound = [
        'A1-- q',
        'A3-- q',
        'A2-- q',
        'A2-- q',
        'A3-- q',
        'A2-- q',
        'A3-- q',
        'A2-- q',
        'A1-- q',
        'A4-- q',
        'D4-- q',
        'A5-- q',
    ];

    var tempo = 1000
    var clickSeq = new TinyMusic.Sequence(ac, tempo, clickySound);
    clickSeq.loop = false;
    clickSeq.play(when)
}