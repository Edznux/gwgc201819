var ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext;
var keyboardSound = new Audio('./src/assets/kb.mp3')

function musicInit(){
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

function collideSound(){
    var when = ac.currentTime;
    var collisionSound = [
        'A2-- e',
        'C4-- s',
        'C2-- q',
    ];
    var tempo = 700;
    var clickSeq = new TinyMusic.Sequence(ac, tempo, collisionSound);
    clickSeq.loop = false;
    clickSeq.play(when);
}

function dieSound(){
    var when = ac.currentTime;
    var clickySound = [
        'A1-- q',
        'A3-- q',
        'A3-- q',
        'A3-- q',
        'A2-- q',
        'A1-- q',
        'A4-- q',
        'D4-- q',
        // 'A5-- q',
    ];

    var tempo = 1000
    var clickSeq = new TinyMusic.Sequence(ac, tempo, clickySound);
    clickSeq.loop = false;
    clickSeq.play(when)
}