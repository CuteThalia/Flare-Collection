# Flare currency

![Image Of Currency Window](http://i.imgur.com/WbcjKhl.png)

![Image Of Menu](http://i.imgur.com/0J3Yh99.png)

![Image of Yanfly Patch](http://i.imgur.com/5U5AenW.png)

![Image of Currency Shop](http://i.imgur.com/fKhPqSD.png)

![Image of Currency Shop Selling] (http://i.imgur.com/46XWlnk.png)

Flare Currency allows you to add up to 5 currencies to your game via the options menu when setting up a script.

When a currency is added you can add the following tags in enemy note tags, **not troops**.

```javascript
<currencyToGain name:"Name", amount: 10, chance: 90>
```

- `name`: The name of the currency, must match that of the currency you set up in the script options.
- `amount`: The amount of the currency to reward.
- `chance`: Optional. The percentage of which the enemy will drop the currency and its amount.

Currencies with out a percentage default to 100%. When you set the percentage you have to set 0-100 as an integer.

> ### ATTN!
>
> `amount` can be a string in the form of: "1 ~ x" where the first value should always be a 1.
> and x can be what ever value you want. This allows you to have random currencies rewarded after
> a battle is finished.

> ### ATTN!
>
> Currency Name must be present or we will not draw the currency information to the screen.

## Shops

Shops are easy to build in Flare Currencies. It's quite amazing too.

So how do we make a shop? The first thing to do is to set up some items with the following tag:

```javascript
<currencyShop belongsTo: "Sample Name" andCosts: 76>
```

That should real like english. We are saying this item belongs to a currency shop and a currency of: "Sample Name."

We also state that the it costs x of that currency.

So lets read it together: *For the currency shop this item belongs to sample name and costs 76 of sample name*.

So now that you went through your weapons, armors and items and added tags to stipulate which items belong to what
currencies and how much they cost, how do you open said shop?

You create an event: `FlareCurrencies.openShop("Sample Name", boolean)`

You have essentially opened a shop that is either purchase only (the boolean) or allows the user to sell items.

Selling items only works for items that belong to that currency shop. Items may have multiple different Currencies
but currency shops only take items that belong to the specific currency you specified.

**You cannot have multi currency based shops**.

> ## ATTN Developers
>
> This shop is designed to be completely backwards compatible with your shop scripts. How ever if there is an issue
> Please file a bug report.

> ## ATTN Users
>
> This shop will be blank if the currency doesn't exist or no items have that currency.

## Additional Information

You must keep the name and the description short. If you make them too long then they will go off the window and it will
look broken.

Amount is not capped, you can have over 9,999 of any currency, but you cannot have any thing less then 0. any negative value that
that takes the currency amount below 0 will cause your currency to default to 0.

## Public API

- `FlareCurrencies.addAmount(currencyName, currencyAmount)`: Lets you add a specific amount to a currency, either negative
   or positive.

Example:

```javascript
FlareCurrencies.addAmount('Demon Teeth', 56);

// Or:

FlareCurrencies.addAmount('Demon Teeth', -56);
```

- `FlareCurrenies.openShop(currencyName, boolean)`: Lets you open a shop specific to that currency.

Example:

```javascript
FlareCurrencies.openShop('Demon Teeth');

// Or:

FlareCurrencies.openShop('Demon Teeth', true); // Purchase only
```


## Yanfly Victory Aftermath Script

To see currencies spit out as "battle spoils" add the following to the option, "victory order": `currency`.

It can come in what ever order you want, how ever it must be present. For example:

```javascript
exp custom drops currency
```

Once added, battles will have an additional battle spoils window showing the currencies you gained.

## Yanfly Menu Manger

You don't need to do anything, currencies just work as expected.

## For Developers

I have a special treat for you.

You can mess around with currencies in your own scripts via: `flareCurrency` which
is a global object. You can do the following with it:

- `flareCurrency.store(currencies)` - This takes an array of objects, an example from the script:

```javascript
[
    {
      name:         currency["Currency One Name"],
      description:  currency["Currency One Description"],
      icon:         currency["Currency One Icon Index"],
      amount:       0
    },
    {
      name:         currency["Currency Two Name"],
      description:  currency["Currency Two Description"],
      icon:         currency["Currency Two Icon Index"],
      amount:       0
    },
    {
      name:         currency["Currency Three Name"],
      description:  currency["Currency Three Description"],
      icon:         currency["Currency Three Icon Index"],
      amount:       0
    },
    {
      name:         currency["Currency Four Name"],
      description:  currency["Currency Four Description"],
      icon:         currency["Currency Four Icon Index"],
      amount:       0
    },
    {
      name:         currency["Currency Five Name"],
      description:  currency["Currency Five Description"],
      icon:         currency["Currency Five Icon Index"],
      amount:       0
    },
];
```

- `flareCurrency.setStoreFromLoad(store)` - Takes an instance of the above example which is gathered from loading a Saved
game.

- `flareCurrency.getCurrencyStore()` - Gets the above store at its current state.

### Regarding Enemies

We add two new keys on to enemy objects.

- `enemyCurrencyRewardData`, which is an array of objects that holds information about each
currency associated with that enemy.

- `gainCurrencyOnBattleWin`, which is an array of objects containing name and a boolean value.
this is calculated and assigned to an enemy when the battle begins.

>### Not Public.
>
> This class is not meant to be given to the end user as a public api. It is for developers.
> End users have `FlareCurrencies` as a public class they can access for events.
