var w=1900
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

ctx.fillStyle = "#FF5500";
ctx.fillRect(0, 0, w, h);