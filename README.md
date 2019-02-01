# Maissi Turtle

Author: Edznux
Game title : Maissi Turtle
Licence : MIT
Source Repository : https://github.com/Edznux/gwgc201819

Pre-Notes: CHECK YOUR SOUND BEFORE starting the game, I always forgot how LOUD it is by default and the sound are home made so they are ...hmm... _let's not talk about that._

## Gameplay

The user is a hacker trying to help some space marine crew in the forensic analysis of an abandoned spaceship.
You must visit all the room to finish the analysis. You might not need to disable every firewall (the "lazers") to complete this task.

Notes: some levels are one chance only. If you miss, you WILL get stuck and will have to die/refresh.

### Primary screen

The user is prompted with a CLI.
The terminal allows "rm"/"remove", "clear", "help" commands.
The command "rm" stands for "remove" and must take a parameters : a color.
There are 4 different firewall colors ("lazers") in the room that block you exists.

### Secondary screen

This screen show the current state of the hacker inside the Space Station.

On the top left corner, there is a display of the complete map. The red scare is your current location.
On the top right corner, it will display several information :

- The energy level corresponds to the number of "remove" command available. You can recharge one level of energy by going onto the lighting "items" on the floor.
- The firewall level corresponds to the number of active firewall ("lazers") in the room.
- The encryption level is a simple "hacker fog of war" that will block the vision on the players with 0 and 1. [NOT IMPLEMENTED]

## Notes and bonus (!SPOILERS!)

### Audio/Sound/Graphics

I tried to do everything because I wanted to see a little bit of the audio and graphics design.
Everything execpt the base for the keyboard click sound was home-made.

Software used:
- Graphics : Krita
- Sound : Audacity (modify the keyboard click) and the TinyMusicJS librairy. (Licenses file in the src/js repository)
- Code: VSCode

### Technical notes

If you look at the code (it's really bad, old JS, lots of global var...) you will see some things :
- I used several layers of canvas, it allows me to redraw things much easily.
- Move the screens with CSS and don't use padding from the top left corner inside the canvas.
- Use of native HTML tags so we don't have to draw complex shapes (buttons, etc...)
- Collision checking is bad, there is a loads of nested loop and repeated actions but it kinda works I think.
- I didn't use any compilation / minification because it's not needed.

### References to the IT/Gaming/InfoSec world

I tried to include some references to the hacker/IT world.
Here is the list : 
- The commander name is Pychus (Ref to Tychus Findlay from StarCraft)
- The good old mighty "Military Grade Security™"
- Green text on black background, well you know.
- The command prompt: `Hunter2@Skynet[~]>`
  - Hunter2 : bash.org/?244321
  - Skynet : Terminator
- The computer info : 
  - CubeOs: Inspired by Qubes Os Security focused OS.
  - v1.33.7: So leet!
  - Kernel 5.1: We are ahead of the Linux mainline, so futuristic.
- On the winning screen, you are greeted with some analysis. The name cor*n*ficker is heavily inspired by conficker worm.  It's also not a worm but an earworm (Helicoverpa zea), so a worm for corn. CORN FACTS.
- The name "Maissi Turtle":
  - In my native language (French) "Maissi" would be pronounced something like "messy". But Maissi in Finnish is "corn". CORN FACTS AGAIN.
  - Turtle, because the code is soooo bad and I always heard the term "turtle programming" for things like "move up, do something, turn left, do something", but that's maybe just because I used to play a little bit to much with ComputerCraft.