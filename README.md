# Flare Collection

Flare Collection is a collection of RPG Maker MV scripts (see the [`dist/`](https://github.com/AdamKyle/Flare-Collection/tree/master/dist) directory).

All scripts are written in ES6 and compiled down using browserify, babel and spit out
to the [`\dist`](https://github.com/AdamKyle/Flare-Collection/tree/master/dist) directory under there respective directories.

The output script is not something **I DON'T** recommend you edit. I suggest you familiarize your self with the [`src/`](https://github.com/AdamKyle/Flare-Collection/tree/master/src) and locate the appropriate sub folder that contains the code for the script you want.

**The steps are below on how to make build the individual scripts.**

The current scripts are:

- **[Flare Currency](https://github.com/AdamKyle/Flare-Collection/tree/master/dist/flare/currency)**: Flare Currency allows you to have a max of 5 currencies.
  Enemies can drop currencies at a specific amount and percentage.

 **Currently Not Complete**.

 Missing features include a currency shop and ability to state which items, armor or weapons require which currency and how much of which currency.

 ![Image Of Currency Window](http://i.imgur.com/WbcjKhl.png)

 ![Image Of Menu](http://i.imgur.com/0J3Yh99.png)

 ![Image of Yanfly Patch](http://i.imgur.com/5U5AenW.png)

- **[Flare Notification](https://github.com/AdamKyle/Flare-Collection/tree/master/dist/flare/notify)**: Allows you to create notification windows that are added  to a queue an displayed over a set amount of time.

 ![Notification Window Scrolling](http://i.imgur.com/EfSN6tQ.png)

## How to build the script?

Building the scripts is easy:

- `npm install`
  - Might want to do: `npm install -g gulp`

Now to build:

- `make:flare-notification-window` : Makes the notification window script.
- `make:flare-currency` : Makes the flare currency script.

All scripts are compiled to the `dist/` directory. Each script contains a
README to explain some more of how to use said script.
