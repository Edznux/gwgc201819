var w = 1024
var h = 768

var wTerm = 720;
var hTerm = 480;

var PROMPT = "Hunter2@Skynet[~]> "
var cmds = ["System CubeOs v1.33.7, Kernel 5.1."]
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

var intro = [
    { text: "Commander Pychus:", font: "20px Arial", color: "#FF5500" },
    { text: "" },
    { text: "Hello HaxOor,", font: "16px Arial" },
    { text: "Our troops arrived inside an abandoned space station." },
    { text: "Your mission is to escort them while they gather informations on what happened." },
    { text: "" },
    { text: "The space station seems to have Military Grade Security™ still engaged." },
    { text: "You will need to disable the firewalls so our troops could get trough." },
    { text: "We couldn't get all of our equipement on board, beware of your energy and encryption level." },
    { text: "" },
    { text: "Good luck," },
    { text: "Pychus" },
]

var BLOCK_SIZE = 32;
var PLAYER_SIZE = 64;

var E_SIZE = 64;
var E_TOP = { x: w / 2 - (E_SIZE / 2), y: 0, type: 0 }
var E_RIGHT = { x: w - E_SIZE, y: h / 2 - (E_SIZE / 2), type: 1 }
var E_LEFT = { x: 0, y: h / 2 - E_SIZE / 2, type: 2 }
var E_BOTTOM = { x: w / 2 - (E_SIZE / 2), y: h - (E_SIZE / 2), type: 3 }

var P_UP = 0;
var P_LEFT = 1;
var P_DOWN = 2;
var P_RIGHT = 3;

//start room => 32 (the only up + left + right room)
var player = { x: 0, y: 0, direction: P_UP, room: 32 };

var levels = {
    8:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    9:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    10:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    11:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    16:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    23:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    24:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    25:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    26:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    28:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    29:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    30:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    31:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    36:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    37:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    38:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
    39:{
        signals: {
            "energy": { x: 320, y: 80, level: 3 },
            "encryption": { x: 320, y: 200, level: 4 },
            "firewall": { x: 565, y: 80, level: 5 },
        },
    },
}
var CURRENT_LEVEL = 31; // reference to map

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
var spritesheet = document.getElementById("spritesheet");

//tilted 90° left
var TILE_LR = 1;
var TILE_UDLR = 2;
var TILE_UL = 3;
var TILE_DL = 4;
var TILE_DR = 5;
var TILE_UR = 6;
var TILE_L = 7;
var TILE_R = 8;
var TILE_UD = 9;
var TILE_D = 10;
var TILE_U = 11;
var TILE_UDL = 12;
var TILE_UDR = 13;
var TILE_ULR = 14;

var map = [
    0, 0, 0, 0, 0, 0, 0,
    0, 0, TILE_D, TILE_UDR, TILE_UD, TILE_U, 0,
    0, 0, 0, TILE_LR, 0, 0, 0,
    0, 0, TILE_DR, TILE_UDLR, TILE_UD, TILE_U, 0,
    TILE_D, TILE_UD, TILE_UDLR, TILE_ULR, 0, 0, 0,
    0, 0, TILE_DL, TILE_UDL, TILE_UD, TILE_U, 0,
    0, 0, 0, 0, 0, 0, 0,
];


function drawDashboard() {
    drawSeparator()
    drawText()
    drawMiniMap()
}


function drawMiniMap() {
    var padding = 8;
    var offsetX = padding;
    var offsetY = padding;
    var x,y;
    for (var i = 0; i < map.length; i++) {
        x = Math.floor(i/7);
        y = i%7;
        sprite = map[i];
        if (sprite > 0) {
            srcx = 0;
            srcy = (sprite * 32) - 32;
            posX = offsetX + (x * 32);
            posY = offsetY + (y * 32);
            ctxTerm.drawImage(spritesheet, srcx, srcy, 32, 32, posX, posY, 32, 32);
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
    ctxTerm.font = "30px Arial";
    ctxTerm.fillStyle = "#00FF00";
    ctxTerm.fillText("Energy", 310, 40);
    ctxTerm.fillText("Encryption", 290, 160);
    ctxTerm.fillText("Firewall", 545, 40);
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
    ctxTerm.fillText(n, x + 50, y + 10);
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
        // console.log(32 + (exits[i].type * E_SIZE))
        ctx.drawImage(spritesheet, 32 + (exits[i].type * E_SIZE), 128, 64, 64, exits[i].x, exits[i].y, 64, 64)
    }
}

//don't you dare calling this ugly.
function drawLazer(lazers, blocks) {
    var endX = 0;
    var endY = 0;
    var lazer, block;
    for (var i = 0; i < lazers.length; i++) {
        lazer = lazers[i]
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = lazer.color
        if (!lazer.active) {
            continue
        }
        switch (lazer.dir) {
            case "up": // red
                ctx.moveTo(lazer.x + (BLOCK_SIZE / 2), lazer.y + BLOCK_SIZE)
                endX = lazer.x + (BLOCK_SIZE / 2)
                endY = 0
                for (var b = 0; b < blocks.length; b++) {
                    block = blocks[b]
                    if (lazer.x >= block.x && lazer.x <= block.x + BLOCK_SIZE && lazer.y > block.y) {
                        endX = lazer.x + (BLOCK_SIZE/2)
                        if (endY < block.y) {
                            endY = block.y + BLOCK_SIZE
                        }
                    }
                }
                lazer.len = lazer.y - endY
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break;
            case "down": // white
                ctx.moveTo(lazer.x + (BLOCK_SIZE / 2), lazer.y)
                endX = lazer.x + (BLOCK_SIZE / 2)
                endY = h
                for (var b = 0; b < blocks.length; b++) {
                    block = blocks[b]
                    if (lazer.x >= block.x && lazer.x <= block.x + BLOCK_SIZE && lazer.y < block.y) {
                        endX = lazer.x + (BLOCK_SIZE / 2)
                        if (endY > block.y) {
                            endY = block.y
                        }
                    }
                }
                lazer.len = lazer.y + endY
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break
            case "right": // yellow
                ctx.moveTo(lazer.x, lazer.y + (BLOCK_SIZE / 2))
                endX = w
                endY = lazer.y + (BLOCK_SIZE / 2)
                for (var b = 0; b < blocks.length; b++) {
                    block = blocks[b]
                    if (lazer.y >= block.y && lazer.y <= block.y + BLOCK_SIZE && lazer.x < block.x) {
                        if (endX > block.x) {
                            endX = block.x
                        }
                        endY = lazer.y + (BLOCK_SIZE / 2)
                    }
                }

                lazer.len = lazer.x + endX
                ctx.lineTo(endX, endY)
                ctx.stroke();
                break

            case "left": // blue

                ctx.moveTo(lazer.x + BLOCK_SIZE, lazer.y + (BLOCK_SIZE / 2))
                endX = 0
                endY = lazer.y + (BLOCK_SIZE / 2)
                for (var b = 0; b < blocks.length; b++) {
                    block = blocks[b]
                    if (lazer.y >= block.y && lazer.y <= block.y + BLOCK_SIZE && lazer.x > block.x) {
                        if (endX < block.x) {
                            endX = block.x + BLOCK_SIZE
                        }
                        endY = lazer.y + (BLOCK_SIZE / 2)
                    }
                }

                lazer.len = lazer.x - endX
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
    drawEnergy(level.energy)
}

function drawBlock(blocks) {
    var blockType = 0;
    var block;
    for (var i = 0; i < blocks.length; i++) {
        block = blocks[i]
        blockType = i % 4
        ctx.drawImage(spritesheet, 32 + (blockType * 32), 0, BLOCK_SIZE, BLOCK_SIZE, block.x, block.y, BLOCK_SIZE, BLOCK_SIZE)
    }
}

function loadMap() {
    var levelsImg = document.getElementById("levels")
    var canvasLevel = document.getElementById("levelscanvas")
    var levelctx = c.getContext("2d");
    levelctx.drawImage(levelsImg, 0, 0)
    var imgData = levelctx.getImageData(0, 0, canvasLevel.width, canvasLevel.height);

    var data = imgData.data;
    var red, green, blue = 0;
    var skip = (map[CURRENT_LEVEL]-1) * 768 * 4; //one level is 768 pixel (32*24), 4 is RGBA bytes
    var i = skip;
    var posX = 0;
    var posY = 0;
    var typeExits;
    console.log(skip)

    // init the level
    levels[CURRENT_LEVEL].blocks = []
    levels[CURRENT_LEVEL].lazers = []
    levels[CURRENT_LEVEL].exits = []
    levels[CURRENT_LEVEL].energy = []

    for (var i; i < (skip + (768 * 4)); i += 4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        hexRGB = rgbToHex(red, green, blue)
        // draw blocks !
        switch (hexRGB) {
            case "#00ff00":
                player.x = posX * 32
                player.y = posY * 32
                break;
            case "#808080":
                // console.debug({ x: posX * 32, y: posY * 32 })
                levels[CURRENT_LEVEL].blocks.push({ x: posX * 32, y: posY * 32 })
                break;
            case "#ff0000": // red lazer = up
                levels[CURRENT_LEVEL].lazers.push({ x: posX * 32, y: posY * 32, dir: "up", color: "red", len: h, active: true })
                break;
            case "#ffff00": // yellow lazer = right
                levels[CURRENT_LEVEL].lazers.push({ x: posX * 32, y: posY * 32, dir: "right", color: "yellow", len: h, active: true })
                break;
            case "#ffffff": // white lazer = down
                levels[CURRENT_LEVEL].lazers.push({ x: posX * 32, y: posY * 32, dir: "down", color: "white", len: h, active: true })
                break;
            case "#0000ff": // blue lazer = left
                levels[CURRENT_LEVEL].lazers.push({ x: posX * 32, y: posY * 32, dir: "left", color: "blue", len: w, active: true })
                break;
            case "#00ffff": // exits
                switch (posX) {
                    case 0:
                        typeExits = E_LEFT
                        break;
                    case 31:
                        typeExits = E_RIGHT
                        break;
                }
                switch (posY) {
                    case 0:
                        typeExits = E_TOP
                        break;
                    case 24:
                        typeExits = E_BOTTOM
                        break;
                }
                levels[CURRENT_LEVEL].exits.push(typeExits)
                break;
            case "#ff6500":
                levels[CURRENT_LEVEL].energy.push({ x: posX * 32, y: posY * 32 })
                break;
            default:
                console.log(`Unknown pixel color ${hexRGB}`)
                break;
        }
        // updates positions
        posX++
        if (posX == 32) {
            posY++
            posX = 0
        }
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// redraw this inside a new canvas so we can scroll (like a paralax) without clearing the whole screen
function drawTerminal() {
    ctxTerm.fillStyle = "#0E0E0E";
    ctxTerm.fillRect(0, hTerm / 2, wTerm, hTerm / 2)
    var padding = 5;
    ctxTerm.font = "15px Arial";
    ctxTerm.fillStyle = "#00FF00";

    for (var i = 0; i < cmds.length; i++) {
        ctxTerm.fillText(cmds[i], 10, hTerm / 2 + ((i + 1) * TERM_SCROLL_OFFSET) + padding + cmdScroll);
    }
}

function removeColor(color) {
    console.log(levels[CURRENT_LEVEL])
    for (var i = 0; i < levels[CURRENT_LEVEL].lazers.length; i++) {
        if (levels[CURRENT_LEVEL].lazers[i].color == color) {
            if (levels[CURRENT_LEVEL].signals["energy"].level > 0) {
                levels[CURRENT_LEVEL].signals["energy"].level--
                levels[CURRENT_LEVEL].lazers[i].active = false
                console.log("disabled ", levels[CURRENT_LEVEL].lazers[i])
            } else {
                console.log("not enough energy")
            }
        }
    }
}
function printHelp() {
    cmds.push("There is multiple commands available: 'remove' (alias to 'rm'), 'clear', 'help'.");
    cmds.push("You can write help <command> for more information");
    if (cmds.length > 10) {
        cmds.shift()
    }
}

function executeCmd(cmd) {
    cmd = cmd.replace(PROMPT, "")
    var splitted = cmd.split(" ")
    if (splitted[0] == "remove" || splitted[0] == "rm") {
        if (splitted[1] == "yellow" || splitted[1] == "red" || splitted[1] == "blue" || splitted[1] == "white") {
            console.log("call to removeColor")
            removeColor(splitted[1])
            drawLevel(levels[CURRENT_LEVEL])
        } else {
            console.log("invalid color")
            cmds.push("Missing color : rm [blue|white|red|yellow]")
        }
        return
    }

    if (splitted[0] == "clear") {
        cmds = [];
        return
    }

    if (splitted[0] == "help") {
        if (splitted.length == 1) {
            printHelp()
            return
        }
        if (splitted[1] == "remove" || splitted[1] == "rm") {
            cmds.push("You can remove a lazer with 'rm <color>'. Colors available are : blue, yellow, white and red.")
            return
        }
        if (splitted[1] == "clear") {
            cmds.push("The clear command will clear the terminal screen.")
            return
        }
        if (splitted[1] == "help") {
            cmds.push("Really?")
            return
        }
    }

    // no command found
    cmds.push("Command not found: " + cmd)
}

function drawPlayer() {
    ctx.drawImage(spritesheet, 32 + (player.direction * 64), 192, PLAYER_SIZE, PLAYER_SIZE, player.x, player.y, PLAYER_SIZE, PLAYER_SIZE);
}

function drawEnergy(energy) {
    for (var i = 0; i < energy.length; i++) {
        block = energy[i]
        blockType = i % 4
        ctx.drawImage(spritesheet, 0, 482, BLOCK_SIZE, BLOCK_SIZE, block.x, block.y, BLOCK_SIZE, BLOCK_SIZE)
    }
}

function checkPlayerCollisionLazer() {
    var lazer;
    for (var i = 0; i < levels[CURRENT_LEVEL].lazers.length; i++) {
        lazer = levels[CURRENT_LEVEL].lazers[i]
        if (lazer.active) {
            if (
                // (lazer.x > player.x && lazer.x < player.x + PLAYER_SIZE && lazer.y > player.y) || // detect right collision
                // (lazer.y > player.y && lazer.y < player.y + PLAYER_SIZE && lazer.x > player.x) || //left collision
                (lazer.dir === "down" && lazer.x >= player.x && lazer.x <= player.x + PLAYER_SIZE && lazer.y < player.y && lazer.y + lazer.len > player.y) || // down
                (lazer.dir === "up" && lazer.x >= player.x && lazer.x <= player.x + PLAYER_SIZE && lazer.y > player.y && lazer.y - lazer.len < player.y + PLAYER_SIZE) // up
            ) {
                return true
            }
        }
    }
    return false
}
function checkEnergyUp(powerups) {
    var p;
    for (var i = 0; i < powerups.length; i++) {
        p = powerups[i];
        if (
            (p.x >= player.x && p.x <= player.x + PLAYER_SIZE && p.y >= player.y && p.y <= player.y + PLAYER_SIZE) || // detect right collision
            (p.y >= player.y && p.y <= player.y + PLAYER_SIZE && p.x >= player.x && p.x <= player.x + PLAYER_SIZE) || //left collision
            (p.x >= player.x && p.x <= player.x + PLAYER_SIZE && p.y <= player.y && p.y >= player.y + PLAYER_SIZE) || // down
            (p.y >= player.y && p.y <= player.y + PLAYER_SIZE && p.x <= player.x && p.x >= player.x + PLAYER_SIZE) // up
        ) {
            console.log("GOT NEW ENERGY")
            return i;
        }
    }
    return false;
}

function checkExits(exits) {
    var exit;
    for (var i = 0; i < exits.length; i++) {
        exit = exits[i];
        if (exit.y == 0 && player.y == 0) {
            console.log("Exit up hit!")
            CURRENT_LEVEL--;
            loadMap();
            return {up:true};
        }
        
        if (exit.y + E_SIZE == h && player.x + PLAYER_SIZE == w) {
            console.log("Exit down hit!")
            CURRENT_LEVEL++;
            loadMap();
            return { down: true };
        }
        
        if (exit.x == 0 && player.x == 0) {
            console.log("Exit left hit!")
            CURRENT_LEVEL-=7;
            loadMap();
            return { left: true };
        }
        
        if (exit.x + E_SIZE == w && player.x + PLAYER_SIZE == w) {
            console.log("Exit right hit!")
            CURRENT_LEVEL+=7;
            loadMap();
            return { right: true };
        }

    }
    return false;
}

function checkPlayerCollisionBlock(blks) {
    var b;
    var collision = {};
    for (var i = 0; i < blks.length; i++) {
        b = blks[i];
        //up
        if (player.x + BLOCK_SIZE >= b.x && player.x < b.x + BLOCK_SIZE &&
            player.y <= b.y + BLOCK_SIZE && player.y > b.y) {
            collision.up = true;
        }
        //down
        if (player.x + BLOCK_SIZE >= b.x && player.x < b.x + BLOCK_SIZE &&
            player.y + PLAYER_SIZE >= b.y && player.y < b.y + BLOCK_SIZE) {
            collision.down = true;
        }
        // right
        if (player.x + PLAYER_SIZE >= b.x && player.x < b.x + BLOCK_SIZE &&
            player.y + PLAYER_SIZE > b.y && player.y < b.y + BLOCK_SIZE) {
            collision.right = true;
        }
        // left
        if (player.x >= b.x && player.x <= b.x + BLOCK_SIZE &&
            player.y + PLAYER_SIZE > b.y && player.y < b.y + BLOCK_SIZE) {
            collision.left = true;
        }
    }
    return collision;
}


function onKeydown(e) {
    switch (e.keyCode) {
        case BACKSPACE:
            if (cmds[cmds.length - 1].length > PROMPT.length) {
                cmds[cmds.length - 1] = cmds[cmds.length - 1].slice(0, -1);
            }
            drawTerminal();
            return; // return here
        case ENTER:
            if (cmds.length > 10) {
                cmds.shift();
            }
            executeCmd(cmds[cmds.length - 1]);
            cmds.push(PROMPT);
            drawTerminal();
            return ; // return here

        case ARROW_UP:
            player.direction = P_UP
            if (player.y > 0) {
                if (checkPlayerCollisionBlock(levels[CURRENT_LEVEL].blocks).up) {
                    collideSound();
                } else {
                    player.y -= 32;
                }
            }
            if (checkPlayerCollisionLazer()) {
                // alert("you ded")
                die();
            }
            break;
        case ARROW_RIGHT:
            player.direction = P_RIGHT
            if (player.x < w - PLAYER_SIZE) {
                if (checkPlayerCollisionBlock(levels[CURRENT_LEVEL].blocks).right) {
                    collideSound();
                } else {
                    player.x += 32;
                }
            }
            if (checkPlayerCollisionLazer()) {
                // alert("you ded")
                die()
            }
            break;
        case ARROW_DOWN:
            player.direction = P_DOWN;
            if (player.y < h - PLAYER_SIZE) {
                if (checkPlayerCollisionBlock(levels[CURRENT_LEVEL].blocks).down) {
                    collideSound();
                } else {
                    player.y += 32;
                }
            }
            if (checkPlayerCollisionLazer()) {
                // alert("you ded")
                die()
            }
            break;
        case ARROW_LEFT:
            player.direction = P_LEFT;
            if (player.x > 0) {
                if (checkPlayerCollisionBlock(levels[CURRENT_LEVEL].blocks).left) {
                    collideSound();
                } else {
                    player.x -= 32;
                }
            }
            if (checkPlayerCollisionLazer()) {
                // alert("you ded")
                die();
            }
            break;

        default:
            char = String.fromCharCode(e.keyCode).toLowerCase()
            if (char.match(/[a-z ]/g)) {
                cmds[cmds.length - 1] += char;
            }
            drawTerminal();
            return; // if not arrow key, doesn't need to check for collisions, so exits
    }
    // checks for power ups (energy)
    var res = checkEnergyUp(levels[CURRENT_LEVEL].energy);
    if (res !== false) {
        levels[CURRENT_LEVEL].signals.energy.level++;
        levels[CURRENT_LEVEL].energy[res] = {}
    }
    checkExits(levels[CURRENT_LEVEL].exits);
}

function die() {
    dieSound();
    document.getElementById("death-screen").style.display = "block";
    document.getElementById("start").style.display = "block";
    document.getElementById("play").style.display = "none";
    document.getElementById("stop").style.display = "none";
    document.getElementById("pause").style.display = "none";
}

function start() {
    //copy it.
    loadMap();
    setInterval(() => {
        //clear the first screen
        ctx.fillStyle = "#0E0E0E";
        ctx.fillRect(0, 0, w, h);

        //clear the second screen
        ctxTerm.fillStyle = "#0E0E0E";
        ctxTerm.fillRect(0, 0, w, h);

        drawDashboard();
        drawTerminal();
        drawLevel(levels[CURRENT_LEVEL]);
    }, 16);

    document.getElementById("welcome").style.display = "none";
    document.getElementById("death-screen").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("play").style.display = "block";
    document.getElementById("stop").style.display = "block";
    document.getElementById("pause").style.display = "block";
}

function welcome() {
    var welcome = document.getElementById("welcome");
    var startButt = document.getElementById("start");
    startButt.style.display = "block"
    var ctxWelcome = welcome.getContext("2d");
    var commander = { x: 50, y: 50 };
    var startY = 100;
    var offsetY = 20;
    ctxWelcome.fillStyle = "#0E0E0E";
    ctxWelcome.fillRect(0, 0, w, h);
    ctxWelcome.drawImage(spritesheet, 32, 256, 256, 256, commander.x, commander.y, 256, 256)
    for (var i = 0; i < intro.length; i++) {
        if (intro[i].color) {
            ctxWelcome.fillStyle = intro[i].color;
        }
        if (intro[i].font) {
            ctxWelcome.font = intro[i].font;
        }
        ctxWelcome.fillText(intro[i].text, 320, startY);
        startY += offsetY
    }

    // controls
    var controls_pos = { x: 300, y: 450 };
    var controls_title_offset = 50;
    ctxWelcome.fillStyle = "#FFF";
    ctxWelcome.fillText("Controls (squad direction): ", controls_pos.x - controls_title_offset, controls_pos.y);
    ctxWelcome.fillText("Type (console commands): ", controls_pos.x - controls_title_offset + 300, controls_pos.y);
    // arrow keys
    ctxWelcome.drawImage(spritesheet, 160, 0, 64, 64, controls_pos.x, controls_pos.y, 64, 64);
    ctxWelcome.drawImage(spritesheet, 224, 0, 64, 64, controls_pos.x + 50, controls_pos.y + 20, 64, 64);
    ctxWelcome.drawImage(spritesheet, 160, 64, 64, 64, controls_pos.x, controls_pos.y + 40, 64, 64);
    ctxWelcome.drawImage(spritesheet, 224, 64, 64, 64, controls_pos.x - 50, controls_pos.y + 20, 64, 64);
    ctxWelcome.fillText("Arrow keys", controls_pos.x - 10, controls_pos.y + 110);
    ctxWelcome.fillText("Keyboard", controls_pos.x + 300, controls_pos.y + 55);

}

function main() {
    welcome();
    musicInit();
    printHelp();

    cmds.push(PROMPT);
    //clear the second screen
    ctxTerm.fillStyle = "#0E0E0E";
    ctxTerm.fillRect(0, 0, w, h);
    drawDashboard();
    drawTerminal();
}

window.onload = function () {
    main()
    window.addEventListener('keydown', onKeydown, false);
}