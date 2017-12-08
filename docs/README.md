# TapTap

### Overview

TapTap (tentative name) is a game with a very simple concept. Players only need to tap or click on the circles that pop up in the screen before they disappear.

Sounds simple enough, but words can be deceiving. There are many challenges that lay ahead.

Additionally, after gameplay, users are able to view the statistics of their play including accuracy, point counts, high score, and more.

### Functionality

In TapTap, users will be able to play a fun fast-paced game.

Users will be able to see the stats of their play.

### MVPs

[x] Have multiple levels of game play
[x] Start, pause, exit game play
[x] Initial gameplay directions
[ ] Statistics page - tracks session statistics

Considered features:

[ ] Special stats page: use gameplay events as data for data visualization
[x] Track user historical gameplay statistics (or all players)

### Wireframes

App will be a single page with a menu screen. Play screen is shown after pressing play.

![wireframes](./proposal/jsproject.png)  
Menu and Gameplay

### Implementation

- Vanilla Javascript for game logic
- `HTML5 Canvas` for rendering and gameplay
- HTML and JS for menu
- JS and CSS for styling
- Webpack to bundle scripts

Scripts -
- `game_view.js` - where the game will be displayed
- `game.js` - where game logic will be handled
- `levels.js` - where the level handling will occur
- `circle.js` - where the logic of the objects to be TapTapped will occur

### Timeline

**Weekend:**
- [x] Research into game implementation
- [x] Begin initial game logic

**Day 1:** Setup additional gameplay logic...
- [x] Have basic level of gameplay fully implemented
  - [x] Score tracking
  - [x] Level time limit
- [x] Begin implementation of the menu

**Day 2:** Implement menu
- [x] Have full menu up and running and displaying the appropriate information
  - [x] Play button starts the game
  - [x] ~~Stats~~ High scores page shows ~~stats~~ scores modal with gameplay points
- [x] Implement pause button logic to return to menu

**Day 3:** Style
- [x] Get all the game elements and menu elements looking good
- [x] Implement game modes
  - [x] casual (does not record high scores)
  - [x] normal (records high scores)
  - ~~[ ] quick play~~
  - ~~[ ] expert~~
  - ~~[ ] unending~~

**Day 4:** Build experience
- [x] Add sound effects and music
- ~~[ ] Build more levels~~ Decided unending gameplay was more appealing
- [x] Implemented Node / Express backend

**Day 5:** Localstorage
- ~~[ ] Resarch localstorage and how to implement to store user scores~~
- ~~[ ] Research bonus features~~
- [ ] Figure out how to host project
- [ ] Finish production README
