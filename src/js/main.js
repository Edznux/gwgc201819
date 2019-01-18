var w=1920
var h=1080

/*
coordinates
0 -------->
|   x
| y
|
v 
*/


TOPLEFT_SCREEN_1 = {x: 61, y:183}
BOTTOMRIGHT_SCREEN_1 = {x: 1084, y:951}
TOPLEFT_SCREEN_2 = {x: 1137, y:75}
BOTTOMRIGHT_SCREEN_2 = {x: 1856, y:554}

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

ctx.fillStyle = "#0E0E0E";
ctx.fillRect(0, 0, w, h);

var map = [
    [0, 0, 10, 9, 9, 6, 0, ],
    [0, 0, 0, 0, 0, 1, 0, ],
    [0, 0, 10, 9, 9, 3, 0, ],
    [0, 0, 0, 1, 0, 0, 0, ],
    [0, 0, 5, 2, 9, 11, 0, ],
    [10, 9, 9, 9, 0, 0, 0, ],
    [0, 0, 4, 9, 9, 11, 0, ],
];


function drawDashboard(){
    drawSeparator()
    drawText()
    drawMap()
}


function drawMap(){
    var spritesheet = document.getElementById("spritesheet")
    console.log(spritesheet)
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
                console.log(srcx)
                ctx.drawImage(spritesheet, srcx, srcy, 32, 32, posX, posY, 32,32);
            }
        }
    }
}

function drawSeparator(){
    var halfh = TOPLEFT_SCREEN_2.y + (BOTTOMRIGHT_SCREEN_2.y - TOPLEFT_SCREEN_2.y) / 2
    var mapSize = halfh - TOPLEFT_SCREEN_2.y
    // split in half horizontally
    ctx.strokeStyle = "#888";
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
}

function drawText(){
    ctx.font = "30px Arial";
    ctx.strokeStyle = "#00FF00";
    ctx.strokeText("Energy", 1440, 110); 
    ctx.strokeText("Encryption", 1415, 230); 
    ctx.strokeText("Firewall", 1670, 110); 
}

function drawSignal(x, y, n, color){

}

function main(){
    drawDashboard()
}

window.onload = function () {
    main()
}