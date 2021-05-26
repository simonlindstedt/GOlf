<img src="https://media.giphy.com/media/26gIO3CXwJDNRSZlS/giphy.gif" width=100% />

# GOlf

A golfing game built using pixi.js and matter.js. [Live link](https://go-lf.netlify.app/).

# Installation

1. Clone this repo.
2. Run `npm install` in the project directory.
3. Run `npm run start` and then navigate to `localhost:4000` in your preferred browser.

# Changelog

- [Final Touches](https://github.com/simonlindstedt/GOlf/pull/17)
- [Maps and polish](https://github.com/simonlindstedt/GOlf/pull/16)
- [Test maps and bugfixes](https://github.com/simonlindstedt/GOlf/pull/15)
- [Styling](https://github.com/simonlindstedt/GOlf/pull/14)
- [First Maps](https://github.com/simonlindstedt/GOlf/pull/13)
- [Obsticles](https://github.com/simonlindstedt/GOlf/pull/12)
- [Interface and interface structure](https://github.com/simonlindstedt/GOlf/pull/11)
- [Map switcher and some restructuring](https://github.com/simonlindstedt/GOlf/pull/10)
- [Flat ball and viewport / controllable camera](https://github.com/simonlindstedt/GOlf/pull/9)
- [Map Maker](https://github.com/simonlindstedt/GOlf/pull/8)
- [Hole Logic](https://github.com/simonlindstedt/GOlf/pull/6)
- [Basic Golf Logic](https://github.com/simonlindstedt/GOlf/pull/5)

# Code Review

### By [Joacim Johansson](https://github.com/JoeyJaySWE) and [Victor Stranne](https://github.com/Vstranne)

1. `_introscreen.scss:18` - Commentated, perhaps remove.
2. `_pausemenmu.scss:24` - Commentated, perhaps remove.
3. `src/js/game/ball.js:41-46` as I understand it, you are getting a decimal color based on the force,
   then converts it into a hexa deciaml. But I don't quite get how you get different colors for
   row 44 and 45 as they use the exact same values.
4. `src/js/game/ball.js: 41-46:` here you use `this.PowerDisplay` a lot, but I have yet to see it
   implemented in the code. Where does it originate?
5. `src/js/game/ball.js: 70 - 73` Clever use of the the stored postions of the object to calicluate the
   balls position in relation to it. Used manual numbers myself and took way more space.
6. `src/js/game/assets/maps.json:` Did you set this up manually or did you have some 3rd-party tool?
7. `src/js/game/Game.js` - Try to have more descriptive comments, and perhaps more than just one word and avoid comments if not really needed, i.e. line 95.
8. `src/js/game/Wall.js:29` - Another comment that feels pretty useless :D
9. `All files` - Good naming in general which helps alot, but perhaps add more comments to make it easier for someone else to navigate through the code.
10. `General` Very good structure in the project!

Well done guys! Awesome project!

# Testers

Tested by the following people:

1. Amanda Fager
2. Gilda Eklöf
3. Jakob Gustafsson
4. Martin Hansson

Tested by the following muggles (non-coders):

1. Christian Sundberg
2. Olle Sundberg
3. Victoria Idström
4. Siri Lindstedt
