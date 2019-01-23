var w = 1024
var h = 768

var wTerm = 720;
var hTerm = 480;

var PROMPT = "Hunter2@Skynet[~]> "
var cmds = ["System CubeOs v1.33.7, Kernel 5.1.", PROMPT]
var cmdScroll = 0;

TERM_SCROLL_OFFSET = 20;

levelToColors = {
    0: "FF0000",
    1: "FF5500",
    2: "00FF00",
    3: "55FF00",
    4: "55FF55",
    5: "FFFF55",
}

var BLOCK_SIZE = 64;
var PLAYER_SIZE = 64;

var E_SIZE = 64;
var E_TOP = { x: w / 2 - (E_SIZE / 2), y: 0, type: 0 }
var E_LEFT = { x: 0, y: h / 2 - E_SIZE / 2, type: 1 }
var E_RIGHT = { x: w - (E_SIZE / 2), y: h / 2, type: 2 }
var E_BOTTOM = { x: w / 2 - (E_SIZE / 2), y: h - (E_SIZE / 2), type: 3 }

var player = { x: 0, y: 0 };

var levels = [
    {
        exits: [E_TOP, E_LEFT, E_RIGHT],
        blocks: [
            { x: 0, y: BLOCK_SIZE * 2 }, // top left
            { x: BLOCK_SIZE * 2, y: h - BLOCK_SIZE }, // bottom left
            { x: w - BLOCK_SIZE * 3, y: 0 }, // top right; *3 (*2 + itself)
            { x: w - BLOCK_SIZE, y: h - BLOCK_SIZE * 3 } // bottom right
        ],
        lazers: [
            { x: w - (BLOCK_SIZE / 2) * 3, y: h, dir: "up", color: "red", len: h, active: true },
            { x: 0, y: h - (BLOCK_SIZE / 2) * 3, dir: "right", color: "yellow", len: w, active: true },
            { x: (BLOCK_SIZE / 2) * 3, y: 0, dir: "down", color: "white", len: h, active: true },
            { x: w, y: (BLOCK_SIZE / 2) * 3, dir: "left", color: "blue", len: w, active: true },
        ],
        start: { x: h / 2, y: w / 2 },
        signals: {
            "energy": { x: 320, y: 80, level: 0 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        }
    }
]
var current_level = 0;

// KEYCODE
var BACKSPACE = 8
var ENTER = 13
var ARROW_UP = 38
var ARROW_RIGHT = 39
var ARROW_DOWN = 40
var ARROW_LEFT = 37


var c = document.getElementById("canvas");
var cTerm = document.getElementById("terminal");
var ctx = c.getContext("2d");
var ctxTerm = cTerm.getContext("2d");
var spritesheet = document.getElementById("spritesheet")


var map = [
    [0, 0, 10, 9, 9, 6, 0,],
    [0, 0, 0, 0, 0, 1, 0,],
    [0, 0, 10, 9, 9, 3, 0,],
    [0, 0, 0, 1, 0, 0, 0,],
    [0, 0, 5, 2, 9, 11, 0,],
    [10, 9, 2, 14, 0, 0, 0,],
    [0, 0, 4, 12, 9, 11, 0,],
];


function drawDashboard() {
    drawSeparator()
    drawText()
    drawMiniMap()
}


function drawMiniMap() {
    var padding = 8
    var offsetX = padding
    var offsetY = padding
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[x].length; y++) {
            sprite = map[x][y]
            if (sprite > 0) {
                srcx = 0
                srcy = (sprite * 32) - 32
                posX = offsetX + (x * 32)
                posY = offsetY + (y * 32)
                ctxTerm.drawImage(spritesheet, srcx, srcy, 32, 32, posX, posY, 32, 32);
            }
        }
    }
}

function drawSeparator() {
    ctxTerm.beginPath();
    var halfh = (hTerm) / 2
    // split in half horizontally
    ctxTerm.strokeStyle = "#FEFEFE";
    ctxTerm.lineWidth = 2;
    ctxTerm.moveTo(0, halfh);
    ctxTerm.lineTo(wTerm, halfh);
    ctxTerm.stroke();
    // map border
    ctxTerm.moveTo(halfh, 0);
    ctxTerm.lineTo(halfh, 0 + halfh);
    ctxTerm.stroke();

    // energy / firewall / encryption / ...
    topRightPanelWidth = wTerm - (halfh)
    topRightPanelHeight = hTerm - halfh

    ctxTerm.moveTo(halfh + (topRightPanelWidth / 2), 0);
    ctxTerm.lineTo(halfh + (topRightPanelWidth / 2), halfh);
    ctxTerm.stroke();

    ctxTerm.moveTo(halfh, (halfh / 2));
    ctxTerm.lineTo(wTerm, (halfh / 2));
    ctxTerm.stroke();
    ctxTerm.closePath();
}

function drawText() {
    ctxTerm.beginPath();
    ctxTerm.font = "30px Arial";
    ctxTerm.strokeStyle = "#00FF00";
    ctxTerm.strokeText("Energy", 310, 40);
    ctxTerm.strokeText("Encryption", 290, 160);
    ctxTerm.strokeText("Firewall", 545, 40);
    ctxTerm.closePath();
}

function drawSignal(x, y, n, c) {
    ctxTerm.beginPath();
    var spacing = 8
    var nline = n
    ctxTerm.strokeStyle = "#" + c

    if (n > 5) {
        nline = 5
    }

    if (n < 0) {
        nline = 0
    }

    if (nline > 0) {
        for (var line = 1; line <= nline; line++) {
            ctxTerm.moveTo(x + (line * spacing), y - (5 * line))
            ctxTerm.lineTo(x + (line * spacing), y + (5 * line))
            ctxTerm.stroke();
        }
    } else {
        ctxTerm.moveTo(x, y - 10)
        ctxTerm.lineTo(x + 20, y + 10)
        ctxTerm.stroke();

        ctxTerm.moveTo(x + 20, y - 10)
        ctxTerm.lineTo(x, y + 10)
        ctxTerm.stroke();
    }

    ctxTerm.font = "30px Arial";
    ctxTerm.strokeText(n, x + 50, y + 10);
    ctxTerm.closePath();
}

function drawSignals(signals) {
    for (var k in signals) {
        if (signals.hasOwnProperty(k)) {
            drawSignal(signals[k].x, signals[k].y, signals[k].level, levelToColors[signals[k].level])
        }
    }
}

function drawExits(exits) {
    for (var i = 0; i < exits.length; i++) {
        var exit = exits[i]
        ctx.drawImage(spritesheet, 32 + (exit.type * 64), 128, 64, 64, exit.x, exit.y, 64, 64)
    }
}

//don't you dare calling this ugly.
function drawLazer(lazers, blocks) {
    var endX, endY, lazer, block;
    for (var i = 0; i < lazers.length; i++) {
        lazer = lazers[i]
        ctx.beginPath();
        ctx.strokeStyle = lazer.color
        ctx.moveTo(lazer.x, lazer.y)
        if (!lazer.active) {
            continue
        }
        switch (lazer.dir) {
            case "up":
                endX = lazer.x
                endY = 0
                for (var b = 0; b < blocks.length; b++) {
                    block = blocks[b]
                    if (lazer.x > block.x && lazer.x < block.x + BLOCK_SIZE && lazer.y > block.y) {
                        console.log("Block obstructing lazer")
                        endX = lazer.x
                        if (endY < block.y) {
                            endY = block.y + BLOCK_SIZE
                        }
                        lazer.len = endY - lazer.y
                    }
                }
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break;
            case "down":
                endX = lazer.x
                endY = h
                for (var b = 0; b < blocks.length; b++) {
                    block = blocks[b]
                    if (lazer.x > block.x && lazer.x < block.x + BLOCK_SIZE && lazer.y < block.y) {
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
                endX = w
                endY = lazer.y
                for (var b = 0; b < blocks.length; b++) {
                    block = blocks[b]
                    if (lazer.y > block.y && lazer.y < block.y + BLOCK_SIZE && lazer.x < block.x) {
                        if (endX > block.x) {
                            endX = block.x
                        }
                        endY = lazer.y
                    }
                }
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break

            case "left":
                endX = 0
                endY = lazer.y
                for (var b = 0; b < blocks.length; b++) {
                    block = blocks[b]
                    if (lazer.y > block.y && lazer.y < block.y + BLOCK_SIZE && lazer.x > block.x) {
                        if (endX < block.x) {
                            endX = block.x + BLOCK_SIZE
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
function drawLevel(level) {
    ctx.fillRect(0, 0, w, h)
    // ctxTerm.fillRect(0, hTerm / 2, wTerm, hTerm / 2)
    // console.log(level.blocks)
    drawBlock(level.blocks)
    drawLazer(level.lazers, level.blocks)
    drawExits(level.exits)
    drawSignals(level.signals)
    drawPlayer(level.start)
}

function drawBlock(blocks) {
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        ctx.drawImage(spritesheet, 32, 0, 128, 128, block.x, block.y, 64, 64)
    }
}

function drawClock() {

}

// redraw this inside a new canvas so we can scroll (like a paralax) without clearing the whole screen
function drawTerminal() {
    ctxTerm.fillRect(0, hTerm / 2, wTerm, hTerm / 2)
    var padding = 5;
    ctxTerm.font = "15px Arial";
    ctxTerm.strokeStyle = "#00FF00";

    for (var i = 0; i < cmds.length; i++) {
        ctxTerm.strokeText(cmds[i], 10, hTerm / 2 + ((i + 1) * TERM_SCROLL_OFFSET) + padding + cmdScroll);
    }
}

function removeColor(color) {
    console.log(levels[current_level])
    for (var i = 0; i < levels[current_level].lazers.length; i++) {
        if (levels[current_level].lazers[i].color == color) {
            if (levels[current_level].signals["energy"].level > 0) {
                levels[current_level].signals["energy"].level--
                levels[current_level].lazers[i].active = false
                console.log("disabled ", levels[current_level].lazers[i])
            } else {
                console.log("not enough energy")
            }
        }
    }
}
function printHelp() {
    cmds.push("There is multiple commands available: 'remove', 'clear', 'help'.");
    cmds.push("You can write help <command> for more information");
    if (cmds.length > 10) {
        cmds.shift()
    }
}

function executeCmd(cmd) {
    cmd = cmd.replace(PROMPT, "")
    var splitted = cmd.split(" ")
    if (splitted[0] == "remove") {
        if (splitted[1] == "yellow" || splitted[1] == "red" || splitted[1] == "blue" || splitted[1] == "white") {
            console.log("call to removeColor")
            removeColor(splitted[1])
            drawLevel(levels[current_level])
        } else {
            console.log("invalid color")
        }
    }

    if (splitted[0] == "clear") {
        cmds = [];
    }

    if (splitted[0] == "help") {
        if (splitted.length == 1) {
            printHelp()
        }
    }
    // console.log(splitted)
}

function drawPlayer(start) {
    player = start
    ctx.drawImage(spritesheet, 32, 192, PLAYER_SIZE, PLAYER_SIZE, player.x, player.y, PLAYER_SIZE, PLAYER_SIZE);
}

function checkPlayerCollisionLazer(){
    var lazer;
    for(var i = 0; i < levels[current_level].lazers.length; i++){
        lazer = levels[current_level].lazers[i]
        if (
            (lazer.x > player.x && lazer.x < player.x + PLAYER_SIZE && lazer.y > player.y) || // detect right collision
            (lazer.y > player.y && lazer.y < player.y + PLAYER_SIZE && lazer.x > player.x) || //left collision
            (lazer.x > player.x && lazer.x < player.x + PLAYER_SIZE && lazer.y < player.y) || // down
            (lazer.y > player.y && lazer.y < player.y + PLAYER_SIZE && lazer.x < player.y) // up
        ){
            console.log("lazer collision detected")
            return true
        }
    }
    return false
}

// return face of collision : 
// 1 : up
// 2 : right
// 3 : bottom
// 4 : left
function checkPlayerCollisionBlock(){
    var block;
    for (var i = 0; i < levels[current_level].blocks.length; i++) {
        block = levels[current_level].blocks[i]
        // up
        if (block.y > player.y && block.y < player.y + PLAYER_SIZE && block.x < player.y){
            console.log("up collision")
            return 1
        }
        // right
        if (block.x > player.x && block.x < player.x + PLAYER_SIZE && block.y > player.y){
            console.log("right collision")
            return 2
        }
        // down
        if (block.x > player.x && block.x < player.x + PLAYER_SIZE && block.y < player.y){
            console.log("down collision")
            return 3
        }
        // left
        if (block.y > player.y && block.y < player.y + PLAYER_SIZE && block.x > player.x){
            console.log("left collision")
            return 4
        }    
    }
    return false
}


function onKeydown(e) {

    switch (e.keyCode) {

        case BACKSPACE:
            if (cmds[cmds.length - 1].length > PROMPT.length) {
                cmds[cmds.length - 1] = cmds[cmds.length - 1].slice(0, -1);
            }
            break;
        case ENTER:
            if (cmds.length > 10) {
                cmds.shift()
            }
            executeCmd(cmds[cmds.length - 1])
            cmds.push(PROMPT)
            break;

        case ARROW_UP:
            if (player.y > 0 && (checkPlayerCollisionBlock() != 1)) {
                player.y -= 32
            }
            if (checkPlayerCollisionLazer()){
                alert("you ded")
            }
            break;
        case ARROW_RIGHT:
            if (player.x < w - PLAYER_SIZE) {
                player.x += 32
            }
            if (checkPlayerCollisionLazer()) {
                alert("you ded")
            }
            break;
        case ARROW_DOWN:
            if (player.y < h - PLAYER_SIZE) {
                player.y += 32
            }
            if (checkPlayerCollisionLazer()) {
                alert("you ded")
            }
            break;
        case ARROW_LEFT:
            if (player.x > 0) {
                player.x -= 32
            }
            if (checkPlayerCollisionLazer()) {
                alert("you ded")
            }
            break;

        default:
            char = String.fromCharCode(e.keyCode).toLowerCase()
            if (char.match(/[a-z ]/g)) {
                cmds[cmds.length - 1] += char
            }
            break;
    }

    drawTerminal()
}

function main() {

    setInterval(() => {
        //clear the first screen
        ctx.fillStyle = "#0E0E0E";
        ctx.fillRect(0, 0, w, h);

        //clear the second screen
        ctxTerm.fillStyle = "#0A0A0A";
        ctxTerm.fillRect(0, 0, w, h);

        drawDashboard()
        drawTerminal()
        drawLevel(levels[current_level])
    }, 16);
}

window.onload = function () {
    main()
    music()
    window.addEventListener('keydown', onKeydown, false);
}