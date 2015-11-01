# Flare currency

![Image Of Currency Window](http://i.imgur.com/WbcjKhl.png)

![Image Of Menu](http://i.imgur.com/0J3Yh99.png)

Flare Currency allows you to add up to 5 currencies to your game via the options menu when setting up a script.

When a currency is added you can add the following tags in enemy note tags, **not troops**.

```javascript
<currencies: "name", amount, percentage>
```

- `name`: The name of the currency, must match that of the currency you set up in the script options.
- `amount`: The amount of the currency to reward.
- `percentage`: Optional. The percentage of which the enemy will drop the currency and its amount.

Currencies with out a percentage default to 100%. When you set the percentage you have to set 0-100 as an integer.

**This script is not complete, you can only gain from enemies and add or subtract currencies**

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

## Whats to come?

- **Currency Shop**: This will let you do something like: `<belongsTo: 'currencyName' costs: x>` which will state that the current
item or weapon or armor will belong to a specific currency and cost a specific amount.

Currency Shops will be opened via a script call, something like: `FlareCurrencies.openShop('currencyName', 'itemType')` this will open a currency
shop that only sells items, weapons or armor (depending on the type). It will gather ALL the items of that currency name.

If you do not pass in a item type as a parameter it will gather all items, armor and weapons of that type  and create a shop for that.
