# Flare Collection

Flare Collection is a collection of RPG Maker MV scripts (see the [`dist/`](https://github.com/AdamKyle/Flare-Collection/tree/master/dist) directory).

All scripts are written in ES6 and compiled down using browserify, babel and spit out
to the [`\dist`](https://github.com/AdamKyle/Flare-Collection/tree/master/dist) directory under there respective directories.

The output script is not something **I DON'T** recommend you edit. I suggest you familiarize your self with the [`src/`](https://github.com/AdamKyle/Flare-Collection/tree/master/src) and locate the appropriate sub folder that contains the code for the script you want.

**The steps are below on how to make build the individual scripts.**

The current scripts are:

- **[Flare Currency](https://github.com/AdamKyle/Flare-Collection/tree/master/dist/flare/currency)**: Flare Currency allows you to have a max of 5 currencies.
  Enemies can drop currencies at a specific amount and percentage.

  You can gain currencies via battle, or events. You can set up a currency shop for specific items.

 ![Image Of Currency Window](http://i.imgur.com/WbcjKhl.png)

 ![Image Of Menu](http://i.imgur.com/0J3Yh99.png)

 ![Image of Yanfly Patch](http://i.imgur.com/5U5AenW.png)

 ![Image of Currency Shop](http://i.imgur.com/fKhPqSD.png)

 ![Image of Currency Shop Selling] (http://i.imgur.com/46XWlnk.png)

- **[Flare Notification](https://github.com/AdamKyle/Flare-Collection/tree/master/dist/flare/notify)**: Allows you to create notification windows that are added  to a queue an displayed over a set amount of time.

 ![Notification Window Scrolling](http://i.imgur.com/EfSN6tQ.png)

 - **[Flare Laws for Map](https://github.com/AdamKyle/Flare-Collection/tree/master/dist/flare/laws_for_map)**: Allows for you to specify specific laws for a map.

 ![Broken Law on Map](http://i.imgur.com/ozElbqY.png)
 ![List Of Laws](http://i.imgur.com/9jpa8Px.png)
 ![Laws in Menu](http://i.imgur.com/IPlCqXn.png)
 ![broke law in battle](http://i.imgur.com/ZYdBEz9.png)

- **[Flare Call Event On Game Over](https://github.com/AdamKyle/Flare-Collection/tree/master/dist/flare/game_over)**: Allows for you to call a common event on a game over, via party death in battle or through game party death on the map.

- **[Flare Play Music On Region Touch](https://github.com/AdamKyle/Flare-Collection/tree/master/dist/flare/region/music)**: Allows you to play music when a user touches a region as well
as fade out the music when they touch another region.

- **[Flare Remove Troop From Region](https://github.com/AdamKyle/Flare-Collection/tree/master/dist/flare/region/troop)**: Allows you to remove one or more troops from a region after a successful battle.

## How to build the script?

Building the scripts is easy:

- `npm install`
  - Might want to do: `npm install -g gulp`

Now to build, `gulp taskHere` where `taskHere` is one of the tasks below:

- `make:flare-notification-window` : Makes the Flare Notification script.
- `make:flare-currency` : Makes the Flare Currency script.
- `make:flare-play-music` : Makes the Flare Play Music on Region Touch script.
- `make:flare-game-over-event`: Makes the Flare Game Over Event script.
- `make:flare-laws-for-map`: Makes the Flare Laws For Map script.
- `make:flare-remove-troop-from-region`: Makes the Flare Remove Troop From Region script.

All scripts are compiled to the `dist/` directory. Each script contains a
README to explain some more of how to use said script.
