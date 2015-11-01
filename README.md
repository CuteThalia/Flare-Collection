# Flare Collection

Flare Collection is a collection of RPG Maker MV scripts (see the `dist/` directory).

All scripts are written in ES6 classes, accept for those aspect that I have to
alias in order to add additional contents to. These have been mostly separated out.

The current scripts are:

- **Flare Currency**: Flare Currency allows you to have a max of 5 currencies.
  Enemies can drop currencies at a specific amount and percentage.

 **Currently Not Complete**.

    Missing features include a currency shop and ability to state
    which items, armor or weapons require which currency and how
    much of which currency.

- **Flare Notification**: Allows you to create notification windows that are added  to a queue an displayed over a set amount of time.

## How to build the script?

Building the scripts is easy:

- `npm install`
  - Might want to do: `npm install -g gulp`

Now to build:

- `make:flare-notification-window` : Makes the notification window script.
- `make:flare-currency` : Makes the flare currency script.

All scripts are compiled to the `dist/` directory. Each script contains a
README to explain some more of how to use said script.
