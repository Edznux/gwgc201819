var w=1920
var h=1080


TOPLEFT_SCREEN_1 = {x: 61, y:183}
BOTTOMRIGHT_SCREEN_1 = {x: 1084, y:951}
TOPLEFT_SCREEN_2 = {x: 1137, y:75}
BOTTOMRIGHT_SCREEN_2 = {x: 1856, y:554}


levelToColors = {
    1: "FF5500",
    2: "00FF00",
    3: "55FF00",
    4: "55FF55",
    5: "FFFF55",
}

var E_SIZE = 200;
var E_TOP    = { x: 183, y:500, type: 0}
var E_LEFT   = { x:1000, y:300, type: 1}
var E_RIGHT  = { x: 1000,y: 1700, type: 2 }
var E_BOTTOM = { x: 951, y: 1700, type: 3 }

var levels = [
    { 
        exits: [E_TOP, E_LEFT, E_RIGHT],
        blocks: [
            {x:500,y:500},
            {x:200,y:380},
            {x:800,y:380},
            {x:500,y:200}
        ],
        lazers: [
            { x: 532, y: 400, dir: "up", color: "red", active: true},
            { x: 542, y: 400, dir: "down", color: "blue", active: true },
            { x: 520, y: 400, dir: "right", color: "yellow", active: true },
            { x: 510, y: 400, dir: "left", color: "white", active: true },
        ],
        signals: [
            { x: 1470, y: 150, level: 3, name: "energy" },
            { x: 1470, y: 270, level: 4, name: "firewall" },
            { x: 1700, y: 150, level: 5, name: "encryption" }
        ]
    }
]
var current_level = 0;


var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var spritesheet = document.getElementById("spritesheet")


var map = [
    [0,  0, 10, 9, 9, 6,  0, ],
    [0,  0, 0,  0, 0, 1,  0, ],
    [0,  0, 10, 9, 9, 3,  0, ],
    [0,  0, 0,  1, 0, 0,  0, ],
    [0,  0, 5,  2, 9, 11, 0, ],
    [10, 9, 2, 14, 0, 0,  0, ],
    [0,  0, 4, 12, 9, 11, 0, ],
];


function drawDashboard(){
    drawSeparator()
    drawText()
    drawMiniMap()

}


function drawMiniMap(){
    var padding = 8
    var offsetX = TOPLEFT_SCREEN_2.x + padding
    var offsetY = TOPLEFT_SCREEN_2.y + padding
    for(var x=0; x < map.length; x++){
        for(var y=0; y < map[x].length; y++){
            sprite = map[x][y]
            if (sprite > 0 ){
                srcx = 0
                srcy = (sprite * 32) - 32
                posX = offsetX + (x * 32)
                posY = offsetY + (y * 32)
                ctx.drawImage(spritesheet, srcx, srcy, 32, 32, posX, posY, 32,32);
            }
        }
    }
}

function drawSeparator(){
    ctx.beginPath();
    var halfh = TOPLEFT_SCREEN_2.y + (BOTTOMRIGHT_SCREEN_2.y - TOPLEFT_SCREEN_2.y) / 2
    var mapSize = halfh - TOPLEFT_SCREEN_2.y
    // split in half horizontally
    ctx.strokeStyle = "#FEFEFE";
    ctx.lineWidth = 2;
    ctx.moveTo(TOPLEFT_SCREEN_2.x, halfh);
    ctx.lineTo(BOTTOMRIGHT_SCREEN_2.x, halfh);
    ctx.stroke();
    // map border
    ctx.moveTo(TOPLEFT_SCREEN_2.x + mapSize, TOPLEFT_SCREEN_2.y);
    ctx.lineTo(TOPLEFT_SCREEN_2.x + mapSize, TOPLEFT_SCREEN_2.y+mapSize);
    ctx.stroke();
    
    // energy / firewall / encryption / ...
    topRightPanelWidth = BOTTOMRIGHT_SCREEN_2.x - (TOPLEFT_SCREEN_2.x + mapSize)
    topRightPanelHeight = BOTTOMRIGHT_SCREEN_2.y - halfh
    
    ctx.moveTo(TOPLEFT_SCREEN_2.x + mapSize + (topRightPanelWidth/2), TOPLEFT_SCREEN_2.y);
    ctx.lineTo(TOPLEFT_SCREEN_2.x + mapSize + (topRightPanelWidth/2), TOPLEFT_SCREEN_2.y+mapSize);
    ctx.stroke();
    
    ctx.moveTo(TOPLEFT_SCREEN_2.x + mapSize, TOPLEFT_SCREEN_2.y + (mapSize/2));
    ctx.lineTo(BOTTOMRIGHT_SCREEN_2.x, TOPLEFT_SCREEN_2.y + (mapSize / 2));
    ctx.stroke();
    ctx.closePath();
}

function drawText(){
    ctx.font = "30px Arial";
    ctx.strokeStyle = "#00FF00";
    ctx.strokeText("Energy", 1440, 110); 
    ctx.strokeText("Encryption", 1415, 230); 
    ctx.strokeText("Firewall", 1670, 110); 
}

function drawSignal(x, y, n, c){
    ctx.beginPath();
    var spacing = 8
    ctx.strokeStyle = c
    for (var line = 1; line <= n; line++){
        ctx.moveTo(x + (line * spacing), y - (5 * line))
        ctx.lineTo(x + (line * spacing), y + (5 * line) )
        ctx.stroke();
    }
    ctx.closePath();
}
function drawSignals(signals){
    console.log(signals)
    for(var i = 0; i < signals.length; i++){
        var s = signals[i]
        drawSignal(s.x, s.y, s.level, levelToColors[s.level])
    }
}

function drawExits(exits){
    console.log(exits)
    for(var i = 0; i < exits.length; i++){
        var exit=exits[i] 
        ctx.drawImage(spritesheet, 32 + (exit.type*64), 128, 64, 64, exit.x, exit.y, 64, 64)
    }
}

//don't you dare calling this ugly.
function drawLazer(lazers, blocks){
    var endX, endY, lazer, block;
    for (var i = 0; i < lazers.length; i++) {
        lazer = lazers[i]
        ctx.beginPath();
        ctx.strokeStyle = lazer.color
        ctx.moveTo(lazer.x, lazer.y)
        if(!lazer.active){
            continue
        }
        switch (lazer.dir) {
            case "up":
                endX = lazer.x
                endY = TOPLEFT_SCREEN_1.y
                for(var b = 0; b < blocks.length; b++){
                    block = blocks[b]
                    if(lazer.x > block.x && lazer.x < block.x + 64 && lazer.y > block.y){
                        console.log("Block obstructing lazer")
                        endX = lazer.x
                        if (endY < block.y) {
                            endY = block.y + 64
                        }
                    }
                }
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break;
            case "down":
                endX = lazer.x
                endY = BOTTOMRIGHT_SCREEN_1.y
                for(var b = 0; b < blocks.length; b++){
                    block = blocks[b]
                    if (lazer.x > block.x && lazer.x < block.x + 64 && lazer.y < block.y){
                        console.log("Block obstructing lazer")
                        endX = lazer.x
                        if (endY > block.y) {
                            endY = block.y
                        }
                    }
                }
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break
            case "right":
                endX = BOTTOMRIGHT_SCREEN_1.x
                endY = lazer.y
                for(var b = 0; b < blocks.length; b++){
                    block = blocks[b]
                    if(lazer.y > block.y && lazer.y < block.y + 64 && lazer.x < block.x){
                        if (endX > block.x){
                            endX = block.x
                        }
                        endY = lazer.y
                    }
                }
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break
                
            case "left":
                endX = TOPLEFT_SCREEN_1.x
                endY = lazer.y
                for(var b = 0; b < blocks.length; b++){
                    block = blocks[b]
                    if (lazer.y > block.y && lazer.y < block.y + 64 && lazer.x > block.x){
                        if (endX < block.x) {
                            endX = block.x+64
                        }
                        endY = lazer.y
                    }
                }
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break
                
            default:
                console.log(`Bad direction : ${lazer.dir}`)
                break;
        }
        ctx.closePath();
    }
}

// level is an object containing: 
// - blocks
// - lazers
// - exits
// - start (starting position)
// - signals
function drawLevel(level){
    // console.log(level.blocks)
    drawBlock(level.blocks)
    drawLazer(level.lazers, level.blocks)
    drawExits(level.exits)
    drawSignals(level.signals)
}

function drawBlock(blocks){
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        ctx.drawImage(spritesheet, 32, 0, 128, 128, block.x, block.y, 64, 64)
    }
}

function drawClock(){

}


function main(){
    ctx.fillStyle = "#0E0E0E";
    ctx.fillRect(0, 0, w, h);

    drawDashboard()
    drawLevel(levels[current_level])
    // drawSignals(SIGNALS_ENERGY, SIGNALS_FIREWALL, SIGNALS_ENCRYPTION)
}

window.onload = function () {
    main()
}